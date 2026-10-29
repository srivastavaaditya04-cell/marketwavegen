import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogListing } from '@/components/blog/blog-listing';
import { getBlogCategories, getPostsByCategory, getRecentPosts } from '@/lib/wordpress';

const POSTS_PER_PAGE = 12;

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = (await getBlogCategories()).find((c) => c.slug === slug);
    if (!category) return { title: 'Category not found | Market Wavegen' };
    return {
        title: `${category.name} articles | Market Wavegen Blog`,
        description: `${category.name} articles on B2B marketing, demand generation, and revenue growth from Market Wavegen.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const categories = await getBlogCategories();
    const category = categories.find((c) => c.slug === slug);
    if (!category) notFound();

    const [{ posts, totalPages, currentPage }, recent] = await Promise.all([
        getPostsByCategory(slug, POSTS_PER_PAGE, 1),
        getRecentPosts(4),
    ]);

    return (
        <BlogListing
            posts={posts}
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/blogs/category/${slug}`}
            categories={categories}
            recent={recent}
            activeSlug={slug}
            heading={`${category.name} articles`}
            hero={{ badge: 'Category', title: <>{category.name}</>, subtitle: `${category.count} articles` }}
            emptyText="No articles in this category yet."
        />
    );
}
