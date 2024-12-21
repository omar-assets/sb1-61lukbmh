import { useLocation } from 'react-router-dom';
import { defaultSEO } from '../config';

export function useSEO() {
  const { pathname } = useLocation();
  const baseURL = 'https://brixasset.com';

  return {
    getCanonicalURL: () => `${baseURL}${pathname}`,
    getStructuredData: (data: object) => ({
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: defaultSEO.title,
        url: baseURL,
        ...data
      })
    })
  };
}