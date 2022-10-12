import { acceptHMRUpdate, defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const notificationStatus = ref(false)
  const notification = reactive({
    type: '',
    text: '',
    dateTime: '',

  })
  const createNotification = (data: { type: string; text: string; dateTime: string }) => {
    notificationStatus.value = true
    notification.type = data.type
    notification.text = data.text
    notification.dateTime = data.dateTime
  }
  const closeNotification = () => {
    notificationStatus.value = false
    notification.type = ''
    notification.text = ''
    notification.dateTime = ''

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
