import { SEO } from '@/components/seo/SEO';
import { pageSEO } from '@/lib/seo/config';
import { useSEO } from '@/lib/seo/hooks/useSEO';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { useAuthContext } from '@/components/auth/AuthProvider';

export function DashboardPage() {
  const { getCanonicalURL } = useSEO();
  const { user } = useAuthContext();

  return (
    <>
      <SEO 
        title="Dashboard"
        description="Manage your investment portfolio and track performance"
        canonical={getCanonicalURL()}
      />
      <BackgroundPattern variant="primary">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">
              Welcome Back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your investment dashboard is coming soon. We're working hard to bring you a comprehensive platform for managing your investments.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Portfolio Overview</li>
                  <li>• Investment Performance</li>
                  <li>• Transaction History</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Real-time Analytics</li>
                  <li>• Investment Opportunities</li>
                  <li>• Account Management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </BackgroundPattern>
    </>
  );
}

export default DashboardPage;