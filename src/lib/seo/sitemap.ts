import { ROUTES } from '@/utils/constants';

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const baseURL = 'https://brixasset.com';

export function generateSitemap(): SitemapURL[] {
  return [
    {
      loc: `${baseURL}${ROUTES.HOME}`,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseURL}${ROUTES.MARKETPLACE}`,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseURL}${ROUTES.ABOUT}`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseURL}${ROUTES.HOW_IT_WORKS}`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseURL}${ROUTES.CONTACT}`,
      changefreq: 'yearly',
      priority: 0.5
    },
    {
      loc: `${baseURL}${ROUTES.FAQS}`,
      changefreq: 'monthly',
      priority: 0.7
    }
  ];
}