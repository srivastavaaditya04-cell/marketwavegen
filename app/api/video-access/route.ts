import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getGatedVideo } from '@/data/videos';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { slug, name, email, phone, company, pageUrl, website } = body;

        // Honeypot: real users never fill this hidden field.
        if (website) {
            return NextResponse.json({ success: true });
        }

        const video = getGatedVideo(String(slug || ''));
        if (!video) {
            return NextResponse.json({ error: 'Unknown video' }, { status: 404 });
        }

        if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
            return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const appended = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "'Video Access'!A:H",
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        new Date().toISOString(),
                        video.title,
                        (name || '').toString().trim(),
                        email.trim(),
                        (phone || '').toString().trim(),
                        (company || '').toString().trim(),
                        (pageUrl || '').toString(),
                        '',
                    ],
                ],
            },
        });

        // e.g. "'Video Access'!A12:H12" -> 12. The player posts watch progress to this row.
        const updatedRange = appended.data.updates?.updatedRange || '';
        const rowMatch = updatedRange.match(/!A(\d+):/);
        const row = rowMatch ? Number(rowMatch[1]) : null;

        return NextResponse.json({ success: true, src: video.src, row });
    } catch (error: unknown) {
        console.error('Video access error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
