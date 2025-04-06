import React, { JSX } from 'react';

type CustomRoutes = {
	name: string;
	path: string;
	// icon value is from remix icon
	icon: string;
	component: React.LazyExoticComponent<() => JSX.Element>;
	children?: CustomRoutes;
};
// modify this <routes> to crud routes, and the layout would change responsively
export const routes: CustomRoutes[] = [
	{
		name: '主页',
		path: '/',
		icon: 'git-repository',
		component: React.lazy(() => import('@/views/home')),
	},
	{
		name: '园区总览',
		path: '/map',
		icon: 'leaf',
		component: React.lazy(() => import('@/views/map')),
		// children: {
		// 	name: '园区1',
		// 	path: '/filed1',
		// 	component: React.lazy(() => import('@/views/map/field1')),
		// },
	},
	{
		name: '综合展示',
		path: '/dashboard',
		icon: 'slideshow',
		component: React.lazy(() => import('@/views/dashboard')),
	},
	{
		name: '设备列表',
		path: '/device',
		icon: 'device',
		component: React.lazy(() => import('@/views/device')),
	},
];
