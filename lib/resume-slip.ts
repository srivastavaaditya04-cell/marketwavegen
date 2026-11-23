// Signed upload slips for resumes.
//
// The browser uploads a resume straight to the receiver on the Hostinger hosting. To stop strangers using that
// receiver, the website first mints a short-lived "slip" signed with a secret shared with the hosting
// (RESUME_UPLOAD_SECRET here, 'secret' in the hosting's config.php). The receiver replies with the file's link and a
// signature over it, which the website checks before writing the link into the Sheet.
// The message formats below must stay identical to hosting/resume-receiver/upload.php.
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { RESUME_MAX_BYTES } from '@/data/careers';

export const SLIP_TTL_SECONDS = 300;

const hmac = (secret: string, message: string) => createHmac('sha256', secret).update(message).digest('hex');

/** ext without the dot: pdf, doc or docx. Returns "v1.<expires>.<nonce>.<ext>.<signature>". */
export function makeSlip(secret: string, ext: string, nowMs: number = Date.now()): string {
    const expires = Math.floor(nowMs / 1000) + SLIP_TTL_SECONDS;
    const nonce = randomBytes(16).toString('hex');
    const sig = hmac(secret, `slip:v1:${expires}:${nonce}:${ext}:${RESUME_MAX_BYTES}`);
    return `v1.${expires}.${nonce}.${ext}.${sig}`;
}

/** True only for a plain https link that the receiver signed. The link ends up inside a Sheets formula. */
export function verifyResumeUrl(secret: string, url: string, sig: string): boolean {
    if (!/^https:\/\/[A-Za-z0-9._~\/-]+$/.test(url) || !/^[a-f0-9]{64}$/.test(sig)) return false;
    const expected = Buffer.from(hmac(secret, `url:v1:${url}`));
    const given = Buffer.from(sig);
    return expected.length === given.length && timingSafeEqual(expected, given);
}
