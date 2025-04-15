import router from '@/router';
import { createPinia, defineStore } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(
	createPersistedState({
		storage: sessionStorage,
	})
);

interface State {
	name: string;
	token: string;
	role: string;
}

export const useUserStore = defineStore('user', {
	state: (): State => ({
		name: '',
		token: '',
		role: '',
	}),
	getters: {
		isLoggedIn: (state) => state.token !== '',
	},
	actions: {
		login(payload: State) {
			for (const [key, val] of Object.entries(payload)) {
				this[key as keyof State] = val;
			}
			router.push('/');
		},
		logout() {},
	},
	persist: true,
});

export default pinia;
