#!/usr/bin/env node
// 빌드 결과(dist/) 검증 — `npm run build` 후 `npm run verify`
//  1. 레거시 URL 리다이렉트 파일이 모두 있고, 이동 대상이 실제로 존재하는지
//  2. 모든 HTML 의 내부 링크(href/src)가 dist 안의 파일로 연결되는지
//  3. Pagefind 검색 인덱스, RSS, sitemap 이 생성되었는지
//  4. 남아 있는 예시(sample) 콘텐츠 목록 (경고만, 실패 아님)
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEGACY_REDIRECTS } from '../src/data/redirects.mjs';
import { redirectFile } from '../integrations/legacy-redirects.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const errors = [];
const warnings = [];

const exists = (p) => stat(p).then(() => true, () => false);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

/** 사이트 경로 → dist 파일 (GitHub Pages 규칙: /a → a.html 또는 a/index.html) */
async function resolve(pathname) {
  const clean = decodeURI(pathname.split('#')[0].split('?')[0]);
  const rel = clean.replace(/^\/+/, '');
  const candidates = clean.endsWith('/')
    ? [join(dist, rel, 'index.html')]
    : [join(dist, rel), join(dist, rel + '.html'), join(dist, rel, 'index.html')];
  for (const c of candidates) if (await exists(c)) return c;
  return null;
}

if (!(await exists(dist))) {
  console.error('dist/ 가 없습니다. 먼저 `npm run build` 를 실행하세요.');
  process.exit(1);
}

// 1. 리다이렉트
let redirectCount = 0;
for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
  const file = join(dist, redirectFile(from));
  if (!(await exists(file))) {
    errors.push(`리다이렉트 파일 없음: ${from}`);
    continue;
  }
  const html = await readFile(file, 'utf8');
  if (!html.includes(`url=${to}`)) errors.push(`리다이렉트 대상 불일치: ${from} → ${to}`);
  if (!(await resolve(to))) errors.push(`리다이렉트 대상 페이지 없음: ${from} → ${to}`);
  redirectCount++;
}

// 2. 내부 링크
const files = await walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html') && !f.includes(`${sep}pagefind${sep}`));
let linkCount = 0;
const checked = new Map();
for (const f of htmlFiles) {
  const html = await readFile(f, 'utf8');
  for (const m of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    const url = m[1].replace(/&amp;/g, '&');
    if (url.startsWith('//') || url.startsWith('/pagefind/')) continue;
    linkCount++;
    if (!checked.has(url)) checked.set(url, await resolve(url));
    if (!checked.get(url)) errors.push(`깨진 내부 링크: ${url}  (in ${relative(dist, f)})`);
  }
  // 같은 페이지 앵커(#id) 확인
  for (const m of html.matchAll(/\shref="#([^"]+)"/g)) {
    const id = decodeURIComponent(m[1]);
    if (!html.includes(`id="${id}"`)) errors.push(`없는 앵커: #${id}  (in ${relative(dist, f)})`);
  }
}

// 3. 산출물
for (const need of ['pagefind/pagefind.js', 'rss.xml', 'sitemap.xml', 'robots.txt', '404.html', 'assets/bio-photo.jpg']) {
  if (!(await exists(join(dist, need)))) errors.push(`필수 산출물 없음: ${need}`);
}

// 4. 예시 콘텐츠
const samples = [];
for (const dir of ['src/content/blog', 'src/content/projects']) {
  for (const f of await walk(join(root, dir))) {
    const src = await readFile(f, 'utf8');
    const fm = src.split(/^---$/m)[1] ?? '';
    if (/^sample:\s*true\s*$/m.test(fm)) samples.push(relative(root, f));
  }
}
for (const f of ['src/data/profile.ts']) {
  const n = ((await readFile(join(root, f), 'utf8')).match(/sample: true|STACK_IS_SAMPLE = true/g) ?? []).length;
  if (n) samples.push(`${f} (${n}곳)`);
}
if (samples.length) warnings.push(`예시 콘텐츠가 남아 있습니다:\n    - ${samples.join('\n    - ')}`);

// 결과
console.log(`HTML ${htmlFiles.length}개 · 내부 링크 ${linkCount}개 · 레거시 리다이렉트 ${redirectCount}개 검사`);
for (const w of warnings) console.log(`\n⚠ ${w}`);
if (errors.length) {
  console.error(`\n✗ ${errors.length}개 문제:\n  - ${[...new Set(errors)].join('\n  - ')}`);
  process.exit(1);
}
console.log('\n✓ dist 검증 통과');
