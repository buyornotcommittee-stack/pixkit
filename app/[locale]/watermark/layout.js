import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'watermark' });
  return getToolMeta({ locale, slug: 'watermark', title: t('title'), description: t('description'), keywords: locale === 'ko' ? '워터마크 추가, 이미지 워터마크, 사진 워터마크, 텍스트 워터마크' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="watermark" title="Watermark" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
