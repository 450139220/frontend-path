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
				path: '',
				name: '/',
				meta: {
					title: '主页',
					icon: 'git-repository',
				},
				component: () => import('@/views/home/index.vue'),
			},
			{
				path: 'map',
				name: 'map',
				meta: {
					title: '地图',
					icon: 'map-2',
				},
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
