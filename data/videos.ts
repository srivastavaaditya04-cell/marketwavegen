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
    /** Display length shown on the cover, e.g. "1:39" */
    duration?: string;
    badge?: string;
}

export const gatedVideos: GatedVideo[] = [
    {
        slug: "intro",
        title: "Market Wavegen in Action",
        description: "Enter your email to watch the full video.",
        src: "/videos/market-wavegen-intro.mp4",
        poster: "/videos/market-wavegen-intro-poster.jpg",
        duration: "1:39",
        badge: "Exclusive Video",
    },
];

export function getGatedVideo(slug: string): GatedVideo | undefined {
    return gatedVideos.find((v) => v.slug === slug);
}
