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
  location: 'Korea',

  /** 표시 이름. 비워 두면 한 줄 소개만 표시됩니다. */
  name: { value: '' } as Sampled & { value: string },
  headline: { value: '동시 요청 · 장애 · 중복 처리까지 고려해 안정적인 서비스를 만드는 백엔드 개발자' } as Sampled & { value: string },
  status: { value: '구직 중' },
  role: { value: 'Backend Developer' },
  /** 이력서 PDF 경로. 예: '/resume.pdf' (public/resume.pdf 에 파일을 두세요). 비어 있으면 버튼이 "준비 중" 상태로 표시됩니다. */
  resumeUrl: '' as string,

  /** About — 한 줄씩 bullet 로 표시. **굵게** 로 감싼 부분은 강조됩니다. */
  about: {
    points: [
      '단순히 동작하는 기능보다 **안정성과 데이터 정합성**까지 고려하는 개발을 지향합니다.',
      '**Spring Boot** 기반 MSA 프로젝트에서 송금 기능을 개발하며 **동시성 제어, 멱등성, 장애 복구**를 경험했습니다.',
      '**Java와 Spring 생태계**를 중심으로 학습하며 C 기반 Windows 애플리케이션과 Node.js 프로젝트도 개발하고 있습니다.',
      '협업에서는 요구사항과 설계 의도를 명확히 공유하고, **테스트와 문서화**를 통해 함께 유지보수할 수 있는 코드를 만드는 것을 중요하게 생각합니다.',
    ],
  } as Sampled & { points: string[] },
};

/**
 * 기술 스택 — 카테고리별로 이름만 적으면 아이콘이 자동으로 붙습니다(simple-icons, 빌드 시 조회).
 * 아이콘이 없는 이름은 글자 표시로 대체됩니다. 이름 매칭 규칙과 별칭 추가는 src/lib/tech.ts 참고.
 *
 * 영역별로 실제 프로젝트에서 쓴 기술과 활용 경험 한 줄(desc). 숙련도 표시는 하지 않습니다 (2026-11-24 사용자 확정).
 */
export const STACK_IS_SAMPLE = false;

/** 블로그 노출. false 면 메뉴 · 홈 섹션 · 404 버튼 · RSS 아이콘에서 숨깁니다(글 페이지와 옛 URL 리다이렉트는 유지). 실제 글이 생기면 true */
export const SHOW_BLOG = true;
export const STACK: { category: string; desc: string; items: string[] }[] = [
  { category: 'Backend', desc: 'REST API 설계, 트랜잭션 관리, 인증 · 인가, MSA 기반 서비스 구현', items: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'Spring Security', 'Spring Cloud Gateway'] },
  { category: 'Database & Messaging', desc: '데이터 정합성, 동시성 제어, 멱등성, 비동기 이벤트 처리', items: ['PostgreSQL', 'MySQL', 'Redis', 'Kafka'] },
  { category: 'Infrastructure & Monitoring', desc: '컨테이너 환경 구성, 배포 경험, 성능 지표 수집 및 모니터링', items: ['Docker', 'AWS', 'Prometheus', 'Grafana'] },
  { category: 'Testing & Performance', desc: '통합 테스트, 장애 시나리오 검증, 부하 테스트 및 병목 분석', items: ['JUnit', 'Testcontainers', 'k6'] },
  { category: 'Frontend & Others', desc: '컴포넌트 기반 UI 구현, API 연동, 서비스 간 통신 및 장애 대응', items: ['React', 'TypeScript', 'Vite', 'React Router', 'Node.js', 'Eureka', 'OpenFeign', 'Resilience4j'] },
];
