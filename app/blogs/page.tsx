import { Metadata } from 'next';
import { BlogListing } from '@/components/blog/blog-listing';
import {
    getBlogCategories,
    getFeaturedPosts,
    getPostsExcludingCategories,
    getRecentPosts,
} from '@/lib/wordpress';
import { NON_BLOG_CATEGORY_SLUGS } from '@/lib/wordpress-utils';

export const metadata: Metadata = {
    title: 'Blog | Market Wavegen - B2B Marketing Insights',
    description: 'Expert perspectives on B2B marketing, demand generation, and revenue growth strategies.',
    openGraph: {
        title: 'Blog | Market Wavegen',
        description: 'Expert perspectives on B2B marketing, demand generation, and revenue growth strategies.',
        type: 'website',
    },
};

const POSTS_PER_PAGE = 12;

export default async function BlogPage() {
    // Server-side fetch with ISR (cached for 60 seconds)
    const [featured, categories] = await Promise.all([getFeaturedPosts(3), getBlogCategories()]);
    const featuredIds = featured.map((p) => p.id);
    const [{ posts, totalPages, currentPage }, recent] = await Promise.all([
        getPostsExcludingCategories(NON_BLOG_CATEGORY_SLUGS, POSTS_PER_PAGE, 1, featuredIds),
        getRecentPosts(4),
    ]);

    return (
        <BlogListing
            posts={posts}
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/blogs"
            categories={categories}
            recent={recent}
            featured={featured}
            emptyText="No blog posts found."
        />
    );
}
