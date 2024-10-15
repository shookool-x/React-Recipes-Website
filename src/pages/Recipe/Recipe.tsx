import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { FoodItem } from '../../models/Interfaces';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Recipe.css';
import useTheme from '../../hooks/useTheme';

export default function Recipe() {
  const { id } = useParams();
  const { data, error, isLoading } = useFetch<FoodItem[]>('http://localhost:4000/recipes');
  const fData = data?.filter(item => item.id === id);

  const { theme } = useTheme()
  return (

    <div className='recipes' >
      {error && <p className='error'>{error}</p>}
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
        fData?.length === 0 &&
        <div className='item'>
          <h1>There is No Food!</h1>
        </div>
      }
      {fData?.[0] &&
        <div className='item'>
          <h3>{fData[0].title}</h3>
          <p>{fData[0].cookingTime} to make</p>
          <hr />
          <ol>
            {fData[0].ingredients.map(item => <li key={item}>{item}</li>)}
          </ol>
          <hr />
          <div>{fData[0].method}</div>
        </div>
      }
    </div>

  )
}
