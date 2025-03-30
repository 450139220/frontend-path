import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import setLoginGuard from './guard';

const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/home/index.vue'),
	},
	{
		path: '/dash',
		name: 'dash',
		component: () => import('@/views/home/index.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

setLoginGuard(router);

export default router;
