import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { Loader } from '@/components/utils/Loader/Loader'
import { Notifications } from '@/components/utils/Notification/Notification'
export const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="p-5  h-screen ">{children}</main>
      <Footer />
      <Loader />
      <Notifications />
    </>
  )
}
