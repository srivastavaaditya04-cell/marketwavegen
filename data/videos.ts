export interface GatedVideo {
    /** URL segment: /watch/<slug> */
    slug: string;
    /** Shown on the page and written to the "Video" column of the sheet */
    title: string;
    description: string;
    /** Path under /public */
    src: string;
    /** Optional poster image path under /public */
    poster?: string;
    badge?: string;
}

export const gatedVideos: GatedVideo[] = [
    {
        slug: "intro",
        title: "Market Wavegen in Action",
        description:
            "See how we turn real-time intent, buyer behaviour and tech-stack signals into pipeline. Enter your details to watch the full video.",
        src: "/videos/market-wavegen-intro.mp4",
        badge: "Exclusive Video",
    },
];

export function getGatedVideo(slug: string): GatedVideo | undefined {
    return gatedVideos.find((v) => v.slug === slug);
}
