import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Project = CollectionEntry<'projects'>;

/** 최신순 블로그 글. 프로덕션 빌드에서는 draft 제외. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 최근순 프로젝트. hidden 은 제외. */
export async function getProjects(): Promise<Project[]> {
  const items = await getCollection('projects', ({ data }) => !data.hidden);
  // order(작을수록 앞) → 없으면 뒤로, 같으면 sortDate 최신순
  const rank = (p: Project) => p.data.order ?? Number.POSITIVE_INFINITY;
  return items.sort((a, b) => rank(a) - rank(b) || b.data.sortDate.valueOf() - a.data.sortDate.valueOf());
}

/** YYYY-MM-DD (KST 기준) */
export function ymd(date: Date): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(date);
}

/** 한글 기준 대략적인 읽기 시간 (분당 500자, 코드 블록 포함) */
export function readingMinutes(body: string | undefined): number {
  const text = (body ?? '').replace(/```[\s\S]*?```/g, (m) => ' '.repeat(Math.round(m.length / 3)));
  const chars = text.replace(/\s+/g, '').length;
  return Math.max(1, Math.round(chars / 500));
}

export function slugifyTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, '-');
}

/** 등장 빈도순 */
export function countBy<T>(items: T[], key: (item: T) => string[]): [string, number][] {
  const map = new Map<string, number>();
  for (const it of items) for (const k of key(it)) map.set(k, (map.get(k) ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

/** YYYY.MM.DD (KST 기준) */
export function dotDate(date: Date): string {
  return ymd(date).replace(/-/g, '.');
}

/** 텍스트를 HTML 이스케이프하고 **굵게** 만 <strong> 으로 바꿈 (데이터 파일의 강조 표기용) */
export function emph(text: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return esc.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
