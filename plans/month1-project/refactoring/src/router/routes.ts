interface Route {
  path: string;
  component(): Promise<any>;
}

const routes: Route[] = [
  { path: '/login', component: () => import('../pages/login/index.ts') },
  { path: '/home', component: () => import('../pages/home/index.ts') },
];

export default routes;
