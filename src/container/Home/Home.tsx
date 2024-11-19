import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { Link } from 'react-router-dom';
import { fetchDeletePizza } from '../../thunk/thunk.ts';

const Home = () => {
  const pizza = useSelector((state: RootState) => state.pizza.crud);
  const dispatch: AppDispatch = useDispatch();

  const deletePizza = async (id: string) =>{
    await dispatch(fetchDeletePizza(id));
    console.log(id);
  }

  return (
    <div>
      {pizza && pizza.length > 0 ? (
        pizza.map((pizza) => (
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
                  <Link to='/edit-pizza' className='text-white text-decoration-none'>
                    Edit
                  </Link>
                </button>
                <button className='btn bg-danger text-white ms-2 mt-3' onClick={() => deletePizza(pizza.id)}>
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

export default Home;