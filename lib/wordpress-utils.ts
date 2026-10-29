// Types and pure helpers shared by server and client components (no Node APIs here)
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://blog.yourcompany.com';

export interface WordPressPost {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt?: {
        rendered: string;
    };
    date: string;
    modified?: string;
    featured_media: number;
    sticky?: boolean;
    /** Set by slimForCard so cards don't need the full article text */
    readingMinutes?: number;
    categories?: number[];
    _embedded?: {
        'wp:term'?: Array<Array<{ id: number; name: string; slug: string; taxonomy: string }>>;
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
            media_details?: {
                width: number;
                height: number;
                sizes?: Record<string, { source_url: string; width: number }>;
            };
        }>;
        author?: Array<{
            name: string;
            avatar_urls?: {
                96?: string;
            };
        }>;
    };
}

export interface PaginatedResponse {
    posts: WordPressPost[];
    totalPosts: number;
    totalPages: number;
    currentPage: number;
}

export interface WordPressCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
}

/**
 * Clean WordPress shortcodes from content
 * Removes [metform], [elementor-template], etc. that won't work headlessly
 */
export function cleanShortcodes(html: string): string {
    return html
        // Remove metform shortcodes
        .replace(/\[metform[^\]]*\]/g, '')
        // Remove elementor-template shortcodes
        .replace(/\[elementor-template[^\]]*\]/g, '')
        // Remove contact-form-7 shortcodes
        .replace(/\[contact-form-7[^\]]*\]/g, '')
        // Remove any other common shortcodes
        .replace(/\[\/?[a-z_-]+[^\]]*\]/gi, '');
}

/**
 * Extract plain text from HTML for meta descriptions
 */
export function extractTextFromHTML(html: string, maxLength: number = 160): string {
    const text = html
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

    return text.length > maxLength
        ? text.substring(0, maxLength) + '...'
        : text;
}

/**
 * Calculate reading time from content
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const text = extractTextFromHTML(content, Infinity);
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Get Elementor CSS URL for a specific post
 */
export function getElementorCSSUrl(postId: number): string {
    return `${WORDPRESS_URL}/wp-content/uploads/elementor/css/post-${postId}.css`;
}

/** Categories that are used for the site's own sections and never shown as blog topics */
export const NON_BLOG_CATEGORY_SLUGS = ['case-study', 'whitepaper'];
const HIDDEN_CATEGORY_SLUGS = ['uncategorized', ...NON_BLOG_CATEGORY_SLUGS];

/** Display name for a category (the WordPress "Blogs" catch-all reads better as "Insights") */
export function categoryLabel(name: string, slug?: string): string {
    return slug === 'blogs' || name === 'Blogs' ? 'Insights' : name;
}

/** Topic categories of a post, ready to show as labels */
export function getPostCategories(post: WordPressPost): Array<{ name: string; slug: string }> {
    const terms = post._embedded?.['wp:term']?.flat() ?? [];
    return terms
        .filter((t) => t.taxonomy === 'category' && !HIDDEN_CATEGORY_SLUGS.includes(t.slug))
        .map((t) => ({ name: categoryLabel(t.name, t.slug), slug: t.slug }));
}

/** First PDF link inside a post, as a site-relative path when it points at this site */
export function extractPdfUrl(html: string): string | null {
    const decoded = html.replace(/&amp;|&#038;|&#38;/g, '&');
    const match = decoded.match(/href=["']([^"']+\.pdf)["']/i);
    if (!match) return null;
    return match[1].replace(/^https?:\/\/(www\.)?marketwavegen\.com/i, '');
}

/**
 * Small copy of a post for card lists. Client components get their props serialized into the page,
 * so sending every article's full text made /blogs several hundred KB.
 */
export function slimForCard(post: WordPressPost): WordPressPost {
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    const sizes = media?.media_details?.sizes;
    const smallUrl = sizes?.medium_large?.source_url ?? sizes?.large?.source_url ?? media?.source_url;
    return {
        id: post.id,
        slug: post.slug,
        date: post.date,
        featured_media: post.featured_media,
        title: post.title,
        content: { rendered: '' },
        excerpt: {
            rendered: extractTextFromHTML(post.excerpt?.rendered || post.content.rendered, 200),
        },
        readingMinutes: calculateReadingTime(post.content.rendered),
        _embedded: {
            'wp:featuredmedia': smallUrl ? [{ source_url: smallUrl, alt_text: media?.alt_text ?? '' }] : undefined,
            'wp:term': post._embedded?.['wp:term']?.map((group) =>
                group.filter((t) => t.taxonomy === 'category')
            ),
        },
    };
}

/** Let the browser skip images below the fold (the first image stays eager for faster first paint) */
export function lazyLoadImages(html: string): string {
    let first = true;
    return html.replace(/<img\b(?![^>]*\bloading=)/gi, (m) => {
        if (first) {
            first = false;
            return m;
        }
        return `${m} loading="lazy" decoding="async"`;
    });
}
