import { useAppSelector } from '@/store';
import { lazy } from 'react';
import type { JSX, ReactNode } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router';
import type { RouteObject } from 'react-router';

const Login = lazy(() => import('@/views/login'));

const Layout = lazy(() => import('@/layout'));
const Home = lazy(() => import('@/views/home'));
const Farm = lazy(() => import('@/views/farm'));

const routes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/farm',
        element: <Farm />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
];

// cant be tested
export function AuthRoute({ children }: { children: ReactNode }): JSX.Element {
  const location = useLocation();
  const token = useAppSelector((state) => state.user.token);

  // not signed
  if (token === '' && location.pathname !== '/login')
    return <Navigate to="/login" />;

  // signed in
  if (token !== '' && location.pathname === '/login')
    return <Navigate to="/" />;

  return <>{children}</>;
}

export default function CustomRoutes() {
  return useRoutes(routes);
}
