import { useState } from 'react';
import * as React from 'react';
import { Crud } from '../../types';
import ButtonSpinner from '../Ui/ButtonSpinner/ButtonSpinner.tsx';

interface Props{
  onSubmit:(pizza: Crud) => void;
  isEdit: boolean;
  pizza?: Crud;
  idPizza?: string | undefined;
  isLoading: boolean
}

const initialStateByPizza ={
  title:'',
  price:  0,
  image:  ''
}


const FormPizza: React.FC <Props> = ({onSubmit, isEdit, pizza=initialStateByPizza, isLoading}) => {
  const [newPizza, setNewPizza] = useState<Crud>(pizza);


  const changePizza = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPizza((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
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
          {isLoading ? <ButtonSpinner/> : null}
          {isEdit ? "Edit" : "Add "}
        </button>
      </form>
    </div>
  );
};

export default FormPizza;