# CLAUDE.md

gajigaji04 의 개인 포트폴리오 겸 기술 블로그. Astro 7 정적 사이트 → GitHub Actions → GitHub Pages.

## 작업 규칙

- **커밋 · push · PR · 브랜치 삭제는 하지 않습니다.** 사용자가 직접 합니다. 명시적으로 요청받았을 때만 예외.
- 작업은 사용자가 만든 `claude/<주제>` 브랜치에서 합니다. `main` 이면 작업 전에 알려 주세요. 규칙: `docs/BRANCHING.md`
- 프로필 · 프로젝트 · 블로그 콘텐츠를 다룰 때는 `docs/CONTENT_GUIDE.md` 의 파일 위치와 frontmatter 형식을 따릅니다. `.gitignore` 대상(비밀 정보, `_private/`, 빌드 결과물)은 만들거나 옮기지 않습니다.
- 코드 · 디자인 · 콘텐츠 · 커밋 규칙은 `docs/CONVENTIONS.md` 를 따릅니다. 핵심만 요약:
  - 디자인은 **미니멀**: Zinc 무채색, 강조색 금지(진행 중 초록 점만 예외), 장식(격자·그라데이션·세로선·굵은 테두리) 금지
  - 색은 `src/styles/global.css` 토큰만 사용, 다크/라이트 둘 다 확인
  - 스크립트는 `data-*` 속성으로 요소를 찾음 (클래스는 스타일 전용)
- 파일을 지우거나 이름을 바꾸기 전에 참조를 검색하고, 글 slug 를 바꾸면 `src/data/redirects.mjs` 를 갱신합니다.
- 실제 정보가 없는 곳은 지어내지 말고 `[대괄호]` + `sample: true` 로 표시합니다.
- 응답과 문서, 주석은 한국어로 씁니다.

## 명령어

```bash
npm run dev      # 개발 서버 (검색은 동작 안 함 — 빌드 후 생성되는 인덱스 필요)
npm run build    # astro check → astro build → pagefind
npm run verify   # dist 검사: 내부 링크, 앵커, 레거시 리다이렉트, 남은 예시 콘텐츠
npm run preview  # 빌드 결과 확인 (검색 포함)
```

작업을 마치면 `npm run build` 와 `npm run verify` 를 통과시키고, 화면을 바꿨다면 다크/라이트와 모바일 폭(375px)에서 확인한 뒤 결과를 보고합니다.

## 구조

- `src/data/profile.ts` — 프로필, About, 기술 스택(이름만 → `src/lib/tech.ts` 가 simple-icons 로 아이콘 조회)
- `src/data/redirects.mjs` — 옛 Jekyll URL → 새 URL (`integrations/legacy-redirects.mjs` 가 빌드 시 HTML 생성)
- `src/content/blog/*.md`, `src/content/projects/*.mdx` — 스키마는 `src/content.config.ts`
- `src/assets/covers/{projects,blog}/<id>.png` — 있으면 커버 이미지, 없으면 타이포 커버 (`Cover.astro`)
- `src/lib/github.ts` — 빌드 시 GitHub GraphQL(`GITHUB_TOKEN`), 실패하면 예시 데이터
- `src/styles/global.css` — 모든 스타일과 디자인 토큰
- `scripts/verify-dist.mjs` — 빌드 결과 검증
- `.github/workflows/deploy.yml` — push(main) 배포, PR 빌드 검증, 매일 09:00 KST 재빌드

## 다음 할 일

1. **홈 프로필 수정**: `src/data/profile.ts` 의 예시 값(`[대괄호]` · `sample: true`)을 실제 정보로 교체
   - 이름, 한 줄 소개, 직무, 현재 상태, About, 기술 스택(`STACK`, 교체 후 `STACK_IS_SAMPLE = false`)
   - 필요 시 이력서 PDF(`public/resume.pdf` + `resumeUrl`)
   - 방법: `docs/CONTENT_GUIDE.md` 1절
2. **배포 및 반영 확인**
   - 커밋 2개로 분리(사이트 / 문서) → `origin/main` 병합(README 충돌은 이 브랜치 쪽 선택) → push → PR → "Create a merge commit" 으로 병합
   - **병합 전에** GitHub Settings → Pages → Source 를 **GitHub Actions** 로 변경
   - 배포 후 확인: 실제 사이트(https://gajigaji04.github.io) 표시, GitHub 활동 그래프가 실제 데이터로 나오는지, 옛 URL 리다이렉트(`/jekyll/2026/09/15/post-test.html` → `/blog/post-test/`)
   - 이후 `docs/BRANCHING.md` 5절대로 옛 브랜치(`dev`, `thme/*`, `origin/mistakes`, `origin/plain`) 태그 보관 후 정리
3. 남은 과제(우선순위 낮음)
   - Node 버전 정리: Astro 7.4 는 Node ≥22.23.4 필요 → `package.json` `engines` 와 README 의 "22.12" 수정, 워크플로 `node-version: 24` 권장
   - 예시 프로젝트(P-02~04) · 예시 글 2편(Jekyll/테마 기본 글) 교체 또는 삭제 — 삭제 시 `redirects.mjs` 도 정리

## 작업 기록

### 2026-11-15 — Jekyll → Astro 전환, 미니멀 디자인 적용 (`feat/astro-portfolio-redesign`, 미커밋)

- **전환**: Jekyll(Plainwhite) → Astro 7 정적 사이트. GitHub Actions 배포 워크플로(`deploy.yml`), dist 검증 스크립트(`npm run verify`) 추가. 기존 Jekyll 파일 삭제(`git rm`)
- **디자인**: 블루프린트/터미널 시안은 폐기하고, itzkashan.dev 를 참고한 미니멀 디자인으로 확정·구현 — Zinc 무채색, Geist + Pretendard(self-host), 768px 단일 컬럼, 컬럼 세로선 없음, 강조색 없음
  - 디자인 시안 캔버스: https://claude.ai/artifact/RcRJamDCj6LLqSmfS8vUA3
- **페이지**: 홈(프로필 · About · Stack · GitHub 활동 · 프로젝트 · 블로그), Projects(목록/상세), Blog(목록/글), 404. **Experience 페이지와 홈의 Experience 섹션은 사용자 요청으로 제거**
- **기능 유지**: Pagefind 검색(⌘K), 다크/라이트 테마, 프로젝트 필터 · 보기 전환, 블로그 검색 · 카테고리 · 태그, 옛 Jekyll URL 리다이렉트 8개, RSS · sitemap
- **확장성**: 기술 아이콘은 이름만 쓰면 simple-icons 에서 자동 조회(`src/lib/tech.ts`). 커버 이미지는 파일 이름 규칙으로 자동 적용(`src/assets/covers/`), 없으면 타이포 커버
- **콘텐츠**: 기존 글 3편 이관(그중 Jekyll/테마 기본 글 2편은 `sample`), 프로젝트 P-01(이 사이트) 실제 내용 + P-02~04 예시. 프로필 사진을 GitHub 아이덴티콘으로 교체(`public/assets/bio-photo.jpg`)
- **문서 · 규칙**: `docs/CONTENT_GUIDE.md`(콘텐츠 추가/수정, 커밋 금지 파일), `docs/CONVENTIONS.md`(디자인 · 코드 · 커밋), `docs/BRANCHING.md`(브랜치 규칙, 옛 브랜치 정리), PR 템플릿, `.gitignore` 정비
- **검증**: `npm run build`(타입 오류 0), `npm run verify` 통과, Edge 브라우저 테스트(반응형 · 테마 · 검색 · 필터 · 리다이렉트) 통과
- **병합 전 점검 결과**: 원격 `8516152` 는 README 만 변경(충돌 1곳), 커밋 2개로 분리 가능, 테마 브랜치는 태그 보관 시 이력 손실 없음, Linux CI 용 의존성 lock 정상
