export interface Route {
	path: string;
	name: string;
	component: () => Promise<any>;
}

// the first route must be login & the second must be the main page
export const routes: Route[] = [
	{
		path: '/login',
		name: '登录',
		component: () => import('../views/pages/login/index'),
	},
	{
		path: '/',
		name: '主页',
		component: () => import('../views/pages/home/index'),
	},
	{
		path: '/map',
		name: '地图',
		component: () => import('../views/pages/map/index'),
	},
];
