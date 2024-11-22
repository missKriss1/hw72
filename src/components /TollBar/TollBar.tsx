import { Link } from 'react-router-dom';

const TollBar = () => {
  return (
    <div>
      <div>
        <nav className="navbar navbar-dark bg-white mt-4 ">
          <div className="container-fluid d-flex justify-content-between">
            <div>
              <Link to="/admin" className="navbar-brand text-black fw-bold fs-2">
                Turtle Pizza Admin
              </Link>
            </div>
            <div>
              <button className=" btn">
                <Link
                  to="/"
                  className="navbar-brand text-black fw-bold"
                >
                  Dishes
                </Link>
              </button>
              <button className=" btn">
                <Link
                  to="/admin/orders"
                  className="navbar-brand text-black fw-bold"
                >
                  Order
                </Link>
              </button>
            </div>
          </div>
        </nav>
        <hr/>
        <div className='d-flex justify-content-between'>
          <div >
            <h2>Pizzas</h2>
          </div>
          <div>
            <button className=" btn bg-black">
              <Link to='add-new-pizza' className='text-decoration-none text-white'>
                Add new Pizza
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TollBar;