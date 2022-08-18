import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';
import { Sort } from './filterSlice';

export type SearchPizzaParams = {
  sortBy: string; category: string; order: string; search: string;
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params: SearchPizzaParams) => {
  const { sortBy, category, order, search } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://62a7734a97b6156bff8eaea3.mockapi.io/item?${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data as Pizza[];
});

type Pizza = {
  id: string; 
  price: number; 
  title: string; 
  imageUrl: string; 
  sizes: number[]; 
  types: number[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status
}



const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  }
  // extraReducers: {
  //   [fetchPizzas.pending]: (state, action) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectPizzas = (state: RootState) => state.pizzas;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
