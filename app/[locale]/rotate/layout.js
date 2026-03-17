import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rotate' });
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const baseUrl = 'https://pixkit.app';
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${baseUrl}${prefix}/rotate` },
    openGraph: { title: t('title'), description: t('description'), url: `${baseUrl}${prefix}/rotate` },
  };
}

export default function Layout({ children }) {
  return children;
}
