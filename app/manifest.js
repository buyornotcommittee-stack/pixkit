export default function manifest() {
  return {
    name: 'Pixkit — 무료 이미지 도구',
    short_name: 'Pixkit',
    description: '브라우저에서 바로 쓰는 무료 이미지 리사이저, PDF 변환 도구',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f1e',
    theme_color: '#f59e0b',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
