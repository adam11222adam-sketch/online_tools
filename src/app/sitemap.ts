import type { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { articles } from '@/lib/articles';

const BASE_URL = 'https://quicktoolsweb.com';
const locales = ['ar', 'en', 'zh', 'fr', 'es', 'pt', 'hi', 'id', 'de', 'tr', 'ru'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}`])),
      },
    });
  }

  // Tools page
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // Individual tool pages
  for (const tool of tools) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Blog page
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // Article pages
  for (const article of articles) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // Static pages
  const staticPages = ['contact', 'privacy-policy', 'terms'];
  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      });
    }
  }

  return entries;
}
