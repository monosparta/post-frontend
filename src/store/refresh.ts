import { acceptHMRUpdate, defineStore } from 'pinia'

export const useRefreshStore = defineStore('refresh', () => {
  const reloadStatus = ref(1)

  const reload = () => {
    reloadStatus.value = new Date().getTime()
    console.log(reloadStatus.value);
  }
  return {
    reloadStatus,
    reload,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRefreshStore, import.meta.hot))
