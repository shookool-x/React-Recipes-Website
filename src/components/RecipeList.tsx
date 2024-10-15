import React from 'react';
import { Link } from 'react-router-dom';
import { RecipeListProps } from '../models/Interfaces';
import './RecipeList.css';



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
          </div>
        ))
      }
    </React.Fragment>
  )
}
