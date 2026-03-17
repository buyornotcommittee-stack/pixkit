'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../i18n/navigation';
import { getPostsByLocale } from './posts';

const uiText = {
  ko: { title: '블로그', desc: '이미지 편집과 최적화에 관한 실용적인 가이드', read: '읽기' },
  en: { title: 'Blog', desc: 'Practical guides on image editing and optimization', read: 'read' },
  ja: { title: 'ブログ', desc: '画像編集と最適化に関する実用的なガイド', read: '読む' },
  zh: { title: '博客', desc: '关于图片编辑和优化的实用指南', read: '阅读' },
  fr: { title: 'Blog', desc: 'Guides pratiques sur l\'édition et l\'optimisation d\'images', read: 'lecture' },
  es: { title: 'Blog', desc: 'Guías prácticas sobre edición y optimización de imágenes', read: 'lectura' },
};

export default function BlogPage() {
  const locale = useLocale();
  const posts = getPostsByLocale(locale);
  const ui = uiText[locale] || uiText.ko;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold font-heading mb-2">{ui.title}</h1>
      <p className="text-text-secondary text-sm mb-8">{ui.desc}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-glow rounded-xl p-6 hover:border-gold/30 transition-all group"
          >
            <div className="flex gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gold-dim text-gold">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-heading font-semibold text-text-primary group-hover:text-gold transition-colors mb-2 leading-snug">
              {post.title}
            </h2>
            <p className="text-text-muted text-sm mb-3 line-clamp-2">{post.summary}</p>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>{post.date}</span>
              {post.readTime && <span>{post.readTime} {ui.read}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
