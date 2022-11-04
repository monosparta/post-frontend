import { acceptHMRUpdate, defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const notificationStatus = ref(false)
  const notification = reactive({
    type: '',
    title: '',
    message: '',
    postId: '',

  })
  const createNotification = (data: { type: string; title: string; message: string; postId: string }) => {
    notificationStatus.value = true
    notification.type = data.type
    notification.title = data.title
    notification.message = data.message
    notification.postId = data.postId
  }
  const closeNotification = () => {
    notificationStatus.value = false
    notification.type = ''
    notification.title = ''
    notification.message = ''
    notification.postId = ''
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
