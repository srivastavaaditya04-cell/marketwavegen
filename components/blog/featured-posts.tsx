import Link from 'next/link';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';
import {
    WordPressPost,
    calculateReadingTime,
    extractTextFromHTML,
    formatDate,
    getPostCategories,
} from '@/lib/wordpress-utils';

function image(post: WordPressPost) {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
}

export function FeaturedPosts({ posts }: { posts: WordPressPost[] }) {
    if (posts.length === 0) return null;
    const [main, ...rest] = posts;
    const mainImage = image(main);
    const mainCategory = getPostCategories(main)[0];

    return (
        <section aria-label="Featured articles" className="mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Link
                    href={`/blogs/${main.slug}`}
                    className="group relative lg:col-span-2 min-h-[320px] md:min-h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-black/40 flex items-end"
                >
                    {mainImage ? (
                        <img
                            src={mainImage}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0158e6]/30 to-[#33b5ff]/10 flex items-center justify-center">
                            <TrendingUp className="w-20 h-20 text-white/10" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    <div className="relative p-6 md:p-8 max-w-2xl">
                        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#efef39] text-[#2c2c2a] text-[11px] font-bold uppercase tracking-widest">
                            Featured
                        </span>
                        {mainCategory && (
                            <span className="ml-3 text-[11px] font-semibold uppercase tracking-widest text-[#33b5ff]">
                                {mainCategory.name}
                            </span>
                        )}
                        <h2
                            className="mt-3 text-2xl md:text-4xl font-bold leading-tight text-white group-hover:text-[#33b5ff] transition-colors"
                            dangerouslySetInnerHTML={{ __html: main.title.rendered }}
                        />
                        <p className="mt-3 text-neutral-300 line-clamp-2 text-sm md:text-base">
                            {extractTextFromHTML(main.excerpt?.rendered || main.content.rendered, 160)}
                        </p>
                        <div className="mt-4 flex items-center gap-4 text-xs text-neutral-400">
                            <time dateTime={main.date}>{formatDate(main.date)}</time>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {calculateReadingTime(main.content.rendered)} min read
                            </span>
                            <span className="ml-auto inline-flex items-center gap-2 text-[#efef39] font-semibold">
                                Read article <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    {rest.slice(0, 2).map((post) => {
                        const img = image(post);
                        const category = getPostCategories(post)[0];
                        return (
                            <Link
                                key={post.id}
                                href={`/blogs/${post.slug}`}
                                className="group flex-1 flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0158e6]/50 transition-colors"
                            >
                                <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-black/40">
                                    {img ? (
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#0158e6]/20 to-[#33b5ff]/10" />
                                    )}
                                </div>
                                <div className="min-w-0 flex flex-col justify-center">
                                    {category && (
                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#33b5ff]">
                                            {category.name}
                                        </span>
                                    )}
                                    <h3
                                        className="mt-1 text-base font-bold text-white line-clamp-3 group-hover:text-[#33b5ff] transition-colors"
                                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                    />
                                    <time className="mt-2 text-xs text-neutral-500" dateTime={post.date}>
                                        {formatDate(post.date)}
                                    </time>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
