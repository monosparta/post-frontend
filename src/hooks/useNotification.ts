import { readonly, ref } from 'vue'

interface ToastMessage {
  type: string
  title: string
  content: string
}

const isShown = ref(true)

const messages = ref(<ToastMessage[]>[])

export const useNotification = () => {
  const createMessage = (message: ToastMessage) => {
    messages.value.push(message)
  }
  const show = () => {
    isShown.value = true
  }
  const hide = () => {
    isShown.value = false
  }
  return {
    isShown: readonly(isShown),
    messages: readonly(messages),
    show,
    hide,
    createMessage,
  }
}
