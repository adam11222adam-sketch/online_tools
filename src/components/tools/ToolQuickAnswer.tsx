'use client';

import type { Tool } from '@/lib/tools';
import { Sparkles, ShieldCheck, Zap, Smartphone, Globe } from 'lucide-react';

interface Props {
  tool: Tool;
  locale: string;
}

export default function ToolQuickAnswer({ tool, locale }: Props) {
  const isRtl = locale === 'ar';
  
  // Localized headers and labels
  const titleTextDict: Record<string, string> = {
    ar: 'إجابة سريعة',
    en: 'Quick Answer',
    zh: '快速回答',
    fr: 'Réponse rapide',
    es: 'Respuesta rápida',
    pt: 'Resposta rápida',
    hi: 'त्वरित उत्तर',
    id: 'Jawaban Cepat',
    de: 'Schnelle Antwort',
    tr: 'Hızlı Cevap',
    ru: 'Быстрый ответ'
  };

  const badgesDict: Record<string, Array<{ text: string; icon: React.ReactNode }>> = {
    ar: [
      { text: 'مجاني بالكامل', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'بدون تسجيل دخول', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'معالجة في المتصفح', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'مناسب للهاتف والكمبيوتر', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    en: [
      { text: '100% Free', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'No Sign-up', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'Browser-Based', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'Mobile & Desktop', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    zh: [
      { text: '100% 免费', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: '无需注册', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: '基于浏览器', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: '支持手机和电脑', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    fr: [
      { text: '100% Gratuit', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'Sans inscription', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'Dans le navigateur', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'Mobile & Bureau', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    es: [
      { text: '100% Gratis', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'Sin registro', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'En el navegador', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'Móvil y Escritorio', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    pt: [
      { text: '100% Gratuito', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'Sem registo', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'No navegador', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'Telemóvel & Computador', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    hi: [
      { text: '100% मुफ़्त', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'कोई साइन-अप नहीं', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'ब्राउज़र-आधारित', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'मोबाइल और डेस्कटॉप', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    id: [
      { text: '100% Gratis', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'Tanpa Daftar', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'Di Browser', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'HP & Laptop', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    de: [
      { text: '100% Kostenlos', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'Ohne Anmeldung', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'Im Browser', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'Mobil & Desktop', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    tr: [
      { text: '%100 Ücretsiz', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'Kayıt Gerekmez', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'Tarayıcı Tabanlı', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'Mobil & Masaüstü', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ],
    ru: [
      { text: '100% Бесплатно', icon: <Zap className="w-3.5 h-3.5 text-warning" /> },
      { text: 'Без регистрации', icon: <ShieldCheck className="w-3.5 h-3.5 text-success" /> },
      { text: 'В браузере', icon: <Globe className="w-3.5 h-3.5 text-primary" /> },
      { text: 'На ПК и телефоне', icon: <Smartphone className="w-3.5 h-3.5 text-secondary" /> }
    ]
  };

  const titleText = titleTextDict[locale] || titleTextDict.en;
  const badges = badgesDict[locale] || badgesDict.en;

  const answer = tool.geo.quickAnswer[locale] || tool.geo.quickAnswer['en'];

  return (
    <section className="relative overflow-hidden bg-card/60 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-border/50 dark:border-slate-800/40 shadow-sm hover:border-primary/20 transition-all duration-300 mb-8 animate-fade-in-up">
      {/* Background radial glow */}
      <div className={`absolute -top-24 ${isRtl ? '-left-24' : '-right-24'} w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none`} />
      
      <div className="flex items-center gap-2 mb-3.5">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
        <h3 className="text-xs font-bold tracking-wider text-primary uppercase">
          {titleText}
        </h3>
      </div>

      <p className="text-foreground font-medium text-base sm:text-lg leading-relaxed text-start select-all selection:bg-primary/25">
        {answer}
      </p>

      {/* Trust Signal Badges */}
      <div className="flex flex-wrap gap-2.5 mt-5 pt-5 border-t border-border/40 dark:border-slate-800/40">
        {badges.map((badge, index) => (
          <div 
            key={index}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface dark:bg-slate-950/40 text-xs font-semibold text-muted border border-border/40 dark:border-slate-800/40 hover:border-muted-light transition-colors duration-200"
          >
            {badge.icon}
            <span>{badge.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
