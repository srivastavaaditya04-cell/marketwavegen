import { google } from 'googleapis';
import { NextResponse } from 'next/server';

/**
 * Records how much of a gated video a lead has watched.
 * Writes only to the watch-metric columns (I:L) of the lead's own row in the
 * "Video Access" tab, so it can never touch the contact details in A:H.
 */
export async function POST(request: Request) {
    try {
        // navigator.sendBeacon sends text/plain, so parse manually.
        const raw = await request.text();
        const body = raw ? JSON.parse(raw) : {};
        const row = Number(body.row);
        const percent = Number(body.percent);
        const seconds = Number(body.seconds);
        const duration = Number(body.duration);

        if (!Number.isInteger(row) || row < 2 || row > 100000) {
            return NextResponse.json({ error: 'Invalid row' }, { status: 400 });
        }
        if (!Number.isFinite(percent) || !Number.isFinite(seconds)) {
            return NextResponse.json({ error: 'Invalid progress' }, { status: 400 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });

        const range = `'Video Access'!I${row}:L${row}`;

        // Never let a later, shorter session overwrite a higher watched figure.
        const existing = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range,
        });
        const prevPercent = Number(existing.data.values?.[0]?.[0] ?? 0) || 0;
        const prevSeconds = Number(existing.data.values?.[0]?.[1] ?? 0) || 0;

        const clampedPercent = Math.min(100, Math.max(0, Math.round(percent)));
        const finalPercent = Math.max(prevPercent, clampedPercent);
        const finalSeconds = Math.max(prevSeconds, Math.round(seconds));

        await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[
                    finalPercent,
                    finalSeconds,
                    Number.isFinite(duration) && duration > 0 ? Math.round(duration) : '',
                    new Date().toISOString(),
                ]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('Video progress error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
