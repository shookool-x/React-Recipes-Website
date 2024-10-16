import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FoodNoId } from '../../models/Interfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import './Recipe.css';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function Recipe() {
  const { id } = useParams();

  const [data, setData] = useState<FoodNoId>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    setIsLoading(true)
    if (!id) {
      return;
    }
    const ref = doc(db, 'recipes', id);

    getDoc(ref)
      .then(doc => {
        if (!doc.exists()) {
          setError('No Item To Show');
          setIsLoading(false);
        } else {
          const food: FoodNoId = {
            title: doc.data().title || '',
            ingredients: doc.data().ingredients || [],
            method: doc.data().method || '',
            cookingTime: doc.data().cookingTime || '',
          }
          setIsLoading(false);
          setData(food)
        }
      })

  }, [id])

  const { theme } = useTheme()
  return (

    <div className='recipes' >
      {error &&
        <p className='error'>{error}</p>}
      {isLoading &&
        <SkeletonTheme
          baseColor={theme === 'dark' ? "#E5D9F2" : "#021526"}
          highlightColor={theme === 'dark' ? "#F5EFFF" : "#03346E"
          }>
          <div className='loaditem'>
            <Skeleton width="30%" height={20} />
            <Skeleton width="10%" height={10} style={{ marginTop: '5px' }} />
            <Skeleton count={10} width="80%" height={3} style={{ marginBlock: '5px' }} />
            <Skeleton width="40%" height={3} style={{ marginBottom: '5px' }} />
          </div >
        </SkeletonTheme>
      }
      {
        !data && !isLoading &&
        <div className='item'>
          <h1>There is No Food!</h1>
        </div>
      }
      {data &&
        <div className='item'>
          <h3>{data.title}</h3>
          <p>{data.cookingTime} to make</p>
          <hr />
          <ol>
            {data.ingredients.map(item => <li key={item}>{item}</li>)}
          </ol>
          <hr />
          <div>{data.method}</div>
        </div>
      }
    </div>

  )
}
