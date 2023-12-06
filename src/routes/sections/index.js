import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
import { lazy } from 'react';
//
import AuthClassicLayout from 'src/layouts/auth/classic';
import { mainRoutes, HomePage } from './main';

import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';

const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const JwtConfirmPage = lazy(() => import('src/pages/auth/jwt/verify'));
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <JwtLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout>
          <JwtRegisterPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'confirm',
      element: (
        <AuthClassicLayout>
          <JwtConfirmPage />
        </AuthClassicLayout>
      ),
    },

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // Components routes
    ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
