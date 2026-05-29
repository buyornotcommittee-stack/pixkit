import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rotate' });
  return getToolMeta({ locale, slug: 'rotate', title: t('title'), description: t('description'), keywords: locale === 'ko' ? '이미지 회전, 사진 뒤집기, 이미지 반전, 좌우반전, 상하반전' : locale === 'es' ? 'voltear imagen, rotar imagen, girar foto, voltear foto gratis' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="rotate" title="Rotate & Flip" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
