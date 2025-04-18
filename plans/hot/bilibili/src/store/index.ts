import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
	token: string;
	username: string;
	avatar: string;
	coin: number;
	bCoin: number;
}

const initialState: UserInfo = getLocalUserInfo();

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state: UserInfo, action: PayloadAction<UserInfo>): UserInfo => {
			saveLocalUserInfo(action.payload);
			return { ...state, ...action.payload };
		},
		logout: (state: UserInfo) => {
			const initUserInfo: UserInfo = {
				token: '',
				username: '',
				avatar: '',
				coin: -1,
				bCoin: -1,
			};
			saveLocalUserInfo(initUserInfo);
			return { ...state, ...initUserInfo };
		},
	},
});

export const { login, logout } = userSlice.actions;

const store = configureStore({
	reducer: userSlice.reducer,
});

export default store;

function getLocalUserInfo(): UserInfo {
	const persistantUserInfo = localStorage.getItem('persistantUserInfo');
	if (persistantUserInfo) return JSON.parse(persistantUserInfo);
	return {
		token: '',
		username: '',
		avatar: '',
		coin: -1,
		bCoin: -1,
	};
}

function saveLocalUserInfo(payload: UserInfo): boolean {
	const persistantUserInfo = JSON.stringify(payload);
	try {
		localStorage.setItem('persistantUserInfo', persistantUserInfo);
		return true;
	} catch {
		return false;
	}
}
