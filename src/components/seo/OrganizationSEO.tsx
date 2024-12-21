import { Helmet } from 'react-helmet-async';
import { organizationSchema } from '@/lib/seo/schemas/organization';

export function OrganizationSEO() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
}