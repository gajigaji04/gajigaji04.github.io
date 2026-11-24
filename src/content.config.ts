import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * `sample: true` 는 자리표시용 예시 콘텐츠라는 표시입니다.
 * 화면에 "예시" 배지가 붙고, `npm run verify` 가 남아 있는 예시 항목을 알려 줍니다.
 * 실제 내용으로 교체한 뒤 `sample` 줄을 지우면 됩니다.
 */
const blog = defineCollection({
  // 파일명에서 날짜 접두어를 뗀 값이 URL slug 가 됩니다: 2026-09-15-post-test.md → /blog/post-test/
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry, data }) =>
      typeof data.slug === 'string' ? data.slug : entry.replace(/\.(md|mdx)$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** 4개로 고정 — 다른 값이면 빌드 실패 */
    category: z.enum(['Engineering', 'Troubleshooting', 'Performance', 'Development']),
    tags: z.array(z.string()).default([]),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
    /** (선택) 대표 글. 블로그 목록 위쪽 "대표 글" 묶음에 표시 */
    featured: z.boolean().default(false),
    sample: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    /** 표시용 번호. 예: P-01 */
    code: z.string(),
    name: z.string(),
    summary: z.string(),
    role: z.string(),
    team: z.string(),
    period: z.string(),
    /** 정렬 기준(최근순). 진행 중이면 오늘 날짜에 가깝게. */
    sortDate: z.coerce.date(),
    stack: z.array(z.string()),
    status: z.enum(['진행 중', '완료', '보관']),
    kind: z.string().default('개인 프로젝트'),
    deploy: z.string().optional(),
    /** (선택) 지금까지 끝낸 범위 한 줄. 카드와 상세 페이지에 표시 */
    milestone: z.string().optional(),
    repo: z.url().optional(),
    /** (선택) 프론트엔드 저장소가 따로 있을 때. 있으면 상세 페이지 버튼이 백엔드 / 프론트엔드로 나뉩니다 */
    repoFront: z.url().optional(),
    live: z.string().optional(),
    /** (선택) 노출 순서. 작을수록 앞. 없으면 order 가 있는 항목 뒤에 sortDate 최신순 */
    order: z.number().optional(),
    /** (선택) 공개 릴리스. 카드와 상세 페이지에 버전 · 릴리스 링크 표시 */
    release: z
      .object({
        version: z.string(),
        url: z.url(),
        date: z.coerce.date().optional(),
      })
      .optional(),
    /** 사이트 전체(목록 · 홈 · 상세 · 검색 · sitemap)에서 숨김. 파일은 남겨 둠 */
    hidden: z.boolean().default(false),
    /** 홈 "selected projects" 에 노출 */
    featured: z.boolean().default(false),
    sample: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
