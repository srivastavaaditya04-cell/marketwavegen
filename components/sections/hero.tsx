"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroStats } from "@/data";
import Link from "next/link";

export function Hero() {
    return (
        <div className="relative flex flex-col justify-center min-h-screen w-full bg-[#0A0A0A] overflow-hidden antialiased">
            <BackgroundBeams />

            <Container className="relative z-10 pt-26 md:pt-40 pb-20 md:pb-32 flex flex-col justify-center min-h-[90vh]">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    <div className="lg:col-span-12 max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-normal text-white mb-6 leading-none">
                                Engage Active <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0158e6] via-[#33b5ff] to-[#0158e6] bg-[length:200%_auto] animate-shine">
                                    Buyers
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <h2 className="text-xl md:text-3xl lg:text-4xl font-light text-white/90 border-l-4 border-[#efef39] pl-6 italic">
                                Validate Real Intent. <br />
                                Build Predictable Pipeline.
                            </h2>

                            <div className="space-y-2 pl-6 border-l border-white/10">
                                <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed font-medium">
                                    Turn Real Buyer Activity Into Revenue Impact
                                </p>

                                <p className="text-sm md:text-base lg:text-lg text-neutral-400 leading-relaxed max-w-3xl">
                            Market Wavegen helps B2B teams identify in-market buying groups, validate interest through human-led conversations, and scale revenue pipeline across global regions. Every program runs on Mantech Mark™, our ISO-certified signal intelligence platform analyzing more than 32 million daily buyer signals across industries, geographies, and buying journeys.
                                </p>

                                {/* <div className="flex flex-col sm:flex-row items-center gap-4 p-4 md:p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
                                    <div className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#efef39]/10 border border-[#efef39]/20">
                                        <div className="w-2 h-2 rounded-full bg-[#efef39] animate-pulse"></div>
                                        <span className="text-[10px] md:text-sm font-semibold text-[#efef39] tracking-wide whitespace-nowrap">POWERED BY MANTECH MARK™</span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed text-center sm:text-left">
                                        Our ISO-certified signal intelligence platform analyzing <span className="text-white font-semibold">32M+ daily buyer signals</span> across industries, geographies, and buying journeys.
                                    </p>
                                </div> */}
                            </div>
                             <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Link
                                    href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1LRerQzILalOQbfT9l5lWQ6abwrkk6n45IbqR_cPsf8tH09a8kVlButSqrKMTkMo1De-h8vUdB"
                                    target="_blank"
                                    className="flex items-center justify-center h-12 md:h-14 px-6 md:px-8 cursor-pointer rounded-full bg-[#0158e6] hover:bg-[#0046b8] text-white text-base md:text-lg font-medium shadow-[0_20px_40px_-15px_rgba(1,88,230,0.3)] transition-all hover:scale-105 hover:shadow-[0_25px_50px_-6px_rgba(1,88,230,0.2)]"
                                >
                                    Start Your Pilot <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                                <Link 
                                     href="https://wa.me/+919077000077" 
                                    target="_blank"
                                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 md:h-14 px-6 md:px-8 cursor-pointer rounded-full border-white/10 bg-transparent hover:bg-[#efef39] text-white text-base md:text-lg hover:border-white/20 backdrop-blur-md transition-all hover:scale-105")}
                                >
                                  Talk to Our Team
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* <div className="lg:col-span-4 space-y-6">
                        {heroStats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + (idx * 0.1) }}
                                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                        <stat.icon size={28} />
                                    </div>
                                    <div>
                                        <div className={`text-3xl font-bold font-mono ${stat.color}`}>{stat.title}</div>
                                        <div className="text-sm text-neutral-400 font-medium uppercase tracking-wider">{stat.sub}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div> */}
                </div>
            </Container>
        </div>
    );
}
