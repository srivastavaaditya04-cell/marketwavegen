// Careers page content. Text is taken word for word from "MWG Application.docx"
// (Independent Sales Representative Application, Nov 2026). Only these changes were made, on the owner's instructions:
// - "B2B sales experience" had no options in the document; year ranges were chosen by the owner.
// - "CRM tools (Salesforce, HubSpot, etc.)" was printed as a checkbox but was not a working one; it is a normal option here.
// - The privacy notice's "contact the person who sent you this application" points to the Contact Us page.
// - The Word-only instruction "Click a gray field to type, choose from a list, or check a box." is left out of the intro.

// ---------------------------------------------------------------------------
// Open positions. To add a job: add an entry to `jobs` with a unique `slug`.
// It gets its own page at /careers/<slug> and appears on /careers automatically.
// `form` picks which application form the job uses (only "sales-rep-1099" exists today).
// To close a job, remove it (or set `open: false`).
// ---------------------------------------------------------------------------

export type JobForm = "sales-rep-1099";

export type Job = {
    slug: string;
    open: boolean;
    title: string;
    /** Short label shown on the listing card and under the title. */
    type: string;
    /** One or two lines for the listing card. */
    summary: string;
    /** Label/value facts shown as cards on the job page. */
    facts: { label: string; value: string }[];
    /** Paragraph shown above the application form. */
    intro: string;
    applicationTitle: string;
    form: JobForm;
};

export const jobs: Job[] = [
    {
        slug: "independent-sales-representative",
        open: true,
        title: "Independent Sales Representative",
        type: "1099 Independent Contractor Position",
        summary: "B2B demand generation: intent-driven leads, data solutions, content syndication and digital marketing",
        facts: [
            { label: "Services Sold", value: "B2B demand generation: intent-driven leads, data solutions, content syndication and digital marketing" },
            { label: "Engagement Type", value: "1099 independent contractor (commission-based)" },
        ],
        intro:
            "Thank you for your interest in representing Market Wavegen. Market Wavegen helps B2B organizations turn real-time buyer signals into predictable pipeline. Please complete every field below. Fields marked * are required.",
        applicationTitle: "Independent Sales Representative Application",
        form: "sales-rep-1099",
    },
];

export const openJobs = () => jobs.filter((j) => j.open);
export const getJob = (slug: string) => jobs.find((j) => j.slug === slug && j.open);

// ---------------------------------------------------------------------------
// Form content for the "sales-rep-1099" application (from MWG Application.docx).
// ---------------------------------------------------------------------------

export const preferredContactOptions = ["Email", "Text", "Phone"] as const;

export const b2bExperienceOptions = [
    "Less than 1 year",
    "1–3 years",
    "3–5 years",
    "5–10 years",
    "10+ years",
] as const;

export const experienceAreas = [
    "Demand generation / lead generation",
    "Content syndication",
    "Account-based marketing (ABM)",
    "Intent data and buyer signals",
    "SaaS / technology sales",
    "Marketing or advertising services",
    "Cold calling and phone outreach",
    "LinkedIn and email outreach",
    "CRM tools (Salesforce, HubSpot, etc.)",
] as const;

export const workHistoryIntro = "List your three most recent roles, including independent or contract work.";
export const WORK_HISTORY_ROWS = 3;

export const acknowledgmentsIntro =
    "This is an application for an independent contractor engagement, not employment. Final terms will be set out in a written agreement. Please check each box to confirm.";

export const acknowledgments = [
    "I understand this is a 1099 independent contractor role, not an employee position.",
    "I understand compensation is commission-based and income is not guaranteed.",
    "I understand I am responsible for my own taxes, tools and business expenses.",
    "I will represent Market Wavegen services accurately and follow applicable laws on outreach and data privacy.",
    "I certify that the information in this application is true and complete.",
] as const;

export const equalOpportunityStatement =
    "Market Wavegen is committed to equal opportunity. We consider all applicants for independent contractor engagements without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability, veteran status, or any other characteristic protected by applicable law.";

export const backgroundConsent =
    "I consent to Market Wavegen contacting my references and conducting a background check, as permitted by applicable law. (Optional)";

// The document's last sentence ("contact the person who sent you this application") is replaced by a Contact Us link in the page.
export const privacyNotice =
    "Market Wavegen uses the information in this application only to evaluate your suitability for an independent contractor sales engagement, to contact you and your references, and to prepare an agreement if you are selected. Your information is stored securely, is accessible only to personnel involved in the selection process, and is not sold or shared for marketing purposes. It is kept only as long as needed for these purposes or as required by law.";

// ---------------------------------------------------------------------------
// Resume upload (used by the form and the API route).
// Vercel functions accept request bodies up to 4.5 MB, so the file limit is 4 MB.
// ---------------------------------------------------------------------------
export const RESUME_MAX_BYTES = 4 * 1024 * 1024;
export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
export const RESUME_ACCEPT = RESUME_EXTENSIONS.join(",");
export const RESUME_HELP = "PDF, DOC or DOCX, up to 4 MB";
