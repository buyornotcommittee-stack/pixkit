import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'removeExif' });
  return getToolMeta({ locale, slug: 'remove-exif', title: t('title'), description: t('description'), keywords: locale === 'ko' ? 'EXIF 제거, 사진 위치정보 삭제, 개인정보 삭제, EXIF 데이터 삭제' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="remove-exif" title="Remove EXIF" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
