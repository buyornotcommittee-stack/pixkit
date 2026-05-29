import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'hi'],
  defaultLocale: 'ko',
  localePrefix: 'as-needed',
  localeDetection: false,
});
