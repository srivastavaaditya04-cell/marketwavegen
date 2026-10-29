import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BlogHero } from "@/components/blog/blog-hero";
import { VideoGate } from "@/components/video/video-gate";
import { gatedVideos, getGatedVideo } from "@/data/videos";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return gatedVideos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const video = getGatedVideo(slug);
    if (!video) return { title: "Video | Market Wavegen" };
    return {
        title: `${video.title} | Market Wavegen`,
        description: video.description,
    };
}

export default async function WatchPage({ params }: PageProps) {
    const { slug } = await params;
    const video = getGatedVideo(slug);
    if (!video) notFound();

    return (
        <div className="min-h-screen bg-page text-ink pt-0">
            <BlogHero
                badge={video.badge ?? "Video"}
                title={
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow-vivid to-brand-cyan">
                        {video.title}
                    </span>
                }
                subtitle={video.description}
            />

            <Section className="relative overflow-hidden pt-0 md:pt-0">
                <Container className="max-w-[1100px]">
                    <VideoGate video={video} />
                </Container>
            </Section>
        </div>
    );
}
