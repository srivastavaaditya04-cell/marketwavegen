import { Metadata } from 'next';
import { BlogListing } from '@/components/blog/blog-listing';
import { getBlogCategories, getRecentPosts, searchPosts } from '@/lib/wordpress';

export const metadata: Metadata = {
    title: 'Search | Market Wavegen Blog',
    robots: { index: false, follow: true },
};

const POSTS_PER_PAGE = 12;

interface SearchPageProps {
    searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function BlogSearchPage({ searchParams }: SearchPageProps) {
    const { q = '', page = '1' } = await searchParams;
    const query = q.trim().slice(0, 100);
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);

    const [{ posts, totalPosts, totalPages, currentPage }, categories, recent] = await Promise.all([
        searchPosts(query, POSTS_PER_PAGE, pageNumber),
        getBlogCategories(),
        getRecentPosts(4),
    ]);

    return (
        <BlogListing
            posts={posts}
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/blogs/search"
            categories={categories}
            recent={recent}
            query={query}
            heading={query ? `${totalPosts} result${totalPosts === 1 ? '' : 's'} for "${query}"` : 'Search articles'}
            hero={{ badge: 'Search', title: <>Find an article</>, subtitle: 'Search our B2B marketing insights' }}
            emptyText={query ? 'No articles match your search. Try a different word.' : 'Type a word in the search box to find articles.'}
        />
    );
}
