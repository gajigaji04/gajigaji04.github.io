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
- 어느 파일을 고쳐야 할지는 `docs/FILES.md` 를 봅니다. 파일을 추가 · 이동하면 이 문서도 갱신합니다.
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

1. **배포 및 반영 확인** (프로필 · 프로젝트 실제 정보 교체는 완료)
   - 커밋 2개로 분리(사이트 / 문서) → `origin/main` 병합(README 충돌은 이 브랜치 쪽 선택) → push → PR → "Create a merge commit" 으로 병합
   - **병합 전에** GitHub Settings → Pages → Source 를 **GitHub Actions** 로 변경
   - 배포 후 확인: 실제 사이트(https://gajigaji04.github.io) 표시, GitHub 활동 그래프가 실제 데이터로 나오는지, 옛 URL 리다이렉트(`/jekyll/2026/09/15/post-test.html` → `/blog/post-test/`)
   - 이후 `docs/BRANCHING.md` 5절대로 옛 브랜치(`dev`, `thme/*`, `origin/mistakes`, `origin/plain`) 태그 보관 후 정리
2. 남은 과제(우선순위 낮음)
   - Node 버전 정리: Astro 7.4 는 Node ≥22.23.4 필요 → `package.json` `engines` 와 README 의 "22.12" 수정, 워크플로 `node-version: 24` 권장
   - 예시 글 2편(Jekyll/테마 기본 글, `npm run verify` 경고) 교체 또는 삭제 — 삭제 시 `redirects.mjs` 도 정리

## 작업 기록

### 2026-11-22 — 파일 위치 안내 문서 추가 (`feat/astro-portfolio-redesign`, 미커밋)

- **요청**: 파일 수정 시 위치를 찾기 어려워 안내 문서 요청
- **추가**: `docs/FILES.md` — 하고 싶은 일 → 파일 표, 폴더 지도, 고칠 때 함께 확인할 것. README 문서 표 · CLAUDE.md 작업 규칙에 링크
- **정리**: `docs/CONTENT_GUIDE.md` 5절 체크리스트에서 숨긴 gajigaji04.github.io 항목 삭제, 이미 끝난 `profile.ts` 항목 완료 표시

### 2026-11-22 — Spring Delivery Mini 갱신, TravelPay 추가 (`feat/astro-portfolio-redesign`, 미커밋)

- **Spring Delivery Mini(P-02)**: 저장소 README(2026-11-21 기준) 반영 — 토스페이먼츠 결제 · 소셜 로그인 · SSE 실시간 주문 알림 · React 화면, 테스트 108클래스 946건, 트러블슈팅(SSE 커넥션 점유, Redis DNS 지연) 추가. `live: https://spring-delivery-mini.vercel.app` (사용자가 준 `…-h74uq800s-…vercel.app` 은 Vercel 로그인 보호가 걸린 프리뷰 주소라 쓰지 않음). 백엔드는 아직 미배포
- **TravelPay(P-13, 신규)**: 5인 팀 MSA 프로젝트, 담당은 프론트엔드 전체 · 송금. `repo` 는 개인 포크 `gajigaji04/travelpay`(팀 저장소 `dont-worrys/travelpay` 보다 14커밋 앞섬, 송금 완료 알림), 본문에 프론트 `dont-worrys/travelpay-front` 링크. `live: https://travelpay.store`, `order: 4`, `featured: true` → 홈 대표 프로젝트 4개
- **검증**: `npm run build` · `npm run verify` 통과, 다크/라이트 화면 확인
- **추가 요청**: gajigaji04.github.io(P-12) `hidden: true` → 프로젝트 8개. 이미 공개된 페이지지만 앞서 숨긴 4개와 같이 리다이렉트는 두지 않음(배포 후 404). Spring Delivery Mini 커버 `src/assets/covers/projects/spring-delivery-mini.png` = Vercel 랜딩 첫 화면 캡처(1440×900, 라이트). TravelPay 커버 `travelpay.png` = https://www.travelpay.store 첫 화면 캡처(사용자가 준 `travelpay-front-d62tlhjof-…vercel.app` 도 로그인 보호 프리뷰 주소라 공개 도메인 사용)

### 2026-11-19 — 포트폴리오에서 뺄 프로젝트 숨김 (`feat/astro-portfolio-redesign`, 미커밋)

- **요청**: 포트폴리오로 쓰지 않을 프로젝트를 사이트에서 안 보이게. 사용자가 `dist/projects` 에서 폴더를 직접 지웠지만 `dist` 는 빌드마다 다시 생성되므로 원본에서 처리
- **방식**: 프로젝트 frontmatter 에 `hidden: true` (파일은 유지, 줄만 지우면 복구). `src/content.config.ts` 스키마에 `hidden` 추가, `src/lib/content.ts` `getProjects()` 에서 제외 → 목록 · 홈 · 상세 · 이전/다음 · 검색 · sitemap 에서 모두 빠짐. 블로그 `draft` 와 달리 개발 서버에서도 숨김
- **숨긴 프로젝트**: Shogi Dojo(P-04), Encore Backend(P-07), Fortune Tarot(P-10), Eyes Alarm(P-11). 공개 배포 전이라 `redirects.mjs` 는 손대지 않음
- **영향**: 프로젝트 페이지 12 → 8개. Shogi Dojo 가 빠져 홈 대표 프로젝트(`featured`)는 3개
- **문서**: `docs/CONTENT_GUIDE.md` 프로젝트 필드 · 숨기기 표, README 프로젝트 MDX 절
- **검증**: `npm run build` · `npm run verify` 통과, `dist` 에 숨긴 프로젝트 흔적 없음
- **lock 재복구**: 작업 시작 시 `package-lock.json` 에서 CI 수정분(`@emnapi` 21줄, 커밋 `796568d`)이 다시 지워져 있었음(로컬 npm 11.6.1 의 `npm install` 탓으로 추정) → `git restore package-lock.json` 으로 복구. 커밋 전 `git diff package-lock.json` 이 비어 있는지 확인
- **주의(Windows)**: `npm run preview` · `dev` 가 떠 있는 상태에서 `npm ci` 를 돌리면 `.node` 파일 잠금으로 EPERM 이 나고 `node_modules` 가 반쯤 지워짐 → 서버를 끄고 `npm ci` 재실행. 복구 후 build · verify 재통과 확인
- **참고(블로그 작성)**: 블로그 글은 일반 마크다운(`.md`)으로 작성. 컴포넌트가 필요할 때만 `.mdx`. 작성법은 `docs/CONTENT_GUIDE.md` 블로그 절

### 2026-11-16 — CI `npm ci` lock 불일치 수정 (`feat/astro-portfolio-redesign`, 미커밋)

- **증상**: Actions 의 `npm ci` 가 `Missing: @emnapi/core@2.0.0-beta.2` / `@emnapi/runtime@2.0.0-beta.2 from lock file` 로 실패
- **원인**: `@rolldown/binding-wasm32-wasi@1.2.19` 는 `@emnapi/*@2.0.0-beta.2` 를 고정 요구하는데, lock 에 그 하위 `node_modules/@rolldown/binding-wasm32-wasi/node_modules/@emnapi/{core,runtime}` 항목이 없었음. 로컬 npm 11.6.1 은 이 누락을 그냥 넘어가지만 npm 10.9(CI, Node 22)와 npm 11.19 는 거부함. OS 차이가 아님(wasm32 전용 패키지라 어느 OS 에도 설치 안 됨)
- **수정**: `package-lock.json` 에 누락 항목 2개만 추가(+21줄). 값은 npm 10.9 · 11.19 의 `--package-lock-only` 결과에서 가져옴. 워크플로 · `package.json` 은 변경 없음(`node-version: 24` 만으로는 해결 안 됨을 확인)
- **검증**: WSL Ubuntu, Node 22.23.5/npm 10.9.9 에서 `npm ci` → `build` → `verify` 통과. npm 11.19.1(Linux), 11.6.1 · 10.9.10(Windows) 에서 `npm ci` 통과. 실제 Actions 러너는 push 후 확인 필요
- **재발 주의**: 로컬 npm 11.6.1 로 `npm install` 하면 추가한 21줄이 다시 지워짐 → 로컬 npm 업그레이드(`npm i -g npm@11.19.1`) 후 의존성 작업, 커밋 전 `git diff package-lock.json` 확인
- **참고(기여 그래프)**: 홈의 "기여 데이터를 불러오지 못해 빈 그래프로 표시합니다" 문구는 `GITHUB_TOKEN` 이 없을 때(로컬)의 정상 동작. 배포에선 Actions 가 토큰을 자동 주입. 로컬에서 보려면 `$env:GITHUB_TOKEN = (gh auth token); npm run dev`

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
