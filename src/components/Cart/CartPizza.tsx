import { AddPizzaCart, IPizzaApi } from '../../types';
import { useState } from 'react';
import Modal from '../Ui/Modal/Modal.tsx';
import { useDispatch } from 'react-redux';
import { deletePizzaInCart } from '../../store/CartSlice.ts';
import { addNewOrderUser } from '../../thunk/thunkCart.ts';
import { AppDispatch } from '../../app/store.ts';

interface Props {
  order: AddPizzaCart;
  pizzaList: IPizzaApi;
}

const CartPizza: React.FC<Props> = ({ order, pizzaList }) => {
  const [modal, setModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const devilery = 150

  let  total = Object.keys(order).reduce((acc, itemId) => {
    if (order[itemId]) {
     acc +=  Number(pizzaList[itemId].price) * order[itemId];
    }

    return acc;
  }, 0);

  const devilertWithTotal = total + devilery

  return (
    <div>
      <Modal title="Checkout" show={modal} closeModal={() => setModal(false)} defaultModalBtn>
        {Object.keys(pizzaList).map(pizzaId => {
          const pizza = {...pizzaList[pizzaId], id: pizzaId};
          if (order[pizzaId]) {
            return (<div>{pizza.title} x{order[pizzaId]} <button className='btn btn-danger ms-4' onClick={() => dispatch(deletePizzaInCart(pizza))}>X</button></div>)
          }
        })}

        <hr/>

        <div>
          <p>Devilery: <strong>{devilery} som</strong></p>
          <p>Total: <strong>{total} som</strong></p>
          <p>Total with devilery: <strong>{devilertWithTotal} som</strong></p>
        </div>

        <button className="btn btn-primary" onClick={() => dispatch(addNewOrderUser({order: order}))}>Order</button>
      </Modal>
      <div>
        <h4>Order total: <strong>{total} KGS</strong></h4>
        <button className="btn bg-black text-white" onClick={() => setModal(true)}>Checkout</button>
      </div>

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
