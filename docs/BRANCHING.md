# 브랜치 규칙

이 저장소는 **`main` 하나를 배포 브랜치로 두고, 작업마다 짧게 쓰고 지우는 브랜치**를 만드는 방식(GitHub Flow)을 따릅니다.
혼자 운영하는 정적 사이트라 `dev` 같은 중간 통합 브랜치는 두지 않습니다.

## 1. 브랜치 종류

| 브랜치 | 용도 | 수명 |
| --- | --- | --- |
| `main` | 배포 브랜치. push 되면 GitHub Actions 가 빌드 후 GitHub Pages 에 배포 | 영구 |
| `<type>/<주제>` | 내가 직접 하는 작업 하나 | 병합 후 삭제 |
| `claude/<주제>` | Claude 에게 요청한 작업 하나 | 병합 후 삭제 |

### `<type>` 목록 (커밋 타입과 같음)

| type | 언제 | 예 |
| --- | --- | --- |
| `feat` | 기능 추가 | `feat/blog-series` |
| `fix` | 버그 수정 | `fix/mobile-menu-scroll` |
| `design` | 스타일 · 레이아웃만 변경 | `design/project-card-hover` |
| `content` | 글 · 프로젝트 · 프로필 내용 | `content/post-astro-migration` |
| `docs` | 문서 | `docs/conventions` |
| `refactor` | 동작 변화 없는 코드 정리 | `refactor/cover-component` |
| `chore` / `ci` | 의존성, 설정, 워크플로 | `chore/bump-astro` |

### 이름 규칙

- 소문자 영어 + 하이픈(kebab-case): `feat/blog-series` (O), `feat/블로그시리즈` (X), `Feat/BlogSeries` (X)
- 하나의 브랜치 = 하나의 목적. 글 추가와 디자인 변경을 한 브랜치에 섞지 않습니다.
- 콘텐츠만 바꾸는 작은 수정(오타, 글 한 편)은 브랜치 없이 `main` 에 바로 커밋해도 됩니다. 단, 로컬에서 `npm run build` 는 통과시킨 뒤 push 합니다.

## 2. Claude 에게 작업을 요청할 때

1. 최신 `main` 에서 브랜치를 만듭니다.
   ```bash
   git switch main && git pull
   git switch -c claude/<주제>      # 예: claude/blog-series
   ```
2. 그 브랜치에서 Claude 에게 요청합니다. Claude 는 저장소의 `CLAUDE.md` 규칙을 따르며 **커밋 · push 는 하지 않습니다.**
3. 결과를 확인합니다: `npm run build` → `npm run verify` → `npm run preview` 로 화면 확인
4. 직접 커밋하고 push → Pull Request 생성 → PR 빌드가 통과하면 `main` 에 병합
5. 병합 후 브랜치 삭제

> 디자인 작업도 `theme` 같은 오래 사는 브랜치 대신 작업마다 `claude/<주제>` 또는 `design/<주제>` 를 새로 만듭니다.
> 오래 두는 브랜치는 `main` 과 금방 멀어져 병합이 어려워집니다(예: 예전 `thme/mistakes` 는 `main` 보다 6커밋 뒤처져 있었음).

## 3. 작업 흐름

```text
main ──●────────────●──────────●──▶  (push = 자동 배포)
        \          /  \        /
         ●──●──●──●    ●──●──●
        feat/xxx       claude/yyy
```

1. `main` 에서 브랜치 생성
2. 작업 · 커밋 (커밋 규칙: [CONVENTIONS.md](./CONVENTIONS.md#4-커밋-메시지))
3. push 후 PR 생성 — PR 에서도 빌드와 검증(`npm run verify`)이 자동으로 돕니다(배포는 안 함)
4. 체크 통과 후 **Squash and merge** 권장 (작업 하나 = `main` 커밋 하나)
5. 원격·로컬 브랜치 삭제

## 4. GitHub 저장소 설정 (권장)

- **Settings → Pages → Source: GitHub Actions** (필수)
- **Settings → Branches → Branch protection rule** (`main`)
  - Require a pull request before merging (혼자라면 승인 수 0)
  - Require status checks to pass → `build` 선택
- **Settings → General → Pull Requests**
  - Allow squash merging 만 켜기
  - Automatically delete head branches 켜기 (병합 후 브랜치 자동 삭제)

## 5. 기존 브랜치 정리 (1회)

Astro 전환 이전에 테마를 시험하던 브랜치들입니다. 내용은 태그로 보관하고 브랜치는 지웁니다.
**`feat/astro-portfolio-redesign` 을 `main` 에 병합한 다음** 실행하세요.

| 브랜치 | 상태 | 처리 |
| --- | --- | --- |
| `dev` (로컬) | `main` 과 동일, 원격 없음 | 삭제 |
| `thme/mistakes` = `origin/mistakes` | Minimal Mistakes 테마 시험 | 태그 `archive/theme-minimal-mistakes` 로 보관 후 삭제 |
| `thme/plain` = `origin/plain` | Plainwhite 테마 시험 (고유 커밋 1개) | 태그 `archive/theme-plainwhite` 로 보관 후 삭제 |
| `feat/astro-portfolio-redesign` | 이번 Astro 전환 작업 | 병합 후 삭제 |

```bash
git fetch --all --prune

# 1) 보관용 태그 (브랜치를 지워도 커밋은 태그로 남음)
git tag archive/theme-minimal-mistakes origin/mistakes
git tag archive/theme-plainwhite origin/plain
git push origin archive/theme-minimal-mistakes archive/theme-plainwhite

# 2) 원격 브랜치 삭제
git push origin --delete mistakes plain

# 3) 로컬 브랜치 삭제
git switch main && git pull
git branch -D dev thme/mistakes thme/plain
git branch -d feat/astro-portfolio-redesign   # 병합된 경우에만 지워짐
```

보관한 테마를 다시 보고 싶으면: `git switch --detach archive/theme-plainwhite`

### 병합 시 참고

`origin/main` 에 README 수정 커밋(`8516152 Revise README…`)이 있어 병합할 때 `README.md` 가 충돌합니다.
그 커밋은 이전 Jekyll/Plainwhite 사이트 설명이므로 **이 브랜치의 README 를 선택**하면 됩니다.

```bash
git switch feat/astro-portfolio-redesign
git merge origin/main          # README.md 충돌 발생
git checkout --ours README.md  # 새 README 유지
git add README.md && git commit
```
