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

1. **배포 및 반영 확인** (프로필 · 프로젝트 실제 정보 교체, 완료 프로젝트 4개 상세 페이지 보강, 블로그 첫 글 · 최종 점검(11-24) 완료 — 이제 커밋 · 배포만 남음)
   - 커밋 전 `git diff package-lock.json` 확인 (`@emnapi` 항목 21줄이 빠지면 CI `npm ci` 실패, 796568d 참고)
   - 커밋 2개로 분리(사이트 / 문서) → `origin/main` 병합(README 충돌은 이 브랜치 쪽 선택) → push → PR → "Create a merge commit" 으로 병합
   - **병합 전에** GitHub Settings → Pages → Source 를 **GitHub Actions** 로 변경
   - 배포 후 확인: 실제 사이트(https://gajigaji04.github.io) 표시, GitHub 활동 그래프가 실제 데이터로 나오는지, 옛 URL 리다이렉트(`/jekyll/2026/09/15/post-test.html` → `/blog/`)
   - 이후 `docs/BRANCHING.md` 5절대로 옛 브랜치(`dev`, `thme/*`, `origin/mistakes`, `origin/plain`) 태그 보관 후 정리
2. 남은 과제(우선순위 낮음)
   - Node 버전 정리: Astro 7.4 는 Node ≥22.23.4 필요 → `package.json` `engines` 와 README 의 "22.12" 수정, 워크플로 `node-version: 24` 권장
   - 새 블로그 글은 `docs/templates/blog.md` 를 복사해 작성 (지금 1편: `/blog/introduction/`)

## 작업 기록

`docs/WORKLOG.md` 에 있습니다(최신이 위). 이전 작업 맥락이 필요할 때만 열어 보고, 작업을 마치면 맨 위에 추가합니다. 이 파일에는 기록을 쌓지 않습니다.

## 토큰 절약

주간 사용량이 빠듯하므로 아래를 지킵니다.

- **스크린샷은 화면(레이아웃 · 스타일 · 컴포넌트)을 바꿨을 때만** 찍습니다. 글 · frontmatter 만 바꾼 작업은 `npm run build` · `npm run verify` 로 끝냅니다. 찍을 때도 필요한 영역만 작게(세로로 긴 전체 캡처 지양), 장 수는 최소로.
- 큰 파일 · 외부 README 는 통째로 읽지 말고 `grep` · 줄 범위로 필요한 부분만 봅니다.
- 이미 알고 있는 내용을 다시 조사하지 않습니다. 어느 파일을 고칠지는 `docs/FILES.md` 로 바로 찾습니다.
- 사용자가 준 정보(주소, 바뀐 내용, 노출 여부)가 충분하면 되묻거나 추가 조사하지 않고 바로 진행합니다.
- 응답은 결과 위주로 짧게 씁니다.

사용자 쪽 팁(필요하면 안내): 주제가 바뀌면 `/clear` 로 새 대화 시작, frontmatter 한 줄 수정 같은 단순 작업은 `/model` 로 가벼운 모델 사용, 요청할 때 공개 배포 주소 · 바뀐 내용 · 홈 노출 여부를 한 번에 전달, 글만 바꿀 땐 "화면 확인 생략".
