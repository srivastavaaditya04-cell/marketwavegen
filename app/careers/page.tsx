import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { openJobs } from "@/data/careers";

export const metadata: Metadata = {
    title: "Careers | Market Wavegen",
    description: "Open positions at Market Wavegen.",
    alternates: { canonical: "/careers" },
};

export default function CareersPage() {
    const jobs = openJobs();
    return (
        <div className="relative min-h-screen w-full bg-page text-ink overflow-hidden antialiased pt-28 md:pt-40 pb-16 md:pb-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,88,230,0.07)_0%,transparent_50%)] pointer-events-none" />

            <Container className="relative z-10">
                <header className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">Careers</h1>
                </header>

                <section className="max-w-4xl mx-auto" aria-labelledby="open-positions">
                    <h2 id="open-positions" className="text-sm font-bold uppercase tracking-widest text-ink/50 mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#efef39]" />
                        Open positions
                    </h2>

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
            </Container>
        </div>
    );
}
