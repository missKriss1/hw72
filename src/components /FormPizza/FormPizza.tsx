import { useState } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';
import { fetchAddNewPizza, fetchAllPizza } from '../../thunk/thunk.ts';
import { useNavigate } from 'react-router-dom';

const initialStateByPizza = {
  id: '',
  title: '',
  price: 0,
  image: '',
}

const FormPizza = () => {
  const [newPizza, setNewPizza] = useState<Crud>(initialStateByPizza);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const changepizza = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPizza((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(fetchAddNewPizza(newPizza));
    await dispatch(fetchAllPizza())
    navigate('/')
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
          onChange={changepizza}
        />
        <label className='form-label mt-2'>Pizza prices:</label>
        <input
          className="form-control"
          type='number'
          name='price'
          value={newPizza.price}
          onChange={changepizza}
        />
        <label className='form-label mt-2'>Pizza photo:</label>
        <input
          className="form-control"
          type='text'
          name='image'
          value={newPizza.image}
          onChange={changepizza}
        />
        <button className='btn bg-black text-white mt-3'>Add</button>
      </form>
    </div>
  );
};

export default FormPizza;