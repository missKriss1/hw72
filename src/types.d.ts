interface Crud {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface IUserOrder {
  name: string;
  address: string;
  phone: string;
}

export interface IOrderMutation {
  user: IUserOrder;
  pizzas: PizzaCart[];
}

export interface IOrderAPI {
  [id: string]: IOrderMutation;
}
export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
  [id: string]: ApiDish;
}
export interface PizzaCart {
  pizza: Crud;
  amount: number;
}

export interface IOrder extends IOrderMutation {
  id: string;
  totalPrice: number;
  pizza: PizzaCart[];
}
