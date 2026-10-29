// Offline fallback for the WordPress helpers: reads the saved CMS export in cms-backup/
// when the live WordPress API is unreachable, so blog, case study and white paper pages keep rendering.
import fs from 'fs';
import path from 'path';
import type { WordPressPost, WordPressCategory, PaginatedResponse } from './wordpress-utils';

let postsCache: WordPressPost[] | null = null;
let categoriesCache: WordPressCategory[] | null = null;

function readBackup<T>(file: string): T {
    const filePath = path.join(process.cwd(), 'cms-backup', file);
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

export function getBackupPosts(): WordPressPost[] {
    if (!postsCache) {
        try {
            postsCache = readBackup<WordPressPost[]>('posts.json');
        } catch (error) {
            console.error('Could not read cms-backup/posts.json:', error);
            postsCache = [];
        }
    }
    return postsCache;
}

export function getBackupCategories(): WordPressCategory[] {
    if (!categoriesCache) {
        try {
            categoriesCache = readBackup<WordPressCategory[]>('categories.json');
        } catch (error) {
            console.error('Could not read cms-backup/categories.json:', error);
            categoriesCache = [];
        }
    }
    return categoriesCache;
}

export function paginateBackupPosts(
    posts: WordPressPost[],
    perPage: number,
    page: number
): PaginatedResponse {
    const totalPosts = posts.length;
    const totalPages = Math.max(1, Math.ceil(totalPosts / perPage));
    const start = (page - 1) * perPage;
    return {
        posts: posts.slice(start, start + perPage),
        totalPosts,
        totalPages,
        currentPage: page,
    };
}

export function getBackupPostBySlug(slug: string): WordPressPost | null {
    return getBackupPosts().find((p) => p.slug === slug) || null;
}

export function getBackupPostsByCategoryId(categoryId: number): WordPressPost[] {
    return getBackupPosts().filter(
        (p) => ((p as unknown as { categories?: number[] }).categories || []).includes(categoryId)
    );
}

export function getBackupPostsExcludingCategoryIds(excludeIds: number[]): WordPressPost[] {
    return getBackupPosts().filter(
        (p) =>
            !((p as unknown as { categories?: number[] }).categories || []).some((id) =>
                excludeIds.includes(id)
            )
    );
}
