import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const tErrors = useTranslations('errors');
  const tCommon = useTranslations('common');

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-black text-primary/10 select-none">404</h1>
        <div className="relative -mt-16 mb-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl shadow-xl mx-auto mb-4 animate-float">
            🤔
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">{tErrors('pageNotFound')}</h2>
          <p className="text-muted leading-relaxed">
            {tErrors('pageNotFoundDesc')}
          </p>
        </div>
        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-transform hover:-translate-y-1"
        >
          <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {tCommon('back')}
        </Link>
      </div>
    </div>
  );
}
