"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Play, X } from "lucide-react";
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
    const [justUnlocked, setJustUnlocked] = useState(false);
    const [asking, setAsking] = useState(false);
    const [email, setEmail] = useState("");
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
                    email,
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
            setJustUnlocked(true);
            setUnlocked(true);
            setStatus("idle");
        } catch (err) {
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
        }
    };

    if (unlocked) {
        return <GatedPlayer video={video} leadRow={leadRow} autoPlay={justUnlocked} />;
    }

    return (
        <div className="max-w-[960px] mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black aspect-video shadow-[0_0_80px_rgba(51,181,255,0.12)]">
                {/* Cover image */}
                {video.poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={video.poster}
                        alt={video.title}
                        className={cn(
                            "absolute inset-0 w-full h-full object-cover transition-all duration-500",
                            asking ? "scale-105 blur-sm brightness-50" : "brightness-95 group-hover:brightness-100"
                        )}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0158e6]/30 via-black to-[#33b5ff]/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Whole cover is clickable; the play pill sits bottom-left, off the subject */}
                {!asking && (
                    <button
                        type="button"
                        onClick={() => setAsking(true)}
                        aria-label="Play video"
                        className="absolute inset-0 z-10 group cursor-pointer"
                    >
                        <span className="absolute left-5 bottom-5 sm:left-8 sm:bottom-8 flex items-center gap-3">
                            <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110">
                                <Play className="ml-1" size={24} fill="currentColor" />
                            </span>
                            <span className="flex flex-col items-start text-left">
                                <span className="text-white font-bold uppercase tracking-widest text-xs sm:text-sm drop-shadow">
                                    Watch video
                                </span>
                                {video.duration && (
                                    <span className="text-white/70 text-xs drop-shadow">{video.duration}</span>
                                )}
                            </span>
                        </span>
                    </button>
                )}

                {/* Email overlay */}
                {asking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8"
                    >
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative w-full max-w-md bg-black/70 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5"
                        >
                            <button
                                type="button"
                                onClick={() => setAsking(false)}
                                aria-label="Close"
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <div className="space-y-1 pr-6">
                                <h3 className="text-lg font-bold text-white uppercase tracking-tight">Enter your email to watch</h3>
                                <p className="text-neutral-400 text-sm">The video starts right after.</p>
                            </div>

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
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/input:text-[#33b5ff] transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                    className="w-full h-14 bg-white/10 border border-white/15 rounded-2xl pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#33b5ff]/60 focus:bg-white/15 transition-all"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs border border-white/10 transition-all gap-2 bg-[#0158e6] hover:bg-[#33b5ff] text-white"
                            >
                                <Play size={14} fill="currentColor" />
                                {status === "loading" ? "Unlocking..." : "Watch now"}
                            </Button>

                            {status === "error" && (
                                <p className="text-xs text-red-400 text-center">{errorMsg}</p>
                            )}
                        </motion.form>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

/**
 * Player that reports watch progress to the lead's row in the sheet.
 * Tracks the furthest point reached (not the current position), so seeking
 * backwards never lowers the figure. Reports at milestones, on pause/end, and
 * when the tab is hidden or closed (via sendBeacon so the request survives).
 */
function GatedPlayer({ video, leadRow, autoPlay }: { video: GatedVideo; leadRow: number | null; autoPlay: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Start playing right after the viewer unlocks. If the browser blocks it,
    // the controls are visible and they can press play.
    useEffect(() => {
        if (autoPlay) videoRef.current?.play().catch(() => { /* blocked: user presses play */ });
    }, [autoPlay]);
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
