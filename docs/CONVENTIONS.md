# 컨벤션 가이드

유지보수를 위해 지키는 규칙입니다. 사람과 Claude 모두 같은 규칙을 따릅니다.
콘텐츠를 추가 · 수정하는 단계별 방법은 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)에 있습니다.

## 1. 디자인

**방향: Minimal Developer Portfolio** — 콘텐츠가 주인공이고 장식은 최소한으로.

| 규칙 | 내용 |
| --- | --- |
| 색 | Zinc 무채색만. **강조색 금지.** 예외는 "진행 중/현재" 상태의 작은 초록 점(`--ok`) 하나 |
| 색 지정 | 반드시 `src/styles/global.css` 의 토큰(`var(--fg)`, `--mfg`, `--muted`, `--border`, `--edge` …)을 사용. 컴포넌트에 hex 값 직접 쓰지 않기 |
| 다크/라이트 | 토큰만 쓰면 자동 지원. 새 색이 필요하면 `:root` 와 `:root[data-theme='dark']`, `prefers-color-scheme` 블록 **세 곳 모두** 추가 |
| 글꼴 | 본문 Geist + Pretendard(`--font-sans`), 코드·날짜 등 메타 정보만 Geist Mono(`--font-mono`) |
| 레이아웃 | 768px 단일 컬럼(`.col`). 섹션 구분은 여백과 1px `--edge` 선 하나 |
| 금지 | 그라데이션 배경, 장식용 격자·패턴, 컬럼 양옆 세로선, 굵은 테두리 카드, 이모지 아이콘 |
| 카드 | 테두리 없이 hover 시 `--muted` 배경. 이미지는 1200×630, `border-radius: 12px` |
| 아이콘 | UI 아이콘은 `Icon.astro`(선 아이콘), 기술 로고는 `TechIcon.astro`(이름으로 자동 조회) |
| 반응형 | 720px 이하에서 1열. 본문 글자 15px 이상, 보조 텍스트 13px 이상, 터치 영역 40px 이상 |

## 2. 코드

### 파일 위치

| 무엇 | 어디 |
| --- | --- |
| 페이지(라우트) | `src/pages/` |
| 재사용 UI | `src/components/` (MDX 전용은 `components/mdx/`) |
| 데이터 로직 · 헬퍼 | `src/lib/` |
| 사람이 고치는 데이터 | `src/data/` |
| 글 · 프로젝트 | `src/content/blog/`, `src/content/projects/` |
| 커버 이미지 | `src/assets/covers/{projects,blog}/` |
| 그대로 배포할 파일 | `public/` (프로필 사진, 이력서 PDF, favicon) |
| 스타일 | `src/styles/global.css` 한 곳 |

### 작성 규칙

- **TypeScript strict.** `npm run build` 의 `astro check` 에서 오류·경고 0개를 유지합니다.
- **파일 이름**: 컴포넌트는 `PascalCase.astro`, 그 외(lib, data, content, 폴더)는 `kebab-case`.
- **스타일**: 클래스는 짧은 소문자 이름으로 `global.css` 에 섹션별로 추가. 한 번만 쓰는 간단한 값만 인라인 `style` 허용.
- **클라이언트 JS 최소화**: 페이지 안 `<script>` 로 필요한 만큼만. 프레임워크(React 등)를 추가하지 않습니다.
- **스크립트가 찾는 요소는 `data-*` 속성으로**: 클래스는 스타일 전용, 동작은 `data-filter`, `data-post` 같은 속성으로 연결합니다. (클래스명을 바꿔도 기능이 깨지지 않도록)
- **접근성**: 아이콘만 있는 버튼엔 `aria-label`, 클릭되는 건 `<a>` 또는 `<button>`, 이미지엔 `alt`.
- **검색 인덱스**: 검색에 나와야 하는 본문은 `data-pagefind-body` 안에, 목차·내비 같은 반복 요소는 `data-pagefind-ignore`.
- **주석은 한국어**로, "무엇"보다 "왜"를 적습니다.
- **의존성 추가는 신중히**: 추가했다면 이유를 PR 설명에 적습니다.

### 기존 URL 보존

글의 slug(URL)를 바꾸거나 글을 지우면 `src/data/redirects.mjs` 에 옛 주소 → 새 주소를 추가합니다.
`npm run verify` 가 대상이 없는 리다이렉트와 깨진 링크를 잡아냅니다.

## 3. 콘텐츠

### 블로그 글

- 파일: `src/content/blog/YYYY-MM-DD-영문-slug.md` (MDX 필요 시 `.mdx`). URL 은 `/blog/영문-slug/`
- frontmatter 필수: `title`, `description`(1~2문장), `date`(`+09:00` 포함), `category`, `tags`
- 카테고리는 적게 유지(예: `Dev`, `TIL`, `Retrospect`). 세부 분류는 태그로
- 태그는 소문자 kebab-case: `github-pages`, `astro`
- 본문 제목은 `##` 부터 (페이지 제목이 `h1`)
- 이미지는 글과 같은 폴더나 `src/assets/` 에 두고 상대 경로로 참조

### 프로젝트

- 파일: `src/content/projects/<영문-slug>.mdx`, 새 프로젝트는 `docs/templates/project.mdx` 를 복사해서 시작
- `code` 는 `P-01` 형식으로 순서대로
- 본문 섹션 순서: 개요 → 문제 정의와 목표 → 아키텍처 → 주요 기능 → 기술적 의사결정 → 트러블슈팅 → 회고
- 의사결정은 `<Adr>`, 트러블슈팅은 `<Trouble>`, 흐름도는 `<ArchFlow>` 컴포넌트 사용
- 결과는 가능하면 수치로(예: "빌드 시간 40% 단축")

### 기술 이름

`STACK` 과 프로젝트 `stack` 에는 공식 표기를 씁니다: `Node.js`, `Next.js`, `TypeScript`, `Tailwind CSS`.
아이콘이 안 나오면 `src/lib/tech.ts` 의 `ALIASES` 에 추가합니다.

### 예시(자리표시) 콘텐츠

- 아직 실제 내용이 없는 곳은 `[대괄호]` 로 쓰고 `sample: true` 를 붙입니다 → 화면에 "예시" 배지 표시
- 실제 내용으로 바꾸면 `sample` 을 지웁니다
- `npm run verify` 가 남은 예시 항목을 알려 줍니다

## 4. 커밋 메시지

[Conventional Commits](https://www.conventionalcommits.org/ko/) 형식, 제목은 한국어로 씁니다.

```text
<type>: <무엇을 했는지>          ← 50자 이내, 마침표 없음

<왜 했는지, 필요하면 본문>      ← 선택. 한 줄 비우고 작성
```

| type | 언제 |
| --- | --- |
| `feat` | 기능 추가 |
| `fix` | 버그 수정 |
| `design` | 스타일 · 레이아웃만 변경 |
| `content` | 글 · 프로젝트 · 프로필 내용 추가/수정 |
| `docs` | 문서 (README, docs/, CLAUDE.md) |
| `refactor` | 동작 변화 없는 코드 정리 |
| `chore` | 의존성, 설정 |
| `ci` | GitHub Actions 워크플로 |

예시:

```text
feat: 프로젝트 목록에 기술 스택 필터 추가
fix: 모바일에서 검색창이 화면 밖으로 나가는 문제 수정
content: Astro 전환 회고 글 작성
design: 프로젝트 카드 hover 배경 조정
docs: 브랜치 규칙 문서 추가
```

- 하나의 커밋 = 하나의 변경. 디자인 수정과 글 추가를 한 커밋에 섞지 않습니다.
- Claude 와 함께 만든 커밋은 본문 끝에 `Co-Authored-By:` 줄을 남겨도 됩니다.

## 5. 병합 전 체크리스트

```bash
npm run build    # 타입 검사 + 빌드 + 검색 인덱스 (오류 0)
npm run verify   # 링크 · 리다이렉트 · 산출물 검사
npm run preview  # 실제 화면 확인: 다크/라이트, 모바일 폭, 검색
```

PR 템플릿(`.github/pull_request_template.md`)에 같은 체크리스트가 있습니다.
