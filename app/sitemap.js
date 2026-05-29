import { getPostsByLocale } from './[locale]/blog/posts';

const locales = ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'hi'];

export default function sitemap() {
  const baseUrl = 'https://pixkit.app';

  const tools = ['resize', 'batch', 'img-to-pdf', 'pdf-to-img', 'crop', 'rotate', 'convert', 'watermark', 'merge', 'remove-exif', 'qr-code', 'remove-bg', 'upscale'];

  const staticPages = locales.flatMap((locale) => {
    const prefix = locale === 'ko' ? '' : `/${locale}`;

    const home = {
      url: `${baseUrl}${prefix || '/'}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    };

    const toolPages = tools.map((tool) => ({
      url: `${baseUrl}${prefix}/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }));

    const blogList = {
      url: `${baseUrl}${prefix}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };

    const infoPages = ['about', 'contact', 'privacy', 'terms', 'disclaimer'].map((page) => ({
      url: `${baseUrl}${prefix}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

    return [home, ...toolPages, blogList, ...infoPages];
  });

  const blogPosts = locales.flatMap((locale) => {
    const prefix = locale === 'ko' ? '' : `/${locale}`;
    const posts = getPostsByLocale(locale);
    return posts.map((post) => ({
      url: `${baseUrl}${prefix}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  });

  return [...staticPages, ...blogPosts];
}
