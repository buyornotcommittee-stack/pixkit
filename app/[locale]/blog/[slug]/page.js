'use client';
import { use } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '../../../../i18n/navigation';
import Image from 'next/image';
import { getPostsByLocale } from '../posts';

const localeFlags = [
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

const uiText = {
  ko: { toc: '목차', read: '읽기', back: '← 블로그 목록으로' },
  en: { toc: 'Table of Contents', read: 'read', back: '← Back to Blog' },
  ja: { toc: '目次', read: '読む', back: '← ブログ一覧へ' },
  zh: { toc: '目录', read: '阅读', back: '← 返回博客列表' },
  fr: { toc: 'Sommaire', read: 'lecture', back: '← Retour au blog' },
  es: { toc: 'Índice', read: 'lectura', back: '← Volver al blog' },
};

function parseContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push({ type: 'h2', text: line.slice(3), id: line.slice(3).replace(/\s+/g, '-').toLowerCase() });
    } else if (line.startsWith('### ')) {
      elements.push({ type: 'h3', text: line.slice(4) });
    } else if (line.startsWith('- **')) {
      elements.push({ type: 'li-bold', text: line.slice(2) });
    } else if (line.startsWith('- ')) {
      elements.push({ type: 'li', text: line.slice(2) });
    } else if (line.startsWith('| ')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      i--;
      elements.push({ type: 'table', lines: tableLines });
    } else if (line.trim() && !line.startsWith('|')) {
      elements.push({ type: 'p', text: line });
    }
    i++;
  }
  return elements;
}

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-text-primary font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="text-gold bg-gold-dim px-1.5 py-0.5 rounded text-xs">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function BlogImage({ src, alt, caption }) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt}
          title={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      <figcaption className="text-sm text-text-muted italic mt-2 text-center">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function BlogPostPage({ params }) {
  const { slug } = use(params);
  const locale = useLocale();
  const posts = getPostsByLocale(locale);
  const ui = uiText[locale] || uiText.ko;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-text-muted">Post not found</p>
        <Link href="/blog" className="text-sm text-gold mt-4 inline-block">
          {ui.back}
        </Link>
      </div>
    );
  }

  const elements = parseContent(post.content);
  const toc = elements.filter((el) => el.type === 'h2');

  let h2Count = 0;
  const img1After = [];
  const img2After = [];
  elements.forEach((el, i) => {
    if (el.type === 'h2') {
      h2Count++;
      if (h2Count === 2) img1After.push(i);
      if (h2Count === 4) img2After.push(i);
    }
  });
  const img1Index = img1After[0] ?? -1;
  const img2Index = img2After[0] ?? -1;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Language Toggle */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {localeFlags.map((l) => {
          const isActive = l.code === locale;
          const prefix = l.code === 'ko' ? '' : `/${l.code}`;
          return (
            <a
              key={l.code}
              href={`${prefix}/blog/${slug}`}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                isActive
                  ? 'bg-gold text-bg-primary font-semibold'
                  : 'bg-card-bg text-text-muted hover:text-gold border border-card-border'
              }`}
            >
              {l.flag} {l.label}
            </a>
          );
        })}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex gap-2 mb-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gold-dim text-gold">{tag}</span>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading leading-snug mb-3">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span>{post.date}</span>
          {post.readTime && <span>{post.readTime} {ui.read}</span>}
        </div>
      </div>

      {/* TOC */}
      {toc.length > 0 && (
        <nav className="card-glow rounded-xl p-5 mb-8">
          <p className="text-xs text-text-muted mb-3 uppercase tracking-wider">{ui.toc}</p>
          <ul className="space-y-1.5">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-sm text-text-secondary hover:text-gold transition-colors">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Content */}
      <article className="space-y-4">
        {elements.map((el, i) => {
          const rendered = [];

          if (el.type === 'h2') {
            rendered.push(<h2 key={i} id={el.id} className="text-xl font-bold font-heading mt-10 mb-3 text-text-primary">{el.text}</h2>);
          } else if (el.type === 'h3') {
            rendered.push(<h3 key={i} className="text-lg font-semibold font-heading mt-6 mb-2 text-text-primary">{el.text}</h3>);
          } else if (el.type === 'p') {
            rendered.push(<p key={i} className="text-text-secondary text-sm leading-relaxed">{renderText(el.text)}</p>);
          } else if (el.type === 'li' || el.type === 'li-bold') {
            rendered.push(
              <div key={i} className="flex items-start gap-2 text-sm text-text-secondary ml-4">
                <span className="text-gold mt-1.5 flex-shrink-0">
                  <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg>
                </span>
                <span>{renderText(el.text)}</span>
              </div>
            );
          } else if (el.type === 'table') {
            const rows = el.lines.filter((l) => !l.includes('---')).map((l) =>
              l.split('|').filter((c) => c.trim()).map((c) => c.trim())
            );
            if (rows.length >= 2) {
              const header = rows[0];
              const body = rows.slice(1);
              rendered.push(
                <div key={i} className="overflow-x-auto my-4">
                  <table className="w-full text-sm border border-card-border rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-card-bg">
                        {header.map((cell, j) => (
                          <th key={j} className="text-left p-3 text-text-muted font-medium border-b border-card-border">{cell}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {body.map((row, j) => (
                        <tr key={j} className="border-b border-card-border">
                          {row.map((cell, k) => (
                            <td key={k} className="p-3 text-text-secondary">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
          }

          if (i === img1Index && post.images?.[0]) {
            rendered.push(
              <BlogImage key="img1" src={post.images[0].src} alt={post.images[0].alt} caption={post.images[0].caption} />
            );
          }
          if (i === img2Index && post.images?.[1]) {
            rendered.push(
              <BlogImage key="img2" src={post.images[1].src} alt={post.images[1].alt} caption={post.images[1].caption} />
            );
          }

          return rendered;
        })}
      </article>

      {/* CTA */}
      <div className="card-glow rounded-xl p-8 text-center mt-12 mb-8">
        <Link href={post.cta.href} className="btn-gold inline-block">
          {post.cta.label}
        </Link>
      </div>

      {/* Back to blog */}
      <div className="text-center mb-8">
        <Link href="/blog" className="text-sm text-text-muted hover:text-gold transition-colors">
          {ui.back}
        </Link>
      </div>
    </div>
  );
}
