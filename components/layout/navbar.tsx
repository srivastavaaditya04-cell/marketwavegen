"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, BookOpen, FileText, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
        setIsResourcesOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/our-services" },
        { name: "Solutions", href: "/solutions" },
        // { name: "Clients", href: "/clients" },
        { name: "About", href: "/about" },
    ];

    const resourceLinks = [
        { name: "Blog", href: "/blogs", icon: Newspaper, desc: "Latest marketing insights" },
        { name: "Case Studies", href: "/case-study", icon: FileText, desc: "Real success stories" },
        { name: "White Papers", href: "/white-papers", icon: BookOpen, desc: "Deep industry research" },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
            isScrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-6"
        )}>
            <Container>
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center group"
                        onClick={(e) => {
                            setIsMobileMenuOpen(false);
                            if (pathname === "/") {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                    >
                        <img
                            src="/logo.png"
                            alt="Market Wavegen Logo"
                            className="h-10 md:h-12 w-auto object-contain"
                        />
                    </Link>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-bold uppercase tracking-widest transition-colors",
                                    pathname === link.href ? "text-[#33b5ff]" : "text-white/70 hover:text-[#33b5ff]"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Resources Dropdown */}
                        <div
                            className="relative group/dropdown"
                            onMouseEnter={() => setIsResourcesOpen(true)}
                            onMouseLeave={() => setIsResourcesOpen(false)}
                        >
                            <button className={cn(
                                "flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors h-full py-2",
                                resourceLinks.some(link => pathname.startsWith(link.href)) ? "text-[#33b5ff]" : "text-white/70 hover:text-[#33b5ff]"
                            )}>
                                Resources
                                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isResourcesOpen ? "rotate-180" : "")} />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={cn(
                                "absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72 transition-all duration-300 ease-out",
                                isResourcesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                            )}>
                                <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                                    <div className="flex flex-col gap-2">
                                        {resourceLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover/item:bg-[#0158e6]/20 group-hover/item:text-[#33b5ff] transition-colors">
                                                    <link.icon size={20} />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white uppercase tracking-wider">{link.name}</div>
                                                    <div className="text-xs text-neutral-500">{link.desc}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/contact-us">
                            <Button className="bg-[#0158e6] hover:bg-[#0046b8] text-white rounded-full px-8 h-12 font-bold uppercase tracking-wider shadow-[0_0_30px_-10px_rgba(1,88,230,0.5)]">
                                Contact Us
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </Container>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-xl font-bold uppercase transition-colors",
                                    pathname === link.href ? "text-[#33b5ff]" : "text-white"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Mobile Resources Accordion */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                                className="flex items-center justify-between text-xl font-bold uppercase text-white"
                            >
                                Resources
                                <ChevronDown className={cn("transition-transform duration-300", isMobileResourcesOpen ? "rotate-180" : "")} />
                            </button>

                            {isMobileResourcesOpen && (
                                <div className="flex flex-col gap-4 pl-4 border-l border-white/10">
                                    {resourceLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={cn(
                                                "flex items-center gap-3 text-lg font-bold uppercase transition-colors",
                                                pathname.startsWith(link.href) ? "text-[#33b5ff]" : "text-white/70"
                                            )}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <link.icon size={20} className={cn(
                                                pathname.startsWith(link.href) ? "text-[#33b5ff]" : "text-[#33b5ff]/70"
                                            )} />
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full bg-[#0158e6] text-white rounded-full h-14 font-bold uppercase mt-2">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
