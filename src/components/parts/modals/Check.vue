<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PencilAltIcon, TrashIcon } from '@heroicons/vue/outline'
// const modal = useModalStore()

const props = defineProps({
  type: String,
  text: String,
  dateTime: String,

})
const emit = defineEmits(['confirm'])

const open = ref(true)

const confirmClick = async () => {
  open.value = false
  emit('confirm')
}

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
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <!-- <div v-if="props.type === 'add' || 'update'" -->
                <div v-if="props.type === 'add'"
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <PencilAltIcon class="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <div v-else-if="props.type === 'delete'"
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <TrashIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div v-else-if="props.type === 'update'"
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <PencilAltIcon class="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <p class="text-lg font-medium font-Inter text-gray-800">{{ props.text }}</p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  @click="confirmClick()">確定</button>
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  @click="open = false" ref="cancelButtonRef">取消</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

