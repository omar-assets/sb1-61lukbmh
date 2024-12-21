import { APP_CONFIG, COMPANY_INFO } from '@/utils/constants';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: APP_CONFIG.APP_NAME,
  url: 'https://brixasset.com',
  logo: 'https://brixasset.com/brix-logo.svg',
  foundingDate: COMPANY_INFO.FOUNDING_YEAR.toString(),
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${COMPANY_INFO.ADDRESS.STREET}, ${COMPANY_INFO.ADDRESS.SUITE}`,
    addressLocality: COMPANY_INFO.ADDRESS.CITY,
    addressRegion: COMPANY_INFO.ADDRESS.STATE,
    postalCode: COMPANY_INFO.ADDRESS.ZIP,
    addressCountry: COMPANY_INFO.ADDRESS.COUNTRY
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: COMPANY_INFO.PHONE,
    contactType: 'customer service',
    email: APP_CONFIG.CONTACT_EMAIL
  }
};