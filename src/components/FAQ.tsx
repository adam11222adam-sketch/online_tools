'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-8">
      {title && (
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      )}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 text-start font-medium text-foreground hover:bg-surface-hover transition-colors"
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <svg
                className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-sm text-muted leading-relaxed animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
