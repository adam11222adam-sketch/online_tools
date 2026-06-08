'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { categories } from '@/lib/tools';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card dark:bg-slate-950 border-t border-border mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:shadow-lg transition-shadow">
                Q
              </div>
              <span className="text-xl font-bold gradient-text">QuickToolsWeb</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground text-sm tracking-wide mb-4 uppercase">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {[
                { href: '/' as const, label: t('nav.home') },
                { href: '/tools' as const, label: t('nav.tools') },
                { href: '/blog' as const, label: t('nav.blog') },
                { href: '/contact' as const, label: t('nav.contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-primary text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-foreground text-sm tracking-wide mb-4 uppercase">{t('footer.categories')}</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.key}>
                  <Link
                    href="/tools"
                    className="text-muted hover:text-primary text-sm font-medium transition-colors"
                  >
                    {t(`categories.${cat.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-foreground text-sm tracking-wide mb-4 uppercase">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              {[
                { href: '/privacy-policy' as const, label: t('nav.privacy') },
                { href: '/terms' as const, label: t('nav.terms') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-primary text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-light text-xs font-semibold">
            © {year} QuickToolsWeb.com. {t('common.copyRight')}
          </p>
          <p className="text-muted-light text-xs font-semibold">
            {t('common.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}

