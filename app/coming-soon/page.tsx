"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight-new";
import { motion } from "framer-motion";
import { Timer, ArrowLeft, Rocket, Zap, Bell } from "lucide-react";
import Link from "next/link";

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#efef39] selection:text-black flex flex-col justify-center relative overflow-hidden">
            <Spotlight />

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(1,88,230,0.08),transparent_70%)]" />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    {/* Status Badge */}
                 

                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mt-20 mb-4">
                            Feature <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase">Incoming</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto">
                            Our team is currently engineering this module. We&apos;re building the next generation of revenue operations infrastructure.
                        </p>
                    </motion.div>

                    {/* Visual Element */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex justify-center gap-8 py-8"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-[#0158e6]/20 blur-2xl rounded-full group-hover:bg-[#0158e6]/30 transition-all" />
                            <Timer className="w-20 h-20 text-[#0158e6] relative z-10 animate-pulse" />
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                    >
                        <Link href="/">
                            <Button className="h-16 px-10 rounded-2xl bg-white text-black font-black text-lg hover:bg-[#efef39] transition-all transform hover:scale-[1.02] active:scale-95 group">
                                <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                BACK TO BASE
                            </Button>
                        </Link>

                        <Button variant="outline" className="h-16 px-10 rounded-2xl border-white/10 bg-transparent text-white font-bold text-lg hover:border-[#33b5ff] transition-all backdrop-blur-sm group">
                            <Bell className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                            NOTIFY ME
                        </Button>
                    </motion.div>
                </div>
            </Container>

            {/* Matrix-like decorative elements */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-x-1/2 pointer-events-none" />
        </div>
    );
}
