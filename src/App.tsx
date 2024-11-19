
import { Route, Routes } from 'react-router-dom';
import Home from './container/Home/Home.tsx';
import AddNewPizza from './container/AddNewPizza/AddNewPizza.tsx';
import TollBar from './components /TollBar/TollBar.tsx';

const App = () => {
  return (
    <div className='container'>
      <header>
        <TollBar/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add-new-pizza' element={<AddNewPizza/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default App
