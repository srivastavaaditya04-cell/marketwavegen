"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const beamsRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Basic canvas animation setup for "beams" effect
        // Simplified version for robust implementation without external heavy libs
        const canvas = beamsRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        // Particles/Beams
        const beams: { x: number; y: number; speed: number; opacity: number; length: number }[] = [];
        for (let i = 0; i < 20; i++) {
            beams.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 0.5 + Math.random() * 1.5,
                opacity: Math.random() * 0.5,
                length: 100 + Math.random() * 200
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "rgba(1, 88, 230, 0)");
            gradient.addColorStop(0.5, "rgba(1, 88, 230, 0.05)");
            gradient.addColorStop(1, "rgba(1, 88, 230, 0)");

            beams.forEach((beam) => {
                beam.y -= beam.speed;
                if (beam.y + beam.length < 0) {
                    beam.y = canvas.height + beam.length;
                    beam.x = Math.random() * canvas.width;
                }

                const beamGradient = ctx.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.length);
                beamGradient.addColorStop(0, "rgba(1, 88, 230, 0)");
                beamGradient.addColorStop(0.5, `rgba(1, 88, 230, ${beam.opacity})`);
                beamGradient.addColorStop(1, "rgba(1, 88, 230, 0)");

                ctx.strokeStyle = beamGradient;
                ctx.lineWidth = 2; // Thin subtle beams
                ctx.beginPath();
                ctx.moveTo(beam.x, beam.y);
                ctx.lineTo(beam.x, beam.y + beam.length);
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 pointer-events-none opacity-40",
                className
            )}
        >
            <canvas ref={beamsRef} className="h-full w-full" />
        </div>
    );
};
