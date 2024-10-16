import { FormEvent, useState } from 'react';
import './Create.css';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

export default function Create() {

  const [title, setTitle] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [cookingTime, setCookingTime] = useState<string>('');
  const [newIngridient, setNewIngridient] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const navigation = useNavigate();
  const { postData } = useFetch('http://localhost:4000/recipes', 'POST');

  return (

      <div className='create-form'>

        <h2>Add a New Recipe</h2>
        <form onSubmit={handleSubmit}>

          <label>
            <span>Recipe Title :</span>
            <input
              type="text"
              onChange={e => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>

          <label>
            <span>Recipe Ingredients :</span>
            <div className='ingridient'>
              <input
                type="text"
                onChange={e => setNewIngridient(e.target.value)}
                value={newIngridient}
              />
              <button type='button' onClick={handleAdd} className='btn'>Add</button>
            </div>
            <ol>
              {ingredients.map(item => <li key={item}>{item}</li>)}
            </ol>
          </label>

          <label>
            <span>Recipe Method :</span>
            <textarea
              onChange={e => setMethod(e.target.value)}
              value={method}
              required
            />
          </label>

          <label>
            <span>Cooking Time :</span>
            <input
              type="text"
              onChange={e => setCookingTime(e.target.value)}
              value={cookingTime}
              required
            />
          </label>
          <button type='submit' className='btn'>Confirm</button>
        </form>
      </div>

  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await postData({ title, ingredients, method, cookingTime: cookingTime + ' minuts' });
      navigation('/');
    } catch (error) {
      console.log("submitting error : ", error);
    }
  }

  function handleAdd() {
    if (newIngridient && !ingredients.includes(newIngridient)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngridient])
    }
    setNewIngridient('')
  }
}
