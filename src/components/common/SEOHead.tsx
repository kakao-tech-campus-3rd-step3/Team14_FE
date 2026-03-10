import { Helmet } from 'react-helmet-async';

import seoDefaults from '@/constants/seo.json';
import type { SEOConfig, SEOStaticConfig } from '@/types/Seo';

const SEO_DEFAULTS: SEOStaticConfig = seoDefaults;

const toAbsoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return `${SEO_DEFAULTS.siteUrl}${normalizedPath}`;
};

const SEOHead = ({ title, description, url, image, type, noindex = false }: SEOConfig) => {
  const resolvedTitle = title ?? SEO_DEFAULTS.title;
  const resolvedDescription = description ?? SEO_DEFAULTS.description;
  const resolvedUrl = toAbsoluteUrl(url ?? '/');
  const resolvedImage = toAbsoluteUrl(image ?? SEO_DEFAULTS.image);
  const resolvedType = type ?? SEO_DEFAULTS.type;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="title" content={resolvedTitle} />
      <meta name="description" content={resolvedDescription} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:type" content={resolvedType} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:site_name" content={SEO_DEFAULTS.title} />
      <meta property="og:locale" content={SEO_DEFAULTS.locale} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={resolvedUrl} />
      <meta property="twitter:title" content={resolvedTitle} />
      <meta property="twitter:description" content={resolvedDescription} />
      <meta property="twitter:image" content={resolvedImage} />

      <link rel="canonical" href={resolvedUrl} />
    </Helmet>
  );
};

export default SEOHead;
