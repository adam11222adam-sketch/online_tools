'use client';

import { useTranslations } from 'next-intl';
import type { Article } from '@/lib/articles';
import type { Tool } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import { Link } from '@/i18n/routing';

interface Props {
  article: Article;
  relatedTools: Tool[];
}

export default function ArticlePageClient({ article, relatedTools }: Props) {
  const t = useTranslations();

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <Link href="/blog" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← {t('blog.pageTitle')}
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t(`articles.${article.slug}.title`)}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>{t('blog.publishedOn')}: {article.date}</span>
            <span>{t(`articles.${article.slug}.readTime`)} {t('blog.readTime')}</span>
          </div>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none mb-12">
          <p className="text-muted leading-relaxed text-lg">
            {t(`articles.${article.slug}.description`)}
          </p>

          <div className="my-8 p-6 bg-primary-light rounded-2xl border border-primary/10">
            <p className="text-primary font-medium text-center">
              {t('common.allTools')} →{' '}
              <Link href="/tools" className="underline font-bold">
                {t('nav.tools')}
              </Link>
            </p>
          </div>
        </article>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t('common.relatedTools')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
