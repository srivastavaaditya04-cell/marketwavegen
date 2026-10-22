import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getGatedVideo } from '@/data/videos';
import { isValidEmail, isFreeEmail, WORK_EMAIL_MESSAGE } from '@/lib/work-email';
import { sheetTimestampIST } from '@/lib/sheet-time';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { slug, email, pageUrl, website } = body;

        // Honeypot: real users never fill this hidden field.
        if (website) {
            return NextResponse.json({ success: true });
        }

        const video = getGatedVideo(String(slug || ''));
        if (!video) {
            return NextResponse.json({ error: 'Unknown video' }, { status: 404 });
        }

        if (typeof email !== 'string' || !isValidEmail(email)) {
            return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
        }
        if (isFreeEmail(email)) {
            return NextResponse.json({ error: WORK_EMAIL_MESSAGE }, { status: 400 });
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
                // Columns: Time (IST) | Email | Video | Watched % | Watched (sec) | Video Length (sec) | Last Watched (IST) | Page URL
                // The watch columns (D:G) are filled later by /api/video-progress.
                values: [
                    [
                        sheetTimestampIST(),
                        email.trim().toLowerCase(),
                        video.title,
                        0,
                        0,
                        '',
                        '',
                        (pageUrl || '').toString(),
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
