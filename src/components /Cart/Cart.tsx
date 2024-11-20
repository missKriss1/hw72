import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';
import ModalPizzaCart from '../Ui/ModalPizzaCart/ModalPizzaCart.tsx';
import CartPizza from './CartPizza.tsx';

const Cart = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const cartPizza = useSelector((state: RootState) => state.cart.orders);
  console.log(cartPizza.length);
  console.log(cartPizza);
  return (
    <div>
      <ModalPizzaCart  show={showModal} defaultModalBtn closeModal={() => setShowModal(false)} title="Order">
        <div className="modal-body">
          <p>Do you want to continue to checkout?</p>
        </div>
        <div className="text-end">
          <button className="btn btn-success" onClick={() => navigate('/')}>Cancel</button>
          <button className="btn btn-success" onClick={() => navigate('/')}>Order</button>
        </div>
      </ModalPizzaCart>

      <h4>Cart</h4>
      <CartPizza pizza={cartPizza} />
      {cartPizza && cartPizza.length > 0 ? (
        <div className="text-center">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>Checkout</button>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;