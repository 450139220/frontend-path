import React from 'react';

// modify this <routes> to crud routes
export const routes = [
	{
		path: '/',
		component: React.lazy(() => import('@/views/home')),
	},
	{
		path: '/dashboard',
		component: React.lazy(() => import('@/views/dashboard')),
	},
];
