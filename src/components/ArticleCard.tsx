'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Article } from '@/lib/articles';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const t = useTranslations();

  const categoryColors = [
    'from-primary to-secondary',
    'from-emerald-500 to-teal-500',
    'from-violet-500 to-purple-500',
    'from-amber-500 to-orange-500',
    'from-rose-500 to-pink-500',
  ];

  const colorIndex = article.slug.length % categoryColors.length;

  return (
    <Link
      href={`/blog/${article.slug}` as '/blog'}
      className="group block bg-card rounded-2xl border border-border overflow-hidden card-hover"
      id={`article-card-${article.slug}`}
    >
      {/* Color banner */}
      <div className={`h-2 bg-gradient-to-r ${categoryColors[colorIndex]}`} />

      <div className="p-5">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {t(`articles.${article.slug}.title`)}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
          {t(`articles.${article.slug}.description`)}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-light">
          <span>{article.date}</span>
          <span>{t(`articles.${article.slug}.readTime`)} {t('blog.readTime')}</span>
        </div>
      </div>
    </Link>
  );
}
