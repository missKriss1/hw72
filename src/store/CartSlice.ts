import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Crud, PizzaCart } from '../types';

interface CartState {
 orders: PizzaCart [];
}

const initialState: CartState = {
 orders: [],
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
    }
  }
})

export  const {addPizzaToOrder} = cartSlice.actions;

export const cartReduser = cartSlice.reducer
