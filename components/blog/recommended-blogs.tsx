'use client';

import Link from 'next/link';
import { WordPressPost } from '@/lib/wordpress';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate, calculateReadingTime } from '@/lib/wordpress';
import { useRef, useState, useEffect } from 'react';

interface RecommendedBlogsProps {
    posts: WordPressPost[];
    currentPostId: number;
}

export function RecommendedBlogs({ posts, currentPostId }: RecommendedBlogsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Filter out current post
    const recommendedPosts = posts.filter(post => post.id !== currentPostId);

    const updateScrollButtons = () => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        updateScrollButtons();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
            window.addEventListener('resize', updateScrollButtons);
            return () => {
                container.removeEventListener('scroll', updateScrollButtons);
                window.removeEventListener('resize', updateScrollButtons);
            };
        }
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const scrollAmount = direction === 'left' ? -400 : 400;
        scrollContainerRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    if (recommendedPosts.length === 0) {
        return null;
    }

    return (
        <section className="py-16 md:py-24 bg-[#0A0A0A] border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                            Recommended Reads
                        </h2>
                        <p className="text-neutral-400 text-sm md:text-base">
                            Continue exploring our insights
                        </p>
                    </div>

                    {/* Desktop Scroll Buttons */}
                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-[#0158e6] hover:border-[#0158e6] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10"
                            aria-label="Scroll left"
                        >
                            <ArrowRight className="w-5 h-5 rotate-180" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-[#0158e6] hover:border-[#0158e6] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10"
                            aria-label="Scroll right"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Container */}
                <div className="relative">
                    {/* Gradient Overlays for visual feedback */}
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

                    {/* Scrollable Blog Cards */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {recommendedPosts.map((post) => {
                            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                            const readingTime = calculateReadingTime(post.content.rendered);

                            return (
                                <Link
                                    key={post.id}
                                    href={`/blogs/${post.slug}`}
                                    className="flex-shrink-0 w-[280px] md:w-[350px] snap-start group"
                                >
                                    <article className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#0158e6] transition-all duration-300 hover:shadow-[0_0_40px_rgba(1,88,230,0.3)] hover:transform hover:scale-[1.02]">
                                        {/* Image */}
                                        {featuredImage && (
                                            <div className="relative h-48 md:h-56 overflow-hidden bg-neutral-900">
                                                <img
                                                    src={featuredImage}
                                                    alt={post.title.rendered}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-5 md:p-6">
                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <time dateTime={post.date}>
                                                        {formatDate(post.date)}
                                                    </time>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{readingTime} min</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3
                                                className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#33b5ff] transition-colors"
                                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                            />

                                            {/* Excerpt */}
                                            {post.excerpt && (
                                                <div
                                                    className="text-sm text-neutral-400 line-clamp-3 mb-4"
                                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                                />
                                            )}

                                            {/* Read More */}
                                            <div className="flex items-center gap-2 text-sm font-semibold text-[#0158e6] group-hover:gap-3 transition-all">
                                                <span>Read Article</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Swipe Indicator */}
                <div className="md:hidden mt-6 text-center">
                    <p className="text-xs text-neutral-500">
                        ← Swipe to explore more →
                    </p>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
