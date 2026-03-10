export type SEOStaticConfig = {
  title: string;
  description: string;
  siteUrl: string;
  image: string;
  type: string;
  locale: string;
};

export type SEOConfig = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
};
