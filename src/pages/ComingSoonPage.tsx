import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';
import { BackgroundPattern } from '../components/ui/BackgroundPattern';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export function ComingSoonPage() {
  const navigate = useNavigate();

  return (
    <BackgroundPattern variant="primary">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-8">
              <Construction className="h-10 w-10 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Platform Coming
              <span className="text-primary"> Soon</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12">
              We're working hard to bring you an exceptional investment experience. 
              Our platform is currently in development and will be launching soon. 
              Thank you for your patience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-medium transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Return to Homepage
              </button>
            </div>

            <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What to Expect
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-gray-600">
                    • Professional portfolio management
                    <br />
                    • Real-time investment tracking
                    <br />
                    • Secure fractional ownership
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    • Advanced analytics dashboard
                    <br />
                    • Automated reporting
                    <br />
                    • Expert market insights
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </BackgroundPattern>
  );
}

export default ComingSoonPage;