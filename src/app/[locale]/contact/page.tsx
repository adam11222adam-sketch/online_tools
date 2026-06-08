'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{t('pageTitle')}</h1>
          <p className="text-muted text-lg">{t('subtitle')}</p>
        </div>

        {sent ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-lg text-foreground font-medium">{t('successMessage')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5 animate-fade-in-up">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">{t('name')}</label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder={t('namePlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">{t('email')}</label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">{t('message')}</label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder={t('messagePlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary py-3 rounded-xl font-semibold"
              id="contact-submit"
            >
              {t('send')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
