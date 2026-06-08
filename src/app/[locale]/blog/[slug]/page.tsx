import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getArticleBySlug, articles } from '@/lib/articles';
import { getToolBySlug } from '@/lib/tools';
import type { Metadata } from 'next';
import ArticlePageClient from './ArticlePageClient';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: t(`articles.${slug}.title`),
    description: t(`articles.${slug}.description`),
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: { ar: `/ar/blog/${slug}`, en: `/en/blog/${slug}`, zh: `/zh/blog/${slug}` },
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedTools = article.relatedTools
    .map((s) => getToolBySlug(s))
    .filter(Boolean);

  return <ArticlePageClient article={article} relatedTools={relatedTools as NonNullable<ReturnType<typeof getToolBySlug>>[]} />;
}
