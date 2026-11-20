import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ApplicationForm } from "@/components/careers/application-form";
import { getJob, openJobs } from "@/data/careers";

type JobPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return openJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
    const { slug } = await params;
    const job = getJob(slug);
    if (!job) return {};
    return {
        title: `${job.title} | Careers | Market Wavegen`,
        description: `${job.type}. ${job.summary}`,
        alternates: { canonical: `/careers/${job.slug}` },
    };
}

export default async function JobPage({ params }: JobPageProps) {
    const { slug } = await params;
    const job = getJob(slug);
    if (!job) notFound();

    return (
        <div className="relative min-h-screen w-full bg-page text-ink overflow-hidden antialiased pt-28 md:pt-40 pb-16 md:pb-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,88,230,0.07)_0%,transparent_50%)] pointer-events-none" />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto mb-8">
                    <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ink/50 hover:text-brand-cyan transition-colors">
                        <ArrowLeft className="w-4 h-4" /> All open positions
                    </Link>
                </div>

                <header className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-4">{job.applicationTitle}</h1>
                    <p className="text-lg md:text-xl text-ink/60">{job.type} | Market Wavegen</p>
                </header>

                {job.facts.length > 0 && (
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        {job.facts.map((fact) => (
                            <div key={fact.label} className="rounded-2xl border border-ink/10 bg-ink/5 p-6">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-ink/50 mb-2">{fact.label}</p>
                                <p className="text-ink/80">{fact.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="max-w-4xl mx-auto">
                    <p className="text-ink/70 text-lg mb-12 border-l-2 border-[#efef39] pl-5">{job.intro}</p>
                    {job.form === "sales-rep-1099" && <ApplicationForm jobSlug={job.slug} />}
                </div>
            </Container>
        </div>
    );
}
