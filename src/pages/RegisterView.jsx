import { userStore } from '@/stores/UserStore'
import { generalStore } from '@/stores/generalStore'
import { useState } from 'react'
export const RegisterView = () => {
  const [userName, setuserName] = useState('Nombre de Usuario')
  const [userEmail, setuserEmail] = useState('prod@prod.com')
  const [password, setPassword] = useState('123456789')
  const [errorUser, setErrorUser] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorUserMessage, setErrorUserMessage] = useState('')
  const [errorEmailMessage, setErrorEmailMessage] = useState('')
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('')

  const registerUser = userStore((state) => state.registerUser)
  const updateGeneralLoading = generalStore(
    (state) => state.updateGeneralLoading
  )

  async function handleRegister() {
    updateGeneralLoading(true)
    if (!userName || userName.length < 4) {
      setErrorUserMessage('El nombre de usuario debe tener mas de 4 caracteres')
      setErrorUser(true)
      timeOut()

      return
    }
    if (!userEmail || userEmail.length < 4) {
      setErrorUserMessage('Ingresa un correo válido')
      setErrorEmail(true)
      timeOut()

      return
    }
    if (!password || password.length < 6) {
      setErrorPassword(true)
      errorPasswordMessage('La contraseña debe tener por lo menos 6 caracteres')
      timeOut()

      return
    }
    await registerUser(userName, userEmail, password)
    setTimeout(() => {
      updateGeneralLoading(false)
    }, 1500)
  }
  function timeOut() {
    setTimeout(() => {
      updateGeneralLoading(false)
    }, 1500)
  }
  return (
    <>
      <div className="relative w-full h-full content-center">
        <div className="flex justify-center ">
          <div className="max-w[700px] min-w-[420px] shadow-lg">
            <div className=" bg-slate-200 dark:bg-slate-800 rounded-md ">
              <h1 className="text-center text-2xl bg-blue-600 py-4 uppercase rounded-md">
                Registrar
              </h1>
              <div className="flex flex-col px-10 py-16 gap-4">
                <div>
                  <label
                    htmlFor="user"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre de Usuario
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
                        setErrorUserMessage(
                          'El nombre de usuario debe tener mas de 4 caracteres'
                        )
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
                    htmlFor="user"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={userEmail}
                    required
                    placeholder="Ingresa nombre de usuario o email"
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errorEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    onChange={(ev) => setuserEmail(ev.target.value)}
                    onBlur={() => {
                      if (!userEmail || userEmail.length < 4) {
                        setErrorEmailMessage('Ingresa un correo válido')
                        setErrorEmail(true)
                      }
                    }}
                  />
                  {errorEmail && (
                    <label className="text-red-500">{errorEmailMessage}</label>
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
                      if (!password || password.length < 6) {
                        setErrorPasswordMessage(
                          'La contraseña debe tener por lo menos 6 caracteres'
                        )
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
                  onClick={handleRegister}
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
