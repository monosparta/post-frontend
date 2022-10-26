import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'
const layout = useLayoutStore()
export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const user = reactive({
    data: {
      user: {
        id: '',
        email: '',
        username: '',
        phone: '',
      },
      token: {
        access_token: '',
        access_token_expires_at: '',
        refresh_token: '',
        refresh_token_expires_at: '',
        token_type: 'Bearer',
      },
    },
  })

  const userData = computed(() => user.data.user)
  const userToken = computed(() => user.data.token)

  const checkToken = async () => {
    if (user.data.user.id === '') {
      await useUserStore().router.push({ name: 'login' })
      layout.createNotification({
        type: 'error',
        title: 'Please login.',
        text: 'Please login.',
      })
      return false
    }

    const accessExpiresTime = new Date(user.data.token.access_token_expires_at)
    const refreshExpiresTime = new Date(user.data.token.refresh_token_expires_at)
    const nowTime = new Date()
    if (accessExpiresTime.getTime() - nowTime.getTime() < 0) {
      if (refreshExpiresTime.getTime() - nowTime.getTime() < 0) {
        await useUserStore().router.push({ name: 'login' })
        layout.createNotification({
          type: 'error',
          title: 'Your session has expired, Please login.',
          text: 'Your session has expired, Please login.',
        })
        return false
      }
      else {
        try {
          const result = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/api/v1/refresh-token`, {
            headers: {
              Authorization: `Bearer ${user.data.token.refresh_token}`,
            },
          },
          )
          user.data.token.access_token = result.data.data.access_token
          user.data.token.access_token_expires_at = result.data.data.access_token_expires_at
          user.data.token.refresh_token = result.data.refresh_token
          user.data.token.refresh_token_expires_at = result.data.refresh_token_expires_at
          return true
        }
        catch (error) {
          await useUserStore().router.push({ name: 'login' })
          layout.createNotification({
            type: 'error',
            title: 'Your session has expired, Please login.',
            text: 'Your session has expired, Please login.',
          })
          return false
        }
      }
    }
    return true
  }

  // const register = async (data: {
  //   'email': string
  //   'password': string
  //   'confirm_password': string
  // }) => {
  //   const result = await axios.put(
  //     `${import.meta.env.VITE_APP_API_URL}/api/v1/register`, data,
  //   )
  //   user.data = result.data.data
  // }

  const login = async (data: {
    'email': string
    'password': string
  }) => {
    const result = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/login`, data,
    )
    user.data = result.data.data
    localStorage.setItem('id', user.data.user.id)
  }

  const logout = () => {
    user.data = {
      user: {
        id: '',
        email: '',
        username: '',
        phone: '',
      },
      token: {
        access_token: '',
        access_token_expires_at: '',
        refresh_token: '',
        refresh_token_expires_at: '',
        token_type: 'Bearer',
      },
    }
  }

  return {
    login,
    logout,
    checkToken,
    userData,
    userToken,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
