import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'qrCode' });
  return getToolMeta({ locale, slug: 'qr-code', title: t('title'), description: t('description'), keywords: locale === 'ko' ? 'QR코드 만들기, QR코드 생성, 무료 QR코드, QR코드 생성기' : undefined });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="qr-code" title="QR Code" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
