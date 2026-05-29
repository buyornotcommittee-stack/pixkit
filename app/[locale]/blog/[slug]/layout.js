import { getPostsByLocale } from '../posts';

const baseUrl = 'https://pixkit.app';
const locales = ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'hi'];

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const posts = getPostsByLocale(locale);
  const post = posts.find((p) => p.slug === slug);

  if (!post) return {};

  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const canonical = `${baseUrl}${prefix}/blog/${slug}`;

  const languages = {};
  locales.forEach((l) => {
    const p = l === 'ko' ? '' : `/${l}`;
    languages[l] = `${baseUrl}${p}/blog/${slug}`;
  });
  languages['x-default'] = `${baseUrl}/blog/${slug}`;

  const ogImages = post.images?.length
    ? post.images.map((img) => ({ url: img.src, alt: img.alt }))
    : undefined;

  return {
    title: post.title,
    description: post.summary,
    ...(post.keywords ? { keywords: post.keywords } : {}),
    alternates: { canonical, languages },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: canonical,
      type: 'article',
      publishedTime: post.date,
      siteName: 'Pixkit',
      ...(ogImages && { images: ogImages }),
    },
  };
}

export default function Layout({ children }) {
  return children;
}
