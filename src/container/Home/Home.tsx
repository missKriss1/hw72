import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';
import { Link } from 'react-router-dom';

const Home = () => {
  const pizza = useSelector((state: RootState) => state.pizza.crud);

  return (
    <div>
      <nav className="navbar navbar-dark bg-body mb-4 ">
        <div className="container-fluid border-bottom d-flex justify-content-between">
          <Link className="navbar-brand text-black fw-bold fs-2 mt-4" to="/admin">
            Turtle Pizza
          </Link>
        </div>
      </nav>
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