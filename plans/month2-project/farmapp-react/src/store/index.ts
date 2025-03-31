import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	token: string;
	username: string;
	role: number;
}

export type { UserState };

// read userState from session storage & avoid of undefined by <userStateString>
const userStateString = '{"token": "", "username": "", "role": -1}';
const initialState: UserState = JSON.parse(
	sessionStorage.getItem('userState') ?? userStateString
);

const userState = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserState: (state, action: PayloadAction<UserState>) => {
			Object.assign(state, action.payload);
			sessionStorage.setItem('userState', JSON.stringify(state));
		},
		clearUserState: (state) => {
			const nullUserState: UserState = {
				token: '',
				username: '',
				role: -1,
			};
			Object.assign(state, nullUserState);
			sessionStorage.setItem('userState', JSON.stringify(nullUserState));
		},
	},
});

export const { setUserState, clearUserState } = userState.actions;

const store = configureStore({
	reducer: userState.reducer,
});

export { store };
