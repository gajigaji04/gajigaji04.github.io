# 작업 기록

최신 기록이 위에 옵니다. 작업을 마치면 맨 위에 `### YYYY-MM-DD — 제목 (브랜치, 커밋 여부)` 형식으로 추가합니다.
(이 파일은 `CLAUDE.md` 가 매 대화마다 읽히는 비용을 줄이려고 분리했습니다. 필요할 때만 엽니다.)

### 2026-11-24 — 최종 점검 (`feat/astro-portfolio-redesign`, 미커밋)

- ByteSieve `milestone`: 테스트 84개 → "v1.0.1 기준 테스트 97개 통과" 로 바꿔 "v1.0.0 정식 릴리스 완료" 뒤로 이동(사용자 결정)
- TravelPay: `dont-worrys/travelpay-front` 에서 Vitest 실행 → 팀 전체 62파일 405건 통과, 본인 생성 파일 55개 확인. 본인 파일의 현재 케이스 수는 328건(팀원 커밋 220e3e5 · e0ae4eb 가 일부 추가)이라 318건은 정확히 재현 못 함 → 사용자 결정으로 "직접 작성 55파일 318건" 제거, "팀 전체 기준 62파일 405건" 으로 표기. 33.9kB · 화면 48개 유지. "경합 지점 6곳" 은 저장소 근거 없음 → 숫자만 제거
- 블로그 소개 글: 실명(김지혜) 공개 유지(사용자 결정). frontmatter 는 템플릿과 일치

### 2026-11-24 — 완료 프로젝트 3개 상세 페이지 보강 (`feat/astro-portfolio-redesign`, 미커밋)

- TravelPay · Spring Delivery Mini · ByteSieve 를 Logistics MSA 구성(소개 → 역할/개발 범위 → 구조 → 핵심 구현 → Trouble → 성능 · 검증 → 테스트)으로 재구성. 저장소 문서 · PR · 코드와 대조, 원문 수치 유지, frontmatter 유지. 숨김 완료 프로젝트 3개는 제외
- TravelPay: P95 / P99 는 이전 결정대로 계속 보류(에이전트가 넣은 회차별 범위 행 삭제). 원문 수치 33.9kB · 48개 화면 · 프론트 55파일 318건 · 경합 6곳은 저장소에서 미확인(원문 유지)
- Spring Delivery Mini: 테스트 114클래스 1,001건 · 프론트 116건(local-verification 11-1), 정렬 변경(#98) 뒤 조회 성능 재측정 안 됨을 한계로 명시, 공개 데모는 Kafka 없는 `prod-free`
- ByteSieve: 테스트 73개(add_test 줄 수) → 97개(단위 31 · CLI 32 · GUI 34)로 정정. frontmatter `milestone` 의 84개는 v1.0.0 기준이라 사용자 확인 필요. 언어는 C11 확인, 릴리스 v1.0.0(11-07) · v1.0.1(11-14)

### 2026-11-24 — 첫 블로그 글 게시 (`feat/astro-portfolio-redesign`, 미커밋)

- 사용자가 쓴 `1.md` 를 다듬어 `2026-11-24-introduction.md`(`/blog/introduction/`, Development, featured)로 옮김. 제목을 본문 첫 문장으로, description 추가, 태그 소문자, 본문 `#` 제거, 프로젝트 3개 링크
- `1.md` 는 사용자가 직접 삭제 (자동 삭제가 권한에서 막힘). 빌드 · verify 통과, `/blog/introduction/` 생성 확인

### 2026-11-24 — 블로그 글 템플릿 정리 (`feat/astro-portfolio-redesign`, 미커밋)

- `src/content/blog/` 의 빈 `1.md` 와 자리표시만 있던 `condention.md` 삭제 (실제 글 아님, 빌드 실패 원인). 블로그 0편 유지
- 템플릿을 `docs/templates/blog.md` 로 옮겨 스키마에 맞춤(description 추가, 날짜 `+09:00`, 소문자 태그, `draft: true`, 본문 `#` 제목 제거). `FILES.md` · `CONTENT_GUIDE.md` 3절에 경로 추가

### 2026-11-24 — Logistics MSA 상세 페이지 보강 (`feat/astro-portfolio-redesign`, 미커밋)

- `logistics-msa.mdx` 본문 재구성: 소개 → 담당/팀원 역할 표 → Architecture(ArchFlow 신규) → 핵심 구현 5개(배경·설계·검증) → Trouble 4건 → 성능(k6 측정 조건·표) → 테스트·협업. frontmatter 는 그대로
- 근거: 저장소(develop) README · `api-gateway/loadtest/RESULTS.md` · 코드 주석 · 테스트 이름 · 본인 PR 본문. PR #299 본문 중 병합 코드에 없는 항목(비밀번호 변경·비활성화 시 토큰 폐기, 회원→토큰 잠금 순서, 폐기 테스트 8개, 보안 로그)은 제외. PR #297 본문의 "Redis" 는 코드상 Caffeine 이라 코드 기준

### 2026-11-24 — 블로그 정리 (`feat/astro-portfolio-redesign`, 미커밋)

- 예시 · 테스트 글 3편 삭제(`integrating-razorpay`, `welcome-to-jekyll`, `post-test`). 빈 폴더 유지용 `src/content/blog/.gitkeep`
- `redirects.mjs`: 옛 Jekyll 주소 7개 대상 → `/blog/`, 지운 글의 Astro 주소 3개(`/blog/<slug>/`) → `/blog/` 추가 (총 11개)
- 스키마: `category` 를 enum(Engineering · Troubleshooting · Performance · Development)으로 고정, `featured` 추가
- `blog/index.astro`: 소개 문구 변경, 대표 글 / 전체 글 묶음(`.group-h`), 글 0편이면 빈 상태 안내만 표시(검색 · 필터 숨김, 스크립트 가드)
- 홈 Blog 섹션은 `SHOW_BLOG && 글 1편 이상` 일 때만
- 확인: 잘못된 카테고리 → 빌드 실패, featured 글 → "대표 글" 표시 (임시 글로 확인 후 삭제). 빌드 시 "blog collection is empty" 경고는 글이 생기면 사라짐
- 작성 예정 주제 6개는 비공개(사이트에 넣지 않음)

### 2026-11-24 — 홈 Tech Stack 섹션 개편 (`feat/astro-portfolio-redesign`, 미커밋)

- 주력 / 경험 있음 → 영역 5개(Backend · Database & Messaging · Infrastructure & Monitoring · Testing & Performance · Frontend & Others) + 영역별 활용 경험 한 줄(`STACK[].desc`). 제목 `Tech Stack`
- `global.css`: `.stack-cat` 진하게, `.stack-desc` 추가, 그룹 간격 28px. `tech.ts` 별칭 `junit → junit5`
- 화면 확인 도구(playwright) 미설치 — 다크/라이트 · 375px 는 사용자 확인 필요

### 2026-11-24 — TravelPay 소개 페이지 원문 반영 (`feat/astro-portfolio-redesign`, 미커밋)

- 본문을 사용자 원문으로 교체(프로젝트 소개 · 주요 성과 백/프론트 · 핵심 설계 4 · 트러블슈팅 2(Trouble 컴포넌트) · 검증 · 개인 확장 · 협업 · 한계). Architecture 다이어그램 · 저장소 링크 유지
- frontmatter: summary, role, period `2026.10 — 2026.11`, stack 원문 기준(아이콘 매칭 위해 버전 숫자 제외). status · deploy 유지
- 제거: 기존 주요 기능 · Technical Details · Trouble(E2E 장애 시나리오 12가지) · P95 205.37 → 185.59ms 수치(원문은 평균 81 → 66ms)
- 후속: `status: 완료`, Architecture 설명에서 Terraform 제거 · Redis 는 세션 인증만, Technical Details 4개 선별 복원(통화별 송금 · 마스킹, 요청 값 비교, 재시도 5회 → MANUAL_REVIEW, 알림 eventId 중복 제거 · Slack), 검증에 E2E 장애 시나리오 12가지 추가. P95 수치는 측정 조건 미확인이라 보류. 제외: 팀 담당 기능(세션 · CSRF · 지갑 · 충전 · 환전 · 결제), 비관적 잠금 · 잠금 순서(원장 위임 구조와 담당 범위 불명확)

### 2026-11-24 — Spring Delivery Mini 소개 페이지 원문 반영 (`feat/astro-portfolio-redesign`, 미커밋)

- 본문을 사용자 원문(프로젝트 소개 · 주요 성과 · 기술적 문제 해결 4개 · 검증 및 배포 · 성능 수치 단서)으로 교체, Architecture 다이어그램은 유지
- 후속: `status: 완료`, Trouble Shooting 3건(SSE 커넥션 · Redis DNS 타임아웃 · Kafka Outbox 잠금) 복원, 주요 기능 · Technical Details 는 본문과 겹치지 않는 항목만 복원(저장소 shallow clone 으로 코드 대조. Access 15분 · 946건 테스트 · keyset 인덱스 상세 · 화면 항목은 제외). 남은 과제 줄은 제외
- frontmatter: summary, period `2026.10 — 2026.11`, deploy `Vercel · Render`. status(진행 중) · stack 은 유지

### 2026-11-24 — Logistics MSA 프로젝트 추가 (`feat/astro-portfolio-redesign`, 미커밋)

- `src/content/projects/logistics-msa.mdx` (P-14, `status: 완료`). 홈 노출: AI Career Tracker(order 5, featured false) 대신 Logistics MSA(order 4, featured true). 이후 포트폴리오 원문 기준으로 갱신: 역할 API Gateway · User Service, 기간 2026.10.14 — 2026.11.14, 주요 구현 Gateway 5개 / User Service 4개(Redis 캐싱 항목 → Caffeine 캐싱), 스택 Redis → Caffeine. 사용자 제공 정보만 사용, 성능 수치는 측정 조건 미확인
- `repo: https://github.com/yuksabal-team6/logistics-msa`. `tech.ts` 별칭 `java 17` 추가
- ByteSieve 언어 표기(C11 · Win32) · 버전 표기(v1.0.0 최초 / v1.0.1 최신)는 사용자 확인 전까지 유지

### 2026-11-24 — 외부 피드백 반영 (`feat/astro-portfolio-redesign`, 미커밋)

- **블로그 숨김 → 사용자 요청으로 다시 표시(`SHOW_BLOG = true`)**: 플래그만 남김. `false` 면 → 메뉴 · 홈 섹션 · 404 버튼 · 푸터 RSS 숨김. 글 페이지 · 옛 URL 리다이렉트는 유지. 실제 글이 생기면 `true`
- **GitHub 잔디**: 데이터를 못 받은 빌드(`gh.source !== 'api'`)에선 섹션 전체 숨김 (라이브는 정상 표시 확인)
- **이력서 버튼**: `resumeUrl` 비면 버튼을 렌더링하지 않고 메일 버튼을 주 버튼으로. PDF 는 아직 없음
- **Stack "AW"**: 아이콘 없는 기술(AWS)의 자리표시를 이름 앞 2글자 → `code` 아이콘으로
- **카드 기술 아이콘**: 아이콘 있는 것만, 같은 아이콘은 한 번, 앞 6개 (`ProjectCard.astro`)
- **순서**: TravelPay 1 · Spring Delivery Mini 2 · ByteSieve 3 · AI Career Tracker 4
- **소개 문구**: "결제 · 송금처럼 돈이 오가는 흐름에서 데이터 정합성을 지키는 백엔드 개발자" → 2026-11-24 "동시 요청 · 장애 · 중복 처리까지 고려해 안정적인 서비스를 만드는 백엔드 개발자" 로 변경 (팀 프로젝트 인증 · 인가까지 포괄)
- **후속(사용자 답변 반영)**: 스키마 `milestone`(완료 범위 한 줄, 카드 · 상세 표시) 추가 → Spring Delivery Mini · TravelPay · ByteSieve 적용. ByteSieve `status: 완료`, 기간 `2026.10 — 2026.11`. Stack 을 주력 / 경험 있음 두 묶음으로 교체(`tech.ts` 별칭: Java 21 → openjdk, Spring Cloud Gateway · Eureka · OpenFeign → spring). TravelPay 트러블슈팅 수치를 JDBC batch 벤치마크 실측(TPS 151.30 → 170.44, P95 205.37 → 185.59ms, 오류율 0%, 로컬 단일 PC)으로 교체 — VU · 시간은 미확인이라 미기재
- **남은 것**: 이력서 PDF(`public/resume.pdf`), 물류 MSA 프로젝트 페이지 없음, ByteSieve 언어(C11 vs C++) · 릴리스 버전 표기 확인

### 2026-11-24 — Spring Delivery Mini 사이트 링크 복원 (`feat/astro-portfolio-redesign`, 미커밋)

- **변경**: `spring-delivery-mini.mdx` 의 `live: https://spring-delivery-mini.vercel.app/` 주석 해제. TravelPay 는 계속 숨김(주석 유지)
- **추가**: 스키마에 `repoFront`(선택) 필드. 있으면 상세 페이지 버튼이 `GitHub · 백엔드` / `GitHub · 프론트엔드` 로 나뉨(카드는 `repo` 아이콘 하나 유지). TravelPay 에 `repoFront: https://github.com/dont-worrys/travelpay-front` 적용, CONTENT_GUIDE 갱신
- AI Career Tracker 숨김 요청 → 취소, 표시 상태 그대로
- build · verify 통과

### 2026-11-22 — 프로젝트 사이트 링크 숨김 (`feat/astro-portfolio-redesign`, 미커밋)

- **이유**: 백엔드·DB 가 꺼져 있어 프론트만 열리는 상태 → 깨진 데모 노출 방지
- **변경**: `spring-delivery-mini.mdx` · `travelpay.mdx` 의 `live:` 줄을 YAML 주석 처리(주소 보존, 복원은 `# ` 만 지우면 됨). 이 사이트 자신(`gajigaji04-github-io`, `live: /`)은 정상 동작이라 유지
- **배포 방침(상담 결과)**: 대표작 1~2개만 풀스택 배포(무료 DB Neon·Supabase + 백엔드 Render·Koyeb·Fly 등, 데모 계정 · 콜드 스타트 안내), 나머지는 시연 영상 + README. 백엔드가 살아나면 `live:` 복원
- **후속 아이디어**: frontmatter 에 `video`(시연 영상) 필드 추가, 라이브 프로젝트에만 배지 표시 — 미착수

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
