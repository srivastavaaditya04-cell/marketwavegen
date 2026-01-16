import { cn } from "@/lib/utils";
import React from "react";
import { siteConfig } from "@/data";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    allowOverflow?: boolean;
}

export function Section({ className, children, style, allowOverflow, ...props }: SectionProps) {
    return (
        <section
            className={cn(
                "py-24 md:py-32 w-full relative",
                !allowOverflow && "overflow-hidden",
                className
            )}
            style={{
                backgroundColor: siteConfig.theme.backgroundColor,
                ...style
            }}
            {...props}
        >
            {children}
        </section>
    );
}
