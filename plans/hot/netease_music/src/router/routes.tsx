import { RouteObject } from 'react-router-dom';
import Discover from '@/views/discover';
import My from '@/views/my';

const routes: RouteObject[] = [
  {
    path: '/discover',
    element: <Discover />
  },
  {
    path: '/my',
    element: <My />
  },
];

export default routes;
