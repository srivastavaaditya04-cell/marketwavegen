import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { getAllPosts, formatDate, extractTextFromHTML, calculateReadingTime } from '@/lib/wordpress';
import { Calendar, Clock, ArrowRight, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogHero } from '@/components/blog/blog-hero';
import { Pagination } from '@/components/blog/pagination';

export const metadata: Metadata = {
    title: 'Blog | Market Wavegen - B2B Marketing Insights',
    description: 'Expert perspectives on B2B marketing, demand generation, and revenue growth strategies.',
    openGraph: {
        title: 'Blog | Market Wavegen',
        description: 'Expert perspectives on B2B marketing, demand generation, and revenue growth strategies.',
        type: 'website',
    },
};

const POSTS_PER_PAGE = 10;

export default async function BlogPage() {
    // Server-side fetch with ISR (cached for 60 seconds)
    const { posts, totalPages, currentPage } = await getAllPosts(POSTS_PER_PAGE, 1);

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            <BlogHero />

            {/* Blog Posts Grid */}
            <section className="py-16 md:py-24 relative">
                <Container>
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-neutral-500">No blog posts found.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                                {posts.map((post, idx) => (
                                    <BlogCard key={post.id} post={post} index={idx} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination currentPage={currentPage} totalPages={totalPages} />
                            )}
                        </>
                    )}
                </Container>
            </section>
        </div>
    );
}
