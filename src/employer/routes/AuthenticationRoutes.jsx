import React from 'react';
import { lazy } from 'react';

// project imports
import Loadable from '@employer/component/Loadable';
import MinimalLayout from '@employer/layout/MinimalLayout';

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
