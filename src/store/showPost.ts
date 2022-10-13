import { acceptHMRUpdate, defineStore } from 'pinia'

export const useShowPostStore = defineStore('showPost', () => {
  const notificationStatus = ref(false)
  const notification = reactive({
    type1: '',
    type2: '',
    id: '',
    title: '',
    content: '',
    userId: '',
    dateTime: '',

  })
  const createNotification = (data: { type1: string; type2: string; id: string; title: string; content: string; userId: string; dateTime: string }) => {
    notificationStatus.value = true
    notification.type1 = data.type1
    notification.type2 = data.type2
    notification.id = data.id
    notification.title = data.title
    notification.content = data.content
    notification.userId = data.userId
    notification.dateTime = data.dateTime
  }
  const closeNotification = () => {
    notificationStatus.value = false
    notification.type1 = ''
    notification.type2 = ''
    notification.id = ''
    notification.title = ''
    notification.content = ''
    notification.userId = ''
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
