import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ROUTES } from '@/utils/constants';
import { publicRoutes, protectedRoutes } from './config';

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {/* Protected Routes */}
        {protectedRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <Component />
              </ProtectedRoute>
            }
          />
        ))}

        {/* Catch all route */}
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Suspense>
  );
}