import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { fetchUser } from '@/api/jsonplaceholder'

export interface User {
  id: number
  name: string
  username: string
  email: string
}

export const useProfileStore = defineStore('UserProfile', () => {
  const state = reactive({
    user: null as User | null
  })

  async function getUser(userId: number) {
    const User = await fetchUser(userId);
    state.user = User;
  }

  return {
    state,
    getUser
  }
})