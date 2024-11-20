import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi.ts';

const OrdersPizza = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const fetchData = useCallback(async () => {
    const response = await axiosApi<IOrderApi | null>('oreders.json');
    const orederResponse = response.data

    if(!orederResponse){
      return setOrders([])
    }

    const orderList: IOrder[] = Object.keys(orederResponse).map(orderId =>{
      const order = {...orederResponse[orderId]};

      const total = order.pizza.reduce((acc, pizza) =>{
        acc += pizza.amount + pizza.pizza.price;
        return acc
      }, 0)

      return{
        id: orderId,
        ...order,
        total
      }
    })
    setOrders(orderList.reverse())
  }, []);
   useEffect(() => {
     void fetchData();
   }, [fetchData]);

  return (
    <div>
      {orders.length > 0 ?
        <>
          {orders.map((order) => (
            <div key={order.id}>
              <p><strong>{order.user.name}</strong>: total <strong>{order.total}</strong></p>
            </div>
          ))}
        </>
        :
        <p>No orders yet</p>
      }
    </div>
  );
};

export default OrdersPizza;