'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function WordCounterClient() {
  const t = useTranslations();
  const locale = useLocale();
  const [input, setInput] = useState('');
  
  const [stats, setStats] = useState({
    words: 0,
    charsWithSpaces: 0,
    charsWithoutSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    const text = input;
    
    // Arabic + English words
    // Match any word characters, including Arabic letters, numbers, and Latin letters
    const wordMatches = text.match(/[\u0600-\u06FF\w]+/g) || [];
    const words = wordMatches.length;
    
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s+/g, '').length;
    
    // Sentences based on periods, question marks, exclamation marks, and Arabic punctuation
    const sentenceMatches = text.match(/[^.!?؟؛]+[.!?؟؛]+/g) || [];
    // If there's text without ending punctuation, it counts as a sentence
    const hasRemainingSentence = /[^.!?؟؛\s]+$/.test(text);
    const sentences = sentenceMatches.length + (hasRemainingSentence ? 1 : 0);
    
    // Paragraphs based on non-empty lines
    const paragraphs = text.split(/\n+/).filter(line => line.trim().length > 0).length;
    
    // Reading time (assume 200 words per minute)
    const readingTime = Math.max(1, Math.ceil(words / 200));

    setStats({
      words,
      charsWithSpaces,
      charsWithoutSpaces,
      sentences: text.trim() === '' ? 0 : sentences,
      paragraphs,
      readingTime: text.trim() === '' ? 0 : readingTime,
    });
  }, [input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
  };

  const clearText = () => {
    setInput('');
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label={locale === 'ar' ? 'الكلمات' : 'Words'} value={stats.words} />
        <StatCard label={locale === 'ar' ? 'أحرف (بمسافات)' : 'Chars (with spaces)'} value={stats.charsWithSpaces} />
        <StatCard label={locale === 'ar' ? 'أحرف (بدون)' : 'Chars (without spaces)'} value={stats.charsWithoutSpaces} />
        <StatCard label={locale === 'ar' ? 'الجمل' : 'Sentences'} value={stats.sentences} />
        <StatCard label={locale === 'ar' ? 'الفقرات' : 'Paragraphs'} value={stats.paragraphs} />
        <StatCard label={locale === 'ar' ? 'مدة القراءة (دقائق)' : 'Reading time (min)'} value={stats.readingTime} />
      </div>

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('common.text') + '...'}
          className="w-full h-64 p-4 rounded-xl border border-border bg-surface text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all"
        />
        
        {/* Actions Toolbar */}
        <div className="absolute bottom-4 end-4 flex items-center gap-2">
          <button
            onClick={clearText}
            className="p-2 rounded-lg bg-surface hover:bg-surface-hover text-muted hover:text-danger transition-colors border border-border shadow-sm"
            title={t('common.reset')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors shadow-sm"
            title={t('common.copy')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
      <span className="text-3xl font-bold text-primary mb-1">{value}</span>
      <span className="text-sm font-medium text-muted">{label}</span>
    </div>
  );
}
