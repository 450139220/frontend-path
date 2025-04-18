import { createSlice, configureStore } from '@reduxjs/toolkit';

interface UserInfo {
	token: string;
	username: string;
	avatar: string;
	coin: number;
	bCoin: number;
}

const initialState: UserInfo = {
	token: getLocalStorageItem('token', ''),
	username: getLocalStorageItem('username', ''),
	avatar: getLocalStorageItem('avatar', ''),
	coin: getLocalStorageItem('coin', -1),
	bCoin: getLocalStorageItem('bCoin', -1),
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

function getLocalStorageItem<T>(key: keyof UserInfo, defaultValue: T): T {
	const storedValue = localStorage.getItem(key);
	if (storedValue === null) return defaultValue;

	if (key === 'coin' || key === 'bCoin') return Number(storedValue) as T;

	return storedValue as T;
}
