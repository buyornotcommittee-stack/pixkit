import { getPostsByLocale } from '../../[locale]/blog/posts';

export async function GET() {
  const baseUrl = 'https://pixkit.app';
  const posts = getPostsByLocale('fr');

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/fr/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/fr/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pixkit Blog</title>
    <link>${baseUrl}/fr/blog</link>
    <description>Conseils d'optimisation d'images et guides d'outils gratuits</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/fr/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
