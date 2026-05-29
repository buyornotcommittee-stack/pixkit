'use client';
import { useState, useMemo } from 'react';
import { Link } from '../i18n/navigation';

export default function BlogSearch({ posts, ui }) {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) => {
      const haystack = [
        post.title,
        post.summary,
        ...(post.tags || []),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query]);

  return (
    <>
      {/* Search */}
      <div className="relative mb-8">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ui.placeholder}
          aria-label={ui.searchLabel}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm text-text-primary border border-card-border focus:border-gold focus:outline-none transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors"
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-text-muted text-sm">
          {ui.noResults}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-glow rounded-xl p-6 hover:border-gold/30 transition-all group"
            >
              <div className="flex gap-2 mb-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gold-dim text-gold">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-heading font-semibold text-text-primary group-hover:text-gold transition-colors mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-text-muted text-sm mb-3 line-clamp-2">{post.summary}</p>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span>{post.date}</span>
                {post.readTime && <span>{post.readTime} {ui.read}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
