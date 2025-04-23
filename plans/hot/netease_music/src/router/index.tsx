import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

const Discover = lazy(() => import('@/views/discover'));
const Recommend = lazy(() => import('@/views/discover/child-views/recommend'));
const Toplist = lazy(() => import('@/views/discover/child-views/toplist'));
const Playlist = lazy(() => import('@/views/discover/child-views/playlist'));
const Djradio = lazy(() => import('@/views/discover/child-views/djradio'));
const Artist = lazy(() => import('@/views/discover/child-views/artist'));
const Album = lazy(() => import('@/views/discover/child-views/album'));

const My = lazy(() => import('@/views/my'));
const Follow = lazy(() => import('@/views/follow'));
const Download = lazy(() => import('@/views/download'));
const NotFound = lazy(() => import('@/views/404'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Discover />,
    children: [
      {
        path: '/',
        element: <Navigate to="/discover" />,
      },
      {
        path: '/discover',
        element: <Recommend />,
      },
      {
        path: '/discover/toplist',
        element: <Toplist />,
      },
      {
        path: '/discover/playlist',
        element: <Playlist />,
      },
      {
        path: '/discover/djradio',
        element: <Djradio />,
      },
      {
        path: '/discover/artist',
        element: <Artist />,
      },
      {
        path: '/discover/album',
        element: <Album />,
      },
    ],
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

export default function Router() {
  return useRoutes(routes);
}
