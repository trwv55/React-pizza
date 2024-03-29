import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './slices/filter/slice'
import cart from '../redux/slices/cart/slice';
import pizzas from './slices/pizza/slice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch