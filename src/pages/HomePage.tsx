import { Hero } from '../components/Hero';
import { KeyBenefits } from '../components/benefits/KeyBenefits';
import { FeatureShowcase } from '../components/features/FeatureShowcase';
import { Process } from '../components/Process';
import { CallToAction } from '../components/cta/CallToAction';
import { Trust } from '../components/Trust';
import { SEO } from '@/components/seo/SEO';
import { pageSEO } from '@/lib/seo/config';
import { useSEO } from '@/lib/seo/hooks/useSEO';

export function HomePage() {
  const { getCanonicalURL } = useSEO();

  return (
    <>
      <SEO 
        title={pageSEO.home.title}
        description={pageSEO.home.description}
        canonical={getCanonicalURL()}
      />
      <Hero />
      <KeyBenefits />
      <FeatureShowcase />
      <Process />
      <CallToAction />
      <Trust />
    </>
  );
}

export default HomePage;