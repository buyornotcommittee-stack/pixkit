import { getLocale } from 'next-intl/server';
import { getPostsByLocale } from './posts';
import BlogSearch from '../../../components/BlogSearch';
import KakaoAd from '../../../components/KakaoAd';

const uiText = {
  ko: { title: '블로그', desc: '이미지 편집과 최적화에 관한 실용적인 가이드', read: '읽기', placeholder: '블로그 검색...', noResults: '검색 결과가 없습니다', searchLabel: '블로그 검색' },
  en: { title: 'Blog', desc: 'Practical guides on image editing and optimization', read: 'read', placeholder: 'Search posts...', noResults: 'No results found', searchLabel: 'Search blog' },
  ja: { title: 'ブログ', desc: '画像編集と最適化に関する実用的なガイド', read: '読む', placeholder: '記事を検索...', noResults: '検索結果がありません', searchLabel: 'ブログ検索' },
  zh: { title: '博客', desc: '关于图片编辑和优化的实用指南', read: '阅读', placeholder: '搜索文章...', noResults: '没有搜索结果', searchLabel: '博客搜索' },
  fr: { title: 'Blog', desc: 'Guides pratiques sur l\'édition et l\'optimisation d\'images', read: 'lecture', placeholder: 'Rechercher des articles...', noResults: 'Aucun résultat trouvé', searchLabel: 'Rechercher dans le blog' },
  es: { title: 'Blog', desc: 'Guías prácticas sobre edición y optimización de imágenes', read: 'lectura', placeholder: 'Buscar publicaciones...', noResults: 'No se encontraron resultados', searchLabel: 'Buscar en el blog' },
  hi: { title: 'ब्लॉग', desc: 'इमेज एडिटिंग और ऑप्टिमाइज़ेशन पर व्यावहारिक गाइड', read: 'पढ़ें', placeholder: 'पोस्ट खोजें...', noResults: 'कोई परिणाम नहीं मिला', searchLabel: 'ब्लॉग खोजें' },
};

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = getPostsByLocale(locale);
  const ui = uiText[locale] || uiText.ko;

  // content 필드 제외하고 클라이언트로 전달 (페이로드 최소화)
  const postCards = posts.map(({ slug, title, summary, tags, date, readTime }) => ({
    slug, title, summary, tags, date, readTime,
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold font-heading mb-2">{ui.title}</h1>
      <p className="text-text-secondary text-sm mb-6">{ui.desc}</p>
      <BlogSearch posts={postCards} ui={ui} />
      <KakaoAd />
    </div>
  );
}
