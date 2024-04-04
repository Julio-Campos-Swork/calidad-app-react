import { useState, useEffect } from 'react'
import sunSVG from '@/assets/sun.svg'
import nightSVG from '@/assets/night.svg'
import hamburger from '@/assets/hamburger.svg'
import { Link } from 'react-router-dom'
export const NavBar = () => {
  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      return localTheme
    }
    return 'dark'
  })

  const [showPanel, setShowPanel] = useState(false)

  function handleShowPanel() {
    setShowPanel(!showPanel)
  }

  useEffect(() => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'dark')
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }
  return (
    <>
      <header>
        <nav className="flex-nowrap relative flex w-full items-center justify-between py-2 shadow-md shadow-black/5 bg-blue-600 dark:shadow-black/10">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <button
              onClick={handleShowPanel}
              className="block border-0 bg-transparent  hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 text-neutral-200 "
              type="button"
              aria-label="Toggle navigation"
            >
              <img width={40} src={hamburger} alt="hamburger" />
            </button>
          </div>

          {theme === 'light' ? (
            <div onClick={handleChangeTheme} className="cursor-pointer p-1">
              <img className=" pr-2" width={40} src={sunSVG} alt="sun" />
              <span className="pr-2 text-sm">Tema</span>
            </div>
          ) : (
            <div onClick={handleChangeTheme} className="cursor-pointer p-1">
              <img className=" pr-2" width={40} src={nightSVG} alt="night" />
              <span className="pr-2 text-sm">Tema</span>
            </div>
          )}
        </nav>
      </header>
      {showPanel && (
        <div className="w-44 bg-slate-300 dark:bg-blue-600/95 h-dvh absolute z-10 top-13 left-0 transition-transform  ease-in-out duration-300">
          <ul className="pl-6 pt-6">
            <li className="py-3 text-black dark:text-white/75 text-lg font-bold">
              <Link to="/">Home</Link>
            </li>
            <li className="py-3 text-black dark:text-white/75 text-lg font-bold">
              <Link to="/login">Login</Link>
            </li>
            <li className="py-3 text-black dark:text-white/75 text-lg font-bold">
              <Link to="/register">Register</Link>
            </li>
            <li className="py-3 text-black dark:text-white/75 text-lg font-bold">
              <Link to="/upload">Upload</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
