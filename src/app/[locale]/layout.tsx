import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic, Noto_Sans_SC, Noto_Sans_Devanagari } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const arabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });
const chinese = Noto_Sans_SC({ weight: ['300', '400', '500', '600', '700', '800'], preload: false, variable: '--font-chinese' });
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], preload: false, variable: '--font-devanagari' });

import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  
  const titles: Record<string, string> = {
    ar: 'QuickToolsWeb - أدوات أونلاين مجانية لمعالجة الملفات',
    en: 'QuickToolsWeb - Free Online File Processing Tools',
    zh: 'QuickToolsWeb - 免费在线文件处理工具',
    fr: 'QuickToolsWeb - Outils en ligne gratuits pour traiter les fichiers',
    es: 'QuickToolsWeb - Herramientas online gratuitas para procesar archivos',
    pt: 'QuickToolsWeb - Ferramentas online gratuitas para processar arquivos',
    hi: 'QuickToolsWeb - फ़ाइलों को प्रोसेस करने के लिए मुफ़्त ऑनलाइन टूल्स',
    id: 'QuickToolsWeb - Alat online gratis untuk memproses file',
    de: 'QuickToolsWeb - Kostenlose Online-Tools zur Dateiverarbeitung',
    tr: 'QuickToolsWeb - Dosyaları işlemek için ücretsiz çevrimiçi araçlar',
    ru: 'QuickToolsWeb - Бесплатные онлайн-инструменты для обработки файлов',
  };

  const descriptions: Record<string, string> = {
    ar: 'أدوات مجانية لمعالجة PDF والصور وإنشاء QR Code والمزيد. سريعة وآمنة وبدون تسجيل.',
    en: 'Free tools for PDF processing, image editing, QR Code generation, and more. Fast, secure, and no registration required.',
    zh: '免费的PDF处理、图片编辑、二维码生成等工具。快速、安全、无需注册。',
    fr: "Outils gratuits pour le traitement de PDF, l'édition d'images, la génération de QR codes, etc. Rapide, sécurisé et sans inscription.",
    es: 'Herramientas gratuitas para procesar PDF, editar imágenes, generar códigos QR y más. Rápido, seguro y sin registro.',
    pt: 'Ferramentas gratuitas para processamento de PDF, edição de imagens, geração de código QR e muito mais. Rápido, seguro e sem necessidade de registo.',
    hi: 'पीडीएफ प्रोसेसिंग, इमेज एडिटिंग, क्यूआर कोड जनरेशन और बहुत कुछ के लिए मुफ्त टूल। तेज़, सुरक्षित और किसी पंजीकरण की आवश्यकता नहीं है।',
    id: 'Alat gratis untuk pemrosesan PDF, pengeditan gambar, pembuatan Kode QR, dan banyak lagi. Cepat, aman, dan tanpa registrasi.',
    de: 'Kostenlose Tools für die PDF-Verarbeitung, Bildbearbeitung, QR-Code-Erstellung und mehr. Schnell, sicher und ohne Registrierung.',
    tr: 'PDF işleme, resim düzenleme, QR Kodu oluşturma ve daha fazlası için ücretsiz araçlar. Hızlı, güvenli ve kayıt gerektirmez.',
    ru: 'Бесплатные инструменты для работы с PDF, редактирования изображений, генерации QR-кодов и многого другого. Быстро, безопасно и без регистрации.',
  };

  return {
    title: {
      default: titles[locale] || titles.en,
      template: `%s | QuickToolsWeb`,
    },
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL('https://quicktoolsweb.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
        zh: '/zh',
        fr: '/fr',
        es: '/es',
        pt: '/pt',
        hi: '/hi',
        id: '/id',
        de: '/de',
        tr: '/tr',
        ru: '/ru',
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      siteName: 'QuickToolsWeb',
      locale: isAr ? 'ar_SA' : locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`h-full ${inter.variable} ${arabic.variable} ${chinese.variable} ${devanagari.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
