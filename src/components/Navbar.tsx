import { Link } from 'react-router-dom';
import './Navbar.css';
import Searchbar from './Searchbar';
import useTheme from '../hooks/useTheme';

export default function Navbar() {

  const { bgColor, changBgNav } = useTheme()
  return (
    <>
      <div className='navBar'>
        <nav style={{ backgroundColor: bgColor }}>
          <Link to='/' className='brand'>
            <img src="/chef.svg" alt="no-img" />
            <h1>Chef Amir</h1>
          </Link>
          <div className="access">
            <Searchbar />
            <Link to='/create' className='create'>Create Recipe</Link>
          </div>

        </nav>
      </div>

      <div className="set-color">
        <div className="nav-color">
          <div className="nav-blue" onClick={() => { changBgNav('#005670') }}></div>
          <div className="nav-pink" onClick={() => { changBgNav('#960057') }}></div>
          <div className="nav-green" onClick={() => { changBgNav('#01584e') }}></div>
        </div>

        <div className="set-img">
          <img src="/brightness.svg" alt="no-img" />
        </div>
      </div>
    </>
  )
}
