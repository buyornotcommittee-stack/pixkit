import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.kakaocdn.net https://*.daumcdn.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.google.com https://*.googleadservices.com https://*.googletagmanager.com https://www.google-analytics.com https://*.adtrafficquality.google https://*.doubleclick.net",
      "script-src-elem 'self' 'unsafe-inline' https://*.kakaocdn.net https://*.daumcdn.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.google.com https://*.googleadservices.com https://*.googletagmanager.com https://www.google-analytics.com https://*.adtrafficquality.google https://*.doubleclick.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "media-src 'self' blob:",
      "connect-src 'self' https: wss: blob:",
      "frame-src 'self' https://*.kakaocdn.net https://*.daumcdn.net https://*.googlesyndication.com https://*.google.com https://*.doubleclick.net https://*.adtrafficquality.google",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Compression
  compress: true,
  // Strip console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Production source maps off (smaller bundle)
  productionBrowserSourceMaps: false,
  // Powered-by header off
  poweredByHeader: false,
  // Redirects
  async redirects() {
    return [];
  },
  // Security headers
  async headers() {
    return [
      // 정적 자산 — 1년 캐시 (내용 바뀌면 URL 해시도 바뀜)
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // 이미지·폰트·아이콘 — 1일 캐시 + 7일 stale-while-revalidate
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      // 일반 페이지 — 1시간 캐시 + 1일 stale-while-revalidate
      {
        source: '/:path*',
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
