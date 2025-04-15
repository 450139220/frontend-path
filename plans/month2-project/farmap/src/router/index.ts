import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { useUserStore } from '@/store';

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

setRouterGuard();

function setRouterGuard() {
	router.beforeEach((to) => {
		const userStore = useUserStore();

		if (!userStore.isLoggedIn && to.name !== 'login') {
			return { name: 'login' };
		}

		if (userStore.isLoggedIn && to.name === 'login') {
			return { name: 'main' };
		}

		return undefined;
	});
}

export default router;
