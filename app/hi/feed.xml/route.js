import { getPostsByLocale } from '../../[locale]/blog/posts';

export async function GET() {
  const baseUrl = 'https://pixkit.app';
  const posts = getPostsByLocale('hi');

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/hi/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/hi/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pixkit Blog</title>
    <link>${baseUrl}/hi/blog</link>
    <description>इमेज ऑप्टिमाइज़ेशन टिप्स और मुफ्त टूल गाइड</description>
    <language>hi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/hi/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
