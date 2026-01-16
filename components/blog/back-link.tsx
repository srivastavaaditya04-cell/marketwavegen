"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import NProgress from 'nprogress';

interface BackLinkProps {
    showText?: boolean;
}

export function BackLink({ showText = false }: BackLinkProps) {
    const handleClick = () => {
        NProgress.start();
    };

    return (
        <Link
            href="/blog"
            onClick={handleClick}
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#0158e6] transition-colors group"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {showText ? (
                <span className="font-semibold">Back to All Insights</span>
            ) : (
                <span>Back to Insights</span>
            )}
        </Link>
    );
}
