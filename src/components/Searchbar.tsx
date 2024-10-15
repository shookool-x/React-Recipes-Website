import { FormEvent, useState } from 'react'
import './Searchbar.css'
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Search : </span>
          <input
            type="text"
            onChange={e => setTerm(e.target.value)}
            required
          />
        </label>
      </form>
    </div>
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/search?q=${term}`)
  }
}
