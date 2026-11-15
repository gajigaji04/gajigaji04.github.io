// 기존 Jekyll(Plainwhite) 사이트의 URL → 새 Astro 사이트 URL.
//
// Jekyll 기본 permalink 는 `/:categories/:year/:month/:day/:title.html` 이었습니다.
// - GitHub Pages(Jekyll 3.10, UTC)와 로컬 `jekyll serve`(KST)의 날짜가 다를 수 있어 두 날짜를 모두 둡니다.
// - Jekyll 버전에 따라 카테고리 대소문자가 그대로 남는 경우가 있어 원래 표기도 함께 둡니다.
//
// 빌드 시 integrations/legacy-redirects.mjs 가 각 경로에 리다이렉트용 HTML 을 생성하고,
// scripts/verify-dist.mjs 가 대상 페이지가 실제로 존재하는지 검사합니다.

/** @type {Record<string, string>} */
export const LEGACY_REDIRECTS = {
  // 2026-09-15-post-test.markdown (categories: Jekyll)
  '/jekyll/2026/09/15/post-test.html': '/blog/post-test/',
  '/Jekyll/2026/09/15/post-test.html': '/blog/post-test/',

  // 2026-09-15-welcome-to-jekyll.markdown (categories: jekyll update)
  '/jekyll/update/2026/09/15/welcome-to-jekyll.html': '/blog/welcome-to-jekyll/',

  // 2019-03-23-welcome-to-jekyll.markdown (categories: Javascript NodeJS, 21:03 +0530)
  '/javascript/nodejs/2019/03/23/welcome-to-jekyll.html': '/blog/integrating-razorpay/',
  '/javascript/nodejs/2019/03/24/welcome-to-jekyll.html': '/blog/integrating-razorpay/',
  '/Javascript/NodeJS/2019/03/23/welcome-to-jekyll.html': '/blog/integrating-razorpay/',
  '/Javascript/NodeJS/2019/03/24/welcome-to-jekyll.html': '/blog/integrating-razorpay/',

  // about.markdown (permalink: /about/) → 홈의 About 섹션
  '/about/': '/#about',
};
