import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Root } from 'react-dom/client';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';




const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sort: SortPropertyEnum.RATING_DESC,
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



export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
