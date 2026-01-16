"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0158e6]/20 to-transparent" />

            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
                    {/* Brand & Social */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="flex items-center">
                            <img
                                src="/logo.png"
                                alt="Market Wavegen Logo"
                                className="h-12 md:h-14 w-auto object-contain"
                            />
                        </Link>

                        <p className="text-neutral-400 text-lg font-medium leading-relaxed max-w-sm italic">
                            "Transform your marketing strategy and achieve long-term success"
                        </p>

                        <div className="flex gap-3">
                            {[
                                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61555776787887" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/company/market-wavegen/" },
                                { Icon: Instagram, href: "https://www.instagram.com/marketwavegen/" }
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#33b5ff] hover:bg-white/10 hover:border-[#33b5ff]/30 transition-all duration-300"
                                >
                                    <item.Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#33b5ff]" />
                            Links
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About Us", href: "/about" },
                                { name: "Services", href: "/our-services" },
                                { name: "Solutions", href: "/solutions" },
                                { name: "Clients", href: "/clients" },
                                { name: "Contact Us", href: "/contact-us" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-neutral-500 hover:text-white transition-colors flex items-center group text-sm font-medium">
                                        {item.name}
                                        <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#33b5ff]" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policy */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#efef39]" />
                            Policy
                        </h4>
                        <ul className="space-y-4">
                            {["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Do Not Sell My Information"].map((item) => (
                                <li key={item}>
                                    <Link href="/coming-soon" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact - Company */}
                    <div className="lg:col-span-4 lg:pl-8 border-l border-white/5">
                        <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#0158e6]" />
                            Company
                        </h4>
                        <ul className="space-y-8">
                            <li className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#33b5ff]/30 transition-colors">
                                    <MapPin className="text-[#33b5ff]" size={18} />
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Headquarters</span>
                                    <span className="text-neutral-400 text-sm leading-relaxed block">
                                        Office No. 1-BB Cerebrum IT Park, <br />
                                        Kalyani Nagar, Pune, <br />
                                        Maharashtra 411014
                                    </span>
                                </div>
                            </li>
                            <li className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#efef39]/30 transition-colors">
                                    <Mail className="text-[#efef39]" size={18} />
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Email Us</span>
                                    <a href="mailto:sales@marketwavegen.com" className="text-white font-medium hover:text-[#33b5ff] transition-colors">
                                        sales@marketwavegen.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#33b5ff]/30 transition-colors">
                                    <Phone className="text-[#33b5ff]" size={18} />
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Call Expert</span>
                                    <a href="tel:+17867764116" className="text-white font-medium hover:text-[#33b5ff] transition-colors">
                                        +1 (786) 776-4116
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-neutral-600 text-[11px] font-medium tracking-wide uppercase">
                        Copyright © 2025 Market Wavegen, All Rights Reserved
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">System Status: Optimal</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
