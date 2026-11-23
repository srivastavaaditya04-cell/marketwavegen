import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/work-email';
import { sheetTimestampIST } from '@/lib/sheet-time';
import {
    acknowledgments, b2bExperienceOptions, experienceAreas, getJob, preferredContactOptions, WORK_HISTORY_ROWS,
    RESUME_MAX_BYTES, RESUME_EXTENSIONS,
} from '@/data/careers';

// Careers applications (all positions, with a Position column) go to a 'Careers' tab in the same Google Sheet as the contact form.
// The tab (with its header row) is created automatically the first time if it does not exist.
const TAB = 'Careers';

const HEADERS = [
    'Time (IST)', 'Position', 'Full legal name', 'Email', 'Phone', 'Street address', 'City, State, ZIP', 'Preferred contact', 'LinkedIn',
    'Available to start', 'B2B sales experience', 'Experience areas', 'Industries / buyer types', 'CRM and sales tools',
    'Largest deal (last 2 years)', 'Why interested',
    ...Array.from({ length: WORK_HISTORY_ROWS }, (_, i) => [
        `Role ${i + 1} company`, `Role ${i + 1} title`, `Role ${i + 1} dates`, `Role ${i + 1} key results`,
    ]).flat(),
    'All acknowledgments agreed', 'Background check consent', 'Signature (typed name)', 'Signature date', 'Page URL',
    'Resume link',
];

const MAX = 2000;

// ---- Resume handling -------------------------------------------------------
// The file is checked here, then sent to a small PHP receiver on the company's Hostinger hosting,
// which saves it in a folder and returns its link. The link goes into the Sheet row. No email is sent.
// Settings (Vercel > Environment Variables): RESUME_UPLOAD_URL and RESUME_UPLOAD_SECRET.

/** First bytes of each allowed file type, so a renamed file of another type is rejected. */
const SIGNATURES: Record<string, (b: Uint8Array) => boolean> = {
    '.pdf': (b) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 && b[4] === 0x2d, // %PDF-
    '.doc': (b) => [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1].every((v, i) => b[i] === v),
    '.docx': (b) => b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04, // zip container
};

/** Returns an error message for the applicant, or the validated file and its extension. */
async function checkResume(entry: FormDataEntryValue | null): Promise<{ error: string } | { file: File; ext: string }> {
    if (!(entry instanceof File) || entry.size === 0) return { error: 'Please upload your resume.' };
    if (entry.size > RESUME_MAX_BYTES) return { error: 'Your resume is too large. The limit is 4 MB.' };
    const dot = entry.name.lastIndexOf('.');
    const ext = dot >= 0 ? entry.name.slice(dot).toLowerCase() : '';
    if (!(RESUME_EXTENSIONS as readonly string[]).includes(ext)) return { error: 'Please upload a PDF, DOC or DOCX file.' };
    const head = new Uint8Array(await entry.slice(0, 8).arrayBuffer());
    if (!SIGNATURES[ext](head)) return { error: 'That file does not look like a valid PDF, DOC or DOCX.' };
    return { file: entry, ext };
}

/** Sends the file to the hosting and returns its link. Throws if storage is not set up or fails. */
async function storeResume(file: File, ext: string): Promise<string> {
    const url = process.env.RESUME_UPLOAD_URL;
    const secret = process.env.RESUME_UPLOAD_SECRET;
    if (!url || !secret) throw new Error('Resume storage is not configured (RESUME_UPLOAD_URL / RESUME_UPLOAD_SECRET)');
    const fd = new FormData();
    fd.append('resume', file, `resume${ext}`); // the applicant's own file name is not sent on
    const res = await fetch(url, { method: 'POST', headers: { 'X-Upload-Secret': secret }, body: fd, signal: AbortSignal.timeout(25000) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || typeof data.url !== 'string') throw new Error(`Resume storage failed: HTTP ${res.status} ${data.error || ''}`);
    // The link is written into a Sheets formula, so only plain https links are accepted.
    if (!/^https:\/\/[A-Za-z0-9._~\/-]+$/.test(data.url)) throw new Error('Resume storage returned an unexpected link');
    return data.url;
}

function parsePayload(raw: unknown) {
    try {
        return JSON.parse(String(raw));
    } catch {
        return null;
    }
}

/** Plain text, trimmed and length-limited. A leading = + - @ is escaped so Sheets never runs it as a formula. */
function clean(value: unknown, max = MAX): string {
    const s = typeof value === 'string' ? value.trim().slice(0, max) : '';
    return /^[=+\-@]/.test(s) ? `'${s}` : s;
}

function columnLetter(n: number): string {
    let s = '';
    while (n > 0) {
        const m = (n - 1) % 26;
        s = String.fromCharCode(65 + m) + s;
        n = Math.floor((n - 1) / 26);
    }
    return s;
}

export async function POST(request: Request) {
    try {
        const form = await request.formData();
        const body = parsePayload(form.get('payload'));
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Your application could not be read. Please try again.' }, { status: 400 });
        }

        // Honeypot: real users never fill this hidden field.
        if (body.website) {
            return NextResponse.json({ success: true });
        }

        const job = getJob(String(body.jobSlug || ''));
        if (!job) {
            return NextResponse.json({ error: 'This position is no longer open.' }, { status: 400 });
        }

        const required: [string, string][] = [
            ['fullName', 'Full legal name'],
            ['email', 'Email address'],
            ['phone', 'Phone number'],
            ['cityStateZip', 'City, State, ZIP'],
            ['linkedin', 'LinkedIn profile URL'],
            ['whyInterested', 'Why are you interested in this position?'],
            ['signatureName', 'Typed full name (electronic signature)'],
            ['signatureDate', 'Date'],
        ];
        const missing = required.filter(([k]) => !clean(body[k])).map(([, label]) => label);
        if (missing.length) {
            return NextResponse.json({ error: `Please complete: ${missing.join(', ')}` }, { status: 400 });
        }
        if (!isValidEmail(String(body.email))) {
            return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
        }
        const acks = Array.isArray(body.acknowledgments) ? body.acknowledgments : [];
        if (acks.length !== acknowledgments.length || !acks.every((a: unknown) => a === true)) {
            return NextResponse.json({ error: 'Please check every box in section 4 to confirm.' }, { status: 400 });
        }

        const resume = await checkResume(form.get('resume'));
        if ('error' in resume) {
            return NextResponse.json({ error: resume.error }, { status: 400 });
        }

        const pick = (v: unknown, allowed: readonly string[]) => (typeof v === 'string' && allowed.includes(v) ? v : '');
        const areas = Array.isArray(body.experienceAreas)
            ? body.experienceAreas.filter((a: unknown) => typeof a === 'string' && (experienceAreas as readonly string[]).includes(a))
            : [];
        const roles = Array.isArray(body.workHistory) ? body.workHistory.slice(0, WORK_HISTORY_ROWS) : [];

        // Save the resume on the hosting first; if that fails nothing is written to the Sheet.
        let resumeUrl: string;
        try {
            resumeUrl = await storeResume(resume.file, resume.ext);
        } catch (err) {
            console.error('Careers resume upload error:', err);
            return NextResponse.json({ error: 'Your resume could not be saved. Please try again in a moment.' }, { status: 500 });
        }

        const row = [
            sheetTimestampIST(),
            job.title,
            clean(body.fullName, 200),
            clean(body.email, 200).toLowerCase(),
            clean(body.phone, 50),
            clean(body.street, 300),
            clean(body.cityStateZip, 200),
            pick(body.preferredContact, preferredContactOptions),
            clean(body.linkedin, 300),
            clean(body.startDate, 20),
            pick(body.b2bExperience, b2bExperienceOptions),
            areas.join('; '),
            clean(body.industries),
            clean(body.crmTools, 500),
            clean(body.largestDeal, 500),
            clean(body.whyInterested),
            ...Array.from({ length: WORK_HISTORY_ROWS }, (_, i) => {
                const r = roles[i] || {};
                return [clean(r.company, 200), clean(r.title, 200), clean(r.dates, 100), clean(r.results)];
            }).flat(),
            'Yes',
            body.backgroundConsent === true ? 'Yes' : 'No',
            clean(body.signatureName, 200),
            clean(body.signatureDate, 20),
            clean(body.pageUrl, 500),
            `=HYPERLINK("${resumeUrl}","Open resume")`,
        ];

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = `'${TAB}'!A:${columnLetter(HEADERS.length)}`;

        // Create the Careers tab with headers if it does not exist yet.
        const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: 'sheets.properties.title' });
        const hasTab = meta.data.sheets?.some((s) => s.properties?.title === TAB);
        if (!hasTab) {
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: { requests: [{ addSheet: { properties: { title: TAB, gridProperties: { frozenRowCount: 1 } } } }] },
            });
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `'${TAB}'!A1`,
                valueInputOption: 'RAW',
                requestBody: { values: [HEADERS] },
            });
        } else {
            // Tab created by an earlier version: add any new header columns (only row 1 is written).
            const head = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${TAB}'!1:1` });
            if ((head.data.values?.[0]?.length ?? 0) < HEADERS.length) {
                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: `'${TAB}'!A1`,
                    valueInputOption: 'RAW',
                    requestBody: { values: [HEADERS] },
                });
            }
        }

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: { values: [row] },
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('Careers application error:', error);
        return NextResponse.json({ error: 'Your application could not be sent. Please try again in a moment.' }, { status: 500 });
    }
}
