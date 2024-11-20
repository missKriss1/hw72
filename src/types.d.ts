interface Crud{
  id: string;
  title: string;
  price: number;
  image: string;
}

interface ICrudMutation {
  title: string;
  price: string;
  image: string;
}

export interface PizzaCart {
  pizza: Crud;
  amount: number;
}

export type ApiCrud = Omit<Crud, 'id'>

export interface ApiCrudes{
  [id:string]: ApiCrud;
}

interface IUser{
  name: string;
  address: string;
  phone: string;
}

interface IOrderMutation{
  user: IUser;
  pizza: CratCurd[],
}

interface OrderPizza{
  pizza: Crud;
  amount: number;
}

export interface AllOrder{
  id: string;
  orders: OrderPizza[]
}

