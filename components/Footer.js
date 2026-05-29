'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '../i18n/navigation';

const footerText = {
  ko: {
    tools: '도구',
    content: '콘텐츠',
    legal: '법적 고지',
    desc: '브라우저에서 바로 작동하는 무료 이미지 편집 도구. 서버 업로드 없이, 설치 없이, 프라이버시를 지키면서.',
    disclaimer: '면책 조항',
  },
  en: {
    tools: 'Tools',
    content: 'Content',
    legal: 'Legal',
    desc: 'Free image editing tools that run right in your browser. No server uploads, no installation, full privacy.',
    disclaimer: 'Disclaimer',
  },
  ja: {
    tools: 'ツール',
    content: 'コンテンツ',
    legal: '法的情報',
    desc: 'ブラウザで直接動作する無料画像編集ツール。サーバーアップロード不要、インストール不要、プライバシー保護。',
    disclaimer: '免責事項',
  },
  zh: {
    tools: '工具',
    content: '内容',
    legal: '法律信息',
    desc: '直接在浏览器中运行的免费图片编辑工具。无需上传服务器，无需安装，保护隐私。',
    disclaimer: '免责声明',
  },
  fr: {
    tools: 'Outils',
    content: 'Contenu',
    legal: 'Mentions légales',
    desc: 'Outils d\'édition d\'image gratuits directement dans votre navigateur. Sans envoi serveur, sans installation.',
    disclaimer: 'Avis de non-responsabilité',
  },
  es: {
    tools: 'Herramientas',
    content: 'Contenido',
    legal: 'Legal',
    desc: 'Herramientas gratuitas de edición de imágenes directamente en tu navegador. Sin subidas al servidor, sin instalación.',
    disclaimer: 'Aviso legal',
  },
};

const toolLinks = [
  { href: '/resize', key: 'sidebar.resize' },
  { href: '/crop', key: 'sidebar.crop' },
  { href: '/convert', key: 'sidebar.convert' },
  { href: '/remove-bg', key: 'sidebar.removeBg' },
  { href: '/img-to-pdf', key: 'sidebar.imgToPdf' },
];

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const f = footerText[locale] || footerText.ko;

  return (
    <footer className="lg:ml-[220px] border-t border-card-border mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="6" fill="#f59e0b" />
                <path d="M8 12l4-4 4 4 4-4 4 4v12H8V12z" fill="#0a0f1e" />
                <circle cx="12" cy="14" r="2" fill="#0a0f1e" />
              </svg>
              <span className="text-base font-bold font-heading text-text-primary">Pixkit</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-[11px] uppercase tracking-widest text-text-muted mb-3 font-semibold">{f.tools}</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-text-secondary hover:text-gold transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-[11px] uppercase tracking-widest text-text-muted mb-3 font-semibold">{f.content}</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-xs text-text-secondary hover:text-gold transition-colors">{t('common.blog')}</Link></li>
              <li><Link href="/about" className="text-xs text-text-secondary hover:text-gold transition-colors">{t('common.about')}</Link></li>
              <li><Link href="/contact" className="text-xs text-text-secondary hover:text-gold transition-colors">{t('common.contact')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[11px] uppercase tracking-widest text-text-muted mb-3 font-semibold">{f.legal}</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-xs text-text-secondary hover:text-gold transition-colors">{t('common.privacy')}</Link></li>
              <li><Link href="/terms" className="text-xs text-text-secondary hover:text-gold transition-colors">{t('common.terms')}</Link></li>
              <li><Link href="/disclaimer" className="text-xs text-text-secondary hover:text-gold transition-colors">{f.disclaimer}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-text-muted">&copy; 2026 Pixkit. All rights reserved.</p>
          <a
            href="https://instagram.com/pixkit.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-gold transition-colors"
            aria-label="Pixkit Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
