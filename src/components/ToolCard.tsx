'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Tool } from '@/lib/tools';
import * as LucideIcons from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // Dynamically get the icon
  const IconComponent = (LucideIcons as any)[tool.icon] || LucideIcons.Wrench;

  const categoryColors: Record<string, string> = {
    pdf: 'text-rose-600 dark:text-rose-400',
    image: 'text-emerald-600 dark:text-emerald-400',
    qr: 'text-violet-600 dark:text-violet-400',
    daily: 'text-amber-600 dark:text-amber-400',
  };

  const categoryBg: Record<string, string> = {
    pdf: 'bg-rose-50 dark:bg-rose-950/30 border-rose-100/50 dark:border-rose-900/20',
    image: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100/50 dark:border-emerald-900/20',
    qr: 'bg-violet-50 dark:bg-violet-950/30 border-violet-100/50 dark:border-violet-900/20',
    daily: 'bg-amber-50 dark:bg-amber-950/30 border-amber-100/50 dark:border-amber-900/20',
  };

  return (
    <Link
      href={`/tools/${tool.slug}` as '/tools'}
      className="group block bg-card rounded-2xl border border-border p-6 card-hover relative overflow-hidden"
      id={`tool-card-${tool.slug}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl border ${categoryBg[tool.category]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`w-6 h-6 ${categoryColors[tool.category]}`} />
        </div>
        
        {/* Subtle category tag */}
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${categoryColors[tool.category]} ${categoryBg[tool.category].split(' ')[0]} bg-opacity-70 dark:bg-opacity-20`}>
          {t(`categories.${tool.category}`)}
        </span>
      </div>
      
      <h3 className="font-semibold text-base text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-1">
        <span>{t(`toolNames.${tool.slug}`)}</span>
      </h3>
      
      <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
        {t(`toolDescriptions.${tool.slug}`)}
      </p>

      {/* Elegant Hover Indicator */}
      <div className="flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span className="me-1">{t('common.useTool') || 'Use Tool'}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

