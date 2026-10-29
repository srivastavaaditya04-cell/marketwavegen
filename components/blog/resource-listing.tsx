import { Container } from '@/components/ui/container';
import { BlogHero } from '@/components/blog/blog-hero';
import { ResourceCard } from '@/components/blog/resource-card';
import type { WordPressPost } from '@/lib/wordpress-utils';

interface ResourceListingProps {
    posts: WordPressPost[];
    label: string;
    hero: { badge?: string; title?: React.ReactNode; subtitle?: string };
    emptyTitle: string;
    emptyText: string;
}

export function ResourceListing({ posts, label, hero, emptyTitle, emptyText }: ResourceListingProps) {
    return (
        <div className="min-h-screen bg-page text-ink">
            <BlogHero compact {...hero} />
            <section className="pb-20 md:pb-28 relative">
                <Container>
                    {posts.length === 0 ? (
                        <div className="p-12 rounded-[40px] border border-ink/10 bg-ink/5 backdrop-blur-md text-center">
                            <h2 className="text-2xl font-bold mb-4">{emptyTitle}</h2>
                            <p className="text-ink/60">{emptyText}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {posts.map((post) => (
                                <ResourceCard key={post.id} post={post} label={label} />
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </div>
    );
}
