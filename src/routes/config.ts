import { lazy } from 'react';
import { ROUTES } from '@/utils/constants';

// Lazy load components
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const FAQsPage = lazy(() => import('@/pages/FAQsPage'));
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const MarketplacePage = lazy(() => import('@/pages/MarketplacePage').then(m => ({ default: m.MarketplacePage })));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const NotFoundPage = lazy(() => import('@/pages/error/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export const publicRoutes = [
  { path: ROUTES.HOME, component: HomePage },
  { path: ROUTES.ABOUT, component: AboutPage },
  { path: ROUTES.CONTACT, component: ContactPage },
  { path: ROUTES.FAQS, component: FAQsPage },
  { path: ROUTES.HOW_IT_WORKS, component: HowItWorksPage },
  { path: ROUTES.MARKETPLACE, component: MarketplacePage },
  { path: ROUTES.LOGIN, component: LoginPage },
  { path: ROUTES.REGISTER, component: RegisterPage },
  { path: ROUTES.NOT_FOUND, component: NotFoundPage }
];

export const protectedRoutes = [
  { path: ROUTES.DASHBOARD, component: DashboardPage }
];