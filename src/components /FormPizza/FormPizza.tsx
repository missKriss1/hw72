import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';
import { fetchAddNewPizza, fetchAllPizza, fetchEditPizza } from '../../thunk/thunk.ts';
import { useNavigate } from 'react-router-dom';

interface Props{
  onSubmit:(pizza: Crud) => void;
  isEdit: boolean;
  pizza: Crud | null;
}


const FormPizza: React.FC <Props> = ({onSubmit, isEdit, pizza}) => {
  const initialStateByPizza ={
    id: pizza?.id || '',
    title: pizza?.title || '',
    price: pizza?.price || 0,
    image: pizza?.image || ''
  }
  const [newPizza, setNewPizza] = useState<Crud>(initialStateByPizza);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() =>{
    if(isEdit && pizza){
      setNewPizza(pizza);
    }
  }, [isEdit, pizza]);

  const changePizza = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPizza((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if(isEdit){
      await dispatch(fetchEditPizza({ id: newPizza.id, pizza: newPizza }))
    }else{
      await dispatch(fetchAddNewPizza(newPizza));
    }
    await dispatch(fetchAllPizza())
    navigate('/')
    onSubmit(newPizza)

  }
  return (
    <div>
      <form className="form w-50" onSubmit={onSubmitForm}>
        <label className='form-label mt-2'>Pizza name:</label>
        <input
          className="form-control"
          type='text'
          name='title'
          value={newPizza.title}
          onChange={changePizza}
        />
        <label className='form-label mt-2'>Pizza prices:</label>
        <input
          className="form-control"
          type='number'
          name='price'
          value={newPizza.price}
          onChange={changePizza}
        />
        <label className='form-label mt-2'>Pizza photo:</label>
        <input
          className="form-control"
          type='text'
          name='image'
          value={newPizza.image}
          onChange={changePizza}
        />
        <button className='btn bg-black text-white mt-3'>
          {isEdit ? "Edit contact" : "Add contact"}
        </button>
      </form>
    </div>
  );
};

export default FormPizza;