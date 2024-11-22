import FormPizza from '../../components/FormPizza/FormPizza.tsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Crud } from '../../types';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchAddNewPizza } from '../../thunk/thunk.ts';
import { useState } from 'react';
import Spinner from '../../components/Ui/Spinner/Spinner.tsx';


const AddNewPizza = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state:RootState) => state.pizza.loading)
  const [loading, setLoading] = useState(false);

  const onSubmit = async (pizza: Crud) =>{
    setLoading(true);
    await dispatch(fetchAddNewPizza(pizza));
    setLoading(false);
    navigate('/admin');
  }

  return (
    <div>
      <h2>Add new pizza</h2>
      {loading ? (
        <Spinner/>
      ):(
        <FormPizza
          isLoading={isLoading}
          onSubmit={onSubmit}
          isEdit={false}/>
      )}
    </div>
  );
};

export default AddNewPizza