import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import { AllOrder, IUserOreder, Order, PizzaCart } from '../types';

export const fetchAllOrdersUser = createAsyncThunk< AllOrder[]>('cart/fetchAllOrdersUser', async () =>{
  const response = await axiosApi('cart.json');
  const pizzaData = response.data
  if (pizzaData){
    const pizzaInFormat = Object.keys(pizzaData).map((pizzaID) =>({
      ...pizzaData[pizzaID],
      id: pizzaID
    }))
    pizzaInFormat.reverse();
    return pizzaInFormat;
  }
  return [];
})

export const addNewOrderUser = createAsyncThunk('cart/addNewOrderUser', async (orderData: { user: IUserOreder; pizzas: PizzaCart[] }) =>{
  const response =await  axiosApi.post('cart.json', orderData);
  return response.data;
})

export const deleteDish = createAsyncThunk<void, string>(
  'cart/deleteDish',
  async (dishId) => {
    await axiosApi.delete('/cart/' + dishId + '.json');
  },
);