import { Helmet } from 'react-helmet-async';
import { defaultSEO } from '@/lib/seo/config';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
}

export function SEO({ 
  title, 
  description = defaultSEO.description,
  canonical,
  openGraph 
}: SEOProps) {
  const siteTitle = title 
    ? defaultSEO.titleTemplate.replace('%s', title)
    : defaultSEO.title;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content={defaultSEO.openGraph.type} />
      <meta property="og:title" content={openGraph?.title || siteTitle} />
      <meta property="og:description" content={openGraph?.description || description} />
      <meta property="og:site_name" content={defaultSEO.openGraph.siteName} />
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Open Graph Images */}
      {(openGraph?.images || defaultSEO.openGraph.images).map((image) => (
        <meta key={image.url} property="og:image" content={image.url} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content={defaultSEO.twitter.cardType} />
      <meta name="twitter:site" content={defaultSEO.twitter.site} />
      <meta name="twitter:creator" content={defaultSEO.twitter.handle} />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}