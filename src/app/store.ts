import { configureStore } from "@reduxjs/toolkit";
import { pizzaReducer } from '../store/PizzaSlice.ts';
import { cartReduser } from '../store/CartSlice.ts';

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    cart: cartReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;