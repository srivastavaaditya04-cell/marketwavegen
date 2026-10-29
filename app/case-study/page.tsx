import { Metadata } from "next";
import { getPostsByCategory } from "@/lib/wordpress";
import { ResourceListing } from "@/components/blog/resource-listing";

export const metadata: Metadata = {
    title: "Case Studies | Market Wavegen",
    description: "Real-world success stories and measurable outcomes drove by Market Wavegen's signal intelligence.",
};

export default async function CaseStudiesPage() {
    // Fetch every post in the 'case-study' category (one page, no pagination needed)
    const { posts } = await getPostsByCategory('case-study', 24, 1);

    return (
        <ResourceListing
            posts={posts}
            label="Case study"
            hero={{
                badge: "Success Stories",
                title: (
                    <>
                        Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow-vivid to-brand-cyan">Studies</span>
                    </>
                ),
                subtitle: "A showcase of how we transform raw buyer signals into predictable revenue for global B2B organizations.",
            }}
            emptyTitle="No Case Studies Found"
            emptyText="We are currently documenting our latest success stories. Check back soon."
        />
    );
}
