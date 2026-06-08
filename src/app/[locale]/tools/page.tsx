'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { tools, type ToolCategory } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import { 
  Search, 
  Layers, 
  FileText, 
  Image as ImageIcon, 
  QrCode, 
  Wrench,
  XCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function ToolsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [filter, setFilter] = useState<'all' | ToolCategory>('all');
  const [search, setSearch] = useState('');

  const categoryIntros: Record<string, Record<string, string>> = {
    all: {
      ar: "منصة ToolNova تقدم لك باقة شاملة من الأدوات الرقمية المجانية لمعالجة المستندات، تحرير الصور، توليد الرموز، والمساعدات اليومية في مكان واحد. جميع أدواتنا تعمل محلياً داخل متصفحك لضمان أقصى حماية وخصوصية ممكنة لملفاتك وبياناتك.",
      en: "ToolNova provides a comprehensive suite of free browser-based utilities for secure PDF management, high-performance image editing, interactive QR/Barcode creation, and daily utilities. Engineered to process data locally in-browser for ultimate speed and privacy.",
      zh: "ToolNova 提供了一套完整的免费浏览器工具，用于安全地管理 PDF、高性能处理图片、生成交互式二维码/条形码以及日常基本辅助。所有工具均在浏览器本地处理，以实现极致的速度和隐私保护。"
    },
    pdf: {
      ar: "مجموعة أدوات PDF متكاملة ومجانية تماماً تعمل بالكامل داخل متصفحك. قم بدمج، تقسيم، ضغط، حماية، وترتيب صفحات ملفات PDF محلياً دون رفعها لأي خادم خارجي لضمان الأمان والسرية المطلقة لبياناتك ومستنداتك الشخصية والمهنية.",
      en: "Complete, 100% free PDF toolkit running entirely inside your web browser. Merge, split, compress, protect, and reorder PDF pages locally without uploading files to remote servers, ensuring ultimate data privacy for personal and professional documents.",
      zh: "完全在浏览器中运行的完整、100% 免费的 PDF 工具包。在本地合并、拆分、压缩、加密和重新排列 PDF 页面，无需将文件上传到远程服务器，从而确保个人和专业文档的极致数据隐私。"
    },
    image: {
      ar: "أدوات معالجة وتحويل وضغط صور متقدمة تعمل في المتصفح. قم بتحويل الصور بين PNG وJPG وWebP، وضغط حجمها، وتغيير أبعادها أو قصها وتدويرها محلياً وبسرعة فائقة للحصول على أفضل جودة بصرية بأقل حجم ملف.",
      en: "Advanced browser-based image processing and conversion utility. Convert formats between PNG, JPG, and WebP, shrink file sizes, crop, rotate, and resize dimensions locally with extreme speed and premium visual results.",
      zh: "先进的基于浏览器的图片处理 and 转换工具。在本地即时转换 PNG、JPG 和 WebP 格式，压缩文件大小，裁剪、旋转和调整尺寸，以极快的速度和优质的视觉效果提供最佳体验。"
    },
    qr: {
      ar: "مولد رموز استجابة سريعة (QR Code) وباركود متكامل وتفاعلي. أنشئ رموز QR مخصصة لمواقع الويب، النصوص، محادثات الواتساب، وشبكات الواي فاي، بالإضافة إلى ملصقات الباركود القياسية للطباعة الفورية مباشرة من المتصفح.",
      en: "Interactive QR Code and Barcode generation suite. Instantly create custom QR codes for URLs, plain texts, WhatsApp chats, and Wi-Fi networks, along with standard commercial barcode labels, ready for printing and high-res download.",
      zh: "交互式二维码和条形码生成套件。即时为网址、文本、WhatsApp 聊天和 Wi-Fi 网络创建自定义二维码，以及标准的商业条形码标签，支持高清下载和即时打印。"
    },
    daily: {
      ar: "أدوات ومساعدات برمجية يومية أساسية مصممة للسرعة والأمان. قم بتوليد كلمات مرور عشوائية قوية، وحساب الكلمات، والتحويل إلى Base64، وترميز/فك ترميز URL، وتنظيف وتنسيق النصوص محلياً وفي ثوانٍ معدودة.",
      en: "Essential daily helper tools designed for high security and performance. Generate high-entropy passwords, parse word counts, encode/decode Base64 and URLs, and format text strings instantly and locally inside your browser.",
      zh: "为高安全性和高性能而设计的日常基本辅助工具。在浏览器本地即时生成强密码、统计字数、进行 Base64 和 URL 编码/解码以及清洗和格式化文本字符串。"
    }
  };

  const filteredTools = tools.filter((tool) => {
    const matchCategory = filter === 'all' || tool.category === filter;
    const matchSearch =
      search === '' ||
      t(`toolNames.${tool.slug}`).toLowerCase().includes(search.toLowerCase()) ||
      t(`toolDescriptions.${tool.slug}`).toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getFilterIcon = (key: 'all' | ToolCategory, active: boolean) => {
    const activeClass = active ? 'text-white' : 'text-muted-light group-hover:text-foreground';
    switch (key) {
      case 'all': return <Layers className={`w-4 h-4 transition-colors ${activeClass}`} />;
      case 'pdf': return <FileText className={`w-4 h-4 transition-colors ${activeClass}`} />;
      case 'image': return <ImageIcon className={`w-4 h-4 transition-colors ${activeClass}`} />;
      case 'qr': return <QrCode className={`w-4 h-4 transition-colors ${activeClass}`} />;
      default: return <Wrench className={`w-4 h-4 transition-colors ${activeClass}`} />;
    }
  };

  const getCategoryCount = (key: 'all' | ToolCategory) => {
    if (key === 'all') return tools.length;
    return tools.filter(tool => tool.category === key).length;
  };

  const filters: { key: 'all' | ToolCategory; label: string }[] = [
    { key: 'all', label: t('tools.filterAll') },
    { key: 'pdf', label: t('tools.filterPdf') },
    { key: 'image', label: t('tools.filterImage') },
    { key: 'qr', label: t('tools.filterQr') },
    { key: 'daily', label: t('tools.filterDaily') },
  ];

  return (
    <div className="py-16 sm:py-24 gradient-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            {t('tools.pageTitle')}
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {t('tools.pageDescription')}
          </p>
        </div>

        {/* Floating Search Container */}
        <div className="max-w-xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="relative group">
            <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-light group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('tools.searchPlaceholder')}
              className="w-full ps-12 pe-12 py-4 rounded-2xl border border-border bg-card/80 text-foreground placeholder:text-muted-light focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm focus:shadow-md"
              id="tools-search"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute inset-y-0 end-0 pe-4 flex items-center text-muted-light hover:text-foreground transition-colors"
                title="Clear search"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Wrapper */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          {filters.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/15 border border-primary/20'
                    : 'bg-card text-muted hover:text-foreground hover:bg-surface border border-border/80'
                }`}
              >
                {getFilterIcon(f.key, isActive)}
                <span>{f.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-surface dark:bg-slate-800/80 text-muted-light'
                }`}>
                  {getCategoryCount(f.key)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category GEO Introduction Banner */}
        <div className="mb-10 text-start animate-fade-in-up" style={{ animationDelay: '180ms' }}>
          <div className="relative overflow-hidden bg-card/60 dark:bg-slate-900/30 border border-border/50 dark:border-slate-800/40 rounded-2xl p-5 shadow-sm">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>
                {locale === 'ar' ? 'نظرة عامة على القسم' : locale === 'zh' ? '分类概览' : 'Category Overview'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {categoryIntros[filter][locale] || categoryIntros[filter]['en']}
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            /* Premium Empty State */
            <div className="max-w-md mx-auto text-center py-16 px-6 bg-card rounded-3xl border border-dashed border-border/80 shadow-sm">
              <div className="w-16 h-16 mx-auto bg-surface dark:bg-slate-900/60 rounded-2xl flex items-center justify-center text-muted mb-6 border border-border">
                <Search className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t('tools.noResultsTitle') || (search ? 'لم نجد أي نتائج لبحثك' : 'لا توجد أدوات في هذه الفئة')}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {t('tools.noResultsDesc') || 'يرجى التحقق من الكلمات المكتوبة أو تصفح الأقسام الأخرى.'}
              </p>
              <button 
                onClick={() => { setFilter('all'); setSearch(''); }}
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('tools.resetFilters') || 'إعادة تعيين البحث'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

