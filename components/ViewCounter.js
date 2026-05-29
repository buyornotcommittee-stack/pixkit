'use client';
import { useEffect, useState } from 'react';

export default function ViewCounter({ slug }) {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // 조회수 증가 + 현재 값 가져오기
    fetch(`/api/views/${slug}`, { method: 'POST' })
      .then((r) => r.json())
      .then((data) => setViews(data.views))
      .catch(() => {});
  }, [slug]);

  if (views === null || views === 0) return null;

  return (
    <span className="flex items-center gap-1">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {views.toLocaleString()}
    </span>
  );
}
