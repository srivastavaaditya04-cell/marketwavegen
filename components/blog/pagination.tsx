"use client";

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NProgress from 'nprogress';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const handleClick = () => {
        NProgress.start();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="flex items-center justify-center gap-2 pt-8" aria-label="Blog pagination">
            {/* Previous Button */}
            {currentPage > 1 && (
                <Link
                    href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`}
                    onClick={handleClick}
                >
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-12 px-4 rounded-full bg-white/5 border-white/10 text-white hover:bg-[#0158e6] hover:border-[#0158e6] transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="sr-only md:not-sr-only md:ml-2">Previous</span>
                    </Button>
                </Link>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {pageNumbers.map((page, idx) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${idx}`} className="px-4 text-neutral-500">
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isCurrentPage = pageNum === currentPage;
                    const href = pageNum === 1 ? '/blog' : `/blog/page/${pageNum}`;

                    return (
                        <Link key={pageNum} href={href} onClick={handleClick}>
                            <Button
                                variant={isCurrentPage ? 'default' : 'outline'}
                                size="lg"
                                className={
                                    isCurrentPage
                                        ? 'h-12 w-12 rounded-full bg-[#0158e6] text-white hover:bg-[#0046b8] border-[#0158e6]'
                                        : 'h-12 w-12 rounded-full bg-white/5 border-white/10 text-white hover:bg-[#0158e6] hover:border-[#0158e6] transition-all'
                                }
                                aria-current={isCurrentPage ? 'page' : undefined}
                            >
                                {pageNum}
                            </Button>
                        </Link>
                    );
                })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages && (
                <Link href={`/blog/page/${currentPage + 1}`} onClick={handleClick}>
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-12 px-4 rounded-full bg-white/5 border-white/10 text-white hover:bg-[#0158e6] hover:border-[#0158e6] transition-all"
                    >
                        <span className="sr-only md:not-sr-only md:mr-2">Next</span>
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </Link>
            )}
        </nav>
    );
}
