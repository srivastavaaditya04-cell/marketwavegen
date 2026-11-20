import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { openJobs } from "@/data/careers";
// Company text is reused from the About page so both pages always say the same thing.
import { aboutContent } from "@/data/about-data";

export const metadata: Metadata = {
    title: "Careers | Market Wavegen",
    description: "Open positions at Market Wavegen. " + aboutContent.whoWeAre.content[0],
    alternates: { canonical: "/careers" },
};

// Same offices as the Contact Us page.
const offices = [
    { region: "United States Hub", city: "Miami, FL" },
    { region: "UK Presence", city: "London" },
    { region: "India HQ", city: "Pune, Maharashtra" },
];

function SectionLabel({ children, dot = "bg-[#efef39]" }: { children: React.ReactNode; dot?: string }) {
    return (
        <p className="text-sm font-bold uppercase tracking-widest text-ink/50 mb-6 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
            {children}
        </p>
    );
}

export default function CareersPage() {
    const jobs = openJobs();
    const { whoWeAre, purpose, whyWeWin, compliance } = aboutContent;

    return (
        <div className="relative min-h-screen w-full bg-page text-ink overflow-hidden antialiased pt-28 md:pt-40 pb-16 md:pb-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,88,230,0.07)_0%,transparent_50%)] pointer-events-none" />

            <Container className="relative z-10">
                {/* Hero */}
                <header className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">Careers</h1>
                    <p className="text-lg md:text-xl text-ink/60 max-w-2xl mx-auto">{whoWeAre.content[0]}</p>
                </header>

                {/* Open positions */}
                <section className="max-w-4xl mx-auto mb-20 md:mb-28" aria-labelledby="open-positions">
                    <h2 id="open-positions" className="sr-only">Open positions</h2>
                    <SectionLabel>Open positions</SectionLabel>

                    {jobs.length === 0 ? (
                        <p className="rounded-2xl border border-ink/10 bg-ink/5 p-8 text-ink/60 text-lg">
                            There are no open positions right now.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {jobs.map((job) => (
                                <li key={job.slug}>
                                    <Link
                                        href={`/careers/${job.slug}`}
                                        className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 rounded-2xl border border-ink/10 bg-ink/5 p-6 md:p-8 hover:border-[#0158e6]/50 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan mb-2">{job.type}</p>
                                            <h3 className="text-2xl md:text-3xl font-bold text-ink mb-2">{job.title}</h3>
                                            <p className="text-ink/60">{job.summary}</p>
                                        </div>
                                        <span className="inline-flex items-center gap-2 shrink-0 rounded-full bg-[#0158e6] text-white px-6 py-3 font-bold text-sm uppercase tracking-wider group-hover:bg-[#33b5ff] transition-colors">
                                            View &amp; apply <ArrowUpRight className="w-4 h-4" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* About the company */}
                <section className="max-w-5xl mx-auto mb-20 md:mb-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16" aria-labelledby="who-we-are">
                    <div>
                        <SectionLabel dot="bg-[#33b5ff]">About Market Wavegen</SectionLabel>
                        <h2 id="who-we-are" className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{whoWeAre.title}</h2>
                        <div className="space-y-4 text-ink/70 text-lg">
                            {whoWeAre.content.slice(1).map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-[2rem] border border-ink/10 bg-ink/5 p-8 md:p-10">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{purpose.title}</h2>
                        <p className="text-xl md:text-2xl font-semibold text-brand-cyan mb-4">{purpose.content[0]}</p>
                        <div className="space-y-4 text-ink/70">
                            {purpose.content.slice(1).map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Market Wavegen */}
                <section className="max-w-5xl mx-auto mb-20 md:mb-28" aria-labelledby="why-wins">
                    <SectionLabel dot="bg-[#0158e6]">What you would represent</SectionLabel>
                    <h2 id="why-wins" className="text-3xl md:text-5xl font-bold tracking-tight mb-10">{whyWeWin.title}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {whyWeWin.items.map((item) => (
                            <li key={item.title} className="rounded-2xl border border-ink/10 bg-ink/5 p-6">
                                <div className="w-11 h-11 rounded-xl bg-[#0158e6]/10 border border-[#0158e6]/20 flex items-center justify-center mb-5">
                                    <item.icon className="w-5 h-5 text-brand-cyan" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-ink/60">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Offices + compliance */}
                <section className="max-w-5xl mx-auto mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    <div>
                        <SectionLabel dot="bg-[#33b5ff]">Where we work</SectionLabel>
                        <ul className="space-y-3">
                            {offices.map((o) => (
                                <li key={o.region} className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-ink/5 px-5 py-4">
                                    <MapPin className="w-5 h-5 text-brand-cyan shrink-0" />
                                    <div>
                                        <p className="font-bold">{o.region}</p>
                                        <p className="text-ink/60 text-sm">{o.city}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <SectionLabel>{compliance.title}</SectionLabel>
                        <ul className="grid grid-cols-2 gap-3">
                            {compliance.certificates.map((c) => (
                                <li key={c.name} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-ink/5 px-4 py-4">
                                    <ShieldCheck className="w-5 h-5 text-brand-yellow shrink-0" />
                                    <span className="font-semibold text-sm">{c.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <div className="max-w-5xl mx-auto text-center">
                    <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ink/60 hover:text-brand-cyan transition-colors">
                        More about Market Wavegen <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </Container>
        </div>
    );
}
