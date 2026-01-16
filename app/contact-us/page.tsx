"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Spotlight } from "@/components/ui/spotlight-new";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    Phone,
    Mail,
    MapPin,
    Calendar,
    MessageSquare,
    ArrowUpRight,
    User,
    Building2,
    Globe,
    Zap,
    Hexagon,
    Target,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ContactBentoItems = [
    {
        title: "United States Hub",
        description: "66, West Flagler Street, Suite 900 - #6982, Miami, FL, 33130.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl relative overflow-hidden group border border-white/5">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('/images/office/miami.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-80" />

                <div className="relative z-10 flex flex-col h-full w-full p-6">
                    <div className="absolute top-0 right-0 p-4">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:bg-[#0158e6] transition-colors">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="mt-auto">
                        <span className="text-3xl font-mono text-white/10 group-hover:text-[#0158e6]/20 transition-colors uppercase">USA</span>
                        <p className="text-white font-bold text-lg mt-2">+1 (786)-401-3723</p>
                    </div>
                </div>
            </div>
        ),
        icon: <Globe className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
    },
    {
        title: "UK Presence",
        description: "London E6 2JA",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl relative overflow-hidden group border border-white/5">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('/images/office/london.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

                <div className="relative z-10 flex flex-col h-full w-full p-6 justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#33b5ff]/10 border border-[#33b5ff]/20 flex items-center justify-center transition-colors group-hover:bg-[#33b5ff]/20 backdrop-blur-sm">
                        <Target className="w-5 h-5 text-[#33b5ff]" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">London Office</p>
                        <p className="text-white font-medium">+44 151-452-5520</p>
                    </div>
                </div>
            </div>
        ),
        icon: <Hexagon className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
    },
    {
        title: "India HQ",
        description: "Cerebrum IT Park, Kalyani Nagar, Pune.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl relative overflow-hidden group border border-white/10">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('/images/office/pune.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="relative z-10 flex flex-col h-full w-full p-6 justify-between">
                    <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-1 h-8 bg-[#efef39]/40 rounded-full animate-pulse backdrop-blur-sm" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                    <p className="text-white font-bold leading-tight">+91-907-700-0077</p>
                </div>
                <Users className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 group-hover:text-white/10 transition-colors" />
            </div>
        ),
        icon: <Users className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Digital Direct",
        description: "Instant response infrastructure.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#0158e6]/5 border border-white/10 p-6 flex-col justify-center items-center group relative cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0158e6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Mail className="w-12 h-12 text-[#33b5ff] group-hover:scale-110 transition-transform mb-4" />
                <span className="text-white font-bold text-lg relative z-10">sales@marketwavegen.com</span>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#33b5ff]/10 blur-3xl pointer-events-none" />
            </div>
        ),
        icon: <Mail className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source: 'Contact Form',
                    ...formData
                }),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: "", company: "", phone: "", email: "", subject: "", message: "" });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#efef39] selection:text-black dark">
            <section className="relative min-h-[80vh] pt-24 md:pt-32 flex items-center justify-center overflow-hidden">
                <Spotlight />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(51,181,255,0.05),transparent_70%)]" />

                {/* Floating Particles/Shapes */}
                {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-[20%] left-[15%] w-32 h-32 border border-white/5 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute bottom-[20%] right-[15%] w-48 h-48 border border-[#0158e6]/10 rounded-2xl rotate-12"
                    />
                </div> */}

                <Container className="relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#efef39] animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Status: Connection Hub Online</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wide leading-[0.8] mb-8 px-4"
                        >
                            Get In The <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">Signal</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light"
                        >
                            Bridging the gap between intent and execution. Let&apos;s build your revenue architecture together.
                        </motion.p>
                    </div>
                </Container>
            </section>

            {/* Information Grid Container */}
            <section className="py-12 md:py-24 relative">
                <Container>
                    <BentoGrid className="auto-rows-[20rem] md:auto-rows-[25rem]">
                        {ContactBentoItems.map((item, i) => (
                            <BentoGridItem
                                key={i}
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                icon={item.icon}
                                className={item.className}
                            />
                        ))}
                    </BentoGrid>
                </Container>
            </section>

            {/* The Laboratory: Form Section */}
            <Section className="relative overflow-visible" allowOverflow>
                {/* Blueprint Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
                />

                <Container className="relative">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase mb-6 leading-none px-4 lg:px-0">
                                    THE CONTACT <br />
                                    <span className="text-[#0158e6]">LABORATORY</span>
                                </h2>
                                <p className="text-lg md:text-xl text-neutral-400 border-l-2 border-[#efef39] ml-4 lg:ml-0 pl-6 font-light">
                                    Our specialists are standing by to process your inquiry. High-velocity outreach starts with a single trigger.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-0">
                                <a
                                    href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1LRerQzILalOQbfT9l5lWQ6abwrkk6n45IbqR_cPsf8tH09a8kVlButSqrKMTkMo1De-h8vUdB"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition-transform hover:scale-[1.02]"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="p-6 md:p-8 rounded-3xl bg-neutral-900 border border-white/5 hover:border-[#0158e6]/50 transition-all cursor-pointer group h-full"
                                    >
                                        <Calendar className="w-10 h-10 text-[#0158e6] mb-6 group-hover:rotate-12 transition-transform" />
                                        <h4 className="text-xl font-bold mb-2">Book a Meeting</h4>
                                        <p className="text-sm text-neutral-500">Pick a slot in our live calendar.</p>
                                        <ArrowUpRight className="w-5 h-5 mt-6 text-[#efef39]" />
                                    </motion.div>
                                </a>

                                <a
                                    href="https://wa.me/+919077000077"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition-transform hover:scale-[1.02]"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="p-6 md:p-8 rounded-3xl bg-neutral-900 border border-white/5 hover:border-[#efef39]/50 transition-all cursor-pointer group h-full"
                                    >
                                        <MessageSquare className="w-10 h-10 text-[#efef39] mb-6 group-hover:-translate-y-1 transition-transform" />
                                        <h4 className="text-xl font-bold mb-2">Instant Chat</h4>
                                        <p className="text-sm text-neutral-500">Real-time signal verification.</p>
                                        <ArrowUpRight className="w-5 h-5 mt-6 text-[#0158e6]" />
                                    </motion.div>
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#0a0a0a] border border-white/10 p-6 md:p-10 rounded-[2rem] shadow-2xl relative z-10 mx-4 lg:mx-0"
                            >
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0158e6]/20 blur-[100px] pointer-events-none" />

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Name *"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-[#efef39] outline-none transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Company"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-[#efef39] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="Phone *"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-[#efef39] outline-none transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="Email *"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-[#efef39] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Subject *"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-[#efef39] outline-none transition-colors"
                                    />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        placeholder="Message *"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-[#efef39] outline-none transition-colors resize-none"
                                    />

                                    <Button
                                        disabled={status === 'loading' || status === 'success'}
                                        className={cn(
                                            "w-full h-16 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-95",
                                            status === 'success' ? "bg-green-500 text-white" : "bg-white text-black hover:bg-[#efef39]"
                                        )}
                                    >
                                        {status === 'loading' ? 'PROCESSING...' :
                                            status === 'success' ? 'MESSAGE SENT ✅' :
                                                status === 'error' ? 'RETRY TRANSMISSION' : 'TRANSMIT MESSAGE'}
                                    </Button>
                                </form>
                            </motion.div>

                            {/* Decorative Form Label */}
                            <div className="absolute -right-4 top-1/2 -rotate-90 text-[10px] uppercase font-black tracking-[1em] text-white/10 pointer-events-none hidden xl:block">
                                Input Sequence 01
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Final CTA Visual */}
            <section className="py-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0158e6]/5 to-transparent" />
                <Container className="relative z-10">
                    <div className="text-center space-y-12">
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none px-4">
                            Ready to Scale? <br />
                            <span className="text-[#efef39]">Launch Now.</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/">
                                <Button className="h-20 px-12 rounded-full text-xl font-black bg-[#0158e6] text-white hover:bg-[#33b5ff] transition-all group">
                                    START SOMETHING SPECIAL <ArrowUpRight className="ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

        </div>
    );
}
