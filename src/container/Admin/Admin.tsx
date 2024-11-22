import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchAllPizza, fetchDeletePizza } from '../../thunk/thunk.ts';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPizzaApi, IPizzas } from '../../types';
import ButtonSpinner from '../../components/Ui/ButtonSpinner/ButtonSpinner.tsx';



const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pizza = useSelector((state: RootState) => state.pizza.crud);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() =>{
    setIsLoading(true)
    dispatch(fetchAllPizza())
    setIsLoading(false)
  }, [dispatch])

  const deletePizza = async (id: string) =>{
    await dispatch(fetchDeletePizza(id));
  };

  const makePizzaObjectToArray = (pizzaObj: IPizzaApi): IPizzas[] => {
    if (pizzaObj) {
      const pizzaInFormat = Object.keys(pizzaObj).map((pizzaID) =>({
        ...pizzaObj[pizzaID],
        id: pizzaID
      }))
      pizzaInFormat.reverse();
      return pizzaInFormat;
    } else {
      return [];
    }
  };

  return (
    <div>
      {pizza && makePizzaObjectToArray(pizza).length > 0 ? (
        makePizzaObjectToArray(pizza).map((pizza) => (
          <div key={pizza.id}>
            <div className="row border border-dark mt-3 w-50 p-3">
              <div className="col-3">
                <img
                  className="w-75"
                  src={pizza.image}
                  alt={pizza.title}
                />
              </div>
              <div className="col-3">
                <h3 className="mt-4">{pizza.title}</h3>
                <p>Price: <strong>{pizza.price} KGS</strong></p>
              </div>
              <div className='col-4 mt-4 ms-4'>
                <button className="btn bg-black mt-3">
                  <Link to={`/edit-pizza/${pizza.id}`} className='text-white text-decoration-none'>
                    Edit
                  </Link>
                </button>
                <button className='btn bg-danger text-white ms-2 mt-3' onClick={() => deletePizza(pizza.id)}>
                  {isLoading ? <ButtonSpinner/> : null}
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No pizza</p>
      )}
    </div>
  );
};

export default Admin;