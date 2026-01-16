import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Metadata } from "next";
import { getPostsByCategory } from "@/lib/wordpress";
import { BlogCard } from "@/components/blog/blog-card";
import { Pagination } from "@/components/blog/pagination";
import { BlogHero } from "@/components/blog/blog-hero";

export const metadata: Metadata = {
    title: "Case Studies | Market Wavegen",
    description: "Real-world success stories and measurable outcomes drove by Market Wavegen's signal intelligence.",
};

const POSTS_PER_PAGE = 10;

export default async function CaseStudiesPage() {
    // Fetch posts for 'case-study' category
    const { posts, totalPages, currentPage } = await getPostsByCategory('case-study', POSTS_PER_PAGE, 1);

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-0">
            <BlogHero
                badge="Success Stories"
                title={
                    <>
                        Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efef39] to-[#33b5ff]">Studies</span>
                    </>
                }
                subtitle="A showcase of how we transform raw buyer signals into predictable revenue for global B2B organizations."
            />

            <Section className="relative overflow-hidden pt-0 md:pt-0">
                <Container>

                    {posts.length === 0 ? (
                        <div className="p-12 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md text-center">
                            <h2 className="text-2xl font-bold mb-4">No Case Studies Found</h2>
                            <p className="text-neutral-400">
                                We are currently documenting our latest success stories. Check back soon.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                                {posts.map((post, idx) => (
                                    <BlogCard key={post.id} post={post} index={idx} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <Pagination currentPage={currentPage} totalPages={totalPages} />
                            )}
                        </>
                    )}
                </Container>
            </Section>
        </div>
    );
}
