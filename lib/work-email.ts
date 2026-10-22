/**
 * Work-email check shared by the gated-video form and its API route.
 * Rejects personal / free mailbox providers so only company addresses get through.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Exact domains of free mailbox providers. */
const FREE_DOMAINS = new Set([
    "gmail.com", "googlemail.com",
    "aol.com", "aim.com",
    "icloud.com", "me.com", "mac.com",
    "protonmail.com", "protonmail.ch", "proton.me", "pm.me",
    "mail.com", "email.com", "usa.com", "post.com",
    "zohomail.com", "zoho.com",
    "fastmail.com", "fastmail.fm",
    "tutanota.com", "tutanota.de", "tuta.io", "tuta.com",
    "hey.com",
    "msn.com", "passport.com",
    "rediffmail.com", "rediff.com",
    "mail.ru", "bk.ru", "list.ru", "inbox.ru",
    "qq.com", "163.com", "126.com", "sina.com", "foxmail.com",
    "naver.com", "daum.net", "hanmail.net",
    "web.de", "t-online.de", "freenet.de",
    "laposte.net", "orange.fr", "wanadoo.fr", "free.fr", "sfr.fr",
    "libero.it", "virgilio.it", "tiscali.it",
    "seznam.cz", "wp.pl", "onet.pl", "o2.pl", "interia.pl",
    "btinternet.com", "sky.com", "talktalk.net", "virginmedia.com",
    "comcast.net", "verizon.net", "att.net", "sbcglobal.net", "cox.net", "charter.net",
    "shaw.ca", "rogers.com", "sympatico.ca", "bell.net",
    "bigpond.com", "optusnet.com.au", "iinet.net.au",
    "example.com", "example.org", "example.net", "test.com", "mailinator.com",
    "yopmail.com", "guerrillamail.com", "10minutemail.com", "temp-mail.org", "sharklasers.com",
]);

/**
 * Providers that exist under many country TLDs (yahoo.co.uk, hotmail.fr, outlook.de ...).
 * Matched on the first label of the domain.
 */
const FREE_BRANDS = new Set([
    "yahoo", "ymail", "rocketmail",
    "hotmail", "outlook", "live", "windowslive",
    "gmx", "yandex", "ya",
    "inbox", "mailbox",
]);

export function isValidEmail(email: string): boolean {
    return EMAIL_RE.test(email.trim());
}

export function isFreeEmail(email: string): boolean {
    const at = email.lastIndexOf("@");
    if (at < 0) return true;
    const domain = email.slice(at + 1).trim().toLowerCase();
    if (!domain) return true;
    if (FREE_DOMAINS.has(domain)) return true;
    const first = domain.split(".")[0];
    return FREE_BRANDS.has(first);
}

export function isWorkEmail(email: string): boolean {
    return isValidEmail(email) && !isFreeEmail(email);
}

export const WORK_EMAIL_MESSAGE = "Please use your work email (not Gmail, Yahoo, Outlook, etc.).";
