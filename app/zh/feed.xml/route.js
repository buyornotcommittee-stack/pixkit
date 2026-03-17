import { getPostsByLocale } from '../../[locale]/blog/posts';

export async function GET() {
  const baseUrl = 'https://pixkit.app';
  const posts = getPostsByLocale('zh');

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/zh/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/zh/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pixkit 博客</title>
    <link>${baseUrl}/zh/blog</link>
    <description>图片优化技巧和免费工具指南</description>
    <language>zh</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/zh/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
