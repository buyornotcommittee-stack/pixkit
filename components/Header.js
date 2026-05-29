'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../i18n/navigation';

const locales = [
  { code: 'ko', flag: '🇰🇷', name: '한국어' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'hi', flag: '🇮🇳', name: 'हिन्दी' },
];

export default function Header({ onMenuToggle }) {
  const t = useTranslations();
  const locale = useLocale();
  const [langOpen, setLangOpen] = useState(false);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const switchLocale = (newLocale) => {
    const currentPath = window.location.pathname;
    const localePattern = /^\/(ko|en|ja|zh|fr|es|hi)(\/|$)/;
    const strippedPath = currentPath.replace(localePattern, '/');
    const prefix = newLocale === 'ko' ? '' : `/${newLocale}`;
    const cleanPath = strippedPath === '/' ? '' : strippedPath;
    const targetUrl = (prefix + cleanPath) || '/';
    window.location.href = targetUrl;
    setLangOpen(false);
  };

  const navLinks = [
    { href: '/blog', label: t('common.blog'), highlight: true },
    { href: '/about', label: t('common.about'), hideOnMobile: true },
    { href: '/contact', label: t('common.contact'), hideOnMobile: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-12 z-[55] flex items-center px-4 lg:px-6 border-b" style={{ background: '#060b18', borderColor: 'rgba(255,255,255,0.06)' }}>
      {/* Left: Hamburger (mobile) + Logo */}
      <div className="flex items-center gap-2">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-md lg:hidden"
          aria-label={t('common.openMenu')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[#e2e0f0]">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Pixkit Home">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" role="img" aria-label="Pixkit">
            <rect width="32" height="32" rx="6" fill="#f59e0b" />
            <path d="M8 12l4-4 4 4 4-4 4 4v12H8V12z" fill="#0a0f1e" />
            <circle cx="12" cy="14" r="2" fill="#0a0f1e" />
          </svg>
          <span className="text-base font-bold font-heading text-[#e2e0f0]">Pixkit</span>
        </Link>
      </div>

      {/* Right: Nav links + Language */}
      <div className="ml-auto flex items-center gap-5">
        {/* Nav links */}
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] font-bold transition-colors ${
              link.hideOnMobile ? 'hidden sm:block' : ''
            } ${
              link.highlight
                ? 'text-[#f59e0b] hover:text-[#fbbf24]'
                : 'text-[#5c5a78] hover:text-[#e2e0f0]'
            }`}
          >
            {link.label}
          </Link>
        ))}

        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 text-[13px] font-bold text-[#5c5a78] hover:text-[#e2e0f0] transition-colors"
          >
            <span>{currentLocale.flag}</span>
            <span className="hidden sm:inline">{currentLocale.name}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-40 bg-[#060b18] border border-[rgba(255,255,255,0.06)] rounded-lg shadow-lg overflow-hidden z-50">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-xs transition-colors ${
                      l.code === locale ? 'text-[#f59e0b] bg-[rgba(245,158,11,0.15)]' : 'text-[#5c5a78] hover:bg-[rgba(255,255,255,0.03)] hover:text-[#e2e0f0]'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
