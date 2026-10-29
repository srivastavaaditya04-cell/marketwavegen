import Link from 'next/link';

interface CategoryBarProps {
    categories: Array<{ name: string; slug: string }>;
    /** Slug of the selected category, or undefined for "All" */
    activeSlug?: string;
}

export function CategoryBar({ categories, activeSlug }: CategoryBarProps) {
    const chip = (active: boolean) =>
        `shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            active
                ? 'bg-[#0158e6] border-[#0158e6] text-white'
                : 'bg-ink/5 border-ink/10 text-ink/75 hover:border-[#0158e6]/60 hover:text-ink'
        }`;

    return (
        <nav aria-label="Blog categories" className="flex gap-2 overflow-x-auto md:flex-wrap pb-2 -mx-1 px-1">
            <Link href="/blogs" className={chip(!activeSlug)} aria-current={!activeSlug ? 'page' : undefined}>
                All
            </Link>
            {categories.map((c) => (
                <Link
                    key={c.slug}
                    href={`/blogs/category/${c.slug}`}
                    className={chip(activeSlug === c.slug)}
                    aria-current={activeSlug === c.slug ? 'page' : undefined}
                >
                    {c.name}
                </Link>
            ))}
        </nav>
    );
}
