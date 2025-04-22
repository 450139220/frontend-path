import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counter';
import { useSelector, useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch: () => AppDispatch = useDispatch;
export { shallowEqual } from 'react-redux';

export default store;
