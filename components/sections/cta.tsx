"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Mail, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridBackground, DotBackground } from "@/components/ui/background-patterns";
import { Spotlight } from "@/components/ui/spotlight-new";


const CTA_BG_VARIANT: 'beams' | 'grid' | 'dots' | 'spotlight' | 'signal-rings' = 'beams';

export function CTA() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source: 'CTA - Try Mantech Mark',
                    email,
                }),
            });

            if (res.ok) {
                setStatus('success');
                setEmail("");
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-black flex items-center justify-center">
            {/* Background Selector */}
            {CTA_BG_VARIANT === 'beams' && (
                <BackgroundBeams className="opacity-40" />
            )}

            {CTA_BG_VARIANT === 'grid' && (
                <div className="absolute inset-0 opacity-20">
                    <GridBackground />
                </div>
            )}

            {CTA_BG_VARIANT === 'dots' && (
                <div className="absolute inset-0 opacity-30">
                    <DotBackground />
                </div>
            )}

            {CTA_BG_VARIANT === 'spotlight' && (
                <div className="absolute inset-0 z-0">
                    <Spotlight
                        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(200, 100%, 85%, .08) 0, hsla(200, 100%, 55%, .02) 50%, hsla(200, 100%, 45%, 0) 80%)"
                    />
                </div>
            )}

            {CTA_BG_VARIANT === 'signal-rings' && (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    {[1, 2, 3].map((ring) => (
                        <motion.div
                            key={ring}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 2.5, opacity: [0, 1, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: ring * 1.2,
                                ease: "linear"
                            }}
                            className="absolute w-[600px] h-[600px] border border-[#33b5ff]/30 rounded-full"
                        />
                    ))}
                </div>
            )}

            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0158e6]/10 blur-[120px] rounded-full" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#33b5ff]/5 blur-[100px] rounded-full" />
            </div>

            <Container className="relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-16 relative overflow-hidden group">
                        {/* Dynamic Border Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#0158e6] to-[#33b5ff] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />

                        <div className="space-y-8 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#0158e6]/20 border border-[#0158e6]/30">
                                    <Zap size={14} className="text-[#33b5ff] fill-[#33b5ff]" />
                                    <span className="text-[10px] font-bold text-[#33b5ff] uppercase tracking-widest">Limited Access Pilot</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                                    Try out <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33b5ff] to-[#0158e6]">Mantech Mark</span> now!
                                </h2>

                                <p className="text-neutral-400 text-lg leading-relaxed max-w-sm">
                                    Harness the power of signal-first demand generation and transform your outreach today.
                                </p>
                            </motion.div>

                        </div>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-6"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Create New Work!</h3>
                                    <p className="text-neutral-500 text-sm">Submit your email to receive our precision-targeting data samples.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative group/input">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#33b5ff] transition-colors" size={20} />
                                        <input
                                            type="email"
                                            placeholder="Email *"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#33b5ff]/50 focus:bg-white/10 transition-all"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={status === 'loading' || status === 'success'}
                                        className={cn(
                                            "w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs border border-white/10 transition-all",
                                            status === 'success' ? "bg-green-500/20 text-green-500 border-green-500/50" : "bg-white/10 hover:bg-white/20 text-white"
                                        )}
                                    >
                                        {status === 'loading' ? 'Encrypting Signal...' :
                                            status === 'success' ? 'Signal Transmitted' :
                                                status === 'error' ? 'Transmission Failed' : 'Activate Signal'}
                                    </Button>
                                </form>

                                <p className="text-[10px] text-center text-white/20 uppercase tracking-widest font-medium">
                                    ISO Certified // GDPR Compliant
                                </p>
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#0158e6]/20 blur-2xl rounded-full" />
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#33b5ff]/10 blur-3xl rounded-full" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
