import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'watermark' });
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const baseUrl = 'https://pixkit.app';
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${baseUrl}${prefix}/watermark` },
    openGraph: { title: t('title'), description: t('description'), url: `${baseUrl}${prefix}/watermark` },
  };
}

export default function Layout({ children }) {
  return children;
}
