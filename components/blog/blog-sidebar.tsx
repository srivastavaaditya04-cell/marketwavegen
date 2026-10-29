import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { WordPressPost, formatDate } from '@/lib/wordpress-utils';

interface BlogSidebarProps {
    categories: Array<{ name: string; slug: string; count: number }>;
    recent: WordPressPost[];
    activeSlug?: string;
    query?: string;
}

export function BlogSidebar({ categories, recent, activeSlug, query }: BlogSidebarProps) {
    const heading = 'mb-4 text-xs font-bold uppercase tracking-widest text-ink/60';

    return (
        <aside className="space-y-8 lg:sticky lg:top-28 self-start">
            <form action="/blogs/search" method="get" role="search" className="relative">
                <label htmlFor="blog-search" className="sr-only">
                    Search articles
                </label>
                <input
                    id="blog-search"
                    name="q"
                    type="search"
                    defaultValue={query}
                    placeholder="Search articles"
                    className="w-full rounded-full bg-ink/5 border border-ink/10 pl-5 pr-12 py-3 text-sm text-ink placeholder:text-ink/50 focus:outline-none focus:border-[#0158e6]"
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0158e6] hover:bg-[#0046b8] flex items-center justify-center"
                >
                    <Search className="w-4 h-4" />
                </button>
            </form>

            {categories.length > 0 && (
                <section>
                    <h3 className={heading}>Categories</h3>
                    <ul className="divide-y divide-ink/10 border-y border-ink/10">
                        {categories.map((c) => (
                            <li key={c.slug}>
                                <Link
                                    href={`/blogs/category/${c.slug}`}
                                    className={`flex items-center justify-between py-3 text-sm transition-colors ${
                                        activeSlug === c.slug ? 'text-brand-cyan' : 'text-ink/75 hover:text-ink'
                                    }`}
                                >
                                    <span>{c.name}</span>
                                    <span className="text-ink/50 text-xs">{c.count}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {recent.length > 0 && (
                <section>
                    <h3 className={heading}>Recent articles</h3>
                    <ul className="space-y-4">
                        {recent.map((post) => (
                            <li key={post.id}>
                                <Link href={`/blogs/${post.slug}`} className="group block">
                                    <span
                                        className="block text-sm font-medium text-ink/85 group-hover:text-brand-cyan transition-colors line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                    />
                                    <time className="text-xs text-ink/50" dateTime={post.date}>
                                        {formatDate(post.date)}
                                    </time>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="rounded-2xl bg-[#0158e6] p-5">
                <h3 className="text-lg font-bold text-ink">See how we do it</h3>
                <p className="mt-1 text-sm text-blue-100">Real results from B2B teams we work with.</p>
                <Link
                    href="/case-study"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#efef39] px-4 py-2 text-sm font-bold text-[#2c2c2a] hover:bg-ink transition-colors"
                >
                    View case studies <ArrowRight className="w-4 h-4" />
                </Link>
            </section>
        </aside>
    );
}
