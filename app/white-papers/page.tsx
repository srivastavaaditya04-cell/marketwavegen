import { Metadata } from "next";
import { getPostsByCategory } from "@/lib/wordpress";
import { ResourceListing } from "@/components/blog/resource-listing";

export const metadata: Metadata = {
    title: "White Papers | Market Wavegen",
    description: "In-depth research and strategic insights on the future of B2B demand generation.",
};

export default async function WhitePapersPage() {
    // Fetch every post in the 'whitepaper' category (one page, no pagination needed)
    const { posts } = await getPostsByCategory('whitepaper', 24, 1);

    return (
        <ResourceListing
            posts={posts}
            label="White paper"
            hero={{
                badge: "Deep Dives",
                title: (
                    <>
                        White <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-yellow-vivid">Papers</span>
                    </>
                ),
                subtitle: "In-depth research and strategic insights on the future of B2B demand generation.",
            }}
            emptyTitle="No White Papers Found"
            emptyText="Our research team is finalizing our next series of technical deep-dives. Stay tuned."
        />
    );
}
