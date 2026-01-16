import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import {
    getPostBySlug,
    getAllPosts,
    cleanShortcodes,
    formatDate,
    calculateReadingTime,
    extractTextFromHTML,
    getElementorCSSUrl,
} from '@/lib/wordpress';
import { Calendar, Clock, ArrowLeft, Share2, User } from 'lucide-react';
import { BackLink } from '@/components/blog/back-link';
import { RecommendedBlogs } from '@/components/blog/recommended-blogs';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | Market Wavegen',
        };
    }

    const description = post.excerpt?.rendered
        ? extractTextFromHTML(post.excerpt.rendered, 160)
        : extractTextFromHTML(post.content.rendered, 160);

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
        title: `${post.title.rendered} | Market Wavegen Blog`,
        description,
        openGraph: {
            title: post.title.rendered,
            description,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.modified,
            images: featuredImage ? [{ url: featuredImage }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title.rendered,
            description,
            images: featuredImage ? [featuredImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const readingTime = calculateReadingTime(post.content.rendered);
    const cleanedContent = cleanShortcodes(post.content.rendered);
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const author = post._embedded?.author?.[0]?.name || 'Market Wavegen';

    // Fetch recommended posts (at least 6 posts)
    const { posts: recommendedPosts } = await getAllPosts(7, 1);

    // Generate JSON-LD structured data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title.rendered,
        datePublished: post.date,
        dateModified: post.modified || post.date,
        author: {
            '@type': 'Organization',
            name: author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Market Wavegen',
        },
        image: featuredImage || 'https://yourcompany.com/default-blog-image.png',
        description: extractTextFromHTML(post.content.rendered, 160),
    };

    return (
        <>
            {/* Load Elementor CSS for this specific post */}
            <link rel="stylesheet" href={getElementorCSSUrl(post.id)} />

            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="min-h-screen bg-[#0A0A0A] text-white">
                {/* Article Header */}
                <header className="relative pt-24 sm:pt-32 md:pt-40 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,88,230,0.1)_0%,transparent_60%)]" />
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    <Container className="relative z-10">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6">
                            {/* Back Link */}
                            <div className="mb-6 sm:mb-8">
                                <BackLink />
                            </div>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-neutral-500 mb-6 sm:mb-8">
                                <div className="flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>{author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>{readingTime} min read</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight"
                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                            />

                            {/* Featured Image */}
                            {featuredImage && (
                                <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                    <img
                                        src={featuredImage}
                                        alt={post.title.rendered}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>
                            )}
                        </div>
                    </Container>
                </header>

                {/* Article Content - Elementor Rendered */}
                <section className="py-12 md:py-20 relative bg-[#0A0A0A]">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <div
                                className={`elementor-${post.id} wp-content`}
                                dangerouslySetInnerHTML={{ __html: cleanedContent }}
                            />
                        </div>
                    </Container>
                </section>

                {/* Recommended Blogs Section */}
                <RecommendedBlogs posts={recommendedPosts} currentPostId={post.id} />

                {/* Article Footer */}
                <footer className="py-8 sm:py-12 md:py-16 border-t border-white/5 relative bg-[#0A0A0A]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0158e6]/5 to-transparent" />

                    <Container className="relative z-10">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <BackLink showText />

                                {/* Share Section */}
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-neutral-500">Share this insight:</span>
                                    <div className="flex gap-2">
                                        <button className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-[#0158e6] hover:border-[#0158e6] transition-all">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0158e6]/10 to-[#efef39]/5 border border-white/10 text-center">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                                    Ready to Transform Your B2B Strategy?
                                </h3>
                                <p className="text-sm sm:text-base text-neutral-400 mb-4 sm:mb-6 max-w-2xl mx-auto">
                                    Join forward-thinking companies leveraging Market Wavegen to build predictable
                                    pipeline.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base rounded-full bg-[#0158e6] text-white font-semibold hover:bg-[#33b5ff] transition-all transform hover:scale-105"
                                >
                                    Start Your Pilot Program
                                </Link>
                            </div>
                        </div>
                    </Container>
                </footer>
            </article>
        </>
    );
}
