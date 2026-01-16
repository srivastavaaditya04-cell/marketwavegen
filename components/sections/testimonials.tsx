"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight, User2, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { testimonials } from "@/data";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight-new";

export function Testimonials() {
    const [idx, setIdx] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying || isMobile) return;
        const interval = setInterval(() => {
            setIdx((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, isMobile]);

    const next = () => {
        setIsAutoPlaying(false);
        setIdx((prev) => (prev + 1) % testimonials.length);
    };
    const prev = () => {
        setIsAutoPlaying(false);
        setIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <Section className="relative overflow-hidden bg-black py-24 lg:py-32">
            {/* Background Signal Accents */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(1,88,230,0.05)_0%,transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(239,239,57,0.05)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    {/* Header Sidebar */}
                    <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-[#33b5ff] animate-pulse" />
                                <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">Feedback Lab // 04</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none uppercase tracking-tighter">
                                What Our <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33b5ff] to-[#0158e6]">Partners Say</span>
                            </h2>

                            <p className="text-neutral-400 text-lg font-medium leading-relaxed max-w-md">
                                Real intelligence from the front lines of demand generation. See how we transform signal into revenue.
                            </p>

                            <div className=" hidden md:flex gap-3 pt-4">
                                <button
                                    onClick={prev}
                                    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-[#33b5ff] hover:bg-white/5 hover:border-[#33b5ff]/30 transition-all duration-300 active:scale-95"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={next}
                                    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-[#33b5ff] hover:bg-white/5 hover:border-[#33b5ff]/30 transition-all duration-300 active:scale-95"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>

                            {/* Progress Indicators - Hidden on mobile here, moved to bottom */}
                            <div className="hidden lg:flex gap-2 mt-8">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setIsAutoPlaying(false);
                                            setIdx(i);
                                        }}
                                        className={cn(
                                            "h-1 transition-all duration-500 rounded-full",
                                            idx === i ? "w-8 bg-[#33b5ff]" : "w-4 bg-white/10"
                                        )}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Testimonial Active Card / Stack */}
                    <div className="w-full lg:w-2/3">
                        <div className="relative">
                            {/* Decorative Quote Icon - Only on Desktop */}
                            <Quote className="hidden lg:block absolute -top-10 -left-6 w-20 h-20 text-[#33b5ff] opacity-10 rotate-12" />

                            <div className={cn(
                                "relative w-full",
                                isMobile ? "h-[550px] flex items-center justify-center pt-4" : "h-auto"
                            )}>
                                <AnimatePresence initial={false} mode="popLayout">
                                    {isMobile ? (
                                        // Mobile 3D Stack View
                                        testimonials.map((t, i) => {
                                            // Only render current and next 2 for performance/visuals
                                            const offset = (i - idx + testimonials.length) % testimonials.length;
                                            if (offset > 2) return null;

                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                                    animate={{
                                                        opacity: 1 - offset * 0.2,
                                                        scale: 1 - offset * 0.05,
                                                        y: offset * 25,
                                                        zIndex: 50 - offset,
                                                        rotate: offset === 0 ? 0 : (offset === 1 ? -2 : 2)
                                                    }}
                                                    exit={{
                                                        x: 500,
                                                        opacity: 0,
                                                        scale: 0.9,
                                                        rotate: 20,
                                                        transition: { duration: 0.4 }
                                                    }}
                                                    drag={offset === 0 ? "x" : false}
                                                    dragConstraints={{ left: 0, right: 0 }}
                                                    onDragEnd={(_, info) => {
                                                        if (info.offset.x > 80) prev();
                                                        else if (info.offset.x < -80) next();
                                                    }}
                                                    className="absolute w-[92%] h-[480px] bg-[#0a0a0a] border border-white/10 rounded-[32px] p-6 shadow-2xl flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing"
                                                >
                                                    <Spotlight
                                                        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(200, 100%, 85%, .08) 0, hsla(200, 100%, 55%, .03) 50%, hsla(200, 100%, 45%, 0) 80%)"
                                                        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .06) 0, hsla(200, 100%, 55%, .02) 80%, transparent 100%)"
                                                        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .04) 0, hsla(200, 100%, 45%, .01) 80%, transparent 100%)"
                                                        translateY={-150}
                                                        width={250}
                                                        height={600}
                                                        smallWidth={120}
                                                        duration={4}
                                                        xOffset={40}
                                                    />

                                                    <div className="space-y-4 relative z-10">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex gap-1">
                                                                {[...Array(5)].map((_, starIdx) => (
                                                                    <Star key={starIdx} size={10} className="fill-[#efef39] text-[#efef39]" />
                                                                ))}
                                                            </div>
                                                            <Quote className="w-5 h-5 text-[#33b5ff] opacity-40 shrink-0" />
                                                        </div>

                                                        <p className="text-lg font-light text-white leading-relaxed italic tracking-tight">
                                                            "{t.quote}"
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center p-2 mt-auto">
                                                            <User2 className="w-full h-full text-white/40" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-bold text-white tracking-tight uppercase truncate">{t.author}</div>
                                                            <div className="text-[#33b5ff] font-bold uppercase tracking-widest text-[8px] mt-0.5 break-words">{t.role}</div>
                                                        </div>
                                                    </div>

                                                    {/* Bottom Accent */}
                                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#33b5ff]/30 to-transparent" />
                                                </motion.div>
                                            );
                                        })
                                    ) : (
                                        // Desktop Refined Swipeable Card
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5 }}
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={0.2}
                                            onDragEnd={(_, info) => {
                                                if (info.offset.x > 100) prev();
                                                else if (info.offset.x < -100) next();
                                            }}
                                            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[40px] p-14 lg:p-16 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] overflow-hidden cursor-grab active:cursor-grabbing"
                                        >
                                            <Spotlight
                                                gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(200, 100%, 85%, .12) 0, hsla(200, 100%, 55%, .04) 50%, hsla(200, 100%, 45%, 0) 80%)"
                                                gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .08) 0, hsla(200, 100%, 55%, .03) 80%, transparent 100%)"
                                                gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .05) 0, hsla(200, 100%, 45%, .02) 80%, transparent 100%)"
                                                translateY={-250}
                                                width={400}
                                                height={1000}
                                                smallWidth={180}
                                                duration={5}
                                                xOffset={60}
                                            />

                                            <div className="space-y-12 relative z-10">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, starIdx) => (
                                                            <Star key={starIdx} size={14} className="fill-[#efef39] text-[#efef39]" />
                                                        ))}
                                                    </div>
                                                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Verified Partnership Outcome</div>
                                                </div>

                                                <blockquote className="relative">
                                                    <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight md:leading-snug italic tracking-tight">
                                                        "{testimonials[idx].quote}"
                                                    </p>
                                                </blockquote>

                                                <div className="flex items-center gap-6 pt-8 border-t border-white/5">
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center p-3">
                                                        <User2 className="w-full h-full text-white/40" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xl font-bold text-white tracking-tight uppercase">{testimonials[idx].author}</div>
                                                        <div className="text-neutral-500 font-bold uppercase tracking-widest text-xs mt-1">{testimonials[idx].role}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#33b5ff]/50 to-transparent" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile Info Overlay - Below the stack */}
                            {isMobile && (
                                <div className="mt-8 flex flex-col items-center gap-6">
                                    <div className="flex gap-2">
                                        {testimonials.map((_, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "h-1.5 transition-all duration-500 rounded-full",
                                                    idx === i ? "w-10 bg-[#33b5ff]" : "w-4 bg-white/10"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Swipe to Explore</p>
                                </div>
                            )}

                            {/* Desktop Controls - Hidden on Mobile */}
                            {!isMobile && (
                                <div className="absolute -inset-4 bg-[#0158e6]/3 blur-2xl -z-10 rounded-[60px]" />
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
