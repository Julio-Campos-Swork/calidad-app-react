import { Routes, Route } from 'react-router-dom'
import { HomeView } from '@/pages/HomeView'
import { LoginView } from '@/pages/LoginView'
import { RegisterView } from '@/pages/RegisterView'
import { MainLayout } from '@/layout/MainLayout'
import { userStore } from '@/stores/UserStore'
import { useEffect } from 'react'
export default function App() {
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
          <Route path="/register" element={<RegisterView />} />
        </Routes>
      </MainLayout>
    </>
  )
}
