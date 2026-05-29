import { Link } from '../../../i18n/navigation';
import { getOrganizationJsonLd } from '../../../lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { ko: '서비스 소개', en: 'About', ja: 'サービス紹介', zh: '关于我们', fr: 'À propos', es: 'Acerca de', hi: 'हमारे बारे में' };
  const descs = {
    ko: 'Pixkit은 브라우저에서 바로 작동하는 무료 이미지 편집 도구입니다. 설치 없이 리사이즈, 크롭, 변환, PDF 생성까지.',
    en: 'Pixkit is a free image editing tool that works right in your browser. Resize, crop, convert, and create PDFs — no installation needed.',
    ja: 'Pixkitはブラウザで直接動作する無料の画像編集ツールです。インストール不要でリサイズ、クロップ、変換、PDF作成まで。',
    zh: 'Pixkit是一款直接在浏览器中运行的免费图片编辑工具。无需安装，即可调整大小、裁剪、转换和创建PDF。',
    fr: 'Pixkit est un outil d\'édition d\'images gratuit qui fonctionne directement dans votre navigateur. Redimensionnez, recadrez, convertissez et créez des PDF sans installation.',
    es: 'Pixkit es una herramienta gratuita de edición de imágenes que funciona directamente en tu navegador. Redimensiona, recorta, convierte y crea PDFs sin instalación.',
    hi: 'Pixkit एक मुफ्त इमेज एडिटिंग टूल है जो सीधे आपके ब्राउज़र में काम करता है। बिना इंस्टॉलेशन के रिसाइज़, क्रॉप, कन्वर्ट करें।',
  };
  const baseUrl = 'https://pixkit.app';
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const languages = {};
  ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'hi'].forEach((l) => {
    const p = l === 'ko' ? '' : `/${l}`;
    languages[l] = `${baseUrl}${p}/about`;
  });
  languages['x-default'] = `${baseUrl}/about`;
  return {
    title: titles[locale] || titles.ko,
    description: descs[locale] || descs.ko,
    alternates: { canonical: `${baseUrl}${prefix}/about`, languages },
    openGraph: { title: titles[locale] || titles.ko, description: descs[locale] || descs.ko, url: `${baseUrl}${prefix}/about` },
  };
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
    storyTitle: 'Pixkit을 만든 이유',
    story: '개인 사진을 리사이즈하려고 온라인 도구를 찾아 썼는데, 알고 보니 내 파일이 서버에 업로드되고 있었다. 무료라 좋다고 생각했지만, 내 사진이 어딘가에 저장될 수 있다는 게 찜찜했다. 그래서 브라우저 안에서만 모든 처리가 끝나는 도구를 직접 만들기로 했다. 서버 전송 없이, 설치 없이, 완전 무료로. 그게 Pixkit의 시작이었다.',
    historyTitle: '업데이트 히스토리',
    history: [
      { version: 'v1.4', date: '2026년 3월', items: ['AI 배경 제거 기능 추가', 'QR코드 생성기 추가', 'EXIF 메타데이터 제거 추가', '이미지 합치기 추가', '6개 언어 지원 (한/영/일/중/프/스)'] },
      { version: 'v1.3', date: '2026년 3월', items: ['이미지 크롭 추가', '회전/뒤집기 추가', '파일 형식 변환 추가 (HEIC 지원)', '배경 제거 수동 브러시 편집 추가'] },
      { version: 'v1.2', date: '2026년 3월', items: ['이미지 → PDF 변환 추가', 'PDF → 이미지 변환 추가', '블로그 섹션 오픈', '다국어 지원 시작 (한/영/일/중)'] },
      { version: 'v1.1', date: '2026년 2월', items: ['일괄 처리 기능 추가', '원본/결과 용량 비교 표시', '프리셋 버튼 추가'] },
      { version: 'v1.0', date: '2026년 2월', items: ['Pixkit 출시', '단일 이미지 리사이즈', 'JPG/PNG/WebP 변환'] },
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
    storyTitle: 'Why We Built Pixkit',
    story: 'It started when I needed to resize a personal photo. I used a free online tool, only to realize my file was being uploaded to their server. It felt uncomfortable knowing my photos could be stored somewhere I couldn\'t control. So I decided to build a tool that processes everything inside the browser. No server uploads, no installation, completely free. That\'s how Pixkit was born.',
    historyTitle: 'Update History',
    history: [
      { version: 'v1.4', date: 'March 2026', items: ['AI background removal', 'QR code generator', 'EXIF metadata removal', 'Image merge tool', '6 language support (KO/EN/JA/ZH/FR/ES)'] },
      { version: 'v1.3', date: 'March 2026', items: ['Image crop tool', 'Rotate & flip tool', 'Format conversion (HEIC support)', 'Manual brush editing for background removal'] },
      { version: 'v1.2', date: 'March 2026', items: ['Image → PDF conversion', 'PDF → Image conversion', 'Blog section launched', 'Multi-language support (KO/EN/JA/ZH)'] },
      { version: 'v1.1', date: 'February 2026', items: ['Batch processing', 'Original vs. result size comparison', 'Preset buttons'] },
      { version: 'v1.0', date: 'February 2026', items: ['Pixkit launched', 'Single image resize', 'JPG/PNG/WebP conversion'] },
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
    storyTitle: 'Pixkitを作った理由',
    story: '個人の写真をリサイズしようとオンラインツールを使ったとき、ファイルがサーバーにアップロードされていることに気づきました。無料で便利だと思っていましたが、自分の写真がどこかに保存されるかもしれないと思うと不安でした。だからブラウザ内ですべて処理が完結するツールを自分で作ることにしました。サーバー送信なし、インストール不要、完全無料。それがPixkitの始まりです。',
    historyTitle: 'アップデート履歴',
    history: [
      { version: 'v1.4', date: '2026年3月', items: ['AI背景除去機能追加', 'QRコードジェネレーター追加', 'EXIFメタデータ削除追加', '画像結合ツール追加', '6言語対応 (韓/英/日/中/仏/西)'] },
      { version: 'v1.3', date: '2026年3月', items: ['画像クロップ追加', '回転・反転ツール追加', '形式変換追加 (HEIC対応)', '背景除去手動ブラシ編集追加'] },
      { version: 'v1.2', date: '2026年3月', items: ['画像→PDF変換追加', 'PDF→画像変換追加', 'ブログセクション開設', '多言語対応開始 (韓/英/日/中)'] },
      { version: 'v1.1', date: '2026年2月', items: ['一括処理機能追加', '元サイズ/結果サイズ比較表示', 'プリセットボタン追加'] },
      { version: 'v1.0', date: '2026年2月', items: ['Pixkitリリース', '単一画像リサイズ', 'JPG/PNG/WebP変換'] },
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
    storyTitle: '为什么创建Pixkit',
    story: '有一次想在线调整个人照片大小，用了个免费工具，后来才发现文件被上传到了服务器。虽然免费很好，但想到自己的照片可能被存储在某个地方，总觉得不放心。于是决定自己做一个完全在浏览器中处理的工具。不上传服务器、不用安装、完全免费。这就是Pixkit的起点。',
    historyTitle: '更新历史',
    history: [
      { version: 'v1.4', date: '2026年3月', items: ['AI背景移除功能', 'QR码生成器', 'EXIF元数据删除', '图片合并工具', '6种语言支持'] },
      { version: 'v1.3', date: '2026年3月', items: ['图片裁剪', '旋转/翻转工具', '格式转换 (HEIC支持)', '背景移除手动画笔编辑'] },
      { version: 'v1.2', date: '2026年3月', items: ['图片→PDF转换', 'PDF→图片转换', '博客上线', '多语言支持 (韩/英/日/中)'] },
      { version: 'v1.1', date: '2026年2月', items: ['批量处理功能', '原始/结果大小对比', '预设按钮'] },
      { version: 'v1.0', date: '2026年2月', items: ['Pixkit发布', '单张图片调整大小', 'JPG/PNG/WebP转换'] },
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
    storyTitle: 'Pourquoi Pixkit a été créé',
    story: 'Tout a commencé quand j\'ai voulu redimensionner une photo personnelle. J\'ai utilisé un outil en ligne gratuit, avant de réaliser que mon fichier était envoyé sur un serveur. Savoir que mes photos pouvaient être stockées quelque part m\'a mis mal à l\'aise. J\'ai donc décidé de créer un outil qui traite tout dans le navigateur. Sans envoi serveur, sans installation, entièrement gratuit. C\'est ainsi que Pixkit est né.',
    historyTitle: 'Historique des mises à jour',
    history: [
      { version: 'v1.4', date: 'Mars 2026', items: ['Suppression de fond IA', 'Générateur de QR codes', 'Suppression EXIF', 'Fusion d\'images', 'Support 6 langues'] },
      { version: 'v1.3', date: 'Mars 2026', items: ['Outil de recadrage', 'Rotation et retournement', 'Conversion de format (HEIC)', 'Édition manuelle du fond'] },
      { version: 'v1.2', date: 'Mars 2026', items: ['Conversion image → PDF', 'Conversion PDF → image', 'Lancement du blog', 'Support multilingue (KO/EN/JA/ZH)'] },
      { version: 'v1.1', date: 'Février 2026', items: ['Traitement par lot', 'Comparaison de taille', 'Boutons préréglés'] },
      { version: 'v1.0', date: 'Février 2026', items: ['Lancement de Pixkit', 'Redimensionnement d\'image', 'Conversion JPG/PNG/WebP'] },
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
    storyTitle: 'Por qué creamos Pixkit',
    story: 'Todo empezó cuando quise redimensionar una foto personal. Usé una herramienta online gratuita, solo para descubrir que mi archivo se subía a un servidor. Me incomodaba saber que mis fotos podían almacenarse en algún lugar fuera de mi control. Así que decidí crear una herramienta que procese todo dentro del navegador. Sin subidas al servidor, sin instalación, completamente gratis. Así nació Pixkit.',
    historyTitle: 'Historial de actualizaciones',
    history: [
      { version: 'v1.4', date: 'Marzo 2026', items: ['Eliminación de fondo IA', 'Generador de QR', 'Eliminación EXIF', 'Fusión de imágenes', 'Soporte 6 idiomas'] },
      { version: 'v1.3', date: 'Marzo 2026', items: ['Herramienta de recorte', 'Rotación y volteo', 'Conversión de formato (HEIC)', 'Edición manual del fondo'] },
      { version: 'v1.2', date: 'Marzo 2026', items: ['Conversión imagen → PDF', 'Conversión PDF → imagen', 'Lanzamiento del blog', 'Soporte multilingüe (KO/EN/JA/ZH)'] },
      { version: 'v1.1', date: 'Febrero 2026', items: ['Procesamiento por lotes', 'Comparación de tamaño', 'Botones de presets'] },
      { version: 'v1.0', date: 'Febrero 2026', items: ['Lanzamiento de Pixkit', 'Redimensionamiento', 'Conversión JPG/PNG/WebP'] },
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

  const orgJsonLd = getOrganizationJsonLd();
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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

      {/* Story */}
      <section className="mb-16">
        <h2 className="text-xl font-bold font-heading mb-6 text-center">{c.storyTitle}</h2>
        <div className="max-w-2xl mx-auto border-l-4 border-gold pl-6 py-2">
          <p className="text-text-secondary text-sm leading-relaxed italic">
            {c.story}
          </p>
        </div>
      </section>

      {/* Expertise / Philosophy */}
      <ExpertiseSection locale={locale} />

      {/* Update History */}
      <section className="mb-16">
        <h2 className="text-xl font-bold font-heading mb-8 text-center">{c.historyTitle}</h2>
        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-card-border" />
          <div className="space-y-8">
            {c.history.map((entry, i) => (
              <div key={entry.version} className="relative pl-8">
                {/* Dot */}
                <div className={`absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 ${i === 0 ? 'bg-gold border-gold' : 'bg-bg-deep border-card-border'}`} />
                <div className={`flex items-baseline gap-3 mb-2 ${i === 0 ? '' : ''}`}>
                  <span className={`font-heading font-bold ${i === 0 ? 'text-gold text-lg' : 'text-gold text-base'}`}>{entry.version}</span>
                  <span className="text-text-muted text-xs">{entry.date}</span>
                </div>
                <ul className="space-y-1">
                  {entry.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-text-muted mt-1.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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

const expertiseContent = {
  ko: {
    title: '우리의 전문성과 철학',
    subtitle: '이미지 처리 전문 도구로서의 포지셔닝',
    items: [
      { h: '브라우저 기반 이미지 처리 전문', p: 'Pixkit은 브라우저에서 실행되는 이미지 처리 기술에 집중합니다. HTML5 Canvas API로 픽셀 단위 연산을 수행하고, WebAssembly로 HEIC 같은 네이티브 포맷을 디코드하며, ONNX Runtime을 통해 딥러닝 기반 이미지 세그멘테이션(AI 배경 제거)까지 브라우저 안에서 실행합니다. 서버 없이도 전문가 수준의 이미지 편집이 가능한 것은 이러한 기술 조합 덕분입니다.' },
      { h: '서비스 운영 철학', p: '사용자의 프라이버시가 최우선입니다. 이미지 파일은 단 한 번도 외부 서버로 전송되지 않으며, 모든 연산은 사용자의 브라우저 내에서 완결됩니다. 이 원칙은 Pixkit의 모든 기능 설계에 예외 없이 적용되며, 수익 모델(광고)조차 이 원칙을 침해하지 않는 선에서만 도입합니다. "무료인데 내 사진이 서버에 올라가는 찜찜함"을 없애는 것 — 그게 Pixkit을 만든 이유입니다.' },
      { h: '기술 스택', p: 'Next.js 16 기반 React 19 프론트엔드, next-intl 다국어 라우팅, Canvas API 기반 이미지 처리, jsPDF 및 PDF.js 기반 PDF 입출력, @imgly/background-removal 브라우저 내 AI 배경 제거, exifr 기반 EXIF 메타데이터 처리, qrcode.js 기반 QR 생성 — 모두 클라이언트 사이드에서 동작합니다.' },
      { h: '오픈소스 라이브러리 기반', p: '신뢰할 수 있는 오픈소스 생태계 위에서 구축되었습니다. Mozilla의 PDF.js, jsPDF, Transformers.js 기반 @imgly/background-removal, exifr, qrcode.js 등 수만 명의 개발자가 검증한 라이브러리만 사용합니다. 각 라이브러리의 보안 업데이트를 정기적으로 추적하여 최신 상태를 유지합니다.' },
      { h: '다국어 지원', p: '한국어, 영어, 일본어, 중국어, 프랑스어, 스페인어 — 6개 언어로 서비스됩니다. 단순 번역이 아니라 각 언어권의 사용 맥락과 용어를 반영한 로컬라이제이션을 지향하며, 모든 도구, 블로그 가이드, 법적 고지 페이지가 6개 언어로 제공됩니다.' },
      { h: '지속적 개선', p: '매주 도구 기능을 점검하고 사용자 피드백을 반영합니다. 지난 2개월간 v1.0에서 v1.4까지 업데이트하며 12개 도구를 구축했고, 6개 언어로 서비스를 확장했습니다. 앞으로도 브라우저 기술의 진보에 맞춰 더 많은 이미지 처리 작업을 서버 없이 해결할 수 있도록 발전시킬 계획입니다.' },
    ],
  },
  en: {
    title: 'Our Expertise and Philosophy',
    subtitle: 'Positioned as a specialized browser-based image processing tool',
    items: [
      { h: 'Browser-Based Image Processing', p: 'Pixkit specializes in image processing that runs entirely inside the browser. We use the HTML5 Canvas API for pixel-level operations, WebAssembly to decode native formats like HEIC, and ONNX Runtime to run deep learning segmentation models for AI background removal — all client-side. Professional-grade image editing without a server is possible precisely because of this technology combination.' },
      { h: 'Service Philosophy', p: 'User privacy comes first. Image files are never transmitted to any external server; all computation is completed inside the user\'s browser. This principle applies without exception to every feature, and even our monetization model (advertising) is constrained by it. Eliminating the discomfort of "it\'s free, but my photos end up on someone\'s server" — that\'s why Pixkit exists.' },
      { h: 'Technology Stack', p: 'Next.js 16 with React 19 as the frontend, next-intl for multilingual routing, Canvas API for image manipulation, jsPDF and PDF.js for PDF I/O, @imgly/background-removal for in-browser AI background removal, exifr for EXIF metadata handling, qrcode.js for QR generation — all operating client-side.' },
      { h: 'Built on Open Source', p: 'Pixkit is built on a trusted open-source ecosystem. We use battle-tested libraries like Mozilla\'s PDF.js, jsPDF, Transformers.js-powered @imgly/background-removal, exifr, and qrcode.js — libraries vetted by tens of thousands of developers. We track security updates for each dependency to keep everything current.' },
      { h: 'Multilingual Support', p: 'Pixkit is available in Korean, English, Japanese, Chinese, French, and Spanish — six languages. We aim for proper localization that reflects each region\'s usage context and terminology, not simple translation. Every tool, every blog guide, and every legal page is provided in all six languages.' },
      { h: 'Continuous Improvement', p: 'We review tool functionality weekly and incorporate user feedback. Over the past two months we have iterated from v1.0 to v1.4, shipped 12 tools, and expanded the service to 6 languages. We will continue to evolve alongside advances in browser technology, solving more image processing tasks without servers.' },
    ],
  },
  ja: {
    title: '専門性と運営理念',
    subtitle: '画像処理専用ツールとしてのポジショニング',
    items: [
      { h: 'ブラウザベース画像処理に特化', p: 'Pixkitはブラウザ内で動作する画像処理技術に特化しています。HTML5 Canvas APIでピクセル単位の演算を行い、WebAssemblyでHEICなどのネイティブフォーマットをデコードし、ONNX Runtimeを通じてディープラーニングベースの画像セグメンテーション（AI背景除去）までブラウザ内で実行します。' },
      { h: '運営理念', p: 'ユーザーのプライバシーが最優先です。画像ファイルは一度も外部サーバーに送信されず、すべての演算がユーザーのブラウザ内で完結します。この原則はすべての機能設計に例外なく適用されます。' },
      { h: '技術スタック', p: 'Next.js 16 + React 19、next-intl多言語ルーティング、Canvas APIベースの画像処理、jsPDF / PDF.js、@imgly/background-removal、exifr、qrcode.js — すべてクライアントサイドで動作します。' },
      { h: 'オープンソース基盤', p: '信頼できるオープンソースエコシステム上に構築されています。Mozilla PDF.js、jsPDF、@imgly/background-removal、exifr、qrcode.jsなど、数多くの開発者に検証されたライブラリのみを使用し、各ライブラリのセキュリティアップデートを定期的に追跡しています。' },
      { h: '多言語対応', p: '韓国語、英語、日本語、中国語、フランス語、スペイン語の6言語でサービスを提供しています。単なる翻訳ではなく、各言語圏の使用文脈と用語を反映したローカライゼーションを目指しており、すべてのツール、ブログガイド、法的告知ページが6言語で提供されます。' },
      { h: '継続的改善', p: '週次で機能を見直し、ユーザーフィードバックを反映しています。過去2ヶ月でv1.0からv1.4まで更新し、12のツールを構築、6言語にサービスを拡大しました。' },
    ],
  },
  zh: {
    title: '我们的专业性与运营理念',
    subtitle: '作为图片处理专业工具的定位',
    items: [
      { h: '专注浏览器图像处理', p: 'Pixkit专注于在浏览器内运行的图片处理技术。使用HTML5 Canvas API进行像素级运算，通过WebAssembly解码HEIC等原生格式，并借助ONNX Runtime在浏览器内运行基于深度学习的图像分割模型（AI背景移除）。' },
      { h: '运营理念', p: '用户隐私至上。图片文件从不传输到任何外部服务器，所有运算都在用户浏览器内完成。此原则无例外地应用于所有功能设计。' },
      { h: '技术栈', p: 'Next.js 16 + React 19、next-intl多语言路由、Canvas API图像处理、jsPDF / PDF.js、@imgly/background-removal、exifr、qrcode.js — 全部在客户端运行。' },
      { h: '基于开源', p: '建立在可信赖的开源生态之上。使用Mozilla PDF.js、jsPDF、@imgly/background-removal、exifr、qrcode.js等经过数万开发者验证的库，并定期跟踪各库的安全更新。' },
      { h: '多语言支持', p: '支持韩语、英语、日语、中文、法语、西班牙语6种语言。不是简单翻译，而是反映各语言区域使用语境和术语的本地化。所有工具、博客指南、法律声明页面都提供6种语言版本。' },
      { h: '持续改进', p: '每周审查功能并采纳用户反馈。过去两个月从v1.0迭代到v1.4，构建了12个工具，扩展到6种语言。' },
    ],
  },
  fr: {
    title: 'Notre expertise et philosophie',
    subtitle: 'Positionné comme un outil spécialisé de traitement d\'image dans le navigateur',
    items: [
      { h: 'Spécialisation navigateur', p: 'Pixkit se spécialise dans le traitement d\'image qui s\'exécute entièrement dans le navigateur. Nous utilisons l\'API Canvas HTML5 pour les opérations au niveau du pixel, WebAssembly pour décoder les formats natifs comme HEIC, et ONNX Runtime pour exécuter des modèles de segmentation par apprentissage profond (suppression de fond IA) — tout côté client.' },
      { h: 'Philosophie de service', p: 'La vie privée de l\'utilisateur est prioritaire. Les fichiers image ne sont jamais transmis à un serveur externe ; tout le calcul est effectué dans le navigateur de l\'utilisateur. Ce principe s\'applique sans exception à toutes les fonctionnalités.' },
      { h: 'Stack technique', p: 'Next.js 16 + React 19, next-intl pour le routage multilingue, Canvas API, jsPDF / PDF.js, @imgly/background-removal, exifr, qrcode.js — tout fonctionne côté client.' },
      { h: 'Basé sur l\'open source', p: 'Pixkit est construit sur un écosystème open source fiable. Nous utilisons des bibliothèques éprouvées comme PDF.js de Mozilla, jsPDF, @imgly/background-removal, exifr et qrcode.js — des bibliothèques vérifiées par des dizaines de milliers de développeurs. Nous suivons les mises à jour de sécurité de chaque dépendance.' },
      { h: 'Support multilingue', p: 'Pixkit est disponible en coréen, anglais, japonais, chinois, français et espagnol — six langues. Nous visons une véritable localisation qui reflète le contexte d\'usage et la terminologie de chaque région, pas une simple traduction. Chaque outil, guide de blog et page légale est fourni dans les six langues.' },
      { h: 'Amélioration continue', p: 'Nous examinons les fonctionnalités chaque semaine et intégrons les retours utilisateurs. Au cours des deux derniers mois, nous sommes passés de v1.0 à v1.4, avons livré 12 outils et étendu le service à 6 langues.' },
    ],
  },
  es: {
    title: 'Nuestra experiencia y filosofía',
    subtitle: 'Posicionado como herramienta especializada de procesamiento de imágenes en el navegador',
    items: [
      { h: 'Especialización en navegador', p: 'Pixkit se especializa en el procesamiento de imágenes que se ejecuta completamente dentro del navegador. Usamos HTML5 Canvas API para operaciones a nivel de píxel, WebAssembly para decodificar formatos nativos como HEIC, y ONNX Runtime para ejecutar modelos de segmentación por aprendizaje profundo (eliminación de fondo con IA) — todo del lado del cliente.' },
      { h: 'Filosofía del servicio', p: 'La privacidad del usuario es prioritaria. Los archivos de imagen nunca se transmiten a servidores externos; todo el cálculo se realiza en el navegador del usuario. Este principio se aplica sin excepción a todas las funcionalidades.' },
      { h: 'Stack tecnológico', p: 'Next.js 16 + React 19, next-intl para enrutamiento multilingüe, Canvas API para procesamiento de imágenes, jsPDF / PDF.js, @imgly/background-removal, exifr, qrcode.js — todo funciona del lado del cliente.' },
      { h: 'Basado en código abierto', p: 'Pixkit está construido sobre un ecosistema de código abierto confiable. Usamos bibliotecas probadas como PDF.js de Mozilla, jsPDF, @imgly/background-removal, exifr y qrcode.js — bibliotecas verificadas por decenas de miles de desarrolladores. Seguimos las actualizaciones de seguridad de cada dependencia.' },
      { h: 'Soporte multilingüe', p: 'Pixkit está disponible en coreano, inglés, japonés, chino, francés y español — seis idiomas. Buscamos una localización real que refleje el contexto de uso y la terminología de cada región, no una simple traducción. Cada herramienta, guía de blog y página legal se ofrece en los seis idiomas.' },
      { h: 'Mejora continua', p: 'Revisamos las funcionalidades semanalmente e incorporamos comentarios de usuarios. En los últimos dos meses hemos iterado de v1.0 a v1.4, construido 12 herramientas y expandido el servicio a 6 idiomas.' },
    ],
  },
};

function ExpertiseSection({ locale }) {
  const data = expertiseContent[locale] || expertiseContent.ko;
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold font-heading mb-2">{data.title}</h2>
        <p className="text-text-muted text-sm">{data.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {data.items.map((item) => (
          <div key={item.h} className="card-glow rounded-xl p-6">
            <h3 className="font-heading font-semibold text-gold mb-2">{item.h}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{item.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
