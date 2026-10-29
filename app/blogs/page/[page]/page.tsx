import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogListing } from '@/components/blog/blog-listing';
import {
    getBlogCategories,
    getFeaturedPosts,
    getPostsExcludingCategories,
    getRecentPosts,
} from '@/lib/wordpress';
import { NON_BLOG_CATEGORY_SLUGS } from '@/lib/wordpress-utils';

const POSTS_PER_PAGE = 12;

interface BlogPageProps {
    params: Promise<{
        page: string;
    }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { page } = await params;
    const pageNum = parseInt(page, 10);

    return {
        title: `Blog - Page ${pageNum} | Market Wavegen`,
        description: 'Expert perspectives on B2B marketing, demand generation, and revenue growth strategies.',
    };
}

// Pre-generate the first pages at build time; others render on demand
export async function generateStaticParams() {
    return [{ page: '2' }, { page: '3' }];
}

export default async function BlogPaginatedPage({ params }: BlogPageProps) {
    const { page } = await params;
    const pageNumber = parseInt(page, 10);

    if (isNaN(pageNumber) || pageNumber < 2) {
        notFound();
    }

    const [featured, categories] = await Promise.all([getFeaturedPosts(3), getBlogCategories()]);
    const [{ posts, totalPages, currentPage }, recent] = await Promise.all([
        getPostsExcludingCategories(
            NON_BLOG_CATEGORY_SLUGS,
            POSTS_PER_PAGE,
            pageNumber,
            featured.map((p) => p.id)
        ),
        getRecentPosts(4),
    ]);

    if (pageNumber > totalPages) {
        notFound();
    }

    return (
        <BlogListing
            posts={posts}
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/blogs"
            categories={categories}
            recent={recent}
            emptyText="No blog posts found."
        />
    );
}
