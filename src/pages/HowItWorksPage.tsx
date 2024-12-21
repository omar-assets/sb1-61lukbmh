import { SEO } from '@/components/seo/SEO';
import { pageSEO } from '@/lib/seo/config';
import { useSEO } from '@/lib/seo/hooks/useSEO';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { HowItWorksHero } from '@/components/how-it-works/HowItWorksHero';
import { FractionalizationTypes } from '@/components/fractionalization/explanations/FractionalizationTypes';
import { HowItWorksSection } from '@/components/how-it-works/HowItWorksSection';
import { InvestmentProcess } from '@/components/process/InvestmentProcess';
import { GetStartedCTA } from '@/components/cta/GetStartedCTA';

export function HowItWorksPage() {
  const { getCanonicalURL } = useSEO();

  return (
    <>
      <SEO 
        title="How It Works"
        description="Learn how our platform transforms institutional-grade investments into accessible opportunities through innovative fractionalization."
        canonical={getCanonicalURL()}
      />
      <BackgroundPattern variant="primary">
        <HowItWorksHero />
      </BackgroundPattern>
      <FractionalizationTypes />
      <HowItWorksSection />
      <InvestmentProcess />
      <GetStartedCTA />
    </>
  );
}

export default HowItWorksPage;