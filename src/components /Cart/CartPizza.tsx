import { PizzaCart } from '../../types';
import { useState } from 'react';
import ModalPizzaCart from '../Ui/ModalPizzaCart/ModalPizzaCart.tsx';

interface Props {
  pizza: PizzaCart[];
}

const CartPizza: React.FC<Props> = ({ pizza }) => {
  const [modal, setModal] = useState(false);

  const total = pizza.reduce((acc, pizzaCart) => {
    acc = acc + pizzaCart.pizza.price * pizzaCart.amount;
    return acc;
  }, 0);

  const openModal = (selectedPizza: PizzaCart) => {
    setModal(true);
  };

  return (
    <div>
      <div>
        <h4>Order total: <strong>{total} KGS</strong></h4>
        <button className="btn bg-black text-white" onClick={() => openModal(pizza[0])}>Checkout</button>
      </div>

      {modal && (
        <ModalPizzaCart
          show={modal}
          closeModal={() => setModal(false)}
          title="Order Details"
          pizza={pizza}
        />
      )}

      <div>
        {total > 0 ? (
          <>
          </>
        ) : (
          <p>Cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default CartPizza;
