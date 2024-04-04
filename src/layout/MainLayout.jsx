import { NavBar } from './NavBar'
import { Footer } from './Footer'
export const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="p-5 bg-white dark:bg-black h-dvh ">{children}</main>
      <Footer />
    </>
  )
}
