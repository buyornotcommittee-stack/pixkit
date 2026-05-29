import { posts as ko } from './ko';
import { posts as en } from './en';
import { posts as ja } from './ja';
import { posts as zh } from './zh';
import { posts as fr } from './fr';
import { posts as es } from './es';
import { posts as hi } from './hi';

const allPosts = { ko, en, ja, zh, fr, es, hi };

export function getPostsByLocale(locale) {
  const posts = allPosts[locale] || allPosts.ko;
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// All slugs (for generateStaticParams)
export function getAllSlugs() {
  const slugs = new Set();
  Object.values(allPosts).forEach((posts) => {
    posts.forEach((p) => slugs.add(p.slug));
  });
  return [...slugs];
}

// Default export for backward compatibility (Korean)
export const posts = ko;
