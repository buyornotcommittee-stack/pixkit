import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';
import '../globals.css';
import Sidebar from '../../components/Sidebar';
import ThemeProvider from '../../components/ThemeProvider';

const localeNames = { ko: '한국어', en: 'English', ja: '日本語', zh: '中文', fr: 'Français', es: 'Español' };
const localeHtml = { ko: 'ko', en: 'en', ja: 'ja', zh: 'zh', fr: 'fr', es: 'es' };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const ogLocale = { ko: 'ko_KR', en: 'en_US', ja: 'ja_JP', zh: 'zh_CN', fr: 'fr_FR', es: 'es_ES' };

  const titles = {
    ko: 'Pixkit — 무료 온라인 이미지 편집 도구',
    en: 'Pixkit — Free Online Image Editor',
    ja: 'Pixkit — 無料オンライン画像編集ツール',
    zh: 'Pixkit — 免费在线图片编辑工具',
    fr: 'Pixkit — Éditeur d\'images en ligne gratuit',
    es: 'Pixkit — Editor de imágenes en línea gratuito',
  };
  const descriptions = {
    ko: '브라우저에서 바로 사용하는 무료 이미지 리사이즈, 크롭, 변환, PDF 변환 도구. 설치 없이, 업로드 없이, 빠르고 안전하게.',
    en: 'Free image resize, crop, convert and PDF tools. Works in your browser — no upload, no installation.',
    ja: 'ブラウザで直接使える無料画像リサイズ、クロップ、変換、PDF変換ツール。インストール不要。',
    zh: '浏览器中直接使用的免费图片调整大小、裁剪、转换和PDF工具。无需安装。',
    fr: 'Outils gratuits de redimensionnement, recadrage, conversion d\'images et PDF. Directement dans votre navigateur.',
    es: 'Herramientas gratuitas para redimensionar, recortar, convertir imágenes y PDF. Directo en tu navegador.',
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
      'x-default': baseUrl,
    },
  };

  return {
    title: { default: titles[locale] || titles.ko, template: `%s | Pixkit` },
    description: descriptions[locale] || descriptions.ko,
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
      google: '나중에입력',
      other: {
        'naver-site-verification': '867fe7bbc94032949164bbfce71c412a5ff2d764',
        'msvalidate.01': '나중에입력',
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
    <html lang={localeHtml[locale] || 'ko'} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="Pixkit Blog" href="/feed.xml" />
        <meta name="google-adsense-account" content="ca-pub-1862816623457447" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1862816623457447" crossOrigin="anonymous" />
      </head>
      <body className="dot-grid min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Sidebar />
            <main className="lg:ml-[220px] px-4 sm:px-6 lg:px-10 py-8 pt-16 lg:pt-8 min-h-screen">
              {children}
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-5ZNG5H76MV" />
      </body>
    </html>
  );
}
