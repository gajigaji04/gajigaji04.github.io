// 정적 호스팅(GitHub Pages)은 서버 리다이렉트를 지원하지 않으므로,
// 기존 URL 위치에 즉시 이동하는 HTML 파일을 생성합니다.
//  - meta refresh: JS 가 꺼져 있어도 이동
//  - location.replace: 뒤로 가기 기록을 남기지 않고 #hash 유지
//  - rel=canonical + noindex: 검색엔진이 새 주소를 정식 주소로 인식
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** @param {string} s */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * @param {string} to
 * @param {string} canonical
 */
export function redirectHtml(to, canonical) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>이동 중… — ${esc(to)}</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${esc(canonical)}">
<meta http-equiv="refresh" content="0; url=${esc(to)}">
<script>location.replace(${JSON.stringify(to)} + (location.hash && ${JSON.stringify(to)}.indexOf('#') < 0 ? location.hash : ''));</script>
</head>
<body>
<p>페이지가 이동했습니다: <a href="${esc(to)}">${esc(to)}</a></p>
</body>
</html>
`;
}

/** 경로 → dist 안의 파일 경로. `/a/b.html` 은 그대로, `/a/` 는 `/a/index.html` */
export function redirectFile(from) {
  const clean = from.replace(/^\/+/, '');
  if (clean === '' || clean.endsWith('/')) return clean + 'index.html';
  if (/\.html?$/.test(clean)) return clean;
  return clean + '/index.html';
}

/**
 * @param {Record<string, string>} map
 * @returns {import('astro').AstroIntegration}
 */
export default function legacyRedirects(map) {
  let site = '';
  return {
    name: 'legacy-redirects',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = (config.site ?? '').replace(/\/$/, '');
      },
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        for (const [from, to] of Object.entries(map)) {
          const file = join(root, redirectFile(from));
          await mkdir(dirname(file), { recursive: true });
          await writeFile(file, redirectHtml(to, site + to), 'utf8');
        }
        logger.info(`${Object.keys(map).length}개 레거시 URL 리다이렉트 생성`);
      },
    },
  };
}
