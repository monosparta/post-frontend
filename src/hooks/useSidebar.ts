import { readonly, ref } from 'vue'

const isSidebarCollapsed = ref(false)

export const useSidebar = () => {
  const toggleSidebarCollapse = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
  return {
    isSidebarCollapsed: readonly(isSidebarCollapsed),
    toggleSidebarCollapse,
  }
}
