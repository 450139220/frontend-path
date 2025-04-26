import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserStates {
  token: string;
  userData: {
    username?: string;
    role?: string;
  };
}

const initialState: UserStates = {
  token: localStorage.getItem('token') ?? '',
  userData: JSON.parse(localStorage.getItem('userData') ?? '{}'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, { payload }: PayloadAction<UserStates>) => {
      state.token = payload.token;
      state.userData = payload.userData;

      localStorage.setItem('token', payload.token);
      localStorage.setItem('userData', JSON.stringify(payload.userData));
    },
    signOut: (state) => {
      state.token = '';
      state.userData = {};

      localStorage.setItem('token', '');
      localStorage.setItem('userData', '{}');
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
