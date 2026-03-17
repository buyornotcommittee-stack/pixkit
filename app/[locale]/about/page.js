import { Link } from '../../../i18n/navigation';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { ko: '서비스 소개', en: 'About', ja: 'サービス紹介', zh: '关于我们', fr: 'À propos', es: 'Acerca de' };
  const descs = {
    ko: 'Pixkit은 브라우저에서 바로 작동하는 무료 이미지 편집 도구입니다. 설치 없이 리사이즈, 크롭, 변환, PDF 생성까지.',
    en: 'Pixkit is a free image editing tool that works right in your browser. Resize, crop, convert, and create PDFs — no installation needed.',
    ja: 'Pixkitはブラウザで直接動作する無料の画像編集ツールです。インストール不要でリサイズ、クロップ、変換、PDF作成まで。',
    zh: 'Pixkit是一款直接在浏览器中运行的免费图片编辑工具。无需安装，即可调整大小、裁剪、转换和创建PDF。',
    fr: 'Pixkit est un outil d\'édition d\'images gratuit qui fonctionne directement dans votre navigateur. Redimensionnez, recadrez, convertissez et créez des PDF sans installation.',
    es: 'Pixkit es una herramienta gratuita de edición de imágenes que funciona directamente en tu navegador. Redimensiona, recorta, convierte y crea PDFs sin instalación.',
  };
  return { title: titles[locale] || titles.ko, description: descs[locale] || descs.ko };
}

const content = {
  ko: {
    heroTitle: 'Pixkit은 브라우저에서 바로 작동하는',
    heroHighlight: '무료 이미지 도구',
    heroSuffix: '입니다',
    heroDesc: '복잡한 소프트웨어 설치 없이, 회원가입 없이, 열면 바로 사용할 수 있는 이미지 편집 도구 모음입니다.',
    values: [
      { title: '완전 무료', desc: '모든 기능을 횟수 제한이나 워터마크 없이 자유롭게 사용할 수 있습니다. 유료 플랜이나 숨겨진 비용은 없습니다.' },
      { title: '프라이버시 보호', desc: '이미지가 외부 서버로 전송되지 않습니다. 모든 처리가 사용자의 브라우저 안에서 이루어지므로 개인 사진도 안심하고 편집할 수 있습니다.' },
      { title: '설치 불필요', desc: '웹 브라우저만 있으면 됩니다. Windows, Mac, iPhone, Android 어디서든 접속하면 바로 사용 가능합니다.' },
    ],
    featuresTitle: '지원 기능',
    features: [
      '이미지 리사이즈 (단일 / 일괄)',
      '이미지 크롭 (자유 / 비율 고정)',
      '이미지 회전 및 뒤집기',
      '파일 형식 변환 (JPG, PNG, WebP, HEIC 등)',
      '이미지 → PDF 변환',
      'PDF → 이미지 추출',
      '워터마크 추가 (텍스트 / 로고)',
    ],
    techTitle: '기술 스택',
    faqTitle: '자주 묻는 질문',
    faqs: [
      { q: 'Pixkit은 정말 무료인가요?', a: '네, 모든 기능이 완전 무료입니다. 횟수 제한, 워터마크, 유료 플랜 없이 자유롭게 사용하실 수 있습니다.' },
      { q: '이미지가 서버에 저장되나요?', a: '아닙니다. Pixkit은 모든 이미지 처리를 사용자의 브라우저에서 수행합니다. 이미지가 외부 서버로 전송되거나 저장되는 일은 없습니다.' },
      { q: '어떤 파일 형식을 지원하나요?', a: 'JPG, PNG, WebP, GIF, BMP, HEIC(아이폰 사진) 형식을 지원합니다. HEIC 파일은 업로드 시 자동으로 변환됩니다.' },
      { q: '최대 파일 크기 제한이 있나요?', a: '서버 업로드가 없으므로 엄격한 파일 크기 제한은 없습니다. 다만, 매우 큰 이미지의 경우 브라우저 메모리에 따라 처리 속도가 달라질 수 있습니다.' },
      { q: '모바일에서도 사용할 수 있나요?', a: '네, 반응형 디자인으로 스마트폰과 태블릿에서도 편리하게 사용할 수 있습니다.' },
    ],
    cta: '지금 바로 사용하기',
  },
  en: {
    heroTitle: 'Pixkit is a free image tool',
    heroHighlight: 'right in your browser',
    heroSuffix: '',
    heroDesc: 'A collection of image editing tools you can use instantly — no complex software, no sign-ups, just open and go.',
    values: [
      { title: 'Completely Free', desc: 'Use all features without usage limits or watermarks. No paid plans or hidden costs.' },
      { title: 'Privacy First', desc: 'Your images are never sent to external servers. All processing happens within your browser, so your personal photos stay private.' },
      { title: 'No Installation', desc: 'All you need is a web browser. Works on Windows, Mac, iPhone, and Android — just visit and start using.' },
    ],
    featuresTitle: 'Features',
    features: [
      'Image resize (single & batch)',
      'Image crop (free & fixed ratio)',
      'Image rotate & flip',
      'Format conversion (JPG, PNG, WebP, HEIC, etc.)',
      'Image → PDF conversion',
      'PDF → Image extraction',
      'Watermark (text / logo)',
    ],
    techTitle: 'Tech Stack',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Is Pixkit really free?', a: 'Yes, all features are completely free. No usage limits, no watermarks, no paid plans.' },
      { q: 'Are my images stored on a server?', a: 'No. Pixkit processes all images in your browser. Your images are never uploaded to or stored on external servers.' },
      { q: 'What file formats are supported?', a: 'JPG, PNG, WebP, GIF, BMP, and HEIC (iPhone photos) are supported. HEIC files are automatically converted upon upload.' },
      { q: 'Is there a maximum file size limit?', a: 'Since there are no server uploads, there is no strict file size limit. However, very large images may process slower depending on your browser\'s memory.' },
      { q: 'Can I use it on mobile?', a: 'Yes, the responsive design works comfortably on smartphones and tablets.' },
    ],
    cta: 'Start Using Now',
  },
  ja: {
    heroTitle: 'Pixkitはブラウザで直接動作する',
    heroHighlight: '無料画像ツール',
    heroSuffix: 'です',
    heroDesc: '複雑なソフトウェアのインストール不要、会員登録不要。開けばすぐに使える画像編集ツールセットです。',
    values: [
      { title: '完全無料', desc: 'すべての機能を回数制限やウォーターマークなしで自由にご利用いただけます。有料プランや隠れた費用はありません。' },
      { title: 'プライバシー保護', desc: '画像は外部サーバーに送信されません。すべての処理がブラウザ内で行われるため、個人写真も安心して編集できます。' },
      { title: 'インストール不要', desc: 'Webブラウザさえあれば十分です。Windows、Mac、iPhone、Androidどこからでもアクセスしてすぐにご利用いただけます。' },
    ],
    featuresTitle: '対応機能',
    features: [
      '画像リサイズ（単一・一括）',
      '画像クロップ（自由比率・固定比率）',
      '画像の回転・反転',
      'ファイル形式変換（JPG、PNG、WebP、HEICなど）',
      '画像 → PDF変換',
      'PDF → 画像抽出',
      'ウォーターマーク追加（テキスト・ロゴ）',
    ],
    techTitle: '技術スタック',
    faqTitle: 'よくある質問',
    faqs: [
      { q: 'Pixkitは本当に無料ですか？', a: 'はい、すべての機能が完全無料です。回数制限、ウォーターマーク、有料プランなしでご自由にお使いいただけます。' },
      { q: '画像はサーバーに保存されますか？', a: 'いいえ。Pixkitはすべての画像処理をユーザーのブラウザ内で実行します。画像が外部サーバーに送信・保存されることはありません。' },
      { q: '対応ファイル形式は？', a: 'JPG、PNG、WebP、GIF、BMP、HEIC（iPhone写真）に対応しています。HEICファイルはアップロード時に自動変換されます。' },
      { q: '最大ファイルサイズの制限はありますか？', a: 'サーバーへのアップロードがないため、厳密なファイルサイズ制限はありません。ただし、非常に大きな画像の場合、ブラウザのメモリに応じて処理速度が異なる場合があります。' },
      { q: 'スマートフォンでも使えますか？', a: 'はい、レスポンシブデザインでスマートフォンやタブレットでも快適にご利用いただけます。' },
    ],
    cta: '今すぐ使ってみる',
  },
  zh: {
    heroTitle: 'Pixkit是在浏览器中直接运行的',
    heroHighlight: '免费图片工具',
    heroSuffix: '',
    heroDesc: '无需安装复杂软件，无需注册账号，打开即可使用的图片编辑工具合集。',
    values: [
      { title: '完全免费', desc: '所有功能均可无限制使用，没有水印、没有付费计划、没有隐藏费用。' },
      { title: '隐私保护', desc: '图片不会被发送到外部服务器。所有处理都在浏览器中完成，个人照片可以放心编辑。' },
      { title: '无需安装', desc: '只需要网页浏览器即可。Windows、Mac、iPhone、Android任何设备都可以直接使用。' },
    ],
    featuresTitle: '支持功能',
    features: [
      '图片调整大小（单张/批量）',
      '图片裁剪（自由比例/固定比例）',
      '图片旋转和翻转',
      '文件格式转换（JPG、PNG、WebP、HEIC等）',
      '图片 → PDF转换',
      'PDF → 图片提取',
      '添加水印（文字/Logo）',
    ],
    techTitle: '技术栈',
    faqTitle: '常见问题',
    faqs: [
      { q: 'Pixkit真的免费吗？', a: '是的，所有功能完全免费。没有使用次数限制、没有水印、没有付费计划。' },
      { q: '图片会被保存到服务器吗？', a: '不会。Pixkit在用户的浏览器中执行所有图片处理。图片不会被上传到外部服务器或存储。' },
      { q: '支持哪些文件格式？', a: '支持JPG、PNG、WebP、GIF、BMP、HEIC（iPhone照片）格式。HEIC文件上传时会自动转换。' },
      { q: '有最大文件大小限制吗？', a: '由于没有服务器上传，没有严格的文件大小限制。但对于非常大的图片，处理速度可能会因浏览器内存而异。' },
      { q: '手机上也能用吗？', a: '是的，响应式设计让您在手机和平板上也能方便使用。' },
    ],
    cta: '立即开始使用',
  },
  fr: {
    heroTitle: 'Pixkit est un outil d\'image gratuit',
    heroHighlight: 'directement dans votre navigateur',
    heroSuffix: '',
    heroDesc: 'Une collection d\'outils d\'édition d\'images utilisables instantanément — pas de logiciel complexe, pas d\'inscription, ouvrez et c\'est parti.',
    values: [
      { title: 'Entièrement gratuit', desc: 'Utilisez toutes les fonctionnalités sans limites d\'utilisation ni filigranes. Aucun forfait payant ni coût caché.' },
      { title: 'Vie privée respectée', desc: 'Vos images ne sont jamais envoyées à des serveurs externes. Tout le traitement se fait dans votre navigateur.' },
      { title: 'Aucune installation', desc: 'Un navigateur web suffit. Fonctionne sur Windows, Mac, iPhone et Android — visitez et commencez.' },
    ],
    featuresTitle: 'Fonctionnalités',
    features: [
      'Redimensionnement d\'images (unitaire et par lot)',
      'Recadrage d\'images (libre et ratio fixe)',
      'Rotation et retournement d\'images',
      'Conversion de format (JPG, PNG, WebP, HEIC, etc.)',
      'Conversion Image → PDF',
      'Extraction PDF → Image',
      'Filigrane (texte / logo)',
    ],
    techTitle: 'Stack technique',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Pixkit est-il vraiment gratuit ?', a: 'Oui, toutes les fonctionnalités sont entièrement gratuites. Pas de limites, pas de filigranes, pas de forfaits payants.' },
      { q: 'Mes images sont-elles stockées sur un serveur ?', a: 'Non. Pixkit traite toutes les images dans votre navigateur. Vos images ne sont jamais envoyées ni stockées sur des serveurs externes.' },
      { q: 'Quels formats de fichiers sont pris en charge ?', a: 'JPG, PNG, WebP, GIF, BMP et HEIC (photos iPhone) sont pris en charge. Les fichiers HEIC sont automatiquement convertis lors de l\'import.' },
      { q: 'Y a-t-il une limite de taille de fichier ?', a: 'Comme il n\'y a pas d\'envoi serveur, il n\'y a pas de limite stricte. Cependant, les très grandes images peuvent être traitées plus lentement selon la mémoire de votre navigateur.' },
      { q: 'Puis-je l\'utiliser sur mobile ?', a: 'Oui, le design responsive fonctionne parfaitement sur smartphones et tablettes.' },
    ],
    cta: 'Commencer maintenant',
  },
  es: {
    heroTitle: 'Pixkit es una herramienta de imagen gratuita',
    heroHighlight: 'directamente en tu navegador',
    heroSuffix: '',
    heroDesc: 'Una colección de herramientas de edición de imágenes listas para usar — sin software complejo, sin registro, abre y empieza.',
    values: [
      { title: 'Completamente gratis', desc: 'Usa todas las funciones sin límites de uso ni marcas de agua. Sin planes de pago ni costos ocultos.' },
      { title: 'Privacidad protegida', desc: 'Tus imágenes nunca se envían a servidores externos. Todo el procesamiento se realiza en tu navegador.' },
      { title: 'Sin instalación', desc: 'Solo necesitas un navegador web. Funciona en Windows, Mac, iPhone y Android — visita y empieza.' },
    ],
    featuresTitle: 'Funcionalidades',
    features: [
      'Redimensionamiento de imágenes (individual y por lotes)',
      'Recorte de imágenes (libre y proporción fija)',
      'Rotación y volteo de imágenes',
      'Conversión de formato (JPG, PNG, WebP, HEIC, etc.)',
      'Conversión de imagen a PDF',
      'Extracción de PDF a imagen',
      'Marca de agua (texto / logo)',
    ],
    techTitle: 'Stack técnico',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Pixkit es realmente gratis?', a: 'Sí, todas las funciones son completamente gratuitas. Sin límites, sin marcas de agua, sin planes de pago.' },
      { q: '¿Mis imágenes se almacenan en un servidor?', a: 'No. Pixkit procesa todas las imágenes en tu navegador. Tus imágenes nunca se envían ni se almacenan en servidores externos.' },
      { q: '¿Qué formatos de archivo son compatibles?', a: 'Se admiten JPG, PNG, WebP, GIF, BMP y HEIC (fotos de iPhone). Los archivos HEIC se convierten automáticamente al importar.' },
      { q: '¿Hay un límite de tamaño de archivo?', a: 'Como no hay carga al servidor, no hay un límite estricto. Sin embargo, las imágenes muy grandes pueden procesarse más lentamente según la memoria de tu navegador.' },
      { q: '¿Puedo usarlo en el móvil?', a: 'Sí, el diseño responsive funciona perfectamente en smartphones y tablets.' },
    ],
    cta: 'Empezar ahora',
  },
};

const icons = [
  'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  'M22 12h-4l-3 9L9 3l-3 9H2',
];

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const c = content[locale] || content.ko;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <section className="text-center py-12 lg:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
          {c.heroTitle}<br />
          <span className="text-gold">{c.heroHighlight}</span>{c.heroSuffix}
        </h1>
        <p className="text-text-secondary max-w-lg mx-auto">
          {c.heroDesc}
        </p>
      </section>

      {/* Values */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {c.values.map((v, i) => (
          <div key={v.title} className="card-glow rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gold-dim flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <path d={icons[i]} />
              </svg>
            </div>
            <h3 className="font-heading font-semibold mb-2">{v.title}</h3>
            <p className="text-text-secondary text-sm">{v.desc}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-xl font-bold font-heading mb-6 text-center">{c.featuresTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          {c.features.map((f) => (
            <div key={f} className="flex items-center gap-3 text-sm text-text-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {f}
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="card-glow rounded-xl p-8 mb-16 text-center">
        <h2 className="text-xl font-bold font-heading mb-4">{c.techTitle}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['Canvas API', 'PDF.js', 'jsPDF', 'Next.js', 'Vercel'].map((tech) => (
            <span key={tech} className="text-sm px-4 py-2 rounded-full border border-card-border text-text-secondary">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-xl font-bold font-heading mb-6 text-center">{c.faqTitle}</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {c.faqs.map((faq) => (
            <div key={faq.q} className="card-glow rounded-xl p-6">
              <h3 className="font-heading font-semibold text-gold mb-2">{faq.q}</h3>
              <p className="text-text-secondary text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-12">
        <Link href="/resize" className="btn-gold inline-block">
          {c.cta}
        </Link>
      </section>
    </div>
  );
}
