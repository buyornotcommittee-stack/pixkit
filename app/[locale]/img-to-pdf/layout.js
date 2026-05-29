import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'imgToPdf' });
  return getToolMeta({ locale, slug: 'img-to-pdf', title: t('title'), description: t('description'), keywords: locale === 'ko' ? '이미지 PDF 변환, JPG PDF, 사진 PDF 만들기, 이미지 PDF 합치기' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="img-to-pdf" title="Image to PDF" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
