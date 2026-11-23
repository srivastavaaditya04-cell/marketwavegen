"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    preferredContactOptions,
    b2bExperienceOptions,
    experienceAreas,
    workHistoryIntro,
    WORK_HISTORY_ROWS,
    acknowledgmentsIntro,
    acknowledgments,
    equalOpportunityStatement,
    backgroundConsent,
    privacyNotice,
} from "@/data/careers";

type Role = { company: string; title: string; dates: string; results: string };

const emptyRole = (): Role => ({ company: "", title: "", dates: "", results: "" });

const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    street: "",
    cityStateZip: "",
    preferredContact: "",
    linkedin: "",
    startDate: "",
    b2bExperience: "",
    experienceAreas: [] as string[],
    industries: "",
    crmTools: "",
    largestDeal: "",
    whyInterested: "",
    workHistory: Array.from({ length: WORK_HISTORY_ROWS }, emptyRole),
    acknowledgments: acknowledgments.map(() => false),
    backgroundConsent: false,
    signatureName: "",
    signatureDate: "",
    website: "", // honeypot
};

const inputClass =
    "w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 text-ink placeholder:text-ink/40 focus:border-[#efef39] outline-none transition-colors";
const labelClass = "block text-sm font-semibold text-ink/80 mb-2";

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div>
            <label htmlFor={id} className={labelClass}>
                {label}
                {required && <span className="text-brand-cyan"> *</span>}
            </label>
            {children}
        </div>
    );
}

function SectionHeading({ n, title }: { n: number; title: string }) {
    return (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-ink flex items-baseline gap-3">
            <span className="text-[#0158e6]">{n}.</span>
            {title}
        </h2>
    );
}

export function ApplicationForm({ jobSlug }: { jobSlug: string }) {
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const set = <K extends keyof typeof initialForm>(key: K, value: (typeof initialForm)[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const onText =
        (key: keyof typeof initialForm) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            set(key, e.target.value as never);

    const toggleArea = (area: string) =>
        set(
            "experienceAreas",
            form.experienceAreas.includes(area)
                ? form.experienceAreas.filter((a) => a !== area)
                : [...form.experienceAreas, area]
        );

    const setRole = (i: number, key: keyof Role, value: string) =>
        set(
            "workHistory",
            form.workHistory.map((r, j) => (j === i ? { ...r, [key]: value } : r))
        );

    const setAck = (i: number, value: boolean) =>
        set(
            "acknowledgments",
            form.acknowledgments.map((v, j) => (j === i ? value : v))
        );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");
        try {
            const res = await fetch("/api/careers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, jobSlug, pageUrl: window.location.href }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                setStatus("success");
                setForm(initialForm);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                setStatus("error");
                setErrorMessage(data.error || "Your application could not be sent. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Your application could not be sent. Check your connection and try again.");
        }
    };

    if (status === "success") {
        return (
            <div className="rounded-[2rem] border border-ink/10 bg-ink/5 p-8 md:p-12 text-center space-y-4" role="status">
                <h2 className="text-3xl md:text-4xl font-bold text-ink">Application received</h2>
                <p className="text-ink/60 text-lg max-w-xl mx-auto">
                    Thank you for applying to represent Market Wavegen. We will review your application and contact you.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-16" noValidate={false}>
            {/* Honeypot: hidden from people, bots fill it */}
            <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onText("website")} />
            </div>

            {/* 1. Applicant Information */}
            <section className="space-y-6">
                <SectionHeading n={1} title="Applicant Information" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="fullName" label="Full legal name" required>
                        <input id="fullName" className={inputClass} required autoComplete="name" value={form.fullName} onChange={onText("fullName")} />
                    </Field>
                    <Field id="email" label="Email address" required>
                        <input id="email" type="email" className={inputClass} required autoComplete="email" value={form.email} onChange={onText("email")} />
                    </Field>
                    <Field id="phone" label="Phone number" required>
                        <input id="phone" type="tel" className={inputClass} required autoComplete="tel" value={form.phone} onChange={onText("phone")} />
                    </Field>
                    <Field id="street" label="Street address">
                        <input id="street" className={inputClass} autoComplete="street-address" value={form.street} onChange={onText("street")} />
                    </Field>
                    <Field id="cityStateZip" label="City, State, ZIP" required>
                        <input id="cityStateZip" className={inputClass} required value={form.cityStateZip} onChange={onText("cityStateZip")} />
                    </Field>
                    <Field id="preferredContact" label="Preferred contact method">
                        <select id="preferredContact" className={inputClass} value={form.preferredContact} onChange={onText("preferredContact")}>
                            <option value="">Choose an item</option>
                            {preferredContactOptions.map((o) => (
                                <option key={o} value={o}>{o}</option>
                            ))}
                        </select>
                    </Field>
                    <Field id="linkedin" label="LinkedIn profile URL" required>
                        <input id="linkedin" type="url" className={inputClass} required placeholder="https://www.linkedin.com/in/…" value={form.linkedin} onChange={onText("linkedin")} />
                    </Field>
                    <Field id="startDate" label="Date available to start">
                        <input id="startDate" type="date" className={inputClass} value={form.startDate} onChange={onText("startDate")} />
                    </Field>
                </div>
            </section>

            {/* 2. Sales Experience */}
            <section className="space-y-6">
                <SectionHeading n={2} title="Sales Experience" />
                <Field id="b2bExperience" label="B2B sales experience">
                    <select id="b2bExperience" className={inputClass} value={form.b2bExperience} onChange={onText("b2bExperience")}>
                        <option value="">Choose an item</option>
                        {b2bExperienceOptions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                </Field>
                <fieldset>
                    <legend className={labelClass}>Experience areas (check all that apply)</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {experienceAreas.map((area, i) => (
                            <label key={area} htmlFor={`area-${i}`} className="flex items-start gap-3 rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 cursor-pointer hover:border-ink/20">
                                <input
                                    id={`area-${i}`}
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 accent-[#0158e6]"
                                    checked={form.experienceAreas.includes(area)}
                                    onChange={() => toggleArea(area)}
                                />
                                <span className="text-ink/80 text-sm">{area}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
                <Field id="industries" label="Industries or buyer types you sell or have relationships in">
                    <textarea id="industries" rows={3} className={cn(inputClass, "resize-y")} value={form.industries} onChange={onText("industries")} />
                </Field>
                <Field id="crmTools" label="CRM and sales tools you use">
                    <input id="crmTools" className={inputClass} value={form.crmTools} onChange={onText("crmTools")} />
                </Field>
                <Field id="largestDeal" label="Largest deal or contract you have closed in the last 2 years">
                    <input id="largestDeal" className={inputClass} value={form.largestDeal} onChange={onText("largestDeal")} />
                </Field>
                <Field id="whyInterested" label="Why are you interested in this position?" required>
                    <textarea id="whyInterested" rows={4} className={cn(inputClass, "resize-y")} required value={form.whyInterested} onChange={onText("whyInterested")} />
                </Field>
            </section>

            {/* 3. Work History */}
            <section className="space-y-6">
                <SectionHeading n={3} title="Work History" />
                <p className="text-ink/60">{workHistoryIntro}</p>
                <div className="space-y-5">
                    {form.workHistory.map((role, i) => (
                        <fieldset key={i} className="rounded-2xl border border-ink/10 p-5 md:p-6 space-y-4">
                            <legend className="px-2 text-sm font-bold uppercase tracking-widest text-ink/50">Role {i + 1}</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Field id={`company-${i}`} label="Company">
                                    <input id={`company-${i}`} className={inputClass} value={role.company} onChange={(e) => setRole(i, "company", e.target.value)} />
                                </Field>
                                <Field id={`title-${i}`} label="Title / Role">
                                    <input id={`title-${i}`} className={inputClass} value={role.title} onChange={(e) => setRole(i, "title", e.target.value)} />
                                </Field>
                                <Field id={`dates-${i}`} label="Dates">
                                    <input id={`dates-${i}`} className={inputClass} value={role.dates} onChange={(e) => setRole(i, "dates", e.target.value)} />
                                </Field>
                            </div>
                            <Field id={`results-${i}`} label="Key results">
                                <textarea id={`results-${i}`} rows={2} className={cn(inputClass, "resize-y")} value={role.results} onChange={(e) => setRole(i, "results", e.target.value)} />
                            </Field>
                        </fieldset>
                    ))}
                </div>
            </section>

            {/* 4. Independent Contractor Acknowledgments */}
            <section className="space-y-6">
                <SectionHeading n={4} title="Independent Contractor Acknowledgments" />
                <p className="text-ink/60">{acknowledgmentsIntro}</p>
                <div className="space-y-3">
                    {acknowledgments.map((text, i) => (
                        <div key={i} className="rounded-xl border border-ink/10 bg-ink/5 px-5 py-4">
                            <p className="text-ink/80 mb-3">{text}</p>
                            <label htmlFor={`ack-${i}`} className="inline-flex items-center gap-3 cursor-pointer font-semibold text-ink">
                                <input
                                    id={`ack-${i}`}
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 accent-[#0158e6]"
                                    checked={form.acknowledgments[i]}
                                    onChange={(e) => setAck(i, e.target.checked)}
                                />
                                I agree
                            </label>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Equal Opportunity and Optional Consent */}
            <section className="space-y-6">
                <SectionHeading n={5} title="Equal Opportunity and Optional Consent" />
                <p className="text-ink/70">
                    <strong className="text-ink">Equal opportunity statement.</strong> {equalOpportunityStatement}
                </p>
                <div className="rounded-xl border border-ink/10 bg-ink/5 px-5 py-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-ink/50 mb-3">Optional: background check and reference consent</p>
                    <label htmlFor="backgroundConsent" className="flex items-start gap-3 cursor-pointer">
                        <input
                            id="backgroundConsent"
                            type="checkbox"
                            className="mt-1 h-4 w-4 accent-[#0158e6]"
                            checked={form.backgroundConsent}
                            onChange={(e) => set("backgroundConsent", e.target.checked)}
                        />
                        <span className="text-ink/80">{backgroundConsent}</span>
                    </label>
                </div>
                <p className="text-ink/70">
                    <strong className="text-ink">Privacy notice.</strong> {privacyNotice} To ask about, correct or delete your information,{" "}
                    <Link href="/contact-us" className="text-brand-cyan underline underline-offset-2 hover:opacity-80">contact us</Link>.
                </p>
            </section>

            {/* 6. Signature */}
            <section className="space-y-6">
                <SectionHeading n={6} title="Signature" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="signatureName" label="Typed full name (electronic signature)" required>
                        <input id="signatureName" className={inputClass} required value={form.signatureName} onChange={onText("signatureName")} />
                    </Field>
                    <Field id="signatureDate" label="Date" required>
                        <input id="signatureDate" type="date" className={inputClass} required value={form.signatureDate} onChange={onText("signatureDate")} />
                    </Field>
                </div>
            </section>

            <div className="space-y-4">
                {status === "error" && (
                    <p className="text-red-500 font-medium" role="alert">{errorMessage}</p>
                )}
                <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-16 rounded-2xl font-black text-lg bg-ink text-page hover:bg-[#efef39] hover:text-black transition-all"
                >
                    {status === "loading" ? "SUBMITTING…" : "SUBMIT APPLICATION"}
                </Button>
            </div>
        </form>
    );
}
