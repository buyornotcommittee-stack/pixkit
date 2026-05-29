const baseUrl = 'https://pixkit.app';
const locales = ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'hi'];

export function getToolMeta({ locale, slug, title, description, keywords }) {
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const canonical = `${baseUrl}${prefix}/${slug}`;

  const languages = {};
  locales.forEach((l) => {
    const p = l === 'ko' ? '' : `/${l}`;
    languages[l] = `${baseUrl}${p}/${slug}`;
  });
  languages['x-default'] = `${baseUrl}/${slug}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Pixkit',
      type: 'website',
    },
  };
}

export function getBreadcrumbJsonLd({ locale, slug, title }) {
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const homeNames = { ko: '홈', en: 'Home', ja: 'ホーム', zh: '首页', fr: 'Accueil', es: 'Inicio', hi: 'होम' };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeNames[locale] || 'Home', item: `${baseUrl}${prefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: title, item: `${baseUrl}${prefix}/${slug}` },
    ],
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pixkit',
    url: 'https://pixkit.app',
    logo: 'https://pixkit.app/android-chrome-512x512.png',
    email: 'pixkit.app@gmail.com',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'pixkit.app@gmail.com',
      contactType: 'customer support',
      availableLanguage: ['Korean', 'English', 'Japanese', 'Chinese', 'French', 'Spanish', 'Hindi'],
    },
  };
}
