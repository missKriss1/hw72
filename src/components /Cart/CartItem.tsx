import React from 'react';
import { PizzaCart } from '../../types';
import { fetchDeletePizza } from '../../thunk/thunk.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';

interface IProps {
  pizzaCart: PizzaCart;
}

const CartItem: React.FC <IProps> = ({pizzaCart}) => {
  const dispatch: AppDispatch = useDispatch();
  const deleteClickOrder = async (id: string) =>{
    console.log(id)
    await dispatch(fetchDeletePizza(id));
  }
  return (
    <div>
      <div className="card mb-3 p-2">
        <div className="row align-items-center justify-content-between">
          <div className="col-3">{pizzaCart.pizza.title}</div>
          <div className="col-3">x{pizzaCart.amount}</div>
          <div className="col-3">{pizzaCart.pizza.price} KGS</div>
          <div className="col-3">
            <button className="btn btn-danger" onClick={() =>deleteClickOrder(pizzaCart.pizza.id)}>x</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;