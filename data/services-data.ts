export interface Service {
    id: string;
    title: string;
    problem: string;
    whatWeDo: string;
    youGet: string;
    proof?: string;
}

export const services: Service[] = [
    {
        id: "01",
        title: "SIRS™ - Competitor Flip Revenue Programs",
        problem: "You miss accounts that are unhappy with their current vendor until they formally enter a buying cycle.",
        whatWeDo: "We detect dissatisfaction signals, identify switching windows, and activate targeted outreach to accounts under competitive pressure.",
        youGet: "Earlier access to accounts with higher win probability and larger deal size.",
        proof: "Pilot programs consistently show higher conversion rates for competitor-flip cohorts."
    },
    {
        id: "02",
        title: "Intelligent Database ABM™ - Pipeline Prioritization",
        problem: "Too many accounts. Poor focus. Low conversion.",
        whatWeDo: "We continuously score 498M+ companies using technographics, renewal data, intent, and behavior.",
        youGet: "Ranked account lists aligned to real buying timing.",
        proof: "Dynamic scoring reduced outreach to low-fit accounts in enterprise pilots."
    },
    {
        id: "03",
        title: "Multichannel Demand Creation and Capture",
        problem: "Single-channel outreach fails across complex buyer journeys.",
        whatWeDo: "We orchestrate email, LinkedIn, paid media, SEO, syndication, and voice as one coordinated system.",
        youGet: "Continuous demand flow and measurable lift in opportunities.",
        proof: "Programs maintain steady SQL velocity across quarters."
    },
    {
        id: "04",
        title: "Signal-Driven Tele Outreach",
        problem: "Meetings booked without context stall in sales.",
        whatWeDo: "We call high-signal prospects, confirm project fit, timing, and interest, then schedule contextual meetings.",
        youGet: "Higher meeting acceptance and better sales conversion.",
        proof: "Voice-verified programs improve meeting-to-opportunity ratios."
    },
    {
        id: "05",
        title: "Sales-Ready Conversation Delivery",
        problem: "Sales needs context, not raw names.",
        whatWeDo: "Every delivery includes validated role, intent summary, engagement history, and call notes.",
        youGet: "Faster follow-up and clearer next steps.",
        proof: "Shorter time-to-first-touch and higher booking quality."
    },
    {
        id: "06",
        title: "SEO + Syndication Amplification",
        problem: "Your content does not reach in-market buyers.",
        whatWeDo: "Regional SEO, persona mapping, syndication to industry hubs, and signal-led retargeting.",
        youGet: "Sustained inbound demand and stronger mid-funnel engagement.",
        proof: "Syndication cohorts show higher repeat engagement and lower CPL."
    },
    {
        id: "07",
        title: "Data Confidence and Compliance",
        problem: "Non-compliant outreach creates risk.",
        whatWeDo: "ISO-certified processes, consent lineage, and audit-ready data through Mantech Mark™.",
        youGet: "Safe activation in regulated markets."
    },
    {
        id: "08",
        title: "Revenue Alignment Strategy",
        problem: "Marketing and sales measure different outcomes.",
        whatWeDo: "Shared dashboards, common stage definitions, and quarterly reviews.",
        youGet: "Predictable forecasting and cleaner attribution."
    }
];

export const servicesFAQ = [
    {
        question: "Are Market Wavegen services modular?",
        answer: "Yes. Services are modular, allowing organizations to start with a single capability and expand based on performance and growth needs."
    },
    {
        question: "How is buyer engagement quality ensured before sales handoff?",
        answer: "Each engagement is delivered only after role verification, intent confirmation, and signal validation to ensure relevance and sales readiness."
    },
    {
        question: "How do you prevent low-quality or misaligned sales conversations?",
        answer: "All deliveries pass through multi-layer validation covering role accuracy, buying context, timing, and demonstrated interest."
    },
    {
        question: "Can Market Wavegen integrate with existing CRM and marketing systems?",
        answer: "Yes. Market Wavegen integrates with Salesforce, HubSpot, Marketo, and custom APIs to support seamless activation and reporting."
    },
    {
        question: "How are services measured for success?",
        answer: "Success is measured by pipeline created, sales readiness, conversion efficiency, velocity improvement, and cost effectiveness rather than contact volume."
    }
];

