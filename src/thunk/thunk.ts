import axiosApi from '../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllPizza = createAsyncThunk('pizza/fetchAllPizza', async () =>{
  const response = await axiosApi('pizza.json');
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

export const fetchAddNewPizza = createAsyncThunk('pizza/fetchAddNewPizza', async (pizza: Crud) =>{
  const response = await  axiosApi.post('pizza.json', pizza);
  const newPizza = {...pizza, id: response.data.name};
  return newPizza;
})

export const fetchDeletePizza = createAsyncThunk<string, string>('pizza/fetchDeletePizza', async (id: string) =>{
  await axiosApi.delete(`pizza/${id}.json`);
  return id;
})