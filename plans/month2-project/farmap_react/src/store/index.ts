import { createSlice, configureStore } from '@reduxjs/toolkit';

type Sessions = Record<string, string | null>;
function getSession(...args: string[]): Sessions {
	const sessions: Sessions = {} as Sessions;

	for (const arg of args) {
		let session = sessionStorage.getItem(arg);
		if (!session) {
			session = '';
		}
		sessions[arg] = session;
	}

	return sessions;
}
// initial user states should define here;
const initialState = getSession('token', 'username', 'role');

// log state informations to console
let logInitialState = '[STORE]: current user states: ';
for (const [key, val] of Object.entries(initialState)) {
	logInitialState += `${key.toUpperCase()}:${val} `;
}
console.log(logInitialState);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			for (const key in state) {
				sessionStorage.setItem(key, '');
			}
		},
		login: (state) => {
			// TODO: modefy the logic of login
			for (const key in state) {
				sessionStorage.setItem(key, '123');
			}
		},
	},
});

export const { logout, login } = userSlice.actions;

const store = configureStore({
	reducer: userSlice.reducer,
});

store.subscribe(() => {
	// TODO: router at store subscribe?
	console.log('store subscribed, it may be used for router?');
});

export default store;
