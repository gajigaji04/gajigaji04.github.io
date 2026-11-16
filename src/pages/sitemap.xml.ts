// 기존 Jekyll 사이트와 같은 /sitemap.xml 주소를 유지합니다(검색엔진에 이미 등록되어 있을 수 있음).
import type { APIContext } from 'astro';
import { getPosts, getProjects } from '../lib/content';

export async function GET({ site }: APIContext) {
  const abs = (p: string) => new URL(p, site).href;
  const posts = await getPosts();
  const projects = await getProjects();
  const latest = posts[0]?.data.date ?? new Date();

  const urls: { loc: string; lastmod?: Date }[] = [
    { loc: abs('/'), lastmod: new Date() },
    { loc: abs('/projects/') },
    { loc: abs('/blog/'), lastmod: latest },
    ...projects.map((p) => ({ loc: abs(`/projects/${p.id}/`) })),
    ...posts.map((p) => ({ loc: abs(`/blog/${p.id}/`), lastmod: p.data.updated ?? p.data.date })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.toISOString()}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
