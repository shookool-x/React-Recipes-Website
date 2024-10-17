import './Home.css';
import SkeletLoding from '../../components/SkeletLoding';
import RecipeList from '../../components/RecipeList';

import { useCollection } from '../../hooks/useCollection';



export default function Home() {

  const { collectionData: data, isLoading, error } = useCollection('recipes')

  return (

    <div className='home'>

      {error && <p className='error'>{error}</p>}
      {isLoading && <SkeletLoding />}
      {data && <RecipeList data={data} />}

    </div>

  )
}
