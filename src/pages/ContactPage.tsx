import { SEO } from '@/components/seo/SEO';
import { pageSEO } from '@/lib/seo/config';
import { useSEO } from '@/lib/seo/hooks/useSEO';
import { BackgroundPattern } from '../components/ui/BackgroundPattern';
import { ContactInfo } from '../components/contact/ContactInfo';

function ContactPage() {
  const { getCanonicalURL } = useSEO();

  return (
    <>
      <SEO 
        title={pageSEO.contact.title}
        description={pageSEO.contact.description}
        canonical={getCanonicalURL()}
      />
      <BackgroundPattern variant="primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in
              <span className="text-primary"> Touch</span>
            </h1>
            <p className="text-xl text-gray-600">
              Have questions? Our team is here to help you with any inquiries about our investment opportunities and platform capabilities.
            </p>
          </div>
        </div>
      </BackgroundPattern>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;