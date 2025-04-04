import { createPinia, defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface UserState {
	token: string;
	username: string;
	role: number;
}

// role: 0 => admin
// role: 1 => orange
export const useUserStore = defineStore('user', {
	state: (): UserState => ({
		token: '',
		username: '',
		role: -1,
	}),
	actions: {
		clear() {
			this.token = '';
			this.username = '';
			this.role = -1;
			sessionStorage.removeItem('user');
		},

		getLoginState() {
			return this.token && this.token.length !== 0 ? true : false;
		},
		setLoginState({ token, username, role }: UserState) {
			this.$patch({ token, username, role });
			return true;
		},
	},
	persist: {
		key: 'user',
		storage: sessionStorage,
		// 'pick: undefined' meas to persis the whole state
	},
});

export default pinia;
