import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEditPizza, getPizzaById } from '../../thunk/thunk.ts';
import { toast } from 'react-toastify';
import FormPizza from '../../components/FormPizza/FormPizza.tsx';
import { Crud } from '../../types';
import Spinner from '../../components/Ui/Spinner/Spinner.tsx';

const EditPizza = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const editPizza = useSelector((state: RootState) => state.pizza.onePizza);
  const isLoading = useSelector((state:RootState) => state.pizza.loading)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
       dispatch(getPizzaById(id));
    }
  }, [id, dispatch]);

  const edit = async (pizza: Crud) => {
    if (id) {
      setLoading(true);
      await dispatch(fetchEditPizza({id, pizza}));
      setLoading(false);
      toast.success("Pizza updated successfully!");
      navigate('/admin');
    }
  };


  return (
    <div>
      <h2>Edit Pizza</h2>
      {loading ?(
        <Spinner/>
      ):(
        <>
          {editPizza ?
            <FormPizza onSubmit={edit} isEdit={true} pizza={editPizza} isLoading={isLoading}/> : null
          }
        </>
      )}

    </div>
  );
};

export default EditPizza;
