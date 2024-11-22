import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAddNewPizza, fetchAllPizza, fetchDeletePizza, getPizzaById } from '../thunk/thunk.ts';
import { Crud, IPizzaApi } from '../types';

interface CrudPizzaState{
  crud: IPizzaApi;
  onePizza: Crud | null;
  loading: boolean;
  error: boolean;
}

export const initialState: CrudPizzaState = {
  crud: {},
  onePizza: null,
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
      .addCase(fetchDeletePizza.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchDeletePizza.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getPizzaById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.onePizza = null;
      })
      .addCase(getPizzaById.fulfilled, (state, action: PayloadAction<Crud | null>) => {
        state.loading = false;
        state.onePizza = action.payload
      })
      .addCase(getPizzaById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
})



export const pizzaReducer = pizzaSlice.reducer;