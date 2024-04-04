import { Routes, Route } from 'react-router-dom'
import { HomeView } from '@/pages/HomeView'
import { LoginView } from '@/pages/LoginView'
import { MainLayout } from '@/layout/MainLayout'
import { userStore } from '@/stores/UserStore'
import { useEffect } from 'react'
function App() {
  const validateSesion = userStore((state) => state.validateSession)
  useEffect(() => {
    validateSesion()
  }, [])

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
