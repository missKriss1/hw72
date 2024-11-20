
import { Route, Routes, useLocation } from 'react-router-dom';
import AddNewPizza from './container/AddNewPizza/AddNewPizza.tsx';
import TollBar from './components /TollBar/TollBar.tsx';
import EditPizza from './container/EditPizza/EditPizza.tsx';
import Admin from './container/Admin/Admin.tsx';
import Home from './container/Home/Home.tsx';

const App = () => {
  const { pathname } = useLocation();

  return (
    <div className='container'>
      <header>
        {pathname === '/'? <></> : <TollBar/>}
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/add-new-pizza' element={<AddNewPizza/>}/>
          <Route path='/edit-pizza/:id' element={<EditPizza/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default App
