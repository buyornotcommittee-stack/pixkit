'use client';
import { useLocale } from 'next-intl';

/* ── Step illustration SVGs ── */

function UploadIllust() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img">
      <rect width="320" height="180" rx="12" fill="var(--card-bg)" stroke="var(--card-border)" />
      <rect x="40" y="30" width="240" height="120" rx="10" strokeDasharray="8 4" stroke="var(--text-muted)" strokeWidth="2" fill="none" />
      <path d="M160 60v40M140 80h40" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
      <text x="160" y="125" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="sans-serif">Drop image here</text>
    </svg>
  );
}

function SettingsIllust() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img">
      <rect width="320" height="180" rx="12" fill="var(--card-bg)" stroke="var(--card-border)" />
      {/* Width input */}
      <text x="40" y="45" fill="var(--text-muted)" fontSize="10" fontFamily="sans-serif">Width</text>
      <rect x="40" y="50" width="100" height="28" rx="4" fill="none" stroke="var(--card-border)" />
      <text x="90" y="69" textAnchor="middle" fill="var(--gold)" fontSize="13" fontFamily="monospace">1280</text>
      {/* Height input */}
      <text x="180" y="45" fill="var(--text-muted)" fontSize="10" fontFamily="sans-serif">Height</text>
      <rect x="180" y="50" width="100" height="28" rx="4" fill="none" stroke="var(--card-border)" />
      <text x="230" y="69" textAnchor="middle" fill="var(--gold)" fontSize="13" fontFamily="monospace">720</text>
      {/* Presets */}
      <rect x="40" y="95" width="50" height="24" rx="4" fill="var(--gold-dim)" stroke="var(--gold)" strokeWidth="1" />
      <text x="65" y="111" textAnchor="middle" fill="var(--gold)" fontSize="10" fontFamily="sans-serif">HD</text>
      <rect x="100" y="95" width="50" height="24" rx="4" fill="none" stroke="var(--card-border)" />
      <text x="125" y="111" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontFamily="sans-serif">FHD</text>
      <rect x="160" y="95" width="50" height="24" rx="4" fill="none" stroke="var(--card-border)" />
      <text x="185" y="111" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontFamily="sans-serif">2K</text>
      {/* Quality slider */}
      <text x="40" y="145" fill="var(--text-muted)" fontSize="10" fontFamily="sans-serif">Quality: 85%</text>
      <rect x="40" y="152" width="200" height="4" rx="2" fill="var(--range-track)" />
      <rect x="40" y="152" width="140" height="4" rx="2" fill="var(--gold)" />
      <circle cx="180" cy="154" r="7" fill="var(--gold)" />
    </svg>
  );
}

function ResultIllust() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img">
      <rect width="320" height="180" rx="12" fill="var(--card-bg)" stroke="var(--card-border)" />
      {/* Before */}
      <rect x="20" y="25" width="125" height="90" rx="6" fill="var(--gold-dim)" stroke="var(--card-border)" />
      <text x="82" y="20" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="sans-serif">Original</text>
      <text x="82" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="monospace">3000×2000</text>
      <text x="82" y="95" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="sans-serif">4.2 MB</text>
      {/* Arrow */}
      <path d="M160 70h20" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
      <path d="M175 65l8 5-8 5" fill="var(--gold)" />
      {/* After */}
      <rect x="195" y="35" width="105" height="70" rx="6" fill="var(--gold-dim)" stroke="var(--gold)" strokeWidth="1.5" />
      <text x="247" y="30" textAnchor="middle" fill="var(--gold)" fontSize="9" fontFamily="sans-serif">Result</text>
      <text x="247" y="75" textAnchor="middle" fill="var(--gold)" fontSize="11" fontFamily="monospace">1280×720</text>
      <text x="247" y="92" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="sans-serif">320 KB</text>
      {/* Download button */}
      <rect x="100" y="140" width="120" height="28" rx="6" fill="var(--gold)" />
      <text x="160" y="158" textAnchor="middle" fill="var(--bg-deep)" fontSize="11" fontWeight="600" fontFamily="sans-serif">Download</text>
    </svg>
  );
}

function FormatIllust() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img">
      <rect width="320" height="180" rx="12" fill="var(--card-bg)" stroke="var(--card-border)" />
      {/* Format options */}
      <rect x="40" y="40" width="70" height="36" rx="6" fill="var(--gold-dim)" stroke="var(--gold)" strokeWidth="1.5" />
      <text x="75" y="63" textAnchor="middle" fill="var(--gold)" fontSize="13" fontWeight="600" fontFamily="sans-serif">JPG</text>
      <rect x="125" y="40" width="70" height="36" rx="6" fill="none" stroke="var(--card-border)" />
      <text x="160" y="63" textAnchor="middle" fill="var(--text-muted)" fontSize="13" fontFamily="sans-serif">PNG</text>
      <rect x="210" y="40" width="70" height="36" rx="6" fill="none" stroke="var(--card-border)" />
      <text x="245" y="63" textAnchor="middle" fill="var(--text-muted)" fontSize="13" fontFamily="sans-serif">WebP</text>
      {/* Arrow */}
      <text x="60" y="110" fill="var(--text-muted)" fontSize="10" fontFamily="sans-serif">HEIC</text>
      <path d="M100 107h40" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
      <path d="M135 102l8 5-8 5" fill="var(--gold)" />
      <text x="155" y="110" fill="var(--gold)" fontSize="10" fontWeight="600" fontFamily="sans-serif">JPG</text>
      <text x="40" y="145" fill="var(--text-muted)" fontSize="9" fontFamily="sans-serif">-65% file size</text>
      <rect x="40" y="150" width="240" height="6" rx="3" fill="var(--range-track)" />
      <rect x="40" y="150" width="85" height="6" rx="3" fill="var(--gold)" />
    </svg>
  );
}

function AIProcessIllust() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img">
      <rect width="320" height="180" rx="12" fill="var(--card-bg)" stroke="var(--card-border)" />
      {/* Person silhouette with bg */}
      <rect x="30" y="25" width="110" height="120" rx="6" fill="var(--gold-dim)" />
      <ellipse cx="85" cy="55" rx="20" ry="22" fill="var(--text-muted)" opacity="0.3" />
      <rect x="65" y="75" width="40" height="50" rx="4" fill="var(--text-muted)" opacity="0.3" />
      <text x="85" y="162" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="sans-serif">Before</text>
      {/* AI processing arrow */}
      <path d="M155 85h25" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
      <path d="M175 80l8 5-8 5" fill="var(--gold)" />
      <text x="168" y="75" textAnchor="middle" fill="var(--gold)" fontSize="8" fontFamily="sans-serif">AI</text>
      {/* Person without bg */}
      <rect x="195" y="25" width="110" height="120" rx="6" fill="none" stroke="var(--card-border)" strokeDasharray="4 2" />
      <ellipse cx="250" cy="55" rx="20" ry="22" fill="var(--gold)" opacity="0.3" />
      <rect x="230" y="75" width="40" height="50" rx="4" fill="var(--gold)" opacity="0.3" />
      <text x="250" y="162" textAnchor="middle" fill="var(--gold)" fontSize="9" fontFamily="sans-serif">After</text>
    </svg>
  );
}

function CropIllust() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img">
      <rect width="320" height="180" rx="12" fill="var(--card-bg)" stroke="var(--card-border)" />
      {/* Image area */}
      <rect x="60" y="20" width="200" height="130" rx="6" fill="var(--gold-dim)" opacity="0.3" />
      {/* Crop selection */}
      <rect x="90" y="35" width="140" height="90" rx="2" stroke="var(--gold)" strokeWidth="2" fill="var(--gold-dim)" />
      {/* Corner handles */}
      <rect x="86" y="31" width="8" height="8" rx="1" fill="var(--gold)" />
      <rect x="226" y="31" width="8" height="8" rx="1" fill="var(--gold)" />
      <rect x="86" y="121" width="8" height="8" rx="1" fill="var(--gold)" />
      <rect x="226" y="121" width="8" height="8" rx="1" fill="var(--gold)" />
      {/* Ratio label */}
      <rect x="120" y="155" width="80" height="20" rx="4" fill="var(--gold-dim)" stroke="var(--gold)" strokeWidth="1" />
      <text x="160" y="169" textAnchor="middle" fill="var(--gold)" fontSize="10" fontFamily="sans-serif">16 : 9</text>
    </svg>
  );
}

function BatchIllust() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img">
      <rect width="320" height="180" rx="12" fill="var(--card-bg)" stroke="var(--card-border)" />
      {/* Multiple file rows */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="30" y={28 + i * 32} width="24" height="24" rx="4" fill="var(--gold-dim)" />
          <rect x="64" y={33 + i * 32} width="80" height="6" rx="3" fill="var(--text-muted)" opacity="0.3" />
          <rect x="64" y={43 + i * 32} width="50" height="4" rx="2" fill="var(--text-muted)" opacity="0.15" />
          {/* Status */}
          <circle cx="280" cy={40 + i * 32} r={8} fill={i < 3 ? 'var(--green)' : 'var(--gold-dim)'} opacity={i < 3 ? 0.2 : 1} />
          {i < 3 && <path d={`M276 ${40 + i * 32}l3 3 5-6`} stroke="var(--green)" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
        </g>
      ))}
      {/* Progress */}
      <rect x="30" y="158" width="260" height="6" rx="3" fill="var(--range-track)" />
      <rect x="30" y="158" width="195" height="6" rx="3" fill="var(--gold)" />
      <text x="160" y="152" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="sans-serif">3/4 processed</text>
    </svg>
  );
}

const illustrations = {
  upload: UploadIllust,
  settings: SettingsIllust,
  result: ResultIllust,
  format: FormatIllust,
  ai: AIProcessIllust,
  crop: CropIllust,
  batch: BatchIllust,
};

/* ── Step data per tool ── */

const howToData = {
  resize: {
    ko: {
      seoTitle: '이미지 리사이즈 사용법',
      steps: [
        { illust: 'upload', title: '이미지 업로드', desc: '리사이즈할 이미지를 드래그하거나 클릭하여 업로드합니다. JPG, PNG, WebP, GIF, BMP, HEIC 형식을 지원합니다.', alt: 'Pixkit 무료 이미지 리사이즈 도구에 사진 파일을 드래그 앤 드롭으로 업로드하는 화면', caption: '설치 없이 브라우저에서 바로 이미지를 업로드할 수 있다' },
        { illust: 'settings', title: '크기 설정', desc: '원하는 너비와 높이를 직접 입력하거나, HD(1280×720), FHD(1920×1080), Instagram(1080×1080) 등 프리셋 버튼을 클릭합니다. 비율 잠금으로 가로세로 비율을 유지할 수 있습니다.', alt: '이미지 리사이즈 크기 설정 패널 — 너비 높이 입력과 HD FHD 프리셋 버튼', caption: '프리셋 버튼으로 SNS별 권장 사이즈를 한 번에 적용할 수 있다' },
        { illust: 'result', title: '결과 확인 및 다운로드', desc: '리사이즈 버튼을 누르면 원본과 결과를 나란히 비교할 수 있습니다. 파일 크기 변화를 확인하고, 만족스러우면 다운로드합니다. JPG, PNG, WebP 중 출력 형식을 선택할 수 있습니다.', alt: '이미지 리사이즈 전후 비교 — 원본 3000x2000 4.2MB에서 1280x720 320KB로 축소된 결과', caption: '원본과 결과를 나란히 비교하고 파일 크기 절감률을 확인할 수 있다' },
      ],
    },
    en: {
      seoTitle: 'How to Resize Images',
      steps: [
        { illust: 'upload', title: 'Upload your image', desc: 'Drag and drop or click to upload the image you want to resize. Supports JPG, PNG, WebP, GIF, BMP, and HEIC formats.', alt: 'Upload a photo to Pixkit free online image resizer by dragging and dropping', caption: 'Upload images directly in your browser — no installation needed' },
        { illust: 'settings', title: 'Set dimensions', desc: 'Enter your desired width and height, or click a preset button like HD (1280×720), FHD (1920×1080), or Instagram (1080×1080). Lock aspect ratio to maintain proportions automatically.', alt: 'Image resize settings panel showing width height inputs and HD FHD preset buttons', caption: 'Preset buttons let you apply platform-specific sizes in one click' },
        { illust: 'result', title: 'Preview and download', desc: 'Click Resize to compare original and result side by side. Check the file size reduction, then download in your preferred format — JPG, PNG, or WebP.', alt: 'Before and after image resize comparison — original 3000x2000 4.2MB reduced to 1280x720 320KB', caption: 'Compare original and result side by side with file size savings displayed' },
      ],
    },
    ja: {
      seoTitle: '画像リサイズの使い方',
      steps: [
        { illust: 'upload', title: '画像をアップロード', desc: 'リサイズしたい画像をドラッグ＆ドロップまたはクリックしてアップロードします。JPG、PNG、WebP、GIF、BMP、HEIC形式に対応。', alt: 'Pixkit無料画像リサイズツールに写真をドラッグ＆ドロップでアップロードする画面', caption: 'インストール不要、ブラウザから直接アップロード可能' },
        { illust: 'settings', title: 'サイズを設定', desc: '幅と高さを入力するか、HD（1280×720）、FHD（1920×1080）などのプリセットボタンをクリック。アスペクト比ロックで比率を維持できます。', alt: '画像リサイズ設定パネル — 幅・高さ入力とHD・FHDプリセットボタン', caption: 'プリセットボタンでSNS推奨サイズをワンクリック適用' },
        { illust: 'result', title: '結果を確認してダウンロード', desc: 'リサイズボタンを押すと元画像と結果を並べて比較できます。ファイルサイズの変化を確認し、JPG、PNG、WebPから出力形式を選んでダウンロード。', alt: 'リサイズ前後の比較 — 元画像3000x2000 4.2MBから1280x720 320KBに縮小', caption: '元画像と結果を並べて比較、ファイルサイズ削減率も確認できる' },
      ],
    },
    zh: {
      seoTitle: '图片调整大小使用方法',
      steps: [
        { illust: 'upload', title: '上传图片', desc: '拖拽或点击上传要调整大小的图片。支持JPG、PNG、WebP、GIF、BMP、HEIC格式。', alt: '在Pixkit免费在线图片调整工具中通过拖放上传照片', caption: '无需安装，直接在浏览器中上传图片' },
        { illust: 'settings', title: '设置尺寸', desc: '输入宽度和高度，或点击HD（1280×720）、FHD（1920×1080）等预设按钮。锁定宽高比可自动保持比例。', alt: '图片调整大小设置面板 — 宽高输入框和HD FHD预设按钮', caption: '预设按钮一键应用各平台推荐尺寸' },
        { illust: 'result', title: '预览并下载', desc: '点击调整按钮后可并排比较原图和结果。确认文件大小变化后，选择JPG、PNG或WebP格式下载。', alt: '调整大小前后对比 — 原图3000x2000 4.2MB缩小为1280x720 320KB', caption: '并排比较原图与结果，显示文件大小节省比例' },
      ],
    },
    fr: {
      seoTitle: 'Comment redimensionner des images',
      steps: [
        { illust: 'upload', title: 'Téléchargez votre image', desc: 'Glissez-déposez ou cliquez pour télécharger. Supporte JPG, PNG, WebP, GIF, BMP et HEIC.', alt: 'Téléchargement d\'une image dans l\'outil de redimensionnement gratuit Pixkit par glisser-déposer', caption: 'Téléchargez directement depuis votre navigateur — aucune installation requise' },
        { illust: 'settings', title: 'Définissez les dimensions', desc: 'Entrez la largeur et la hauteur souhaitées, ou cliquez sur un préréglage comme HD (1280×720) ou FHD (1920×1080).', alt: 'Panneau de réglage du redimensionnement avec champs largeur/hauteur et boutons préréglés HD FHD', caption: 'Les préréglages appliquent les tailles recommandées en un clic' },
        { illust: 'result', title: 'Aperçu et téléchargement', desc: 'Cliquez sur Redimensionner pour comparer l\'original et le résultat côte à côte. Téléchargez en JPG, PNG ou WebP.', alt: 'Comparaison avant/après redimensionnement — original 3000x2000 réduit à 1280x720', caption: 'Comparez original et résultat côte à côte avec la réduction de taille affichée' },
      ],
    },
    es: {
      seoTitle: 'Cómo redimensionar imágenes',
      steps: [
        { illust: 'upload', title: 'Sube tu imagen', desc: 'Arrastra y suelta o haz clic para subir. Soporta JPG, PNG, WebP, GIF, BMP y HEIC.', alt: 'Subir una foto a la herramienta gratuita de redimensionamiento Pixkit arrastrando y soltando', caption: 'Sube imágenes directamente en tu navegador — sin instalación' },
        { illust: 'settings', title: 'Configura las dimensiones', desc: 'Ingresa el ancho y alto deseados, o haz clic en un preset como HD (1280×720) o FHD (1920×1080).', alt: 'Panel de configuración de redimensionamiento con campos de ancho/alto y botones preset HD FHD', caption: 'Los presets aplican tamaños recomendados con un clic' },
        { illust: 'result', title: 'Vista previa y descarga', desc: 'Haz clic en Redimensionar para comparar original y resultado lado a lado. Descarga en JPG, PNG o WebP.', alt: 'Comparación antes/después del redimensionamiento — original 3000x2000 reducido a 1280x720', caption: 'Compara original y resultado lado a lado con el ahorro de tamaño mostrado' },
      ],
    },
  },
  convert: {
    ko: {
      seoTitle: '이미지 형식 변환 사용법',
      steps: [
        { illust: 'upload', title: '이미지 업로드', desc: '변환할 이미지를 드래그하거나 클릭하여 업로드합니다. HEIC(아이폰), JPG, PNG, WebP, GIF, BMP 형식을 모두 지원합니다.', alt: 'Pixkit 무료 이미지 형식 변환 도구에 HEIC 사진을 업로드하는 화면', caption: '아이폰 HEIC 파일도 별도 프로그램 없이 바로 업로드 가능하다' },
        { illust: 'format', title: '출력 형식 선택', desc: '변환하고 싶은 형식(JPG, PNG, WebP)을 선택합니다. 품질 슬라이더로 파일 크기와 화질의 균형을 조절할 수 있습니다.', alt: 'HEIC에서 JPG로 변환하는 형식 선택 패널 — JPG PNG WebP 옵션과 품질 슬라이더', caption: 'HEIC → JPG 변환으로 파일 크기를 최대 65% 줄일 수 있다' },
        { illust: 'result', title: '변환 결과 다운로드', desc: '변환 버튼을 누르면 즉시 처리됩니다. 원본과 결과의 용량 차이를 확인하고 다운로드합니다. 모든 처리는 브라우저에서 이루어져 파일이 서버로 전송되지 않습니다.', alt: '이미지 형식 변환 완료 후 원본과 결과 파일 크기 비교 화면', caption: '변환 결과를 즉시 확인하고 다운로드할 수 있다' },
      ],
    },
    en: {
      seoTitle: 'How to Convert Image Formats',
      steps: [
        { illust: 'upload', title: 'Upload your image', desc: 'Drag and drop or click to upload. Supports HEIC (iPhone), JPG, PNG, WebP, GIF, and BMP formats.', alt: 'Upload a HEIC photo to Pixkit free image format converter', caption: 'iPhone HEIC files can be uploaded directly — no extra software needed' },
        { illust: 'format', title: 'Select output format', desc: 'Choose your target format — JPG, PNG, or WebP. Use the quality slider to balance file size and image quality.', alt: 'Format selection panel for HEIC to JPG conversion showing JPG PNG WebP options and quality slider', caption: 'HEIC → JPG conversion can reduce file size by up to 65%' },
        { illust: 'result', title: 'Download converted file', desc: 'Click Convert and the result is ready instantly. Compare file sizes and download. All processing happens in your browser — no files are sent to any server.', alt: 'Image format conversion complete showing before and after file size comparison', caption: 'Instantly preview the converted result and download' },
      ],
    },
    ja: { seoTitle: '画像形式変換の使い方', steps: [
      { illust: 'upload', title: '画像をアップロード', desc: 'ドラッグ＆ドロップまたはクリックでアップロード。HEIC（iPhone）、JPG、PNG、WebP、GIF、BMP対応。', alt: 'Pixkit無料画像形式変換ツールにHEIC写真をアップロード', caption: 'iPhoneのHEICファイルもそのままアップロード可能' },
      { illust: 'format', title: '出力形式を選択', desc: 'JPG、PNG、WebPから変換先を選択。品質スライダーでサイズと画質のバランスを調整。', alt: 'HEIC→JPG変換の形式選択パネル', caption: 'HEIC→JPG変換でファイルサイズを最大65%削減' },
      { illust: 'result', title: '変換結果をダウンロード', desc: '変換ボタンを押すと即座に処理完了。ファイルサイズを比較してダウンロード。', alt: '画像形式変換完了後のファイルサイズ比較画面', caption: '変換結果を即座に確認してダウンロード可能' },
    ]},
    zh: { seoTitle: '图片格式转换使用方法', steps: [
      { illust: 'upload', title: '上传图片', desc: '拖拽或点击上传。支持HEIC（iPhone）、JPG、PNG、WebP、GIF、BMP格式。', alt: '在Pixkit免费图片格式转换工具中上传HEIC照片', caption: 'iPhone HEIC文件可直接上传，无需额外软件' },
      { illust: 'format', title: '选择输出格式', desc: '选择目标格式JPG、PNG或WebP。使用质量滑块平衡文件大小和画质。', alt: 'HEIC转JPG格式选择面板', caption: 'HEIC→JPG转换最多可减小65%文件大小' },
      { illust: 'result', title: '下载转换结果', desc: '点击转换后即时处理完成。比较文件大小后下载。', alt: '图片格式转换完成后的文件大小对比', caption: '即时预览转换结果并下载' },
    ]},
    fr: { seoTitle: 'Comment convertir des formats d\'image', steps: [
      { illust: 'upload', title: 'Téléchargez votre image', desc: 'Glissez-déposez ou cliquez. Supporte HEIC (iPhone), JPG, PNG, WebP, GIF, BMP.', alt: 'Téléchargement d\'un fichier HEIC dans le convertisseur Pixkit', caption: 'Les fichiers HEIC iPhone sont pris en charge directement' },
      { illust: 'format', title: 'Sélectionnez le format', desc: 'Choisissez JPG, PNG ou WebP. Ajustez le curseur de qualité.', alt: 'Panneau de sélection HEIC vers JPG avec options de format', caption: 'La conversion HEIC→JPG réduit la taille jusqu\'à 65%' },
      { illust: 'result', title: 'Téléchargez le résultat', desc: 'Cliquez sur Convertir pour un traitement instantané. Comparez et téléchargez.', alt: 'Conversion terminée avec comparaison de taille', caption: 'Aperçu instantané du résultat converti' },
    ]},
    es: { seoTitle: 'Cómo convertir formatos de imagen', steps: [
      { illust: 'upload', title: 'Sube tu imagen', desc: 'Arrastra y suelta o haz clic. Soporta HEIC (iPhone), JPG, PNG, WebP, GIF, BMP.', alt: 'Subir un archivo HEIC al convertidor gratuito Pixkit', caption: 'Los archivos HEIC de iPhone se admiten directamente' },
      { illust: 'format', title: 'Selecciona el formato', desc: 'Elige JPG, PNG o WebP. Ajusta el control de calidad.', alt: 'Panel de selección de formato HEIC a JPG con opciones', caption: 'La conversión HEIC→JPG reduce el tamaño hasta un 65%' },
      { illust: 'result', title: 'Descarga el resultado', desc: 'Haz clic en Convertir para procesamiento instantáneo. Compara y descarga.', alt: 'Conversión completada con comparación de tamaño', caption: 'Vista previa instantánea del resultado convertido' },
    ]},
  },
  'remove-bg': {
    ko: {
      seoTitle: 'AI 배경 제거 사용법',
      steps: [
        { illust: 'upload', title: '이미지 업로드', desc: '배경을 제거할 이미지를 업로드합니다. 인물, 제품, 동물 등 다양한 피사체를 지원합니다.', alt: 'Pixkit AI 배경 제거 도구에 배경을 제거할 사진을 업로드하는 화면', caption: '인물 사진, 상품 이미지, 동물 사진 등 다양한 이미지에 사용 가능하다' },
        { illust: 'ai', title: 'AI 자동 배경 제거', desc: '배경 제거 버튼을 누르면 AI가 피사체를 인식하여 배경을 자동으로 분리합니다. 최초 사용 시 AI 모델 로딩에 약 30초가 소요됩니다. 이후에는 캐시되어 빠르게 처리됩니다.', alt: 'AI 딥러닝 모델이 인물 사진의 배경을 자동으로 인식하고 제거하는 과정', caption: 'AI가 피사체 윤곽을 자동으로 감지하여 배경만 깔끔하게 제거한다' },
        { illust: 'result', title: '배경 선택 및 다운로드', desc: '투명, 흰색, 검정, 또는 원하는 색상의 배경을 선택합니다. 수동 편집 모드에서 지우개와 복원 브러시로 세밀하게 보정한 뒤 PNG 또는 JPG로 다운로드합니다.', alt: '배경 제거 완료 후 투명 배경 흰색 배경 선택 및 수동 브러시 편집 화면', caption: '자동 제거 후 수동 브러시로 머리카락 등 세밀한 영역을 보정할 수 있다' },
      ],
    },
    en: {
      seoTitle: 'How to Remove Image Backgrounds with AI',
      steps: [
        { illust: 'upload', title: 'Upload your image', desc: 'Upload the image you want to remove the background from. Works with people, products, animals, and more.', alt: 'Upload a photo to Pixkit AI background removal tool', caption: 'Works with portraits, product photos, animal images, and more' },
        { illust: 'ai', title: 'AI removes background', desc: 'Click Remove Background and the AI detects the subject and separates it from the background automatically. The first use takes about 30 seconds to load the AI model — subsequent uses are instant.', alt: 'AI deep learning model automatically detecting and removing background from a portrait photo', caption: 'AI detects the subject outline and cleanly removes only the background' },
        { illust: 'result', title: 'Choose background and download', desc: 'Select transparent, white, black, or custom color background. Use manual edit mode with eraser and restore brushes for fine-tuning, then download as PNG or JPG.', alt: 'Background removal complete with transparent and white background options and manual brush editing', caption: 'Fine-tune edges like hair with the manual brush after automatic removal' },
      ],
    },
    ja: { seoTitle: 'AI背景除去の使い方', steps: [
      { illust: 'upload', title: '画像をアップロード', desc: '背景を除去したい画像をアップロード。人物、製品、動物など対応。', alt: 'Pixkit AI背景除去ツールに写真をアップロード', caption: 'ポートレート、商品画像、動物写真など幅広く対応' },
      { illust: 'ai', title: 'AIが背景を自動除去', desc: '背景除去ボタンを押すとAIが被写体を認識し自動分離。初回はモデル読み込みに約30秒。', alt: 'AIディープラーニングモデルがポートレート写真の背景を自動検出・除去', caption: 'AIが被写体の輪郭を自動検出し背景だけを除去' },
      { illust: 'result', title: '背景を選んでダウンロード', desc: '透明、白、黒、カスタム色の背景を選択。手動編集で細部を修正しPNG/JPGでダウンロード。', alt: '背景除去完了後の透明・白背景オプションとブラシ編集画面', caption: '自動除去後にブラシで髪の毛など細部を修正可能' },
    ]},
    zh: { seoTitle: 'AI背景移除使用方法', steps: [
      { illust: 'upload', title: '上传图片', desc: '上传要移除背景的图片。支持人物、产品、动物等。', alt: '在Pixkit AI背景移除工具中上传照片', caption: '支持人像、产品图、动物照片等多种图片' },
      { illust: 'ai', title: 'AI自动移除背景', desc: '点击移除背景，AI识别主体并自动分离。首次使用约需30秒加载模型。', alt: 'AI深度学习模型自动检测并移除人像背景', caption: 'AI自动检测主体轮廓，只移除背景' },
      { illust: 'result', title: '选择背景并下载', desc: '选择透明、白色、黑色或自定义颜色背景。用手动画笔精修后下载PNG/JPG。', alt: '背景移除完成后的透明和白色背景选项及画笔编辑', caption: '自动移除后用画笔精修头发等细节' },
    ]},
    fr: { seoTitle: 'Comment supprimer un fond avec l\'IA', steps: [
      { illust: 'upload', title: 'Téléchargez votre image', desc: 'Téléchargez l\'image. Fonctionne avec personnes, produits, animaux.', alt: 'Téléchargement dans l\'outil de suppression de fond IA Pixkit', caption: 'Fonctionne avec portraits, produits et animaux' },
      { illust: 'ai', title: 'L\'IA supprime le fond', desc: 'Cliquez et l\'IA détecte le sujet automatiquement. Premier chargement ~30 secondes.', alt: 'L\'IA détecte et supprime automatiquement l\'arrière-plan d\'un portrait', caption: 'L\'IA détecte le contour du sujet et supprime le fond' },
      { illust: 'result', title: 'Choisissez le fond et téléchargez', desc: 'Sélectionnez transparent, blanc, noir ou couleur personnalisée. Affinez avec le pinceau puis téléchargez.', alt: 'Suppression de fond terminée avec options et édition manuelle', caption: 'Affinez les bords comme les cheveux avec le pinceau' },
    ]},
    es: { seoTitle: 'Cómo eliminar fondos con IA', steps: [
      { illust: 'upload', title: 'Sube tu imagen', desc: 'Sube la imagen. Funciona con personas, productos, animales.', alt: 'Subir foto a la herramienta de eliminación de fondo IA Pixkit', caption: 'Funciona con retratos, productos y animales' },
      { illust: 'ai', title: 'La IA elimina el fondo', desc: 'Haz clic y la IA detecta el sujeto automáticamente. Primera carga ~30 segundos.', alt: 'La IA detecta y elimina automáticamente el fondo de un retrato', caption: 'La IA detecta el contorno del sujeto y elimina el fondo' },
      { illust: 'result', title: 'Elige fondo y descarga', desc: 'Selecciona transparente, blanco, negro o color personalizado. Refina con el pincel y descarga.', alt: 'Eliminación de fondo completada con opciones y edición manual', caption: 'Refina bordes como cabello con el pincel manual' },
    ]},
  },
  crop: {
    ko: {
      seoTitle: '이미지 크롭 사용법',
      steps: [
        { illust: 'upload', title: '이미지 업로드', desc: '자르고 싶은 이미지를 드래그하거나 클릭하여 업로드합니다.', alt: 'Pixkit 무료 이미지 크롭 도구에 사진을 업로드하는 화면', caption: '브라우저에서 바로 이미지를 업로드하고 자를 수 있다' },
        { illust: 'crop', title: '크롭 영역 선택', desc: '마우스나 터치로 자르고 싶은 영역을 드래그합니다. 자유 비율 또는 1:1, 16:9, 4:3 등 고정 비율을 선택할 수 있습니다. 모서리 핸들을 드래그하여 정밀하게 조절합니다.', alt: '이미지에서 16:9 비율로 크롭 영역을 드래그하여 선택하는 화면 — 모서리 핸들 조절', caption: '비율 고정 옵션으로 유튜브 썸네일(16:9), 인스타 포스트(1:1) 등 정확한 비율 크롭이 가능하다' },
        { illust: 'result', title: '크롭 적용 및 다운로드', desc: '크롭 적용 버튼을 누르면 선택한 영역만 잘라냅니다. 원본 화질이 그대로 유지되며, 결과를 확인하고 다운로드합니다.', alt: '크롭 적용 후 선택 영역만 잘린 결과 이미지 — 원본 화질 유지', caption: '크롭은 원본 픽셀을 유지하므로 화질 손실이 전혀 없다' },
      ],
    },
    en: {
      seoTitle: 'How to Crop Images',
      steps: [
        { illust: 'upload', title: 'Upload your image', desc: 'Drag and drop or click to upload the image you want to crop.', alt: 'Upload a photo to Pixkit free online image cropping tool', caption: 'Upload and crop images directly in your browser' },
        { illust: 'crop', title: 'Select crop area', desc: 'Drag to select your crop area. Choose free-form or fixed ratios like 1:1, 16:9, or 4:3. Drag corner handles for precise adjustment.', alt: 'Selecting a 16:9 crop area on an image by dragging with corner handles', caption: 'Fixed ratio options let you crop for YouTube thumbnails (16:9), Instagram posts (1:1), and more' },
        { illust: 'result', title: 'Apply and download', desc: 'Click Apply Crop to cut the selected area. Original quality is fully preserved. Preview and download your cropped image.', alt: 'Cropped result image showing only the selected area with original quality preserved', caption: 'Cropping preserves original pixels — zero quality loss' },
      ],
    },
    ja: { seoTitle: '画像クロップの使い方', steps: [
      { illust: 'upload', title: '画像をアップロード', desc: '切り取りたい画像をドラッグ＆ドロップまたはクリックでアップロード。', alt: 'Pixkit無料画像クロップツールに写真をアップロード', caption: 'ブラウザから直接アップロードしてクロップ可能' },
      { illust: 'crop', title: 'クロップ領域を選択', desc: 'ドラッグで領域を選択。自由比率または1:1、16:9、4:3など固定比率を選択可能。', alt: '16:9比率でクロップ領域をドラッグ選択する画面', caption: '固定比率でYouTubeサムネイル（16:9）やInstagram（1:1）に最適なクロップが可能' },
      { illust: 'result', title: 'クロップ適用してダウンロード', desc: 'クロップ適用ボタンで選択領域だけ切り取り。元の画質を維持したままダウンロード。', alt: 'クロップ適用後の結果画像 — 元の画質維持', caption: 'クロップは元のピクセルを維持するため画質低下ゼロ' },
    ]},
    zh: { seoTitle: '图片裁剪使用方法', steps: [
      { illust: 'upload', title: '上传图片', desc: '拖拽或点击上传要裁剪的图片。', alt: '在Pixkit免费图片裁剪工具中上传照片', caption: '在浏览器中直接上传和裁剪图片' },
      { illust: 'crop', title: '选择裁剪区域', desc: '拖拽选择区域。可选自由比例或1:1、16:9、4:3等固定比例。拖动角落手柄精确调整。', alt: '以16:9比例拖拽选择裁剪区域的画面', caption: '固定比例选项可精确裁剪YouTube缩略图（16:9）、Instagram帖子（1:1）等' },
      { illust: 'result', title: '应用裁剪并下载', desc: '点击应用裁剪只保留选中区域。原始画质完全保留，预览后下载。', alt: '裁剪后只保留选中区域的结果 — 原始画质保持', caption: '裁剪保留原始像素，零画质损失' },
    ]},
    fr: { seoTitle: 'Comment recadrer des images', steps: [
      { illust: 'upload', title: 'Téléchargez votre image', desc: 'Glissez-déposez ou cliquez pour télécharger l\'image à recadrer.', alt: 'Téléchargement dans l\'outil de recadrage gratuit Pixkit', caption: 'Téléchargez et recadrez directement dans le navigateur' },
      { illust: 'crop', title: 'Sélectionnez la zone', desc: 'Glissez pour sélectionner. Choisissez libre ou ratio fixe (1:1, 16:9, 4:3).', alt: 'Sélection d\'une zone de recadrage 16:9 avec poignées', caption: 'Options de ratio fixe pour YouTube (16:9), Instagram (1:1), etc.' },
      { illust: 'result', title: 'Appliquez et téléchargez', desc: 'Cliquez sur Appliquer pour couper la zone. Qualité originale préservée.', alt: 'Résultat recadré avec qualité originale préservée', caption: 'Le recadrage préserve les pixels originaux — zéro perte' },
    ]},
    es: { seoTitle: 'Cómo recortar imágenes', steps: [
      { illust: 'upload', title: 'Sube tu imagen', desc: 'Arrastra y suelta o haz clic para subir la imagen a recortar.', alt: 'Subir foto a la herramienta de recorte gratuita Pixkit', caption: 'Sube y recorta directamente en el navegador' },
      { illust: 'crop', title: 'Selecciona el área', desc: 'Arrastra para seleccionar. Elige forma libre o ratio fijo (1:1, 16:9, 4:3).', alt: 'Selección de área de recorte 16:9 con tiradores en las esquinas', caption: 'Opciones de ratio fijo para YouTube (16:9), Instagram (1:1), etc.' },
      { illust: 'result', title: 'Aplica y descarga', desc: 'Haz clic en Aplicar para cortar el área seleccionada. Calidad original preservada.', alt: 'Resultado recortado con calidad original preservada', caption: 'El recorte preserva los píxeles originales — cero pérdida' },
    ]},
  },
  batch: {
    ko: {
      seoTitle: '이미지 일괄 리사이즈 사용법',
      steps: [
        { illust: 'upload', title: '여러 이미지 업로드', desc: '리사이즈할 이미지 여러 장을 한 번에 드래그하거나 클릭하여 업로드합니다. 수십 장도 한꺼번에 올릴 수 있습니다.', alt: 'Pixkit 일괄 리사이즈 도구에 여러 장의 이미지를 한 번에 업로드하는 화면', caption: '여러 장의 이미지를 한 번에 드래그 앤 드롭으로 업로드할 수 있다' },
        { illust: 'settings', title: '공통 크기 설정', desc: '모든 이미지에 적용할 너비와 높이를 설정합니다. 프리셋 버튼으로 쇼핑몰 상품 이미지(1000×1000), SNS 프로필(400×400) 등의 크기를 빠르게 적용할 수 있습니다.', alt: '일괄 리사이즈 크기 설정 — 모든 이미지에 동일한 너비 높이를 한 번에 적용', caption: '한 번 설정하면 모든 이미지에 같은 크기가 자동 적용된다' },
        { illust: 'batch', title: '일괄 처리 및 다운로드', desc: '전체 리사이즈 버튼을 누르면 모든 이미지가 순차적으로 처리됩니다. 각 파일의 처리 상태와 용량 변화를 실시간으로 확인할 수 있으며, 완료 후 전체 ZIP으로 다운로드합니다.', alt: '여러 이미지가 순차적으로 리사이즈 처리되는 진행 상황 표시 화면 — 4장 중 3장 완료', caption: '파일별 처리 상태와 용량 변화를 실시간으로 확인할 수 있다' },
      ],
    },
    en: {
      seoTitle: 'How to Batch Resize Images',
      steps: [
        { illust: 'upload', title: 'Upload multiple images', desc: 'Drag and drop or click to upload multiple images at once. You can upload dozens of images in a single batch.', alt: 'Upload multiple images at once to Pixkit batch resize tool', caption: 'Drag and drop multiple images for batch processing' },
        { illust: 'settings', title: 'Set common dimensions', desc: 'Set the width and height to apply to all images. Use preset buttons for e-commerce (1000×1000) or social media profile (400×400) sizes.', alt: 'Batch resize settings — applying same width and height to all images at once', caption: 'Set once and the same size is automatically applied to all images' },
        { illust: 'batch', title: 'Process and download all', desc: 'Click Resize All to process every image sequentially. Track each file\'s status and size change in real-time, then download everything as a ZIP file.', alt: 'Multiple images being batch resized with progress indicator showing 3 of 4 completed', caption: 'Track per-file processing status and file size changes in real-time' },
      ],
    },
    ja: { seoTitle: '一括リサイズの使い方', steps: [
      { illust: 'upload', title: '複数画像をアップロード', desc: '複数の画像を一度にドラッグ＆ドロップまたはクリックでアップロード。', alt: 'Pixkit一括リサイズツールに複数画像を一度にアップロード', caption: '複数画像をまとめてドラッグ＆ドロップ' },
      { illust: 'settings', title: '共通サイズを設定', desc: 'すべての画像に適用する幅と高さを設定。プリセットボタンで素早く適用。', alt: '一括リサイズ設定 — すべての画像に同じサイズを一括適用', caption: '一度設定すればすべての画像に同じサイズが自動適用' },
      { illust: 'batch', title: '一括処理してダウンロード', desc: '全体リサイズボタンで順次処理。ファイルごとの状態とサイズ変化をリアルタイム確認後、ZIPでダウンロード。', alt: '複数画像の一括リサイズ処理中 — 4枚中3枚完了', caption: 'ファイルごとの処理状況とサイズ変化をリアルタイムで確認' },
    ]},
    zh: { seoTitle: '批量调整大小使用方法', steps: [
      { illust: 'upload', title: '上传多张图片', desc: '拖拽或点击一次上传多张图片。可同时上传数十张。', alt: '在Pixkit批量调整工具中一次上传多张图片', caption: '拖放多张图片进行批量处理' },
      { illust: 'settings', title: '设置统一尺寸', desc: '设置所有图片的统一宽高。使用预设按钮快速应用电商（1000×1000）或社交媒体尺寸。', alt: '批量调整设置 — 对所有图片应用相同尺寸', caption: '设置一次，所有图片自动应用相同尺寸' },
      { illust: 'batch', title: '批量处理并下载', desc: '点击全部调整后依次处理。实时查看每个文件的状态和大小变化，完成后ZIP下载。', alt: '多张图片批量调整进度 — 4张中已完成3张', caption: '实时追踪每个文件的处理状态和大小变化' },
    ]},
    fr: { seoTitle: 'Comment redimensionner par lot', steps: [
      { illust: 'upload', title: 'Téléchargez plusieurs images', desc: 'Glissez-déposez ou cliquez pour télécharger plusieurs images à la fois.', alt: 'Téléchargement de plusieurs images dans l\'outil de lot Pixkit', caption: 'Glissez-déposez plusieurs images pour le traitement par lot' },
      { illust: 'settings', title: 'Définissez les dimensions communes', desc: 'Définissez la taille à appliquer à toutes les images. Utilisez les préréglages pour e-commerce ou réseaux sociaux.', alt: 'Paramètres de lot — même taille appliquée à toutes les images', caption: 'Configurez une fois, la taille s\'applique automatiquement à tout' },
      { illust: 'batch', title: 'Traitez et téléchargez tout', desc: 'Cliquez pour traiter toutes les images. Suivez la progression en temps réel, puis téléchargez en ZIP.', alt: 'Progression du redimensionnement par lot — 3 sur 4 terminés', caption: 'Suivi en temps réel du statut et de la taille de chaque fichier' },
    ]},
    es: { seoTitle: 'Cómo redimensionar por lotes', steps: [
      { illust: 'upload', title: 'Sube múltiples imágenes', desc: 'Arrastra y suelta o haz clic para subir varias imágenes a la vez.', alt: 'Subir múltiples imágenes a la herramienta de lotes Pixkit', caption: 'Arrastra y suelta múltiples imágenes para procesamiento por lotes' },
      { illust: 'settings', title: 'Configura dimensiones comunes', desc: 'Establece el tamaño a aplicar a todas las imágenes. Usa presets para e-commerce o redes sociales.', alt: 'Configuración de lotes — mismo tamaño aplicado a todas las imágenes', caption: 'Configura una vez, el tamaño se aplica automáticamente a todo' },
      { illust: 'batch', title: 'Procesa y descarga todo', desc: 'Haz clic para procesar todas las imágenes. Sigue el progreso en tiempo real, luego descarga como ZIP.', alt: 'Progreso del redimensionamiento por lotes — 3 de 4 completados', caption: 'Seguimiento en tiempo real del estado y tamaño de cada archivo' },
    ]},
  },
};

const sectionLabel = {
  ko: '사용 방법', en: 'How to Use', ja: '使い方',
  zh: '使用方法', fr: 'Comment utiliser', es: 'Cómo usar',
};

const stepLabel = {
  ko: '단계', en: 'Step', ja: 'ステップ',
  zh: '步骤', fr: 'Étape', es: 'Paso',
};

export default function HowToUse({ tool }) {
  const locale = useLocale();
  const data = howToData[tool]?.[locale] || howToData[tool]?.en;
  if (!data) return null;

  const baseUrl = 'https://pixkit.app';
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const slug = tool;

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.seoTitle,
    url: `${baseUrl}${prefix}/${slug}`,
    step: data.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.desc,
      image: { '@type': 'ImageObject', name: s.alt },
    })),
  };

  return (
    <section className="mt-12 border-t border-card-border pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <h2 className="text-xl font-bold font-heading mb-8">
        {sectionLabel[locale] || sectionLabel.en}
      </h2>
      <div className="space-y-10">
        {data.steps.map((step, i) => {
          const Illust = illustrations[step.illust];
          return (
            <div key={i} className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Step number */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-bg-deep font-bold font-heading text-lg">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold font-heading mb-3">
                  <span className="text-gold mr-2">{stepLabel[locale] || stepLabel.en} {i + 1}.</span>
                  {step.title}
                </h3>
                {/* Illustration */}
                <figure className="mb-4">
                  <div className="rounded-lg overflow-hidden border border-card-border" role="img" aria-label={step.alt}>
                    {Illust && <Illust />}
                  </div>
                  <figcaption className="text-xs text-text-muted italic mt-2">
                    {step.caption}
                  </figcaption>
                </figure>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
