export interface Article {
  slug: string;
  date: string;
  relatedTools: string[];
}

export const articles: Article[] = [
  {
    slug: 'how-to-merge-pdf',
    date: '2025-04-20',
    relatedTools: ['merge-pdf', 'split-pdf', 'compress-pdf'],
  },
  {
    slug: 'how-to-compress-images',
    date: '2025-04-18',
    relatedTools: ['compress-image', 'resize-image', 'image-to-webp'],
  },
  {
    slug: 'what-is-qr-code',
    date: '2025-04-15',
    relatedTools: ['qr-link', 'qr-text', 'qr-whatsapp', 'qr-wifi'],
  },
  {
    slug: 'best-image-formats',
    date: '2025-04-12',
    relatedTools: ['png-to-jpg', 'jpg-to-png', 'image-to-webp', 'webp-to-image'],
  },
  {
    slug: 'how-to-protect-pdf',
    date: '2025-04-10',
    relatedTools: ['protect-pdf', 'unlock-pdf', 'compress-pdf'],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
