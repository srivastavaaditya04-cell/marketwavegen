import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { getAllPosts } from '@/lib/wordpress';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogHero } from '@/components/blog/blog-hero';
import { Pagination } from '@/components/blog/pagination';

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
    params: Promise<{
        page: string;
    }>;
}

// Generate metadata for each page
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { page } = await params;
    const pageNum = parseInt(page, 10);

    return {
        title: `Blog - Page ${pageNum} | Market Wavegen`,
        description: 'Expert perspectives on B2B marketing, demand generation, and revenue growth strategies.',
    };
}

// Pre-generate first 3 pages at build time
export async function generateStaticParams() {
    return [
        { page: '2' },
        { page: '3' },
    ];
}

export default async function BlogPaginatedPage({ params }: BlogPageProps) {
    const { page } = await params;
    const pageNumber = parseInt(page, 10);

    // Validate page number
    if (isNaN(pageNumber) || pageNumber < 1) {
        notFound();
    }

    // Server-side fetch with ISR (cached for 60 seconds)
    const { posts, totalPages, currentPage } = await getAllPosts(POSTS_PER_PAGE, pageNumber);

    // If page number exceeds total pages, show 404
    if (pageNumber > totalPages) {
        notFound();
    }

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
