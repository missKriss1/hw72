import { IOrder, IOrderAPI, Crud } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi.ts';

const OrdersPizza = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const delivery = 150;

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axiosApi('cart.json');
      const orderRes: IOrderAPI = response.data;
      console.log(orderRes);

      if (!orderRes) {
        return setOrders([]);
      }

      const orderList = Object.keys(orderRes).map((orderId) => {
        const orderItems = orderRes[orderId];

        const pizzas = orderItems.pizzas.map((piz) => {
          const pizzaData: Crud = piz.pizza;
          const amount = piz.amount || 1;

          return {
            pizza: pizzaData,
            amount,
          };
        });

        const orderTotal = pizzas.reduce((total, pizzaCart) => {
          return total + pizzaCart.pizza.price * pizzaCart.amount;
        }, 0);
        const totalForOrder = orderTotal + delivery;

        return {
          id: orderId,
          user: orderItems.user,
          pizzas: pizzas,
          totalPrice: totalForOrder,
        };
      });

      setOrders(orderList);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteOrder = async (orderId: string) => {
    try {
      await axiosApi.delete(`cart/${orderId}.json`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId)); // Remove the deleted order
    } catch (error) {
      console.error(error);
    }
  };

  useEffect( () => {
    void fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="mt-4">
      <h2 className="mb-4">Order</h2>
      {orders.length > 0 ? (
        <>
          {orders.map((order) => {
            return (
              <div key={order.id}>
                <h4>Order for user name: {order.user.name}</h4>
                <ul>
                  {order.pizzas.length > 0 ? (
                    order.pizzas.map((pizzaCart, index) => (
                      <li key={index} className="d-flex align-items-center">
                        <img
                          src={pizzaCart.pizza.image}
                          alt={pizzaCart.pizza.title}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            marginRight: '10px',
                          }}
                        />
                        <strong>{pizzaCart.pizza.title}</strong>: {pizzaCart.amount} x {pizzaCart.pizza.price} KGS
                        <span style={{ marginLeft: '10px' }}>Total: {pizzaCart.pizza.price * pizzaCart.amount} KGS</span>
                      </li>
                    ))
                  ) : (
                    <li>No Orders</li>
                  )}
                </ul>
                <p>Доставка: <strong>{delivery} </strong></p>
                <p>Общая стоимость: <strong>{order.totalPrice} сом</strong></p>
                <button className="btn bg-black text-white" onClick={() => deleteOrder(order.id)}>
                  Оформить заказ
                </button>
                <hr />
              </div>
            );
          })}
        </>
      ) : (
        <p>No orders</p>
      )}
    </div>
  );
};

export default OrdersPizza;
