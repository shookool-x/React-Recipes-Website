import './Search.css';
import RecipeList from '../../components/RecipeList';
import SkeletLoding from '../../components/SkeletLoding';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

export default function Search() {

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q');

  const url = 'http://localhost:4000/recipes?q=' + query;
  const { data, error, isLoading } = useFetch(url);

  return (
    <>
      <h1 className='title-search'>Recipes Include "{query}"</h1>
      <div className="search">
        {error && <p className='error'>{error}</p>}
        {isLoading && <SkeletLoding />}
        {data && <RecipeList data={data} />}
      </div>
    </>
  )
}
