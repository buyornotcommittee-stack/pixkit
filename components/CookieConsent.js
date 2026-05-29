'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '../i18n/navigation';

const text = {
  ko: { message: 'Pixkit은 서비스 개선을 위해 쿠키를 사용합니다.', accept: '동의', decline: '거부', privacy: '개인정보처리방침' },
  en: { message: 'We use cookies to improve your experience.', accept: 'Accept', decline: 'Decline', privacy: 'Privacy Policy' },
  ja: { message: 'サービス向上のためCookieを使用しています。', accept: '同意する', decline: '拒否', privacy: 'プライバシーポリシー' },
  zh: { message: '我们使用Cookie来改善您的体验。', accept: '接受', decline: '拒绝', privacy: '隐私政策' },
  fr: { message: 'Nous utilisons des cookies pour améliorer votre expérience.', accept: 'Accepter', decline: 'Refuser', privacy: 'Politique de confidentialité' },
  es: { message: 'Usamos cookies para mejorar tu experiencia.', accept: 'Aceptar', decline: 'Rechazar', privacy: 'Política de privacidad' },
};

export default function CookieConsent() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const t = text[locale] || text.ko;

  useEffect(() => {
    const consent = localStorage.getItem('pixkit-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pixkit-cookie-consent', 'accepted');
    window.dispatchEvent(new Event('cookie-consent-update'));
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('pixkit-cookie-consent', 'declined');
    window.dispatchEvent(new Event('cookie-consent-update'));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 lg:pl-[232px]">
      <div className="max-w-3xl mx-auto rounded-xl p-5 shadow-lg border border-gold/40" style={{ background: '#060b18' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-text-secondary leading-relaxed">
              {t.message}{' '}
              <Link href="/privacy" className="text-gold hover:underline">
                {t.privacy}
              </Link>
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleDecline}
              className="text-sm px-4 py-2 rounded-md border border-card-border text-text-muted hover:text-text-secondary transition-colors"
            >
              {t.decline}
            </button>
            <button
              onClick={handleAccept}
              className="btn-gold text-sm !px-4 !py-2"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
