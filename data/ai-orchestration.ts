import { Cpu, Network, Zap, ShieldCheck } from "lucide-react";

export const aiOrchestrationCards = [
    {
        title: "Real-Time Signal Detection",
        desc: "Analyzing 32 million daily signals to identify active buying groups and intent.",
        icon: Zap,
        color: "from-[#efef39] to-[#efef39]/50"
    },
    {
        title: "Smart Account Prioritization",
        desc: "Scoring and ranking accounts based on buying readiness and potential revenue impact.",
        icon: Network,
        color: "from-[#33b5ff] to-[#33b5ff]/50"
    },
    {
        title: "Automated Campaign Sequencing",
        desc: "Orchestrating multi-channel outreach triggered by verified behavioral changes.",
        icon: Cpu,
        color: "from-[#0158e6] to-[#0158e6]/50"
    },
    {
        title: "Continuous Optimization Loop",
        desc: "AI-driven feedback cycles that refine targeting and messaging based on performance data.",
        icon: ShieldCheck,
        color: "from-white to-white/50"
    }
];
