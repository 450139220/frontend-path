import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import Discover from '@/views/discover';
import My from '@/views/my';
import Follow from '@/views/follow';
import Download from '@/views/download';
import NotFound from '@/views/404';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Discover />,
  },
  {
    path: '/discover',
    element: <Navigate to="/" />,
  },
  {
    path: '/my',
    element: <My />,
  },
  {
    path: '/follow',
    element: <Follow />,
  },
  {
    path: '/download',
    element: <Download />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
