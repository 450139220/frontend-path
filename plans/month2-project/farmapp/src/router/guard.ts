import type { Router } from 'vue-router';
import { useUserStore } from '@/store';

export default function setLoginGuard(router: Router) {
	router.beforeEach((to) => {
		const userStore = useUserStore();
		const isLoggedIn = userStore.getLoginState();

		if (!isLoggedIn && to.name !== 'login') return { name: 'login' };

		if (isLoggedIn) {
			if (to.name === 'login') {
				return { name: '' };
			}

			const targetUrl: string =
				to.path.endsWith('/') && to.path.length !== 1
					? to.path.slice(0, -1)
					: `${to.path}`;
			const hasRoute: boolean = !!router
				.getRoutes()
				.find((route) => route.path === targetUrl);
			if (!hasRoute) {
				console.log('404', to.path);
				return { name: '' };
			}
			return;
		}
	});
}
