"use client";

import { Container } from "@/components/ui/container";
import { privacyPolicyMainContent } from "@/data/privacy-policy-data";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-page overflow-hidden antialiased pt-28 md:pt-40 pb-12 md:pb-24">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,88,230,0.05)_0%,transparent_50%)]" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-ink mb-6 tracking-tight uppercase">
                        {privacyPolicyMainContent.title}
                    </h1>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#efef39]/30 bg-[#efef39]/10 backdrop-blur-sm">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
                            Effective Date: {privacyPolicyMainContent.lastUpdated}
                        </span>
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-brand-yellow uppercase tracking-wider border-l-4 border-[#efef39] pl-6">
                            {privacyPolicyMainContent.introduction.title}
                        </h2>
                        <div className="space-y-4 text-ink/60 leading-relaxed text-lg ml-7">
                            {privacyPolicyMainContent.introduction.content.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Main Sections */}
                    {privacyPolicyMainContent.sections.map((section) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-ink uppercase tracking-wider border-l-4 border-[#0158e6] pl-6">
                                {section.title}
                            </h2>

                            <div className="space-y-6 ml-7">
                                {section.intro && (
                                    <p className="text-ink/75 text-lg leading-relaxed">
                                        {section.intro}
                                    </p>
                                )}

                                {section.items && (
                                    <ul className="space-y-4 text-ink/60 leading-relaxed text-lg list-disc pl-5">
                                        {section.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}

                                {section.content && (
                                    <div className="space-y-4 text-ink/60 leading-relaxed text-lg">
                                        {section.content.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                )}

                                {section.footer && (
                                    <p className="text-brand-cyan font-medium pt-4 border-t border-ink/5">
                                        {section.footer}
                                    </p>
                                )}

                                {section.legalCounsel && (
                                    <div className="p-6 rounded-2xl bg-ink/5 border border-ink/10 mt-6 backdrop-blur-sm">
                                        <p className="text-ink font-bold mb-1">{section.legalCounsel.name}</p>
                                        <p className="text-brand-yellow font-mono">{section.legalCounsel.email}</p>
                                    </div>
                                )}

                                {section.closing && (
                                    <div className="space-y-4 text-ink/60 leading-relaxed text-lg mt-8 italic">
                                        {section.closing.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
