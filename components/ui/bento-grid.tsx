"use client";

import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-[2.5rem] group/bento transition duration-500 p-6 md:p-8 bg-[#0a0a0a] border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#33b5ff]/50 hover:bg-[#0d0d0d] relative overflow-hidden",
                className
            )}
        >
            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#33b5ff]/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col flex-1 h-full">
                {header}
                <div className="mt-8 group-hover/bento:translate-x-1 transition duration-300">
                    <div className="mb-4 inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 text-[#33b5ff]">
                        {icon}
                    </div>
                    <div className="font-sans font-bold text-white mb-3 text-xl md:text-2xl tracking-tight leading-none">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-neutral-400 text-sm md:text-base leading-relaxed w-full">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};
