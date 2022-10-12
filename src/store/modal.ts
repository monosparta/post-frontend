import { acceptHMRUpdate, defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const notificationStatus = ref(false)
  const notification = reactive({
    type: '',
    text: '',
    title: '',
    text_input:'',
    user_id:'',
  })
  const createNotification = (data: { type: string; text: string; title: string; text_input: string; user_id: string }) => {
    notificationStatus.value = true
    notification.type = data.type
    notification.text = data.text
    notification.title = data.title
    notification.text_input = data.text_input
    notification.user_id = data.user_id
  }
  const closeNotification = () => {
    notificationStatus.value = false
    notification.type = ''
    notification.text = ''
    notification.title = ''
    notification.text_input = ''
    notification.user_id =''
  }

  return {
    notificationStatus,
    notification,
    createNotification,
    closeNotification,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
