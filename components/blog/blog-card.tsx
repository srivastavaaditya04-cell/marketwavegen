"use client";

import Link from 'next/link';
import { WordPressPost, formatDate, extractTextFromHTML, calculateReadingTime } from '@/lib/wordpress';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import NProgress from 'nprogress';

interface BlogCardProps {
    post: WordPressPost;
    index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
    const excerpt = post.excerpt?.rendered
        ? extractTextFromHTML(post.excerpt.rendered, 120)
        : extractTextFromHTML(post.content.rendered, 120);

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const readingTime = calculateReadingTime(post.content.rendered);

    const handleClick = () => {
        NProgress.start();
    };

    return (
        <article
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#0158e6]/50 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            style={{
                animationDelay: `${index * 50}ms`,
            }}
        >
            <Link href={`/blog/${post.slug}`} onClick={handleClick} className="block">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0158e6]/0 via-transparent to-[#efef39]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                {/* Featured Image */}
                <div className="relative h-56 overflow-hidden bg-black/40">
                    {featuredImage ? (
                        <img
                            src={featuredImage}
                            alt={post.title.rendered}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0158e6]/20 to-[#33b5ff]/10 flex items-center justify-center">
                            <TrendingUp className="w-16 h-16 text-white/10" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 relative">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{readingTime} min read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2
                        className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#33b5ff] transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    {/* Excerpt */}
                    <p className="text-neutral-400 mb-5 line-clamp-3 text-sm leading-relaxed">
                        {excerpt}
                    </p>

                    {/* Read More Link */}
                    <div className="inline-flex items-center gap-2 text-[#0158e6] font-semibold text-sm group-hover:gap-3 transition-all">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </article>
    );
}
