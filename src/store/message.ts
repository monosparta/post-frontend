import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'
const user = useUserStore()
export const useMessageStore = defineStore('message', () => {
  const messages = reactive({
    value: {
      meta: {
        total_pages: 1,
        total: 1,
        per_page: 10,
        current_page: 1,
        from: 1,
        to: 10,
      },
      data: [
        {
          id: '0',
          username: 'User',
          message: '',
          created_at: '1980-01-01 00:00:00',
        },
      ],
    },
  })
  const list = computed(() => { return messages.value.data })
  const meta = computed(() => { return messages.value.meta })
  const getMessage = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/message?page=${messages.value.meta.current_page}&paginate=${messages.value.meta.per_page}`,
      )
      const meta = {
        total_pages: res.data.meta.last_page,
        total: res.data.meta.total,
        per_page: res.data.meta.per_page,
        current_page: res.data.meta.current_page,
        from: res.data.meta.from,
        to: res.data.meta.to,
      }
      messages.value.data = res.data.data
      messages.value.meta = meta
    }
    catch (error) {
      console.log(error)
    }
  }
  const setPage = async (page: number) => {
    messages.value.meta.current_page = page
    await getMessage()
  }
  const setPaginate = async (paginate: number) => {
    messages.value.meta.current_page = 1
    messages.value.meta.per_page = paginate
    await getMessage()
  }

  const createMessage = async (data: {
    username: string
    message: string
  }) => {
    await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/message/`, data, {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
    )
    await getMessage()
  }

  const deleteMessage = async (id: string) => {
    await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/message/${id}`, {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
    )
    await getMessage()
  }

  return {
    list,
    meta,
    getMessage,
    createMessage,
    deleteMessage,
    setPage,
    setPaginate,
    messages,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot))
