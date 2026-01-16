"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { faqs } from "@/data";
import Link from "next/link";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items?: FAQItem[];
    variant?: "default" | "embedded";
}

export function FAQ({ items = faqs, variant = "default" }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const Wrapper = variant === "default" ? Section : "div";
    const wrapperProps = variant === "default" ? { className: "relative overflow-hidden" } : { className: "relative" };

    return (
        <Wrapper {...wrapperProps}>
            {variant === "default" && (
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0158e6]/5 rounded-full blur-[120px] pointer-events-none" />
            )}

            <Container className="relative z-10">
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white uppercase mb-6 leading-tight">
                            Answering Your <br />
                            <span className="text-[#33b5ff]">Questions</span>
                        </h2>
                    </motion.div>
                    <div className="w-24 h-1 bg-[#0158e6] mt-8" />
                </div>

                <div className="grid lg:grid-cols-12 gap-16">

                    {/* Sidebar / Header */}
                    <div className="lg:col-span-4 transition-all">
                        <div className="sticky top-24">
                            <div className="mb-6 p-4 rounded-2xl bg-[#efef39]/10 w-fit">
                                <HelpCircle className="w-10 h-10 text-[#efef39]" />
                            </div>
                            <p className="text-lg text-neutral-400 mb-8 max-w-sm">
                                Everything you need to know about our signal-first approach and how we drive revenue.
                            </p>
                            <Link 
                                href="/contact"
                                className={cn(buttonVariants({ variant: "default", size: "default" }), "h-12 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer")}
                            >
                                Contact Support
                            </Link>
                            
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="lg:col-span-8 space-y-4">
                        {items.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`group rounded-2xl border transition-all duration-300 ${openIndex === index ? 'bg-[#1a1a1a] border-[#33b5ff]/50 shadow-[0_0_30px_-10px_rgba(51,181,255,0.2)]' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(index === openIndex ? null : index)}
                                    className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4"
                                >
                                    <span className={`text-xl font-medium transition-colors ${openIndex === index ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}. {faq.question}
                                    </span>
                                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all ${openIndex === index ? 'bg-[#33b5ff] border-[#33b5ff] text-white rotate-180' : 'border-white/20 text-white/50 group-hover:border-white/50 group-hover:text-white'}`}>
                                        {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 md:px-8 pb-8 pt-0">
                                                <p className="text-lg text-neutral-400 leading-relaxed border-t border-white/5 pt-6">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </Container>
        </Wrapper>

    );
}
