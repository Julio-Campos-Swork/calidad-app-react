import { useState } from 'react'
import { userStore } from '@/stores/UserStore'
import { useNavigate } from 'react-router-dom'
import { generalStore } from '@/stores/generalStore'
export const LoginView = () => {
  const updateGeneralLoading = generalStore(
    (state) => state.updateGeneralLoading
  )
  const navigate = useNavigate()

  const [userName, setuserName] = useState('prod@prod.com')
  const [password, setPassword] = useState('123456789')
  const [errorUser, setErrorUser] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorUserMessage, setErrorUserMessage] = useState('')
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('')

  const loginFromStore = userStore((state) => state.login)
  const getIpValue = userStore((state) => state.getIP)

  async function handleLogin() {
    updateGeneralLoading(true)
    setErrorUserMessage('')
    setErrorPasswordMessage('')
    // verificar usuario
    if (!userName || userName.length < 4) {
      setErrorUserMessage('Usuario invalido')
      setErrorUser(true)
      updateGeneralLoading(false)

      return
    }
    if (!password || password.length < 4) {
      setErrorPassword(true)
      errorPasswordMessage('Contraseña Corta')
      updateGeneralLoading(false)

      return
    }
    await getIpValue()
    await loginFromStore(userName, password, navigate)
    setTimeout(() => {
      updateGeneralLoading(false)
    }, 1000)
  }

  return (
    <>
      <div className="relative w-full h-full content-center">
        <div className="flex justify-center ">
          <div className="max-w[700px] min-w-[420px] shadow-lg">
            <div className=" bg-slate-200 dark:bg-slate-800 rounded-md ">
              <h1 className="text-center text-2xl bg-blue-600 py-4 uppercase rounded-md">
                Login
              </h1>
              <div className="flex flex-col px-10 py-16 gap-4">
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
                    required
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
                    required
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
                    <label className="text-red-500">
                      {errorPasswordMessage}
                    </label>
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
        </div>
      </div>
    </>
  )
}
