import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { articles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogContent />;
}

function BlogContent() {
  const t = useTranslations();

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t('blog.pageTitle')}
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t('blog.pageDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
