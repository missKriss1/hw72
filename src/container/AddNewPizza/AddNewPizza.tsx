import FormPizza from '../../components /FormPizza/FormPizza.tsx';
import { useNavigate } from 'react-router-dom';


const AddNewPizza = () => {
  const navigate = useNavigate();

  const addNewpizza = () =>{
    navigate('/admin');
  }

  return (
    <div>
      <h2>Add new pizza</h2>
      <FormPizza
        onSubmit={addNewpizza}
        pizza={{id: '', title: '', price: 0, image:''}}
        isEdit={false}/>
    </div>
  );
};

export default AddNewPizza