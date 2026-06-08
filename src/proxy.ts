import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const ARABIC_COUNTRIES = [
  'SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'YE', 'JO', 'LB', 'SY',
  'IQ', 'PS', 'EG', 'SD', 'LY', 'TN', 'DZ', 'MA', 'MR', 'SO', 'DJ', 'KM',
];
const CHINESE_COUNTRIES = ['CN', 'HK', 'MO', 'TW'];
const SPANISH_COUNTRIES = ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'UY', 'PA', 'GQ'];
const PORTUGUESE_COUNTRIES = ['PT', 'BR', 'AO', 'MZ', 'GW', 'TL', 'CV', 'ST', 'GQ'];
const FRENCH_COUNTRIES = ['FR', 'CA', 'BE', 'CH', 'LU', 'MC', 'SN', 'CG', 'CD', 'CI', 'MG', 'CM', 'ML', 'NE', 'BF', 'TG', 'BJ', 'GA', 'DJ', 'GQ', 'KM', 'HT', 'VU', 'SC', 'RW', 'BI', 'TD', 'CF'];
const GERMAN_COUNTRIES = ['DE', 'AT', 'CH', 'LI', 'LU'];
const RUSSIAN_COUNTRIES = ['RU', 'BY', 'KZ', 'KG', 'UA', 'UZ', 'TJ', 'TM', 'MD'];

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the path already has a locale
  const hasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!hasLocale) {
    // Check for saved locale cookie
    const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (savedLocale && routing.locales.includes(savedLocale as typeof routing.locales[number])) {
      const url = request.nextUrl.clone();
      url.pathname = `/${savedLocale}${pathname}`;
      return NextResponse.redirect(url);
    }

    // Detect locale from country header (Vercel/Cloudflare)
    const country = (
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      ''
    ).toUpperCase();

    let detectedLocale = 'en';

    if (ARABIC_COUNTRIES.includes(country)) {
      detectedLocale = 'ar';
    } else if (CHINESE_COUNTRIES.includes(country)) {
      detectedLocale = 'zh';
    } else if (SPANISH_COUNTRIES.includes(country)) {
      detectedLocale = 'es';
    } else if (PORTUGUESE_COUNTRIES.includes(country)) {
      detectedLocale = 'pt';
    } else if (FRENCH_COUNTRIES.includes(country)) {
      detectedLocale = 'fr';
    } else if (GERMAN_COUNTRIES.includes(country)) {
      detectedLocale = 'de';
    } else if (RUSSIAN_COUNTRIES.includes(country)) {
      detectedLocale = 'ru';
    } else if (country === 'IN') {
      detectedLocale = 'hi';
    } else if (country === 'ID') {
      detectedLocale = 'id';
    } else if (country === 'TR') {
      detectedLocale = 'tr';
    } else {
      // Fallback: Check Accept-Language header dynamically for any of the 11 supported locales
      const acceptLang = request.headers.get('accept-language') || '';
      const matchedLocale = routing.locales.find(locale => 
        new RegExp(`^${locale}`, 'i').test(acceptLang) ||
        new RegExp(`,\\s*${locale}`, 'i').test(acceptLang)
      );
      if (matchedLocale) {
        detectedLocale = matchedLocale;
      }
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    });
    return response;
  }

  // Use next-intl middleware for locale-prefixed paths
  const response = intlMiddleware(request);

  // Extract current locale and set cookie
  const currentLocale = pathname.split('/')[1];
  if (currentLocale && routing.locales.includes(currentLocale as typeof routing.locales[number])) {
    response.cookies.set('NEXT_LOCALE', currentLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
