// WordPress API Configuration and Utilities
import {
    getBackupCategories,
    getBackupPostBySlug,
    getBackupPostsByCategoryId,
    getBackupPostsExcludingCategoryIds,
    getBackupPosts,
    paginateBackupPosts,
} from './wordpress-backup';
import type { WordPressPost, WordPressCategory, PaginatedResponse } from './wordpress-utils';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://blog.yourcompany.com';
const WP_API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`;

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
        console.error('Error fetching WordPress posts, using backup:', error);
        return paginateBackupPosts(getBackupPosts(), perPage, page);
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
        console.error(`Error fetching post with slug "${slug}", using backup:`, error);
        return getBackupPostBySlug(slug);
    }
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
        console.error('Error fetching WordPress categories, using backup:', error);
        return getBackupCategories();
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
        console.error(`Error fetching posts for category "${categorySlug}", using backup:`, error);
        const categoryId = (await getCategoryIdBySlug(categorySlug)) ?? -1;
        return paginateBackupPosts(getBackupPostsByCategoryId(categoryId), perPage, page);
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
        console.error('Error fetching posts excluding categories, using backup:', error);
        const excludeIds = getBackupCategories()
            .filter((c) => categorySlugs.includes(c.slug))
            .map((c) => c.id);
        return paginateBackupPosts(getBackupPostsExcludingCategoryIds(excludeIds), perPage, page);
    }
}

export * from './wordpress-utils';
