import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'convert' });
  return getToolMeta({ locale, slug: 'convert', title: t('title'), description: t('description'), keywords: locale === 'ko' ? '이미지 형식 변환, JPG PNG 변환, HEIC JPG 변환, 무료 이미지 변환' : locale === 'es' ? 'convertir imagen, convertir JPG PNG WebP HEIC, convertir foto gratis' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="convert" title="Convert" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
