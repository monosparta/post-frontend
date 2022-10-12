<script setup lang="ts">
// import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, ExclamationIcon } from '@heroicons/vue/outline'

const open = ref(true)

const props = defineProps({
  type: String,
  text: String,
  dateTime: String,
})

</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div v-if="props.type ==='add' || props.type ==='update'">
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div class="mt-6 text-center sm:mt-6">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">已於{{props.dateTime}}
                  </DialogTitle>
                  <div class="mt-6">
                    <p class="text-sm text-gray-500">{{props.text}}該篇文章！</p>
                  </div>
                </div>
              </div>
              <div v-if="props.type ==='delete'">
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <CheckIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-6 text-center sm:mt-6">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">已於{{props.dateTime}}
                  </DialogTitle>
                  <div class="mt-6">
                    <p class="text-sm text-gray-500">刪除該篇文章！</p>
                  </div>
                </div>
              </div>
              <div v-if="props.type ==='warming'">
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <ExclamationIcon class="h-6 w-6 text-yellow-600" aria-hidden="true" />
                </div>
                <div class="mt-6 text-center sm:mt-6">
                  <p class="text-sm text-gray-500">{{props.text}}</p>
                </div>
              </div>
              <div class="mt-6 sm:mt-6">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  @click="open = false">確定</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
