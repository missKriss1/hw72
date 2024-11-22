interface Crud {
  title: string;
  price: number;
  image: string;
}

interface IPizzas  extends Crud{
  id: string;
}

interface IPizzaApi {
  [id: string]: Crud
}

export interface PizzaCart {
  pizza: Crud;
  amount: number;
}

export interface AddPizzaCart {
  [id: string]: number;
}


export interface IOrderApi {
  [id: string]: AddPizzaCart
}

export interface IOrdersArray {
  order: {
    dish: Crud,
    amount: number
  }[]
  order_id: string;
  total: number;
}