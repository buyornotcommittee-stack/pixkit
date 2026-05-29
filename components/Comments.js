'use client';
import Giscus from '@giscus/react';

const langMap = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
  zh: 'zh-CN',
  fr: 'fr',
  es: 'es',
  hi: 'hi',
};

const commentLabels = {
  ko: '댓글',
  en: 'Comments',
  ja: 'コメント',
  zh: '评论',
  fr: 'Commentaires',
  es: 'Comentarios',
  hi: 'टिप्पणियाँ',
};

export default function Comments({ lang = 'ko' }) {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h2 className="text-xl font-bold font-heading mb-6">{commentLabels[lang] || 'Comments'}</h2>
      <Giscus
        repo="buyornotco/pixkit"
        repoId="R_kgDOOxxx"
        category="General"
        categoryId="DIC_kwDOOxxx"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang={langMap[lang] || 'en'}
        loading="lazy"
      />
    </div>
  );
}
