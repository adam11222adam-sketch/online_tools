'use client';

import type { Tool } from '@/lib/tools';
import { BrainCircuit, CheckCircle2, UserCheck, RefreshCw, BookmarkCheck } from 'lucide-react';

interface Props {
  tool: Tool;
  locale: string;
}

export default function ToolAISummary({ tool, locale }: Props) {
  const isRtl = locale === 'ar';
  
  // Localized string sets
  const labelsDict: Record<string, { title: string; definition: string; bestFor: string; comparison: string; trust: string; summary: string }> = {
    ar: {
      title: 'ملخص الأداة الذكي',
      definition: 'التعريف المباشر',
      bestFor: 'الأكثر ملاءمة لـ',
      comparison: 'ملاحظة المقارنة',
      trust: 'مؤشرات الأمان والموثوقية',
      summary: 'ملخص القيمة المضافة'
    },
    en: {
      title: 'Smart Tool Summary',
      definition: 'Direct Definition',
      bestFor: 'Best Suited For',
      comparison: 'Alternative Comparison',
      trust: 'Trust & Security Signals',
      summary: 'Value Proposition Summary'
    },
    zh: {
      title: '智能工具摘要',
      definition: '直接定义',
      bestFor: '最适合人群',
      comparison: '传统软件对比',
      trust: '安全与信任信号',
      summary: '核心价值总结'
    },
    fr: {
      title: "Résumé intelligent de l'outil",
      definition: 'Définition directe',
      bestFor: 'Idéal pour',
      comparison: 'Comparaison alternative',
      trust: 'Signaux de confiance & sécurité',
      summary: 'Résumé de la proposition de valeur'
    },
    es: {
      title: 'Resumen inteligente de la herramienta',
      definition: 'Definición directa',
      bestFor: 'Ideal para',
      comparison: 'Comparación alternativa',
      trust: 'Señales de confianza y seguridad',
      summary: 'Resumen de la propuesta de valor'
    },
    pt: {
      title: 'Resumo inteligente da ferramenta',
      definition: 'Definição direta',
      bestFor: 'Ideal para',
      comparison: 'Comparação alternativa',
      trust: 'Sinais de confiança e segurança',
      summary: 'Resumo da proposta de valor'
    },
    hi: {
      title: 'स्मार्ट टूल सारांश',
      definition: 'प्रत्यक्ष परिभाषा',
      bestFor: 'इसके लिए सबसे उपयुक्त',
      comparison: 'वैकल्पिक तुलना',
      trust: 'विश्वास और सुरक्षा संकेत',
      summary: 'मूल्य प्रस्ताव सारांश'
    },
    id: {
      title: 'Ringkasan Alat Pintar',
      definition: 'Definisi Langsung',
      bestFor: 'Paling Cocok Untuk',
      comparison: 'Perbandingan Alternatif',
      trust: 'Sinyal Kepercayaan & Keamanan',
      summary: 'Ringkasan Proposisi Nilai'
    },
    de: {
      title: 'Intelligente Tool-Zusammenfassung',
      definition: 'Direkte Definition',
      bestFor: 'Am besten geeignet für',
      comparison: 'Alternativer Vergleich',
      trust: 'Vertrauens- & Sicherheitssignale',
      summary: 'Zusammenfassung des Wertversprechens'
    },
    tr: {
      title: 'Akıllı Araç Özeti',
      definition: 'Doğrudan Tanım',
      bestFor: 'En Uygun Kişiler',
      comparison: 'Alternatif Karşılaştırma',
      trust: 'Güven ve Güvenlik Sinyalleri',
      summary: 'Değer Önerisi Özeti'
    },
    ru: {
      title: 'Интеллектуальная сводка',
      definition: 'Прямое определение',
      bestFor: 'Лучше всего подходит для',
      comparison: 'Альтернативное сравнение',
      trust: 'Сигналы доверия и безопасности',
      summary: 'Резюме ценностного предложения'
    }
  };

  const labels = labelsDict[locale] || labelsDict.en;

  const definition = tool.geo.directDefinition[locale] || tool.geo.directDefinition['en'];
  const comparison = tool.geo.comparisonNote[locale] || tool.geo.comparisonNote['en'];
  const aiSummary = tool.geo.aiSummary[locale] || tool.geo.aiSummary['en'];
  const bestFor = tool.geo.bestFor[locale] || tool.geo.bestFor['en'] || [];
  const trustSignals = tool.geo.trustSignals[locale] || tool.geo.trustSignals['en'] || [];

  return (
    <section className="bg-card dark:bg-slate-900/30 border border-border/70 rounded-3xl p-6 sm:p-8 shadow-sm hover:border-primary/10 transition-all duration-300 mb-12 relative overflow-hidden animate-fade-in-up">
      {/* Dynamic background element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-6 border-b border-border/50 dark:border-slate-800/40 pb-4">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/10">
          <BrainCircuit className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            {labels.title}
          </h3>
          <p className="text-[11px] text-muted font-medium mt-0.5">
            {locale === 'ar' ? 'معلومات مهيكلة للزوار والذكاء الاصطناعي' : 'Structured facts for users & AI search'}
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Column 1: Definitions & Summary */}
        <div className="space-y-5">
          <div>
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookmarkCheck className="w-3.5 h-3.5 text-primary" />
              <span>{labels.definition}</span>
            </h4>
            <p className="text-sm font-semibold text-foreground leading-relaxed">
              {definition}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-primary" />
              <span>{labels.summary}</span>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {aiSummary}
            </p>
          </div>

          <div className="bg-surface dark:bg-slate-950/20 border border-border/40 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-secondary" />
              <span>{labels.comparison}</span>
            </h4>
            <p className="text-xs text-muted font-medium leading-relaxed">
              {comparison}
            </p>
          </div>
        </div>

        {/* Column 2: Best For & Trust Signals */}
        <div className="space-y-6">
          {/* Best For */}
          <div>
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-success" />
              <span>{labels.bestFor}</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {bestFor.map((item, idx) => (
                <span 
                  key={idx}
                  className="text-xs font-semibold text-success bg-success/10 border border-success/15 rounded-xl px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Trust Signals */}
          <div>
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-warning" />
              <span>{labels.trust}</span>
            </h4>
            <ul className="space-y-2">
              {trustSignals.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
