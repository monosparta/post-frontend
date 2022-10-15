import { acceptHMRUpdate, defineStore } from 'pinia'

export const useShowPostStore = defineStore('showPost', () => {
  const notificationStatus = ref(false)
  const notification = reactive({
    type: '',
    id: '',
    title: '',
    content: '',
    userId: '',
    userName: '',
    dateTime: '',

  })
  const createNotification = (data: { type: string; id: string; title: string; content: string; userId: string; userName: string; dateTime: string }) => {
    notificationStatus.value = true
    notification.type = data.type
    notification.id = data.id
    notification.title = data.title
    notification.content = data.content
    notification.userId = data.userId
    notification.userName = data.userName
    notification.dateTime = data.dateTime
  }
  const closeNotification = () => {
    notificationStatus.value = false
    notification.type = ''
    notification.id = ''
    notification.title = ''
    notification.content = ''
    notification.userId = ''
    notification.userName = ''
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
  import.meta.hot.accept(acceptHMRUpdate(useShowPostStore, import.meta.hot))
