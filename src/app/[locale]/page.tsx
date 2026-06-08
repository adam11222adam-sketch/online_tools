import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getPopularTools, categories } from '@/lib/tools';
import { articles } from '@/lib/articles';
import ToolCard from '@/components/ToolCard';
import ArticleCard from '@/components/ArticleCard';
import { 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Zap, 
  Shield, 
  FileText, 
  Image as ImageIcon, 
  QrCode, 
  Wrench,
  Gift,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const popularTools = getPopularTools();
  const isRtl = locale === 'ar';

  const categoryGradients: Record<string, string> = {
    pdf: 'from-rose-500 to-red-600 dark:from-rose-500/20 dark:to-red-600/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-950/30',
    image: 'from-emerald-500 to-teal-600 dark:from-emerald-500/20 dark:to-teal-600/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-950/30',
    qr: 'from-violet-500 to-purple-600 dark:from-violet-500/20 dark:to-purple-600/20 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-950/30',
    daily: 'from-amber-500 to-orange-600 dark:from-amber-500/20 dark:to-orange-600/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-950/30',
  };

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'pdf': return <FileText className="w-6 h-6" />;
      case 'image': return <ImageIcon className="w-6 h-6" />;
      case 'qr': return <QrCode className="w-6 h-6" />;
      default: return <Wrench className="w-6 h-6" />;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg hero-pattern relative overflow-hidden border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            {/* Glowing Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/8 dark:bg-primary/20 text-primary border border-primary/10 text-xs font-semibold mb-6 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('home.heroBadge') || (isRtl ? 'الأدوات الرقمية الأسهل والأسرع' : 'The Easiest & Fastest Digital Tools')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
              {t('home.heroSubtitle')}
            </p>
            <Link
              href="/tools"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/30"
              id="hero-cta"
            >
              {t('home.ctaButton')}
              {isRtl ? <ArrowRight className="w-5 h-5 rotate-180" /> : <ArrowRight className="w-5 h-5" />}
            </Link>
          </div>

          {/* Stats Section with Glass Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-20 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {[
              { value: '30+', label: t('common.allTools'), icon: <Layers className="w-5 h-5 text-primary" /> },
              { value: '100%', label: t('common.free'), icon: <CheckCircle2 className="w-5 h-5 text-success" /> },
              { value: '⚡', label: t('common.fast'), icon: <Zap className="w-5 h-5 text-warning" /> },
              { value: '🔒', label: t('common.secure'), icon: <Shield className="w-5 h-5 text-secondary" /> },
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="flex flex-col items-center p-6 bg-card/65 dark:bg-slate-900/40 rounded-2xl backdrop-blur-md border border-border/50 dark:border-slate-800/40 shadow-sm hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface dark:bg-slate-800/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-extrabold text-foreground tracking-tight">{stat.value}</div>
                <div className="text-xs font-medium text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Abstract Glows */}
        <div className="absolute top-20 start-10 w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 end-10 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Popular Tools */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {t('home.popularTools')}
              </h2>
              <p className="mt-3 text-lg text-muted">
                {t('home.popularToolsDesc') || (isRtl ? 'الأدوات الأكثر استخداماً وإقبالاً من قبل المستخدمين.' : 'Most frequently used tools by our active community.')}
              </p>
            </div>
            <Link
              href="/tools"
              className="text-primary hover:text-primary-hover font-semibold text-sm flex items-center gap-1.5 transition-colors shrink-0 group"
            >
              <span>{t('home.viewAllTools')}</span>
              {isRtl ? (
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 sm:py-24 bg-surface/50 dark:bg-slate-900/20 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {t('home.allCategories')}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t('home.categoriesSubtitle') || (isRtl ? 'تصفح أدواتنا المنظمة حسب الفئات لتسهيل وصولك للخدمة المطلوبة.' : 'Explore our tools neatly organized by category to easily find what you need.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const gradientClass = categoryGradients[cat.key];
              const isDarkThemeGrad = gradientClass.includes('dark:');
              const iconWrapperClass = isDarkThemeGrad
                ? `w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${gradientClass.split(' ')[0]} ${gradientClass.split(' ')[1]} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`
                : `w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`;
              
              // Fallback classes if styling is parsed cleanly:
              const finalIconWrapper = `w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${cat.key === 'pdf' ? 'from-rose-500 to-red-600 text-white' : cat.key === 'image' ? 'from-emerald-500 to-teal-600 text-white' : cat.key === 'qr' ? 'from-violet-500 to-purple-600 text-white' : 'from-amber-500 to-orange-600 text-white'} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`;

              return (
                <Link
                  key={cat.key}
                  href="/tools"
                  className="group bg-card rounded-2xl border border-border p-8 card-hover text-center relative overflow-hidden"
                >
                  <div className={finalIconWrapper}>
                    {getCategoryIcon(cat.key)}
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(`categories.${cat.key}`)}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {t(`categories.${cat.key}Desc`)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {t('home.whyChooseUs')}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t('home.whyChooseUsSubtitle') || (isRtl ? 'صممت منصة ToolNova لتوفير أقصى درجات الأمان والكفاءة في معالجة ملفاتك.' : 'ToolNova is designed to deliver maximum security and high efficiency for file processing.')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Gift className="w-8 h-8 text-primary" />, title: t('home.whyFree'), desc: t('home.whyFreeDesc') },
              { icon: <Zap className="w-8 h-8 text-warning" />, title: t('home.whyFast'), desc: t('home.whyFastDesc') },
              { icon: <ShieldCheck className="w-8 h-8 text-success" />, title: t('home.whySecure'), desc: t('home.whySecureDesc') },
              { icon: <Sparkles className="w-8 h-8 text-secondary" />, title: t('home.whyEasy'), desc: t('home.whyEasyDesc') },
            ].map((item) => (
              <div 
                key={item.title} 
                className="text-center p-8 bg-card rounded-2xl border border-border/60 hover:border-primary/20 transition-all duration-300 hover:shadow-sm"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-surface dark:bg-slate-900/60 flex items-center justify-center mb-5 border border-border/40">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 sm:py-24 bg-surface/50 dark:bg-slate-900/20 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {t('home.latestArticles')}
              </h2>
              <p className="mt-3 text-lg text-muted">
                {t('home.latestArticlesDesc') || (isRtl ? 'اقرأ أحدث المقالات والنصائح والشروحات التقنية في مدونتنا.' : 'Stay updated with our latest expert articles, guides and tech tips.')}
              </p>
            </div>
            <Link
              href="/blog"
              className="text-primary hover:text-primary-hover font-semibold text-sm flex items-center gap-1.5 transition-colors shrink-0 group"
            >
              <span>{t('home.viewAllArticles')}</span>
              {isRtl ? (
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 sm:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
            <div className="absolute -top-24 -start-24 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -end-24 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">{t('home.ctaTitle')}</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl mx-auto">{t('home.ctaSubtitle')}</p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/95 transition-all hover:scale-[1.02] shadow-xl"
                id="cta-button"
              >
                <span>{t('home.ctaButton')}</span>
                {isRtl ? <ArrowRight className="w-5 h-5 rotate-180" /> : <ArrowRight className="w-5 h-5" />}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

