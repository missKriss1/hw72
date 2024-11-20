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

export const getPizzaById = createAsyncThunk<Crud | null, string>('pizza/getPizzaById', async(id: string)=>{
  const response = await axiosApi.get<Crud | null>(`pizza/${id}.json`);
  if(!response.data) return null;
  return response.data || null
})

export const fetchEditPizza = createAsyncThunk<void, {id: string, pizza: Crud}>('pizza/fetchEditPizza', async ({id, pizza}) =>{
  await axiosApi.put(`pizza/${id}.json`, {...pizza});
})

export const fetchDeletePizza = createAsyncThunk<string, string>('pizza/fetchDeletePizza', async (id: string) =>{
  await axiosApi.delete(`pizza/${id}.json`);
  return id;
})