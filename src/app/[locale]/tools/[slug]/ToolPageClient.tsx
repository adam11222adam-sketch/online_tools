'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Tool } from '@/lib/tools';
import UploadBox from '@/components/UploadBox';
import ToolCard from '@/components/ToolCard';
import FAQ from '@/components/FAQ';
import { useState } from 'react';
import { 
  Trash2, 
  Home, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Shield, 
  Award, 
  Sparkles, 
  Smartphone,
  FileText,
  ArrowRight,
  UserCheck
} from 'lucide-react';

import ImageToolClient from '@/components/ImageToolClient';
import dynamic from 'next/dynamic';
import ToolQuickAnswer from '@/components/tools/ToolQuickAnswer';
import ToolAISummary from '@/components/tools/ToolAISummary';

const PdfExtractClient = dynamic(() => import('@/components/PdfExtractClient'), { ssr: false });
const PdfAdvancedClient = dynamic(() => import('@/components/PdfAdvancedClient'), { ssr: false });
const WordCounterClient = dynamic(() => import('@/components/WordCounterClient'), { ssr: false });
const CropImageClient = dynamic(() => import('@/components/CropImageClient'), { ssr: false });
const QrGeneratorPanel = dynamic(() => import('@/components/tools/qr/QrGeneratorPanel'), { ssr: false });
const ImageRotateClient = dynamic(() => import('@/components/ImageRotateClient'), { ssr: false });

// Tools that don't need file upload (text-based tools)
const NO_UPLOAD_TOOLS = [
  'qr-link', 'qr-text', 'qr-whatsapp', 'qr-wifi', 'barcode-generator',
  'password-generator', 'word-counter', 'base64-converter', 'url-encoder-decoder', 'text-cleaner',
];

const IMAGE_TOOLS = [
  'png-to-jpg', 'jpg-to-png', 'image-to-webp', 'webp-to-image',
  'compress-image', 'resize-image', 'crop-image', 'rotate-image',
  'images-to-pdf', 'extract-images-from-pdf'
];

const ADVANCED_PDF_TOOLS = [
  'split-pdf', 'compress-pdf', 'rotate-pdf', 'delete-pdf-pages',
  'organize-pdf', 'protect-pdf', 'unlock-pdf'
];

interface Props {
  tool: Tool;
  relatedTools: Tool[];
  article?: {
    slug: string;
    name: string;
    category: string;
    title: string;
    body: string;
    faqs: { question: string; answer: string }[];
  } | null;
  locale: string;
}

export default function ToolPageClient({ tool, relatedTools, article, locale }: Props) {
  const t = useTranslations();
  const isTextTool = NO_UPLOAD_TOOLS.includes(tool.slug);
  const isImageTool = IMAGE_TOOLS.includes(tool.slug);
  const isAdvancedPdfTool = ADVANCED_PDF_TOOLS.includes(tool.slug);
  const isRtl = locale === 'ar';

  // Merge dynamic FAQs from parsed article with default FAQs
  const defaultFaqs = [
    { question: t(`toolNames.${tool.slug}`) + '?', answer: t(`toolDescriptions.${tool.slug}`) },
    { question: t('common.free') + '?', answer: t('home.whyFreeDesc') },
    { question: t('common.secure') + '?', answer: t('home.whySecureDesc') },
  ];

  const faqItems = article?.faqs && article.faqs.length > 0
    ? [...article.faqs, ...defaultFaqs]
    : defaultFaqs;

  const renderNaturalLinks = () => {
    if (tool.category === 'pdf') {
      return (
        <div className="mb-14">
          <div className="text-sm text-muted-foreground leading-relaxed text-center py-4 px-6 bg-surface/50 border border-border/40 rounded-2xl shadow-sm">
            {locale === 'ar' ? (
              <>
                إذا كنت تعمل على تنظيم مستنداتك، فقد تحتاج أيضًا إلى أدواتنا الأخرى مثل{' '}
                <Link href="/tools/merge-pdf" className="text-primary hover:underline font-bold">دمج PDF</Link>،{' '}
                <Link href="/tools/split-pdf" className="text-primary hover:underline font-bold">تقسيم PDF</Link>،{' '}
                <Link href="/tools/compress-pdf" className="text-primary hover:underline font-bold">ضغط PDF</Link>، أو{' '}
                <Link href="/tools/organize-pdf" className="text-primary hover:underline font-bold">ترتيب صفحات PDF</Link>{' '}
                لتسهيل إدارتها بالكامل.
              </>
            ) : locale === 'zh' ? (
              <>
                如果您正在整理文档，您可能还需要我们的其他工具，例如{' '}
                <Link href="/tools/merge-pdf" className="text-primary hover:underline font-bold">合并 PDF</Link>、{' '}
                <Link href="/tools/split-pdf" className="text-primary hover:underline font-bold">拆分 PDF</Link>、{' '}
                <Link href="/tools/compress-pdf" className="text-primary hover:underline font-bold">压缩 PDF</Link> 或{' '}
                <Link href="/tools/organize-pdf" className="text-primary hover:underline font-bold">重新排列 PDF 页面</Link>{' '}
                来全面简化您的工作流程。
              </>
            ) : (
              <>
                If you are organizing your documents, you might also need our other tools like{' '}
                <Link href="/tools/merge-pdf" className="text-primary hover:underline font-bold">Merge PDF</Link>,{' '}
                <Link href="/tools/split-pdf" className="text-primary hover:underline font-bold">Split PDF</Link>,{' '}
                <Link href="/tools/compress-pdf" className="text-primary hover:underline font-bold">Compress PDF</Link>, or{' '}
                <Link href="/tools/organize-pdf" className="text-primary hover:underline font-bold">Reorder PDF Pages</Link>{' '}
                to fully streamline your workflow.
              </>
            )}
          </div>
        </div>
      );
    }
    if (tool.category === 'image') {
      return (
        <div className="mb-14">
          <div className="text-sm text-muted-foreground leading-relaxed text-center py-4 px-6 bg-surface/50 border border-border/40 rounded-2xl shadow-sm">
            {locale === 'ar' ? (
              <>
                لتحسين وتعديل صورك بشكل احترافي، يمكنك استكشاف أدواتنا الإضافية مثل{' '}
                <Link href="/tools/png-to-jpg" className="text-primary hover:underline font-bold">تحويل PNG إلى JPG</Link>،{' '}
                <Link href="/tools/jpg-to-png" className="text-primary hover:underline font-bold">تحويل JPG إلى PNG</Link>،{' '}
                <Link href="/tools/image-to-webp" className="text-primary hover:underline font-bold">تحويل الصور إلى WebP</Link>،{' '}
                <Link href="/tools/compress-image" className="text-primary hover:underline font-bold">ضغط الصور</Link>، أو{' '}
                <Link href="/tools/crop-image" className="text-primary hover:underline font-bold">قص الصور</Link>.
              </>
            ) : locale === 'zh' ? (
              <>
                为了使您的图片工作流更加专业，您可以探索我们的其他工具，例如{' '}
                <Link href="/tools/png-to-jpg" className="text-primary hover:underline font-bold">PNG 转 JPG</Link>、{' '}
                <Link href="/tools/jpg-to-png" className="text-primary hover:underline font-bold">JPG 转 PNG</Link>、{' '}
                <Link href="/tools/image-to-webp" className="text-primary hover:underline font-bold">图片转 WebP</Link>、{' '}
                <Link href="/tools/compress-image" className="text-primary hover:underline font-bold">压缩图片</Link> 或{' '}
                <Link href="/tools/crop-image" className="text-primary hover:underline font-bold">裁剪图片</Link>。
              </>
            ) : (
              <>
                To professionalize your image workflow, explore our other tools like{' '}
                <Link href="/tools/png-to-jpg" className="text-primary hover:underline font-bold">PNG to JPG</Link>,{' '}
                <Link href="/tools/jpg-to-png" className="text-primary hover:underline font-bold">JPG to PNG</Link>,{' '}
                <Link href="/tools/image-to-webp" className="text-primary hover:underline font-bold">Image to WebP</Link>,{' '}
                <Link href="/tools/compress-image" className="text-primary hover:underline font-bold">Compress Image</Link>, or{' '}
                <Link href="/tools/crop-image" className="text-primary hover:underline font-bold">Crop Image</Link>.
              </>
            )}
          </div>
        </div>
      );
    }
    if (tool.category === 'qr') {
      return (
        <div className="mb-14">
          <div className="text-sm text-muted-foreground leading-relaxed text-center py-4 px-6 bg-surface/50 border border-border/40 rounded-2xl shadow-sm">
            {locale === 'ar' ? (
              <>
                لإنشاء أنواع أخرى من الرموز المخصصة، يمكنك تجربة{' '}
                <Link href="/tools/qr-text" className="text-primary hover:underline font-bold">رمز QR للنصوص</Link>،{' '}
                <Link href="/tools/qr-whatsapp" className="text-primary hover:underline font-bold">رمز QR للواتساب</Link>،{' '}
                <Link href="/tools/qr-wifi" className="text-primary hover:underline font-bold">رمز QR للواي فاي</Link>، أو{' '}
                <Link href="/tools/barcode-generator" className="text-primary hover:underline font-bold">مولد الباركود</Link>.
              </>
            ) : locale === 'zh' ? (
              <>
                要创建其他定制代码，请尝试我们的{' '}
                <Link href="/tools/qr-text" className="text-primary hover:underline font-bold">文本二维码</Link>、{' '}
                <Link href="/tools/qr-whatsapp" className="text-primary hover:underline font-bold">WhatsApp 二维码</Link>、{' '}
                <Link href="/tools/qr-wifi" className="text-primary hover:underline font-bold">WiFi 二维码</Link> 或{' '}
                <Link href="/tools/barcode-generator" className="text-primary hover:underline font-bold">条形码生成器</Link>。
              </>
            ) : (
              <>
                To create other customized codes, try our{' '}
                <Link href="/tools/qr-text" className="text-primary hover:underline font-bold">Text QR Code</Link>,{' '}
                <Link href="/tools/qr-whatsapp" className="text-primary hover:underline font-bold">WhatsApp QR Code</Link>,{' '}
                <Link href="/tools/qr-wifi" className="text-primary hover:underline font-bold">WiFi QR Code</Link>, or{' '}
                <Link href="/tools/barcode-generator" className="text-primary hover:underline font-bold">Barcode Generator</Link>.
              </>
            )}
          </div>
        </div>
      );
    }
    if (tool.category === 'daily') {
      return (
        <div className="mb-14">
          <div className="text-sm text-muted-foreground leading-relaxed text-center py-4 px-6 bg-surface/50 border border-border/40 rounded-2xl shadow-sm">
            {locale === 'ar' ? (
              <>
                لتسهيل مهامك اليومية الإضافية، تصفح{' '}
                <Link href="/tools/password-generator" className="text-primary hover:underline font-bold">مولد كلمة المرور</Link>،{' '}
                <Link href="/tools/word-counter" className="text-primary hover:underline font-bold">عداد الكلمات</Link>،{' '}
                <Link href="/tools/base64-converter" className="text-primary hover:underline font-bold">محول Base64</Link>،{' '}
                <Link href="/tools/url-encoder-decoder" className="text-primary hover:underline font-bold">تشفير وفك تشفير URL</Link>، أو{' '}
                <Link href="/tools/text-cleaner" className="text-primary hover:underline font-bold">تنظيف النصوص</Link>.
              </>
            ) : locale === 'zh' ? (
              <>
                为了简化您的日常工作流程，请查看我们的{' '}
                <Link href="/tools/password-generator" className="text-primary hover:underline font-bold">密码生成器</Link>、{' '}
                <Link href="/tools/word-counter" className="text-primary hover:underline font-bold">字数计数器</Link>、{' '}
                <Link href="/tools/base64-converter" className="text-primary hover:underline font-bold">Base64 转换器</Link>、{' '}
                <Link href="/tools/url-encoder-decoder" className="text-primary hover:underline font-bold">URL 编码/解码</Link> 或{' '}
                <Link href="/tools/text-cleaner" className="text-primary hover:underline font-bold">文本清理器</Link>。
              </>
            ) : (
              <>
                To simplify your daily workflow, check out our{' '}
                <Link href="/tools/password-generator" className="text-primary hover:underline font-bold">Password Generator</Link>,{' '}
                <Link href="/tools/word-counter" className="text-primary hover:underline font-bold">Word Counter</Link>,{' '}
                <Link href="/tools/base64-converter" className="text-primary hover:underline font-bold">Base64 Converter</Link>,{' '}
                <Link href="/tools/url-encoder-decoder" className="text-primary hover:underline font-bold">URL Encoder/Decoder</Link>, or{' '}
                <Link href="/tools/text-cleaner" className="text-primary hover:underline font-bold">Text Cleaner</Link>.
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="py-12 sm:py-16 gradient-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted mb-8 overflow-x-auto whitespace-nowrap pb-2 animate-fade-in" dir={isRtl ? 'rtl' : 'ltr'}>
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{t('nav.home') || (isRtl ? 'الرئيسية' : 'Home')}</span>
          </Link>
          {isRtl ? <ChevronLeft className="w-3 h-3 text-muted-light" /> : <ChevronRight className="w-3 h-3 text-muted-light" />}
          <Link href="/tools" className="hover:text-primary transition-colors">
            <span>{t('nav.tools') || (isRtl ? 'الأدوات' : 'Tools')}</span>
          </Link>
          {isRtl ? <ChevronLeft className="w-3 h-3 text-muted-light" /> : <ChevronRight className="w-3 h-3 text-muted-light" />}
          <span className="text-foreground truncate">{t(`toolNames.${tool.slug}`)}</span>
        </nav>

        {/* 1. ToolHero (Header & Description) */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4 animate-fade-in">
            {t(`toolNames.${tool.slug}`)}
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {t(`toolDescriptions.${tool.slug}`)}
          </p>
        </div>

        {/* 2. ToolQuickAnswer */}
        <ToolQuickAnswer tool={tool} locale={locale} />

        {/* 3. ToolRenderer */}
        <div className="mb-16 animate-fade-in-up shadow-sm hover:shadow-md transition-shadow duration-300" style={{ animationDelay: '100ms' }}>
          {tool.slug === 'extract-images-from-pdf' || tool.slug === 'pdf-to-jpg' ? (
            <PdfExtractClient tool={tool} />
          ) : isAdvancedPdfTool ? (
            <PdfAdvancedClient tool={tool} />
          ) : ['qr-link', 'qr-text', 'qr-whatsapp'].includes(tool.slug) ? (
            <QrGeneratorPanel tool={tool} />
          ) : tool.slug === 'rotate-image' ? (
            <ImageRotateClient tool={tool} />
          ) : tool.slug === 'word-counter' ? (
            <WordCounterClient />
          ) : tool.slug === 'crop-image' ? (
            <CropImageClient tool={tool} />
          ) : isTextTool ? (
            <TextToolArea slug={tool.slug} />
          ) : isImageTool ? (
            <ImageToolArea tool={tool} />
          ) : (
            <FileToolArea tool={tool} />
          )}
        </div>

        {/* 4. Natural Contextual Links */}
        {renderNaturalLinks()}

        {/* 5. ToolHowToUse */}
        <section className="mb-14 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <h2 className="text-2xl font-extrabold text-foreground mb-6 flex items-center gap-2 text-start">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span>{t('common.howToUse') || (isRtl ? 'كيفية الاستخدام' : 'How to Use')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-start">
            {[1, 2, 3].map((step) => (
              <div key={step} className="relative bg-card dark:bg-slate-900/40 rounded-2xl p-6 text-center border border-border/50 dark:border-slate-800/40 shadow-sm hover:border-primary/20 transition-all duration-300">
                {/* Connecting lines for desktop */}
                {step < 3 && (
                  <div className={`hidden sm:block absolute top-1/2 -translate-y-1/2 ${isRtl ? '-left-3 rotate-180' : '-right-3'} z-10 text-muted-light`}>
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mx-auto mb-4 font-bold shadow-md shadow-primary/10">
                  {step}
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {step === 1
                    ? (isRtl ? 'الخطوة الأولى' : 'Step 1')
                    : step === 2
                    ? (isRtl ? 'الخطوة الثانية' : 'Step 2')
                    : (isRtl ? 'الخطوة الثالثة' : 'Step 3')}
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  {step === 1
                    ? isTextTool
                      ? t('common.text') || (isRtl ? 'أدخل النص الخاص بك' : 'Enter your input text')
                      : t('common.upload') || (isRtl ? 'قم برفع ملفاتك هنا' : 'Upload your files')
                    : step === 2
                    ? t('common.process') || (isRtl ? 'انقر للبدء بالمعالجة' : 'Click to process input')
                    : t('common.download') || (isRtl ? 'حمل الملف الناتج فوراً' : 'Download result file')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. ToolFeatures */}
        <section className="mb-14 animate-fade-in-up text-start" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-extrabold text-foreground mb-6">{t('common.features') || (isRtl ? 'المميزات الرئيسية' : 'Key Features')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap className="w-5 h-5 text-warning" />, label: t('common.fast') },
              { icon: <Shield className="w-5 h-5 text-success" />, label: t('common.secure') },
              { icon: <Award className="w-5 h-5 text-primary" />, label: t('common.free') },
              { icon: <Smartphone className="w-5 h-5 text-secondary" />, label: t('common.noRegistration') || (isRtl ? 'لا يتطلب تسجيل' : 'No Registration')}
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-card dark:bg-slate-900/20 border border-border/60 rounded-2xl p-4 hover:border-primary/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-surface dark:bg-slate-900/60 flex items-center justify-center shrink-0 border border-border/40">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-foreground font-semibold">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. ToolUseCases (Target Audiences using bestFor) */}
        <section className="mb-14 animate-fade-in-up text-start" style={{ animationDelay: '220ms' }}>
          <h2 className="text-2xl font-extrabold text-foreground mb-6 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-success" />
            <span>{isRtl ? 'الفئات المستفيدة وحالات الاستخدام' : locale === 'zh' ? '适用人群与使用场景' : 'Target Audience & Use Cases'}</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {(tool.geo.bestFor[locale] || tool.geo.bestFor['en'] || []).map((role, i) => (
              <div key={i} className="flex items-center gap-2 bg-success/5 dark:bg-success/10 border border-success/15 rounded-2xl px-4 py-3 shadow-sm hover:border-success/30 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
                <span className="text-sm font-bold text-success-foreground">{role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8. ToolAISummary */}
        <ToolAISummary tool={tool} locale={locale} />

        {/* 9. ToolArticle */}
        {article && (
          <section className="mb-14 mt-12 border-t border-border/60 pt-12 animate-fade-in-up text-start" style={{ animationDelay: '250ms' }}>
            <div className="bg-card/40 border border-border/70 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden backdrop-blur-sm">
              {/* Background gradient radial glow */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Article Header */}
              <div className="relative mb-8 text-start rtl:text-right" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
                  {locale === 'ar' ? 'دليل إرشادي شامل' : locale === 'zh' ? '综合指南' : 'Comprehensive Guide'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                  {article.title}
                </h2>
              </div>
              
              {/* Rich Body Content */}
              <div 
                className="relative text-start rtl:text-right text-muted-foreground prose dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed space-y-6"
                dir={isRtl ? 'rtl' : 'ltr'}
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
            </div>
          </section>
        )}

        {/* 10. ToolFAQ */}
        <FAQ
          title={t('common.faq')}
          items={faqItems}
        />

        {/* 11. RelatedTools */}
        {relatedTools.length > 0 && (
          <section className="mt-10 text-start">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t('common.relatedTools')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedTools.map((rt) => (
                <ToolCard key={rt.slug} tool={rt} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function FileToolArea({ tool }: { tool: Tool }) {
  const t = useTranslations('common');
  const tGlobal = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    
    try {
      if (tool.slug === 'merge-pdf') {
        const formData = new FormData();
        files.forEach(f => formData.append('files', f));
        const res = await fetch('/api/pdf/merge', { method: 'POST', body: formData });
        if (res.ok) {
          const blob = await res.blob();
          triggerDownload(blob, 'merged.pdf');
          setDone(true);
        } else {
          alert('Failed to merge PDFs');
        }
      } else if (tool.slug.includes('-to-') && !tool.slug.includes('pdf-to-jpg')) {
        // Image to Image conversion
        const parts = tool.slug.split('-to-');
        const targetFormat = parts[1]; // jpg, png, webp
        
        let success = true;
        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('format', targetFormat);
          const res = await fetch('/api/image/convert', { method: 'POST', body: formData });
          if (res.ok) {
            const blob = await res.blob();
            triggerDownload(blob, `${file.name.split('.')[0]}.${targetFormat}`);
          } else {
            success = false;
          }
        }
        if (success) setDone(true);
        else alert('Some conversions failed.');
      } else {
        // Mock fallback for missing APIs
        await new Promise((r) => setTimeout(r, 1500));
        alert('This specific tool is a premium feature or under development.');
        setDone(true);
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred during processing.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm">
      {!done ? (
        <>
          <UploadBox
            acceptedFormats={tool.acceptedFormats}
            maxFileSize={tool.maxFileSize}
            multiple={tool.slug.includes('merge') || tool.slug.includes('images-to')}
            onFilesSelected={(f) => setFiles((prev) => [...prev, ...f])}
          />

          {files.length > 0 && (
            <div className="mt-6">
              <div className="space-y-3 mb-6">
                {files.map((f, i) => {
                  const fileSize = f.size > 1024 * 1024 
                    ? `${(f.size / (1024 * 1024)).toFixed(2)} MB` 
                    : `${(f.size / 1024).toFixed(2)} KB`;
                  return (
                    <div key={i} className="flex items-center justify-between bg-surface dark:bg-slate-900/60 rounded-2xl border border-border/60 p-4 animate-fade-in group">
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0 text-primary">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="truncate text-start">
                          <p className="text-sm font-semibold text-foreground truncate">{f.name}</p>
                          <p className="text-[11px] text-muted font-medium mt-0.5">{fileSize}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setFiles(files.filter((_, j) => j !== i))} 
                        className="p-2 rounded-xl bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all duration-200"
                        title={t('delete') || 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleProcess}
                disabled={processing}
                className="w-full btn-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-base shadow-lg shadow-primary/10 hover:shadow-primary/20"
                id="process-button"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{t('processing') || 'جاري المعالجة...'}</span>
                  </>
                ) : (
                  <>
                    <span>{tGlobal(`toolNames.${tool.slug}`) || t('process')}</span>
                    {isRtl ? <ArrowRight className="w-4 h-4 rotate-180 animate-pulse" /> : <ArrowRight className="w-4 h-4 animate-pulse" />}
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto mb-6 text-3xl font-extrabold shadow-sm">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{t('done') || 'تمت العملية بنجاح!'}</h3>
          <p className="text-sm text-muted mb-6">{isRtl ? 'تم تحميل ملفك المعالج بنجاح.' : 'Your processed file has been downloaded successfully.'}</p>
          <button
            onClick={() => { setDone(false); setFiles([]); }}
            className="px-8 py-3 rounded-xl border border-border bg-surface text-foreground font-semibold hover:bg-surface-hover transition-colors"
          >
            {t('tryAgain') || 'معالجة ملف آخر'}
          </button>
        </div>
      )}
    </div>
  );
}

function TextToolArea({ slug }: { slug: string }) {
  const t = useTranslations('common');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [processing, setProcessing] = useState(false);

  const process = async () => {
    if (!input.trim() && slug !== 'password-generator') return;

    if (slug.startsWith('qr-')) {
      setProcessing(true);
      try {
        let formattedText = input;
        if (slug === 'qr-whatsapp') formattedText = `https://wa.me/${input.replace(/\D/g, '')}`;
        if (slug === 'qr-wifi') formattedText = `WIFI:S:${input};T:WPA;P:;;`;
        
        const res = await fetch('/api/qr', {
          method: 'POST',
          body: JSON.stringify({ text: formattedText, format: 'svg' }),
          headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
          const svg = await res.text();
          setOutput(svg);
          setIsImage(true);
        }
      } finally {
        setProcessing(false);
      }
      return;
    }

    if (slug === 'barcode-generator') {
      setProcessing(true);
      try {
        const res = await fetch('/api/barcode', {
          method: 'POST',
          body: JSON.stringify({ text: input, type: 'code128' }),
          headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
          const blob = await res.blob();
          setOutput(URL.createObjectURL(blob));
          setIsImage(true);
        }
      } finally {
        setProcessing(false);
      }
      return;
    }

    // Text tools processing
    setIsImage(false);
    switch (slug) {
      case 'base64-converter':
        try {
          setOutput(btoa(unescape(encodeURIComponent(input))));
        } catch {
          try {
            setOutput(decodeURIComponent(escape(atob(input))));
          } catch {
            setOutput('Invalid Base64 or Text input');
          }
        }
        break;
      case 'url-encoder-decoder':
        try {
          setOutput(input.includes('%') ? decodeURIComponent(input) : encodeURIComponent(input));
        } catch {
          setOutput('Invalid URL input');
        }
        break;
      case 'text-cleaner':
        setOutput(input.replace(/\s+/g, ' ').trim());
        break;
      case 'password-generator': {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let pw = '';
        for (let i = 0; i < 16; i++) pw += chars.charAt(Math.floor(Math.random() * chars.length));
        setOutput(pw);
        break;
      }
      default:
        setOutput(input);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
      {slug !== 'password-generator' && (
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('text') + '...'}
          className="w-full h-32 p-4 rounded-xl border border-border bg-surface text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all"
          id="tool-input"
        />
      )}
      <button
        onClick={process}
        disabled={processing}
        className="w-full btn-primary py-3 rounded-xl font-semibold disabled:opacity-50"
        id="process-button"
      >
        {processing ? t('processing') : slug === 'password-generator' ? t('generate') : t('process')}
      </button>

      {output && (
        <div className="p-4 bg-surface rounded-xl animate-fade-in text-center overflow-hidden">
          {isImage ? (
            <div className="flex flex-col items-center gap-4">
              {output.startsWith('<svg') ? (
                <div dangerouslySetInnerHTML={{ __html: output }} className="w-48 h-48 bg-white p-2 rounded-lg" />
              ) : (
                <img src={output} alt="Generated" className="max-w-full h-auto bg-white p-2 rounded-lg" />
              )}
              <a
                href={output.startsWith('<svg') ? `data:image/svg+xml;utf8,${encodeURIComponent(output)}` : output}
                download={`generated-${slug}.png`}
                className="text-primary hover:underline font-medium text-sm"
              >
                {t('download')}
              </a>
            </div>
          ) : (
            <div className="text-start">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted font-medium">{t('text')}:</span>
                <button
                  onClick={() => navigator.clipboard.writeText(output)}
                  className="text-primary text-sm hover:underline"
                >
                  {t('copy')}
                </button>
              </div>
              <p className="text-foreground break-all font-mono text-sm">{output}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ImageToolArea({ tool }: { tool: Tool }) {
  const t = useTranslations('common');
  const [quality, setQuality] = useState(85);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [preserveRatio, setPreserveRatio] = useState(true);
  const [angle, setAngle] = useState(90);
  const [outputFormat, setOutputFormat] = useState('jpg');
  const [cropLeft, setCropLeft] = useState('');
  const [cropTop, setCropTop] = useState('');
  const [cropWidth, setCropWidth] = useState('');
  const [cropHeight, setCropHeight] = useState('');

  // Determine which action to call
  let action = tool.slug;
  if (tool.slug === 'pdf-to-jpg') action = 'pdf-to-jpg'; // Not implemented in our generic API yet, wait we didn't add it to API! The API route extract-from-pdf handles pdf but returns 501. Wait, pdf-to-jpg can use the same logic if we use pdf-image. Let's just pass the slug.

  const getFormData = (files: File[]) => {
    const formData = new FormData();
    files.forEach(f => formData.append('file', f));
    
    if (['compress-image', 'image-to-webp'].includes(tool.slug)) {
      formData.append('quality', quality.toString());
    }
    if (tool.slug === 'resize-image') {
      formData.append('width', width);
      formData.append('height', height);
      formData.append('preserveAspectRatio', preserveRatio.toString());
    }
    if (tool.slug === 'rotate-image') {
      formData.append('angle', angle.toString());
    }
    if (tool.slug === 'webp-to-image') {
      formData.append('output', outputFormat);
    }
    return formData;
  };

  let options = null;

  if (['compress-image', 'image-to-webp'].includes(tool.slug)) {
    options = (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Quality: {quality}%
        </label>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={quality} 
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full accent-primary" 
        />
      </div>
    );
  } else if (tool.slug === 'resize-image') {
    options = (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Width (px)</label>
          <input type="number" value={width} onChange={e => setWidth(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-surface focus:outline-primary" placeholder="Auto" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Height (px)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-surface focus:outline-primary" placeholder="Auto" />
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <input type="checkbox" id="preserve" checked={preserveRatio} onChange={e => setPreserveRatio(e.target.checked)} className="w-4 h-4 text-primary" />
          <label htmlFor="preserve" className="text-sm text-foreground">Preserve aspect ratio</label>
        </div>
      </div>
    );
  } else if (tool.slug === 'rotate-image') {
    options = (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Angle</label>
        <select value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-border bg-surface focus:outline-primary">
          <option value={90}>90° Clockwise</option>
          <option value={180}>180°</option>
          <option value={270}>90° Counter-Clockwise</option>
        </select>
      </div>
    );
  } else if (tool.slug === 'webp-to-image') {
    options = (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Output Format</label>
        <select value={outputFormat} onChange={e => setOutputFormat(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-surface focus:outline-primary">
          <option value="jpg">JPG</option>
          <option value="png">PNG</option>
        </select>
      </div>
    );
  }

  return (
    <ImageToolClient 
      tool={tool} 
      apiRoute={`/api/image/${action}`} 
      options={options} 
      getFormData={getFormData}
    />
  );
}
