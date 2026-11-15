/**
 * 기술 이름 → 단색 로고 아이콘.
 *
 * 빌드 시점에 simple-icons(3,000+ 브랜드 로고)에서 이름으로 찾습니다.
 * 새 기술을 추가할 때는 데이터에 이름만 쓰면 됩니다. 예: 'Docker', 'Vue.js', 'Spring Boot'
 *
 * - 대소문자·공백은 무시하고 제목 또는 slug 로 찾습니다. ('Node.js', 'nodejs', 'nodedotjs' 모두 가능)
 * - 이름이 simple-icons 와 다르면 ALIASES 에 한 줄 추가하세요.
 * - simple-icons 에 없는 로고는 CUSTOM 에 SVG path(24×24)를 넣거나, 그냥 두면 이름 배지로 표시됩니다.
 *   아이콘 검색: https://simpleicons.org
 */
import * as icons from 'simple-icons';

export interface TechIcon {
  title: string;
  /** 24×24 viewBox path. 없으면 텍스트 배지로 표시 */
  path?: string;
}

/** 표시 이름(소문자) → simple-icons slug */
const ALIASES: Record<string, string> = {
  html: 'html5',
  node: 'nodedotjs',
  nodejs: 'nodedotjs',
  nextjs: 'nextdotjs',
  next: 'nextdotjs',
  vue: 'vuedotjs',
  tailwind: 'tailwindcss',
  java: 'openjdk',
  'c#': 'dotnet',
  'github-actions': 'githubactions',
};

/** simple-icons 에 없는 아이콘 직접 추가: { '이름(소문자)': { title, path } } */
const CUSTOM: Record<string, TechIcon> = {};

type SimpleIcon = { title: string; slug: string; path: string };
const ALL = Object.values(icons as Record<string, unknown>).filter(
  (v): v is SimpleIcon => typeof v === 'object' && v !== null && 'slug' in v && 'path' in v,
);
const BY_SLUG = new Map(ALL.map((i) => [i.slug, i]));
const BY_TITLE = new Map(ALL.map((i) => [i.title.toLowerCase(), i]));

const toSlug = (s: string) =>
  s.toLowerCase().replace(/\+/g, 'plus').replace(/\./g, 'dot').replace(/#/g, 'sharp').replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');

const cache = new Map<string, TechIcon>();

export function techIcon(name: string): TechIcon {
  const hit = cache.get(name);
  if (hit) return hit;
  const key = name.trim().toLowerCase();
  const found: TechIcon =
    CUSTOM[key] ??
    (() => {
      const i = BY_TITLE.get(key) ?? BY_SLUG.get(ALIASES[key] ?? '') ?? BY_SLUG.get(toSlug(key));
      return i ? { title: name, path: i.path } : { title: name };
    })();
  cache.set(name, found);
  return found;
}
