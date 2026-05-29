const baseUrl = 'https://pixkit.app';
const locales = ['ko', 'en', 'ja', 'zh', 'fr', 'es'];

const titles = {
  ko: '블로그 — 이미지 편집 가이드',
  en: 'Blog — Image Editing Guides',
  ja: 'ブログ — 画像編集ガイド',
  zh: '博客 — 图片编辑指南',
  fr: 'Blog — Guides d\'édition d\'images',
  es: 'Blog — Guías de edición de imágenes',
};

const descs = {
  ko: '이미지 리사이즈, 형식 변환, EXIF 삭제, PDF 변환 등 실용적인 이미지 편집 가이드.',
  en: 'Practical guides on image resizing, format conversion, EXIF removal, PDF tools and more.',
  ja: '画像リサイズ、形式変換、EXIF削除、PDF変換など、実用的な画像編集ガイド。',
  zh: '图片调整大小、格式转换、EXIF删除、PDF工具等实用图片编辑指南。',
  fr: 'Guides pratiques sur le redimensionnement, la conversion, la suppression EXIF et les outils PDF.',
  es: 'Guías prácticas sobre redimensionamiento, conversión, eliminación de EXIF y herramientas PDF.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const canonical = `${baseUrl}${prefix}/blog`;

  const languages = {};
  locales.forEach((l) => {
    const p = l === 'ko' ? '' : `/${l}`;
    languages[l] = `${baseUrl}${p}/blog`;
  });
  languages['x-default'] = `${baseUrl}/blog`;

  return {
    title: titles[locale] || titles.ko,
    description: descs[locale] || descs.ko,
    alternates: { canonical, languages },
    openGraph: {
      title: titles[locale] || titles.ko,
      description: descs[locale] || descs.ko,
      url: canonical,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
