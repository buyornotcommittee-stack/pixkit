import { Link } from '../../../i18n/navigation';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    ko: '문의하기',
    en: 'Contact Us',
    ja: 'お問い合わせ',
    zh: '联系我们',
    fr: 'Nous contacter',
    es: 'Contáctanos',
    hi: 'संपर्क करें',
  };
  const descs = {
    ko: 'Pixkit 서비스 관련 문의사항을 보내주세요. 이메일: pixkit.app@gmail.com',
    en: 'Have questions about Pixkit? Contact us via email at pixkit.app@gmail.com',
    ja: 'Pixkitに関するお問い合わせはメールでお送りください。メール: pixkit.app@gmail.com',
    zh: '如有关于Pixkit的问题，请通过电子邮件联系我们。邮箱: pixkit.app@gmail.com',
    fr: 'Des questions sur Pixkit ? Contactez-nous par email à pixkit.app@gmail.com',
    es: '¿Tienes preguntas sobre Pixkit? Contáctanos por email a pixkit.app@gmail.com',
    hi: 'Pixkit के बारे में प्रश्न हैं? हमें ईमेल करें: pixkit.app@gmail.com',
  };
  const baseUrl = 'https://pixkit.app';
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const languages = {};
  ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'hi'].forEach((l) => {
    const p = l === 'ko' ? '' : `/${l}`;
    languages[l] = `${baseUrl}${p}/contact`;
  });
  languages['x-default'] = `${baseUrl}/contact`;
  return {
    title: titles[locale] || titles.ko,
    description: descs[locale] || descs.ko,
    alternates: { canonical: `${baseUrl}${prefix}/contact`, languages },
    openGraph: { title: titles[locale] || titles.ko, description: descs[locale] || descs.ko, url: `${baseUrl}${prefix}/contact` },
  };
}

const content = {
  ko: {
    title: '문의하기',
    desc: 'Pixkit 사용 중 불편한 점이나 제안사항이 있으시면\n언제든지 연락주세요. 빠르게 답변드리겠습니다.',
    emailLabel: '이메일',
    responseTime: '평균 응답 시간: 24시간 이내',
    cta: '메일 보내기',
    back: '← 홈으로 돌아가기',
  },
  en: {
    title: 'Contact Us',
    desc: 'If you have any issues or suggestions while using Pixkit,\nfeel free to reach out. We\'ll get back to you promptly.',
    emailLabel: 'Email',
    responseTime: 'Average response time: within 24 hours',
    cta: 'Send Email',
    back: '← Back to Home',
  },
  ja: {
    title: 'お問い合わせ',
    desc: 'Pixkitのご利用中に不便な点やご提案がございましたら、\nお気軽にご連絡ください。迅速にご返答いたします。',
    emailLabel: 'メール',
    responseTime: '平均応答時間: 24時間以内',
    cta: 'メールを送る',
    back: '← ホームに戻る',
  },
  zh: {
    title: '联系我们',
    desc: '如果您在使用Pixkit时遇到任何问题或有建议，\n请随时联系我们。我们会尽快回复。',
    emailLabel: '邮箱',
    responseTime: '平均响应时间: 24小时内',
    cta: '发送邮件',
    back: '← 返回首页',
  },
  fr: {
    title: 'Nous contacter',
    desc: 'Si vous rencontrez des problèmes ou avez des suggestions\nconcernant Pixkit, n\'hésitez pas à nous contacter.',
    emailLabel: 'Email',
    responseTime: 'Temps de réponse moyen : moins de 24 heures',
    cta: 'Envoyer un email',
    back: '← Retour à l\'accueil',
  },
  es: {
    title: 'Contáctanos',
    desc: 'Si tienes algún problema o sugerencia mientras usas Pixkit,\nno dudes en contactarnos. Responderemos lo antes posible.',
    emailLabel: 'Email',
    responseTime: 'Tiempo de respuesta promedio: menos de 24 horas',
    cta: 'Enviar email',
    back: '← Volver al inicio',
  },
  hi: {
    title: 'संपर्क करें',
    desc: 'Pixkit उपयोग करते समय कोई समस्या या सुझाव हो तो\nहमसे संपर्क करें। हम जल्दी जवाब देंगे।',
    emailLabel: 'ईमेल',
    responseTime: 'औसत प्रतिक्रिया समय: 24 घंटे के भीतर',
    cta: 'ईमेल भेजें',
    back: '← होम पर वापस',
  },
};

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const c = content[locale] || content.ko;

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: c.title,
    url: `https://pixkit.app${locale === 'ko' ? '' : `/${locale}`}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Pixkit',
      url: 'https://pixkit.app',
      email: 'pixkit.app@gmail.com',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'pixkit.app@gmail.com',
        contactType: 'customer support',
        availableLanguage: ['Korean', 'English', 'Japanese', 'Chinese', 'French', 'Spanish'],
      },
    },
  };

  return (
    <div className="max-w-2xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />

      {/* Hero */}
      <section className="text-center py-16 lg:py-24">
        <div className="w-16 h-16 rounded-2xl bg-gold-dim flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4">{c.title}</h1>
        <p className="text-text-secondary max-w-md mx-auto whitespace-pre-line leading-relaxed">
          {c.desc}
        </p>
      </section>

      {/* Email Card */}
      <section className="card-glow rounded-xl p-8 sm:p-10 text-center mb-8">
        <p className="text-xs uppercase tracking-widest text-text-muted mb-3">{c.emailLabel}</p>
        <a
          href="mailto:pixkit.app@gmail.com"
          className="text-2xl sm:text-3xl font-bold font-heading text-gold hover:underline transition-colors"
        >
          pixkit.app@gmail.com
        </a>
        <div className="mt-6">
          <a
            href="mailto:pixkit.app@gmail.com"
            className="btn-gold inline-flex items-center gap-2 px-6 py-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {c.cta}
          </a>
        </div>
        <p className="text-sm text-text-muted mt-6 flex items-center justify-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {c.responseTime}
        </p>
      </section>

      {/* Back */}
      <section className="text-center pb-12">
        <Link href="/" className="text-sm text-text-muted hover:text-gold transition-colors">
          {c.back}
        </Link>
      </section>
    </div>
  );
}
