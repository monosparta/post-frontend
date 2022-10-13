import { acceptHMRUpdate, defineStore } from 'pinia'

export const useBulletinSectionHeaderStore = defineStore('bulletinSectionHeaderForPost', () => {
  const notificationStatus = ref(false)
  const notification = reactive({
    type: '',
    title: '',
  })
  const createNotification = (data: { type: string; title: string; }) => {
    notificationStatus.value = true
    notification.type = data.type
    notification.title = data.title
  }
  const closeNotification = () => {
    notificationStatus.value = false
    notification.type = ''
    notification.title = ''
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
