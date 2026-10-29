import { Container } from '@/components/ui/container';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogHero } from '@/components/blog/blog-hero';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { CategoryBar } from '@/components/blog/category-bar';
import { FeaturedPosts } from '@/components/blog/featured-posts';
import { Pagination } from '@/components/blog/pagination';
import { slimForCard, type WordPressPost } from '@/lib/wordpress-utils';

interface BlogListingProps {
    posts: WordPressPost[];
    totalPages: number;
    currentPage: number;
    /** Where pagination links point, e.g. /blogs or /blogs/category/marketing */
    basePath: string;
    categories: Array<{ name: string; slug: string; count: number }>;
    recent: WordPressPost[];
    featured?: WordPressPost[];
    activeSlug?: string;
    /** Section heading above the grid */
    heading?: string;
    /** Search text, when this is a search results page */
    query?: string;
    hero?: { badge?: string; title?: React.ReactNode; subtitle?: string };
    emptyText?: string;
}

export function BlogListing({
    posts,
    totalPages,
    currentPage,
    basePath,
    categories,
    recent,
    featured,
    activeSlug,
    heading = 'Latest articles',
    query,
    hero,
    emptyText = 'No articles found.',
}: BlogListingProps) {
    return (
        <div className="min-h-screen bg-page text-ink">
            <BlogHero compact {...hero} />

            <section className="pb-20 md:pb-28 relative">
                <Container>
                    <div className="mb-10">
                        <CategoryBar categories={categories} activeSlug={activeSlug} />
                    </div>

                    {featured && featured.length > 0 && <FeaturedPosts posts={featured} />}

                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 xl:gap-14">
                        <div>
                            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-ink/60">
                                {heading}
                            </h2>
                            {posts.length === 0 ? (
                                <div className="rounded-2xl border border-ink/10 bg-ink/5 p-12 text-center text-ink/60">
                                    {emptyText}
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                                        {posts.map((post, idx) => (
                                            <BlogCard key={post.id} post={slimForCard(post)} index={idx} />
                                        ))}
                                    </div>
                                    {totalPages > 1 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            basePath={basePath}
                                            search={query}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        <BlogSidebar categories={categories} recent={recent} activeSlug={activeSlug} query={query} />
                    </div>
                </Container>
            </section>
        </div>
    );
}
