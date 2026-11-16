/**
 * 빌드 시점에 GitHub GraphQL API 로 기여 그래프와 저장소 통계를 가져옵니다.
 *
 * - GitHub Actions 에서는 워크플로가 GITHUB_TOKEN 을 넘겨 주므로 실제 데이터가 들어갑니다.
 * - 토큰이 없거나(로컬 빌드) 요청이 실패하면 기여 0 인 빈 그래프를 쓰고 화면에 "예시" 로 표시합니다.
 *   임의의 기여 데이터는 만들지 않습니다(실제 기록처럼 보이지 않도록). 빌드는 실패하지 않습니다.
 * - 토큰은 빌드 중 서버에서만 쓰이고 결과 HTML 에는 숫자만 들어갑니다.
 */
import { PROFILE } from '../data/profile';

export type Level = 0 | 1 | 2 | 3 | 4;

export interface GithubActivity {
  source: 'api' | 'sample';
  /** sample 일 때 이유 */
  reason?: string;
  /** 주 단위(일요일 시작) 7칸씩 */
  weeks: { date: string; count: number; level: Level }[][];
  total: number | null;
  repositories: number | null;
  longestStreak: number | null;
  topLanguage: string | null;
  fetchedAt: string;
}

const LEVEL: Record<string, Level> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
    repositories(ownerAffiliations: OWNER, privacy: PUBLIC, isFork: false, first: 100, orderBy: { field: PUSHED_AT, direction: DESC }) {
      totalCount
      nodes { primaryLanguage { name } }
    }
  }
}`;

function longestStreak(days: { count: number }[]): number {
  let best = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    if (run > best) best = run;
  }
  return best;
}

function sample(reason: string): GithubActivity {
  // 최근 53주 날짜 틀만 만들고 기여 수는 모두 0
  const today = new Date();
  const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  start.setUTCDate(start.getUTCDate() - 52 * 7 - start.getUTCDay());
  const weeks: GithubActivity['weeks'] = [];
  for (let w = 0; w < 53; w++) {
    const week: GithubActivity['weeks'][number] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + w * 7 + d);
      if (date > today) break;
      week.push({ date: date.toISOString().slice(0, 10), count: 0, level: 0 });
    }
    if (week.length) weeks.push(week);
  }
  return {
    source: 'sample',
    reason,
    weeks,
    total: null,
    repositories: null,
    longestStreak: null,
    topLanguage: null,
    fetchedAt: new Date().toISOString(),
  };
}

let cache: Promise<GithubActivity> | undefined;

export function getGithubActivity(): Promise<GithubActivity> {
  cache ??= load();
  return cache;
}

async function load(): Promise<GithubActivity> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) return sample('GITHUB_TOKEN 없음 (로컬 빌드)');

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-site-build',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: PROFILE.github } }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return sample(`GitHub API ${res.status}`);
    const json = (await res.json()) as any;
    const user = json?.data?.user;
    if (!user) return sample(json?.errors?.[0]?.message ?? 'GitHub API 응답 없음');

    const cal = user.contributionsCollection.contributionCalendar;
    const weeks: GithubActivity['weeks'] = cal.weeks.map((w: any) =>
      w.contributionDays.map((d: any) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL[d.contributionLevel] ?? 0,
      })),
    );

    const langCount = new Map<string, number>();
    for (const n of user.repositories.nodes) {
      const name = n?.primaryLanguage?.name;
      if (name) langCount.set(name, (langCount.get(name) ?? 0) + 1);
    }
    const topLanguage = [...langCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    return {
      source: 'api',
      weeks,
      total: cal.totalContributions,
      repositories: user.repositories.totalCount,
      longestStreak: longestStreak(weeks.flat()),
      topLanguage,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    return sample(err instanceof Error ? err.message : String(err));
  }
}
