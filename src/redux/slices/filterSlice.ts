import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Root } from 'react-dom/client';
import { RootState } from '../store';

type Sort = {
    name: string;
    sort: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
}

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sort: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
