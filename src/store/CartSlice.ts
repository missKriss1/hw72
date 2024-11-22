import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Crud, IUserOrder, PizzaCart } from '../types';
import { fetchDeletePizza } from '../thunk/thunk.ts';
import { addNewOrderUser, fetchAllOrdersUser } from '../thunk/thunkCart.ts';

interface CartState {
 orders: PizzaCart [];
 users: IUserOrder []
 loading: boolean;
 error: boolean
}

const initialState: CartState = {
 orders: [],
  users: [],
  loading: false,
  error: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaToOrder: (state, {payload: pizza}: PayloadAction<Crud>) =>{
     let indexPizza = state.orders.findIndex(pizzaCart => pizzaCart.pizza.id === pizza.id);

     if(indexPizza === -1){
       state.orders = [...state.orders,
         {pizza, amount:1}];
     }else{
       const pizzaCopy = [...state.orders];
       const copyPizzaCart = {...pizzaCopy[indexPizza]};
       copyPizzaCart.amount++;
       pizzaCopy[indexPizza] = copyPizzaCart;
       state.orders = [...pizzaCopy];
     }
    },
    deletePizzaInCart: (state, {payload:pizza}: PayloadAction<Crud>) => {
      state.orders = state.orders.filter((pizzaCart) => pizzaCart.pizza.id !== pizza.id);
    },
    clearCart: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) =>{
    builder.
      addCase(fetchDeletePizza.pending, (state) => {
      state.loading = true;
      state.error = false;
       })
      .addCase(fetchDeletePizza.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (pizza) => pizza.pizza.id !== action.payload,
        );
      })
      .addCase(fetchDeletePizza.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchAllOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.flatMap((order) => order.orders);
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
