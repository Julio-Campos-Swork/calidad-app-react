import './NavBar.css'
import { useState, useEffect } from 'react'
import sunSVG from '@/assets/sun.svg'
import nightSVG from '@/assets/night.svg'
import hamburger from '@/assets/hamburger.svg'
import { Link } from 'react-router-dom'
import { userStore } from '@/stores/UserStore'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {
  function handleShowPanel() {
    const panelSide = document.querySelector('.side-bar')
    if (!panelSide.classList.contains('hide')) {
      panelSide.classList.add('hide')
    } else {
      panelSide.classList.remove('hide')
    }
  }
  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      return localTheme
    }
    return 'dark'
  })

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('theme-light')
    } else {
      document.body.classList.remove('theme-light')
    }
    // localStorage.setItem('theme', theme)
    const color = theme === 'light' ? '#070707' : '#efefec'
    const backgroundColor = theme === 'light' ? 'white' : '#15202a'
    document.documentElement.style.setProperty('--color-text', color)
    document.documentElement.style.setProperty(
      '--color-background',
      backgroundColor
    )
  }, [theme])

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const navigate = useNavigate()
  const isAuthenticated = userStore((state) => state.AUTH)
  const logOut = userStore((state) => state.logOut)
  const handleLogOut = () => {
    logOut(navigate)
    handleShowPanel()
  }
  return (
    <>
      <header>
        <nav className="nav-bar">
          <div>
            <button
              onClick={handleShowPanel}
              type="button"
              aria-label="Toggle navigation"
            >
              <img width={40} src={hamburger} alt="hamburger" />
            </button>
          </div>

          {theme === 'light' ? (
            <div onClick={handleChangeTheme} className="change-theme-button">
              <img width={40} src={sunSVG} alt="sun" />
              <span>Dark</span>
            </div>
          ) : (
            <div onClick={handleChangeTheme} className="change-theme-button">
              <img width={40} src={nightSVG} alt="night" />
              <span>Light</span>
            </div>
          )}
        </nav>
      </header>
      <div className="side-bar ">
        <p className="menu-text">Menu</p>
        <ul className="list-align">
          <li className="menu-list-text">
            <Link to="/" onClick={handleShowPanel}>
              Home
            </Link>
          </li>
          <li className="menu-list-text">
            <Link to="/login" onClick={handleShowPanel}>
              Login
            </Link>
          </li>
          <li className="menu-list-text">
            <Link to="/register" onClick={handleShowPanel}>
              Register
            </Link>
          </li>
          <li className="menu-list-text">
            <Link to="/upload" onClick={handleShowPanel}>
              Upload
            </Link>
          </li>
        </ul>
        {isAuthenticated && (
          <div className="button-close-session">
            <button
              onClick={handleLogOut}
              type="button"
              className="button-close-session-style"
            >
              Cerrar Sesion
            </button>
          </div>
        )}
      </div>
    </>
  )
}
