import Layout from '@/layout/Layout.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/',
		name: 'main',
		component: Layout,
		children: [
			{
				path: 'home',
				name: '主页',
				component: () => import('@/views/home/index.vue'),
			},
			{
				path: 'map',
				name: '地图',
				component: () => import('@/views/map/index.vue'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		component: () => import('@/views/404/index.vue'),
	},
];

export { routes };
