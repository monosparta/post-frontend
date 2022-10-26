import { acceptHMRUpdate, defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const notificationStatus = ref(false)
  const notification = reactive({
    type: '',
    text: '',
    postId: '',

  })
  const createNotification = (data: { type: string; text: string; postId: string }) => {
    notificationStatus.value = true
    notification.type = data.type
    notification.text = data.text
    notification.postId = data.postId
  }
  const closeNotification = () => {
    notificationStatus.value = false
    notification.type = ''
    notification.text = ''
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
