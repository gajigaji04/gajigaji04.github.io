# 콘텐츠 추가 · 수정 가이드

프로필, 포트폴리오(프로젝트), 블로그 글을 추가하거나 고칠 때 보는 문서입니다.
코드를 몰라도 **이 문서의 파일만 고치면** 사이트에 반영됩니다.

- 작성 규칙(제목 스타일, 태그 표기 등): [CONVENTIONS.md](./CONVENTIONS.md#3-콘텐츠)
- 브랜치 · 커밋 흐름: [BRANCHING.md](./BRANCHING.md)

---

## 0. 공통 작업 순서

```bash
git switch main && git pull
git switch -c content/<주제>     # 예: content/post-astro-migration (글 한 편 수정 정도는 main 에서 바로 해도 됨)
npm install                      # 처음 한 번 또는 package.json 이 바뀌었을 때
npm run dev                      # http://localhost:4321 에서 저장할 때마다 바로 확인
```

수정이 끝나면:

```bash
npm run build     # 오류 0 이어야 함 (frontmatter 오타도 여기서 잡힘)
npm run verify    # 링크 · 리다이렉트 확인 + 남은 '예시' 항목 목록
npm run preview   # 검색까지 포함해 최종 확인
git add -A
git commit -m "content: <무엇을 했는지>"     # 예: content: Astro 전환 회고 글 작성
git push
```

`main` 에 반영되면 GitHub Actions 가 1~2분 안에 자동 배포합니다.

> `npm run dev` 에서는 **사이트 검색(⌘K)이 동작하지 않습니다.** 검색은 빌드 후 만들어지므로 `npm run preview` 에서 확인하세요.

---

## 1. 프로필

파일: **`src/data/profile.ts`**

| 항목 | 위치 | 화면 |
| --- | --- | --- |
| 이름 | `PROFILE.name.value` | 홈 상단 이름 아래 |
| 한 줄 소개 | `PROFILE.headline.value` | 이름 옆 |
| 직무 | `PROFILE.role.value` | 홈 개요 |
| 현재 상태 (구직 중 등) | `PROFILE.status.value` | 홈 개요, 초록 점 |
| 위치 | `PROFILE.location` | 홈 개요 (옆 시계는 항상 KST) |
| 이메일 · GitHub 아이디 | `PROFILE.email`, `PROFILE.github` | 홈 개요, 헤더, 푸터. GitHub 아이디는 기여 그래프 조회에도 쓰임 |
| About | `PROFILE.about.points` | 홈 About. 한 줄 = 한 항목, `**굵게**` 사용 가능 |
| 기술 스택 | `STACK` (카테고리별 `items`) | 홈 Stack — 카테고리 제목 아래 아이콘 + 기술명 |

### 예시 값을 실제 값으로 바꾸기

```ts
// 전
name: { value: '[이름]', sample: true },
// 후 — 대괄호와 sample 을 함께 지웁니다
name: { value: '홍길동' },
```

`about` 은 `sample: true` 한 줄을 지우고 `points` 를 고칩니다.
기술 스택은 목록을 고친 뒤 `STACK_IS_SAMPLE = false` 로 바꿉니다.

### 기술 스택 추가

**이름만 적으면** 아이콘이 자동으로 붙습니다([simple-icons](https://simpleicons.org) 에서 검색).

```ts
export const STACK = [
  { category: 'Backend', items: ['Spring Boot', 'Node.js'] },
  { category: 'Database', items: ['PostgreSQL', 'Redis'] },
];
```

- 공식 표기를 씁니다: `Node.js`, `Next.js`, `Tailwind CSS`
- 아이콘이 안 나오고 글자 배지로 보이면 → simpleicons.org 에서 정확한 이름을 확인하거나, `src/lib/tech.ts` 의 `ALIASES` 에 `'내가 쓴 이름(소문자)': 'simple-icons-slug'` 를 추가
- simple-icons 에 아예 없는 로고는 글자 배지로 두거나 `tech.ts` 의 `CUSTOM` 에 SVG path 를 넣습니다

### 프로필 사진

`public/assets/bio-photo.jpg` 를 **같은 이름으로 덮어쓰기** 하면 됩니다. (PNG 여도 이름은 그대로 두세요 — 공유 미리보기 주소가 바뀌지 않도록)

- 정사각형, 400×400px 이상 권장 (원형으로 잘려서 표시됨)
- 링크 공유 시 미리보기 이미지로도 쓰입니다

### 이력서 PDF

1. `public/resume.pdf` 에 파일을 둡니다
2. `profile.ts` 에서 `resumeUrl: '/resume.pdf'` 로 바꿉니다 → 홈의 "이력서 PDF" 버튼이 활성화됩니다

> 개인정보(주소, 전화번호 등)가 들어 있지 않은지 꼭 확인하세요. `public/` 의 파일은 누구나 내려받을 수 있습니다.
> 원본(편집용) 파일은 `_private/` 폴더에 두면 깃에 올라가지 않습니다.

---

## 2. 포트폴리오 (프로젝트)

폴더: **`src/content/projects/`** — 프로젝트 하나 = `.mdx` 파일 하나

### 새 프로젝트 추가

1. `docs/templates/project.mdx` 를 `src/content/projects/` 에 복사해 **영문 kebab-case 이름**으로 저장합니다 → 이 이름이 URL 이 됩니다
   `todo-app.mdx` → `/projects/todo-app/`
2. 맨 위 frontmatter 를 채웁니다 (`sample: true` 줄과 주석은 지움)
3. 본문 섹션을 채웁니다
4. (선택) 커버 이미지 추가 — 아래 "커버 이미지"

### frontmatter

```yaml
---
code: P-05                    # 표시 번호. 순서대로
name: Todo App
summary: 한두 문장 요약. 카드와 검색 결과, 링크 미리보기에 쓰입니다.
role: 팀 프로젝트 · 프론트엔드 담당
team: 4명
period: 2025.03 — 2025.06     # 진행 중이면 "2026.01 — 진행 중"
sortDate: 2025-06-30          # 정렬 기준. 최근일수록 앞에 표시
stack: [React, TypeScript, Vite]
status: 완료                  # 진행 중 | 완료 | 보관  (이 세 가지만 가능)
kind: 팀 프로젝트             # 상세 페이지 상단 표시 (기본값: 개인 프로젝트)
deploy: Vercel                # (선택) 배포 환경
repo: https://github.com/gajigaji04/todo-app   # (선택) 카드에 GitHub 아이콘
live: https://todo.example.com                  # (선택) 카드에 사이트 아이콘
order: 5                      # (선택) 노출 순서. 작을수록 앞, 없으면 sortDate 최신순으로 뒤에
release:                      # (선택) 공개 릴리스 — 카드에 버전, 상세 페이지에 릴리스 버튼
  version: v1.0.1
  url: https://github.com/<owner>/<repo>/releases/tag/v1.0.1
  date: 2026-11-14
featured: true                # 홈에 노출 (정렬 순서대로 최대 4개)
# hidden: true                # (선택) 사이트 전체에서 숨김. 파일은 그대로 둠
---
```

| 필드 | 필수 | 메모 |
| --- | --- | --- |
| `code`, `name`, `summary`, `role`, `team`, `period`, `sortDate`, `stack`, `status` | O | 빠지면 빌드 오류 |
| `kind`, `deploy`, `repo`, `live`, `order`, `release`, `featured`, `hidden` | | `repo` · `release.url` 은 전체 URL(https://…) 이어야 함 |

### 본문 구성

`##` 제목마다 상세 페이지 목차(01, 02 …)가 자동으로 만들어집니다. 권장 순서:

```mdx
import ArchFlow from '../../components/mdx/ArchFlow.astro';
import Adr from '../../components/mdx/Adr.astro';
import Trouble from '../../components/mdx/Trouble.astro';

## 개요
무엇을, 누구를 위해 만들었는지 2~3문장.

## 문제 정의와 목표
- [x] 달성한 목표
- [ ] 아직 못한 목표

## 아키텍처
<ArchFlow
  nodes={[
    { name: 'React', desc: 'SPA' },
    { name: 'Express API', desc: 'REST' },
    { name: 'PostgreSQL', desc: 'Supabase', highlight: true },
  ]}
  note="(선택) 흐름도 아래 설명 한 줄"
/>

## 주요 기능
- **기능 이름** — 사용자가 무엇을 할 수 있는지

## 기술적 의사결정
<Adr id="ADR-001" title="상태 관리: Redux 대신 Zustand" status="채택" open
  context="어떤 상황·제약이 있었는지"
  decision="무엇을 골랐고 대안은 무엇이었는지"
  consequence="얻은 것과 감수한 것" />

## 트러블슈팅
<Trouble problem="무엇이 안 됐는지" cause="원인을 어떻게 찾았는지" fix="해결 방법과 결과(수치)" />

## 회고
배운 점, 아쉬운 점, 다음에 다르게 할 점.
```

- `<Adr>` 의 `status`: `제안` · `채택` · `대체됨` · `폐기`. `open` 을 쓰면 펼쳐진 상태로 시작
- 필요 없는 섹션은 지워도 됩니다
- 본문에 이미지를 넣으려면 아래 "본문 이미지" 참고

### 수정 · 숨기기 · 삭제

| 하고 싶은 것 | 방법 |
| --- | --- |
| 홈에서만 빼기 | `featured: false` |
| 사이트 전체에서 숨기기 | `hidden: true` (목록 · 홈 · 상세 페이지 · 검색 · sitemap 에서 제외, 지우면 다시 노출) |
| 순서 바꾸기 | `order` 조정 (작을수록 앞). `order` 가 없으면 `sortDate` 최신순 |
| 완전히 삭제 | 파일 삭제 (+ 커버 이미지 삭제). 이미 공개된 적 있으면 `src/data/redirects.mjs` 에 `'/projects/옛이름/': '/projects/'` 추가 |
| 파일 이름(URL) 변경 | 공개된 적 있으면 `redirects.mjs` 에 옛 주소 → 새 주소 추가, 커버 이미지 이름도 함께 변경 |

---

## 3. 블로그

폴더: **`src/content/blog/`** — 글 하나 = `.md` 파일 하나 (컴포넌트를 쓸 때만 `.mdx`)

### 새 글 쓰기

1. 파일 이름: `YYYY-MM-DD-영문-slug.md` → URL 은 날짜를 뺀 `/blog/영문-slug/`
   `2026-11-20-astro-migration.md` → `/blog/astro-migration/`
2. 아래 frontmatter 를 복사해 채우고 본문을 씁니다

```yaml
---
title: "Jekyll 에서 Astro 로 옮긴 이유"
description: "목록 · 검색 · 링크 미리보기에 보이는 1~2문장 요약"
date: 2026-11-20T10:00:00+09:00
category: Dev                 # 목록의 카테고리 탭. 적게 유지 (Dev, TIL, Retrospect …)
tags: [astro, github-pages]   # 소문자, 띄어쓰기는 하이픈
# updated: 2026-11-25         # (선택) 수정일 표시
# draft: true                 # (선택) 배포에서 제외. npm run dev 에서는 보임
# slug: custom-url            # (선택) 파일 이름 대신 이 값을 URL 로 사용
---

글 본문은 ## 제목부터 시작합니다. (# 는 페이지 제목에 이미 쓰임)
```

| 필드 | 필수 | 메모 |
| --- | --- | --- |
| `title`, `description`, `date`, `category` | O | `date` 는 `+09:00` 을 붙여야 날짜가 하루 밀리지 않음 |
| `tags` | | 없으면 `[]` |
| `updated`, `draft`, `slug` | | |

- 카테고리 탭과 태그 목록은 글에서 **자동으로** 만들어집니다 (따로 등록할 필요 없음)
- 홈에는 최신 2편, 30일 이내 글에는 "새 글" 점이 표시됩니다
- 읽기 시간은 글자 수로 자동 계산됩니다

### 본문에서 쓸 수 있는 것

````md
## 제목 (목차에 표시)
### 소제목

**굵게**, `인라인 코드`, [링크](https://example.com)

- 목록
1. 번호 목록
- [x] 체크리스트

> 인용문 — 회색 박스로 표시 (NOTE 용도로 사용)

| 표 | 도 |
| --- | --- |
| 됩 | 니다 |

```ts
// 언어를 적으면 하이라이팅 + 줄 번호 + 복사 버튼
const hello = 'world';
```

![대체 텍스트](../../assets/blog/astro-migration/diagram.png)
````

### 본문 이미지

1. `src/assets/blog/<글-slug>/` 폴더에 이미지를 둡니다
2. 글에서 상대 경로로 참조: `![설명](../../assets/blog/<글-slug>/파일.png)`
3. 빌드할 때 자동으로 최적화됩니다. 대체 텍스트(`[설명]`)는 꼭 적어 주세요

### 수정 · 삭제 · URL 변경

| 하고 싶은 것 | 방법 |
| --- | --- |
| 내용 수정 | 파일 수정 후 `updated:` 날짜 추가(선택) |
| 잠시 숨기기 | `draft: true` |
| 삭제 | 파일 삭제. 공개된 적 있으면 `redirects.mjs` 에 `'/blog/옛-slug/': '/blog/'` 추가 |
| URL 변경 | 파일 이름 또는 `slug:` 변경 + `redirects.mjs` 에 옛 주소 → 새 주소 추가 |

> `npm run verify` 는 `redirects.mjs` 의 이동 대상이 없으면 실패합니다.
> 예: 예시 글 `welcome-to-jekyll` 을 지우면 `redirects.mjs` 에서 그 글을 가리키는 줄도 지우거나 대상을 `/blog/` 로 바꿔야 합니다.

---

## 4. 커버 이미지 · 썸네일

이미지가 없으면 제목으로 만든 **타이포그래피 커버**가 자동으로 표시됩니다.
실제 이미지는 **파일 이름만 맞춰 넣으면** 카드 · 목록 · 상세 페이지에 모두 적용됩니다. 코드 수정은 필요 없습니다.

| 대상 | 경로 | 예 |
| --- | --- | --- |
| 프로젝트 | `src/assets/covers/projects/<프로젝트 파일명>.<확장자>` | `todo-app.png` |
| 블로그 글 | `src/assets/covers/blog/<글 slug>.<확장자>` | `astro-migration.jpg` |

- 확장자: `png` `jpg` `jpeg` `webp` `avif` — **소문자**로 (`.PNG` 는 인식 안 됨)
- 크기: **1200 × 630** 권장. 비율이 다르면 가운데 기준으로 잘림
- 블로그 글 상세 페이지에서는 실제 이미지가 있을 때만 커버가 보입니다 (타이포 커버는 제목과 겹치므로 생략)

---

## 5. 예시 콘텐츠 정리 체크리스트

`npm run verify` 를 실행하면 남은 예시 항목을 알려 줍니다. 현재 남아 있는 것:

- [x] `src/data/profile.ts` — 이름, 한 줄 소개, 상태, 직무, About, 기술 스택
- [x] `src/content/projects/sample-project-02~04.mdx` — 실제 프로젝트로 교체 (템플릿은 `docs/templates/project.mdx`)
- [ ] `src/content/blog/2026-09-15-welcome-to-jekyll.md`, `2019-03-23-integrating-razorpay.md` — Jekyll · 테마 기본 글. 삭제 시 `redirects.mjs` 의 해당 줄도 정리

---

## 6. 깃에 올리는 파일 / 올리지 않는 파일

### 꼭 커밋해야 하는 파일

| 파일 | 이유 |
| --- | --- |
| `package.json`, **`package-lock.json`** | 배포 서버가 `npm ci` 로 똑같은 버전을 설치. lock 파일이 없으면 배포 실패 |
| `src/**`, `public/**` | 사이트 소스와 이미지 · PDF |
| `src/assets/covers/**/.gitkeep` | 빈 커버 폴더를 유지 |
| `astro.config.mjs`, `tsconfig.json`, `integrations/`, `scripts/` | 빌드 설정 · 검증 스크립트 |
| `.github/workflows/deploy.yml` | 자동 배포 |
| `CLAUDE.md`, `docs/`, `README.md` | 규칙과 문서 |

### 절대 커밋하면 안 되는 파일 (`.gitignore` 에 등록됨)

| 분류 | 예 | 이유 |
| --- | --- | --- |
| 빌드 결과물 | `dist/`, `.astro/`, `public/pagefind/` | 빌드하면 다시 생김. 배포는 Actions 가 직접 빌드 |
| 의존성 | `node_modules/` | 용량이 크고 `npm ci` 로 재설치 |
| **비밀 정보** | `.env`, `.env.*`, `*.pem`, `*.key`, `.npmrc` | 토큰 · 키 유출 위험. 예시 파일이 필요하면 `.env.example` 로 (이건 커밋 가능) |
| 개인 원본 | `_private/`, `*.psd`, `*.fig`, `*.sketch` | 이력서 원본, 고해상도 사진, 디자인 원본. 사이트에 올릴 최종본만 `public/` · `src/assets/` 에 |
| 로그 · 테스트 결과 | `*.log`, `coverage/`, `playwright-report/`, `test-results/` | 실행할 때마다 바뀌는 파일 |
| OS · 에디터 | `.DS_Store`, `Thumbs.db`, `desktop.ini`, `.idea/`, `.vscode/*`, `*.swp` | 개인 환경 파일 |
| 개인 도구 설정 | `.claude/settings.local.json` | 개인 권한 설정 (공유 규칙은 `CLAUDE.md`) |
| 옛 Jekyll 잔여물 | `_site/`, `.jekyll-cache/`, `Gemfile.lock`, `vendor/` | 더 이상 사용 안 함 |

커밋 전에 `git status` 로 위 파일이 목록에 없는지 확인하세요.
**실수로 비밀 정보를 push 했다면** 파일을 지우는 것만으로는 부족합니다 — 해당 토큰 · 키를 즉시 폐기(재발급)하세요.

---

## 7. 자주 만나는 문제

| 증상 | 원인 · 해결 |
| --- | --- |
| `npm run build` 에서 `status ... Invalid` | 프로젝트 `status` 는 `진행 중` · `완료` · `보관` 중 하나만 가능 |
| `... Required` 오류 | 필수 frontmatter 필드 누락. 위 표 확인 |
| `repo ... Invalid URL` | `repo` 는 `https://` 로 시작하는 전체 주소 |
| 글 날짜가 하루 전으로 보임 | `date` 에 `+09:00` 을 붙이기 |
| 기술 아이콘 대신 글자 배지 | 이름이 simple-icons 와 다름 → `tech.ts` 의 `ALIASES` 에 추가 |
| 커버 이미지가 안 바뀜 | 파일 이름이 프로젝트 파일명 · 글 slug 와 정확히 같은지, 확장자가 소문자인지 확인 |
| 검색이 안 됨 | `npm run dev` 에서는 원래 안 됨. `npm run build` → `npm run preview` 에서 확인 |
| `npm run verify` 에서 "리다이렉트 대상 페이지 없음" | 글 · 프로젝트를 지우거나 URL 을 바꾼 뒤 `redirects.mjs` 를 갱신하지 않음 |
| push 했는데 사이트가 그대로 | GitHub 저장소 → Actions 탭에서 실패 여부 확인. Settings → Pages → Source 가 GitHub Actions 인지 확인 |
