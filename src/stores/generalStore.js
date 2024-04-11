import { create } from 'zustand'
import axios from 'axios'
import { ServerError } from '@/utils/errors.js'
import { persist } from 'zustand/middleware'

export const generalStore = create(
  // persist(
  (set, get) => ({
    generalLoading: false,
    notificationIsOpen: false,
    notificationMessage: '',
    notificationColor: 'green',
    notificationIcon: '',
    showNotification: (message, color = 'green') => {
      set({
        notificationIsOpen: true,
        notificationMessage: message,
        notificationColor: color,
      })
    },
    hideNotification: () => {
      set({
        notificationIsOpen: false,
        notificationMessage: '',
        notificationColor: 'green',
      })
    },
    updateGeneralLoading: (value = false) => {
      set({ generalLoading: value })
    },
  })
  //   { name: 'generalStore' }
  // )
)
