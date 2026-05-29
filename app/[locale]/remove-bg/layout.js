import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'removeBg' });
  return getToolMeta({ locale, slug: 'remove-bg', title: t('title'), description: t('description'), keywords: locale === 'ko' ? '배경 제거, 누끼 따기, 무료 누끼, AI 배경 제거, 이미지 배경 삭제' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="remove-bg" title="Remove Background" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
