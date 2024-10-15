import './Home.css';
import useFetch from '../../hooks/useFetch';
import SkeletLoding from '../../components/SkeletLoding';
import { FoodItem } from '../../models/Interfaces';
import RecipeList from '../../components/RecipeList';



export default function Home() {

  const { data, error, isLoading } = useFetch<FoodItem[]>('http://localhost:4000/recipes');
  return (

    <div className='home'>

      {error && <p className='error'>{error}</p>}
      {isLoading && <SkeletLoding />}
      {data && <RecipeList data={data} />}

    </div>

  )
}
