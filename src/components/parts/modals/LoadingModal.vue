<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
const modal = useModalStore()

const open = ref(true)
const toInformationOpen = ref(false)
onMounted(() => {
  setTimeout(async () => {
    open.value = false
    toInformationOpen.value = true
    modal.createNotification({
      type: 'add',
      text: '發表',
      dateTime: '2022-10-13 10:34:13',
    })
    document.cookie = 'dateTime=2022-10-13 10:34:13;'
    console.log(document.cookie);
  }, 3000)
})
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform  rounded-lg bg-white px-36 pt-11 pb-11  shadow-xl ">
              <div class="flex flex-col ">
                <DialogTitle as="h3" class="text-lg font-medium text-gray-900">Loading...</DialogTitle>
                <div class="flex_load mt-2">
                  <div class="loader"></div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <Information v-if="toInformationOpen===true && modal.notificationStatus===true" :text="modal.notification.text"
    :dateTime="modal.notification.dateTime" :type="modal.notification.type" @click="modal.closeNotification" />
</template>

