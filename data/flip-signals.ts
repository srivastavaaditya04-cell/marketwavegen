import { MessageSquare, Globe, Briefcase, ArrowLeftRight, AlertTriangle, Clock, XCircle, Sun } from "lucide-react";

export const signalSources = [
    { text: "Product reviews and forums", icon: MessageSquare },
    { text: "Open social discussions", icon: Globe },
    { text: "Job postings and hiring indicators", icon: Briefcase },
    { text: "Public competitor comparisons", icon: ArrowLeftRight }
];

export const emotionalContext = [
    { text: "Frustration with current vendors", icon: AlertTriangle },
    { text: "Urgency driven by timelines or pressure", icon: Clock },
    { text: "Dissatisfaction around pricing, support, or adoption", icon: XCircle },
    { text: "Optimism tied to new initiatives", icon: Sun }
];
