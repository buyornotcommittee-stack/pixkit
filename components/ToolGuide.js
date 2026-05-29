'use client';
import { useLocale } from 'next-intl';

const faqLabels = {
  ko: '자주 묻는 질문',
  en: 'Frequently Asked Questions',
  hi: 'अक्सर पूछे जाने वाले प्रश्न',
  ja: 'よくある質問',
  zh: '常见问题',
  fr: 'Questions Fréquentes',
  es: 'Preguntas Frecuentes',
};

const guides = {
  resize: {
    ko: {
      sections: [
        { h2: '이미지 리사이즈란?', body: '이미지 리사이즈(image resize)는 사진이나 그래픽 파일의 가로·세로 픽셀 수를 조정하는 작업으로, 사진 크기 변경이라고도 합니다. 픽셀 수를 줄이면 파일 용량이 작아져 웹 로딩 속도가 빨라지고 이메일 첨부도 간편해집니다. 반대로 픽셀을 늘리면 대형 출력물이나 고해상도 디스플레이에 대응할 수 있습니다. 구글 PageSpeed Insights 기준으로 이미지 크기 최적화는 페이지 속도에 영향을 주는 요소 중 가장 비중이 큽니다. Pixkit은 브라우저의 Canvas API를 이용해 기기 내에서만 처리하므로 파일이 서버로 전송되지 않아 개인 사진도 안심하고 이미지 리사이즈할 수 있습니다. 설치 없이 크롬·엣지·사파리 등 모든 최신 브라우저에서 바로 사용 가능합니다.' },
        { h2: '언제 이미지 리사이즈가 필요한가?', body: '사진 크기 변경이 필요한 상황은 생각보다 다양합니다. SNS 플랫폼마다 권장 규격이 다르고, 이메일 첨부는 보통 25MB 용량 제한이 있습니다. 쇼핑몰 상품 이미지를 통일된 규격으로 맞출 때, 블로그 포스팅에서 가로 900px 초과 이미지가 레이아웃을 깨뜨릴 때, 모바일 앱 아이콘처럼 정해진 픽셀이 필요할 때도 이미지 크기 줄이기가 필요합니다. 스마트폰 카메라 해상도가 1200만~5000만 화소에 달하는 요즘, 원본 그대로 업로드하면 서버·네트워크 비용이 낭비됩니다. 인쇄용 이미지는 A4 기준 최소 2480×3508px(300DPI)가 필요하므로, 용도에 맞는 크기로 조정하는 과정이 필수입니다.' },
        { h2: '플랫폼별 권장 이미지 사이즈 (2026)', body: '각 플랫폼이 최적 화질로 표시하는 기준 사이즈가 다릅니다. 인스타그램은 정방형 피드 1080×1080px, 가로 피드 1080×566px, 세로 피드 1080×1350px, 스토리·릴스 1080×1920px입니다. 유튜브 썸네일은 1280×720px(16:9), 채널 아트는 2560×1440px입니다. 네이버 블로그 본문 이미지는 900px 이하, 티스토리는 800px 이하를 권장합니다. 트위터/X 인라인 이미지는 1200×675px, 페이스북 포스트는 1200×630px, 링크드인 포스트는 1200×627px입니다. 카카오스토리는 1024×768px 권장입니다. Pixkit의 프리셋 버튼으로 주요 플랫폼 규격을 클릭 한 번에 설정할 수 있습니다.' },
        { h2: '화질 손상 없이 이미지 리사이즈하는 법', body: '이미지를 줄일 때는 픽셀이 제거되므로 화질 손실이 있지만, JPG 품질을 85 이상으로 유지하면 육안으로 구분하기 어렵습니다. 반대로 원본보다 크게 늘리면 픽셀을 보간해야 해서 흐릿해집니다. 원본 크기의 200% 이내로만 확대하는 것이 좋습니다. WebP 형식은 JPG 대비 25~34% 작은 파일 크기로 동등한 화질을 유지해 웹 이미지 최적화에 가장 효율적입니다. 완전한 무손실이 필요하다면 PNG로 출력하세요. 이미지를 원본의 50% 이하로 줄일 때는 한 번에 줄이기보다 단계적으로 축소하면 더 선명한 결과를 얻을 수 있으며, 원본 파일은 항상 별도로 보관하는 습관이 중요합니다.' },
        { h2: 'Pixkit으로 이미지 크기 변경하는 법', body: 'Pixkit 이미지 리사이즈 도구는 이미지를 드래그하거나 클릭해 업로드하면 원본 크기(너비×높이)가 바로 표시됩니다. 원하는 픽셀 값을 직접 입력하거나 비율 슬라이더로 50%·75%처럼 퍼센트 기준으로 조정할 수 있습니다. 비율 유지 체크박스를 켜면 너비 하나만 바꿔도 높이가 자동 계산됩니다. 프리셋 버튼으로 인스타그램·유튜브·링크드인 등 주요 플랫폼 사이즈를 클릭 한 번에 적용하고, 출력 형식(JPG·PNG·WebP)과 품질(1~100%)도 세밀하게 조절합니다. 여러 장을 한번에 처리하려면 일괄 처리 도구를 이용하세요. 처리 완료 후 원본과 결과물 크기·용량 비교가 즉시 표시되어 확인이 편리합니다.' },
      ],
      faqs: [
        { q: '이미지 리사이즈하면 화질이 떨어지나요?', a: '줄일 때는 품질 손실이 거의 없습니다. JPG 품질 80 이상이면 화면상 차이를 느끼기 어렵습니다. 반면 원본보다 크게 확대하면 흐릿해질 수 있으므로 원본 크기의 200% 이내로 작업하는 것을 권장합니다.' },
        { q: '무료로 이미지 크기를 변경할 수 있나요?', a: '네, Pixkit은 완전 무료입니다. 회원가입 없이 브라우저에서 바로 사용할 수 있으며, 처리 건수 제한도 없습니다. 파일은 서버에 저장되지 않습니다.' },
        { q: '여러 장을 한번에 리사이즈하려면?', a: 'Pixkit 일괄 처리 도구를 이용하면 수십 장을 동일한 설정으로 한 번에 변환하고 ZIP으로 다운로드할 수 있습니다. 쇼핑몰 상품 이미지처럼 많은 사진을 동일 규격으로 맞출 때 시간을 크게 절약합니다.' },
        { q: '리사이즈 후 원본 파일이 변경되나요?', a: '전혀 변경되지 않습니다. Pixkit은 브라우저 내에서만 작동하며 원본 파일을 수정하지 않습니다. 리사이즈된 결과물만 새 파일로 다운로드됩니다.' },
        { q: '최대 몇 픽셀까지 변경 가능한가요?', a: '별도의 픽셀 제한은 없습니다. 다만 브라우저 메모리 한계로 결과물이 10,000px 이상이 되면 처리가 불안정해질 수 있습니다. 일반적인 용도에서는 제한 없이 사용 가능합니다.' },
      ],
      links: [
        { text: '여러 장 일괄 처리', href: '/batch' },
        { text: '이미지 리사이즈 완벽 가이드', href: '/blog/image-resize-guide' },
        { text: 'SNS별 이미지 사이즈 가이드', href: '/blog/sns-image-size-guide' },
        { text: '이미지 용량 줄이는 법', href: '/blog/reduce-image-file-size' },
      ],
    },
    en: {
      sections: [
        { h2: 'How Image Resizing Works', body: 'Pixkit resizes images entirely in your browser using the Canvas API. Your files never leave your device, keeping personal photos private. Enter a width/height or pick a platform preset for instant results.' },
        { h2: 'Recommended Sizes by Platform', body: 'Instagram square: 1080×1080 px, YouTube thumbnail: 1280×720 px, Facebook cover: 820×312 px, Twitter header: 1500×500 px. All available as one-click presets in Pixkit.' },
        { h2: 'Tips to Reduce File Size', body: 'Set quality to 80–85% for web use — the difference is invisible on screen but cuts file size significantly. Choosing WebP output saves ~30% over JPG, which helps page load speed.' },
      ],
      faqs: [
        { q: 'Does resizing reduce image quality?', a: 'Downsizing causes minimal quality loss. Upscaling beyond the original resolution may add slight blur — stay within 200% of the original size.' },
        { q: 'Is my original file modified?', a: 'No. Pixkit only works in your browser. The original file is untouched; only the result is downloaded.' },
        { q: 'Can I resize multiple images at once?', a: 'Yes — use the Batch Resize tool to convert dozens of images to the same dimensions in one go.' },
        { q: 'Is there a file size limit?', a: 'No server upload means no strict limit. Very large files (50 MB+) may process slowly depending on your browser\'s available memory.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'इमेज रीसाइज़ कैसे काम करता है', body: 'Pixkit आपके ब्राउज़र में Canvas API का उपयोग करके इमेज का आकार बदलता है। आपकी फ़ाइलें कभी भी आपके डिवाइस से बाहर नहीं जातीं, जिससे व्यक्तिगत तस्वीरें सुरक्षित रहती हैं। चौड़ाई/ऊंचाई दर्ज करें या तुरंत परिणाम के लिए प्लेटफ़ॉर्म प्रीसेट चुनें।' },
        { h2: 'प्लेटफ़ॉर्म के अनुसार अनुशंसित आकार', body: 'Instagram स्क्वायर: 1080×1080 px, YouTube थंबनेल: 1280×720 px, Facebook कवर: 820×312 px, Twitter हेडर: 1500×500 px। ये सभी Pixkit में वन-क्लिक प्रीसेट के रूप में उपलब्ध हैं।' },
        { h2: 'फ़ाइल साइज़ कम करने के टिप्स', body: 'वेब उपयोग के लिए गुणवत्ता 80-85% पर सेट करें — स्क्रीन पर अंतर अदृश्य रहता है लेकिन फ़ाइल का आकार काफी कम हो जाता है। WebP आउटपुट चुनने से JPG की तुलना में ~30% की बचत होती है।' },
        { h2: 'अनुपात बनाए रखें बनाम जबरन बदलें', body: 'अनुपात लॉक सक्षम करने पर केवल चौड़ाई दर्ज करने से ऊंचाई स्वतः गणना होती है। बैनर विज्ञापन जैसे सटीक पिक्सेल आयाम के लिए लॉक हटाएं और दोनों मान दर्ज करें।' },
        { h2: 'सामान्य उपयोग के उदाहरण', body: 'ई-कॉमर्स उत्पाद छवियों को 800×800 px पर एकीकृत करें, ईमेल इनलाइन छवियों को 600 px से नीचे घटाएं, मोबाइल ऐप स्प्लैश स्क्रीन तैयार करें। ब्लॉग कवर इमेज को 1200 px चौड़ाई पर रखें ताकि सोशल शेयर प्रीव्यू स्पष्ट दिखे।' },
      ],
      faqs: [
        { q: 'क्या रीसाइज़ करने से इमेज की गुणवत्ता कम होती है?', a: 'आकार घटाने पर गुणवत्ता हानि न्यूनतम होती है। मूल रिज़ॉल्यूशन से अधिक बड़ा करने पर हल्का धुंधलापन आ सकता है — मूल आकार के 200% के भीतर रखें।' },
        { q: 'क्या मेरी मूल फ़ाइल बदल जाती है?', a: 'नहीं। Pixkit केवल आपके ब्राउज़र में काम करता है। मूल फ़ाइल अछूती रहती है; केवल परिणाम डाउनलोड होता है।' },
        { q: 'क्या एक साथ कई इमेज रीसाइज़ कर सकते हैं?', a: 'हां — बैच रीसाइज़ टूल का उपयोग करके एक ही बार में दर्जनों इमेज को समान आयामों में बदलें।' },
        { q: 'क्या फ़ाइल साइज़ की कोई सीमा है?', a: 'सर्वर अपलोड न होने से कोई सख्त सीमा नहीं है। बहुत बड़ी फ़ाइलें (50 MB+) ब्राउज़र की मेमोरी पर निर्भर करके धीरे प्रोसेस हो सकती हैं।' },
      ],
    },
    ja: {
      sections: [
        { h2: '画像リサイズの仕組み', body: 'PixkitはブラウザのCanvas APIを使って画像をリサイズします。画像はサーバーに送信されないため、プライベートな写真も安全に処理できます。' },
        { h2: 'プラットフォーム別推奨サイズ', body: 'Instagram正方形: 1080×1080 px、YouTubeサムネイル: 1280×720 px、Facebookカバー: 820×312 px。すべてPixkitのプリセットで即設定できます。' },
        { h2: 'ファイルサイズを小さくするコツ', body: 'Web用なら品質スライダーを80〜85に設定しても画質の差はほぼわかりません。WebP出力を選ぶとJPGより約30%容量を削減できます。' },
      ],
      faqs: [
        { q: 'リサイズすると画質が落ちますか？', a: '縮小の場合、品質低下はほとんどありません。拡大して元の解像度を超えると若干ぼやけることがあります。' },
        { q: '元のファイルは変更されますか？', a: 'いいえ。Pixkitはブラウザのみで動作し、元のファイルは変更されません。' },
        { q: '複数の画像を一度にリサイズできますか？', a: 'はい、一括リサイズツールを使うと数十枚を同時に変換できます。' },
      ],
    },
    zh: {
      sections: [
        { h2: '图片调整大小原理', body: 'Pixkit使用浏览器的Canvas API在本地调整图片尺寸，图片不会上传到服务器，您的隐私完全受保护。' },
        { h2: '各平台推荐尺寸', body: 'Instagram正方形: 1080×1080 px，YouTube缩略图: 1280×720 px，微信公众号封面: 900×383 px。Pixkit内置这些预设，一键即可设置。' },
        { h2: '缩小文件大小的技巧', body: '网页用途可将质量设为80-85%，视觉差异不明显但文件大小大幅减少。选择WebP格式比JPG节省约30%的空间。' },
      ],
      faqs: [
        { q: '调整大小会降低图片质量吗？', a: '缩小时质量损失极少。放大超出原始分辨率可能导致轻微模糊，建议不超过原始尺寸的200%。' },
        { q: '原始文件会被修改吗？', a: '不会。Pixkit只在浏览器中运行，原始文件不会被更改，只有结果文件会被下载。' },
        { q: '可以批量调整多张图片吗？', a: '可以，使用批量处理工具可以一次将数十张图片转换为相同尺寸。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Comment fonctionne le redimensionnement', body: 'Pixkit redimensionne les images directement dans votre navigateur via l\'API Canvas. Vos fichiers ne quittent jamais votre appareil, garantissant la confidentialité de vos photos.' },
        { h2: 'Tailles recommandées par plateforme', body: 'Instagram carré: 1080×1080 px, miniature YouTube: 1280×720 px, couverture Facebook: 820×312 px. Tous disponibles en un clic dans les préréglages Pixkit.' },
        { h2: 'Astuces pour réduire la taille du fichier', body: 'Réglez la qualité à 80-85% pour le web — la différence est invisible mais réduit significativement la taille. Choisir WebP économise ~30% par rapport au JPG.' },
      ],
      faqs: [
        { q: 'Le redimensionnement réduit-il la qualité ?', a: 'La réduction cause une perte de qualité minimale. Agrandir au-delà de la résolution originale peut ajouter un léger flou.' },
        { q: 'Mon fichier original est-il modifié ?', a: 'Non. Pixkit fonctionne uniquement dans le navigateur. Le fichier original reste intact.' },
        { q: 'Puis-je redimensionner plusieurs images à la fois ?', a: 'Oui — utilisez l\'outil de traitement par lots pour convertir des dizaines d\'images en une seule fois.' },
      ],
    },
    es: {
      sections: [
        { h2: '¿Qué es redimensionar una imagen?', body: 'Redimensionar imagen significa cambiar el tamaño de una foto ajustando su anchura y altura en píxeles. A diferencia del recorte, que elimina parte de la imagen, redimensionar imagen modifica el tamaño total manteniendo todo el contenido visible. Puedes redimensionar imagen online con Pixkit directamente en el navegador: no se sube ningún archivo a un servidor externo, por lo que tus fotos personales y profesionales están completamente seguras. La herramienta utiliza la Canvas API del navegador para procesar todo localmente, sin instalación ni registro. Soporta JPG, PNG, WebP, GIF y BMP, y permite exportar al formato que necesites.' },
        { h2: '¿Cuándo necesitas redimensionar imagen?', body: 'La necesidad de redimensionar imagen online surge en multitud de situaciones cotidianas. Las cámaras de smartphones actuales generan archivos de 10–50 MB que son demasiado pesados para adjuntar en correos (límite habitual de 25 MB) o subir a plataformas con restricciones de peso. Las plataformas de e-commerce como Amazon, Shopify o WooCommerce tienen tamaños máximos de imagen y requisitos de cuadrado que obligan a redimensionar fotos de producto. Los blogs y CMS como WordPress o Webflow renderizan mejor las imágenes cuando su anchura no supera los 1200–1400 px. Para impresión, redimensionar imagen a 300 DPI en el tamaño de papel correcto garantiza nitidez en la impresión final. En el desarrollo web, las imágenes sobredimensionadas penalizan el Core Web Vitals y ralentizan el tiempo de carga de la página.' },
        { h2: 'Tamaños recomendados por plataforma 2026', body: 'Cada plataforma tiene sus dimensiones óptimas para mostrar imágenes con la mejor calidad posible. Instagram feed cuadrado: 1080×1080 px (ratio 1:1). Instagram portrait: 1080×1350 px (ratio 4:5). Instagram Stories y Reels: 1080×1920 px (ratio 9:16). YouTube miniatura: 1280×720 px (ratio 16:9). YouTube banner de canal: 2560×1440 px. WhatsApp imagen compartida: 1600×900 px recomendado para no perder calidad al comprimir. Facebook post: 1200×630 px. LinkedIn post: 1200×628 px. Pinterest: 1000×1500 px (ratio 2:3 vertical). Blog: 1200 px de anchura máxima. Correo electrónico inline: máximo 600 px de anchura. Pixkit incluye presets de un clic para las plataformas más usadas. Solo tienes que seleccionar el preset y el tamaño se aplica automáticamente manteniendo la proporción.' },
        { h2: 'Cómo redimensionar imagen online con Pixkit', body: 'Para redimensionar imagen online con Pixkit, sube tu foto arrastrándola o haciendo clic en la zona de carga. El tamaño original (anchura × altura en píxeles y peso del archivo) se muestra inmediatamente. Introduce el nuevo valor de anchura o altura, o usa el deslizador de porcentaje para escalar al 50%, 75%, etc. Con la opción "Mantener proporción" activada, basta con cambiar un valor para que el otro se calcule solo. Para un tamaño exacto sin mantener proporción, desactiva ese ajuste e introduce ambos valores manualmente. Selecciona el formato de salida (JPG, PNG o WebP) y ajusta la calidad (recomendado 80–85% para web). Haz clic en "Redimensionar" y descarga el resultado — el archivo original no se modifica nunca.' },
        { h2: 'Redimensionar imagen sin pérdida de calidad', body: 'Al reducir el tamaño de una imagen, se eliminan píxeles. La pérdida de calidad depende del porcentaje de reducción y del formato de salida. Para uso web, una calidad JPEG del 80–85% es imperceptible a simple vista pero reduce el peso del archivo hasta un 60% respecto al original. WebP ofrece una compresión ~30% mejor que JPEG con calidad equivalente: si tu plataforma lo soporta, es la mejor opción para redimensionar imagen online. PNG usa compresión sin pérdida, por lo que no hay degradación de calidad, pero genera archivos más pesados — ideal para logotipos, capturas de pantalla y diseños con áreas de color sólido. Al ampliar una imagen más allá de su resolución original, el algoritmo debe interpolar píxeles nuevos, lo que produce un ligero desenfoque. Para imprimir en gran formato, utiliza el upscaler de Pixkit que aplica mejora de nitidez para minimizar este efecto.' },
      ],
      faqs: [
        { q: '¿El redimensionado reduce la calidad de imagen?', a: 'Reducir el tamaño causa mínima pérdida de calidad si mantienes la calidad JPEG a 80% o más. Ampliar más allá de la resolución original puede añadir ligero desenfoque.' },
        { q: '¿Cómo redimensionar imagen online gratis?', a: 'Sube tu foto a Pixkit, introduce las nuevas dimensiones o elige un preset de plataforma, selecciona el formato de salida y descarga. Todo gratis, sin registro.' },
        { q: '¿Se modifica el archivo original?', a: 'No. Pixkit solo funciona en el navegador. El archivo original no se modifica; solo se descarga el nuevo archivo redimensionado.' },
        { q: '¿Puedo redimensionar varias imágenes a la vez?', a: 'Sí — usa la herramienta de procesamiento por lotes para redimensionar decenas de imágenes con la misma configuración y descargarlas en un ZIP.' },
        { q: '¿Hay límite de tamaño de archivo?', a: 'No hay límite estricto porque no hay subida a servidor. Archivos muy grandes (50 MB+) pueden tardar más según la memoria disponible en tu navegador.' },
      ],
      links: [
        { text: 'Redimensionado en lote', href: '/es/batch' },
        { text: 'Recortar imagen', href: '/es/crop' },
        { text: 'Guía redimensionar imagen', href: '/blog/image-resize-guide' },
      ],
    },
  },

  convert: {
    ko: {
      sections: [
        {
          h2: '이미지 형식 변환이란?',
          body: '이미지 형식 변환은 JPG, PNG, WebP, HEIC 같은 사진 파일 포맷을 서로 바꾸는 작업입니다. 같은 사진이라도 형식에 따라 파일 크기, 화질, 투명도 지원 여부가 크게 달라집니다. 예를 들어 아이폰으로 찍은 HEIC 파일은 윈도우 PC에서 열리지 않는 경우가 많아 JPG로 변환해야 합니다. 반대로 웹사이트에 사용할 이미지는 JPG 대비 30% 더 작은 WebP 형식으로 변환하면 페이지 로딩 속도가 빨라집니다. Pixkit 이미지 변환 도구는 JPG, PNG, WebP, GIF, BMP, HEIC/HEIF 사이의 상호 변환을 브라우저 안에서만 처리합니다. 파일이 서버로 전송되지 않아 개인 사진과 기밀 문서도 안심하고 변환할 수 있으며, 설치 없이 크롬·엣지·사파리 최신 버전에서 바로 사용할 수 있습니다.',
        },
        {
          h2: '주요 이미지 형식 완벽 비교 (2026)',
          body: 'JPG는 사진·풍경처럼 색이 풍부한 이미지에 적합하고 파일이 작지만 투명도를 지원하지 않으며 저장할 때마다 미세한 화질 손실이 생깁니다. PNG는 투명 배경과 무손실 압축을 지원해 로고·아이콘·UI 요소에 적합하나 파일이 큽니다. WebP는 구글이 개발한 차세대 포맷으로 JPG 대비 약 30% 더 작은 파일로 동등한 화질을 내며 투명도도 지원해 웹 최적화에 최적입니다. HEIC는 아이폰 기본 포맷으로 JPG 대비 파일이 약 50% 작지만 윈도우와 안드로이드에서 호환성 문제가 잦습니다. GIF는 256색 제한으로 사진에는 적합하지 않으며 단순 애니메이션에만 사용합니다. BMP는 무압축이라 파일이 매우 크며 웹·SNS에는 사용하지 않는 것이 좋습니다. 목적에 맞는 형식을 선택하는 것이 화질과 용량을 모두 잡는 핵심입니다.',
        },
        {
          h2: 'HEIC를 JPG로 변환해야 하는 이유',
          body: 'HEIC는 아이폰 iOS 11부터 기본 촬영 포맷으로 채택되었지만, 윈도우 10 이하·안드로이드·카카오톡·일부 SNS에서 여전히 열리지 않는 경우가 많습니다. 온라인 쇼핑몰 상품 등록, 블로그 포스팅, 이메일 첨부, 포트폴리오 제출 시에도 JPG나 PNG가 요구됩니다. 카카오톡으로 HEIC 파일을 전송하면 상대방이 파일을 열 수 없다는 문제가 발생하기도 합니다. Pixkit에서 HEIC 파일을 드래그하면 수 초 안에 JPG로 변환되며, 품질 슬라이더로 파일 크기도 세밀하게 조절할 수 있습니다. 아이폰에서 찍은 사진을 PC나 다른 기기와 공유할 때마다 HEIC→JPG 변환이 필요하다면 Pixkit을 북마크해두면 편리합니다.',
        },
        {
          h2: 'WebP 변환의 장점과 주의사항',
          body: 'WebP는 구글이 개발한 차세대 이미지 형식으로, 같은 화질 기준 JPG보다 약 30%, PNG보다 약 26% 파일이 작습니다. 웹사이트에 WebP 이미지를 사용하면 구글 Core Web Vitals의 LCP(Largest Contentful Paint) 점수를 높이고 페이지 로딩 속도를 개선할 수 있어 SEO에도 유리합니다. PNG를 WebP로 변환하면 투명도도 유지되므로 투명 배경 이미지의 웹 최적화에도 활용할 수 있습니다. 단, iOS Safari 14 미만, Internet Explorer에서는 WebP가 지원되지 않으므로 구형 브라우저 대응이 필요한 환경에서는 주의가 필요합니다. 현재 전 세계 브라우저 점유율 기준 95% 이상이 WebP를 지원하므로 일반적인 웹 환경에서는 안심하고 사용할 수 있습니다.',
        },
        {
          h2: '용도별 최적 형식 선택 가이드',
          body: '웹사이트 이미지라면 WebP를 기본으로 사용하고, 구형 브라우저 지원이 필요하면 JPG를 선택하세요. 투명 배경이 필요한 로고·아이콘은 PNG 또는 WebP를 사용해야 합니다. 인쇄용 고품질 이미지는 PNG(무손실)가 최적이며 JPG 품질 95 이상도 허용됩니다. SNS 업로드는 JPG 품질 85 또는 WebP면 충분합니다. 스티커·이모티콘처럼 투명 배경이 필수인 경우 반드시 PNG를 사용하세요. 이미지가 풍부한 이메일 뉴스레터는 JPG가 파일 크기와 호환성 면에서 유리합니다. Pixkit 변환 도구는 품질 슬라이더로 화질과 용량의 균형을 직접 조정할 수 있어 다양한 용도에 맞게 최적화된 파일을 얻을 수 있습니다.',
        },
        {
          h2: 'Pixkit 변환 특징',
          body: 'Pixkit 이미지 변환 도구는 JPG, PNG, WebP, GIF, BMP, HEIC/HEIF를 상호 변환하며, 모든 처리가 브라우저 안에서만 이뤄집니다. 이미지를 업로드하고 원하는 출력 형식과 품질을 선택한 뒤 다운로드 버튼을 누르면 끝입니다. 품질 슬라이더(10~100%)로 파일 크기와 화질의 균형을 세밀하게 조정할 수 있습니다. 변환된 파일은 브라우저에서 즉시 다운로드되며 원본 파일은 변경되지 않습니다. 여러 장을 한번에 변환하려면 일괄 처리 도구를 이용하세요. 회원가입이나 앱 설치 없이 무제한 무료로 사용할 수 있습니다.',
        },
      ],
      faqs: [
        { q: '변환하면 화질이 떨어지나요?', a: 'JPG 품질을 85 이상으로 설정하면 원본과 거의 차이를 느끼기 어렵습니다. WebP는 같은 품질에서 JPG보다 항상 파일이 작습니다. PNG는 무손실이라 화질 손실이 전혀 없습니다.' },
        { q: 'HEIC 파일이 열리지 않아요', a: 'HEIC 디코딩은 일부 구형 브라우저에서 지원되지 않습니다. Chrome 또는 Edge 최신 버전으로 업데이트하면 대부분 해결됩니다.' },
        { q: 'PNG를 JPG로 변환하면 투명도는?', a: 'JPG는 투명도를 지원하지 않으므로 투명 영역이 흰색 배경으로 채워집니다. 투명 배경을 유지하려면 PNG나 WebP로 출력하세요.' },
        { q: '한번에 여러 장을 변환할 수 있나요?', a: '단일 이미지 변환 도구는 한 번에 하나의 이미지를 처리합니다. 여러 장을 일괄 변환하려면 일괄 처리 도구를 이용하세요.' },
        { q: '변환 후 파일 용량이 커졌어요', a: 'PNG는 무손실 형식이라 JPG보다 파일이 클 수 있습니다. JPG·WebP로 출력하고 품질을 80~85로 낮추면 용량을 크게 줄일 수 있습니다.' },
      ],
      links: [
        { text: '여러 장 일괄 변환', href: '/batch' },
        { text: 'HEIC → JPG 변환 가이드', href: '/blog/heic-to-jpg' },
        { text: 'JPG·PNG·WebP 차이 비교', href: '/blog/jpg-png-webp-difference' },
        { text: 'WebP 변환 방법', href: '/blog/webp-to-jpg-convert' },
        { text: 'PNG → JPG 변환', href: '/blog/png-to-jpg-convert' },
      ],
    },
    en: {
      sections: [
        { h2: 'Supported Formats', body: 'Pixkit converts between JPG, PNG, WebP, GIF, BMP, and HEIC/HEIF. HEIC is the default iPhone photo format that often won\'t open on Windows or Android — convert it to JPG in seconds.' },
        { h2: 'PNG vs JPG vs WebP', body: 'Choose PNG for transparent backgrounds. JPG is ideal for photos with rich colors — great quality-to-size ratio. WebP is 25-34% smaller than JPG at the same quality, making it perfect for web optimization.' },
        { h2: 'Quality Settings Tips', body: 'Quality 90+ is near-original but large. For social media use 80-85, for email attachments 70-80. WebP is always smaller than JPG at the same quality setting.' },
      ],
      faqs: [
        { q: 'HEIC files aren\'t converting.', a: 'HEIC decoding may not work in older browsers. Use the latest version of Chrome or Edge to resolve this.' },
        { q: 'Does converting delete my original file?', a: 'No. Pixkit works only in the browser — your original file is never touched. Only the converted file is downloaded.' },
        { q: 'What happens to transparent backgrounds when converting PNG to JPG?', a: 'JPG doesn\'t support transparency, so transparent areas are filled with white. Use PNG or WebP output to preserve transparency.' },
        { q: 'Is WebP supported in all browsers?', a: 'Yes — Chrome, Firefox, Edge, and Safari 14+ all support WebP. Very old browsers (IE, Safari 13-) may not, but these are extremely rare today.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'समर्थित फ़ॉर्मेट', body: 'Pixkit JPG, PNG, WebP, GIF, BMP और HEIC/HEIF के बीच कनवर्ट करता है। HEIC iPhone का डिफ़ॉल्ट फ़ोटो फ़ॉर्मेट है जो अक्सर Windows या Android पर नहीं खुलता — इसे सेकंडों में JPG में बदलें। सभी प्रोसेसिंग ब्राउज़र में होती है, कोई सर्वर अपलोड नहीं।' },
        { h2: 'PNG बनाम JPG बनाम WebP', body: 'पारदर्शी पृष्ठभूमि के लिए PNG चुनें। फ़ोटो के लिए JPG आदर्श है — गुणवत्ता-से-आकार अनुपात बेहतरीन। WebP समान गुणवत्ता पर JPG से 25-34% छोटा होता है, जो वेब अनुकूलन के लिए उत्तम है।' },
        { h2: 'GIF कनवर्ट करते समय सावधानी', body: 'GIF को JPG/PNG में बदलने पर एनीमेशन पहले फ्रेम की स्थिर इमेज बन जाता है। JPG/PNG को GIF में बदलने पर रंग 256 तक सीमित हो जाते हैं, जिससे ग्रेडिएंट वाली तस्वीरों की गुणवत्ता घट जाती है।' },
        { h2: 'गुणवत्ता सेटिंग टिप्स', body: 'गुणवत्ता 90+ मूल के करीब है लेकिन फ़ाइल बड़ी होती है। सोशल मीडिया के लिए 80-85, ईमेल अटैचमेंट के लिए 70-80 उचित है। WebP हमेशा समान गुणवत्ता सेटिंग पर JPG से छोटा होता है।' },
        { h2: 'HEIC से JPG रूपांतरण', body: 'iPhone से ली गई तस्वीरें Windows PC पर खोलने, WhatsApp या Instagram पर अपलोड करने में HEIC समर्थित नहीं होता। Pixkit में HEIC फ़ाइल ड्रैग करें और सेकंडों में JPG में बदलें। गुणवत्ता स्लाइडर से फ़ाइल का आकार भी नियंत्रित करें।' },
      ],
      faqs: [
        { q: 'HEIC फ़ाइलें कनवर्ट नहीं हो रही हैं।', a: 'HEIC डिकोडिंग पुराने ब्राउज़र में काम नहीं कर सकती। Chrome या Edge का नवीनतम संस्करण उपयोग करें।' },
        { q: 'क्या कनवर्ट करने से मेरी मूल फ़ाइल डिलीट होती है?', a: 'नहीं। Pixkit केवल ब्राउज़र में काम करता है — मूल फ़ाइल कभी नहीं बदलती। केवल कनवर्ट की गई फ़ाइल डाउनलोड होती है।' },
        { q: 'PNG से JPG में बदलने पर पारदर्शी पृष्ठभूमि का क्या होता है?', a: 'JPG पारदर्शिता को समर्थन नहीं करता, इसलिए पारदर्शी क्षेत्र सफेद रंग से भर जाते हैं। पारदर्शिता बनाए रखने के लिए PNG या WebP आउटपुट उपयोग करें।' },
        { q: 'क्या WebP सभी ब्राउज़र में समर्थित है?', a: 'हां — Chrome, Firefox, Edge और Safari 14+ सभी WebP को समर्थन देते हैं।' },
      ],
    },
    ja: {
      sections: [
        { h2: '対応フォーマット', body: 'JPG、PNG、WebP、GIF、BMP、HEIC/HEIFの相互変換に対応しています。iPhoneのデフォルト形式HEICをJPGに変換するニーズが特に多いです。' },
        { h2: 'PNG vs JPG vs WebP の選び方', body: '透明背景が必要な場合はPNG。写真はJPGがサイズ対品質で優秀。WebPはJPGより25-34%小さく、Web最適化に最適です。' },
        { h2: '品質設定のコツ', body: 'Web用なら品質80-85%で十分です。WebPを選ぶと同じ品質でJPGより常にファイルが小さくなります。' },
      ],
      faqs: [
        { q: 'HEICファイルが変換されません', a: '古いブラウザではHEICのデコードができない場合があります。Chrome/Edgeの最新版を使用してください。' },
        { q: 'PNGをJPGに変換すると透明部分はどうなりますか？', a: 'JPGは透明度をサポートしていないため、透明部分は白い背景で埋められます。' },
        { q: 'WebPはすべてのブラウザで表示されますか？', a: 'Chrome、Firefox、Edge、Safari 14以降でサポートされています。' },
      ],
    },
    zh: {
      sections: [
        { h2: '支持的格式', body: 'Pixkit支持JPG、PNG、WebP、GIF、BMP、HEIC/HEIF之间的相互转换。iPhone默认拍摄格式HEIC在Windows/Android上通常无法打开，可在几秒内转换为JPG。' },
        { h2: 'PNG vs JPG vs WebP 如何选择', body: '需要透明背景选PNG。照片类图片JPG画质与大小平衡最好。WebP比JPG小25-34%，非常适合网页优化。' },
        { h2: '质量设置建议', body: '网页用途质量80-85%即可。选择WebP格式在相同质量下文件总是比JPG小。' },
      ],
      faqs: [
        { q: 'HEIC文件无法转换怎么办？', a: '旧版浏览器可能不支持HEIC解码，请使用最新版Chrome或Edge。' },
        { q: 'PNG转JPG后透明背景怎么处理？', a: 'JPG不支持透明度，透明区域会被填充为白色背景。如需保留透明度，请选择PNG或WebP输出。' },
        { q: 'WebP格式所有浏览器都支持吗？', a: 'Chrome、Firefox、Edge和Safari 14+均支持WebP。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Formats supportés', body: 'Pixkit convertit entre JPG, PNG, WebP, GIF, BMP et HEIC/HEIF. HEIC est le format photo par défaut de l\'iPhone qui ne s\'ouvre souvent pas sous Windows — convertissez-le en JPG en quelques secondes.' },
        { h2: 'PNG vs JPG vs WebP', body: 'Choisissez PNG pour les fonds transparents. JPG est idéal pour les photos. WebP est 25-34% plus petit que JPG à qualité égale, parfait pour l\'optimisation web.' },
        { h2: 'Conseils de qualité', body: 'Pour le web, 80-85% de qualité suffit. WebP sera toujours plus petit que JPG au même réglage de qualité.' },
      ],
      faqs: [
        { q: 'Les fichiers HEIC ne se convertissent pas', a: 'Le décodage HEIC peut ne pas fonctionner sur les anciens navigateurs. Utilisez la dernière version de Chrome ou Edge.' },
        { q: 'PNG → JPG : que se passe-t-il avec la transparence ?', a: 'JPG ne supporte pas la transparence, les zones transparentes sont remplies de blanc. Utilisez PNG ou WebP pour conserver la transparence.' },
        { q: 'WebP est-il supporté partout ?', a: 'Oui — Chrome, Firefox, Edge et Safari 14+ supportent tous WebP.' },
      ],
    },
    es: {
      sections: [
        { h2: 'Formatos soportados', body: 'Pixkit convierte entre JPG, PNG, WebP, GIF, BMP y HEIC/HEIF. HEIC es el formato predeterminado del iPhone que a menudo no se abre en Windows — conviértelo a JPG en segundos.' },
        { h2: 'PNG vs JPG vs WebP', body: 'Elige PNG para fondos transparentes. JPG es ideal para fotos. WebP es 25-34% más pequeño que JPG a la misma calidad, perfecto para optimización web.' },
        { h2: 'Consejos de calidad', body: 'Para web, 80-85% de calidad es suficiente. WebP siempre será más pequeño que JPG con el mismo ajuste de calidad.' },
      ],
      faqs: [
        { q: 'Los archivos HEIC no se convierten', a: 'La decodificación HEIC puede no funcionar en navegadores antiguos. Usa la última versión de Chrome o Edge.' },
        { q: 'PNG → JPG: ¿qué pasa con la transparencia?', a: 'JPG no soporta transparencia, las áreas transparentes se rellenan con blanco. Usa PNG o WebP para conservar la transparencia.' },
        { q: '¿WebP está soportado en todos los navegadores?', a: 'Sí — Chrome, Firefox, Edge y Safari 14+ soportan WebP.' },
      ],
    },
  },

  crop: {
    ko: {
      sections: [
        {
          h2: '이미지 크롭이란?',
          body: '이미지 크롭(crop)은 사진에서 필요한 영역만 잘라내고 나머지를 제거하는 편집 작업입니다. 촬영 단계에서 완벽한 구도를 잡기 어렵기 때문에 대부분의 사진 편집에서 크롭은 필수 과정입니다. 크롭을 통해 불필요한 배경을 제거해 피사체를 부각시키거나, SNS·블로그·쇼핑몰 등 각 플랫폼이 요구하는 비율로 사진을 맞출 수 있습니다. 특히 스마트폰으로 찍은 풍경 사진이나 단체 사진은 넓은 시야각으로 인해 불필요한 요소가 많이 포함되는데, 크롭으로 핵심 피사체에 집중한 이미지를 만들 수 있습니다. Pixkit 이미지 크롭 도구는 마우스 드래그로 원하는 영역을 선택하고 즉시 잘라낼 수 있으며, 모바일 터치도 지원합니다. 모든 처리가 브라우저 안에서만 이뤄져 파일이 서버로 전송되지 않으므로 개인 사진도 안심하고 사용할 수 있습니다.',
        },
        {
          h2: '크롭이 필요한 상황들',
          body: '가장 흔한 상황은 SNS 플랫폼 규격에 맞게 사진을 잘라야 할 때입니다. 인스타그램 피드는 정방형(1:1)이 기본이고, 유튜브 썸네일은 16:9가 표준이며, 프로필 사진은 원형으로 표시되므로 미리 정방형으로 크롭해두면 얼굴이 잘리지 않습니다. 여권·증명사진을 규격 크기에 맞게 자를 때, 스캔한 문서에서 필요한 부분만 추출할 때, 광고 배너 소재를 여러 사이즈로 파생할 때도 크롭이 필수입니다. 단체 사진에서 특정 인물만 클로즈업하거나, 풍경 사진에서 전선·쓰레기통 같은 불필요한 요소를 제거할 때도 크롭이 효과적입니다. 제품 사진에서 과도한 여백을 줄여 상품을 더 크게 보이게 만들거나, 스크린샷에서 필요한 UI 영역만 잘라내는 용도로도 사용합니다.',
        },
        {
          h2: '비율 고정 크롭 완벽 가이드',
          body: '비율 고정 모드를 사용하면 드래그 중에 지정한 비율이 자동으로 유지됩니다. 1:1 정방형은 인스타그램 피드·프로필 사진의 기본 비율로, 원형 크롭이 필요한 프로필도 정방형으로 미리 잘라두면 됩니다. 16:9는 유튜브 썸네일, 발표 자료, 와이드 배너에 사용하며 가로로 넓은 시네마틱 느낌을 줍니다. 4:3은 전통적인 사진 비율로 블로그 대표 이미지, 카드뉴스, 일반 이메일 이미지에 적합합니다. 3:4는 인스타그램 세로 피드에 최적화된 비율로, 피드에서 더 많은 면적을 차지해 눈에 잘 띕니다. 9:16은 인스타그램 스토리·릴스, 틱톡, 유튜브 쇼츠 세로 영상 썸네일에 쓰이는 세로형 비율입니다. 3:2는 DSLR·미러리스 카메라의 기본 촬영 비율로, 카메라로 찍은 사진을 자연스럽게 활용하거나 6×4인치 인화 사이즈에 맞출 때 사용합니다. 자유 크롭 모드에서는 비율 제한 없이 원하는 영역을 직접 지정할 수 있어 특수한 규격이 필요할 때 유용합니다.',
        },
        {
          h2: '크롭할 때 구도 잡는 팁',
          body: '3분할 법칙은 이미지를 가로·세로 각 3등분해 9개의 칸을 만들고, 피사체를 그 교차점 중 하나에 배치하는 구도법입니다. 중앙 배치보다 더 역동적이고 자연스러운 느낌을 주며 인물·풍경 사진에서 특히 효과적입니다. 피사체를 중앙에 배치하는 구도는 증명사진, 상품 이미지, 심플한 포스터처럼 안정적이고 명확한 메시지가 필요할 때 적합합니다. 여백(네거티브 스페이스)을 의도적으로 남기면 피사체가 더 돋보이고 텍스트 삽입 공간도 생깁니다. 인물 사진 크롭 시에는 머리 위 여백을 조금 남기고, 시선 방향 쪽에 더 많은 공간을 두는 것이 자연스럽습니다. 풍경 사진에서는 수평선을 상단 1/3 또는 하단 1/3에 배치하면 안정감이 생기고, 하늘이나 지면을 강조하는 선택을 할 수 있습니다. 불필요한 배경을 과감히 잘라내면 피사체가 훨씬 돋보이지만, 피사체 주변 최소한의 여백은 남겨야 답답해 보이지 않습니다.',
        },
        {
          h2: '크롭 vs 리사이즈 차이점',
          body: '크롭과 리사이즈는 둘 다 이미지 크기를 변경하지만 방식이 근본적으로 다릅니다. 크롭은 이미지의 일부 영역을 선택해 나머지를 제거합니다. 선택한 영역 안의 픽셀은 그대로 유지되므로 해당 부분의 화질은 원본과 완전히 동일합니다. 단, 원본보다 픽셀 수(해상도)가 줄어듭니다. 리사이즈는 이미지 전체를 축소하거나 확대합니다. 원본의 모든 내용이 유지되지만 픽셀 수가 변하고, 축소 시 화질이 미세하게 낮아질 수 있습니다. 두 작업을 함께 쓰는 경우가 많습니다. 4K 사진을 인스타그램에 올리려면 먼저 크롭으로 1:1 비율로 잘라낸 뒤, 리사이즈 도구로 1080px 크기로 줄이는 식입니다. 크롭 먼저, 리사이즈 나중 순서가 효율적입니다. 결론적으로 구도나 비율을 바꾸고 싶을 때는 크롭, 전체 이미지의 크기만 줄이고 싶을 때는 리사이즈를 선택하면 됩니다.',
        },
        {
          h2: 'Pixkit 크롭 특징',
          body: 'Pixkit 크롭 도구는 이미지를 업로드하고 드래그로 크롭 영역을 선택하면 선택 영역 밖이 반투명 오버레이로 표시되어 잘릴 부분을 직관적으로 확인할 수 있습니다. 비율 프리셋(1:1·4:3·16:9·3:4·9:16)과 자유 크롭 모드를 모두 지원하며, 크롭 영역을 다시 드래그하면 즉시 재설정됩니다. JPG·PNG·WebP 출력 형식을 선택할 수 있어 용도에 맞게 저장할 수 있습니다. 크롭은 선택 영역 외 픽셀만 제거하는 것이므로 남은 영역의 화질은 원본과 100% 동일합니다. 결과물은 클릭 즉시 다운로드되며 원본 파일은 절대 변경되지 않습니다. 계정이나 앱 설치 없이 브라우저에서 바로 무제한 무료로 사용할 수 있습니다.',
        },
      ],
      faqs: [
        { q: '크롭 후 화질이 유지되나요?', a: '크롭은 선택 영역 외 픽셀을 제거하는 것이므로 남은 부분의 화질은 원본과 완전히 동일합니다. 단, 작은 영역을 잘라낸 후 크게 확대하면 픽셀이 보일 수 있으니 고해상도 원본 사진을 사용하는 것을 권장합니다.' },
        { q: '특정 픽셀로 정확하게 자를 수 있나요?', a: '현재는 마우스 드래그로 영역을 선택합니다. 픽셀 단위 정밀 크롭이 필요하면 크롭 후 리사이즈 도구로 정확한 픽셀 크기를 맞추는 두 단계 방법을 사용하세요.' },
        { q: '원형으로 자를 수 있나요?', a: '현재는 직사각형 크롭만 지원합니다. 원형 크롭이 필요하면 1:1 정방형으로 자른 뒤 CSS border-radius 또는 별도 그래픽 도구로 원형으로 처리하면 됩니다.' },
        { q: '크롭 후 원본은 저장되나요?', a: '원본 파일은 절대 변경되지 않습니다. Pixkit은 브라우저에서만 동작하며 크롭된 새 파일만 다운로드됩니다. 원본은 내 컴퓨터에 그대로 남아 있습니다.' },
        { q: '여러 장을 같은 비율로 자르려면?', a: '비율 프리셋을 미리 설정해두면 여러 장을 연속으로 업로드하면서 같은 비율로 빠르게 크롭할 수 있습니다. 완전 자동 일괄 크롭이 필요하면 일괄 처리 도구를 이용하세요.' },
      ],
      links: [
        { text: '이미지 리사이즈', href: '/resize' },
        { text: '인스타그램 이미지 화질 최적화', href: '/blog/instagram-image-quality' },
        { text: '유튜브 썸네일 만들기', href: '/blog/youtube-thumbnail-guide' },
      ],
    },
    en: {
      sections: [
        { h2: 'What Is Image Cropping?', body: 'Cropping an image means selecting a portion of the photo and discarding everything outside that selection. It\'s one of the most common edits in photography: you crop image online to remove distracting backgrounds, reframe the subject, or fit a required aspect ratio. Pixkit lets you crop image online free — drag to select any area, and the result is processed instantly in your browser. No file is uploaded to a server, keeping your photos completely private. Works on desktop and mobile with touch support.' },
        { h2: 'When Do You Need to Crop an Image?', body: 'The most common reason to crop images online is fitting platform aspect ratio requirements. Each social network expects different proportions and penalizes mismatched content with cropping artifacts or black bars. Beyond platforms, cropping is essential for passport and ID photos (specific size requirements), extracting a useful portion from a screenshot, removing unwanted elements like trash cans or strangers from the edges of a photo, and tightening the composition of product photos to make the item appear larger. Photographers crop after the shot to apply the rule of thirds when the original framing wasn\'t perfect.' },
        { h2: 'Aspect Ratio Guide by Platform (2026)', body: 'Knowing the right crop ratio saves time and avoids platform re-cropping that cuts off faces. Instagram feed square: 1:1 (1080×1080 px) — the safest format for feed posts. Instagram portrait: 4:5 (1080×1350 px) — takes up more screen space, higher engagement. Instagram Story & Reels: 9:16 (1080×1920 px) — full vertical screen. YouTube thumbnail: 16:9 (1280×720 px) — standard widescreen. YouTube Shorts: 9:16 (1080×1920 px). Facebook post: 1.91:1 (1200×628 px). Twitter/X image: 16:9 (1200×675 px). LinkedIn post: 1.91:1 (1200×628 px). Profile photos (all platforms): 1:1 square, cropped to a circle at display time — center the face within the square when you crop image online. Pixkit includes presets for all common ratios.' },
        { h2: 'How to Crop Image with Pixkit', body: 'To crop image online with Pixkit, upload your photo by clicking or dragging it onto the tool. Select an aspect ratio preset (1:1, 4:3, 16:9, 3:4, 9:16, 3:2) or switch to Free mode for a custom area. Drag on the image to define your crop region — a semi-transparent overlay shows the area that will be removed. Adjust the selection by dragging its edges or corners. Click Apply Crop and the cropped result appears immediately. Choose an output format (JPG, PNG, or WebP) and download. The original file is never modified. You can upload a new image right away for the next crop without refreshing the page.' },
        { h2: 'Cropping Tips for Better Composition', body: 'The rule of thirds is the most reliable cropping guideline: mentally divide your image into a 3×3 grid and place the main subject near one of the four intersection points rather than dead center. This creates more dynamic, visually engaging results for portraits and landscapes. For profile photos, center the face with a little headroom above and leave more space in the direction the subject is looking. Product photos benefit from tight crops that minimize dead space around the item — but leave a small margin on each side so the subject doesn\'t feel cramped. When cropping screenshots, include just enough context to make the action clear without excess UI chrome. If cropping removes too much resolution and the result looks small, use the Resize tool afterward to scale back up to the required pixel dimensions.' },
        { h2: 'Crop vs Resize — Key Difference', body: 'Cropping and resizing are often confused because both change the pixel dimensions of an image. Cropping removes a portion of the image — the pixels inside the selection are untouched, preserving their original quality. Resizing keeps all image content but scales the entire image up or down, which can introduce slight blur when enlarging. For best results, crop first to the right composition and ratio, then resize to the exact pixel dimensions required. Cropping a 4K photo to 1:1 and then resizing to 1080×1080 px is the correct workflow for Instagram — doing it in reverse (resize first, then crop) wastes resolution.' },
      ],
      faqs: [
        { q: 'Does cropping affect image quality?', a: 'No. Cropping only removes pixels outside your selection — the remaining area retains 100% of its original quality. The pixels inside the crop are never re-compressed by the crop operation itself.' },
        { q: 'Can I crop image online to exact pixel dimensions?', a: 'Pixkit\'s crop is ratio-based via drag selection. For exact pixel dimensions, use the Resize tool after cropping to set precise width and height values.' },
        { q: 'What aspect ratio should I use for Instagram?', a: '1:1 square for feed posts is the safest. 4:5 portrait gets more feed real estate. 9:16 for Stories and Reels. All three are available as one-click presets.' },
        { q: 'Can I crop multiple images to the same ratio?', a: 'Set the ratio preset before uploading. Then upload images one by one — the preset stays selected. For fully automated batch cropping, check the Batch tool.' },
        { q: 'Is my file uploaded to a server when I crop?', a: 'Never. Pixkit processes everything inside your browser using the Canvas API. No image data leaves your device.' },
      ],
      links: [
        { text: 'Resize Image', href: '/resize' },
        { text: 'Instagram Image Quality Guide', href: '/blog/instagram-image-quality' },
        { text: 'YouTube Thumbnail Guide', href: '/blog/youtube-thumbnail-guide' },
      ],
    },
    hi: {
      sections: [
        { h2: 'क्रॉपिंग कैसे काम करती है', body: 'अपनी इमेज के किसी भी हिस्से को चुनने के लिए ड्रैग करें और Pixkit इसे आपके ब्राउज़र में तुरंत क्रॉप कर देगा। कोई अपलोड आवश्यक नहीं — आपकी इमेज निजी रहती हैं। सर्वर पर कोई फ़ाइल नहीं भेजी जाती।' },
        { h2: 'आस्पेक्ट रेशियो प्रीसेट', body: 'Instagram स्क्वायर (1:1), YouTube (16:9), मानक फ़ोटो (4:3) या DSLR (3:2) रेशियो के लिए त्वरित क्रॉप करें। फ्री क्रॉप मोड आपको कोई भी कस्टम क्षेत्र चुनने देता है।' },
        { h2: 'क्रॉपिंग और छवि गुणवत्ता', body: 'क्रॉपिंग केवल चयन के बाहर के पिक्सेल हटाती है — शेष क्षेत्र अपनी मूल गुणवत्ता बनाए रखता है। हाई-रिज़ॉल्यूशन मूल फ़ोटो से क्रॉप करने पर भी परिणाम स्पष्ट रहता है।' },
        { h2: 'क्रॉप टूल का उपयोग कैसे करें', body: 'इमेज अपलोड करें, रेशियो प्रीसेट या फ्री मोड चुनें, ड्रैग करके क्षेत्र चुनें, हैंडल से सूक्ष्म समायोजन करें, फिर क्रॉप बटन दबाएं। मोबाइल पर टच ड्रैग से भी आसानी से क्षेत्र चुना जा सकता है।' },
        { h2: 'क्रॉप और रीसाइज़ में अंतर', body: 'क्रॉप इमेज के एक हिस्से को काटता है जबकि रीसाइज़ पूरी इमेज को छोटा या बड़ा करता है। बेहतर परिणाम के लिए पहले क्रॉप करें, फिर रीसाइज़ टूल से सटीक आयाम सेट करें।' },
      ],
      faqs: [
        { q: 'क्या क्रॉपिंग से इमेज की गुणवत्ता प्रभावित होती है?', a: 'नहीं — क्रॉपिंग केवल चयन के बाहर के पिक्सेल हटाती है। शेष क्षेत्र की गुणवत्ता मूल के समान रहती है।' },
        { q: 'क्या मैं सटीक पिक्सेल आयाम पर क्रॉप कर सकता हूं?', a: 'वर्तमान में क्रॉपिंग ड्रैग करके होती है। सटीक पिक्सेल आयाम के लिए, क्रॉप के बाद रीसाइज़ टूल उपयोग करें।' },
        { q: 'क्रॉप की गई इमेज का फ़ॉर्मेट क्या होगा?', a: 'आउटपुट मूल फ़ॉर्मेट से मेल खाता है। क्रॉप के बाद फ़ॉर्मेट बदलने के लिए Convert टूल उपयोग करें।' },
      ],
    },
    ja: {
      sections: [
        { h2: 'クロップの仕組み', body: 'ドラッグで切り取りたい領域を選択するだけで、ブラウザ内でクロップが完了します。サーバー送信不要でプライバシーが守られます。' },
        { h2: 'アスペクト比プリセット', body: 'Instagram正方形(1:1)、YouTube(16:9)、標準写真(4:3)など人気のプリセットをワンクリックで設定できます。' },
      ],
      faqs: [
        { q: 'クロップで画質は落ちますか？', a: 'クロップは選択範囲外のピクセルを除去するだけなので、残った部分の画質は元のままです。' },
        { q: '出力形式は何ですか？', a: '元の形式と同じです。形式を変更したい場合は変換ツールを使用してください。' },
      ],
    },
    zh: {
      sections: [
        { h2: '裁剪工作原理', body: '拖动鼠标选择想要保留的区域，Pixkit会在浏览器中立即完成裁剪。无需上传，保护您的隐私。' },
        { h2: '比例预设', body: '支持Instagram正方形(1:1)、YouTube(16:9)、标准照片(4:3)等常用比例预设，一键即可设置。' },
      ],
      faqs: [
        { q: '裁剪会影响图片质量吗？', a: '裁剪只是移除选区外的像素，保留区域的画质与原图完全相同。' },
        { q: '输出格式是什么？', a: '与原图格式相同。如需更改格式，请使用转换工具。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Comment fonctionne le recadrage', body: 'Faites glisser pour sélectionner la zone souhaitée et Pixkit recadrera instantanément dans votre navigateur. Aucun téléchargement nécessaire.' },
        { h2: 'Préréglages de ratio', body: 'Instagram carré (1:1), YouTube (16:9), photo standard (4:3) et plus disponibles en un clic.' },
      ],
      faqs: [
        { q: 'Le recadrage affecte-t-il la qualité ?', a: 'Non — le recadrage ne fait que supprimer les pixels en dehors de la sélection. La qualité de la zone conservée reste identique à l\'original.' },
        { q: 'Quel format aura l\'image recadrée ?', a: 'Le même que l\'original. Utilisez l\'outil de conversion pour changer de format.' },
      ],
    },
    es: {
      sections: [
        { h2: 'Cómo funciona el recorte', body: 'Arrastra para seleccionar el área deseada y Pixkit recortará instantáneamente en tu navegador. Sin subir archivos — tus imágenes permanecen privadas.' },
        { h2: 'Preajustes de proporción', body: 'Instagram cuadrado (1:1), YouTube (16:9), foto estándar (4:3) y más disponibles con un clic.' },
      ],
      faqs: [
        { q: '¿El recorte afecta la calidad de imagen?', a: 'No — el recorte solo elimina píxeles fuera de la selección. La calidad del área conservada es idéntica al original.' },
        { q: '¿Qué formato tendrá la imagen recortada?', a: 'El mismo que el original. Usa la herramienta de conversión para cambiar el formato.' },
      ],
    },
  },

  rotate: {
    ko: {
      sections: [
        {
          h2: '이미지 회전과 반전이란?',
          body: '이미지 회전은 사진을 시계 방향 또는 반시계 방향으로 90도·180도 단위로 돌리는 기능입니다. 사진 뒤집기(반전)는 이미지를 좌우 또는 상하로 대칭시키는 기능으로, 영상 편집에서는 미러(mirror)라고도 부릅니다. 스마트폰으로 세로로 찍은 사진이 PC에서 가로로 표시되거나, 전면 카메라로 찍은 셀카가 좌우 반전되어 어색해 보이는 경우가 있는데 이런 문제를 해결하는 것이 바로 회전·반전 도구입니다. Pixkit 이미지 회전 도구는 회전·좌우반전·상하반전을 각각 독립 버튼으로 제공하며, 버튼을 순서대로 클릭해 여러 변환을 누적 적용할 수 있습니다. 모든 처리가 브라우저 내에서만 이뤄지므로 파일이 서버로 전송되지 않고 개인 사진도 안심하고 사용할 수 있습니다. 설치나 회원가입 없이 크롬·엣지·사파리에서 바로 무료로 사용 가능합니다.',
        },
        {
          h2: '회전 vs 반전 차이점',
          body: '90도 회전은 이미지를 시계 방향으로 90도 돌립니다. 세로로 찍힌 사진이 가로로 표시될 때 이를 교정하거나, 가로 촬영 이미지를 세로 배치에 맞게 변환할 때 사용합니다. 180도 회전은 이미지를 완전히 거꾸로 뒤집는 효과로, 드론·액션캠처럼 거꾸로 장착된 카메라로 촬영한 영상 프레임 교정에 쓰입니다. 270도 회전(반시계 방향 90도)은 90도 회전의 반대 방향입니다. 좌우 반전(수평 미러)은 이미지를 왼쪽-오른쪽 대칭으로 뒤집습니다. 전면 카메라는 거울처럼 좌우가 반전되어 찍히는데, 수평 반전으로 자연스럽게 교정할 수 있습니다. 인쇄 전사 작업(티셔츠·머그컵)에서도 디자인을 좌우 반전해야 인쇄물에 정상으로 나타납니다. 상하 반전(수직 미러)은 위아래를 대칭시키며, 물 위 반사 효과나 대칭 디자인 제작에 활용합니다.',
        },
        {
          h2: '언제 필요한가?',
          body: '스마트폰으로 가로로 찍은 사진이 PC나 웹사이트에서 세로로 표시될 때 90도 회전으로 교정합니다. 전면 카메라 셀카를 찍으면 좌우가 뒤집혀 어색해 보이는데, 수평 반전(좌우반전)으로 자연스럽게 보정할 수 있습니다. 인쇄 전사 작업(티셔츠·머그컵 인쇄)에서는 디자인을 반드시 좌우 반전해야 최종 인쇄물에 올바른 방향으로 나타납니다. 수면 반사 효과를 연출하거나 좌우 대칭 이미지를 만들 때는 수평 반전이 유용합니다. 스캔한 문서나 책의 텍스트 방향이 뒤집혔을 때도 180도 회전이나 반전으로 간단히 교정할 수 있습니다. 소셜 미디어 게시물에서 거울 대칭 효과를 연출하거나, 상품 이미지를 다양한 각도로 보여주기 위해 반전을 활용하기도 합니다. EXIF 방향 태그 오류로 일부 플랫폼에서 사진이 옆으로 눕거나 뒤집혀 보이는 경우도 이 도구로 해결할 수 있습니다.',
        },
        {
          h2: '화질 손실 없는 회전 원리',
          body: '90도 단위 회전은 픽셀의 좌표를 수학적으로 재배치하는 방식으로 처리됩니다. 픽셀 값 자체는 변하지 않고 위치만 바뀌므로 이론적으로 화질 손실이 거의 없습니다. 단, JPEG 형식으로 저장할 때 Canvas API의 재압축이 발생하므로 품질 설정에 따라 아주 미세하게 화질에 영향을 줄 수 있습니다. 완전한 무손실 회전이 필요하다면 출력 형식을 PNG로 선택하세요. PNG는 무손실 압축이라 재압축에 의한 화질 변화가 없습니다. 임의 각도(예: 15도) 회전은 픽셀 경계가 기울어지므로 보간법(interpolation)이 적용되어 경계선 부근에 약간의 흐림이 생길 수 있습니다. Pixkit은 현재 90도·180도·270도 단위 회전과 좌우·상하 반전을 지원합니다.',
        },
        {
          h2: 'EXIF 방향 정보 문제',
          body: '스마트폰 카메라는 사진을 찍을 때 항상 가로 방향 기준으로 픽셀을 저장하면서 EXIF 태그에 방향 정보(Orientation tag)를 기록합니다. 사진이 실제로는 세로로 찍혀도 픽셀 데이터는 가로로 저장된 채 EXIF에 "90도 회전해서 보여줘"라는 태그가 붙는 구조입니다. 스마트폰과 최신 이미지 뷰어는 이 태그를 읽어 자동으로 올바른 방향으로 표시하지만, 일부 웹 브라우저·블로그 CMS·이미지 편집 프로그램·쇼핑몰 등록 시스템은 EXIF를 무시해 사진이 옆으로 눕거나 뒤집혀 보입니다. 이 문제를 해결하려면 이미지를 실제 픽셀 방향으로 회전시킨 뒤 저장하면 됩니다. Pixkit 회전 도구로 올바른 방향으로 회전한 뒤 저장하면 EXIF 방향 태그가 픽셀에 반영되어 어떤 기기·플랫폼에서도 올바르게 표시됩니다. 쇼핑몰 상품 사진이 자꾸 눕혀서 올라가거나, 워드프레스 블로그에서 이미지 방향이 이상하게 표시된다면 이 방법으로 해결하세요.',
        },
        {
          h2: 'Pixkit 회전/반전 특징',
          body: 'Pixkit 이미지 회전 도구는 이미지 업로드 후 회전(90°/180°/270°)·좌우반전·상하반전 버튼을 클릭하면 즉시 미리보기가 업데이트됩니다. 여러 변환을 순서대로 누적 적용할 수 있어 90도 회전 후 좌우반전처럼 복합 변환도 가능합니다. 출력 형식은 JPG·PNG·WebP 중 선택 가능하며, 품질 슬라이더로 파일 크기도 조정할 수 있습니다. 처리된 파일은 서버에 저장되지 않으며, 다운로드 버튼 클릭 시 즉시 로컬에 저장됩니다. 회원가입이나 앱 설치 없이 무제한 무료로 사용 가능합니다. EXIF 방향 태그로 인해 사진이 옆으로 보이는 문제도 이 도구로 간단히 해결됩니다.',
        },
      ],
      faqs: [
        { q: '회전하면 화질이 손상되나요?', a: 'JPEG 저장 시 Canvas API의 재압축이 발생하지만 품질 90 이상에서는 육안으로 구분하기 어렵습니다. 완전 무손실이 필요하면 PNG로 출력하세요.' },
        { q: '45도처럼 임의 각도로 회전 가능한가요?', a: '현재는 90도·180도·270도 단위 회전과 좌우·상하 반전만 지원합니다. 임의 각도 회전은 추후 업데이트를 통해 추가될 예정입니다.' },
        { q: '여러 장을 한번에 회전할 수 있나요?', a: '현재 단일 이미지 회전을 지원합니다. 여러 장을 처리하려면 각각 업로드해 작업하거나, 일괄 처리 도구를 확인해보세요.' },
        { q: '좌우반전과 상하반전을 동시에 할 수 있나요?', a: '네, 좌우반전 버튼과 상하반전 버튼을 순서대로 클릭하면 두 변환이 누적 적용됩니다.' },
        { q: '회전 후 파일 형식이 바뀌나요?', a: '선택한 출력 형식(JPG·PNG·WebP)으로 저장됩니다. 원본과 동일한 형식을 유지하려면 해당 형식을 선택하세요.' },
      ],
      links: [
        { text: '이미지 자르기', href: '/crop' },
        { text: '이미지 좌우 반전 가이드', href: '/blog/image-mirror-flip' },
        { text: '이미지 뒤집기 활용법', href: '/blog/image-flip-mirror' },
      ],
    },
    en: {
      sections: [
        { h2: 'Rotation vs Flip', body: 'Rotate turns your image 90° or 180°. Flip mirrors it horizontally (left-right) or vertically (top-bottom). Selfies that look mirrored are fixed with a horizontal flip.' },
        { h2: 'Image Quality', body: 'Rotating in 90° increments with Canvas API applies minimal JPEG recompression on save. For lossless results, export as PNG.' },
      ],
      faqs: [
        { q: 'Does rotating reduce quality?', a: 'Minimal JPEG recompression occurs on save. For lossless results, export as PNG.' },
        { q: 'Can I apply multiple rotations?', a: 'Yes — click buttons sequentially to stack multiple transformations.' },
        { q: 'Why does my photo display sideways?', a: 'The EXIF orientation tag may be ignored by some apps. Rotating and saving fixes the orientation permanently.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'रोटेशन बनाम फ्लिप', body: 'रोटेट आपकी इमेज को 90° या 180° घुमाता है। फ्लिप इसे क्षैतिज (बाएं-दाएं) या लंबवत (ऊपर-नीचे) दर्पण में बदलता है। सेल्फी जो मिरर दिखती हैं उन्हें हॉरिज़ॉन्टल फ्लिप से ठीक किया जा सकता है।' },
        { h2: 'इमेज गुणवत्ता पर प्रभाव', body: 'Canvas API के साथ 90° वृद्धि में घुमाने पर सेव करते समय न्यूनतम JPEG पुनः संपीड़न होता है। नुकसानरहित परिणाम के लिए PNG के रूप में निर्यात करें।' },
        { h2: 'EXIF ओरिएंटेशन समस्या', body: 'स्मार्टफोन कैमरे EXIF ओरिएंटेशन टैग रिकॉर्ड करते हैं। कुछ ऐप्स इसे अनदेखा करते हैं जिससे फोटो तिरछी दिखती है। रोटेट करके सेव करने से ओरिएंटेशन स्थायी रूप से ठीक हो जाती है।' },
        { h2: 'EXIF ओरिएंटेशन समस्या कैसे हल करें', body: 'Pixkit रोटेट टूल में इमेज अपलोड करें, सही दिशा आने तक रोटेट बटन दबाएं, और सेव करें। इसके बाद EXIF रिमूव टूल से मेटाडेटा साफ़ करें।' },
        { h2: 'रोटेशन के उपयोग के उदाहरण', body: 'स्कैन किए दस्तावेज़ 90° घुमाएं, ड्रोन इमेज को 180° ठीक करें, डिज़ाइन कार्य के लिए हॉरिज़ॉन्टल फ्लिप करें। परिणाम पिक्सेल में रोटेशन जानकारी के साथ सहेजा जाता है।' },
      ],
      faqs: [
        { q: 'क्या घुमाने से गुणवत्ता कम होती है?', a: 'सेव करते समय न्यूनतम JPEG पुनः संपीड़न होता है। नुकसानरहित परिणाम के लिए PNG के रूप में निर्यात करें।' },
        { q: 'क्या मैं कई रोटेशन एक साथ लगा सकता हूं?', a: 'हां — बटन क्रमशः दबाएं ताकि कई ट्रांसफ़ॉर्मेशन एक साथ लागू हों।' },
        { q: 'मेरी फोटो तिरछी क्यों दिखती है?', a: 'EXIF ओरिएंटेशन टैग कुछ ऐप्स में अनदेखा होता है। घुमाकर सेव करने से ओरिएंटेशन स्थायी रूप से ठीक हो जाती है।' },
      ],
    },
    ja: {
      sections: [
        { h2: '回転と反転の違い', body: '回転は画像を90°または180°回転させます。反転は左右または上下に鏡像にします。自撮りが左右反転している場合は水平反転で修正できます。' },
        { h2: '画質への影響', body: 'Canvas APIによる処理のため、JPEG保存時にわずかな再圧縮が発生します。完全な無損失を求める場合はPNGで出力してください。' },
      ],
      faqs: [
        { q: '回転すると画質が落ちますか？', a: 'JPEG保存時にわずかな再圧縮が発生します。完全無損失はPNG出力をお使いください。' },
        { q: '複数の変換を組み合わせられますか？', a: 'はい、各ボタンを順番にクリックして複数の変換を重ねて適用できます。' },
      ],
    },
    zh: {
      sections: [
        { h2: '旋转与翻转的区别', body: '旋转将图片转动90°或180°。翻转将图片水平（左右）或垂直（上下）镜像。自拍照片左右反转可通过水平翻转修正。' },
        { h2: '对图片质量的影响', body: '使用Canvas API处理时，JPEG保存会有轻微的重压缩。如需完全无损，请选择PNG输出。' },
      ],
      faqs: [
        { q: '旋转会降低图片质量吗？', a: 'JPEG保存时会有轻微重压缩，如需完全无损请使用PNG输出。' },
        { q: '可以组合多种变换吗？', a: '可以，依次点击各按钮即可叠加应用多种变换。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Rotation vs Retournement', body: 'La rotation tourne l\'image de 90° ou 180°. Le retournement la reflète horizontalement (gauche-droite) ou verticalement (haut-bas).' },
        { h2: 'Impact sur la qualité', body: 'Une légère recompression JPEG se produit lors de la sauvegarde. Pour un résultat sans perte, exportez en PNG.' },
      ],
      faqs: [
        { q: 'La rotation réduit-elle la qualité ?', a: 'Une légère recompression JPEG se produit à la sauvegarde. Pour un résultat sans perte, utilisez PNG.' },
        { q: 'Puis-je combiner rotation et retournement ?', a: 'Oui — cliquez les boutons séquentiellement pour cumuler les transformations.' },
      ],
    },
    es: {
      sections: [
        { h2: '¿Qué es voltear una imagen?', body: 'Voltear imagen significa crear un reflejo especular de una foto: voltear imagen horizontalmente invierte izquierda y derecha (como un espejo), mientras que voltear imagen verticalmente invierte arriba y abajo. Esta operación también se llama reflejar o hacer un espejo de la imagen. Pixkit permite voltear fotos online de forma gratuita directamente en el navegador, sin instalar ninguna aplicación. Todos los archivos se procesan en tu dispositivo — ningún dato se envía a un servidor externo. El resultado se descarga inmediatamente con calidad original preservada.' },
        { h2: 'Diferencia entre voltear imagen y rotar imagen', body: 'Aunque ambas operaciones cambian la orientación de una foto, son conceptualmente diferentes. Voltear imagen (o reflejar) crea una imagen especular: los píxeles se reordenan en espejo respecto a un eje. Rotar imagen, en cambio, gira toda la imagen un ángulo concreto alrededor de su centro — típicamente 90°, 180° o 270°. Una selfie tomada con cámara frontal suele salir invertida lateralmente: para corregirla basta con voltear imagen horizontalmente. Si la foto aparece girada de costado en el ordenador, necesitas rotar imagen 90° para corregir la orientación. Pixkit combina ambas funciones: puedes rotar y voltear en cualquier orden, acumulando transformaciones.' },
        { h2: '¿Cuándo necesitas voltear una foto?', body: 'La necesidad de voltear fotos aparece en muchas situaciones cotidianas. Las selfies tomadas con la cámara frontal quedan lateralmente invertidas — el texto o la ropa con letras aparecen al revés. Voltear imagen horizontalmente corrige esto al instante. En diseño gráfico e impresión en transfer (camisetas, tazas, bolsas), el diseño debe imprimirse espejado para que aparezca correcto tras la transferencia térmica. Rotar imagen 90° es necesario cuando una foto tomada en vertical se muestra en horizontal en el ordenador por un error del metadato EXIF. Los efectos de reflexión en agua o superficie se crean fácilmente volteando imagen verticalmente. En edición de producto para e-commerce, voltear fotos permite mostrar el mismo artículo desde distintas perspectivas sin necesidad de hacer nuevas fotografías.' },
        { h2: 'Cómo voltear imagen con Pixkit', body: 'Voltear fotos con Pixkit es tan sencillo como subir la imagen y pulsar un botón. Importa tu foto arrastrándola o haciendo clic en la zona de carga. Verás cuatro botones de transformación: Girar izquierda 90°, Girar derecha 90°, Voltear H (espejo horizontal, voltea izquierda-derecha) y Voltear V (espejo vertical, voltea arriba-abajo). Haz clic en el botón que necesitas — la previsualización se actualiza al instante. Puedes combinar varias transformaciones en orden: por ejemplo, rotar imagen 90° y después voltear imagen horizontalmente. Cuando el resultado sea correcto, selecciona el formato de salida (JPG, PNG o WebP) y descarga. Todo ocurre en tu navegador sin ninguna subida al servidor.' },
        { h2: 'Calidad al voltear y rotar imagen', body: 'Rotar imagen en múltiplos de 90° reordena matemáticamente los píxeles sin modificar sus valores, por lo que la pérdida de calidad es mínima. Al guardar en JPEG, la Canvas API aplica una ligera recompresión según el nivel de calidad elegido — con calidad 90 o superior, la diferencia es imperceptible a simple vista. Si necesitas voltear fotos sin ninguna pérdida, selecciona PNG como formato de salida: es compresión sin pérdida, por lo que no hay degradación. Para imágenes de producto o trabajo profesional donde la fidelidad cromática es crítica, PNG es la opción recomendada. WebP ofrece un equilibrio entre tamaño de archivo reducido (~30% menos que JPG) y buena calidad.' },
      ],
      faqs: [
        { q: '¿Cómo se voltea una imagen online gratis?', a: 'Sube tu foto a Pixkit, haz clic en "Voltear H" para espejo horizontal o "Voltear V" para espejo vertical, y descarga el resultado. Todo gratis y sin registro.' },
        { q: '¿La rotación o el volteo reducen la calidad de imagen?', a: 'La pérdida es mínima. Para resultados completamente sin pérdida, selecciona PNG como formato de salida antes de descargar.' },
        { q: '¿Puedo combinar rotación y volteo?', a: 'Sí — haz clic en los botones secuencialmente para aplicar múltiples transformaciones. El orden importa: el resultado se acumula.' },
        { q: '¿Por qué mi foto aparece girada en el ordenador?', a: 'El metadato EXIF de orientación puede ser ignorado por algunos programas. Rotar imagen con Pixkit y guardar corrige la orientación de forma permanente en los píxeles.' },
        { q: '¿Se sube mi foto a un servidor?', a: 'No. Todo el procesamiento ocurre en tu navegador. Tus fotos no salen de tu dispositivo en ningún momento.' },
      ],
      links: [
        { text: 'Recortar imagen', href: '/es/crop' },
        { text: 'Guía: reflejar y voltear imágenes', href: '/blog/image-flip-mirror' },
      ],
    },
  },

  'remove-bg': {
    ko: {
      sections: [
        {
          h2: 'AI 배경 제거란?',
          body: 'AI 배경 제거(remove background)는 인공지능이 사진에서 인물·사물·동물 등 피사체를 자동으로 인식하고 배경을 분리하는 기술입니다. 기존에는 포토샵 같은 전문 도구로 누끼를 따야 했지만, 딥러닝 기반 AI 덕분에 클릭 한 번으로 배경을 삭제할 수 있게 됐습니다. Pixkit은 오픈소스 AI 모델 RMBG를 브라우저 내 WebAssembly 환경에서 실행합니다. 서버로 이미지를 전송하지 않고 내 기기 안에서만 처리하므로 개인 사진과 상품 이미지를 안심하고 사용할 수 있습니다. 최초 사용 시 AI 모델(약 150MB)을 한 번 다운로드하며, 이후에는 브라우저 캐시에서 즉시 로드됩니다. 인물·동물·제품 등 다양한 피사체에서 높은 정확도를 보이며, 세밀한 경계는 수동 편집 브러시로 보정할 수 있습니다.',
        },
        {
          h2: '배경 제거 활용 사례',
          body: '온라인 쇼핑몰(스마트스토어·쿠팡·오픈마켓 등)에서는 흰 배경 상품 이미지를 권장하는데, 배경 제거 후 흰 배경으로 교체하면 플랫폼 규격을 맞출 수 있습니다. 증명사진 배경을 흰색·파란색으로 교체할 때, 여권 사진이나 이력서용 증명사진 제작에도 활용됩니다. SNS 프로필 사진에서 배경을 제거해 스티커처럼 사용하거나, 유튜브·틱톡 썸네일 제작 시 인물을 배경에서 분리하는 데도 사용합니다. 카카오톡 이모티콘·스티커 제작 시에도 투명 PNG로 저장한 배경 제거 이미지가 필요합니다. 파워포인트·키노트 프레젠테이션 슬라이드에 피사체만 삽입하거나, 포스터·카드뉴스 디자인에서 배경이 없는 인물이나 제품 이미지를 사용할 때도 유용합니다.',
        },
        {
          h2: 'AI 배경 제거 원리 (쉽게 설명)',
          body: '딥러닝 세그멘테이션(segmentation) 기술은 이미지의 각 픽셀이 피사체에 속하는지 배경에 속하는지를 확률적으로 분류합니다. 수백만 장의 이미지로 학습된 AI 모델은 인물·동물·제품 등의 형태를 인식해 경계선을 자동으로 그립니다. 이 경계를 기준으로 배경 픽셀을 투명하게 처리합니다. Pixkit이 사용하는 RMBG 모델은 Microsoft Research 등에서 연구된 BiRefNet 아키텍처 기반으로, 복잡한 경계도 비교적 정확하게 처리합니다. AI 처리 후에도 머리카락·털·얇은 손가락 끝처럼 세밀한 경계는 한계가 있어, Pixkit은 수동 브러시 편집 기능을 함께 제공합니다. 지우개 모드로 남은 배경을 추가 제거하고, 복원 모드로 실수로 지워진 피사체를 되살릴 수 있습니다.',
        },
        {
          h2: '배경 제거 잘 되게 찍는 팁',
          body: '피사체와 배경의 색상 대비가 클수록 AI 정확도가 높아집니다. 단색 배경(흰 벽·파란 커튼 등) 앞에서 촬영하면 경계 인식이 훨씬 정확해집니다. 충분한 조명 아래서 촬영하면 그림자가 줄고 배경과 피사체 경계가 선명해집니다. 역광을 피하고 자연광이나 균일한 실내 조명을 활용하세요. 고해상도(최소 500×500px 이상) 이미지를 사용하면 AI가 경계를 더 정밀하게 감지합니다. 피사체 주변에 여백이 충분하고 배경이 단순할수록 결과 품질이 좋습니다. 스튜디오 조명처럼 피사체와 배경을 충분히 분리할 수 없다면, 그린 스크린이나 흰 배경 시트를 활용하는 것이 가장 좋은 결과를 냅니다.',
        },
        {
          h2: '배경 제거 후 활용법',
          body: '배경 제거 후 투명 PNG로 저장하면 어떤 배경 위에도 자연스럽게 합성할 수 있습니다. 흰 배경으로 교체해 JPG로 저장하면 이커머스 상품 이미지 규격을 맞출 수 있습니다. 파란 배경으로 교체하면 증명사진 배경색을 변경할 수 있습니다. 투명 PNG는 프레젠테이션 슬라이드에 삽입하거나, 포스터·카드뉴스 디자인에도 바로 사용할 수 있습니다. 합성 이미지를 만들 때는 배경 제거 후 리사이즈 도구로 크기를 맞추면 더 자연스러운 결과를 얻을 수 있습니다.',
        },
        {
          h2: 'Pixkit vs 다른 배경 제거 서비스',
          body: '상업 서비스(remove.bg, Canva 등)는 월 구독료를 내거나 이미지당 비용을 지불해야 하며, 이미지가 서버로 업로드됩니다. Pixkit은 완전 무료이며 이미지가 내 브라우저 밖으로 나가지 않습니다. 처리 횟수 제한도 없습니다. 상업 서비스는 별도 서버에서 최신 AI를 돌리므로 일부 복잡한 이미지에서 더 높은 정확도를 보일 수 있습니다. Pixkit은 브라우저 내 WebAssembly로 처리하므로 기기 성능에 따라 처리 시간이 다르지만, 개인정보 보호와 무제한 무료 사용이라는 장점이 있습니다. 상품사진·증명사진·SNS 이미지 등 일상적인 사용에서는 Pixkit으로 충분한 결과를 얻을 수 있습니다.',
        },
        {
          h2: 'Pixkit 배경 제거 특징',
          body: 'Pixkit AI 배경 제거 도구는 이미지 업로드 후 자동으로 배경을 분리해 투명 PNG로 저장합니다. AI 처리 후 수동 편집 브러시로 경계를 정밀하게 다듬을 수 있습니다. 지우개 모드와 복원 모드, 브러시 크기 조절을 지원합니다. 배경 색상을 흰색·검정·사용자 지정 색상으로 교체해 JPG로 저장하는 옵션도 제공합니다. 모든 처리가 브라우저 내에서만 이뤄지므로 이미지가 외부 서버로 전송되지 않습니다. 회원가입이나 앱 설치 없이 무제한 무료로 사용할 수 있습니다.',
        },
      ],
      faqs: [
        { q: '머리카락처럼 복잡한 경계도 처리되나요?', a: 'AI가 전체적인 윤곽을 처리하지만 세밀한 머리카락은 한계가 있습니다. 수동 편집 브러시 크기를 5px 이하로 줄이고 이미지를 확대해서 정교하게 다듬어보세요.' },
        { q: '처리 속도가 느린 이유는?', a: '최초 실행 시 AI 모델(약 150MB)을 다운로드합니다. 이후 브라우저 캐시에 저장되어 재방문 시 즉시 로드됩니다. 저속 네트워크에서는 최초 다운로드에 시간이 걸릴 수 있습니다.' },
        { q: '배경 제거 후 어떤 형식으로 저장하나요?', a: '투명 배경을 유지하려면 반드시 PNG로 저장하세요. 흰색 등 단색 배경을 지정했다면 JPG나 WebP로 저장해도 됩니다.' },
        { q: '상품사진에도 사용할 수 있나요?', a: '네, 흰 배경 상품 이미지 제작에 매우 적합합니다. 단색 배경 앞에서 촬영한 상품 사진일수록 AI 정확도가 높아집니다.' },
        { q: '파일이 서버에 저장되나요?', a: '절대 아닙니다. 모든 처리가 내 기기 브라우저 안에서만 이뤄지며, 어떤 데이터도 외부 서버로 전송되지 않습니다.' },
      ],
      links: [
        { text: '무료 배경 제거 가이드', href: '/blog/free-background-remover' },
        { text: '증명사진 배경 바꾸는 법', href: '/blog/id-photo-background-change' },
        { text: '흰 배경 상품사진 만들기', href: '/blog/white-background-product-photo' },
      ],
    },
    en: {
      sections: [
        { h2: 'How AI Background Removal Works', body: 'Pixkit runs the RMBG AI model locally in your browser via WebAssembly — no server involved. The AI separates subjects from backgrounds entirely on your device. The model (~150 MB) is downloaded once and cached for future visits.' },
        { h2: 'Best Conditions for Accurate Results', body: 'High contrast between subject and background yields the best results. Works great for portraits, product photos on white, and animal photos. Fine details like hair can be touched up with the manual editing tool.' },
        { h2: 'Manual Editing', body: 'After AI processing, use the eraser to remove remaining background or the restore tool to bring back accidentally removed areas. Adjustable brush size and Ctrl+Z undo are supported.' },
      ],
      faqs: [
        { q: 'The AI model takes too long to load.', a: 'The model (~150 MB) is downloaded on first use and cached afterwards. Slow networks will take longer the first time.' },
        { q: 'The hair edges look unnatural.', a: 'AI has limitations with fine hair. Use the manual brush tool with a small size to refine the edges.' },
        { q: 'Are my images sent to a server?', a: 'Never. All processing happens locally in your browser. No data is sent anywhere.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'AI बैकग्राउंड रिमूवल कैसे काम करता है', body: 'Pixkit RMBG AI मॉडल को WebAssembly के ज़रिए आपके ब्राउज़र में स्थानीय रूप से चलाता है — कोई सर्वर शामिल नहीं। AI आपके डिवाइस पर ही विषय को पृष्ठभूमि से अलग करता है। मॉडल (~150 MB) एक बार डाउनलोड होकर कैश हो जाता है।' },
        { h2: 'सटीक परिणाम के लिए सर्वोत्तम स्थितियां', body: 'विषय और पृष्ठभूमि के बीच अधिक कंट्रास्ट से बेहतर परिणाम मिलते हैं। पोर्ट्रेट, सफेद पृष्ठभूमि पर उत्पाद फोटो और जानवरों की तस्वीरों के लिए बढ़िया काम करता है।' },
        { h2: 'मैनुअल एडिटिंग', body: 'AI प्रोसेसिंग के बाद, बची हुई पृष्ठभूमि हटाने के लिए इरेज़र उपयोग करें या गलती से हटाए क्षेत्रों को वापस लाने के लिए रिस्टोर टूल। समायोज्य ब्रश आकार और Ctrl+Z अनडू समर्थित हैं।' },
        { h2: 'परिणाम का उपयोग', body: 'बैकग्राउंड हटाने के बाद पारदर्शी PNG के रूप में सेव करें या सफेद/काले/कस्टम रंग की पृष्ठभूमि जोड़कर JPG के रूप में सेव करें। ई-कॉमर्स उत्पाद छवियां, पासपोर्ट फोटो, YouTube थंबनेल सभी के लिए उपयोगी।' },
        { h2: 'बैकग्राउंड रिमूवल के उपयोग के क्षेत्र', body: 'ई-कॉमर्स उत्पाद फोटो को सफेद पृष्ठभूमि पर एकीकृत करें, पासपोर्ट/ID फोटो की पृष्ठभूमि बदलें, YouTube और TikTok थंबनेल बनाएं, पोर्टफोलियो के लिए कंपोज़िट इमेज तैयार करें।' },
      ],
      faqs: [
        { q: 'AI मॉडल लोड होने में बहुत समय लग रहा है।', a: 'पहली बार उपयोग पर मॉडल (~150 MB) डाउनलोड होता है और बाद में कैश होता है। धीमे नेटवर्क पर पहली बार अधिक समय लग सकता है।' },
        { q: 'बालों के किनारे अप्राकृतिक दिखते हैं।', a: 'AI की बारीक बालों पर सीमाएं हैं। छोटे आकार के मैनुअल ब्रश टूल से किनारे परिष्कृत करें।' },
        { q: 'क्या मेरी इमेज सर्वर पर भेजी जाती हैं?', a: 'कभी नहीं। सभी प्रोसेसिंग आपके ब्राउज़र में स्थानीय रूप से होती है। कोई डेटा कहीं नहीं भेजा जाता।' },
      ],
    },
    ja: {
      sections: [
        { h2: 'AI背景除去の仕組み', body: 'PixkitはRMBG AIモデルをブラウザ内のWebAssembly環境で実行します。サーバー送信なし、デバイス上のみで処理されます。' },
        { h2: 'きれいに除去できる条件', body: '被写体と背景のコントラストが高いほど精度が上がります。人物、白背景の商品、動物写真に特に効果的です。' },
      ],
      faqs: [
        { q: 'AIモデルの読み込みに時間がかかります', a: '初回は約150MBのモデルをダウンロードします。以降はキャッシュから即座に読み込まれます。' },
        { q: '画像はサーバーに送られますか？', a: 'いいえ。すべての処理がブラウザ内で完結し、データは一切送信されません。' },
      ],
    },
    zh: {
      sections: [
        { h2: 'AI抠图工作原理', body: 'Pixkit在浏览器内通过WebAssembly运行RMBG AI模型，无需上传服务器，所有处理都在您的设备上完成。' },
        { h2: '获得最佳效果的条件', body: '主体与背景对比度越高效果越好。人像、白底产品图、动物照片特别适合。细节边缘（如发丝）可使用手动编辑工具补充处理。' },
      ],
      faqs: [
        { q: 'AI模型加载太慢怎么办？', a: '首次使用需下载约150MB的AI模型，之后会缓存在浏览器中，再次访问时即时加载。' },
        { q: '图片会上传到服务器吗？', a: '绝对不会。所有处理都在浏览器本地完成，没有任何数据发送到服务器。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Comment créer une photo produit sur fond blanc', body: 'La photo produit sur fond blanc est le standard pour les places de marché en ligne : Amazon, Etsy, Cdiscount et les boutiques Shopify imposent souvent un fond blanc uni. Avec Pixkit, créez une photo produit fond blanc en trois étapes : importez votre photo, laissez l\'IA supprimer le fond automatiquement, puis choisissez "Fond blanc" avant de télécharger en JPG. Sans fond vert ni studio professionnel, vous obtenez une photo produit fond blanc en moins de 30 secondes, sans quitter votre navigateur. Pixkit utilise le modèle RMBG via WebAssembly : aucun fichier n\'est envoyé à un serveur, ce qui garantit la confidentialité de vos photos professionnelles et personnelles.' },
        { h2: 'Usages courants : photo produit, portrait, identité', body: 'La suppression de fond répond à de nombreux besoins professionnels et personnels. Pour les e-commerçants, la photo produit fond blanc homogénéise les visuels d\'une boutique et améliore le taux de conversion. Les auto-entrepreneurs qui photographient leurs produits avec un smartphone peuvent transformer une photo fond de cuisine en photo produit fond blanc professionnelle. Pour les portraits, supprimer le fond permet de créer des photos d\'identité (passeport, carte d\'identité) ou des photos de profil LinkedIn avec un arrière-plan neutre. Sur les réseaux sociaux, les photos sans fond s\'utilisent comme stickers ou s\'intègrent facilement dans des compositions Canva. Pour YouTube et TikTok, isoler un sujet du fond facilite la création de miniatures percutantes.' },
        { h2: 'Comment fonctionne la suppression de fond IA', body: 'L\'intelligence artificielle analyse chaque pixel de l\'image et le classe avec une probabilité d\'appartenir au sujet ou à l\'arrière-plan — une technique appelée segmentation sémantique. Pixkit utilise le modèle RMBG basé sur l\'architecture BiRefNet, entraîné sur des millions d\'images. Le modèle (~150 Mo) est téléchargé une seule fois lors de la première utilisation, puis mis en cache dans le navigateur pour les visites suivantes. Tout le traitement se fait localement via WebAssembly : vos photos ne quittent jamais votre appareil. Après le traitement IA, l\'outil d\'édition manuelle permet d\'affiner les contours avec une gomme et un pinceau de restauration, particulièrement utile pour les cheveux fins ou les bords complexes.' },
        { h2: 'Meilleures conditions pour des résultats précis', body: 'Le contraste entre le sujet et l\'arrière-plan est le facteur clé de précision. Pour une photo produit fond blanc, photographiez l\'objet devant un fond uni clair — une feuille de papier blanc ou un tissu uni suffisent. Un éclairage uniforme sans ombres marquées améliore significativement la détection des contours. Évitez le contre-jour qui crée des halos. Une résolution minimale de 500×500 px est recommandée ; plus l\'image est nette, plus les contours détectés sont précis. Les sujets aux contours nets (produits, objets, animaux) donnent les meilleurs résultats ; les cheveux très fins peuvent nécessiter une retouche manuelle.' },
        { h2: 'Après la suppression : fond blanc, transparent ou personnalisé', body: 'Une fois le fond supprimé, Pixkit propose plusieurs options de fond de remplacement. Choisissez "Transparent" et téléchargez en PNG pour conserver la transparence et insérer le sujet dans n\'importe quelle composition. Choisissez "Blanc" pour obtenir une photo produit fond blanc prête pour les marketplaces — téléchargez en JPG pour un fichier léger ou en PNG pour conserver la transparence de fond. La couleur personnalisée permet de créer des photos d\'identité avec fond bleu ou d\'adapter l\'arrière-plan à la charte graphique de votre boutique. Le PNG transparent s\'insère directement dans PowerPoint, Keynote, Figma ou tout logiciel de création graphique.' },
        { h2: 'Pixkit vs services payants de suppression de fond', body: 'Des services comme remove.bg facturent à l\'image ou par abonnement, et vos photos sont traitées sur leurs serveurs. Pixkit est entièrement gratuit, sans limite de nombre d\'images, et tout le traitement se fait dans votre navigateur. Pour une photo produit fond blanc standard, un portrait ou une photo d\'identité, Pixkit offre des résultats comparables à des services payants. Les cas complexes — fourrure animale très dense, transparences, reflets sur fond similaire — peuvent donner de meilleurs résultats avec un service premium. Mais pour un usage quotidien de création de photos produit fond blanc ou de retouche de portrait, la version gratuite de Pixkit est amplement suffisante.' },
      ],
      faqs: [
        { q: 'Le chargement du modèle IA est trop long', a: 'Le modèle (~150 Mo) est téléchargé lors de la première utilisation puis mis en cache pour les visites suivantes. Sur une connexion rapide, le premier chargement prend environ 30 secondes.' },
        { q: 'Comment obtenir une photo produit fond blanc parfaite ?', a: 'Photographiez votre produit devant un fond uni clair, avec un bon éclairage. Importez dans Pixkit, laissez l\'IA supprimer le fond, choisissez "Blanc" et téléchargez en JPG. Affinez les bords avec l\'outil d\'édition manuelle si nécessaire.' },
        { q: 'Puis-je supprimer le fond d\'une photo de cheveux ?', a: 'L\'IA gère correctement la silhouette générale mais les mèches très fines ont leurs limites. Utilisez le pinceau manuel (taille 3-5 px) en mode gomme et zoom avant pour affiner les contours.' },
        { q: 'Mes images sont-elles envoyées à un serveur ?', a: 'Jamais. Tout le traitement se fait localement dans le navigateur via WebAssembly. Aucune donnée n\'est transmise à un serveur externe.' },
        { q: 'Quel format choisir : PNG ou JPG ?', a: 'Choisissez PNG pour conserver la transparence. Choisissez JPG si vous avez ajouté un fond blanc — le fichier sera plus léger, idéal pour les marketplaces e-commerce.' },
      ],
      links: [
        { text: 'Guide suppression de fond gratuit', href: '/blog/free-background-remover' },
        { text: 'Créer une photo produit sur fond blanc', href: '/blog/white-background-product-photo' },
      ],
    },
    es: {
      sections: [
        { h2: 'Cómo funciona la eliminación IA de fondo', body: 'Pixkit ejecuta el modelo RMBG localmente en tu navegador via WebAssembly — sin servidor. El modelo (~150 MB) se descarga una vez y se guarda en caché.' },
        { h2: 'Mejores condiciones para resultados precisos', body: 'Mayor contraste entre sujeto y fondo = mejores resultados. Ideal para retratos, fotos de productos sobre fondo blanco y animales.' },
      ],
      faqs: [
        { q: 'El modelo IA tarda mucho en cargar', a: 'El modelo (~150 MB) se descarga en el primer uso y se guarda en caché para visitas posteriores.' },
        { q: '¿Mis imágenes se envían a un servidor?', a: 'Nunca. Todo el procesamiento ocurre localmente en tu navegador. No se transmiten datos.' },
      ],
    },
  },

  batch: {
    ko: {
      sections: [
        {
          h2: '이미지 일괄 처리란?',
          body: '이미지 일괄 처리(batch image processing)는 여러 장의 사진을 동일한 설정으로 한 번에 리사이즈·변환하는 기능입니다. 한 장씩 개별 처리하면 수십~수백 장을 처리하는 데 오랜 시간이 걸리지만, 일괄 처리를 이용하면 수분 안에 완료할 수 있습니다. Pixkit의 이미지 일괄 처리 도구는 모든 작업이 브라우저 안에서만 이뤄져 파일이 서버로 전송되지 않습니다. 처리 완료 후 전체 파일을 ZIP으로 묶어 한 번에 다운로드할 수 있어 쇼핑몰 상품 이미지나 블로그 이미지를 대량으로 처리할 때 특히 유용합니다. 출력 형식으로 WebP를 선택하면 JPG 대비 약 30% 파일 크기를 줄여 웹사이트 로딩 속도 최적화에도 활용할 수 있습니다.',
        },
        {
          h2: '언제 필요한가?',
          body: '쇼핑몰 상품사진을 모두 800×800px 정방형으로 통일하거나 배경 흰색으로 맞춰야 할 때, 블로그 이미지를 모두 가로 900px 이하로 줄여 로딩 속도를 최적화할 때 일괄 처리가 필수입니다. 여러 형식이 섞인 사진(JPG·PNG·HEIC 등)을 한 가지 형식으로 통일할 때, 여행 사진 수십 장을 SNS에 올리기 전 리사이즈할 때, 포트폴리오 이미지를 제출 규격에 맞게 조정할 때도 개별 처리보다 훨씬 빠르게 작업할 수 있습니다. 업무 문서에 첨부할 이미지를 모두 동일한 크기로 맞춰야 할 때, 수업 자료·보고서에 들어갈 사진을 일괄 압축할 때도 활용됩니다. 규격화된 이미지를 대량으로 만들어야 하는 모든 상황에서 일괄 처리가 시간을 절약해 줍니다.',
        },
        {
          h2: '일괄 처리 vs 개별 처리 비교',
          body: '개별 처리는 이미지마다 크기·형식·품질을 다르게 지정할 수 있어 유연성이 높지만 시간이 많이 걸립니다. 일괄 처리는 동일한 설정을 모든 이미지에 적용하므로 규격 통일이 목적일 때 훨씬 효율적입니다. 10장 이상의 이미지를 동일 규격으로 처리해야 한다면 일괄 처리, 이미지마다 세밀한 조정이 필요하다면 개별 도구를 선택하세요. 비율 유지 옵션을 켜면 가로형·세로형이 섞인 경우에도 각각 원본 비율을 유지하면서 너비 기준으로 리사이즈됩니다. 비율 유지를 끄고 너비·높이를 동일하게 설정하면 정방형(1:1) 이미지를 일괄로 만들 수 있어 쇼핑몰 상품 이미지 작업에 편리합니다.',
        },
        {
          h2: '효율적인 일괄 처리 순서',
          body: '먼저 처리할 이미지를 한 폴더에 정리하고 불필요한 파일을 제거합니다. 그런 다음 목표 사이즈(예: 너비 1200px)와 형식(WebP 또는 JPG)을 결정합니다. SNS 업로드용이라면 품질 80~85, 인쇄용이라면 95 이상으로 설정합니다. 이커머스 상품 이미지처럼 정사각형이 필요하면 비율 유지를 끄고 너비·높이를 동일하게 설정합니다. Pixkit에서 이미지를 일괄 업로드하고 전체 리사이즈 버튼을 클릭한 뒤, 완료 후 전체 다운로드로 ZIP 파일을 받으면 끝입니다. 파일명은 원본 파일명이 유지되어 ZIP 안에서 정리가 편합니다. 처리 중 브라우저 탭을 닫으면 작업이 중단되므로 완료까지 탭을 유지하세요.',
        },
        {
          h2: 'Pixkit 일괄 처리 특징',
          body: 'Pixkit 이미지 일괄 처리 도구는 여러 이미지를 드래그 한 번으로 업로드하고, 너비·높이·품질·출력 형식(JPG·PNG·WebP)을 한 번에 설정합니다. 처리 완료 후 개별 다운로드 또는 전체 ZIP 다운로드를 지원합니다. 브라우저 내에서만 처리되므로 파일 수에 엄격한 제한은 없지만, 4K 이상 고해상도 이미지가 많은 경우 50장씩 나눠 처리하면 안정적입니다. 출력 형식을 WebP로 선택하면 JPG 대비 약 30% 용량을 줄여 웹사이트 로딩 속도 개선에도 효과적입니다. 회원가입이나 앱 설치 없이 완전 무료로 사용할 수 있으며, 처리 결과물은 원본과 동일한 파일명으로 저장됩니다.',
        },
      ],
      faqs: [
        { q: '최대 몇 장까지 처리 가능한가요?', a: '브라우저 메모리에 따라 다르지만 일반적으로 100장 이내가 안정적입니다. 고해상도 이미지가 많다면 50장씩 나눠 처리하는 것을 권장합니다.' },
        { q: '각 파일마다 다른 설정을 적용할 수 있나요?', a: '일괄 처리는 동일한 설정을 모든 이미지에 적용합니다. 이미지마다 다른 설정이 필요하면 단일 이미지 도구를 개별 사용하세요.' },
        { q: '처리 중 오류가 나면 어떻게 되나요?', a: '오류가 발생한 파일은 건너뛰고 나머지 이미지 처리를 계속합니다. 오류 파일은 별도로 표시되므로 확인 후 재처리할 수 있습니다.' },
        { q: '원본 파일이 변경되나요?', a: '원본 파일은 절대 변경되지 않습니다. 처리 결과물만 새 파일로 다운로드됩니다.' },
        { q: '처리 결과를 한번에 다운로드할 수 있나요?', a: '네, 전체 다운로드 버튼을 클릭하면 처리된 모든 이미지가 ZIP 파일로 묶여 한 번에 다운로드됩니다.' },
      ],
      links: [
        { text: '이미지 리사이즈', href: '/resize' },
        { text: '이미지 형식 변환', href: '/convert' },
        { text: '이미지 리사이즈 가이드', href: '/blog/image-resize-guide' },
        { text: '이미지 용량 줄이는 법', href: '/blog/reduce-image-file-size' },
      ],
    },
    en: {
      sections: [
        { h2: 'What is Batch Processing?', body: 'Batch processing resizes multiple images with identical settings in one operation. Perfect for product photos, blog images, and any situation where you need many images at the same size.' },
        { h2: 'How to Use It', body: 'Upload multiple images at once, configure width/height/quality/format, then click Resize All. Download everything as a ZIP with the Download All button.' },
      ],
      faqs: [
        { q: 'Can I set different sizes per image?', a: 'Batch processing applies the same settings to all images. Use the single resize tool for individual settings.' },
        { q: 'Are original aspect ratios preserved?', a: 'Enable the aspect ratio lock to resize each image to the set width while maintaining its individual ratio.' },
        { q: 'How many images can I process at once?', a: 'No strict limit, but very large batches (100+ high-res images) may slow down due to browser memory constraints.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'बैच प्रोसेसिंग क्या है?', body: 'बैच प्रोसेसिंग एक ही ऑपरेशन में समान सेटिंग्स के साथ कई इमेज का आकार बदलती है। उत्पाद फोटो, ब्लॉग इमेज और समान आकार की ज़रूरत वाली किसी भी स्थिति के लिए उपयुक्त।' },
        { h2: 'इसका उपयोग कैसे करें', body: 'एक साथ कई इमेज अपलोड करें, चौड़ाई/ऊंचाई/गुणवत्ता/फ़ॉर्मेट कॉन्फ़िगर करें, फिर Resize All पर क्लिक करें। Download All बटन से सब कुछ ZIP के रूप में डाउनलोड करें।' },
        { h2: 'प्रोसेसिंग सेटिंग टिप्स', body: 'आउटपुट फ़ॉर्मेट WebP पर सेट करने से JPG की तुलना में ~30% फ़ाइल आकार घटता है। अनुपात लॉक सक्षम करने पर मिश्रित लैंडस्केप/पोर्ट्रेट इमेज अपना व्यक्तिगत अनुपात बनाए रखते हुए सेट चौड़ाई पर रीसाइज़ होती हैं।' },
        { h2: 'ZIP डाउनलोड का उपयोग', body: 'Download All बटन दबाने पर सभी प्रोसेस की गई इमेज एक ZIP फ़ाइल में डाउनलोड होती हैं। फ़ाइलनाम मूल नाम के साथ बनाए रखे जाते हैं। CMS या ऑनलाइन स्टोर पर तुरंत अपलोड करने योग्य।' },
        { h2: 'एक साथ कितनी इमेज प्रोसेस कर सकते हैं', body: 'कोई सख्त सीमा नहीं, लेकिन बड़े बैच (100+ हाई-रेज़ इमेज) ब्राउज़र मेमोरी के कारण धीमे हो सकते हैं। 4K इमेज को 50-50 के समूहों में विभाजित करके प्रोसेस करें।' },
      ],
      faqs: [
        { q: 'क्या प्रत्येक इमेज के लिए अलग आकार सेट कर सकते हैं?', a: 'बैच प्रोसेसिंग सभी इमेज पर समान सेटिंग लागू करती है। व्यक्तिगत सेटिंग के लिए सिंगल रीसाइज़ टूल उपयोग करें।' },
        { q: 'क्या मूल आस्पेक्ट रेशियो बना रहता है?', a: 'आस्पेक्ट रेशियो लॉक सक्षम करें ताकि प्रत्येक इमेज अपने व्यक्तिगत अनुपात को बनाए रखते हुए सेट चौड़ाई पर रीसाइज़ हो।' },
        { q: 'एक साथ कितनी इमेज प्रोसेस कर सकते हैं?', a: 'कोई सख्त सीमा नहीं, लेकिन बहुत बड़े बैच (100+ हाई-रेज़) ब्राउज़र मेमोरी के कारण धीमे हो सकते हैं।' },
      ],
    },
    ja: {
      sections: [
        { h2: '一括処理とは？', body: '同じ設定で複数の画像を一度に変換する機能です。ショッピングサイトの商品画像やブログ用画像の整理に特に便利です。' },
        { h2: '使い方', body: '複数の画像をまとめてアップロードし、サイズ・品質・形式を設定して「全体リサイズ」をクリック。完了後に「全体ダウンロード」でZIPファイルとして一括保存できます。' },
      ],
      faqs: [
        { q: '画像ごとに異なるサイズを設定できますか？', a: '一括処理はすべての画像に同じ設定を適用します。個別設定が必要な場合は単体リサイズツールをご使用ください。' },
        { q: '一度に何枚処理できますか？', a: '厳密な制限はありませんが、高解像度の画像が100枚以上あるとブラウザのメモリ制限で遅くなる場合があります。' },
      ],
    },
    zh: {
      sections: [
        { h2: '什么是批量处理？', body: '批量处理可以用相同设置一次性转换多张图片。特别适合处理电商商品图片、博客配图等需要统一规格的场景。' },
        { h2: '使用方法', body: '一次上传多张图片，设置尺寸、质量和格式，点击「全部调整」，处理完成后点击「全部下载」获取ZIP压缩包。' },
      ],
      faqs: [
        { q: '可以为每张图片设置不同尺寸吗？', a: '批量处理对所有图片应用相同设置。如需个别设置，请使用单图调整工具。' },
        { q: '一次可以处理多少张图片？', a: '没有严格限制，但超过100张高分辨率图片时可能因浏览器内存限制而变慢。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Qu\'est-ce que le traitement par lots ?', body: 'Le traitement par lots redimensionne plusieurs images avec les mêmes paramètres en une seule opération. Idéal pour les images produits, photos de blog et tout ce qui nécessite un format uniforme.' },
        { h2: 'Comment l\'utiliser', body: 'Téléchargez plusieurs images à la fois, configurez largeur/hauteur/qualité/format, puis cliquez sur Tout redimensionner. Téléchargez tout en ZIP.' },
      ],
      faqs: [
        { q: 'Puis-je définir des tailles différentes par image ?', a: 'Le traitement par lots applique les mêmes paramètres à toutes les images. Utilisez l\'outil de redimensionnement unique pour des paramètres individuels.' },
        { q: 'Combien d\'images puis-je traiter à la fois ?', a: 'Pas de limite stricte, mais les lots très volumineux (100+ images haute résolution) peuvent ralentir selon la mémoire du navigateur.' },
      ],
    },
    es: {
      sections: [
        { h2: '¿Qué es el procesamiento por lotes?', body: 'El procesamiento por lotes redimensiona múltiples imágenes con la misma configuración en una sola operación. Ideal para fotos de productos, imágenes de blog y cualquier situación que requiera tamaños uniformes.' },
        { h2: 'Cómo usarlo', body: 'Sube múltiples imágenes a la vez, configura ancho/alto/calidad/formato, luego haz clic en Redimensionar todo. Descarga todo como ZIP.' },
      ],
      faqs: [
        { q: '¿Puedo establecer tamaños diferentes por imagen?', a: 'El procesamiento por lotes aplica la misma configuración a todas las imágenes. Usa la herramienta de redimensionado individual para configuraciones separadas.' },
        { q: '¿Cuántas imágenes puedo procesar a la vez?', a: 'Sin límite estricto, pero lotes muy grandes (100+ imágenes en alta resolución) pueden ralentizarse según la memoria del navegador.' },
      ],
    },
  },

  merge: {
    ko: {
      sections: [
        {
          h2: '이미지 합치기란?',
          body: '이미지 합치기(merge images)는 여러 장의 사진을 하나의 파일로 결합하는 작업입니다. 사진 합치기·콜라주 만들기라고도 하며, 가로로 나란히 배치하거나 세로로 쌓거나 격자(그리드) 형태로 배열할 수 있습니다. Pixkit 이미지 합치기 도구는 업로드부터 다운로드까지 브라우저 안에서만 처리되므로 서버 업로드 없이 빠르게 완성할 수 있습니다. 이미지 간 간격과 배경색을 조정해 다양한 레이아웃을 자유롭게 만들 수 있고, JPG·PNG·WebP 중 원하는 형식으로 저장됩니다. 회원가입이나 앱 설치 없이 브라우저에서 바로 무료로 사용할 수 있으며, 완성된 이미지는 클릭 한 번으로 즉시 다운로드됩니다.',
        },
        {
          h2: '활용 사례',
          body: '비포/애프터 비교 이미지는 가로 2장 레이아웃에 흰색 구분선을 설정하면 다이어트·인테리어·시술 효과를 직관적으로 보여줄 수 있습니다. 쇼핑몰 상품의 전면·측면·후면 등 여러 각도 사진을 하나의 이미지로 합치면 상세 페이지 구성이 간편해지고 구매 전환율에도 도움이 됩니다. 포트폴리오 작품 여러 점을 그리드 콜라주로 만들어 한눈에 볼 수 있게 정리할 수 있습니다. 인스타그램·카드뉴스용으로 여러 사진을 하나로 합쳐 업로드하면 게시물 관리가 단순해집니다. 여행 사진 여러 장을 파노라마처럼 가로로 합쳐 추억을 담은 앨범 커버를 만들거나, 제품 색상별 비교 이미지를 한 장으로 보여주는 데도 활용됩니다.',
        },
        {
          h2: '합치는 방향 선택 기준',
          body: '가로 합치기는 이미지를 왼쪽에서 오른쪽으로 나란히 배치합니다. 비교 이미지·대화형 콘텐츠·비포/애프터에 적합하며, 2~4장을 가로로 나란히 놓을 때 효과적입니다. 세로 합치기는 이미지를 위에서 아래로 쌓습니다. 인스타그램 스토리처럼 세로 스크롤 형식의 긴 인포그래픽이나 레시피·튜토리얼 이미지 순서를 연결할 때 적합합니다. 그리드는 여러 이미지를 격자 형태로 배열합니다. 포트폴리오·제품 컬러 샘플·여행 사진 모음처럼 균등하게 배치가 필요할 때 사용합니다. 인스타그램 피드 구성에는 3×3 그리드를, 비교 자료에는 2×2 그리드를 활용하면 깔끔한 레이아웃을 만들 수 있습니다.',
        },
        {
          h2: '이미지 합칠 때 주의사항',
          body: '크기가 다른 이미지를 합치면 자동으로 기준이 맞춰지는데, 가로 합치기는 가장 높은 이미지의 높이로, 세로 합치기는 가장 넓은 이미지의 너비로 맞춥니다. 균일한 결과물을 원한다면 합치기 전에 리사이즈 도구로 모든 이미지 크기를 통일하는 것이 좋습니다. 배경색을 흰색으로 설정하면 잡지 레이아웃 느낌이 나고, 검정 배경은 영화 스틸컷 스타일을 연출합니다. 투명 배경이 포함된 PNG를 합칠 때는 반드시 PNG 형식으로 출력해야 투명도가 유지됩니다. 고해상도 이미지 여러 장을 합치면 결과 파일이 매우 커질 수 있으므로, 먼저 리사이즈 도구로 각 이미지 너비를 1200px 이하로 줄인 뒤 합치는 것을 권장합니다.',
        },
        {
          h2: 'Pixkit 합치기 특징',
          body: 'Pixkit 이미지 합치기 도구는 여러 이미지를 드래그로 업로드하면 즉시 미리보기가 생성됩니다. 이미지 썸네일을 드래그앤드롭으로 순서를 자유롭게 바꿀 수 있습니다. 가로·세로·그리드 레이아웃 중 선택하고 이미지 간 간격(픽셀 단위)과 배경색을 설정합니다. 출력 형식은 JPG·PNG·WebP 중 선택 가능합니다. SNS 게시용이라면 완성 후 플랫폼 권장 크기(인스타그램 1080px 등)로 리사이즈하면 최적의 결과를 얻을 수 있습니다. 모든 처리가 브라우저 내에서만 이뤄지므로 이미지가 서버로 전송되지 않아 미공개 작품이나 기밀 자료도 안전하게 처리할 수 있습니다.',
        },
      ],
      faqs: [
        { q: '몇 장까지 합칠 수 있나요?', a: '브라우저 메모리 내에서 처리되므로 엄격한 제한은 없습니다. 20장 이상은 나눠서 합치는 것을 권장하며, 고해상도일수록 처리 속도가 느려질 수 있습니다.' },
        { q: '합친 이미지 크기는 어떻게 되나요?', a: '가로 합치기 시 가장 높은 이미지의 높이에 맞춰 조정되고, 세로 합치기는 가장 넓은 이미지의 너비에 맞춰 조정됩니다. 균일하게 하려면 먼저 리사이즈 도구로 크기를 통일하세요.' },
        { q: '이미지 순서를 바꿀 수 있나요?', a: '네, 업로드한 이미지 썸네일을 드래그앤드롭으로 자유롭게 순서를 변경할 수 있습니다.' },
        { q: '배경색을 바꿀 수 있나요?', a: '네, 흰색·검정 또는 색상 피커로 원하는 배경색을 지정할 수 있습니다. 이미지 간 간격 색상도 동일하게 적용됩니다.' },
        { q: '합친 후 형식을 선택할 수 있나요?', a: 'JPG·PNG·WebP 중 선택 가능합니다. 투명 배경이 필요하면 PNG를, 웹 게시용이라면 WebP를 권장합니다.' },
      ],
      links: [
        { text: '이미지 자르기', href: '/crop' },
        { text: '이미지 리사이즈', href: '/resize' },
        { text: 'SNS 이미지 사이즈 가이드', href: '/blog/sns-image-size-guide' },
        { text: '이미지 합치기 가이드', href: '/blog/merge-images' },
      ],
    },
    en: {
      sections: [
        { h2: 'Use Cases for Merging Images', body: 'Create before/after comparisons, multi-angle product shots, social media collages, or color variant displays. Choose from horizontal, vertical, or grid layouts.' },
        { h2: 'Layout and Ordering', body: 'Drag images to reorder them. Horizontal layout places images left-to-right; vertical stacks them top-to-bottom. Grid mode fills slots in upload order.' },
      ],
      faqs: [
        { q: 'Is there a limit to how many images I can merge?', a: 'No strict limit, but more images may slow processing due to browser memory.' },
        { q: 'What if my images are different sizes?', a: 'For horizontal merging, all images are scaled to match the tallest one\'s height. For vertical, they match the widest one\'s width.' },
        { q: 'Can I adjust spacing between images?', a: 'Yes — use the gap slider to set pixel spacing between images. Background color can also be customized.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'इमेज मर्ज करने के उपयोग के मामले', body: 'पहले/बाद की तुलना, बहु-कोण उत्पाद शॉट, सोशल मीडिया कोलाज, या रंग विविधता प्रदर्शन बनाएं। क्षैतिज, लंबवत या ग्रिड लेआउट में से चुनें।' },
        { h2: 'लेआउट और क्रम', body: 'इमेज को पुनः क्रमित करने के लिए ड्रैग करें। क्षैतिज लेआउट बाएं-से-दाएं इमेज रखता है; लंबवत ऊपर-से-नीचे। ग्रिड मोड अपलोड क्रम में स्लॉट भरता है।' },
        { h2: 'आउटपुट गुणवत्ता अनुकूलन', body: 'वेब अपलोड के लिए आउटपुट फ़ॉर्मेट WebP या JPG सेट करें और गुणवत्ता 85 से कम रखें। पारदर्शी पृष्ठभूमि वाली मर्ज इमेज के लिए PNG ज़रूरी है।' },
        { h2: 'ग्रिड लेआउट का उपयोग', body: '2×2 ग्रिड 4 इमेज और 3×3 ग्रिड 9 इमेज व्यवस्थित करता है। समान सेल आकार के लिए पहले रीसाइज़ टूल से इमेज एकीकृत करें। रियल एस्टेट फोटो, पोर्टफोलियो प्रीव्यू के लिए उपयुक्त।' },
        { h2: 'सोशल मीडिया कोलाज', body: 'कई फोटो को एक इमेज में मर्ज करें। 3 फोटो का क्षैतिज मर्ज यात्रा पैनोरमा प्रभाव देता है। सफेद बैकग्राउंड गैप मैगज़ीन लेआउट देता है। परिणाम को 1:1 स्क्वायर में रीसाइज़ करके Instagram पर अपलोड करें।' },
      ],
      faqs: [
        { q: 'क्या मर्ज करने वाली इमेज की संख्या की कोई सीमा है?', a: 'कोई सख्त सीमा नहीं, लेकिन अधिक इमेज ब्राउज़र मेमोरी के कारण प्रोसेसिंग धीमी कर सकती हैं।' },
        { q: 'अगर इमेज अलग-अलग आकार की हों तो क्या होगा?', a: 'क्षैतिज मर्ज के लिए सभी इमेज सबसे ऊंची इमेज की ऊंचाई से मेल खाने के लिए स्केल होती हैं। लंबवत के लिए, वे सबसे चौड़ी की चौड़ाई से मेल खाती हैं।' },
        { q: 'क्या इमेज के बीच स्पेसिंग समायोजित कर सकते हैं?', a: 'हां — गैप स्लाइडर से इमेज के बीच पिक्सेल स्पेसिंग सेट करें। बैकग्राउंड रंग भी कस्टमाइज़ किया जा सकता है।' },
      ],
    },
    ja: {
      sections: [
        { h2: '画像結合の活用例', body: 'ビフォーアフター比較、商品の複数アングル、コラージュなど様々な用途に使えます。横方向・縦方向・グリッドのレイアウトから選べます。' },
        { h2: '並び順の設定', body: 'ドラッグで画像の順序を変更できます。横結合は左から右、縦結合は上から下に並びます。' },
      ],
      faqs: [
        { q: '結合できる画像の数に制限はありますか？', a: '厳密な制限はありませんが、画像が多いほどブラウザのメモリにより処理が遅くなる場合があります。' },
        { q: '画像間のスペースを調整できますか？', a: '間隔スライダーでピクセル単位のスペースを調整できます。背景色も設定可能です。' },
      ],
    },
    zh: {
      sections: [
        { h2: '图片合并的使用场景', body: '制作前后对比图、产品多角度展示、社交媒体拼图等。支持水平、垂直和网格布局。' },
        { h2: '排列顺序设置', body: '拖动可调整图片顺序。水平合并从左到右排列，垂直合并从上到下叠放，网格模式按上传顺序填充。' },
      ],
      faqs: [
        { q: '合并的图片数量有限制吗？', a: '没有严格限制，但图片越多处理速度可能越慢。' },
        { q: '图片间距可以调整吗？', a: '可以，使用间距滑块调整像素间距，同时可设置背景颜色。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Cas d\'usage de la fusion d\'images', body: 'Créez des comparaisons avant/après, des photos produits multi-angles, des collages pour réseaux sociaux. Choisissez entre les mises en page horizontale, verticale ou en grille.' },
        { h2: 'Mise en page et ordre', body: 'Glissez pour réorganiser les images. La mise en page horizontale place les images de gauche à droite ; la verticale les empile de haut en bas.' },
      ],
      faqs: [
        { q: 'Y a-t-il une limite au nombre d\'images à fusionner ?', a: 'Pas de limite stricte, mais plus d\'images peuvent ralentir le traitement selon la mémoire du navigateur.' },
        { q: 'Puis-je ajuster l\'espacement entre les images ?', a: 'Oui — utilisez le curseur d\'espacement pour définir l\'espacement en pixels. La couleur d\'arrière-plan est également personnalisable.' },
      ],
    },
    es: {
      sections: [
        { h2: 'Casos de uso para combinar imágenes', body: 'Crea comparaciones antes/después, fotos de productos en múltiples ángulos, collages para redes sociales. Elige entre diseños horizontal, vertical o en cuadrícula.' },
        { h2: 'Diseño y orden', body: 'Arrastra para reordenar imágenes. El diseño horizontal coloca imágenes de izquierda a derecha; el vertical las apila de arriba a abajo.' },
      ],
      faqs: [
        { q: '¿Hay límite en el número de imágenes a combinar?', a: 'Sin límite estricto, pero más imágenes pueden ralentizar el procesamiento según la memoria del navegador.' },
        { q: '¿Puedo ajustar el espaciado entre imágenes?', a: 'Sí — usa el control deslizante de espacio para establecer el espaciado en píxeles. El color de fondo también es personalizable.' },
      ],
    },
  },

  'img-to-pdf': {
    ko: {
      sections: [
        {
          h2: '이미지를 PDF로 변환하는 이유',
          body: '이미지 PDF 변환(image to PDF)은 여러 장의 사진을 하나의 문서 파일로 묶어 공유·제출·보관을 편리하게 합니다. 이메일에 이미지를 여러 장 첨부하면 번거롭지만 PDF 한 파일로 변환하면 간편합니다. 관공서·금융기관·기업 온라인 신청에서 이미지 파일 대신 PDF를 요구하는 경우도 많습니다. 스마트폰으로 찍은 계약서 사진, 영수증, 신분증 등을 PDF로 묶으면 공식 문서처럼 제출할 수 있습니다. Pixkit JPG PDF 변환 도구는 브라우저 안에서만 처리되므로 민감한 서류도 안심하고 변환할 수 있으며, 계정이나 앱 설치 없이 무료로 사용할 수 있습니다.',
        },
        {
          h2: '활용 사례',
          body: '스캔한 계약서 사진 여러 장을 하나의 PDF로 합쳐 이메일로 전송하거나 구글 드라이브·드롭박스에 보관할 수 있습니다. 포트폴리오 이미지를 PDF로 묶으면 클라이언트에게 링크 하나로 공유하기 편리합니다. 스마트폰으로 촬영한 영수증·청구서를 PDF로 정리하면 경비 처리나 세금 신고 자료로 활용할 수 있습니다. 공식 서류 제출 시 이미지 대신 PDF가 요구될 때, 여행 사진 모음집이나 포토 앨범을 PDF로 만들어 가족과 공유하거나, 제품 카탈로그를 이미지들로 만들어 PDF로 고객에게 전달할 때도 활용됩니다.',
        },
        {
          h2: '이미지 PDF 변환 시 품질 설정',
          body: '고해상도 이미지를 그대로 PDF에 넣으면 파일이 매우 커질 수 있습니다. 화면용(이메일·공유)이라면 이미지 너비를 1200~1600px로 줄이고 JPG 품질 85로 최적화한 뒤 변환하는 것을 권장합니다. 인쇄용 PDF는 원본 고해상도를 유지해야 하며, A4 인쇄 기준 최소 300DPI(약 2480×3508px)가 필요합니다. 이메일 첨부 용량 제한은 보통 25MB이므로 공유 전 파일 크기를 미리 확인하세요. 텍스트가 주인 문서 스캔은 흑백 PNG로 저장한 이미지를 PDF로 변환하면 파일 크기를 크게 줄일 수 있습니다. 화면용 vs 인쇄용 목적을 먼저 결정하고 그에 맞는 해상도를 선택하는 것이 중요합니다.',
        },
        {
          h2: '여러 장 순서 정렬 팁',
          body: 'PDF 페이지 순서는 업로드 후 이미지 썸네일을 드래그앤드롭으로 자유롭게 바꿀 수 있습니다. 표지로 쓸 이미지를 목록 맨 앞에, 마지막 페이지에 올 이미지를 맨 뒤에 배치하세요. 스캔 문서라면 1페이지부터 순서대로 정렬한 뒤 변환해야 수신자가 읽기 편합니다. 가로형·세로형 이미지가 섞여 있어도 각 페이지가 해당 이미지 방향에 맞게 자동 설정됩니다. PDF 생성 전 반드시 순서를 최종 확인하세요.',
        },
        {
          h2: 'PDF 용량 최적화 방법',
          body: '이미지를 PDF로 넣기 전에 리사이즈 도구로 너비를 1200px 이하로 줄이거나 JPG 품질을 80으로 낮추면 파일 크기를 크게 줄일 수 있습니다. 흑백 문서는 JPG 대신 PNG(흑백)로 변환하면 오히려 파일이 작아집니다. 여러 장의 고화질 사진을 담을 경우 각 사진을 먼저 일괄 처리 도구로 리사이즈한 뒤 PDF로 묶는 것이 효율적입니다. 생성된 PDF는 온라인 PDF 압축 도구를 추가로 사용해 더 작게 만들 수도 있습니다.',
        },
        {
          h2: 'Pixkit 이미지→PDF 특징',
          body: 'Pixkit 이미지 PDF 변환 도구는 JPG·PNG·WebP 이미지를 업로드하고 순서를 정렬한 뒤 클릭 한 번으로 PDF를 생성합니다. 각 이미지가 PDF의 한 페이지로 삽입되며, 페이지 크기는 이미지 비율에 맞게 자동 설정됩니다. 생성된 PDF는 Acrobat Reader·웹 브라우저·iOS·안드로이드 PDF 뷰어 모두에서 정상 표시됩니다. 모든 처리가 브라우저 내에서만 이뤄져 서버에 파일이 업로드되지 않으며, 계약서나 신분증처럼 민감한 문서도 안전하게 처리할 수 있습니다.',
        },
      ],
      faqs: [
        { q: '몇 장까지 PDF로 합칠 수 있나요?', a: '브라우저 메모리 내에서 처리되므로 엄격한 제한은 없습니다. 30장 이상 고해상도 이미지는 처리 시간이 길어질 수 있으므로 나눠서 진행하세요.' },
        { q: 'PDF 용량이 너무 크면 어떻게 하나요?', a: '이미지를 PDF로 넣기 전에 리사이즈 도구로 너비를 1200px 이하로 줄이거나 JPG 품질을 80으로 낮추면 파일 크기를 크게 줄일 수 있습니다.' },
        { q: '페이지 순서를 바꿀 수 있나요?', a: '업로드 후 이미지 썸네일을 드래그해 원하는 순서로 재배치한 뒤 PDF 생성 버튼을 누르세요. 배치된 순서가 최종 PDF의 페이지 순서가 됩니다.' },
        { q: '어떤 이미지 형식을 지원하나요?', a: 'JPG, PNG, WebP를 지원합니다. HEIC 파일은 먼저 파일 변환 도구로 JPG나 PNG로 변환한 뒤 사용하세요.' },
        { q: '변환된 PDF를 편집할 수 있나요?', a: 'Pixkit은 PDF 편집 기능은 제공하지 않습니다. PDF 편집이 필요하다면 Adobe Acrobat 또는 무료 온라인 PDF 편집 도구를 이용하세요.' },
      ],
      links: [
        { text: 'PDF → 이미지 변환', href: '/pdf-to-img' },
        { text: '여러 장 일괄 처리', href: '/batch' },
        { text: '이미지 PDF 만들기 가이드', href: '/blog/images-to-pdf' },
        { text: 'PDF 합치기·분리 가이드', href: '/blog/pdf-merge-split' },
      ],
    },
    en: {
      sections: [
        { h2: 'Use Cases', body: 'Combine scanned documents, create photo albums, send multiple images as one file, or package portfolio images into a PDF.' },
        { h2: 'Page Order and Layout', body: 'Drag images to reorder them. Each image becomes one PDF page, automatically sized to fit.' },
      ],
      faqs: [
        { q: 'Can I convert the PDF back to images?', a: 'Yes — use the PDF to Image tool to extract each page as JPG or PNG.' },
        { q: 'How many images can I combine?', a: 'No strict limit, but very large batches may take longer to process.' },
        { q: 'Can I include HEIC images?', a: 'Convert HEIC to JPG first using the File Convert tool, then include them in your PDF.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'उपयोग के मामले', body: 'स्कैन किए दस्तावेज़ एकत्र करें, फोटो एल्बम बनाएं, कई इमेज एक फ़ाइल के रूप में भेजें, या पोर्टफोलियो इमेज PDF में पैकेज करें। अनुबंध दस्तावेज़ और पहचान प्रमाण भी एकल PDF में जमा करें।' },
        { h2: 'पेज क्रम और लेआउट', body: 'इमेज को पुनः क्रमित करने के लिए ड्रैग करें। प्रत्येक इमेज एक PDF पेज बनती है, स्वतः आकार के अनुसार। मिश्रित लैंडस्केप/पोर्ट्रेट इमेज भी सही ओरिएंटेशन में प्रत्येक पेज पर रखी जाती हैं।' },
        { h2: 'PDF गुणवत्ता और फ़ाइल आकार', body: 'हाई-रिज़ॉल्यूशन इमेज PDF में रखने पर फ़ाइल बहुत बड़ी हो सकती है। ईमेल के लिए पहले रीसाइज़ टूल से इमेज को 1200 px चौड़ाई पर सेट करें, फिर PDF में कनवर्ट करें।' },
        { h2: 'PDF गुणवत्ता अनुकूलन', body: 'रूपांतरण से पहले Pixkit रीसाइज़ टूल से चौड़ाई 1200-1600 px करें। दस्तावेज़ स्कैन के लिए श्वेत-श्याम PNG के रूप में सेव करें जिससे आकार काफी घटता है।' },
        { h2: 'इमेज संरेखण और लेआउट', body: 'प्रत्येक इमेज PDF पेज में केंद्र में रखी जाती है। आउटपुट PDF Acrobat Reader, वेब ब्राउज़र, iOS/Android PDF व्यूअर सहित सभी मानक वातावरण में सामान्य रूप से प्रदर्शित होती है।' },
      ],
      faqs: [
        { q: 'क्या मैं PDF को वापस इमेज में कनवर्ट कर सकता हूं?', a: 'हां — PDF to Image टूल का उपयोग करके प्रत्येक पेज को JPG या PNG के रूप में निकालें।' },
        { q: 'कितनी इमेज मिला सकते हैं?', a: 'कोई सख्त सीमा नहीं, लेकिन बहुत बड़े बैच में अधिक समय लग सकता है।' },
        { q: 'क्या HEIC इमेज शामिल कर सकते हैं?', a: 'पहले File Convert टूल का उपयोग करके HEIC को JPG में कनवर्ट करें, फिर PDF में शामिल करें।' },
      ],
    },
    ja: {
      sections: [
        { h2: '活用シーン', body: 'スキャン文書のまとめ、写真アルバムの作成、複数画像を1ファイルで送信など様々な用途に使えます。' },
        { h2: 'ページ順序と設定', body: 'ドラッグで画像の順序を変更できます。各画像が1ページになり、自動的に収まるよう配置されます。' },
      ],
      faqs: [
        { q: 'PDFを再び画像に変換できますか？', a: '「PDF → 画像」ツールを使うと各ページをJPGまたはPNGとして抽出できます。' },
        { q: '何枚まで結合できますか？', a: '厳密な制限はありませんが、枚数が多いほど処理時間が長くなります。' },
      ],
    },
    zh: {
      sections: [
        { h2: '使用场景', body: '合并扫描文档、制作照片相册、将多张图片作为单个文件发送或打包作品集图片成PDF。' },
        { h2: '页面顺序和设置', body: '拖动可调整图片顺序，每张图片成为PDF的一页，自动适应页面大小。' },
      ],
      faqs: [
        { q: '可以将PDF转回图片吗？', a: '可以，使用「PDF转图片」工具可将每页提取为JPG或PNG。' },
        { q: '最多可以合并多少张图片？', a: '没有严格限制，但图片越多处理时间越长。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Cas d\'utilisation', body: 'Combinez des documents scannés, créez des albums photos, envoyez plusieurs images en un seul fichier ou regroupez des images de portfolio en PDF.' },
        { h2: 'Ordre des pages', body: 'Glissez pour réorganiser les images. Chaque image devient une page PDF, dimensionnée automatiquement.' },
      ],
      faqs: [
        { q: 'Puis-je reconvertir le PDF en images ?', a: 'Oui — utilisez l\'outil PDF vers Image pour extraire chaque page en JPG ou PNG.' },
        { q: 'Combien d\'images puis-je combiner ?', a: 'Pas de limite stricte, mais les lots très volumineux peuvent prendre plus de temps.' },
      ],
    },
    es: {
      sections: [
        { h2: 'Casos de uso', body: 'Combina documentos escaneados, crea álbumes de fotos, envía múltiples imágenes como un solo archivo o empaqueta imágenes de portafolio en PDF.' },
        { h2: 'Orden de páginas', body: 'Arrastra para reordenar imágenes. Cada imagen se convierte en una página PDF, dimensionada automáticamente.' },
      ],
      faqs: [
        { q: '¿Puedo convertir el PDF de vuelta a imágenes?', a: 'Sí — usa la herramienta PDF a Imagen para extraer cada página como JPG o PNG.' },
        { q: '¿Cuántas imágenes puedo combinar?', a: 'Sin límite estricto, pero lotes muy grandes pueden tardar más en procesarse.' },
      ],
    },
  },

  'pdf-to-img': {
    ko: {
      sections: [
        { h2: 'PDF를 이미지로 변환하는 이유', body: 'PDF 이미지 변환(PDF to image)은 PDF 문서의 각 페이지를 JPG·PNG 등의 이미지 파일로 추출하는 작업입니다. PDF 형식은 다양한 운영체제에서 동일하게 표시된다는 장점이 있지만, 이미지로 편집하거나 웹·SNS에 업로드하기에는 제약이 많습니다. PDF를 이미지로 변환하면 특정 페이지를 이메일에 첨부하거나 인스타그램·페이스북에 바로 공유할 수 있습니다. 프레젠테이션 슬라이드를 이미지로 저장해 블로그 포스팅이나 포트폴리오 페이지에 활용하거나, 계약서·보고서의 일부 페이지를 이미지 캡처 형태로 저장해 다른 문서에 삽입할 수도 있습니다. 인쇄 전 시안을 이미지로 먼저 확인하는 데도 유용합니다. Pixkit의 PDF→이미지 변환은 Mozilla PDF.js를 브라우저에서 직접 실행하기 때문에 파일이 서버로 전송되지 않아 기밀 문서도 안심하고 처리할 수 있습니다.' },
        { h2: '활용 사례', body: '업무 활용 면에서 가장 흔한 사례는 발표 자료 PDF의 슬라이드별 이미지 추출입니다. 파워포인트나 키노트로 제작한 발표자료를 PDF로 변환한 뒤, 슬라이드별 JPG를 추출하면 블로그 포스팅이나 소셜 미디어 카드로 바로 활용할 수 있습니다. 전자책이나 디지털 잡지의 표지 이미지를 추출해 미리보기용 썸네일로 사용하는 경우도 많습니다. 학술 논문에서 특정 그래프나 표 이미지만 뽑아 발표 슬라이드에 삽입하거나, 서명이 완료된 계약서에서 서명 페이지만 이미지로 저장해 보관하는 용도로도 활용됩니다. 온라인 쇼핑몰에서는 제품 카탈로그 PDF에서 제품 이미지만 추출해 업로드하는 작업에도 유용합니다. 기술 매뉴얼의 다이어그램 페이지를 이미지로 추출해 팀 내 공유 문서에 삽입하는 것도 실용적인 활용 사례입니다.' },
        { h2: '변환 시 화질 설정', body: 'DPI(Dots Per Inch)는 PDF 페이지를 이미지로 렌더링할 때의 해상도를 결정하는 핵심 수치입니다. DPI가 높을수록 이미지가 선명해지지만 파일 크기도 함께 커집니다. DPI를 2배로 높이면 이미지의 가로·세로 픽셀 수가 각각 2배가 되어 파일 크기는 약 4배 증가합니다. 용도에 맞는 DPI를 선택하는 것이 중요합니다.\n\n72 DPI는 화면 표시용 최소 해상도로 파일이 가장 작습니다. 웹 페이지의 간단한 삽화나 SNS 공유용으로 적합합니다. 150 DPI는 화면과 일반 사무용 인쇄 모두 적합한 중간값입니다. 발표자료 슬라이드 이미지나 일반 문서 인쇄물로 충분한 품질을 제공합니다. 300 DPI는 고품질 인쇄용 표준 해상도로, 인쇄소에 제출하거나 A4 이상 크기로 인쇄할 때 권장됩니다.\n\n화면용 vs 인쇄용으로 구분하면, 화면에서만 볼 이미지라면 72~150 DPI로 충분합니다. 인쇄물로 출력하거나 편집 후 재인쇄할 이미지라면 300 DPI를 선택하세요. 프레젠테이션 슬라이드 이미지는 144 DPI가 선명도와 파일 크기의 균형을 잘 맞춥니다.' },
        { h2: '여러 페이지 PDF 처리 방법', body: '페이지가 많은 PDF를 처리할 때는 전체 변환과 선택적 변환을 구분해서 활용하면 효율적입니다. PDF를 업로드하면 전체 페이지가 썸네일 형태로 표시됩니다. 원하는 페이지 썸네일을 클릭해 선택할 수 있으며, 복수 선택도 가능합니다. 전체 선택 버튼을 누르면 모든 페이지가 한 번에 선택됩니다.\n\n선택한 페이지만 변환하면 처리 시간이 줄어들고 파일 크기도 절약됩니다. 100페이지 PDF에서 표지와 목차 2페이지만 필요하다면 해당 페이지만 선택해 추출하면 됩니다. 변환 결과는 페이지 번호가 파일명에 포함된 상태로 저장되며, 여러 페이지를 선택했다면 ZIP 파일로 일괄 다운로드됩니다. ZIP으로 받은 파일은 압축 해제 후 페이지 번호 순서대로 정렬되어 있어 관리가 편리합니다.' },
        { h2: 'Pixkit PDF→이미지 특징', body: 'Pixkit PDF→이미지 변환 도구는 Mozilla PDF.js를 기반으로 브라우저 내에서 모든 처리를 완료합니다. 파일이 서버에 업로드되지 않으므로 기밀 계약서, 의료 기록, 개인 정보가 담긴 문서도 안전하게 처리할 수 있습니다. DPI 설정으로 출력 해상도를 72~300 DPI 범위에서 조절할 수 있어 용도에 맞는 품질로 추출할 수 있습니다. JPG와 PNG 출력 형식을 선택할 수 있으며, 텍스트 위주 PDF라면 PNG가 더 선명하고 사진 위주 PDF라면 JPG가 파일 크기 대비 화질이 좋습니다. 변환된 이미지는 개별 다운로드 또는 ZIP으로 일괄 다운로드가 가능합니다. 별도 회원가입이나 소프트웨어 설치 없이 브라우저만 있으면 무료로 사용할 수 있습니다.' },
      ],
      faqs: [
        { q: '모든 페이지를 한번에 추출할 수 있나요?', a: '네, 전체 선택 버튼으로 모든 페이지를 선택한 뒤 ZIP 다운로드를 클릭하면 전체 페이지를 이미지로 일괄 다운로드할 수 있습니다.' },
        { q: '특정 페이지만 선택해서 추출 가능한가요?', a: '네, 페이지 미리보기에서 원하는 페이지 썸네일을 클릭해 선택하면 선택한 페이지만 이미지로 추출됩니다.' },
        { q: '변환 화질이 원본과 같은가요?', a: 'DPI 설정에 따라 다릅니다. 300 DPI로 추출하면 원본 PDF와 거의 동일한 화질을 얻을 수 있습니다. 화면용이라면 72~150 DPI도 충분합니다.' },
        { q: '암호화된 PDF도 변환되나요?', a: '현재 비밀번호로 보호된 PDF는 지원하지 않습니다. PDF 뷰어에서 잠금을 먼저 해제한 파일을 업로드하세요.' },
        { q: '변환 후 파일 형식을 선택할 수 있나요?', a: 'JPG와 PNG 중 선택 가능합니다. 텍스트가 많은 문서는 PNG가, 사진 위주의 PDF는 JPG가 파일 크기 대비 품질이 좋습니다.' },
      ],
      links: [
        { text: '이미지 → PDF 변환', href: '/img-to-pdf' },
        { text: 'PDF 합치기·분리 가이드', href: '/blog/pdf-merge-split' },
        { text: '이미지를 PDF로 만드는 법', href: '/blog/images-to-pdf' },
      ],
    },
    en: {
      sections: [
        { h2: 'Use Cases', body: 'Extract specific pages as images, capture presentation slides, create PDF preview thumbnails, or share PDF content on social media.' },
        { h2: 'Output Resolution', body: 'Higher DPI produces sharper images but larger files. Use 72-96 DPI for web, 150-300 DPI for print. Processing happens in-browser via PDF.js — no server uploads.' },
      ],
      faqs: [
        { q: 'Can I convert password-protected PDFs?', a: 'Password-protected PDFs are not currently supported. Upload an unlocked version.' },
        { q: 'JPG or PNG output — which is better?', a: 'Text-heavy PDFs look sharper as PNG. Photo-heavy PDFs are better as JPG for the quality-to-size ratio.' },
        { q: 'Can I extract only specific pages?', a: 'Yes — select individual pages to download only what you need instead of the entire PDF.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'उपयोग के मामले', body: 'विशिष्ट पेज इमेज के रूप में निकालें, प्रेज़ेंटेशन स्लाइड कैप्चर करें, PDF प्रीव्यू थंबनेल बनाएं, या PDF सामग्री सोशल मीडिया पर साझा करें।' },
        { h2: 'आउटपुट रिज़ॉल्यूशन', body: 'अधिक DPI तेज़ इमेज देता है लेकिन फ़ाइल बड़ी होती है। वेब के लिए 72-96 DPI, प्रिंट के लिए 150-300 DPI उपयोग करें। प्रोसेसिंग ब्राउज़र में PDF.js के ज़रिए होती है — कोई सर्वर अपलोड नहीं।' },
        { h2: 'संपूर्ण पेज बनाम चयनात्मक निष्कर्षण', body: 'सभी पेज ZIP फ़ाइल में डाउनलोड करें या केवल आवश्यक पेज व्यक्तिगत रूप से डाउनलोड करें। 100 पेज PDF में से केवल कवर और विशिष्ट अध्याय पेज चाहिए तो चयनात्मक निष्कर्षण उपयोगी है।' },
        { h2: 'PDF.js ब्राउज़र प्रोसेसिंग', body: 'Pixkit Mozilla के PDF.js का उपयोग करता है। PDF सर्वर पर अपलोड नहीं होता, इसलिए गोपनीय दस्तावेज़ और व्यक्तिगत जानकारी वाले PDF सुरक्षित रूप से प्रोसेस होते हैं।' },
        { h2: 'विशिष्ट पेज निकालने का तरीका', body: 'PDF अपलोड करें, ज़रूरी पेज थंबनेल क्लिक करके चुनें, फिर डाउनलोड करें। केवल चुने पेज कनवर्ट होते हैं जिससे प्रोसेसिंग तेज़ होती है।' },
      ],
      faqs: [
        { q: 'क्या पासवर्ड-सुरक्षित PDF कनवर्ट कर सकते हैं?', a: 'पासवर्ड-सुरक्षित PDF वर्तमान में समर्थित नहीं हैं। अनलॉक किया संस्करण अपलोड करें।' },
        { q: 'JPG या PNG आउटपुट — कौन सा बेहतर है?', a: 'टेक्स्ट-भारी PDF PNG में तेज़ दिखते हैं। फोटो-भारी PDF के लिए गुणवत्ता-से-आकार अनुपात में JPG बेहतर है।' },
        { q: 'क्या केवल विशिष्ट पेज निकाल सकते हैं?', a: 'हां — पूरे PDF के बजाय केवल जो चाहिए वो डाउनलोड करने के लिए व्यक्तिगत पेज चुनें।' },
      ],
    },
    ja: {
      sections: [
        { h2: '活用シーン', body: '特定のPDFページをイメージとして保存、プレゼンスライドの抽出、PDFサムネイル作成など様々な用途に使えます。' },
        { h2: '出力解像度', body: '高いDPI設定はより鮮明な画像を生成しますが、ファイルが大きくなります。Web用は72-96 DPI、印刷用は150-300 DPIを推奨します。' },
      ],
      faqs: [
        { q: 'パスワード保護PDFは変換できますか？', a: '現在パスワード保護PDFは対応していません。ロック解除済みのPDFをアップロードしてください。' },
        { q: '特定のページだけ抽出できますか？', a: 'はい、必要なページだけ選択してダウンロードできます。' },
      ],
    },
    zh: {
      sections: [
        { h2: '使用场景', body: '提取特定页面为图片、捕获演示幻灯片、创建PDF预览缩略图或在社交媒体上分享PDF内容。' },
        { h2: '输出分辨率', body: '更高的DPI产生更清晰的图片但文件更大。网页用途推荐72-96 DPI，打印用途推荐150-300 DPI。' },
      ],
      faqs: [
        { q: '可以转换密码保护的PDF吗？', a: '目前不支持密码保护的PDF，请先解锁PDF后上传。' },
        { q: '可以只提取特定页面吗？', a: '可以，选择需要的页面单独下载即可，无需下载整个PDF。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Cas d\'utilisation', body: 'Extrayez des pages spécifiques comme images, capturez des diapositives de présentation, créez des aperçus PDF ou partagez du contenu PDF sur les réseaux sociaux.' },
        { h2: 'Résolution de sortie', body: 'Un DPI plus élevé produit des images plus nettes mais des fichiers plus grands. Utilisez 72-96 DPI pour le web, 150-300 DPI pour l\'impression.' },
      ],
      faqs: [
        { q: 'Puis-je convertir des PDF protégés par mot de passe ?', a: 'Les PDF protégés par mot de passe ne sont pas pris en charge. Téléchargez une version déverrouillée.' },
        { q: 'Puis-je extraire uniquement certaines pages ?', a: 'Oui — sélectionnez des pages individuelles pour télécharger uniquement ce dont vous avez besoin.' },
      ],
    },
    es: {
      sections: [
        { h2: 'Casos de uso', body: 'Extrae páginas específicas como imágenes, captura diapositivas de presentaciones, crea miniaturas de vista previa de PDF o comparte contenido PDF en redes sociales.' },
        { h2: 'Resolución de salida', body: 'Mayor DPI produce imágenes más nítidas pero archivos más grandes. Usa 72-96 DPI para web, 150-300 DPI para impresión.' },
      ],
      faqs: [
        { q: '¿Puedo convertir PDFs protegidos con contraseña?', a: 'Los PDFs protegidos con contraseña no están soportados actualmente. Sube una versión desbloqueada.' },
        { q: '¿Puedo extraer solo páginas específicas?', a: 'Sí — selecciona páginas individuales para descargar solo lo que necesitas.' },
      ],
    },
  },

  watermark: {
    ko: {
      sections: [
        { h2: '워터마크란?', body: '워터마크(watermark)는 이미지 위에 덧입히는 반투명한 텍스트나 로고를 말합니다. 원래 워터마크는 종이 제조 과정에서 진위 여부를 확인하기 위해 사용되던 기법에서 유래했습니다. 디지털 시대에는 사진이나 작품에 저작권 정보를 표시하고 무단 사용을 억제하는 수단으로 활용됩니다. Pixkit 워터마크 추가 도구는 텍스트 워터마크와 로고 이미지 워터마크를 모두 지원합니다. 투명도·크기·위치·회전각을 자유롭게 조절할 수 있으며, 타일 반복 모드로 이미지 전체에 워터마크를 배치할 수도 있습니다. 모든 처리가 브라우저 안에서만 이뤄지므로 미공개 작품이나 고화질 원본도 서버에 업로드되지 않아 안심하고 워터마크를 삽입할 수 있습니다.' },
        { h2: '워터마크가 필요한 이유', body: '저작권 보호 측면에서 워터마크는 가장 직관적인 수단입니다. 사진이 인터넷에 퍼졌을 때 원작자를 특정할 수 있는 유일한 단서가 되기도 합니다. 브랜딩 목적으로 URL이나 로고를 넣으면 이미지가 공유될수록 브랜드 노출 효과가 생깁니다. 스톡 사진이나 포트폴리오 이미지는 워터마크가 없으면 무단 상업적 사용이 발생하기 쉽습니다. 프리랜서 사진작가나 디자이너는 클라이언트에게 시안을 보낼 때 워터마크를 넣어 납품 전 무단 사용을 방지합니다. 핀터레스트·인스타그램처럼 이미지가 빠르게 퍼지는 플랫폼에서는 워터마크가 브랜드 홍보 수단으로도 기능합니다. 특히 사진 작품, 일러스트, 디자인 시안처럼 창작물을 온라인에 공개할 때는 워터마크가 없으면 저작권 분쟁에서 불리한 위치에 놓일 수 있으므로 반드시 삽입하는 습관을 들이는 것이 좋습니다.' },
        { h2: '텍스트 워터마크 vs 이미지 워터마크', body: '텍스트 워터마크는 이름·URL·저작권 표기(© 2026 홍길동)를 직접 입력해 빠르게 삽입할 수 있습니다. 폰트 크기와 색상을 조정할 수 있고 한글·영문·숫자 모두 지원합니다. 별도 파일 없이 바로 사용할 수 있어 간편합니다. 이미지 워터마크(로고 워터마크)는 브랜드 로고를 투명 배경 PNG로 준비해 업로드하면 이미지 위에 자연스럽게 합성됩니다. 로고는 투명 배경 PNG를 사용해야 배경이 보이지 않고 깔끔하게 합성됩니다. JPG 로고도 사용 가능하지만 배경색이 함께 표시될 수 있습니다. 텍스트 워터마크는 빠르게 적용할 수 있는 반면, 이미지 워터마크는 로고 자체가 브랜드 인지도를 높이는 역할을 하기 때문에 유명 브랜드나 전문 크리에이터일수록 로고 워터마크를 선호합니다.' },
        { h2: '효과적인 워터마크 디자인 팁', body: '워터마크 위치는 이미지의 코너(우하단이 일반적)나 이미지 전체에 타일로 반복 배치하는 두 가지 전략이 있습니다. 코너 배치는 이미지 감상을 방해하지 않으면서 출처를 표시합니다. 타일 배치는 잘라내기 어려워 보호 효과가 강합니다. 투명도는 20~40%가 이미지를 해치지 않으면서 충분히 보이는 범위입니다. 텍스트 색상은 밝은 이미지에는 어두운 색, 어두운 이미지에는 흰색이 가독성이 좋습니다. 로고 크기는 이미지 전체 면적의 10~15% 이내로 유지하되, 너무 작게 설정하면 스캔이나 화면 축소 시 보이지 않을 수 있습니다. 피사체의 핵심 위에 워터마크를 배치하면 제거가 더 어려워져 보호 효과가 높아집니다.' },
        { h2: '워터마크 제거 방지하는 법', body: '워터마크를 쉽게 제거하지 못하도록 하는 방법에는 몇 가지 전략이 있습니다. 가장 효과적인 방법은 타일(tile) 배치입니다. 워터마크를 이미지 전체에 반복 배치하면 일부를 잘라내거나 복사해 덮어도 나머지 부분이 남아 있어 완전 제거가 사실상 불가능합니다. 단일 코너 배치는 잘라내기(crop)만으로 제거할 수 있어 보호 효과가 상대적으로 낮습니다.\n\n두 번째 전략은 피사체 위에 배치하는 것입니다. 배경이 아닌 인물이나 제품 등 피사체의 핵심 위에 워터마크를 올리면, 워터마크를 제거하려면 피사체도 손상되기 때문에 제거 동기가 줄어듭니다. 세 번째로 투명도를 너무 낮게 설정하지 마세요. 50% 이상의 불투명도는 AI 기반 워터마크 제거 도구도 처리하기 어렵게 만듭니다. 워터마크 크기를 충분히 크게 설정하면 AI 인페인팅으로 제거할 때 빈 자리를 채우기 어려워져 보호 효과가 높아집니다.' },
        { h2: 'Pixkit 워터마크 특징', body: 'Pixkit 이미지 워터마크 도구는 텍스트 또는 PNG 로고를 선택해 이미지 위에 원하는 위치에 삽입할 수 있습니다. 위치(9개 프리셋 또는 타일), 투명도, 크기, 회전각을 모두 세밀하게 조절할 수 있습니다. 미리보기 화면에서 워터마크가 적용된 결과를 실시간으로 확인하면서 작업할 수 있습니다. 완성된 이미지는 JPG·PNG·WebP로 다운로드할 수 있으며, 원본 파일은 변경되지 않습니다. 회원가입이나 앱 설치 없이 무제한 무료로 사용 가능합니다.' },
      ],
      faqs: [
        { q: '워터마크 위치를 자유롭게 조절할 수 있나요?', a: '좌상단·상단 중앙·우상단·중앙 좌측·중앙·중앙 우측·좌하단·하단 중앙·우하단의 9개 포지션 프리셋과 타일 모드를 지원합니다.' },
        { q: '로고 이미지를 워터마크로 사용할 수 있나요?', a: '네, 투명 배경 PNG 로고를 업로드하면 가장 자연스럽게 합성됩니다. JPG 로고도 사용 가능하지만 배경색이 함께 표시될 수 있습니다.' },
        { q: '여러 장에 동시에 워터마크를 넣을 수 있나요?', a: '현재는 단일 이미지만 지원합니다. 여러 장에 일괄 적용하는 배치 워터마크 기능은 추후 업데이트 예정입니다.' },
        { q: '투명도를 조절할 수 있나요?', a: '네, 투명도 슬라이더로 0~100% 범위에서 세밀하게 조절할 수 있습니다. 20~40%가 보호 효과와 시각적 균형이 좋습니다.' },
        { q: '타일 형태로 전체에 워터마크를 넣을 수 있나요?', a: '네, 타일 모드를 선택하면 워터마크가 이미지 전체에 반복 배치됩니다. 간격과 회전각도 조절 가능합니다.' },
      ],
      links: [
        { text: 'EXIF 메타데이터 제거', href: '/remove-exif' },
        { text: '워터마크 추가·제거 가이드', href: '/blog/watermark-remove-add' },
      ],
    },
    en: {
      sections: [
        { h2: 'Why Add a Watermark?', body: 'Watermarks protect your photos from unauthorized use and establish copyright. Add your name, URL, or logo to commercial photos, portfolios, and social media posts.' },
        { h2: 'Text vs Logo Watermark', body: 'Text watermarks are quick — just type your name or URL. Logo watermarks work best with a transparent PNG file. Both support adjustable opacity, size, position, and rotation.' },
      ],
      faqs: [
        { q: 'Is my original file modified?', a: 'No — the original stays unchanged. Only the watermarked version is downloaded.' },
        { q: 'Do I need a transparent PNG logo?', a: 'Transparent PNG gives the cleanest result. JPG logos work too but will include the background.' },
        { q: 'Can I batch watermark multiple images?', a: 'Currently only single images are supported. Batch watermarking is planned for a future update.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'वॉटरमार्क क्यों जोड़ें?', body: 'वॉटरमार्क आपकी तस्वीरों को अनधिकृत उपयोग से बचाते हैं और कॉपीराइट स्थापित करते हैं। व्यावसायिक फोटो, पोर्टफोलियो और सोशल मीडिया पोस्ट पर अपना नाम, URL या लोगो जोड़ें।' },
        { h2: 'टेक्स्ट बनाम लोगो वॉटरमार्क', body: 'टेक्स्ट वॉटरमार्क त्वरित हैं — बस अपना नाम या URL टाइप करें। लोगो वॉटरमार्क पारदर्शी PNG फ़ाइल के साथ सबसे अच्छा काम करता है। दोनों समायोज्य अपारदर्शिता, आकार, स्थिति और रोटेशन का समर्थन करते हैं।' },
        { h2: 'प्रभावी वॉटरमार्क स्थान', body: 'बीच में अर्ध-पारदर्शी टाइल वॉटरमार्क काटना मुश्किल बनाता है। कोने (नीचे-दाएं) में कम दिखने वाला वॉटरमार्क इमेज देखने में बाधा नहीं डालता लेकिन स्रोत दिखाता है।' },
        { h2: 'वॉटरमार्क डिज़ाइन टिप्स', body: 'पारदर्शिता 20-40% के आसपास रखें। टेक्स्ट वॉटरमार्क के लिए밝은 इमेज पर गहरा रंग और गहरी इमेज पर सफेद रंग उपयोग करें। लोगो इमेज के कुल क्षेत्र के 10-15% आकार तक रखें।' },
        { h2: 'कॉपीराइट चिह्न कैसे लगाएं', body: '"© 2025 नाम" फ़ॉर्मेट में टेक्स्ट वॉटरमार्क अंतर्राष्ट्रीय कॉपीराइट मानक का पालन करता है। URL जोड़ने से दर्शक स्रोत आसानी से ढूंढ सकते हैं जो ब्रांड जागरूकता के लिए भी प्रभावी है।' },
      ],
      faqs: [
        { q: 'क्या मेरी मूल फ़ाइल बदल जाती है?', a: 'नहीं — मूल फ़ाइल अपरिवर्तित रहती है। केवल वॉटरमार्क वाला संस्करण डाउनलोड होता है।' },
        { q: 'क्या मुझे पारदर्शी PNG लोगो चाहिए?', a: 'पारदर्शी PNG सबसे साफ़ परिणाम देता है। JPG लोगो भी काम करता है लेकिन बैकग्राउंड शामिल होगा।' },
        { q: 'क्या कई इमेज पर बैच वॉटरमार्क कर सकते हैं?', a: 'वर्तमान में केवल सिंगल इमेज समर्थित हैं। बैच वॉटरमार्किंग भविष्य के अपडेट के लिए योजनाबद्ध है।' },
      ],
    },
    ja: {
      sections: [
        { h2: '透かしが必要な理由', body: '写真の著作権を示し、無断使用を防ぐために透かしを入れます。名前、URL、ロゴを商業写真やポートフォリオに挿入できます。' },
        { h2: 'テキストとロゴの透かし', body: 'テキスト透かしはすばやく入力するだけです。ロゴ透かしは透明PNG画像を使うと最もきれいに仕上がります。' },
      ],
      faqs: [
        { q: '元のファイルは変更されますか？', a: 'いいえ。元ファイルはそのままで、透かし入りの新ファイルのみダウンロードされます。' },
        { q: '透明PNGロゴが必要ですか？', a: '透明PNGを使うと最もきれいです。JPGロゴも使用可能ですが背景ごと表示されます。' },
      ],
    },
    zh: {
      sections: [
        { h2: '为什么需要添加水印', body: '水印可以保护您的照片免遭未经授权的使用并建立版权归属。可以在商业照片、作品集和社交媒体帖子上添加姓名、URL或徽标。' },
        { h2: '文字水印 vs 图片水印', body: '文字水印快速便捷，直接输入即可。图片水印最好使用透明背景PNG文件。两种方式均支持调整透明度、大小、位置和旋转角度。' },
      ],
      faqs: [
        { q: '原始文件会被修改吗？', a: '不会，原文件保持不变，只有添加水印的版本被下载。' },
        { q: '需要使用透明PNG图标吗？', a: '透明PNG效果最佳，JPG也可使用但会带有背景。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Pourquoi ajouter un filigrane ?', body: 'Les filigranes protègent vos photos de l\'utilisation non autorisée et établissent les droits d\'auteur. Ajoutez votre nom, URL ou logo sur les photos commerciales et portfolios.' },
        { h2: 'Filigrane texte vs logo', body: 'Les filigranes texte sont rapides — saisissez simplement votre nom ou URL. Les logos fonctionnent mieux avec un PNG transparent. Les deux supportent opacité, taille, position et rotation.' },
      ],
      faqs: [
        { q: 'Mon fichier original est-il modifié ?', a: 'Non — l\'original reste inchangé. Seule la version filigranée est téléchargée.' },
        { q: 'Ai-je besoin d\'un logo PNG transparent ?', a: 'Un PNG transparent donne le meilleur résultat. Les logos JPG fonctionnent aussi mais incluront le fond.' },
      ],
    },
    es: {
      sections: [
        { h2: '¿Por qué agregar una marca de agua?', body: 'Las marcas de agua protegen tus fotos del uso no autorizado y establecen derechos de autor. Añade tu nombre, URL o logotipo a fotos comerciales y portafolios.' },
        { h2: 'Marca de agua de texto vs logo', body: 'Las marcas de texto son rápidas — escribe tu nombre o URL. Los logos funcionan mejor con PNG transparente. Ambos soportan opacidad, tamaño, posición y rotación.' },
      ],
      faqs: [
        { q: '¿Se modifica mi archivo original?', a: 'No — el original permanece sin cambios. Solo se descarga la versión con marca de agua.' },
        { q: '¿Necesito un logo PNG transparente?', a: 'PNG transparente da el mejor resultado. Los logos JPG también funcionan pero incluirán el fondo.' },
      ],
    },
  },

  'remove-exif': {
    ko: {
      sections: [
        { h2: 'EXIF 데이터란?', body: 'EXIF(Exchangeable Image File Format)는 디지털 카메라나 스마트폰이 사진을 촬영할 때 자동으로 파일 안에 기록하는 메타데이터입니다. 이미지를 화면에서 볼 때는 보이지 않지만 파일 안에 숨겨져 있어, EXIF 뷰어나 파일 속성 확인 도구로 쉽게 읽을 수 있습니다. EXIF 데이터는 주로 JPG 파일에 포함되어 있으며, 이미지를 공개 인터넷에 업로드하면 EXIF 정보도 함께 공개됩니다. PNG나 WebP로 변환하면 일부 EXIF가 제거되기도 하지만 완전하지 않을 수 있으므로, 공개 전 명시적으로 제거하는 것이 가장 확실합니다. Pixkit EXIF 제거 도구는 브라우저 안에서만 처리하므로 사진이 서버로 전송되지 않아 개인정보가 담긴 사진도 안심하고 사용할 수 있습니다.' },
        { h2: 'EXIF에 담긴 개인정보 종류', body: 'EXIF에는 생각보다 많은 개인정보가 담겨 있습니다. GPS 위도·경도·고도(±10m 정밀도)는 촬영 장소를 정확히 특정할 수 있습니다. 촬영 날짜와 정확한 시각도 기록됩니다. 스마트폰 기종·운영체제 버전·카메라 앱 정보도 포함됩니다. 렌즈 초점거리·ISO·셔터스피드·조리개값 등 촬영 설정도 담깁니다. 일부 기기는 기기 고유 시리얼 번호까지 기록합니다. 이 정보들이 결합되면 누가 어디서 언제 무엇으로 찍었는지를 특정할 수 있어 사생활 침해로 이어질 수 있습니다.' },
        { h2: '왜 EXIF를 삭제해야 하나?', body: '당근마켓·번개장터 같은 중고거래 플랫폼에 상품 사진을 올릴 때 집 주소가 GPS 좌표로 노출될 수 있습니다. SNS에 올리는 셀카나 여행 사진에도 정확한 위치 정보가 포함될 수 있습니다. 직장·학교·자녀가 있는 장소의 사진을 공개하면 스토킹 범죄로 이어질 수 있습니다. 어린이 사진을 SNS에 게시할 때는 특히 위치 정보 제거가 중요합니다. 프리랜서나 사진작가가 포트폴리오 사이트에 작품을 올릴 때도 촬영 장소·날짜 노출을 원하지 않는 경우가 많습니다. 개인정보 보호를 위해 사진을 공개 게시하기 전에 항상 EXIF를 확인하고 제거하는 습관을 들이는 것이 좋습니다.' },
        { h2: 'EXIF 확인 방법', body: '윈도우에서는 이미지 파일을 우클릭 → 속성 → 자세히 탭에서 GPS 정보를 포함한 EXIF 데이터를 확인할 수 있습니다. 맥에서는 사진 앱에서 이미지를 열고 정보 보기(Cmd+I) 또는 미리보기 앱에서 도구 → 검사기로 EXIF를 볼 수 있습니다. 스마트폰(iOS)에서는 설정 → 개인정보 보호 → 위치 서비스에서 카메라 위치 접근을 끄거나, 사진 앱에서 공유 시 위치 포함 여부를 선택할 수 있습니다. 안드로이드는 갤러리 앱에서 이미지 세부 정보를 확인하면 GPS 정보가 포함되어 있는지 알 수 있습니다. Pixkit에 이미지를 업로드하면 GPS 정보 포함 여부가 즉시 경고로 표시됩니다.' },
        { h2: 'SNS별 EXIF 처리 방식', body: '플랫폼마다 업로드된 이미지의 EXIF를 처리하는 방식이 다릅니다. 인스타그램은 업로드 시 일부 EXIF 데이터를 자동으로 제거하지만, GPS 정보가 완전히 삭제된다는 공식 보장은 없습니다. 페이스북도 업로드 과정에서 대부분의 EXIF를 제거하지만, 그 전에 서버에서 수집하여 타겟팅 등에 활용할 가능성이 있습니다. 트위터(X)는 2012년부터 GPS 메타데이터를 자동으로 제거하고 있습니다. 반면 플리커나 500px 같은 사진 공유 플랫폼은 원본 EXIF를 보존해 다른 사용자가 촬영 정보를 열람할 수 있습니다. 당근마켓·번개장터 같은 중고거래 플랫폼은 EXIF를 자동 제거하지 않는 경우가 많습니다. 플랫폼 정책이 언제든 바뀔 수 있으므로 어떤 플랫폼에 올리든 업로드 전에 직접 EXIF를 제거하는 것이 가장 확실한 방법입니다.' },
        { h2: 'Pixkit EXIF 제거 특징', body: 'Pixkit EXIF 제거 도구는 이미지를 업로드하면 GPS·날짜·카메라 정보 등 EXIF 항목을 즉시 표시합니다. GPS 정보가 포함된 경우 경고 배지가 표시되어 한눈에 확인할 수 있습니다. 제거 버튼 클릭 한 번으로 모든 메타데이터가 삭제됩니다. EXIF 제거는 픽셀 데이터에 전혀 영향을 주지 않으므로 이미지 화질은 원본과 100% 동일합니다. 처리된 파일은 브라우저에서 즉시 다운로드되며 서버에는 어떤 데이터도 저장되지 않습니다.' },
      ],
      faqs: [
        { q: 'EXIF 삭제하면 화질이 손상되나요?', a: 'EXIF는 픽셀 데이터와 완전히 분리된 메타데이터입니다. 제거해도 이미지 화질은 원본과 100% 동일하게 유지됩니다.' },
        { q: '삭제 후 복구가 가능한가요?', a: '일단 EXIF를 제거하고 저장하면 해당 메타데이터는 복구할 수 없습니다. 원본 파일은 변경되지 않으므로 원본에서 다시 확인할 수 있습니다.' },
        { q: '어떤 메타데이터가 삭제되나요?', a: 'GPS 위치, 촬영 날짜·시간, 카메라 기종, 렌즈 정보, ISO·셔터스피드·조리개값 등 모든 EXIF 메타데이터가 삭제됩니다. 특정 항목만 선택 삭제하는 기능은 현재 지원하지 않습니다.' },
        { q: '원본 파일이 변경되나요?', a: '원본 파일은 변경되지 않습니다. EXIF가 제거된 새 파일만 별도로 다운로드됩니다.' },
        { q: '여러 장을 한번에 처리할 수 있나요?', a: '현재는 단일 이미지를 지원합니다. 여러 장을 일괄 처리하는 기능은 추후 업데이트 예정입니다.' },
      ],
      links: [
        { text: 'EXIF 메타데이터 완전 가이드', href: '/blog/remove-exif-metadata' },
        { text: 'AI 배경 제거', href: '/remove-bg' },
      ],
    },
    en: {
      sections: [
        { h2: 'What is EXIF Data?', body: 'EXIF metadata is automatically recorded by cameras and smartphones. It includes GPS location, date/time, camera model, and shooting settings — all hidden inside your image file.' },
        { h2: 'When to Remove EXIF', body: 'When selling items on marketplace apps, your home\'s GPS location can be exposed via product photos. Profile photos and travel shots posted online may also contain location data. Remove EXIF before sharing publicly.' },
      ],
      faqs: [
        { q: 'Does removing EXIF affect image quality?', a: 'No — EXIF removal doesn\'t touch pixel data. Quality is identical to the original.' },
        { q: 'Is all EXIF data removed?', a: 'Yes — GPS, date, camera info, and all metadata is stripped. Selective removal is not currently supported.' },
        { q: 'Can I preview EXIF data before removing it?', a: 'Yes — after uploading, all EXIF data is displayed including GPS warnings. Review it before clicking Remove.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'EXIF डेटा क्या है?', body: 'EXIF मेटाडेटा कैमरों और स्मार्टफोन द्वारा स्वतः रिकॉर्ड किया जाता है। इसमें GPS स्थान, दिनांक/समय, कैमरा मॉडल और शूटिंग सेटिंग्स शामिल हैं — सभी आपकी इमेज फ़ाइल के अंदर छुपे होते हैं।' },
        { h2: 'EXIF कब हटाएं', body: 'मार्केटप्लेस ऐप्स पर आइटम बेचते समय, उत्पाद फोटो के ज़रिए आपके घर का GPS स्थान उजागर हो सकता है। प्रोफ़ाइल फोटो और यात्रा शॉट में भी स्थान डेटा हो सकता है। सार्वजनिक रूप से साझा करने से पहले EXIF हटाएं।' },
        { h2: 'EXIF हटाने के बाद छवि गुणवत्ता', body: 'EXIF हटाना इमेज पिक्सेल डेटा को बिल्कुल प्रभावित नहीं करता। दिखाई देने वाली गुणवत्ता मूल के समान रहती है। JPEG पुनः सेव पर गुणवत्ता स्लाइडर के अनुसार न्यूनतम पुनः संपीड़न हो सकता है।' },
        { h2: 'EXIF में कौन-कौन सी जानकारी होती है', body: 'EXIF में GPS अक्षांश/देशांतर/ऊंचाई, फोटो दिनांक और सटीक समय, स्मार्टफोन मॉडल और OS संस्करण, लेंस फ़ोकल लेंथ, ISO/शटर स्पीड/अपर्चर और कभी-कभी डिवाइस सीरियल नंबर शामिल होते हैं।' },
        { h2: 'गोपनीयता सुरक्षा अभ्यास', body: 'सार्वजनिक SNS या समुदाय पर पोस्ट करने से पहले हमेशा EXIF जांचें और हटाएं। बच्चों की फोटो सार्वजनिक रूप से पोस्ट करते समय विशेष रूप से स्थान जानकारी हटाने पर ध्यान दें।' },
      ],
      faqs: [
        { q: 'क्या EXIF हटाने से इमेज गुणवत्ता प्रभावित होती है?', a: 'नहीं — EXIF हटाना पिक्सेल डेटा को नहीं छूता। गुणवत्ता मूल के समान रहती है।' },
        { q: 'क्या सारा EXIF डेटा हट जाता है?', a: 'हां — GPS, दिनांक, कैमरा जानकारी और सभी मेटाडेटा हटाया जाता है। चयनात्मक निष्कासन वर्तमान में समर्थित नहीं है।' },
        { q: 'क्या हटाने से पहले EXIF डेटा प्रीव्यू कर सकते हैं?', a: 'हां — अपलोड के बाद GPS चेतावनियों सहित सभी EXIF डेटा प्रदर्शित होता है। Remove क्लिक करने से पहले समीक्षा करें।' },
      ],
    },
    ja: {
      sections: [
        { h2: 'EXIFデータとは？', body: 'EXIFはカメラやスマートフォンが写真に自動記録するメタデータです。GPS位置情報、撮影日時、カメラモデルなどが含まれます。' },
        { h2: 'EXIF削除が必要な場面', body: 'フリマアプリでの出品写真に自宅のGPS位置が含まれていることがあります。SNSに投稿する前にEXIFを削除することでプライバシーを保護できます。' },
      ],
      faqs: [
        { q: 'EXIF削除で画質は落ちますか？', a: 'いいえ。EXIF削除はピクセルデータに影響せず、画質は元のままです。' },
        { q: 'すべてのEXIFが削除されますか？', a: 'はい、GPS、日時、カメラ情報など全てのメタデータが削除されます。' },
      ],
    },
    zh: {
      sections: [
        { h2: '什么是EXIF数据？', body: 'EXIF是相机和智能手机自动记录在照片中的元数据，包括GPS位置、拍摄日期/时间、相机型号等信息，隐藏在图片文件内部。' },
        { h2: '何时需要删除EXIF', body: '在二手交易平台发布商品照片时，可能会暴露家庭位置信息。在社交媒体发布照片前删除EXIF可以保护个人隐私。' },
      ],
      faqs: [
        { q: '删除EXIF会影响图片质量吗？', a: '不会，EXIF删除不涉及像素数据，画质与原图完全相同。' },
        { q: '可以提前预览EXIF信息吗？', a: '可以，上传图片后会显示所有EXIF信息（包括GPS警告），确认后再点击删除。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Qu\'est-ce que les données EXIF ?', body: 'Les métadonnées EXIF sont automatiquement enregistrées par les appareils photo et smartphones. Elles incluent la localisation GPS, date/heure, modèle d\'appareil et paramètres de prise de vue.' },
        { h2: 'Quand supprimer les EXIF', body: 'Lors de ventes en ligne, la localisation GPS de votre domicile peut être exposée via les photos. Supprimez les EXIF avant tout partage public pour protéger votre vie privée.' },
      ],
      faqs: [
        { q: 'La suppression EXIF affecte-t-elle la qualité ?', a: 'Non — la suppression EXIF ne touche pas les pixels. La qualité est identique à l\'original.' },
        { q: 'Puis-je prévisualiser les données EXIF avant de les supprimer ?', a: 'Oui — après le téléchargement, toutes les données EXIF s\'affichent, y compris les avertissements GPS.' },
      ],
    },
    es: {
      sections: [
        { h2: '¿Qué son los datos EXIF?', body: 'Los metadatos EXIF son registrados automáticamente por cámaras y smartphones. Incluyen ubicación GPS, fecha/hora, modelo de cámara y configuraciones de disparo.' },
        { h2: 'Cuándo eliminar EXIF', body: 'Al vender artículos en plataformas de segunda mano, la ubicación GPS de tu hogar puede quedar expuesta. Elimina EXIF antes de publicar fotos en internet.' },
      ],
      faqs: [
        { q: '¿Eliminar EXIF afecta la calidad?', a: 'No — la eliminación de EXIF no toca los píxeles. La calidad es idéntica al original.' },
        { q: '¿Puedo previsualizar los datos EXIF antes de eliminarlos?', a: 'Sí — tras subir la imagen, se muestran todos los datos EXIF incluyendo advertencias de GPS.' },
      ],
    },
  },

  'qr-code': {
    ko: {
      sections: [
        {
          h2: 'QR코드란?',
          body: 'QR코드(Quick Response Code)는 1994년 일본 덴소웨이브가 자동차 부품 추적을 위해 개발한 2차원 바코드입니다. 가로·세로 두 방향으로 데이터를 저장해 일반 바코드보다 수십 배 많은 정보를 담을 수 있으며, 스마트폰 카메라만 있으면 별도 앱 없이도 즉시 읽을 수 있습니다. 오늘날에는 URL, 연락처, WiFi 비밀번호, 결제 정보 등 거의 모든 디지털 데이터를 QR코드로 변환해 오프라인 세계와 온라인 세계를 연결하는 데 쓰입니다. 스마트폰 보급률이 높아지면서 식당 메뉴, 교통 승차권, 이벤트 입장권, 명함까지 QR코드가 쓰이지 않는 곳을 찾기 어려울 정도가 됐습니다.\n\nQR코드에는 오류 정정 기능이 내장되어 있어 코드의 일부가 더럽혀지거나 긁혀도 정상적으로 인식됩니다. 오류 정정 레벨은 L(7%), M(15%), Q(25%), H(30%) 네 단계로, 레벨이 높을수록 손상에 강하지만 코드가 조금 더 복잡해집니다. Pixkit은 로고를 삽입할 때 자동으로 H 레벨을 적용해 로고에 가려진 부분을 보정합니다.',
        },
        {
          h2: 'QR코드 활용 사례',
          body: '가장 일상적인 활용은 URL 연결입니다. 명함에 QR코드를 인쇄해두면 상대방이 직접 URL을 타이핑하지 않고도 내 포트폴리오나 링크드인 프로필로 바로 이동할 수 있습니다. 식당과 카페는 메뉴판 대신 테이블에 QR코드를 두어 위생적으로 디지털 메뉴를 제공합니다. 이벤트 주최자는 포스터와 현수막에 QR코드를 넣어 등록 페이지로 바로 연결하고, 상품 패키지에는 사용 설명서, 보증서, 재구매 링크를 QR코드로 담습니다.\n\nWiFi 비밀번호 QR코드는 카페, 사무실, 숙박 시설에서 특히 유용합니다. 손님이 비밀번호를 일일이 입력하지 않고도 카메라만 갖다 대면 자동으로 연결됩니다. 결제 분야에서도 QR코드는 빠질 수 없습니다. 카카오페이, 네이버페이, 토스 같은 간편결제 서비스 모두 QR코드 기반으로 작동합니다. 인쇄 광고물에 QR코드를 삽입하면 오프라인에서 온라인 캠페인 전환율을 측정할 수 있어 마케터들이 즐겨 활용합니다.',
        },
        {
          h2: 'QR코드 설계 팁',
          body: '스캔 인식률에 가장 큰 영향을 주는 요소는 색상 대비입니다. 밝은 배경 위에 어두운 QR 패턴이 기본 공식이며, 흰 배경에 검정 QR이 인식률이 가장 높습니다. 컬러 QR을 만들더라도 QR 모듈과 배경 사이의 명도 차이가 최소 50% 이상 나야 다양한 스캔 환경에서 안정적으로 인식됩니다. 절대 피해야 할 조합은 QR과 배경의 색상이 비슷하거나 둘 다 밝은 경우입니다.\n\n여백(Quiet Zone)도 중요합니다. QR코드 사방으로 최소 4모듈 이상의 빈 공간을 확보해야 스캐너가 코드의 경계를 정확히 인식합니다. 로고를 삽입하고 싶다면 전체 면적의 30% 이내로 제한하세요. 그 이상 넘어가면 오류 정정 기능으로도 보완되지 않아 스캔 실패율이 급격히 올라갑니다. 인쇄물에는 최소 500px 이상 해상도로 출력해야 계단 현상 없이 선명하게 인쇄됩니다. 명함 크기라면 2cm 이상, A4 포스터라면 5cm 이상을 권장합니다.',
        },
        {
          h2: 'QR코드 스캔이 잘 되게 하는 법',
          body: '아무리 잘 만든 QR코드도 환경이 나쁘면 잘 읽히지 않습니다. 인쇄 전에 반드시 화면에서 스마트폰 두 기종 이상으로 테스트 스캔해보세요. iOS 기본 카메라와 안드로이드 기본 카메라 앱 모두에서 정상 작동하는지 확인해야 합니다.\n\n종이에 인쇄한 QR코드라면 광택 코팅을 피하는 것이 좋습니다. 광택 코팅은 빛이 반사되어 인식률을 낮춥니다. 무광 코팅이나 코팅 없는 용지가 안전합니다. 야외 현수막처럼 햇빛이 강하게 닿는 환경도 마찬가지입니다. 화면에 표시하는 QR코드(키오스크, 스마트 TV)는 화면 밝기를 충분히 높이고, 주변 조명과 화면의 대비가 충분한지 확인하세요.\n\nURL이 길면 QR코드가 복잡해져 인식률이 낮아질 수 있습니다. bit.ly나 han.gl 같은 단축 URL 서비스를 먼저 거치면 QR 패턴이 훨씬 단순해지고 인식률이 올라갑니다. Pixkit으로 QR코드를 생성할 때도 입력 전에 URL을 미리 단축해두면 더 깔끔한 결과물을 얻을 수 있습니다.',
        },
        {
          h2: '정적 QR vs 동적 QR 차이',
          body: 'QR코드에는 크게 정적(Static) QR과 동적(Dynamic) QR 두 종류가 있습니다. 정적 QR은 URL이나 텍스트가 코드 패턴 안에 직접 인코딩됩니다. 한번 만들면 내용을 바꿀 수 없지만, 별도 서버나 구독 서비스 없이 영구적으로 사용할 수 있고 스캔 횟수 제한도 없습니다. 명함·포스터·포장재처럼 한 번 인쇄 후 장기간 사용하는 인쇄물에 적합합니다.\n\n동적 QR은 코드 안에 짧은 리디렉션 URL을 인코딩하고, 이 URL이 실제 목적지 URL로 연결됩니다. 인쇄 후에도 목적지 URL을 언제든 변경할 수 있고 스캔 횟수·위치·기기 통계를 수집할 수 있습니다. 이벤트 QR코드나 마케팅 캠페인처럼 URL 변경이나 성과 측정이 필요한 경우에 유용합니다. 단, 동적 QR은 리디렉션 서버를 운영하는 유료 서비스에 의존하기 때문에 서비스가 종료되면 QR코드가 무효화될 수 있습니다.\n\nPixkit이 생성하는 QR코드는 정적 코드입니다. 단순 홍보물이나 개인 명함처럼 통계 추적이 필요 없다면 정적 QR이 비용 없이 가장 안정적인 선택입니다.',
        },
        {
          h2: 'Pixkit QR코드 생성 특징',
          body: 'Pixkit은 별도 계정이나 설치 없이 브라우저에서 바로 QR코드를 만들 수 있는 무료 온라인 도구입니다. URL, 텍스트, WiFi 정보 등 원하는 데이터를 입력하고 크기와 색상을 설정한 뒤 PNG로 다운로드하면 끝입니다. 생성한 QR코드는 서버에 저장되지 않으며 브라우저 안에서만 처리되므로 입력 정보가 외부로 유출될 걱정이 없습니다.\n\n로고 삽입 기능을 사용하면 브랜드 아이덴티티가 담긴 QR코드를 만들 수 있습니다. 이때 Pixkit은 자동으로 오류 정정 레벨을 H(30%)로 높여 로고에 가려진 영역을 보정합니다. 고해상도(최대 1024px) 출력을 지원하므로 명함부터 포스터까지 다양한 인쇄물에 활용할 수 있습니다. 생성된 QR코드는 정적 코드이기 때문에 별도 구독료 없이 영구적으로 사용할 수 있으며, 스캔 횟수 제한도 없습니다.',
        },
      ],
      faqs: [
        { q: 'QR코드 만들기가 어렵지 않나요?', a: 'Pixkit에서는 URL이나 텍스트를 입력하고 크기를 정한 뒤 PNG로 다운로드하면 됩니다. 계정 생성이나 앱 설치 없이 브라우저에서 30초 안에 완성할 수 있습니다.' },
        { q: '무료 QR코드는 만료되거나 유효 기간이 있나요?', a: 'Pixkit이 생성하는 QR코드는 정적(static) 코드입니다. URL이 코드 안에 직접 인코딩되어 있어 별도 서버나 구독 없이 영구적으로 사용 가능하며, 스캔 횟수 제한도 없습니다.' },
        { q: 'QR코드에 로고를 넣으면 스캔이 안 되지 않나요?', a: '로고가 QR 면적의 30% 이내라면 문제없습니다. Pixkit은 로고 삽입 시 오류 정정 레벨을 자동으로 H(30%)로 설정해 가려진 부분을 보정하기 때문에 정상적으로 스캔됩니다.' },
        { q: 'QR코드가 스캔되지 않을 때 어떻게 하나요?', a: '배경과 QR 색상 대비가 충분한지 먼저 확인하세요. 그다음으로 로고 크기를 30% 이내로 줄이거나, QR 주변 여백을 더 넓히세요. URL이 길다면 단축 URL로 변환 후 재생성하면 인식률이 크게 올라갑니다.' },
        { q: 'QR코드 생성 시 어떤 형식으로 다운로드되나요?', a: 'PNG 형식으로 다운로드됩니다. 고해상도(600px 이상)로 설정하면 명함·포스터 같은 인쇄물에도 선명하게 사용할 수 있습니다. PNG는 배경 투명도를 지원해 다양한 디자인에 자유롭게 합성할 수 있습니다.' },
      ],
      links: [
        { text: 'QR코드 생성 완벽 가이드', href: '/blog/qr-code-generator-guide' },
        { text: '이미지 리사이즈', href: '/resize' },
      ],
    },
    en: {
      sections: [
        { h2: 'QR Code Use Cases', body: 'Link business cards to your website, restaurant menus to online ordering, posters to event registration, or product packaging to user manuals. Create WiFi QR codes for easy guest network sharing.' },
        { h2: 'Error Correction and Logos', body: 'QR codes have built-in error correction so they work even when partially obscured. Adding a logo covers part of the code — Pixkit automatically uses a higher error correction level to compensate.' },
        { h2: 'Size for Printing', body: 'Minimum recommended sizes: business cards 2-3 cm, posters 5 cm+. Export at 500px+ for crisp print quality.' },
      ],
      faqs: [
        { q: 'Will a QR code with a logo still scan?', a: 'Yes — Pixkit uses high error correction when you add a logo. Keep the logo under 30% of the QR area for best results.' },
        { q: 'Are the generated QR codes permanent?', a: 'Yes — static QR codes encode the URL directly. No server required, they work forever.' },
        { q: 'My QR code won\'t scan.', a: 'Check that there\'s enough contrast between the QR color and background. Reduce logo size or increase margin.' },
      ],
    },
    hi: {
      sections: [
        { h2: 'QR कोड के उपयोग के मामले', body: 'बिज़नेस कार्ड को अपनी वेबसाइट से लिंक करें, रेस्तरां मेनू को ऑनलाइन ऑर्डरिंग से, पोस्टर को इवेंट रजिस्ट्रेशन से, या उत्पाद पैकेजिंग को उपयोगकर्ता मैनुअल से। WiFi QR कोड बनाएं ताकि मेहमान आसानी से नेटवर्क से जुड़ सकें।' },
        { h2: 'त्रुटि सुधार और लोगो', body: 'QR कोड में बिल्ट-इन त्रुटि सुधार होता है जिससे वे आंशिक रूप से अस्पष्ट होने पर भी काम करते हैं। लोगो जोड़ने पर Pixkit स्वतः उच्च त्रुटि सुधार स्तर उपयोग करता है।' },
        { h2: 'प्रिंट के लिए आकार', body: 'न्यूनतम अनुशंसित आकार: बिज़नेस कार्ड के लिए 2-3 सेमी, पोस्टर के लिए 5 सेमी+। स्पष्ट प्रिंट गुणवत्ता के लिए 500 px+ पर निर्यात करें।' },
        { h2: 'QR कोड पहचान दर बढ़ाने के टिप्स', body: 'QR रंग और पृष्ठभूमि के बीच पर्याप्त कंट्रास्ट बनाए रखें। सफेद पृष्ठभूमि पर काला QR सबसे अधिक पहचान दर देता है। लोगो कुल क्षेत्र के 30% से अधिक न हो।' },
        { h2: 'प्रिंट QR कोड के लिए इष्टतम सेटिंग', body: 'प्रिंट सामग्री के लिए QR रिज़ॉल्यूशन कम से कम 600 px रखें। त्रुटि सुधार स्तर H(उच्च) पर सेट करें। रंगीन प्रिंट के लिए वास्तविक प्रिंट से पहले स्मार्टफोन से टेस्ट स्कैन करें।' },
      ],
      faqs: [
        { q: 'क्या लोगो वाला QR कोड फिर भी स्कैन होगा?', a: 'हां — Pixkit लोगो जोड़ने पर उच्च त्रुटि सुधार उपयोग करता है। QR क्षेत्र के 30% से कम लोगो रखें।' },
        { q: 'क्या बनाए गए QR कोड स्थायी हैं?', a: 'हां — स्टेटिक QR कोड URL सीधे एनकोड करते हैं। कोई सर्वर आवश्यक नहीं, ये हमेशा काम करते हैं।' },
        { q: 'मेरा QR कोड स्कैन नहीं हो रहा।', a: 'QR रंग और बैकग्राउंड के बीच पर्याप्त कंट्रास्ट जांचें। लोगो आकार घटाएं या मार्जिन बढ़ाएं।' },
      ],
    },
    ja: {
      sections: [
        { h2: 'QRコードの活用アイデア', body: '名刺のURL、レストランのメニュー、ポスターのイベント登録、WiFiパスワード共有など様々な用途に使えます。' },
        { h2: 'エラー訂正とロゴ', body: 'QRコードにはエラー訂正機能があり、一部が隠れても読み取れます。ロゴを挿入するとPixkitが自動的に高いエラー訂正レベルを設定します。' },
      ],
      faqs: [
        { q: 'ロゴ入りQRコードはスキャンできますか？', a: 'はい。Pixkitはロゴ挿入時に高エラー訂正レベルを使用します。ロゴはQRエリアの30%以内に収めてください。' },
        { q: '生成したQRコードは永久に使えますか？', a: 'はい。URLをコード内に直接エンコードした静的QRコードなので、サーバー不要で永久に使用できます。' },
      ],
    },
    zh: {
      sections: [
        { h2: '二维码使用创意', body: '名片链接网站、餐厅菜单、海报活动报名、产品包装说明书，或者WiFi密码分享都可以用二维码实现。' },
        { h2: '纠错能力与Logo', body: '二维码内置纠错功能，即使部分遮挡也能读取。插入Logo后Pixkit会自动使用更高的纠错级别来补偿。' },
      ],
      faqs: [
        { q: '加了Logo的二维码还能扫描吗？', a: '可以，Pixkit在添加Logo时自动使用高纠错级别。建议Logo不超过二维码面积的30%。' },
        { q: '生成的二维码可以永久使用吗？', a: '可以，静态二维码将URL直接编码在其中，无需服务器，可永久使用。' },
      ],
    },
    fr: {
      sections: [
        { h2: 'Idées d\'utilisation des QR codes', body: 'Liez des cartes de visite à votre site, des menus de restaurant à la commande en ligne, des affiches à l\'inscription événementielle, ou des emballages produits aux modes d\'emploi.' },
        { h2: 'Correction d\'erreurs et logos', body: 'Les QR codes ont une correction d\'erreurs intégrée pour fonctionner même partiellement obstrués. Pixkit utilise automatiquement un niveau de correction plus élevé lors de l\'ajout d\'un logo.' },
      ],
      faqs: [
        { q: 'Un QR code avec logo sera-t-il scannable ?', a: 'Oui — Pixkit utilise une correction d\'erreurs élevée pour les logos. Gardez le logo sous 30% de la zone QR.' },
        { q: 'Les QR codes générés sont-ils permanents ?', a: 'Oui — les QR codes statiques encodent l\'URL directement. Aucun serveur requis, ils fonctionnent indéfiniment.' },
      ],
    },
    es: {
      sections: [
        { h2: 'Ideas de uso para códigos QR', body: 'Enlaza tarjetas de presentación a tu sitio web, menús de restaurantes, carteles de registro de eventos, o packaging de productos a manuales de usuario.' },
        { h2: 'Corrección de errores y logos', body: 'Los códigos QR tienen corrección de errores integrada. Pixkit usa automáticamente un nivel más alto al añadir un logo para compensar la oclusión.' },
      ],
      faqs: [
        { q: '¿Un QR con logo seguirá siendo escaneable?', a: 'Sí — Pixkit usa alta corrección de errores con logos. Mantén el logo bajo el 30% del área QR.' },
        { q: '¿Los códigos QR generados son permanentes?', a: 'Sí — los QR estáticos codifican la URL directamente. Sin servidor requerido, funcionan indefinidamente.' },
      ],
    },
  },

  upscale: {
    ko: {
      sections: [
        { h2: 'AI 이미지 업스케일링이란?', body: '이미지 업스케일링(Image Upscaling)은 저해상도 이미지를 더 높은 해상도로 확대하는 기술입니다. 일반적인 확대 방식은 있는 픽셀을 단순히 늘려 복제하기 때문에 확대할수록 계단 현상(픽셀화)과 흐릿함이 생깁니다. AI 업스케일링은 이와 달리 딥러닝 알고리즘이 주변 픽셀 패턴을 분석해 없는 픽셀을 예측하고 채워 넣습니다. 마치 화가가 흐릿한 밑그림을 보고 세부를 추론해 그려내는 것처럼, AI가 이미지의 맥락을 파악해 새로운 픽셀을 생성합니다.\n\nPixkit의 AI 업스케일링 도구는 TensorFlow.js를 브라우저에서 직접 실행해 파일이 서버로 전송되지 않습니다. WebGL 가속을 활용해 GPU에서 텐서 연산을 수행하므로 서버 없이도 빠른 처리가 가능합니다. 모델 로딩은 최초 1회만 필요하며, 이후 처리는 훨씬 빠르게 완료됩니다.' },
        { h2: '언제 필요한가?', body: '오래된 사진이나 스캔본을 고화질로 복원할 때 AI 업스케일링이 가장 빛납니다. 10년 전에 찍은 저화질 사진을 현재 모니터나 인쇄용으로 확대할 때 단순 확대보다 훨씬 선명한 결과를 얻을 수 있습니다.\n\n인터넷에서 찾은 작은 이미지를 포스터나 현수막 인쇄물에 사용해야 할 때도 유용합니다. 일반적으로 A4 용지에 고품질 인쇄를 하려면 300 DPI 이상이 필요한데, 작은 이미지를 단순 확대하면 깨진 이미지가 인쇄됩니다. AI 업스케일링을 거치면 화질 저하를 최소화하면서 큰 크기로 출력할 수 있습니다.\n\n유튜브 썸네일이나 블로그 대표 이미지를 만들 때 저화질 소스 이미지를 1280×720 이상으로 업스케일하는 용도로도 많이 사용됩니다. 게임 캡처 스크린샷이나 웹캠 촬영 이미지처럼 원래 해상도가 낮은 이미지를 SNS에 올리기 전에 화질을 높일 때도 효과적입니다.' },
        { h2: '일반 확대 vs AI 업스케일링 비교', body: '일반 확대(Nearest Neighbor)는 각 픽셀을 지정 배율만큼 복제합니다. 2배 확대 시 1개 픽셀이 2×2=4개 픽셀로 복제되어 전형적인 계단 현상이 발생합니다. 결과물이 블록처럼 보이는 픽셀화(pixelation)가 심하게 나타납니다.\n\n바이리니어(Bilinear)·바이큐빅(Bicubic) 보간법은 주변 픽셀의 평균값을 계산해 새 픽셀을 생성합니다. 계단 현상은 줄어들지만 경계선이 흐릿해지는 부작용이 있습니다. 확대할수록 전체적으로 뭉개진 느낌이 납니다.\n\nAI 업스케일링은 학습된 딥러닝 모델이 이미지 패턴을 이해하고 주변 맥락에 적합한 픽셀을 예측합니다. 경계선의 선명도를 유지하면서도 블록 현상 없이 자연스러운 확대가 가능합니다. 특히 텍스트, 건물 외벽, 반복 패턴이 있는 이미지에서 일반 확대와의 차이가 두드러집니다.' },
        { h2: '2배 vs 4배 선택 기준', body: '2배(2×) 업스케일은 처리 속도가 빠르고 결과 파일 크기가 4배에 비해 작습니다. 예를 들어 1000×1000 이미지는 2000×2000으로 변환됩니다. 이미 적정 해상도를 갖추고 있지만 조금 더 큰 출력이 필요할 때 적합합니다. SNS 업로드, 웹사이트 이미지, 작은 인쇄물에 적합한 선택입니다.\n\n4배(4×) 업스케일은 최고 품질을 얻을 수 있지만 처리 시간이 길고 파일 크기가 상당히 커집니다. 1000×1000 이미지가 4000×4000으로 변환됩니다. 인쇄용 포스터, 현수막, 대형 출력물처럼 고해상도가 필요한 경우에 사용하세요. 원본 이미지가 매우 작거나(500px 이하) 오래된 저화질 사진을 복원할 때도 4배가 효과적입니다.\n\n입력 이미지가 1500px 이상인 경우 4배 업스케일 시 출력이 6000px를 초과할 수 있어 처리 시간이 많이 걸릴 수 있습니다. 이런 경우 2배를 먼저 적용하거나 리사이즈로 입력 크기를 줄인 뒤 업스케일하는 방법을 추천합니다.' },
        { h2: 'Pixkit AI 업스케일링 특징', body: 'Pixkit AI 업스케일링은 TensorFlow.js를 기반으로 모든 처리가 사용자 브라우저 안에서만 이루어집니다. 이미지가 서버로 전송되지 않으므로 개인 사진, 업무 문서 이미지, 미공개 작품도 안심하고 처리할 수 있습니다. WebGL 백엔드를 활용해 GPU 가속으로 텐서 연산을 수행하므로 순수 CPU 처리보다 훨씬 빠릅니다.\n\n업스케일 후 이미지 경계부에 언샤프 마스킹(Unsharp Masking) 기법을 적용해 선명도를 추가로 높입니다. 이 기법은 고급 사진 편집 소프트웨어에서도 널리 사용되는 후처리 방식입니다. 결과물은 JPEG 95% 품질로 다운로드되며, 원본 파일은 변경되지 않습니다. 회원가입 없이 브라우저만 있으면 무제한 무료로 사용할 수 있습니다.' },
      ],
      faqs: [
        { q: '처리 시간이 얼마나 걸리나요?', a: '이미지 크기와 배율에 따라 다릅니다. 1000×1000 이미지 2배 업스케일 기준으로 대부분의 기기에서 5~15초 내에 완료됩니다. 4배 업스케일이나 큰 이미지는 더 오래 걸릴 수 있습니다. 최초 실행 시 AI 모델 로딩에 추가 시간이 필요합니다.' },
        { q: '어떤 이미지에 가장 효과적인가요?', a: '텍스트가 포함된 이미지, 건물·풍경 사진, 선이 명확한 일러스트에서 특히 효과가 좋습니다. 이미 흐릿하거나 극단적으로 압축된 JPEG 이미지는 AI 업스케일로도 완전한 복원이 어려울 수 있습니다.' },
        { q: '파일 크기가 많이 커지나요?', a: '해상도가 2배로 늘면 픽셀 수는 4배가 되므로 파일 크기도 크게 증가합니다. JPEG 95% 품질로 저장하므로 원본 대비 3~5배 커지는 경우가 일반적입니다. 용량이 중요하다면 리사이즈 도구로 최종 크기를 조절하세요.' },
        { q: '최대 몇 픽셀까지 업스케일 가능한가요?', a: '기술적 제한은 없지만 브라우저 메모리에 따라 처리 가능한 크기가 달라집니다. 입력 이미지의 긴 변 기준 2000px 이하일 때 2배·4배 모두 안정적으로 처리됩니다. 더 큰 이미지는 먼저 리사이즈 도구로 크기를 줄이고 업스케일하세요.' },
        { q: '모바일에서도 사용 가능한가요?', a: '네, 크롬·사파리 최신 버전이 설치된 모바일에서도 사용 가능합니다. 다만 모바일 기기는 데스크톱보다 메모리와 GPU 성능이 낮아 처리 시간이 더 오래 걸릴 수 있습니다. 작은 이미지(500px 이하)를 2배 업스케일하는 용도로 사용하는 것을 권장합니다.' },
      ],
      links: [
        { text: '이미지 리사이즈', href: '/resize' },
        { text: 'AI 배경 제거', href: '/remove-bg' },
        { text: 'AI 업스케일링 완전 가이드', href: '/blog/image-upscaling-guide' },
      ],
    },
    en: {
      sections: [
        { h2: 'What is AI Image Upscaling?', body: 'Standard upscaling copies existing pixels, resulting in blocky pixelation. AI upscaling uses deep learning to analyze surrounding pixel patterns and predict new pixels, producing sharper results with preserved edges.' },
        { h2: 'When to Use It', body: 'Restoring old low-resolution photos, enlarging small images for print, converting thumbnails to high-resolution, and improving web-compressed images before sharing.' },
        { h2: '2x vs 4x', body: '2x is faster and produces smaller files — ideal for web and social media. 4x gives maximum quality for print or large displays but takes longer to process.' },
        { h2: 'Pixkit AI Upscale Features', body: 'Powered by TensorFlow.js running entirely in your browser. No server uploads. GPU-accelerated via WebGL. Unsharp masking applied after upscaling for extra sharpness. Free and unlimited.' },
      ],
      faqs: [
        { q: 'How long does processing take?', a: 'A 1000×1000 image at 2x typically takes 5–15 seconds. Larger images or 4x scale take longer. First run requires AI model loading.' },
        { q: 'Which images benefit most?', a: 'Images with text, buildings, landscapes, and clear lines show the most improvement. Heavily compressed JPEG images may have limited improvement.' },
        { q: 'Does file size increase a lot?', a: '2x upscaling quadruples pixel count, so file size increases significantly — typically 3–5x the original. Use the resize tool to reduce final dimensions if needed.' },
        { q: 'Is it available on mobile?', a: 'Yes — modern Chrome and Safari on iOS/Android are supported. Mobile devices process more slowly, so smaller images are recommended.' },
      ],
    },
  },
};

export default function ToolGuide({ tool }) {
  const locale = useLocale();
  const guide = guides[tool]?.[locale] || guides[tool]?.en;
  const label = faqLabels[locale] || faqLabels.en;
  if (!guide) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <section className="mt-16 border-t border-card-border pt-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {guide.sections.map(({ h2, body }) => (
        <div key={h2} className="mb-8">
          <h2 className="text-base font-semibold font-heading text-gold mb-3">{h2}</h2>
          <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">{body}</p>
        </div>
      ))}
      <div className="mt-10">
        <h2 className="text-base font-semibold font-heading text-gold mb-4">{label}</h2>
        <div className="space-y-3">
          {guide.faqs.map((faq) => (
            <div key={faq.q} className="card-glow rounded-xl p-5">
              <h3 className="font-semibold text-sm text-text-primary mb-2">{faq.q}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      {guide.links && guide.links.length > 0 && (
        <div className="mt-10">
          <h2 className="text-base font-semibold font-heading text-gold mb-4">관련 도구 및 가이드</h2>
          <div className="flex flex-wrap gap-2">
            {guide.links.map((link) => {
              const isExternal = link.href.startsWith('http');
              const href = isExternal ? link.href : `/${locale}${link.href}`;
              return (
                <a
                  key={link.href}
                  href={href}
                  className="text-xs px-3 py-1.5 rounded-md border border-card-border text-text-secondary hover:border-gold hover:text-gold transition-colors"
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.text}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
