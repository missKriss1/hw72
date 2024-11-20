import { createSlice } from '@reduxjs/toolkit';
import { fetchAddNewPizza, fetchAllPizza, fetchDeletePizza } from '../thunk/thunk.ts';

interface CrudPizzaState{
  crud: Crud[];
  loading: boolean;
  error: boolean;
}

export const initialState: CrudPizzaState = {
  crud: [],
  loading: false,
  error: false,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPizza.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllPizza.fulfilled, (state, action) => {
        state.loading = false;
        state.crud = action.payload;
      })
      .addCase(fetchAllPizza.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchAddNewPizza.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAddNewPizza.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddNewPizza.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchDeletePizza.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchDeletePizza.fulfilled, (state, action) => {
        state.loading = false;
        state.crud = state.crud.filter(
          (pizza) => pizza.id !== action.payload,
        );
      })
      .addCase(fetchDeletePizza.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
})

export const pizzaReducer = pizzaSlice.reducer;