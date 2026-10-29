import Link from 'next/link';
import { ArrowRight, Download, FileText } from 'lucide-react';
import { WordPressPost, extractPdfUrl, extractTextFromHTML } from '@/lib/wordpress-utils';

interface ResourceCardProps {
    post: WordPressPost;
    label: string;
}

export function ResourceCard({ post, label }: ResourceCardProps) {
    const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const pdf = extractPdfUrl(post.content.rendered);
    const excerpt = extractTextFromHTML(post.excerpt?.rendered || post.content.rendered, 130);

    return (
        <article className="group flex flex-col rounded-2xl overflow-hidden border border-ink/10 bg-ink/5 hover:border-[#0158e6]/50 transition-colors">
            <Link href={`/blogs/${post.slug}`} className="block relative h-48 bg-page/40 overflow-hidden">
                {image ? (
                    <img
                        loading="lazy"
                        decoding="async"
                        src={image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0158e6]/25 to-[#33b5ff]/10 flex items-center justify-center">
                        <FileText className="w-14 h-14 text-ink/10" />
                    </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-[#efef39] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#2c2c2a]">
                    {label}
                </span>
            </Link>
            <div className="flex flex-1 flex-col p-6">
                <h2
                    className="text-lg font-bold text-ink line-clamp-3 group-hover:text-brand-cyan transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <p className="mt-3 text-sm text-ink/60 line-clamp-3">{excerpt}</p>
                <div className="mt-auto pt-5 flex flex-wrap items-center gap-3">
                    <Link
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0158e6] hover:gap-3 transition-all"
                    >
                        Read {label.toLowerCase()} <ArrowRight className="w-4 h-4" />
                    </Link>
                    {pdf && (
                        <a
                            href={pdf}
                            target="_blank"
                            rel="noopener"
                            className="ml-auto inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-semibold text-ink hover:text-white hover:bg-[#0158e6] hover:border-[#0158e6] transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" /> PDF
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
