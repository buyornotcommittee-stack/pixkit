import { getBreadcrumbJsonLd } from '../lib/seo';

export default function BreadcrumbJsonLd({ locale, slug, title }) {
  const jsonLd = getBreadcrumbJsonLd({ locale, slug, title });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
