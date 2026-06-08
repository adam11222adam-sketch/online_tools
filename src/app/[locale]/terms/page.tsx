import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations('terms');

  const sections = [
    { title: t('usage'), text: t('usageText') },
    { title: t('liability'), text: t('liabilityText') },
    { title: t('files'), text: t('filesText') },
    { title: t('modifications'), text: t('modificationsText') },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('pageTitle')}</h1>
        <p className="text-muted mb-8">{t('intro')}</p>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-semibold text-foreground mb-2">{s.title}</h2>
              <p className="text-muted leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-light mt-10">{t('lastUpdated')}: 2025-04-01</p>
      </div>
    </div>
  );
}
