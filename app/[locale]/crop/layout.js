import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'crop' });
  return getToolMeta({ locale, slug: 'crop', title: t('title'), description: t('description'), keywords: locale === 'ko' ? '이미지 자르기, 사진 자르기, 이미지 크롭, 무료 크롭' : locale === 'es' ? 'recortar imagen, crop foto, recortar foto gratis, cortar imagen online' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="crop" title="Crop" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
