import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getToolBySlug, getRelatedTools, tools } from '@/lib/tools';
import type { Metadata } from 'next';
import ToolPageClient from './ToolPageClient';

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const title = t(`toolNames.${slug}`);
  const description = t(`toolDescriptions.${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: `https://quicktoolsweb.com/${locale}/tools/${slug}`,
      languages: {
        ar: `https://quicktoolsweb.com/ar/tools/${slug}`,
        en: `https://quicktoolsweb.com/en/tools/${slug}`,
        zh: `https://quicktoolsweb.com/zh/tools/${slug}`,
        fr: `https://quicktoolsweb.com/fr/tools/${slug}`,
        es: `https://quicktoolsweb.com/es/tools/${slug}`,
        pt: `https://quicktoolsweb.com/pt/tools/${slug}`,
        hi: `https://quicktoolsweb.com/hi/tools/${slug}`,
        id: `https://quicktoolsweb.com/id/tools/${slug}`,
        de: `https://quicktoolsweb.com/de/tools/${slug}`,
        tr: `https://quicktoolsweb.com/tr/tools/${slug}`,
        ru: `https://quicktoolsweb.com/ru/tools/${slug}`,
      },
    },
    openGraph: { title, description },
  };
}


function compileDynamicArticle(tool: any, locale: string, t: any) {
  const toolName = t(`toolNames.${tool.slug}`);
  const toolDesc = t(`toolDescriptions.${tool.slug}`);
  const siteDomain = 'QuickToolsWeb.com';

  const strongToolName = `<strong class="font-semibold text-foreground">${toolName}</strong>`;
  const strongSiteDomain = `<strong class="font-semibold text-foreground">${siteDomain}</strong>`;

  const replacePlaceholders = (text: string) => {
    if (!text) return '';
    return text
      .replace(/{toolName}/g, strongToolName)
      .replace(/{toolDesc}/g, toolDesc)
      .replace(/{siteDomain}/g, strongSiteDomain);
  };

  const getHeadingHtml = (titleKey: string, hasPlaceholder = false) => {
    const rawTitle = t(titleKey);
    const title = hasPlaceholder ? replacePlaceholders(rawTitle) : rawTitle;
    return `<h3 class="text-xl font-bold text-foreground mt-8 mb-4 ltr:border-l-4 ltr:pl-3 rtl:border-r-4 rtl:pr-3 border-primary">${title}</h3>`;
  };

  const getParagraphHtml = (textKey: string) => {
    return `<p class="leading-relaxed text-muted mb-4">${replacePlaceholders(t(textKey))}</p>`;
  };

  const introTitle = getHeadingHtml('articleTemplates.introTitle');
  const introBody = getParagraphHtml('articleTemplates.introText1') + getParagraphHtml('articleTemplates.introText2');

  const whatIsTitle = getHeadingHtml('articleTemplates.whatIsTitle', true);
  const whatIsBody = getParagraphHtml('articleTemplates.whatIsText1') + getParagraphHtml('articleTemplates.whatIsText2');

  const whyTitle = getHeadingHtml('articleTemplates.whyTitle', true);
  const whyBody = getParagraphHtml('articleTemplates.whyText1') + getParagraphHtml('articleTemplates.whyText2') + getParagraphHtml('articleTemplates.whyText3');

  const howTitle = getHeadingHtml('articleTemplates.howTitle', true);
  const howBody = getParagraphHtml('articleTemplates.howText1') + getParagraphHtml('articleTemplates.howText2');

  const featuresTitle = getHeadingHtml('articleTemplates.featuresTitle');
  const featuresBody = getParagraphHtml('articleTemplates.featuresText1') + getParagraphHtml('articleTemplates.featuresText2');

  const safetyTitle = getHeadingHtml('articleTemplates.safetyTitle', true);
  const safetyBody = getParagraphHtml('articleTemplates.safetyText1') + getParagraphHtml('articleTemplates.safetyText2');

  const tipsTitle = getHeadingHtml('articleTemplates.tipsTitle');
  const tipsBody = getParagraphHtml('articleTemplates.tipsText1') + getParagraphHtml('articleTemplates.tipsText2');

  const conclusionTitle = getHeadingHtml('articleTemplates.conclusionTitle');
  const conclusionBody = getParagraphHtml('articleTemplates.conclusionText1');

  const body = [
    introTitle, introBody,
    whatIsTitle, whatIsBody,
    whyTitle, whyBody,
    howTitle, howBody,
    featuresTitle, featuresBody,
    safetyTitle, safetyBody,
    tipsTitle, tipsBody,
    conclusionTitle, conclusionBody
  ].join('\n');

  let articleTitle = '';
  if (locale === 'ar') {
    articleTitle = `دليل شامل لاستخدام أداة ${toolName} أونلاين مجاناً`;
  } else if (locale === 'zh') {
    articleTitle = `免费在线 ${toolName} 使用指南`;
  } else if (locale === 'fr') {
    articleTitle = `Guide complet pour utiliser l'outil ${toolName} en ligne gratuitement`;
  } else if (locale === 'es') {
    articleTitle = `Guía completa para usar la herramienta ${toolName} en línea gratis`;
  } else if (locale === 'pt') {
    articleTitle = `Guia completo para usar a ferramenta ${toolName} online gratuitement`;
  } else if (locale === 'hi') {
    articleTitle = `मुफ़्त ऑनलाइन ${toolName} टูล का उपयोग करने के लिए संपूर्ण गाइड`;
  } else if (locale === 'id') {
    articleTitle = `Panduan lengkap untuk menggunakan alat ${toolName} online gratis`;
  } else if (locale === 'de') {
    articleTitle = `Vollständige Anleitung zur kostenlosen Online-Nutzung des ${toolName}-Tools`;
  } else if (locale === 'tr') {
    articleTitle = `Ücretsiz çevrimiçi ${toolName} aracını kullanma kılavuzu`;
  } else if (locale === 'ru') {
    articleTitle = `Полное руководство по бесплатному онлайн-использованию инструмента ${toolName}`;
  } else {
    articleTitle = `Comprehensive Guide to Using ${toolName} Online for Free`;
  }

  return {
    slug: tool.slug,
    name: toolName,
    category: tool.category,
    title: articleTitle,
    body: body,
    faqs: []
  };
}

function generateSchemas(tool: any, locale: string, t: any, article: any) {
  const domain = 'https://quicktoolsweb.com';
  const toolName = t(`toolNames.${tool.slug}`);
  const toolDesc = t(`toolDescriptions.${tool.slug}`);
  const toolUrl = `${domain}/${locale}/tools/${tool.slug}`;

  // 1. WebApplication
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": toolName,
    "description": toolDesc,
    "url": toolUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires a modern web browser",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Free to use",
      "No sign-up required",
      "Works in the browser",
      "Mobile and desktop friendly"
    ]
  };

  // 2. SoftwareApplication
  const softAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolName,
    "description": toolDesc,
    "url": toolUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // 3. DefinedTerm
  const def = tool.geo.directDefinition[locale] || tool.geo.directDefinition['en'];
  const termSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": toolName,
    "description": def
  };

  // 4. HowTo
  const steps = [
    {
      "@type": "HowToStep",
      "name": locale === 'ar' ? 'رفع الملف أو إدخال البيانات' : locale === 'zh' ? '上传文件或输入数据' : 'Upload file or enter data',
      "text": locale === 'ar' ? 'افتح الأداة وأضف الملف أو البيانات المطلوبة.' : locale === 'zh' ? '打开工具并添加所需文件或输入。' : 'Open the tool and add the required file or input.'
    },
    {
      "@type": "HowToStep",
      "name": locale === 'ar' ? 'انقر للبدء بالمعالجة' : locale === 'zh' ? '开始处理输入' : 'Click to process input',
      "text": locale === 'ar' ? 'اضغط زر المعالجة لبدء التشغيل الفوري.' : locale === 'zh' ? '单击处理按钮以启动即时操作。' : 'Click the process button to start the instant operation.'
    },
    {
      "@type": "HowToStep",
      "name": locale === 'ar' ? 'حمل الملف الناتج فوراً' : locale === 'zh' ? '立即下载结果文件' : 'Download result file instantly',
      "text": locale === 'ar' ? 'قم بتنزيل الملف المعالج وحفظه محلياً.' : locale === 'zh' ? '下载已处理的文件并保存在本地。' : 'Download the processed file and save it locally.'
    }
  ];
  
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": locale === 'ar' ? `كيفية استخدام أداة ${toolName}` : locale === 'zh' ? `如何使用 ${toolName} 工具` : `How to use ${toolName}`,
    "step": steps
  };

  // 5. BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'ar' ? 'الرئيسية' : locale === 'zh' ? '首页' : 'Home',
        "item": `${domain}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === 'ar' ? 'الأدوات' : locale === 'zh' ? '所有工具' : 'Tools',
        "item": `${domain}/${locale}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": toolName,
        "item": toolUrl
      }
    ]
  };

  // 6. FAQPage
  const faqs: any[] = [];
  if (article?.faqs && article.faqs.length > 0) {
    article.faqs.forEach((item: any) => {
      faqs.push({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      });
    });
  }
  
  // Add default FAQs
  const defaultFaqs = [
    { question: toolName + '?', answer: toolDesc },
    { question: t('common.free') + '?', answer: t('home.whyFreeDesc') },
    { question: t('common.secure') + '?', answer: t('home.whySecureDesc') },
  ];
  defaultFaqs.forEach((item: any) => {
    faqs.push({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    });
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  };

  // 7. Article
  let articleSchema = null;
  if (article) {
    articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": toolDesc,
      "url": toolUrl,
      "author": {
        "@type": "Organization",
        "name": "QuickToolsWeb.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "QuickToolsWeb.com",
        "logo": {
          "@type": "ImageObject",
          "url": `${domain}/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": toolUrl
      }
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      webAppSchema,
      softAppSchema,
      termSchema,
      howToSchema,
      breadcrumbSchema,
      faqSchema,
      ...(articleSchema ? [articleSchema] : [])
    ]
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const relatedTools = getRelatedTools(slug, 4);
  const t = await getTranslations({ locale });

  // Load article if it exists, otherwise compile dynamic article
  let article = null;
  try {
    const customArticlePath = path.join(process.cwd(), 'src/content/articles', slug, `${locale}.json`);
    if (fs.existsSync(customArticlePath)) {
      const fileContent = fs.readFileSync(customArticlePath, 'utf8');
      article = JSON.parse(fileContent);
    } else {
      // Compile dynamic article using templates
      article = compileDynamicArticle(tool, locale, t);
    }
  } catch (e) {
    console.error(`Failed to load or compile article for slug: ${slug}`, e);
  }

  const schemaGraph = generateSchemas(tool, locale, t, article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <ToolPageClient
        tool={tool}
        relatedTools={relatedTools}
        article={article}
        locale={locale}
      />
    </>
  );
}

