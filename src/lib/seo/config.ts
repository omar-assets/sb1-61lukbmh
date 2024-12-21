import { APP_CONFIG } from '@/utils/constants';

export const defaultSEO = {
  title: APP_CONFIG.APP_NAME,
  titleTemplate: `%s | ${APP_CONFIG.APP_NAME}`,
  description: 'BRiX Assets transforms institutional-grade investments into accessible opportunities through innovative fractionalization technology.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brixasset.com',
    siteName: APP_CONFIG.APP_NAME,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BRiX Assets Platform'
      }
    ]
  },
  twitter: {
    handle: '@brixassets',
    site: '@brixassets',
    cardType: 'summary_large_image'
  }
};

export const pageSEO = {
  home: {
    title: 'Institutional-Grade Investment Platform',
    description: 'Access premium investment opportunities through secure fractional ownership, backed by professional portfolio management.'
  },
  marketplace: {
    title: 'Investment Marketplace',
    description: 'Discover and invest in premium assets through secure, regulated fractional ownership.'
  },
  about: {
    title: 'About Us',
    description: 'Learn how BRiX Assets is transforming investment management through innovative technology and professional expertise.'
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with our team to learn more about our investment opportunities and platform capabilities.'
  },
  howItWorks: {
    title: 'How It Works',
    description: 'Learn how our platform transforms institutional-grade investments into accessible opportunities through innovative fractionalization.'
  },
  dashboard: {
    title: 'Dashboard',
    description: 'Manage your investment portfolio and track performance with our comprehensive dashboard.'
  }
};