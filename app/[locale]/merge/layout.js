import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'merge' });
  return getToolMeta({ locale, slug: 'merge', title: t('title'), description: t('description'), keywords: locale === 'ko' ? '이미지 합치기, 사진 합치기, 이미지 붙이기, 콜라주 만들기' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="merge" title="Merge Images" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
