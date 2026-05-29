'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, Link } from '../i18n/navigation';
import { useTheme } from './ThemeProvider';
import Header from './Header';

function makeIcon(d) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function Sidebar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const rawPath = pathname;

  const tools = [
    { href: '/resize', labelKey: 'sidebar.resize', subKey: 'sidebar.resizeSub', icon: 'M15 3l6 0 0 6M9 21l-6 0 0-6M21 3l-7 7M3 21l7-7' },
    { href: '/batch', labelKey: 'sidebar.batch', subKey: 'sidebar.batchSub', icon: 'M2 7h16v14H2zM6 3h16v14H6z' },
    { href: '/img-to-pdf', labelKey: 'sidebar.imgToPdf', subKey: 'sidebar.imgToPdfSub', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15h6' },
    { href: '/pdf-to-img', labelKey: 'sidebar.pdfToImg', subKey: 'sidebar.pdfToImgSub', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 12h8v6H8z' },
    { href: '/crop', labelKey: 'sidebar.crop', subKey: 'sidebar.cropSub', icon: 'M6 2v14a2 2 0 0 0 2 2h14M18 22V8a2 2 0 0 0-2-2H2' },
    { href: '/rotate', labelKey: 'sidebar.rotate', subKey: 'sidebar.rotateSub', icon: 'M1 4v6h6M3.51 15a9 9 0 1 0 2.13-9.36L1 10' },
    { href: '/convert', labelKey: 'sidebar.convert', subKey: 'sidebar.convertSub', icon: 'M16 3l5 0 0 5M4 20l17-17M21 16l0 5-5 0M15 15l6 6M4 4l5 5' },
    { href: '/watermark', labelKey: 'sidebar.watermark', subKey: 'sidebar.watermarkSub', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { href: '/merge', labelKey: 'sidebar.merge', subKey: 'sidebar.mergeSub', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { href: '/remove-exif', labelKey: 'sidebar.removeExif', subKey: 'sidebar.removeExifSub', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4' },
    { href: '/qr-code', labelKey: 'sidebar.qrCode', subKey: 'sidebar.qrCodeSub', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM17 14h4v3h-4zM14 17h3v4h-3zM17 20h4v1h-4z' },
    { href: '/remove-bg', labelKey: 'sidebar.removeBg', subKey: 'sidebar.removeBgSub', icon: 'M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9M3 10l2.96-5.17A2 2 0 0 1 7.69 3.5h8.62a2 2 0 0 1 1.73 1.33L21 10M3 10h18M12 16l-3-3h2v-3h2v3h2l-3 3' },
    { href: '/upscale', labelKey: 'sidebar.upscale', subKey: 'sidebar.upscaleSub', icon: 'M15 3l6 6-6 6M9 21l-6-6 6-6M21 9H3' },
  ];

  return (
    <>
      {/* Header bar */}
      <Header onMenuToggle={() => setOpen(true)} />

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-12 left-0 h-[calc(100%-48px)] w-[220px] bg-bg-sidebar z-50 flex flex-col border-r border-card-border transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button mobile */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 p-1 lg:hidden"
          aria-label={t('common.closeMenu')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-text-muted">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Tool menu */}
        <nav className="flex-1 px-3 pt-4 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-text-muted px-2 mb-2">{t('common.tools')}</p>
          {tools.map((tool, i) => {
            const active = rawPath === tool.href;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setOpen(false)}
                className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-md mb-0.5 transition-colors group ${
                  active
                    ? 'bg-gold-dim text-gold border-l-2 border-gold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className={active ? 'text-gold' : 'text-text-muted group-hover:text-text-secondary'}>
                  {makeIcon(tool.icon)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium leading-tight">{t(tool.labelKey)}</span>
                  <span className="text-[10px] text-text-muted leading-tight">{t(tool.subKey)}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-card-border">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-2 text-xs text-text-muted hover:text-text-secondary transition-colors mb-3 w-full"
            aria-label="테마 전환"
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            {theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
          </button>

          <div className="flex gap-3 text-[10px] text-text-muted">
            <Link href="/privacy" className="hover:text-text-secondary" onClick={() => setOpen(false)}>{t('common.privacy')}</Link>
            <Link href="/terms" className="hover:text-text-secondary" onClick={() => setOpen(false)}>{t('common.terms')}</Link>
          </div>

          {/* SNS links */}
          <div className="flex items-center gap-2 mt-3">
            <a
              href="https://instagram.com/pixkit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-gold transition-colors"
              aria-label="Pixkit Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          <p className="text-[10px] text-text-muted mt-3">&copy; 2026 Pixkit</p>
        </div>
      </aside>
    </>
  );
}
