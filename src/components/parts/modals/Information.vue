<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
  type: String,
  title: String,
  message: String,
  postId: String,
})
const emit = defineEmits(['click'])
const router = useRouter()
const route = useRoute()
const modalOpen = ref(true)
const reload = useRefreshStore()

const click = () => {
  modalOpen.value = false
  switch (props.type) {
    case 'add':
    case 'update':
      router.replace({ path: `/show/${props.postId}` })
      break
    case 'delete':
      router.push({ path: '/myPosts' })
      if (route.name === 'myPosts')
        reload.reload()
      break
    default:
      emit('click')
      break
  }
}
</script>

<template>
  <TransitionRoot as="template" :show="modalOpen">
    <Dialog as="div" class="relative z-10" @close="modalOpen = false">
      <TransitionChild
        as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div
                class="mx-auto flex h-12 w-12 items-center justify-center rounded-full" :class="[props.type === 'warning' ? 'bg-yellow-100' : 'bg-green-100']"
              >
                <ExclamationTriangleIcon v-if="props.type === 'warning'" class="h-6 w-6 text-yellow-600" aria-hidden="true" />
                <CheckIcon
                  v-else class="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div class="mt-6 text-center sm:mt-6">
                <DialogTitle as="h3" class="text-lg font-medium  font-Inter leading-6 text-gray-900">
                  {{ props.title }}
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ props.message }}
                  </p>
                </div>
              </div>
              <div class="mt-6 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  @click="click()"
                >
                  確定
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
