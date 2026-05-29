'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../i18n/navigation';
import EzoicAd from '../../components/EzoicAd';
import KakaoAd from '../../components/KakaoAd';

const toolDetails = {
  ko: [
    { key: 'resize', title: '이미지 리사이즈', desc: 'JPG, PNG, WebP 등 다양한 형식의 이미지 크기를 원하는 픽셀로 자유롭게 변경할 수 있습니다. HD, FHD, 인스타그램, 유튜브 썸네일 등 자주 쓰는 사이즈 프리셋도 제공합니다. 비율 유지 옵션으로 이미지가 찌그러지는 걱정 없이 손쉽게 리사이즈할 수 있으며, 품질 슬라이더로 파일 크기와 화질의 균형을 직접 조절할 수 있습니다.' },
    { key: 'batch', title: '일괄 리사이즈', desc: '여러 장의 이미지를 한 번에 같은 설정으로 리사이즈할 수 있습니다. 쇼핑몰 상품 사진, 블로그 이미지, 포트폴리오 정리 등 대량 작업에 최적화되어 있습니다. 각 파일의 처리 상태를 실시간으로 확인할 수 있으며, 완료 후 전체 파일을 한꺼번에 다운로드할 수 있습니다.' },
    { key: 'imgToPdf', title: '이미지 → PDF 변환', desc: '여러 장의 이미지를 하나의 PDF 파일로 합칠 수 있습니다. 스캔한 문서, 계약서 사진, 포트폴리오 등을 PDF로 정리할 때 유용합니다. 드래그로 페이지 순서를 변경할 수 있으며, 품질 설정으로 파일 크기를 조절할 수 있습니다. 서버 업로드 없이 브라우저에서 직접 PDF를 생성합니다.' },
    { key: 'pdfToImg', title: 'PDF → 이미지 변환', desc: 'PDF 파일의 각 페이지를 고화질 이미지(JPG, PNG, WebP)로 변환합니다. 전체 페이지를 한꺼번에 추출하거나 원하는 페이지만 선택해서 추출할 수 있습니다. 프레젠테이션 슬라이드를 이미지로 바꾸거나, PDF 내 특정 페이지만 이미지로 저장할 때 편리합니다.' },
    { key: 'crop', title: '이미지 크롭', desc: '이미지의 원하는 영역만 잘라낼 수 있는 도구입니다. 자유 비율 크롭은 물론 1:1, 16:9, 4:3 등 고정 비율 크롭을 지원합니다. SNS 프로필 사진, 유튜브 썸네일, 블로그 커버 이미지 등 각 용도에 맞는 비율로 정확하게 자를 수 있습니다. 원본 화질이 그대로 유지됩니다.' },
    { key: 'rotate', title: '회전 / 뒤집기', desc: '이미지를 90도, 180도 회전하거나 좌우/상하로 뒤집을 수 있습니다. 스마트폰으로 촬영한 사진의 방향이 잘못되었을 때 빠르게 교정할 수 있고, 셀카 좌우 반전도 한 번에 처리됩니다. 90도 단위 회전은 픽셀을 재배치하는 방식이라 화질 손실이 전혀 없습니다.' },
    { key: 'convert', title: '이미지 형식 변환', desc: 'JPG, PNG, WebP, HEIC, GIF, BMP 등 다양한 이미지 형식 간 변환을 지원합니다. 특히 아이폰에서 촬영한 HEIC 사진을 JPG로 간편하게 변환할 수 있습니다. 웹사이트용으로 WebP 변환을 하면 JPG 대비 25~35% 작은 파일 크기에 동일한 화질을 유지할 수 있습니다.' },
    { key: 'watermark', title: '워터마크', desc: '이미지에 텍스트 또는 로고 워터마크를 추가하여 저작권을 보호할 수 있습니다. 위치, 크기, 투명도, 회전 각도를 자유롭게 조절할 수 있으며, 타일(반복) 패턴으로 전체 이미지에 워터마크를 적용하는 것도 가능합니다. 포트폴리오 공유나 작품 보호에 유용합니다.' },
    { key: 'merge', title: '이미지 합치기', desc: '여러 장의 이미지를 가로, 세로, 또는 그리드(2×2, 3×3) 형태로 합칠 수 있습니다. 전후 비교 이미지 만들기, 포트폴리오 콜라주, 상품 다각도 이미지 등 다양하게 활용할 수 있습니다. 이미지 순서를 드래그로 변경할 수 있고 간격과 배경색도 조절 가능합니다.' },
    { key: 'removeExif', title: 'EXIF 메타데이터 제거', desc: '사진에 숨겨진 GPS 위치정보, 촬영 시간, 카메라 모델 등 개인정보를 담은 EXIF 메타데이터를 안전하게 제거합니다. SNS나 중고거래 사이트에 사진을 올리기 전에 개인정보를 보호하세요. 이미지 화질은 그대로 유지되며 메타데이터만 삭제됩니다.' },
    { key: 'qrCode', title: 'QR코드 생성', desc: 'URL, 텍스트, 연락처 정보 등을 QR코드로 변환할 수 있습니다. QR코드 색상과 배경색을 자유롭게 커스텀할 수 있고, 로고 이미지를 삽입하는 것도 가능합니다. 명함, 전단지, 매장 안내, 행사 홍보 등 다양한 용도로 활용할 수 있습니다.' },
    { key: 'removeBg', title: 'AI 배경 제거', desc: 'AI 딥러닝 모델을 사용하여 이미지에서 배경을 자동으로 제거합니다. 인물, 제품, 동물 등 다양한 피사체를 인식하여 정교하게 배경을 분리합니다. 수동 편집 모드에서 브러시로 세밀하게 보정할 수도 있습니다. AI 모델이 브라우저에서 직접 실행되므로 이미지가 서버로 전송되지 않습니다.' },
  ],
  en: [
    { key: 'resize', title: 'Image Resize', desc: 'Freely change the dimensions of JPG, PNG, WebP, and other image formats to any pixel size. Presets for HD, FHD, Instagram, YouTube thumbnails, and more are included. The aspect ratio lock ensures your images never get distorted, and the quality slider lets you balance file size and quality.' },
    { key: 'batch', title: 'Batch Resize', desc: 'Resize multiple images at once with the same settings. Optimized for e-commerce product photos, blog images, and portfolio organization. Track each file\'s processing status in real-time and download everything at once when complete.' },
    { key: 'imgToPdf', title: 'Image → PDF', desc: 'Combine multiple images into a single PDF file. Great for scanned documents, contracts, and portfolios. Drag to reorder pages and adjust quality settings. PDFs are generated directly in your browser with no server uploads.' },
    { key: 'pdfToImg', title: 'PDF → Image', desc: 'Convert each page of a PDF into high-quality JPG, PNG, or WebP images. Extract all pages at once or select specific ones. Perfect for converting presentation slides or saving individual PDF pages as images.' },
    { key: 'crop', title: 'Image Crop', desc: 'Crop any area from your image with free-form or fixed ratio options including 1:1, 16:9, and 4:3. Perfect for social media profiles, YouTube thumbnails, and blog covers. Original quality is fully preserved after cropping.' },
    { key: 'rotate', title: 'Rotate & Flip', desc: 'Rotate images by 90° or 180°, or flip them horizontally and vertically. Quickly fix wrong photo orientations from smartphones or correct mirrored selfies. 90° rotations simply rearrange pixels with zero quality loss.' },
    { key: 'convert', title: 'Format Convert', desc: 'Convert between JPG, PNG, WebP, HEIC, GIF, and BMP formats. Especially useful for converting iPhone HEIC photos to JPG. WebP conversion delivers 25-35% smaller files than JPG at the same visual quality.' },
    { key: 'watermark', title: 'Watermark', desc: 'Add text or logo watermarks to protect your copyrights. Freely adjust position, size, opacity, and rotation. Tile (repeat) patterns can cover the entire image. Useful for portfolio sharing and artwork protection.' },
    { key: 'merge', title: 'Image Merge', desc: 'Combine multiple images horizontally, vertically, or in grid layouts (2×2, 3×3). Great for before/after comparisons, portfolio collages, and multi-angle product shots. Drag to reorder, and adjust spacing and background color.' },
    { key: 'removeExif', title: 'EXIF Removal', desc: 'Safely remove hidden GPS location, timestamps, and camera data from photos. Protect your privacy before sharing on social media or marketplace sites. Image quality remains unchanged — only metadata is stripped.' },
    { key: 'qrCode', title: 'QR Code Generator', desc: 'Convert URLs, text, or contact info into QR codes. Customize colors, background, and embed logos. Perfect for business cards, flyers, store displays, and event promotions.' },
    { key: 'removeBg', title: 'AI Background Removal', desc: 'Automatically remove image backgrounds using AI deep learning. Recognizes people, products, and animals for precise separation. Manual brush editing for fine-tuning. The AI runs in your browser so images never leave your device.' },
  ],
  hi: [
    { key: 'resize', title: 'इमेज रिसाइज़', desc: 'JPG, PNG, WebP और अन्य फॉर्मेट की इमेज को किसी भी पिक्सेल साइज़ में बदलें। HD, FHD, Instagram, YouTube थंबनेल के लिए प्रीसेट उपलब्ध हैं। आस्पेक्ट रेशियो लॉक से इमेज तिरछी नहीं होगी।' },
    { key: 'batch', title: 'बैच रिसाइज़', desc: 'एक साथ कई इमेज को एक ही सेटिंग से रिसाइज़ करें। ई-कॉमर्स प्रोडक्ट फोटो, ब्लॉग इमेज के लिए बेहतरीन। सभी फाइलें एक साथ डाउनलोड करें।' },
    { key: 'imgToPdf', title: 'इमेज → PDF', desc: 'कई इमेज को एक PDF फाइल में मिलाएं। स्कैन किए दस्तावेज़, कॉन्ट्रैक्ट और पोर्टफोलियो के लिए उपयोगी। पेज क्रम ड्रैग से बदलें।' },
    { key: 'pdfToImg', title: 'PDF → इमेज', desc: 'PDF के प्रत्येक पेज को JPG, PNG या WebP में बदलें। सभी या चुनिंदा पेज निकालें। प्रेजेंटेशन स्लाइड को इमेज में बदलने के लिए उपयोगी।' },
    { key: 'crop', title: 'इमेज क्रॉप', desc: 'इमेज का मनचाहा हिस्सा काटें। 1:1, 16:9, 4:3 जैसे फिक्स्ड रेशियो क्रॉप सपोर्ट करता है। SNS प्रोफाइल, YouTube थंबनेल के लिए बिल्कुल सही।' },
    { key: 'rotate', title: 'रोटेट और फ्लिप', desc: 'इमेज को 90° या 180° घुमाएं, या क्षैतिज/ऊर्ध्वाधर रूप से पलटें। स्मार्टफोन से ली गई गलत दिशा की फोटो तुरंत ठीक करें।' },
    { key: 'convert', title: 'फॉर्मेट कन्वर्ट', desc: 'JPG, PNG, WebP, HEIC, GIF, BMP के बीच कन्वर्ट करें। iPhone की HEIC फोटो को JPG में आसानी से बदलें।' },
    { key: 'watermark', title: 'वॉटरमार्क', desc: 'कॉपीराइट के लिए टेक्स्ट या लोगो वॉटरमार्क जोड़ें। पोजीशन, साइज़, ओपेसिटी और रोटेशन कस्टमाइज़ करें।' },
    { key: 'merge', title: 'इमेज मर्ज', desc: 'कई इमेज को क्षैतिज, ऊर्ध्वाधर या ग्रिड (2×2, 3×3) में मिलाएं। बिफोर/आफ्टर कम्पेरिजन और कोलाज बनाने के लिए बेहतरीन।' },
    { key: 'removeExif', title: 'EXIF हटाएं', desc: 'फोटो में छुपी GPS लोकेशन, समय और कैमरा जानकारी हटाएं। SNS पर शेयर करने से पहले अपनी प्राइवेसी सुरक्षित करें।' },
    { key: 'qrCode', title: 'QR कोड', desc: 'URL, टेक्स्ट या कॉन्टैक्ट जानकारी से QR कोड बनाएं। रंग कस्टमाइज़ करें और लोगो जोड़ें।' },
    { key: 'removeBg', title: 'AI बैकग्राउंड रिमूवर', desc: 'AI से इमेज का बैकग्राउंड स्वचालित रूप से हटाएं। लोग, प्रोडक्ट, जानवर सभी को पहचानकर बैकग्राउंड अलग करता है। इमेज ब्राउज़र में ही प्रोसेस होती है।' },
  ],
};

const faqData = {
  ko: {
    title: '자주 묻는 질문',
    items: [
      { q: 'Pixkit은 정말 무료인가요?', a: '네, 모든 기능을 완전 무료로 제공합니다. 회원가입, 결제, 워터마크 없이 무제한으로 사용할 수 있습니다.' },
      { q: '이미지가 서버에 저장되나요?', a: '아니요. 모든 이미지 처리는 사용자의 브라우저에서만 이루어집니다. 파일이 외부 서버로 전송되지 않아 개인정보가 완벽하게 보호됩니다.' },
      { q: '어떤 파일 형식을 지원하나요?', a: 'JPG, PNG, WebP, HEIC, GIF, BMP 등 대부분의 이미지 형식을 지원합니다. PDF 변환도 가능합니다.' },
      { q: '파일 크기 제한이 있나요?', a: '별도의 파일 크기 제한은 없습니다. 서버 업로드가 없으므로 브라우저 메모리 범위 내에서 처리됩니다.' },
      { q: '모바일에서도 사용할 수 있나요?', a: '네, 반응형 디자인으로 스마트폰과 태블릿에서도 모든 기능을 사용할 수 있습니다.' },
      { q: '광고가 있나요?', a: '서비스 운영을 위해 일부 광고가 표시될 수 있습니다. 모든 기능은 광고 여부와 관계없이 무료로 이용 가능합니다.' },
    ],
  },
  en: {
    title: 'Frequently Asked Questions',
    items: [
      { q: 'Is Pixkit really free?', a: 'Yes, all features are completely free. No sign-up, no payment, no watermarks — unlimited use.' },
      { q: 'Are my images stored on a server?', a: 'No. All image processing happens in your browser only. Files are never sent to external servers, ensuring complete privacy.' },
      { q: 'What file formats are supported?', a: 'JPG, PNG, WebP, HEIC, GIF, BMP, and more. PDF conversion is also available.' },
      { q: 'Is there a file size limit?', a: 'No strict file size limit. Since there are no server uploads, processing happens within your browser\'s memory.' },
      { q: 'Can I use it on mobile?', a: 'Yes, the responsive design works on smartphones and tablets with full functionality.' },
      { q: 'Are there ads?', a: 'Some ads may be displayed to support service operations. All features remain free regardless of ads.' },
    ],
  },
  ja: {
    title: 'よくある質問',
    items: [
      { q: 'Pixkitは本当に無料ですか？', a: 'はい、すべての機能を完全無料で提供しています。会員登録、決済、ウォーターマークなしで無制限に使用できます。' },
      { q: '画像はサーバーに保存されますか？', a: 'いいえ。すべての画像処理はユーザーのブラウザ内でのみ行われます。ファイルが外部サーバーに送信されることはありません。' },
      { q: '対応ファイル形式は？', a: 'JPG、PNG、WebP、HEIC、GIF、BMPなど主要な画像形式に対応しています。PDF変換も可能です。' },
      { q: 'ファイルサイズの制限はありますか？', a: '厳密なファイルサイズ制限はありません。ブラウザのメモリ範囲内で処理されます。' },
      { q: 'スマートフォンでも使えますか？', a: 'はい、レスポンシブデザインですべての機能をご利用いただけます。' },
      { q: '広告はありますか？', a: 'サービス運営のため一部広告が表示される場合があります。すべての機能は広告の有無に関係なく無料です。' },
    ],
  },
  zh: {
    title: '常见问题',
    items: [
      { q: 'Pixkit真的免费吗？', a: '是的，所有功能完全免费。无需注册、付费或水印，可无限使用。' },
      { q: '图片会保存到服务器吗？', a: '不会。所有处理都在浏览器中完成，文件不会上传到外部服务器。' },
      { q: '支持哪些格式？', a: '支持JPG、PNG、WebP、HEIC、GIF、BMP等格式，也支持PDF转换。' },
      { q: '有文件大小限制吗？', a: '没有严格限制，在浏览器内存范围内处理。' },
      { q: '手机能用吗？', a: '可以，响应式设计支持所有功能。' },
      { q: '有广告吗？', a: '可能会有少量广告用于运营。所有功能始终免费。' },
    ],
  },
  fr: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Pixkit est-il vraiment gratuit ?', a: 'Oui, toutes les fonctionnalités sont entièrement gratuites. Sans inscription, sans paiement, sans filigrane.' },
      { q: 'Mes images sont-elles stockées ?', a: 'Non. Tout le traitement se fait dans votre navigateur. Aucun fichier n\'est envoyé à un serveur externe.' },
      { q: 'Quels formats sont pris en charge ?', a: 'JPG, PNG, WebP, HEIC, GIF, BMP et plus. La conversion PDF est également disponible.' },
      { q: 'Y a-t-il une limite de taille ?', a: 'Pas de limite stricte. Le traitement se fait dans la mémoire de votre navigateur.' },
      { q: 'Fonctionne-t-il sur mobile ?', a: 'Oui, le design responsive fonctionne sur smartphones et tablettes.' },
      { q: 'Y a-t-il de la publicité ?', a: 'Quelques publicités peuvent apparaître pour soutenir le service. Toutes les fonctionnalités restent gratuites.' },
    ],
  },
  es: {
    title: 'Preguntas frecuentes',
    items: [
      { q: '¿Pixkit es realmente gratis?', a: 'Sí, todas las funciones son completamente gratuitas. Sin registro, sin pago, sin marcas de agua.' },
      { q: '¿Mis imágenes se almacenan?', a: 'No. Todo se procesa en tu navegador. Ningún archivo se envía a servidores externos.' },
      { q: '¿Qué formatos soporta?', a: 'JPG, PNG, WebP, HEIC, GIF, BMP y más. También conversión PDF.' },
      { q: '¿Hay límite de tamaño?', a: 'Sin límite estricto. Se procesa dentro de la memoria del navegador.' },
      { q: '¿Funciona en móvil?', a: 'Sí, el diseño responsive funciona en smartphones y tablets.' },
      { q: '¿Hay publicidad?', a: 'Puede haber algunos anuncios para mantener el servicio. Todas las funciones son siempre gratuitas.' },
    ],
  },
  hi: {
    title: 'अक्सर पूछे जाने वाले सवाल',
    items: [
      { q: 'क्या Pixkit सच में मुफ्त है?', a: 'हाँ, सभी फीचर पूरी तरह मुफ्त हैं। कोई साइनअप, पेमेंट या वॉटरमार्क नहीं।' },
      { q: 'क्या मेरी इमेज सर्वर पर सेव होती हैं?', a: 'नहीं। सभी प्रोसेसिंग आपके ब्राउज़र में होती है। कोई भी फाइल बाहरी सर्वर पर नहीं जाती।' },
      { q: 'कौन से फाइल फॉर्मेट सपोर्ट होते हैं?', a: 'JPG, PNG, WebP, HEIC, GIF, BMP और PDF कन्वर्जन भी उपलब्ध है।' },
      { q: 'क्या फाइल साइज़ की लिमिट है?', a: 'कोई सख्त लिमिट नहीं। प्रोसेसिंग आपके ब्राउज़र की मेमोरी में होती है।' },
      { q: 'क्या मोबाइल पर काम करता है?', a: 'हाँ, रेस्पॉन्सिव डिज़ाइन स्मार्टफोन और टैबलेट पर पूरी तरह काम करता है।' },
      { q: 'क्या विज्ञापन हैं?', a: 'सेवा जारी रखने के लिए कुछ विज्ञापन दिख सकते हैं। सभी फीचर हमेशा मुफ्त रहेंगे।' },
    ],
  },
};

const howToSteps = {
  ko: { title: '3단계로 끝나는 이미지 편집', steps: [
    { num: '1', title: '이미지 업로드', desc: '드래그&드롭 또는 클릭해서 이미지를 불러오세요. JPG, PNG, WebP, HEIC 등 모든 형식을 지원합니다.' },
    { num: '2', title: '원하는 설정', desc: '크기, 형식, 품질 등을 설정하세요. 프리셋으로 더 빠르게 작업할 수 있습니다.' },
    { num: '3', title: '다운로드', desc: '처리된 이미지를 바로 다운로드하세요. 로그인도, 이메일도 필요 없습니다.' },
  ]},
  en: { title: 'Edit Images in 3 Steps', steps: [
    { num: '1', title: 'Upload Image', desc: 'Drag & drop or click to upload. Supports all formats including JPG, PNG, WebP, and HEIC.' },
    { num: '2', title: 'Set Options', desc: 'Adjust size, format, and quality. Use presets for faster workflows.' },
    { num: '3', title: 'Download', desc: 'Download your processed image instantly. No login or email required.' },
  ]},
  ja: { title: '3ステップで完了する画像編集', steps: [
    { num: '1', title: '画像アップロード', desc: 'ドラッグ＆ドロップまたはクリックで画像を読み込み。JPG、PNG、WebP、HEIC対応。' },
    { num: '2', title: '設定', desc: 'サイズ、形式、品質を設定。プリセットでさらに素早く。' },
    { num: '3', title: 'ダウンロード', desc: '処理された画像をそのままダウンロード。ログインもメールも不要。' },
  ]},
  zh: { title: '3步完成图片编辑', steps: [
    { num: '1', title: '上传图片', desc: '拖放或点击上传。支持JPG、PNG、WebP、HEIC等所有格式。' },
    { num: '2', title: '设置选项', desc: '调整大小、格式和质量。预设让操作更快。' },
    { num: '3', title: '下载', desc: '即时下载处理后的图片。无需登录或邮箱。' },
  ]},
  fr: { title: 'Éditez vos images en 3 étapes', steps: [
    { num: '1', title: 'Téléchargez', desc: 'Glissez-déposez ou cliquez. Supporte JPG, PNG, WebP, HEIC et plus.' },
    { num: '2', title: 'Configurez', desc: 'Ajustez taille, format et qualité. Les préréglages accélèrent le travail.' },
    { num: '3', title: 'Téléchargez', desc: 'Téléchargez l\'image traitée instantanément. Sans inscription ni email.' },
  ]},
  es: { title: 'Edita imágenes en 3 pasos', steps: [
    { num: '1', title: 'Sube imagen', desc: 'Arrastra y suelta o haz clic. Soporta JPG, PNG, WebP, HEIC y más.' },
    { num: '2', title: 'Configura', desc: 'Ajusta tamaño, formato y calidad. Los presets agilizan el trabajo.' },
    { num: '3', title: 'Descarga', desc: 'Descarga la imagen procesada al instante. Sin registro ni email.' },
  ]},
  hi: { title: '3 स्टेप में इमेज एडिट', steps: [
    { num: '1', title: 'इमेज अपलोड', desc: 'ड्रैग & ड्रॉप या क्लिक करें। JPG, PNG, WebP, HEIC सहित सभी फॉर्मेट सपोर्ट करता है।' },
    { num: '2', title: 'सेटिंग चुनें', desc: 'साइज़, फॉर्मेट और क्वालिटी सेट करें। प्रीसेट से काम और तेज़ होगा।' },
    { num: '3', title: 'डाउनलोड', desc: 'प्रोसेस की गई इमेज तुरंत डाउनलोड करें। कोई लॉगिन या ईमेल नहीं चाहिए।' },
  ]},
};

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
  { href: '/remove-bg', titleKey: 'toolCards.removeBg', descKey: 'toolCards.removeBgDesc', icon: 'M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9M3 10l2.96-5.17A2 2 0 0 1 7.69 3.5h8.62a2 2 0 0 1 1.73 1.33L21 10M3 10h18M12 16l-3-3h2v-3h2v3h2l-3 3' },
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
    description: t('landing.heroSub'),
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: locale,
    featureList: [
      'Image Resize',
      'Batch Resize',
      'Image Crop',
      'Image Rotate & Flip',
      'Format Convert (HEIC, JPG, PNG, WebP)',
      'Image to PDF',
      'PDF to Image',
      'EXIF Removal',
      'QR Code Generator',
      'Image Merge',
      'Watermark',
      'AI Background Removal',
    ],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero */}
      <section className="text-center py-20 lg:py-32">
        <h1
          className="font-heading font-black tracking-tight mb-8 whitespace-pre-line"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, fontWeight: 900 }}
        >
          {t('landing.heroTitle')}
        </h1>
        <h2 className="text-gold text-lg sm:text-xl mb-12 font-medium">
          {t('landing.heroSub')}
        </h2>
        <Link href="/resize" className="btn-gold inline-block text-base px-8 py-3">
          {t('landing.heroCta')}
        </Link>
      </section>

      {/* Tool Grid */}
      <section className="mb-16">
      <h2 className="text-xl font-bold font-heading mb-6 text-text-primary">{t('landing.toolsTitle')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
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

      {/* How To Steps */}
      <HowToSection locale={locale} />

      {/* Tool Details */}
      <ToolDetailsSection locale={locale} />

      {/* FAQ */}
      <FAQSection locale={locale} />

      <KakaoAd />

      {/* CTA */}
      <section className="card-glow rounded-xl p-8 sm:p-12 text-center mb-12">
        <h2 className="text-xl sm:text-2xl font-bold font-heading mb-3">{t('landing.ctaTitle')}</h2>
        <p className="text-text-secondary mb-6">{t('landing.ctaDesc')}</p>
        <Link href="/resize" className="btn-gold inline-block">
          {t('landing.ctaBtn')}
        </Link>
      </section>

      {/* Ezoic */}
      <EzoicAd placementId={102} />
    </div>
  );
}

/* ── How To Section ── */
function HowToSection({ locale }) {
  const data = howToSteps[locale] || howToSteps.en;
  const stepIcons = [
    'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
    'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  ];
  return (
    <section className="mb-20">
      <h2 className="text-xl sm:text-2xl font-bold font-heading text-center mb-10">{data.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {data.steps.map((step, i) => (
          <div key={i} className="text-center">
            <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--bg-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={stepIcons[i]} />
              </svg>
            </div>
            <div className="text-gold text-sm font-bold mb-1">Step {step.num}</div>
            <h3 className="font-heading font-semibold text-text-primary mb-2">{step.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Tool Details Section ── */
function ToolDetailsSection({ locale }) {
  const details = toolDetails[locale] || toolDetails.en;
  const label = { ko: '기능 상세 소개', en: 'Feature Details', ja: '機能の詳細', zh: '功能详情', fr: 'Détails des fonctionnalités', es: 'Detalles de funciones' };
  return (
    <section className="mb-20">
      <h2 className="text-xl sm:text-2xl font-bold font-heading text-center mb-10">{label[locale] || label.en}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((item) => (
          <div key={item.key} className="card-glow rounded-xl p-6">
            <h3 className="font-heading font-semibold text-gold mb-2">{item.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── FAQ Section (Accordion) ── */
function FAQSection({ locale }) {
  const data = faqData[locale] || faqData.en;
  return (
    <section className="mb-20">
      <h2 className="text-xl sm:text-2xl font-bold font-heading text-center mb-10">{data.title}</h2>
      <div className="max-w-2xl mx-auto space-y-3">
        {data.items.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-glow rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-heading font-semibold text-sm text-text-primary pr-4">{q}</span>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          className={`text-gold flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}
