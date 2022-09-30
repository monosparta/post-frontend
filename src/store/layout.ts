import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const notificationStatus = ref(false)
  const notification = reactive({
    type: '',
    title: '',
    text: '',
  })
  const createNotification = (data: { type: string; title: string; text: string }) => {
    notificationStatus.value = true
    notification.type = data.type
    notification.title = data.title
    notification.text = data.text
  }
  const closeNotification = () => {
    notificationStatus.value = false
    notification.type = ''
    notification.title = ''
    notification.text = ''
  }

  return {
    notificationStatus,
    notification,
    createNotification,
    closeNotification,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
