import { NextResponse } from 'next/server';
import { getJob, RESUME_EXTENSIONS, RESUME_MAX_BYTES } from '@/data/careers';
import { makeSlip } from '@/lib/resume-slip';

// Step 1 of a resume upload: checks what the applicant wants to upload and returns a short-lived signed upload slip
// plus the address of the receiver. The file itself never passes through this server.
export async function POST(request: Request) {
    try {
        const secret = process.env.RESUME_UPLOAD_SECRET;
        const uploadUrl = process.env.RESUME_UPLOAD_URL;
        if (!secret || !uploadUrl) {
            console.error('Careers slip: RESUME_UPLOAD_SECRET / RESUME_UPLOAD_URL are not set');
            return NextResponse.json({ error: 'Resume upload is not available right now. Please try again later.' }, { status: 503 });
        }

        const body = await request.json().catch(() => null);
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
        }
        if (!getJob(String(body.jobSlug || ''))) {
            return NextResponse.json({ error: 'This position is no longer open.' }, { status: 400 });
        }

        const name = typeof body.fileName === 'string' ? body.fileName : '';
        const dot = name.lastIndexOf('.');
        const ext = dot >= 0 ? name.slice(dot).toLowerCase() : '';
        if (!(RESUME_EXTENSIONS as readonly string[]).includes(ext)) {
            return NextResponse.json({ error: 'Please upload a PDF, DOC or DOCX file.' }, { status: 400 });
        }
        const size = Number(body.size);
        if (!Number.isFinite(size) || size <= 0) {
            return NextResponse.json({ error: 'That file is empty.' }, { status: 400 });
        }
        if (size > RESUME_MAX_BYTES) {
            return NextResponse.json({ error: 'Your resume is too large. The limit is 4 MB.' }, { status: 400 });
        }

        return NextResponse.json({ uploadUrl, token: makeSlip(secret, ext.slice(1)) });
    } catch (error: unknown) {
        console.error('Careers slip error:', error);
        return NextResponse.json({ error: 'Resume upload is not available right now. Please try again later.' }, { status: 500 });
    }
}
