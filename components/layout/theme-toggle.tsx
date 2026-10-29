"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

/** Switches the whole site between dark and light mode and remembers the choice */
export function ThemeToggle({ className }: { className?: string }) {
    const [theme, setTheme] = useState<Theme>("dark");

    // The inline script in the root layout has already applied the saved theme; just read it
    useEffect(() => {
        setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    }, []);

    const toggle = () => {
        const next: Theme = theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem("theme", next);
        } catch {
            // Private mode or blocked storage: the theme still changes for this visit
        }
        setTheme(next);
    };

    const label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={label}
            title={label}
            className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-ink/5 text-ink/80 transition-colors hover:border-[#0158e6] hover:text-brand-cyan",
                className
            )}
        >
            {theme === "light" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
        </button>
    );
}
