"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { coreStrengths } from "@/data";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CoreStrengths() {
    return (
        <Section className="relative overflow-hidden py-32 bg-black">
            <Container>
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider mb-2">
                            Core <span className="text-[#33b5ff]">Strengths</span>
                        </h2>
                    </motion.div>

                    <div className="w-full max-w-7xl mx-auto">
                        <HoverEffect items={coreStrengths} />
                    </div>
                </div>
            </Container>
        </Section>
    );
}
