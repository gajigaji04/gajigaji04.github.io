# gajigaji04.github.io

웹 개발자 gajigaji04의 포트폴리오 겸 기술 블로그입니다.
미니멀 디자인(Zinc 무채색 · Geist + Pretendard · 768px 단일 컬럼), 다크/라이트 테마, 정적 검색을 지원합니다.

- **프레임워크**: [Astro](https://astro.build) 7 (정적 출력) · MDX
- **폰트**: Geist / Geist Mono (`@fontsource-variable`) + Pretendard — 모두 사이트에 포함(self-host)
- **기술 아이콘**: [simple-icons](https://simpleicons.org) — 이름만 쓰면 빌드 시 자동 조회
- **검색**: [Pagefind](https://pagefind.app) — 빌드 후 생성되는 정적 인덱스
- **배포**: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`)

## 문서

| 문서 | 내용 |
| --- | --- |
| [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) | **프로필 · 프로젝트 · 블로그 추가/수정 방법**, 커밋하면 안 되는 파일 |
| [docs/CONVENTIONS.md](docs/CONVENTIONS.md) | 디자인 · 코드 · 콘텐츠 · 커밋 메시지 규칙 |
| [docs/BRANCHING.md](docs/BRANCHING.md) | 브랜치 규칙, Claude 작업 요청 흐름, 기존 브랜치 정리 |
| [CLAUDE.md](CLAUDE.md) | Claude 가 이 저장소에서 작업할 때 따르는 규칙 |

## 명령어

| 명령 | 설명 |
| --- | --- |
| `npm install` | 의존성 설치 (Node 22.12 이상) |
| `npm run dev` | 개발 서버 `http://localhost:4321` — **검색은 동작하지 않음** (인덱스 없음) |
| `npm run build` | 타입 검사 → `dist/` 빌드 → Pagefind 인덱스 생성 |
| `npm run preview` | 빌드 결과 미리보기 (검색 포함 전체 기능 확인) |
| `npm run verify` | `dist/` 검사: 내부 링크·앵커, 레거시 URL 리다이렉트, 필수 산출물, 남은 예시 콘텐츠 |

## 콘텐츠 수정 위치

| 내용 | 파일 |
| --- | --- |
| 프로필 · About · 기술 스택 · 이력서 PDF 경로 | `src/data/profile.ts` |
| 블로그 글 | `src/content/blog/YYYY-MM-DD-slug.md` (또는 `.mdx`) |
| 프로젝트 | `src/content/projects/*.mdx` |
| 프로필 이미지 | `public/assets/bio-photo.jpg` |
| 프로젝트 커버 이미지 | `src/assets/covers/projects/<프로젝트 파일명>.png` (파일만 넣으면 적용) |
| 블로그 썸네일 | `src/assets/covers/blog/<글 slug>.jpg` (파일만 넣으면 적용) |
| 이력서 PDF | `public/resume.pdf` 에 두고 `profile.ts` 의 `resumeUrl: '/resume.pdf'` |

### 예시(자리표시) 콘텐츠 구분

실제 내용이 아직 없는 곳은 모두 **예시**로 표시되어 있습니다.

- 값이 `[대괄호]` 로 감싸져 있고,
- 데이터에 `sample: true` (기술 스택은 `STACK_IS_SAMPLE = true`) 가 붙어 있으며,
- 화면에는 점선 테두리의 **예시** 배지가 표시됩니다.

실제 내용으로 바꾼 뒤 `sample: true` 를 지우면 배지가 사라집니다. `npm run verify` 를 실행하면 남아 있는 예시 항목 목록을 보여 줍니다.

### 커버 이미지 · 썸네일

이미지가 없으면 제목으로 만든 타이포그래피 커버가 자동으로 표시됩니다. 실제 이미지는 **파일 이름만 맞춰 넣으면** 카드·목록·상세 페이지에 모두 적용되고, 빌드 때 여러 크기의 webp 로 최적화됩니다. 권장 크기 1200×630. 자세한 규칙은 `src/assets/covers/README.md`.

### 기술 스택 아이콘

`STACK` 목록(`src/data/profile.ts`)과 프로젝트의 `stack` 에는 **기술 이름만** 적으면 됩니다. 예: `'Docker'`, `'Vue.js'`, `'Spring Boot'`.
빌드할 때 simple-icons 에서 이름으로 로고를 찾아 붙이고, 없는 이름은 텍스트 배지로 표시합니다. 이름이 simple-icons 와 다르면 `src/lib/tech.ts` 의 `ALIASES` 에 한 줄 추가하세요.

### 블로그 글 frontmatter

```yaml
---
title: "글 제목"
description: "목록과 검색 결과에 보이는 한두 문장 요약"
date: 2026-11-15T10:00:00+09:00
category: Dev          # 블로그 목록의 카테고리 탭
tags: [astro, github-pages]
# updated: 2026-11-20  # 수정일 (선택)
# draft: true          # 프로덕션 빌드에서 제외 (선택)
---
```

URL 은 파일명에서 날짜를 뺀 값입니다: `2026-11-15-hello.md` → `/blog/hello/`.
코드 블록은 언어 표시·줄 번호·복사 버튼이 자동으로 붙고, 테마에 맞춰 색이 바뀝니다. `>` 인용문은 NOTE 콜아웃 스타일로 표시됩니다.

### 프로젝트 MDX

`docs/templates/project.mdx` 를 `src/content/projects/` 에 복사해 시작하면 됩니다. 본문의 `##` 제목에 자동으로 01, 02… 번호와 목차가 붙습니다. 사용할 수 있는 컴포넌트:

- `<ArchFlow nodes={[{ name, desc, highlight }]} note="..." />` — 아키텍처 흐름도
- `<Adr id title status open context decision consequence />` — 기술적 의사결정 기록
- `<Trouble problem cause fix />` — 트러블슈팅

`featured: true` 인 프로젝트가 홈의 Projects 섹션에 최대 4개 노출됩니다. `repo`(GitHub 주소)와 `live`(배포 주소)를 적으면 카드에 링크 아이콘이 나타납니다.

## GitHub 활동 그래프

빌드할 때 `GITHUB_TOKEN` 이 있으면 GitHub GraphQL API 에서 기여 그래프·저장소 수·최장 연속 기여·주 사용 언어를 가져옵니다(Actions 에서는 자동). 토큰이 없거나 요청이 실패하면 고정된 예시 그림을 쓰고 "예시 데이터" 로 표시하며, 빌드는 실패하지 않습니다. 워크플로가 매일 09:00(KST)에 다시 빌드해 갱신합니다.

## 기존(Jekyll) URL 리다이렉트

이전 Jekyll 사이트의 글 주소(`/jekyll/2026/09/15/post-test.html` 등)와 `/about/` 은 새 주소로 이동하는 HTML 이 빌드 때 생성됩니다. 목록은 `src/data/redirects.mjs` 에서 관리합니다. 글을 지우거나 slug 를 바꾸면 이 파일도 함께 고쳐 주세요 — `npm run verify` 가 대상이 없는 리다이렉트를 잡아냅니다.

## 구조

```
src/
  content/           블로그(md) · 프로젝트(mdx)
  content.config.ts  콘텐츠 스키마
  data/              프로필 · 리다이렉트 목록
  assets/covers/     프로젝트 · 블로그 커버 이미지 (선택)
  components/        Header, Footer, SearchDialog, Cover, TechIcon, ProjectCard, PostCard, mdx/*
  layouts/           BaseLayout (메타 태그, 테마 초기화)
  lib/               콘텐츠 헬퍼, GitHub API, 기술 아이콘 조회
  pages/             라우트 (+ rss.xml, sitemap.xml, robots.txt)
  styles/global.css  디자인 토큰과 전체 스타일
integrations/        레거시 리다이렉트 생성 Astro 통합
scripts/             dist 검증 스크립트
```
