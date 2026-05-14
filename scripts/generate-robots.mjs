import fs from 'fs/promises';
import path from 'path';
import { readSiteUrl } from './utils/seo-config.mjs';

const OUTPUT_PATH = path.resolve(process.cwd(), 'public/robots.txt');
const ROUTES_PATH = path.resolve(process.cwd(), 'src/constants/routes.tsx');

// 공개 크롤링 허용 라우트 키만 관리하면 나머지는 자동으로 Disallow 됩니다.
const PUBLIC_ROUTE_KEYS = new Set(['HOME', 'SEARCH', 'FESTIVALS', 'FESTIVAL_INFO']);

const normalizeForAllow = (routePath) => {
  const wildcardPath = routePath.replace(/:[^/]+/g, '*');
  if (!wildcardPath.includes('*')) return wildcardPath;
  const prefix = wildcardPath.split('*')[0];
  return prefix.endsWith('/') ? prefix : `${prefix}/`;
};

const normalizeForDisallow = (routePath) => {
  const wildcardPath = routePath.replace(/:[^/]+/g, '*');
  return wildcardPath.replace(/\/\*$/, '');
};

const readRoutePathMap = async () => {
  const content = await fs.readFile(ROUTES_PATH, 'utf-8');
  const regex = /([A-Z0-9_]+):\s*'([^']+)'/g;

  const routePathMap = [];
  let match = regex.exec(content);
  while (match) {
    routePathMap.push({ key: match[1], path: match[2] });
    match = regex.exec(content);
  }

  return routePathMap;
};

const buildRules = (routePathMap) => {
  const allowSet = new Set();
  const disallowSet = new Set();

  routePathMap.forEach(({ key, path: routePath }) => {
    if (routePath === '*') return;

    if (PUBLIC_ROUTE_KEYS.has(key)) {
      allowSet.add(normalizeForAllow(routePath));
      return;
    }

    disallowSet.add(normalizeForDisallow(routePath));
  });

  if (!allowSet.has('/')) {
    allowSet.add('/');
  }

  const allowRules = Array.from(allowSet)
    .sort()
    .map((value) => `Allow: ${value}`);
  const disallowRules = Array.from(disallowSet)
    .sort()
    .map((value) => `Disallow: ${value}`);

  return { allowRules, disallowRules };
};

const buildRobotsTxt = ({ allowRules, disallowRules }, siteUrl) => {
  return [
    'User-agent: *',
    ...allowRules,
    '',
    ...disallowRules,
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n');
};

const main = async () => {
  const siteUrl = await readSiteUrl();
  const routePathMap = await readRoutePathMap();
  const rules = buildRules(routePathMap);
  const content = buildRobotsTxt(rules, siteUrl);
  await fs.writeFile(OUTPUT_PATH, content, 'utf-8');
  console.log('[robots] Generated public/robots.txt');
};

main().catch((error) => {
  console.error('[robots] generation failed:', error);
  process.exit(1);
});
