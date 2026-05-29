export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/*/api/'],
    },
    sitemap: 'https://pixkit.app/sitemap.xml',
  };
}
