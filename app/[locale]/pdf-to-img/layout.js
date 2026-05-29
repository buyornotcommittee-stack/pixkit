import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pdfToImg' });
  return getToolMeta({ locale, slug: 'pdf-to-img', title: t('title'), description: t('description'), keywords: locale === 'ko' ? 'PDF 이미지 변환, PDF JPG 변환, PDF 사진 추출, PDF to image' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="pdf-to-img" title="PDF to Image" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
