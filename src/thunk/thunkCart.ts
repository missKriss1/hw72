import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import { AddPizzaCart, IOrdersArray } from '../types';
import { RootState } from '../app/store.ts';

export const fetchAllOrdersUser = createAsyncThunk< IOrdersArray[] | null, void, {state: RootState}>('cart/fetchAllOrdersUser', async (_arg, thunkAPI) =>{
  const response = await axiosApi('cart.json');
  const orders = response.data

  const pizzas = thunkAPI.getState().pizza.crud;

  if (pizzas && orders) {
    const ordersArray = Object.keys(orders).map(orderId => {
      const orderValue = {...orders[orderId]};
      const ordersDetailsOnArray = Object.keys(orderValue).map(dishId => {

        return {dish: pizzas[dishId], amount: orderValue[dishId]};
      });

      return {order: ordersDetailsOnArray, order_id: orderId, total: 0};
    });

    ordersArray.map(order => {
      order.total = order.order.reduce((acc,dish) => {
        acc += dish.amount * dish.dish.price;
        return acc;
      }, 0);
    });
    return ordersArray;
  }

  return null;
})

export const addNewOrderUser = createAsyncThunk<void, { order: AddPizzaCart}>('cart/addNewOrderUser', async ({ order }) =>{
  await  axiosApi.post('cart.json', order);
})

export const deleteDish = createAsyncThunk<void, string>(
  'cart/deleteDish',
  async (dishId) => {
    await axiosApi.delete('/cart/' + dishId + '.json');
  },
);