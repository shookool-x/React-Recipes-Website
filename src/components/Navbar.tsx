import { Link } from 'react-router-dom';
import './Navbar.css';
import Searchbar from './Searchbar';
import useTheme from '../hooks/useTheme';
import { useEffect } from 'react';

export default function Navbar() {

  const { position, setPosition, theme, setTheme } = useTheme()

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.remove('dark');
    } else if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  }, [theme])
  return (
    <>
      <div className='navBar'>
        <nav style={{ backgroundPosition: position }}>
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
          <div className="nav-blue" onClick={() => { setPosition('0% 0%') }}></div>
          <div className="nav-pink" onClick={() => { setPosition('0% 50%') }}></div>
          <div className="nav-orange" onClick={() => { setPosition('0% 100%') }}></div>
        </div>

        <div className="set-img">
          <img
            onClick={toggleTheme}
            src="/brightness_medium_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
            alt="no-img" />
        </div>
      </div>
    </>
  )

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }
}
