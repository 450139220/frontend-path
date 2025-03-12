import Store from './utils/store';
import Router, { Route } from './utils/router';

// create state store
const stores: Record<string, string> = {
	isLoggedIn: 'false',
	auth: 'init',
};
const storeManager = Store.getInstance(stores) as Store;
storeManager.init();
console.log(storeManager);

// create router
const routes: Route[] = [
	{
		path: '/login',
		name: '登录',
		component: () => import('./pages/login/index.ts'),
	},
	{
		path: '/',
		name: '主页',
		component: () => import('./pages/home/index.ts'),
	},
];
const router = new Router(routes);
router.init();
console.log(router);
