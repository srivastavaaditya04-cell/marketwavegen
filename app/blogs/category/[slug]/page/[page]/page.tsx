import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogListing } from '@/components/blog/blog-listing';
import { getBlogCategories, getPostsByCategory, getRecentPosts } from '@/lib/wordpress';

const POSTS_PER_PAGE = 12;

interface CategoryPageProps {
    params: Promise<{ slug: string; page: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug, page } = await params;
    const category = (await getBlogCategories()).find((c) => c.slug === slug);
    return {
        title: `${category?.name ?? 'Category'} articles - Page ${page} | Market Wavegen Blog`,
    };
}

export default async function CategoryPaginatedPage({ params }: CategoryPageProps) {
    const { slug, page } = await params;
    const pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber < 2) notFound();

    const categories = await getBlogCategories();
    const category = categories.find((c) => c.slug === slug);
    if (!category) notFound();

    const [{ posts, totalPages, currentPage }, recent] = await Promise.all([
        getPostsByCategory(slug, POSTS_PER_PAGE, pageNumber),
        getRecentPosts(4),
    ]);
    if (pageNumber > totalPages) notFound();

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
        />
    );
}
