import React from 'react';
import Backdrop from '../BackDrop/BackDrop.tsx';
import { PizzaCart } from '../../../types';
import CartItem from '../../Cart/CartItem.tsx';
import { Link } from 'react-router-dom';

interface Props extends React.PropsWithChildren {
  show: boolean;
  title: string;
  closeModal: () => void;
  defaultModalBtn?: boolean;
  onClick: () => void;
  pizza: PizzaCart[];
}

const ModalPizzaCart: React.FC<Props> = ({ show, title, closeModal, defaultModalBtn, onClick, pizza }) => {

  if (!pizza) {
    return null;
  }

  let cartList = (
    <div className="alert alert-primary" role="alert">
      <h6 className="text-center my-4">No dish yet. Add something ...</h6>
    </div>
  )

  if(pizza.length > 0){
    cartList = (
      <div>
        {pizza.map(pizzaCart => (
          <CartItem key={pizzaCart.pizza.id} pizzaCart={pizzaCart}/>
        ))}
        <hr/>
      </div>
    )
  }

  return (
    <div>
      <Backdrop show={show} onClick={onClick} />
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
            </div>
            <div className="modal-footer">
              <button className='btn bg-black'>
                <Link to='/' className='text-white text-decoration-none'>Cansel</Link>
              </button>
              <button className='btn bg-black'>
                <Link to='/' className='text-white text-decoration-none'>Order</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPizzaCart;
