import React from 'react';
import { Link } from 'react-router-dom';
import { RecipeListProps } from '../models/Interfaces';
import './RecipeList.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';



export default function RecipeList({ data }: RecipeListProps) {
  return (
    <React.Fragment>
      {
        data.map(recipe => (
          <div key={recipe.id} className='recipe-item'>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make</p>
            <div>{recipe.method.slice(0, 100)}...</div>
            <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
            <img
              className='ashghali'
              onClick={() => { handleDelete(recipe.id) }}
              src="/trash-recycle-bin-svgrepo-com.svg"
              alt="no-img" />
          </div>
        ))
      }
    </React.Fragment>
  )

  async function handleDelete(id: string) {
    try {
      const ref = doc(db, 'recipes', id);
      await deleteDoc(ref);
    } catch (error) {
      console.log(error);
    }
  }
}
