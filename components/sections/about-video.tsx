"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { aboutContent } from "@/data/about-data";
import { Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function AboutVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
    const videoSectionRef = useRef<HTMLDivElement>(null);
    const { video } = aboutContent;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Start playing when section is 50% visible and hasn't auto-played yet
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !hasAutoPlayed) {
                        setIsPlaying(true);
                        setHasAutoPlayed(true);
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% of the section is visible
            }
        );

        if (videoSectionRef.current) {
            observer.observe(videoSectionRef.current);
        }

        return () => {
            if (videoSectionRef.current) {
                observer.unobserve(videoSectionRef.current);
            }
        };
    }, [hasAutoPlayed]);

    return (
        <section ref={videoSectionRef} className="py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full bg-[#0158e6]/5 blur-[120px] -z-10" />

            <Container>
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4"
                    >
                        {video.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-lg max-w-2xl mx-auto"
                    >
                        {video.subtitle}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl group cursor-pointer">
                        {!isPlaying ? (
                            <div 
                                className="absolute inset-0 z-10 flex items-center justify-center group"
                                onClick={() => {
                                    setIsPlaying(true);
                                    setHasAutoPlayed(true);
                                }}
                            >
                                {/* Thumbnail Placeholder using a gradient/overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80 transition-opacity duration-500 group-hover:opacity-60" />
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40" />
                                
                                {/* Play Button */}
                                <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-[#0158e6] text-white shadow-[0_0_50px_rgba(1,88,230,0.5)] transform transition-all duration-500 group-hover:scale-110 group-hover:bg-[#33b5ff]">
                                    <Play size={40} className="fill-white ml-1" />
                                    {/* Rotating Ring */}
                                    <div className="absolute inset-[-8px] border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute inset-[-16px] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                </div>
                            </div>
                        ) : (
                            <iframe
                                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        )}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
