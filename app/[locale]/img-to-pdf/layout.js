import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'imgToPdf' });
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const baseUrl = 'https://pixkit.app';
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${baseUrl}${prefix}/img-to-pdf` },
    openGraph: { title: t('title'), description: t('description'), url: `${baseUrl}${prefix}/img-to-pdf` },
  };
}

export default function Layout({ children }) {
  return children;
}
