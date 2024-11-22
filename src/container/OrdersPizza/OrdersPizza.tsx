
import  { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { deleteDish, fetchAllOrdersUser } from '../../thunk/thunkCart.ts';
import { fetchAllPizza } from '../../thunk/thunk.ts';
import ButtonSpinner from '../../components/Ui/ButtonSpinner/ButtonSpinner.tsx';
import Spinner from '../../components/Ui/Spinner/Spinner.tsx';



const OrdersPizza= () => {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.cart.orders);
  const [loading, setLoading] = useState(false);
  const delivery = 150;

  const getData = useCallback(async () => {
    await dispatch(fetchAllPizza());
    await dispatch(fetchAllOrdersUser());


  }, [dispatch]);

  useEffect( () => {
    void getData()
  }, [getData]);


  const completeOrder = async (id: string) => {
    setLoading(true);
    await dispatch(deleteDish(id));
    setLoading(false);
    await dispatch(fetchAllPizza());
    await dispatch(fetchAllOrdersUser());
  };

    return (
    <div className="mt-4">
      <h2 className="mb-4">Order</h2>
      {loading ?(
        <Spinner/>
      ):(
        <>
          {orders ?
            <>
              {orders.map(order => (
                <div key={order.order_id}>
                  {order.order.map(oneDish => (
                    <div key={oneDish.amount}>
                      {oneDish.dish.title} ({oneDish.dish.price} som) x {oneDish.amount}
                    </div>
                  ))}

                  <p><b> Delivery:</b>  {delivery} SOM</p>
                  <p><b>Total:</b>   {order.total} + {delivery} = {order.total + delivery}</p>

                  <button className="btn bg-dark text-white" onClick={() => completeOrder(order.order_id)}>
                    {loading ? <ButtonSpinner/> : null}
                    Complete
                  </button>
                  <hr/>
                </div>
              ))}
            </>
            : null
          }
        </>
      )}
    </div>
  );
};

export default OrdersPizza;
