import fs from 'fs/promises';
import path from 'path';

const SEO_CONFIG_PATH = path.resolve(process.cwd(), 'src/constants/seo.json');

export const readSiteUrl = async () => {
  const seoConfigText = await fs.readFile(SEO_CONFIG_PATH, 'utf-8');
  const seoConfig = JSON.parse(seoConfigText);
  if (!seoConfig.siteUrl) {
    throw new Error('siteUrl is missing in src/constants/seo.json');
  }

  return seoConfig.siteUrl.replace(/\/+$/, '');
};
