import './Home.css';
import SkeletLoding from '../../components/SkeletLoding';
import { FoodItem } from '../../models/Interfaces';
import RecipeList from '../../components/RecipeList';
import { useEffect, useState } from 'react';

import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';



export default function Home() {

  const [data, setData] = useState<FoodItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    setIsLoading(true)

    const ref = collection(db, 'recipes');
    getDocs(ref)
      .then((snapshot) => {
        if (snapshot.empty) {
          setError('No Item To Show');
          setIsLoading(false);
        } else {

          const result: FoodItem[] = [];

          snapshot.docs.forEach(doc => {
            const fooditem: FoodItem = {
              id: doc.id,
              title: doc.data().title || '',
              ingredients: doc.data().ingredients || [],
              method: doc.data().method || '',
              cookingTime: doc.data().cookingTime || '',
            }
            result.push(fooditem);
          })
          setData(result);
          setIsLoading(false);
        }

      })
  
  }, [])


  return (

    <div className='home'>

      {error && <p className='error'>{error}</p>}
      {isLoading && <SkeletLoding />}
      {data && <RecipeList data={data} />}

    </div>

  )
}
