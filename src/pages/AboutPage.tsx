import { SEO } from '@/components/seo/SEO';
import { pageSEO } from '@/lib/seo/config';
import { useSEO } from '@/lib/seo/hooks/useSEO';
import { AboutHeader } from "../components/about/AboutHeader";
import { OurStory } from "../components/about/OurStory";
import { MissionVision } from "../components/about/MissionVision";
import { TeamSection } from "../components/about/TeamSection";
import { LearnMore } from "../components/about/LearnMore";

function AboutPage() {
  const { getCanonicalURL } = useSEO();

  return (
    <>
      <SEO 
        title={pageSEO.about.title}
        description={pageSEO.about.description}
        canonical={getCanonicalURL()}
      />
      <AboutHeader />
      <OurStory />
      <MissionVision />
      <TeamSection />
      <LearnMore />
    </>
  );
}

export default AboutPage;