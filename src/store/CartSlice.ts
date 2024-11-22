import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddPizzaCart, IOrdersArray, IPizzas, } from '../types';
import { addNewOrderUser, fetchAllOrdersUser } from '../thunk/thunkCart.ts';

interface CartState {
 orders: IOrdersArray[] | null;
 orderCart: AddPizzaCart;
 loading: boolean;
 error: boolean
}

const initialState: CartState = {
 orders: null,
  orderCart: {},
  loading: false,
  error: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaToOrder: (state, action: PayloadAction<IPizzas>) =>{
      const pizzaToAdd = action.payload;

      if(state.orderCart[pizzaToAdd.id]) {
        state.orderCart[pizzaToAdd.id]++
      } else {
        state.orderCart[pizzaToAdd.id] = 1;
      }
    },
    deletePizzaInCart: (state, action: PayloadAction<IPizzas>) => {
      const pizzaToDelete = action.payload;
      if (state.orderCart[pizzaToDelete.id] > 0) {
        state.orderCart[pizzaToDelete.id]--;
      } else {
        delete  state.orderCart[pizzaToDelete.id];
      }
    },
    clearCart: (state) => {
      state.orderCart = {};
    },
  },
  extraReducers: (builder) =>{
    builder
      .addCase(fetchAllOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.orders = null
      })
      .addCase(fetchAllOrdersUser.fulfilled, (state, action: PayloadAction<IOrdersArray[] | null>,) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrdersUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addNewOrderUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addNewOrderUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewOrderUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
})

export  const {addPizzaToOrder, deletePizzaInCart, clearCart} = cartSlice.actions;

export const cartReduser = cartSlice.reducer
