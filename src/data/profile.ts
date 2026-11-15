/**
 * 프로필 데이터.
 *
 * ▸ 대괄호 [ ] 로 감싼 값과 `sample: true` 가 붙은 항목은 자리표시용 예시입니다.
 *   실제 정보로 바꾼 뒤 대괄호와 `sample` 을 지워 주세요.
 * ▸ 화면에는 예시 항목마다 "예시" 배지가 표시됩니다.
 */

export interface Sampled {
  /** true 면 자리표시용 예시 콘텐츠 */
  sample?: boolean;
}

export const SITE = {
  url: 'https://gajigaji04.github.io',
  title: 'gajigaji04',
  description: '웹 개발자 gajigaji04의 포트폴리오와 기술 블로그. 만든 것, 맡은 역할, 그 과정의 기술적 결정을 기록합니다.',
  lang: 'ko',
  repo: 'https://github.com/gajigaji04/gajigaji04.github.io',
} as const;

export const PROFILE = {
  handle: 'gajigaji04',
  github: 'gajigaji04',
  email: 'gajigaji04@gmail.com',
  avatar: '/assets/bio-photo.jpg',
  /** 홈 개요에 표시. 옆의 현재 시각은 항상 서울(KST) 기준 */
  location: 'Seoul, Korea',

  // ─── 아래는 예시 값입니다 ───────────────────────────────
  name: { value: '[이름]', sample: true },
  headline: { value: '웹 개발자 — [어떤 문제를 어떤 방식으로 푸는지 한 줄]', sample: true },
  status: { value: '[현재 상태 · 예: 구직 중]', sample: true },
  role: { value: '[직무 · 예: Frontend Developer]', sample: true },
  /** 이력서 PDF 경로. 예: '/resume.pdf' (public/resume.pdf 에 파일을 두세요). 비어 있으면 버튼이 "준비 중" 상태로 표시됩니다. */
  resumeUrl: '' as string,

  /** About — 한 줄씩 bullet 로 표시. **굵게** 로 감싼 부분은 강조됩니다. */
  about: {
    sample: true,
    points: [
      '[개발을 대하는 태도를 한 문장으로. 예: **사용자가 체감하는 문제**를 코드로 풀어내는 데 관심이 많습니다.]',
      '[주요 경험 요약. 예: **React · TypeScript** 기반 프로젝트 **n개**를 기획부터 배포까지 진행했습니다.]',
      '[최근 집중하는 학습 방식이나 기술. 예: 배운 것을 **블로그**에 기록하며 정리합니다.]',
      '[협업에서 중요하게 생각하는 점.]',
    ],
  },
};

/**
 * 기술 스택 — 이름만 적으면 아이콘이 자동으로 붙습니다(simple-icons, 빌드 시 조회).
 * 예: 'Docker', 'Vue.js', 'Spring Boot', 'PostgreSQL'. 아이콘이 없는 이름은 텍스트 배지로 표시됩니다.
 * 이름 매칭 규칙과 별칭 추가는 src/lib/tech.ts 참고.
 *
 * 현재 목록은 예시입니다. 실제 스택으로 교체한 뒤 STACK_IS_SAMPLE 을 false 로 바꿔 주세요.
 */
export const STACK_IS_SAMPLE = true;
export const STACK: string[] = [
  'JavaScript',
  'TypeScript',
  'HTML5',
  'CSS',
  'React',
  'Next.js',
  'Astro',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MDX',
  'Git',
  'GitHub Actions',
  'Figma',
];
