import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'batch' });
  return getToolMeta({ locale, slug: 'batch', title: t('title'), description: t('description'), keywords: locale === 'ko' ? '이미지 일괄 처리, 사진 일괄 변환, 배치 이미지, 여러장 리사이즈' : locale === 'es' ? 'redimensionar varias imágenes, batch imágenes, redimensionar en lote gratis' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="batch" title="Batch Resize" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
