import { PizzaCart } from '../../types';
import { useState } from 'react';
import ModalPizzaCart from '../Ui/ModalPizzaCart/ModalPizzaCart.tsx';
import CartItem from './CartItem.tsx';

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

  let cartList = (
    <div className="alert alert-primary" role="alert">
      <h6 className="text-center my-4">No dish yet. Add something ...</h6>
    </div>
  )

  if(pizza.length > 0){
    cartList = (
      <div>
        {pizza.map(pizzaCart => (
          <CartItem key={pizzaCart.pizza.id} pizzaCart={pizzaCart} />
        ))}
        <hr/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h4>Order total: <strong>{total} KGS</strong></h4>
        <button className="btn bg-black text-white" onClick={() => openModal(pizza[0])}>Checkout</button>
      </div>

      {modal && (
        <ModalPizzaCart
          show={modal}
          onClick={() => setModal(false)}
          closeModal={() => setModal(false)}
          title="Order Details"
          pizza={pizza}
        />
      )}

      <div>
        {total > 0 ? (
          <>
            {cartList}
          </>
        ) : (
          <p>Cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default CartPizza;
