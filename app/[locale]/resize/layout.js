import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resize' });
  return getToolMeta({ locale, slug: 'resize', title: t('title'), description: t('description'), keywords: locale === 'ko' ? '이미지 리사이즈, 사진 크기 변경, 이미지 크기 줄이기, 무료 이미지 리사이즈' : locale === 'es' ? 'redimensionar imagen, cambiar tamaño imagen, redimensionar foto gratis' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="resize" title="Resize" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
