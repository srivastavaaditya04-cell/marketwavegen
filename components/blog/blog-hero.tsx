"use client";

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';

interface BlogHeroProps {
    badge?: string;
    title?: React.ReactNode;
    subtitle?: string;
    /** Shorter hero for listing pages that have more content below */
    compact?: boolean;
}

export function BlogHero({
    badge = "Knowledge Hub",
    title = (
        <>
            Insights & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0158e6] via-brand-cyan to-brand-yellow-vivid">
                Intelligence
            </span>
        </>
    ),
    subtitle = "Expert perspectives on B2B marketing, demand generation, and revenue growth",
    compact = false,
}: BlogHeroProps) {
    return (
        <section className={`relative ${compact ? 'min-h-[40vh] pt-28 md:pt-40 pb-8' : 'min-h-[60vh] pt-32 md:pt-48 pb-16'} flex items-center justify-center overflow-hidden`}>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,88,230,0.08)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,239,57,0.05)_0%,transparent_40%)]" />

            {/* Animated Grid */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <Container className="relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/10 bg-ink/5 mb-8 backdrop-blur-sm"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-ink/60">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className={`${compact ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-5xl md:text-7xl lg:text-8xl'} font-black uppercase tracking-wider leading-[0.9] mb-8`}
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-ink/60 font-light  inline-block"
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </Container>
        </section>
    );
}
