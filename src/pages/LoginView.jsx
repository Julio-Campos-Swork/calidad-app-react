import { useState } from 'react'
import { userStore } from '@/stores/UserStore'
export const LoginView = () => {
  const [userName, setuserName] = useState('prod@prod.com')
  const [password, setPassword] = useState('123456789')
  const [errorUser, setErrorUser] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorUserMessage, setErrorUserMessage] = useState('')
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('')

  const loginFromStore = userStore((state) => state.login)

  const getIpValue = userStore((state) => state.getIP)

  async function handleLogin() {
    setErrorUserMessage('')
    setErrorPasswordMessage('')
    // verificar usuario
    if (!userName || userName.length < 4) {
      setErrorUserMessage('Usuario invalido')
      setErrorUser(true)
      return
    }
    if (!password || password.length < 4) {
      setErrorPassword(true)
      errorPasswordMessage('Contraseña Corta')
      return
    }
    await getIpValue()
    await loginFromStore(userName, password)
  }

  return (
    <>
      <div className="flex justify-center content-center">
        <div className="max-w[700px] min-w-[420px]  border border-black/50 dark:border-white/10">
          <h1 className="text-center text-2xl bg-blue-600 py-4 uppercase">
            Login
          </h1>
          <div className="flex flex-col px-16 py-16 gap-4 bg-slate-200 dark:bg-black ">
            <div>
              <label
                htmlFor="user"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Usuario/Email
              </label>
              <input
                id="user"
                type="text"
                value={userName}
                placeholder="Ingresa nombre de usuario o email"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  errorUser ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={(ev) => setuserName(ev.target.value)}
                onBlur={() => {
                  if (!userName || userName.length < 4) {
                    setErrorUserMessage('Usuario inválido')
                    setErrorUser(true)
                  }
                }}
              />
              {errorUser && (
                <label className="text-red-500">{errorUserMessage}</label>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Ingresa tu contraseña"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  errorPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={(ev) => setPassword(ev.target.value)}
                onBlur={() => {
                  if (!password || password.length < 4) {
                    setErrorPasswordMessage('Contraseña corta')
                    setErrorPassword(true)
                  }
                }}
              />
              {errorPassword && (
                <label className="text-red-500">{errorPasswordMessage}</label>
              )}
            </div>
            <button
              className="bg-blue-600 p-2 rounded-md capitalize"
              onClick={handleLogin}
            >
              iniciar sesion
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
