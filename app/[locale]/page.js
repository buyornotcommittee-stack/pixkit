'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../i18n/navigation';

const tools = [
  { href: '/resize', titleKey: 'toolCards.resize', descKey: 'toolCards.resizeDesc', icon: 'M15 3l6 0 0 6M9 21l-6 0 0-6M21 3l-7 7M3 21l7-7' },
  { href: '/batch', titleKey: 'toolCards.batch', descKey: 'toolCards.batchDesc', icon: 'M2 7h16v14H2zM6 3h16v14H6z' },
  { href: '/img-to-pdf', titleKey: 'toolCards.imgToPdf', descKey: 'toolCards.imgToPdfDesc', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15h6' },
  { href: '/pdf-to-img', titleKey: 'toolCards.pdfToImg', descKey: 'toolCards.pdfToImgDesc', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 12h8v6H8z' },
  { href: '/crop', titleKey: 'toolCards.crop', descKey: 'toolCards.cropDesc', icon: 'M6 2v14a2 2 0 0 0 2 2h14M18 22V8a2 2 0 0 0-2-2H2' },
  { href: '/rotate', titleKey: 'toolCards.rotate', descKey: 'toolCards.rotateDesc', icon: 'M1 4v6h6M3.51 15a9 9 0 1 0 2.13-9.36L1 10' },
  { href: '/convert', titleKey: 'toolCards.convert', descKey: 'toolCards.convertDesc', icon: 'M16 3l5 0 0 5M4 20l17-17M21 16l0 5-5 0M15 15l6 6M4 4l5 5' },
  { href: '/watermark', titleKey: 'toolCards.watermark', descKey: 'toolCards.watermarkDesc', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { href: '/merge', titleKey: 'toolCards.merge', descKey: 'toolCards.mergeDesc', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { href: '/remove-exif', titleKey: 'toolCards.removeExif', descKey: 'toolCards.removeExifDesc', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4' },
  { href: '/qr-code', titleKey: 'toolCards.qrCode', descKey: 'toolCards.qrCodeDesc', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM17 14h4v3h-4zM14 17h3v4h-3zM17 20h4v1h-4z' },
];

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === 'ko' ? '' : `/${locale}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Pixkit',
    url: `https://pixkit.app${prefix || '/'}`,
    description: t('landing.heroDesc'),
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: locale,
  };

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero */}
      <section className="text-center py-16 lg:py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4 leading-tight">
          {t('landing.heroTitle')}<br />
          <span className="text-gold">{t('landing.heroHighlight')}</span>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-8 whitespace-pre-line">
          {t('landing.heroDesc')}
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/resize" className="btn-gold inline-block">
            {t('landing.start')}
          </Link>
          <Link href="/about" className="btn-outline inline-block">
            {t('landing.learnMore')}
          </Link>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="card-glow rounded-xl p-6 hover:border-gold/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-gold-dim flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <path d={tool.icon} />
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-text-primary mb-1">{t(tool.titleKey)}</h3>
            <p className="text-text-muted text-sm">{t(tool.descKey)}</p>
          </Link>
        ))}
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {[
          { titleKey: 'landing.free', descKey: 'landing.freeDesc' },
          { titleKey: 'landing.privacyTitle', descKey: 'landing.privacyDesc' },
          { titleKey: 'landing.noInstall', descKey: 'landing.noInstallDesc' },
        ].map((f) => (
          <div key={f.titleKey} className="text-center px-4 py-8">
            <h3 className="font-heading font-semibold text-gold mb-2">{t(f.titleKey)}</h3>
            <p className="text-text-secondary text-sm">{t(f.descKey)}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="card-glow rounded-xl p-8 sm:p-12 text-center mb-12">
        <h2 className="text-xl sm:text-2xl font-bold font-heading mb-3">{t('landing.ctaTitle')}</h2>
        <p className="text-text-secondary mb-6">{t('landing.ctaDesc')}</p>
        <Link href="/resize" className="btn-gold inline-block">
          {t('landing.ctaBtn')}
        </Link>
      </section>
    </div>
  );
}
