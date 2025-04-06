import React, { JSX } from 'react';

type CustomRoutes = {
	name: string;
	path: string;
	component: React.LazyExoticComponent<() => JSX.Element>;
	children?: CustomRoutes;
};
// modify this <routes> to crud routes, and the layout would change responsively
export const routes: CustomRoutes[] = [
	{
		name: '主页',
		path: '/',
		component: React.lazy(() => import('@/views/home')),
	},
	{
		name: '园区总览',
		path: '/map',
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
		component: React.lazy(() => import('@/views/dashboard')),
	},
	{
		name: '设备列表',
		path: '/device',
		component: React.lazy(() => import('@/views/device')),
	},
];
