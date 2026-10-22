/**
 * Formats a date as "YYYY-MM-DD HH:MM:SS" in Indian Standard Time.
 * Written with USER_ENTERED, Google Sheets parses this as a real date-time,
 * so the column can be formatted, sorted and filtered.
 */
export function sheetTimestampIST(date: Date = new Date()): string {
    return new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
    }).format(date);
}
