import { create } from 'zustand'
import axios from 'axios'
import { ServerError } from '@/utils/errors.js'
import { persist } from 'zustand/middleware'
export const userStore = create(
  // persist(
  (set, get) => ({
    userData: {
      user: null,
      area: null,
    },
    IP: null,
    city: null,
    country: null,
    AuthToken: null,
    AUTH: false,
    login: async (email, password) => {
      const { IP, city, country } = get()
      const dataToSend = new FormData()
      dataToSend.append('identifier', email)
      dataToSend.append('password', password)
      dataToSend.append('ip_value', IP)
      dataToSend.append('city', city)
      dataToSend.append('country', country)

      try {
        const { data } = await axios.post('auth/login', dataToSend)
        if (!data.status) {
          throw new ServerError(data.message)
        }

        localStorage.setItem(
          'logedUser',
          JSON.stringify({
            user: data.data.user,
            area: data.data.area,
            token: data.token,
          })
        )

        set({
          AuthToken: {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          },
          AUTH: true,
        })
        set((state) => ({
          userData: {
            ...state.userData,
            user: data.data.user,
            area: data.data.area,
          },
        }))
      } catch (error) {
        console.error('Error during login:', error)
      }
    },
    registerUser: async (userName, email, password, area) => {
      const dataToSend = new FormData()
      dataToSend.append('name', userName)
      dataToSend.append('email', email)
      dataToSend.append('password', password)
      dataToSend.append('area', area)

      try {
        const { data } = await axios.post('auth/register', dataToSend)
        if (!data.status) {
          throw new ServerError(data.message)
        }
      } catch (error) {
        console.error('Error during register:', error)
      }
    },
    validateSession: () => {
      const dataUser = JSON.parse(localStorage.getItem('logedUser'))
      if (dataUser) {
        set({
          userData: {
            user: dataUser.user,
            area: dataUser.area,
          },
          AuthToken: {
            headers: {
              Authorization: `Bearer ${dataUser.token}`,
            },
          },
          AUTH: true,
        })
      } else {
        set({
          AUTH: false,
        })
      }
    },
    getIP: async () => {
      console.log('obtenemos ip?')
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        set({
          IP: data.ip,
          city: data.city,
          country: data.country_name,
        })
      } catch (error) {
        console.error('Error while getting IP:', error)
      }
    },
  })
  // ),
  //   {
  //     name: 'userStore',
  //   }
)
