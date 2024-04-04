import { create } from 'zustand'
import axios from 'axios'
import { ServerError } from '@/utils/errors.js'
import { persist } from 'zustand/middleware'

export const generalStore = create(
  persist((set, get) => {}, { name: 'generalStore' })
)
