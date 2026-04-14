import fs from 'fs/promises';
import path from 'path';
import { readSiteUrl } from './utils/seo-config.mjs';

const OUTPUT_PATH = path.resolve(process.cwd(), 'public/sitemap.xml');
const MAP_PINS_PATH = path.resolve(process.cwd(), 'src/constants/mapPins.ts');

const toAbsoluteUrl = (value, siteUrl) => {
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return `${siteUrl}${normalizedPath}`;
};

const xmlEscape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const getAreaIdsFromMapPins = async () => {
  const fileContent = await fs.readFile(MAP_PINS_PATH, 'utf-8');
  const areaIdRegex = /areaId:\s*'([^']+)'/g;

  const areaIds = new Set();
  let match = areaIdRegex.exec(fileContent);
  while (match) {
    areaIds.add(match[1]);
    match = areaIdRegex.exec(fileContent);
  }

  return Array.from(areaIds).sort((a, b) => Number(a) - Number(b));
};

const buildStaticUrls = (areaIds) => [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/search', changefreq: 'daily', priority: '0.9' },
  ...areaIds.map((areaId) => ({
    loc: `/festivals/${areaId}`,
    changefreq: 'weekly',
    priority: '0.8',
  })),
];

const buildSitemapXml = (urls, siteUrl) => {
  const lastmod = new Date().toISOString().split('T')[0];
  const body = urls
    .map(({ loc, changefreq, priority }) => {
      const absoluteLoc = toAbsoluteUrl(loc, siteUrl);
      return [
        '  <url>',
        `    <loc>${xmlEscape(absoluteLoc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    '</urlset>',
    '',
  ].join('\n');
};

const main = async () => {
  const siteUrl = await readSiteUrl();
  const areaIds = await getAreaIdsFromMapPins();
  const staticUrls = buildStaticUrls(areaIds);

  const uniqueMap = new Map();
  staticUrls.forEach((item) => {
    uniqueMap.set(item.loc, item);
  });

  const urls = Array.from(uniqueMap.values());
  const sitemapXml = buildSitemapXml(urls, siteUrl);

  await fs.writeFile(OUTPUT_PATH, sitemapXml, 'utf-8');

  console.log(`[sitemap] Generated ${urls.length} URLs -> public/sitemap.xml`);
};

main().catch((error) => {
  console.error('[sitemap] generation failed:', error);
  process.exit(1);
});
