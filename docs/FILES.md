# 파일 위치 안내

"이걸 바꾸려면 어느 파일을 열어야 하지?" 할 때 보는 문서입니다.
콘텐츠를 추가하는 단계별 방법과 frontmatter 형식은 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md), 디자인 · 코드 규칙은 [CONVENTIONS.md](./CONVENTIONS.md)에 있습니다.

> `dist/` 는 빌드할 때마다 새로 만들어지는 결과물입니다. 여기서 고치거나 지워도 다음 빌드에서 되돌아오니 항상 `src/` 쪽 원본을 고칩니다.

## 1. 하고 싶은 일 → 파일

### 프로필 · 홈

| 하고 싶은 일 | 파일 |
| --- | --- |
| 이름 · 한 줄 소개 · 직무 · 구직 상태 · 이메일 · 이력서 PDF 링크 | `src/data/profile.ts` (`PROFILE`) |
| About 문장 | `src/data/profile.ts` (`PROFILE.about`) |
| 홈 Stack 섹션의 기술 목록 | `src/data/profile.ts` (`STACK`) |
| 사이트 제목 · 설명 · 주소(SEO, RSS) | `src/data/profile.ts` (`SITE`) |
| 프로필 사진 | `public/assets/bio-photo.jpg` (같은 이름으로 교체) |
| 파비콘 | `public/favicon.svg` |
| 홈 섹션 순서 · 구성 | `src/pages/index.astro` |
| GitHub 활동 그래프 데이터 | `src/lib/github.ts` (빌드 시 `GITHUB_TOKEN` 으로 조회) |

### 프로젝트

| 하고 싶은 일 | 파일 |
| --- | --- |
| 프로젝트 추가 · 내용 수정 | `src/content/projects/<이름>.mdx` (새 파일은 `docs/templates/project.mdx` 복사) |
| 숨기기 · 홈 노출 · 순서 | 같은 파일 frontmatter 의 `hidden` · `featured` · `order` |
| 썸네일(커버 이미지) | `src/assets/covers/projects/<프로젝트 파일명>.png` (이름만 맞추면 자동 적용) |
| 아키텍처 · 트러블슈팅 · ADR 박스 모양 | `src/components/mdx/ArchFlow.astro` · `Trouble.astro` · `Adr.astro` |
| 카드 모양 | `src/components/ProjectCard.astro` |
| 목록 페이지(필터 · 보기 전환) | `src/pages/projects/index.astro` |
| 상세 페이지 레이아웃 | `src/pages/projects/[slug].astro` |
| frontmatter 필드 추가 · 변경 | `src/content.config.ts` (스키마) |
| 숨김 · 정렬 규칙 | `src/lib/content.ts` (`getProjects`) |

### 블로그

| 하고 싶은 일 | 파일 |
| --- | --- |
| 글 추가 · 수정 | `src/content/blog/YYYY-MM-DD-<slug>.md` (컴포넌트가 필요할 때만 `.mdx`) |
| 글 썸네일 | `src/assets/covers/blog/<글 slug>.png` |
| 글 숨기기(초안) | 같은 파일 frontmatter 의 `draft: true` |
| 카드 모양 | `src/components/PostCard.astro` |
| 목록 페이지(검색 · 카테고리 · 태그) | `src/pages/blog/index.astro` |
| 글 페이지 레이아웃 · 목차 | `src/pages/blog/[slug].astro` |
| 코드 블록 복사 버튼 · 목차 강조 | `src/components/CodeEnhancer.astro` |
| 정렬 · 초안 처리 · 읽는 시간 | `src/lib/content.ts` (`getPosts`, `readingMinutes`) |

### 디자인 · 공통 화면

| 하고 싶은 일 | 파일 |
| --- | --- |
| 색 · 글꼴 · 간격 등 디자인 토큰 | `src/styles/global.css` 맨 위 `Tokens` 블록 (다크/라이트 세 곳 모두) |
| 그 밖의 모든 스타일 | `src/styles/global.css` (섹션 주석: Header · Cards · Prose · Footer …) |
| 상단 메뉴 · 테마 전환 버튼 | `src/components/Header.astro` |
| 하단 바닥글 | `src/components/Footer.astro` |
| 검색 창(⌘K) | `src/components/SearchDialog.astro` |
| `<head>` 메타 태그 · 테마 초기화 | `src/layouts/BaseLayout.astro` |
| UI 선 아이콘 | `src/components/Icon.astro` |
| 기술 로고 아이콘(이름 → 아이콘 매칭) | `src/lib/tech.ts` (`ALIASES` · `CUSTOM`), 표시는 `src/components/TechIcon.astro` |
| 이미지가 없을 때의 글자 커버 | `src/components/Cover.astro` |
| "예시" 배지 | `src/components/SampleBadge.astro` |
| 404 페이지 | `src/pages/404.astro` |

### 주소 · 배포 · 검증

| 하고 싶은 일 | 파일 |
| --- | --- |
| 옛 주소 → 새 주소 이동(글 slug 변경, 페이지 삭제 시) | `src/data/redirects.mjs` (HTML 생성은 `integrations/legacy-redirects.mjs`) |
| RSS · sitemap · robots.txt | `src/pages/rss.xml.ts` · `sitemap.xml.ts` · `robots.txt.ts` |
| Astro 설정(사이트 주소, 통합, 마크다운) | `astro.config.mjs` |
| 배포 · PR 빌드 · 매일 재빌드 | `.github/workflows/deploy.yml` |
| PR 템플릿 | `.github/pull_request_template.md` |
| 빌드 결과 검사 항목(`npm run verify`) | `scripts/verify-dist.mjs` |
| 의존성 · npm 스크립트 · Node 버전 | `package.json` (`package-lock.json` 은 직접 고치지 않음) |
| 깃에 올리지 않을 파일 | `.gitignore` |

## 2. 폴더 지도

```
.github/
  workflows/deploy.yml      배포 · PR 빌드 · 매일 09:00 KST 재빌드
  pull_request_template.md
docs/
  CONTENT_GUIDE.md          콘텐츠 추가 · 수정 방법
  CONVENTIONS.md            디자인 · 코드 · 커밋 규칙
  BRANCHING.md              브랜치 규칙
  FILES.md                  이 문서
  templates/project.mdx     새 프로젝트 템플릿
integrations/
  legacy-redirects.mjs      redirects.mjs → 리다이렉트 HTML 생성
public/                     그대로 복사되는 파일 (프로필 사진, 파비콘)
scripts/
  verify-dist.mjs           npm run verify
src/
  assets/covers/            커버 이미지 (projects/ · blog/)
  components/               공통 컴포넌트, mdx/ 는 프로젝트 본문용
  content/                  blog/*.md · projects/*.mdx
  content.config.ts         콘텐츠 스키마
  data/                     profile.ts · redirects.mjs
  layouts/BaseLayout.astro  모든 페이지의 뼈대
  lib/                      content.ts · github.ts · tech.ts
  pages/                    라우트 (파일 경로 = URL)
  styles/global.css         모든 스타일과 디자인 토큰
astro.config.mjs
CLAUDE.md                   Claude 작업 규칙 · 작업 기록
README.md
```

`src/pages/` 는 파일 경로가 곧 URL 입니다. 예: `src/pages/projects/[slug].astro` → `/projects/<프로젝트 파일명>/`

## 3. 고칠 때 함께 확인할 것

| 바꾼 것 | 함께 할 일 |
| --- | --- |
| 프로젝트 · 글 파일 이름(URL) | 공개된 적 있으면 `src/data/redirects.mjs` 에 옛 주소 추가, 커버 이미지 이름도 변경 |
| 프로젝트 · 글 삭제 | 커버 이미지 삭제, 공개된 적 있으면 `redirects.mjs` 에 옛 주소 → 목록 페이지 추가 |
| `hidden: true` 로 숨김 | 리다이렉트는 두지 않음 (다시 보이게 할 때 같은 주소의 리다이렉트와 충돌) |
| 스키마(`content.config.ts`) | `docs/CONTENT_GUIDE.md` 필드 표 · `docs/templates/project.mdx` 갱신 |
| 색 · 스타일 | 다크/라이트 둘 다, 모바일 폭(375px) 확인 |
| 파일 추가 · 이동 | 이 문서(`docs/FILES.md`) 갱신 |
| 무엇이든 | `npm run build` → `npm run verify` 통과 확인 |
