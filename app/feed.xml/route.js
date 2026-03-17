import { getPostsByLocale } from '../[locale]/blog/posts';

const locales = ['ko', 'en', 'ja', 'zh', 'fr', 'es'];

const meta = {
  ko: { title: 'Pixkit 블로그', desc: '이미지 최적화 팁과 무료 도구 가이드' },
  en: { title: 'Pixkit Blog', desc: 'Image optimization tips and free tool guides' },
  ja: { title: 'Pixkit ブログ', desc: '画像最適化のヒントと無料ツールガイド' },
  zh: { title: 'Pixkit 博客', desc: '图片优化技巧和免费工具指南' },
  fr: { title: 'Pixkit Blog', desc: "Conseils d'optimisation d'images et guides d'outils gratuits" },
  es: { title: 'Pixkit Blog', desc: 'Consejos de optimización de imágenes y guías de herramientas gratuitas' },
};

function buildFeed(locale) {
  const baseUrl = 'https://pixkit.app';
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const posts = getPostsByLocale(locale);
  const m = meta[locale];

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}${prefix}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}${prefix}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${m.title}</title>
    <link>${baseUrl}${prefix}/blog</link>
    <description>${m.desc}</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}${prefix}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export async function GET() {
  // Default feed: all languages combined
  const baseUrl = 'https://pixkit.app';
  const allItems = locales
    .flatMap((locale) => {
      const prefix = locale === 'ko' ? '' : `/${locale}`;
      const posts = getPostsByLocale(locale);
      return posts.map(
        (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}${prefix}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}${prefix}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`
      );
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pixkit Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Image optimization tips and free tool guides</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${allItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
