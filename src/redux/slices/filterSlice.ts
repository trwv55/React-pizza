import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Root } from 'react-dom/client';
import { RootState } from '../store';


export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC =  '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC =  '-title',
  PRICE_DESC = 'price',
  PRICE_ASC =  '-price',
}

export type Sort = {
    name: string;
    sort: SortPropertyEnum;
}

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
}

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

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
