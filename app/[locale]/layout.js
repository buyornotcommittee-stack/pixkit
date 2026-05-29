import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';
import { Sora, DM_Mono } from 'next/font/google';
import '../globals.css';
import Sidebar from '../../components/Sidebar';
import ThemeProvider from '../../components/ThemeProvider';
import CookieConsent from '../../components/CookieConsent';
import AdSenseScript from '../../components/AdSenseScript';
import Footer from '../../components/Footer';
import EzoicPageRefresh from '../../components/EzoicPageRefresh';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sora',
  preload: true,
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-dm-mono',
  preload: false,
});

const localeNames = { ko: '한국어', en: 'English', ja: '日本語', zh: '中文', fr: 'Français', es: 'Español', hi: 'हिन्दी' };
const localeHtml = { ko: 'ko', en: 'en', ja: 'ja', zh: 'zh', fr: 'fr', es: 'es', hi: 'hi' };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const ogLocale = { ko: 'ko_KR', en: 'en_US', ja: 'ja_JP', zh: 'zh_CN', fr: 'fr_FR', es: 'es_ES', hi: 'hi_IN' };

  const titles = {
    ko: 'Pixkit — 무료 온라인 이미지 편집기 (설치 없음, 회원가입 없음)',
    en: 'Pixkit — Free Online Image Editor | Resize, Convert, Remove Background',
    ja: 'Pixkit — 無料オンライン画像編集ツール | インストール不要',
    zh: 'Pixkit — 免费在线图片编辑工具',
    fr: 'Pixkit — Éditeur d\'images en ligne gratuit',
    es: 'Pixkit — Editor de Imágenes Online Gratis | Sin Registro',
    hi: 'Pixkit — मुफ्त ऑनलाइन इमेज एडिटर | रिसाइज़, कन्वर्ट, बैकग्राउंड हटाएं',
  };
  const descriptions = {
    ko: '이미지 리사이즈·누끼·PDF변환·HEIC변환까지. 파일은 서버에 안 올라가요. 3초면 끝. 완전 무료.',
    en: 'Free image tools that run in your browser. Resize, convert, crop, remove backgrounds, merge images and more. No uploads, no signup, always free.',
    ja: 'オンライン画像編集ツールが無料で使えます。リサイズ、クロップ、形式変換、背景除去まで。ブラウザで完結、インストール不要、サーバー送信なし。',
    zh: '浏览器中直接使用的免费图片调整大小、裁剪、转换和PDF工具。无需安装。',
    fr: 'Outils gratuits de redimensionnement, recadrage, conversion d\'images et PDF. Directement dans votre navigateur.',
    es: 'Herramientas de imagen gratuitas que funcionan en tu navegador. Redimensiona, convierte, elimina fondos y más. Sin subir archivos.',
    hi: 'ब्राउज़र में मुफ्त इमेज टूल्स। रिसाइज़, क्रॉप, कन्वर्ट, बैकग्राउंड हटाएं और भी बहुत कुछ। कोई अपलोड नहीं, कोई साइनअप नहीं।',
  };

  const baseUrl = 'https://pixkit.app';
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix || '/'}`;

  const alternates = {
    canonical: canonicalUrl,
    languages: {
      'ko': baseUrl,
      'en': `${baseUrl}/en`,
      'ja': `${baseUrl}/ja`,
      'zh': `${baseUrl}/zh`,
      'fr': `${baseUrl}/fr`,
      'es': `${baseUrl}/es`,
      'hi': `${baseUrl}/hi`,
      'x-default': baseUrl,
    },
  };

  const keywords = locale === 'ko'
    ? '무료 이미지 편집기, 무료 이미지 편집 도구, 온라인 이미지 편집, 이미지 리사이즈, 사진 편집 무료'
    : locale === 'en'
    ? 'free image editor, online image editor, resize image, convert image, remove background, image tools'
    : undefined;

  return {
    title: { default: titles[locale] || titles.ko, template: `%s | Pixkit` },
    description: descriptions[locale] || descriptions.ko,
    ...(keywords ? { keywords } : {}),
    metadataBase: new URL(baseUrl),
    alternates,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      siteName: 'Pixkit',
      locale: ogLocale[locale] || 'ko_KR',
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
    },
    verification: {
      other: {
        'naver-site-verification': '867fe7bbc94032949164bbfce71c412a5ff2d764',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={localeHtml[locale] || 'ko'} className={`${sora.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Ezoic Incubator — Privacy Scripts (must load first) */}
        <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"></script>
        <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"></script>
        {/* Ezoic Incubator — Header Scripts */}
        <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
        <script dangerouslySetInnerHTML={{ __html: 'window.ezstandalone = window.ezstandalone || {}; ezstandalone.cmd = ezstandalone.cmd || [];' }} />
        <script src="//ezoicanalytics.com/analytics.js"></script>
        {/* Existing */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="alternate" type="application/rss+xml" title="Pixkit Blog" href="/feed.xml" />
        <meta name="google-adsense-account" content="ca-pub-1862816623457447" />
      </head>
      <body className="dot-grid min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <EzoicPageRefresh />
            <Sidebar />
            <main className="lg:ml-[220px] px-4 sm:px-6 lg:px-10 py-8 pt-16 mt-12 min-h-screen">
              {children}
            </main>
            <Footer />
            <CookieConsent />
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-5ZNG5H76MV" />
        <AdSenseScript />
      </body>
    </html>
  );
}
