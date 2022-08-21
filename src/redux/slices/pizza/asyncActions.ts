import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params: SearchPizzaParams) => {
  const { sortBy, category, order, search } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://62a7734a97b6156bff8eaea3.mockapi.io/item?${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data as Pizza[];
});