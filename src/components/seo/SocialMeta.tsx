import { Helmet } from 'react-helmet-async';
import { defaultSEO } from '@/lib/seo/config';

interface SocialMetaProps {
  title?: string;
  description?: string;
  image?: string;
}

export function SocialMeta({ 
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.openGraph.images[0].url 
}: SocialMetaProps) {
  return (
    <Helmet>
      {/* Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}