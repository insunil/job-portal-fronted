import React from 'react';
import { lazy } from 'react';

// project imports
import Loadable from '@seeker/component/Loadable';
import MinimalLayout from '@seeker/layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('../views/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/Register')));

// ==============================|| AUTHENTICATION ROUTES ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/application/login',
      element: <AuthLogin />
    },
    {
      path: '/application/register',
      element: <AuthRegister />
    }
  ]
};

export default AuthenticationRoutes;
