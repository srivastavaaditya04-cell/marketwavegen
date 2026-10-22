"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Building2, Play, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GatedVideo } from "@/data/videos";

interface VideoGateProps {
    video: GatedVideo;
}

const storageKey = (slug: string) => `video-access:${slug}`;

/** Progress is reported when the viewer crosses these percentages. */
const MILESTONES = [10, 25, 50, 75, 90, 100];

export function VideoGate({ video }: VideoGateProps) {
    const [unlocked, setUnlocked] = useState(false);
    const [leadRow, setLeadRow] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [website, setWebsite] = useState(""); // honeypot
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    // Returning viewers who already unlocked this video skip the form.
    useEffect(() => {
        try {
            const saved = window.localStorage.getItem(storageKey(video.slug));
            if (saved) {
                const parsed = JSON.parse(saved);
                setLeadRow(typeof parsed.row === "number" ? parsed.row : null);
                setUnlocked(true);
            }
        } catch {
            /* storage unavailable: just show the form */
        }
    }, [video.slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setErrorMsg("");
        try {
            const res = await fetch("/api/video-access", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    slug: video.slug,
                    name,
                    email,
                    company,
                    website,
                    pageUrl: window.location.href,
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Something went wrong");
            }

            const data = await res.json().catch(() => ({}));
            const row = typeof data.row === "number" ? data.row : null;
            try {
                window.localStorage.setItem(storageKey(video.slug), JSON.stringify({ row }));
            } catch {
                /* ignore */
            }
            setLeadRow(row);
            setUnlocked(true);
            setStatus("idle");
        } catch (err) {
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
        }
    };

    if (unlocked) {
        return <GatedPlayer video={video} leadRow={leadRow} />;
    }

    const inputClass =
        "w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#33b5ff]/50 focus:bg-white/10 transition-all";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Locked preview */}
            <div className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0158e6]/20 via-black to-[#33b5ff]/10 min-h-[260px] flex items-center justify-center">
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                    <div className="w-20 h-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center">
                        <Lock className="text-white/60" size={28} />
                    </div>
                    <p className="text-sm uppercase tracking-widest text-neutral-400 font-bold">
                        Fill in the form to unlock
                    </p>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0158e6]/30 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#33b5ff]/20 blur-3xl rounded-full" />
            </div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-6"
            >
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Watch the video</h3>
                    <p className="text-neutral-500 text-sm">Enter your work email and we&apos;ll unlock it instantly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot, hidden from humans */}
                    <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden="true"
                    />

                    <div className="relative group/input">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#33b5ff] transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div className="relative group/input">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#33b5ff] transition-colors" size={20} />
                        <input
                            type="email"
                            placeholder="Work email *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className="relative group/input">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#33b5ff] transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={status === "loading"}
                        className={cn(
                            "w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs border border-white/10 transition-all gap-2",
                            "bg-white/10 hover:bg-white/20 text-white"
                        )}
                    >
                        <Play size={14} />
                        {status === "loading" ? "Unlocking..." : "Unlock & Watch"}
                    </Button>

                    {status === "error" && (
                        <p className="text-xs text-red-400 text-center">{errorMsg}</p>
                    )}
                </form>

                <p className="text-[10px] text-center text-white/20 uppercase tracking-widest font-medium">
                    We respect your inbox. No spam.
                </p>
            </motion.div>
        </div>
    );
}

/**
 * Player that reports watch progress to the lead's row in the sheet.
 * Tracks the furthest point reached (not the current position), so seeking
 * backwards never lowers the figure. Reports at milestones, on pause/end, and
 * when the tab is hidden or closed (via sendBeacon so the request survives).
 */
function GatedPlayer({ video, leadRow }: { video: GatedVideo; leadRow: number | null }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const maxTimeRef = useRef(0);
    const lastSentPercentRef = useRef(-1);
    const nextMilestoneRef = useRef(0);

    const report = useCallback(
        (useBeacon = false) => {
            if (leadRow === null) return;
            const el = videoRef.current;
            const duration = el?.duration && Number.isFinite(el.duration) ? el.duration : 0;
            const seconds = maxTimeRef.current;
            const percent = duration > 0 ? Math.min(100, Math.round((seconds / duration) * 100)) : 0;
            if (percent <= lastSentPercentRef.current) return;
            lastSentPercentRef.current = percent;

            const payload = JSON.stringify({ row: leadRow, percent, seconds, duration });
            if (useBeacon && typeof navigator.sendBeacon === "function") {
                navigator.sendBeacon("/api/video-progress", new Blob([payload], { type: "text/plain" }));
            } else {
                fetch("/api/video-progress", {
                    method: "POST",
                    headers: { "Content-Type": "text/plain" },
                    body: payload,
                    keepalive: true,
                }).catch(() => { /* best effort */ });
            }
        },
        [leadRow]
    );

    useEffect(() => {
        const onHide = () => {
            if (document.visibilityState === "hidden") report(true);
        };
        const onUnload = () => report(true);
        document.addEventListener("visibilitychange", onHide);
        window.addEventListener("pagehide", onUnload);
        return () => {
            document.removeEventListener("visibilitychange", onHide);
            window.removeEventListener("pagehide", onUnload);
            report(true);
        };
    }, [report]);

    const handleTimeUpdate = () => {
        const el = videoRef.current;
        if (!el) return;
        // Only credit time that is actually played forward, not skipped-to.
        if (el.currentTime > maxTimeRef.current && el.currentTime - maxTimeRef.current < 2) {
            maxTimeRef.current = el.currentTime;
        }
        if (!el.duration) return;
        const percent = (maxTimeRef.current / el.duration) * 100;
        const milestone = MILESTONES[nextMilestoneRef.current];
        if (milestone !== undefined && percent >= milestone) {
            nextMilestoneRef.current += 1;
            report();
        }
    };

    const handleEnded = () => {
        const el = videoRef.current;
        if (el?.duration) maxTimeRef.current = el.duration;
        report();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_0_80px_rgba(51,181,255,0.15)]"
        >
            <video
                ref={videoRef}
                src={video.src}
                poster={video.poster}
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                onTimeUpdate={handleTimeUpdate}
                onPause={() => report()}
                onEnded={handleEnded}
                className="w-full aspect-video bg-black"
            />
        </motion.div>
    );
}
