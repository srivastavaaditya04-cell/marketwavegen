// WordPress API Configuration and Utilities
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://blog.yourcompany.com';
const WP_API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`;

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

/**
 * Fetch blog posts from WordPress with pagination
 * @param perPage - Number of posts per page (default: 10)
 * @param page - Page number (default: 1)
 */
export async function getAllPosts(
    perPage: number = 10,
    page: number = 1
): Promise<PaginatedResponse> {
    try {
        const response = await fetch(
            `${WP_API_URL}/posts?per_page=${perPage}&page=${page}&_embed`,
            {
                next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
            }
        );

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }

        const posts: WordPressPost[] = await response.json();

        // Extract pagination info from headers
        const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
        const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);

        return {
            posts,
            totalPosts,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching WordPress posts:', error);
        return {
            posts: [],
            totalPosts: 0,
            totalPages: 1,
            currentPage: page,
        };
    }
}

/**
 * Fetch a single blog post by slug
 * @param slug - Post slug
 */
export async function getPostBySlug(
    slug: string
): Promise<WordPressPost | null> {
    try {
        const response = await fetch(
            `${WP_API_URL}/posts?slug=${slug}&_embed`,
            {
                next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
            }
        );

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }

        const posts: WordPressPost[] = await response.json();
        return posts[0] || null;
    } catch (error) {
        console.error(`Error fetching post with slug "${slug}":`, error);
        return null;
    }
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
 * Fetch all categories from WordPress
 */
export async function getCategories(): Promise<WordPressCategory[]> {
    try {
        const response = await fetch(
            `${WP_API_URL}/categories?per_page=100`,
            {
                next: { revalidate: 3600 }, // Cache categories for 1 hour
            }
        );

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }

        const categories: WordPressCategory[] = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching WordPress categories:', error);
        return [];
    }
}

/**
 * Get category ID by slug
 */
export async function getCategoryIdBySlug(slug: string): Promise<number | null> {
    try {
        const categories = await getCategories();
        const category = categories.find((c) => c.slug === slug);
        return category ? category.id : null;
    } catch (error) {
        console.error(`Error finding category with slug "${slug}":`, error);
        return null;
    }
}

/**
 * Fetch posts by category slug
 */
export async function getPostsByCategory(
    categorySlug: string,
    perPage: number = 10,
    page: number = 1
): Promise<PaginatedResponse> {
    try {
        const categoryId = await getCategoryIdBySlug(categorySlug);

        if (!categoryId) {
            console.warn(`Category with slug "${categorySlug}" not found.`);
            return {
                posts: [],
                totalPosts: 0,
                totalPages: 0,
                currentPage: page,
            };
        }

        const response = await fetch(
            `${WP_API_URL}/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_embed`,
            {
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }

        const posts: WordPressPost[] = await response.json();
        const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
        const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);

        return {
            posts,
            totalPosts,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error(`Error fetching posts for category "${categorySlug}":`, error);
        return {
            posts: [],
            totalPosts: 0,
            totalPages: 0,
            currentPage: page,
        };
    }
}

export async function getPostsExcludingCategories(
    categorySlugs: string[],
    perPage: number = 10,
    page: number = 1
): Promise<PaginatedResponse> {
    try {
        const categories = await getCategories();
        const excludeIds = categories
            .filter((c) => categorySlugs.includes(c.slug))
            .map((c) => c.id);
        const excludeParam = excludeIds.join(',');
        const response = await fetch(
            `${WP_API_URL}/posts?per_page=${perPage}&page=${page}&_embed${excludeParam ? `&categories_exclude=${excludeParam}` : ''}`,
            {
                next: { revalidate: 60 },
            }
        );
        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }
        const posts: WordPressPost[] = await response.json();
        const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
        const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
        return {
            posts,
            totalPosts,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching posts excluding categories:', error);
        return {
            posts: [],
            totalPosts: 0,
            totalPages: 0,
            currentPage: page,
        };
    }
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
