import React, { useState } from 'react';
import Backdrop from '../BackDrop/BackDrop.tsx';
import { IUserOrder, PizzaCart } from '../../../types';
import CartItem from '../../Cart/CartItem.tsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store.ts';
import axiosApi from '../../../axiosApi.ts';
import { clearCart } from '../../../store/CartSlice.ts';

interface Props {
  show: boolean;
  title: string;
  closeModal: () => void;
  pizza: PizzaCart [];
}

const ModalPizzaCart: React.FC<Props> = ({ show, title, pizza, closeModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const initialStateByPizza = {
    name: '',
    address: '',
    phone: '',
  };

  const [formOrder, setFormOrder] = useState<IUserOrder>(initialStateByPizza);

  const changeUserOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormOrder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formOrderUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if(formOrder.name.trim() && formOrder.phone.trim() && formOrder.address.trim()){
      const fomatPizza = pizza.reduce<{[id: string]: number}>((acc, pizzaCart) => {
        const pizzaId = pizzaCart.pizza.id;
        const amount = pizzaCart.amount;
        if(pizzaId){
          acc[pizzaId] = amount;
        }
        return acc;
      }, {});
      try {
        await axiosApi.post('cart.json', fomatPizza);
        dispatch(clearCart());
        setFormOrder(initialStateByPizza);
        closeModal();
        navigate('/admin/orders');
      } catch (error) {
        console.error( error);
      }
    }else{
      alert('Fill in the blanks')
    }

  };
  const delivery = 150;

  const total = pizza.reduce((acc, pizzaCart) => {
    if (pizzaCart.pizza && pizzaCart.amount) {
      acc += pizzaCart.pizza.price * pizzaCart.amount;
    }
    return acc;
  }, 0);

  const totalWithDelivery = total + delivery;

  if (!pizza || pizza.length === 0) {
    return null;
  }

  let cartList = (
    <div className="alert alert-primary" role="alert">
      <h6 className="text-center my-4">No dish yet. Add something ...</h6>
    </div>
  );

  if (pizza.length > 0) {
    cartList = (
      <div>
        {pizza.map((pizzaCart) => (
          <CartItem key={pizzaCart.pizza.id} pizzaCart={pizzaCart} />
        ))}
        <hr />
      </div>
    );
  }

  return (
    <div>
      <Backdrop show={show} onClick={closeModal} />
      <div
        className="modal show"
        style={{
          display: show ? 'block' : 'none',
          width: '500px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
            </div>
            <div className="p-2">
              {cartList}
              <h4>To place an order</h4>
              <div>
                <form onSubmit={formOrderUser} className="form-control">
                  <label className="form-label mt-2">Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={formOrder.name}
                    onChange={changeUserOrder}
                  />
                  <label className="form-label mt-2">Address:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    value={formOrder.address}
                    onChange={changeUserOrder}
                  />
                  <label className="form-label mt-2">Phone:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="phone"
                    value={formOrder.phone}
                    onChange={changeUserOrder}
                  />
                  <div>
                    <p>Delivery: <strong>{delivery} KGS</strong></p>
                    <strong>Total: {totalWithDelivery} KGS</strong>
                  </div>
                  <div className="modal-footer">
                    <button className="btn bg-black text-white" onClick={closeModal}>
                      Cancel
                    </button>
                    <button
                      className="btn bg-black text-white"
                      type="submit"
                    >
                      Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPizzaCart;
