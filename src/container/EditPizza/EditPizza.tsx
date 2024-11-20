import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEditPizza, getPizzaById } from '../../thunk/thunk.ts';
import { toast } from 'react-toastify';
import FormPizza from '../../components /FormPizza/FormPizza.tsx';

const EditPizza = () => {
  const pizzas = useSelector((state: RootState) => state.pizza.crud)
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
 const [editPizza, setEditPizza] = useState<Crud | null>(null);

  const getOnePizzaById = useCallback(async () => {
    if (id) {
      dispatch(getPizzaById(id));
      const pizza = pizzas.find((pizza) => pizza.id === id);
      setEditPizza(pizza || null);
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getOnePizzaById();
  }, [getOnePizzaById]);

  const edit = async (pizza: Crud) => {
    if (id) {
      await dispatch(fetchEditPizza({id, pizza}));
      toast.success("Pizza updated successfully!");
      navigate('/admin');
      console.log(pizza);
    }
    console.log(pizza);
  };

  if(!editPizza) return null;

  return (
    <div>
      <h2>Edit Pizza</h2>
      <FormPizza onSubmit={edit} isEdit={true} pizza={editPizza} />
    </div>
  );
};

export default EditPizza;
