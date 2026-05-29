import { getTranslations } from 'next-intl/server';
import { getToolMeta } from '../../../lib/seo';
import BreadcrumbJsonLd from '../../../components/BreadcrumbJsonLd';
import EzoicAd from '../../../components/EzoicAd';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'upscale' });
  return getToolMeta({
    locale,
    slug: 'upscale',
    title: t('title'),
    description: t('description'),
    keywords:
      locale === 'ko'
        ? '이미지 업스케일링, 사진 화질 높이기, 이미지 확대 화질, AI 이미지 향상'
        : locale === 'ja'
        ? '画像アップスケーリング, 画質向上, AI画像拡大'
        : locale === 'zh'
        ? '图像超分辨率, AI图像放大, 提高图片质量'
        : undefined,
  });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug="upscale" title="AI Upscale" />
      {children}
      <EzoicAd placementId={103} />
    </>
  );
}
