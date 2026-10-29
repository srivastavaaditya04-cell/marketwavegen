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
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
            media_details?: {
                width: number;
                height: number;
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
