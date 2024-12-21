import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import { LoadingScreen } from '../ui/LoadingScreen';
import { ROUTES } from '@/utils/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    // Save the attempted URL for redirecting after login
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}