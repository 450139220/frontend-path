import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 1,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add(state) {
      state.count++;
    },
  },
});

export const { add } = counterSlice.actions;
export default counterSlice.reducer;
