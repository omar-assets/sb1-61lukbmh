import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { AppRoutes } from './routes';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { Header } from './components/navigation/Header';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { AuthProvider } from './components/auth/AuthProvider';
import { ErrorProvider } from './context/ErrorContext';
import { OrganizationSEO } from './components/seo/OrganizationSEO';

function App() {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <BrowserRouter>
          <AuthProvider>
            <OrganizationSEO />
            <div className="min-h-screen bg-white">
              <Header />
              <main className="pt-16">
                <Suspense fallback={<LoadingScreen />}>
                  <AppRoutes />
                </Suspense>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </ErrorProvider>
    </ErrorBoundary>
  );
}

export default App;