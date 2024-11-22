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
  const delivery = 150;

  let  total = Object.keys(order).reduce((acc, itemId) => {
    if (order[itemId]) {
     acc +=  Number(pizzaList[itemId].price) * order[itemId];
    }

    return acc;
  }, 0);

  const totalWithDelivery = total + delivery

  return (
    <div>
      <Modal title="Checkout" show={modal} closeModal={() => setModal(false)} defaultModalBtn>
        {Object.keys(pizzaList).map(pizzaId => {
          const pizza = {...pizzaList[pizzaId], id: pizzaId};
          if (order[pizzaId]) {
            return (<div>{pizza.title} x {order[pizzaId]}
              <button className="btn btn-danger ms-4" onClick={() => dispatch(deletePizzaInCart(pizza))}>X</button>
            </div>)
          }
        })}
        <hr/>
        <div>
          <p>Total: <strong>{total} KGS</strong></p>
          <p>Delivery: <strong>{delivery} KGS</strong></p>
          <p>Order total: <strong>{totalWithDelivery} KGS</strong></p>
        </div>
        <button className="btn bg-dark text-white" onClick={() => dispatch(addNewOrderUser({order: order}))}>Order
        </button>
      </Modal>
    </div>
  );
};

export default CartPizza;
