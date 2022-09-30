<script setup lang="ts">
import { ChevronDownIcon, TrashIcon } from '@heroicons/vue/solid'
const selectedMessage = ref([])
const deleteWindow = ref(false)
const messageWindow = ref(false)
const messageData = ref({
  id: '',
  username: '',
  message: '',
  created_at: '',
})
const message = useMessageStore()
const layout = useLayoutStore()
onMounted(async () => {
  await message.getMessage()
})
const indeterminate = computed(() => selectedMessage.value.length > 0 && selectedMessage.value.length < message.meta.per_page)
const messageListData = computed(() => [
  { key: 'Username', value: messageData.value.username },
  { key: 'Content', value: messageData.value.message },
  { key: 'Created At', value: messageData.value.created_at },
])

const openMessageWindow = (
  data: {
    id: string
    username: string
    message: string
    created_at: string
  }) => {
  messageData.value = data
  messageWindow.value = true
}
const openDeleteWindow = (
  data: {
    id: string
    username: string
    message: string
    created_at: string
  }) => {
  messageData.value = data
  deleteWindow.value = true
}
const closeDeleteWindow = () => {
  messageData.value = {
    id: '',
    username: '',
    message: '',
    created_at: '',
  }
  deleteWindow.value = false
  messageWindow.value = false
}

const deleteMessage = async () => {
  await message.deleteMessage(messageData.value.id)
  layout.createNotification({
    type: 'success',
    title: 'Successfully deleted!',
    text: 'Successfully deleted!',
  })
  messageData.value = {
    id: '',
    username: '',
    message: '',
    created_at: '',
  }
  messageWindow.value = false
  deleteWindow.value = false
}
</script>

    <!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flex flex-col">
      <BulletinSectionHeader />
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input
                      type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      :checked="indeterminate || selectedMessage.length === message.meta.per_page"
                      :indeterminate="indeterminate"
                      @change="selectedMessage = $event.target.checked ? message.list.map((p) => p.id) : []"
                    >
                  </th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    <a href="#" class="group inline-flex">
                      Id
                      <span
                        class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      />
                    </a>
                  </th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    <a href="#" class="group inline-flex">
                      User Name
                    </a>
                  </th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    <a href="#" class="group inline-flex">
                      Message
                    </a>
                  </th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    <a href="#" class="group inline-flex">
                      Created At
                      <span
                        class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon
                          class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th scope="col" class="relative py-3.5 w-20 text-left text-sm font-semibold text-gray-900">
                    <div class="group inline-flex">
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="data in message.list" :key="data.id" @click="openMessageWindow(data)">
                  <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <div
                      v-if="selectedMessage.includes(data.id as never)"
                      class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
                    />
                    <input
                      v-model="selectedMessage" type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      :value="data.id"
                    >
                  </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ data.id }}
                  </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ data.username }}
                  </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ data.message }}
                  </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ data.created_at }}
                  </td>
                  <td class="relative flex justify-center whitespace-nowrap py-4 text-right text-sm font-medium">
                    <button
                      class="flex justify-center flex-1 text-indigo-600 hover:text-indigo-900"
                      @click.stop="openDeleteWindow(data)"
                    >
                      <TrashIcon class="h-5 w-5 mx-2" aria-hidden="true" /><span class="sr-only">, {{ data.id
                      }}</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              :total-pages="message.meta.total_pages" :total="message.meta.total"
              :per-page="message.meta.per_page" :current-page="message.meta.current_page" :from="message.meta.from"
              :to="message.meta.to" @click-page="(data:number) => { message.setPage(data); selectedMessage = []; }"
              @click-left="() => { message.setPage(message.meta.current_page - 1); selectedMessage = []; }"
              @click-right="() => { message.setPage(message.meta.current_page + 1); selectedMessage = []; }"
              @change-paginate="(data:any) => { message.setPaginate(data.name); selectedMessage = []; }"
            />
          </div>
        </div>
      </div>
    </div>
    <CautionWindow
      v-if="deleteWindow" title="Delete Message" confirm="Delete" @cancel="closeDeleteWindow"
      @confirm="deleteMessage"
    >
      Are you sure you want to delete danmu?<br> All of your data will be permanently removed from our
      servers forever.<br> This action cannot be undone.
    </CautionWindow>
    <TransitionRoot as="template" :show="messageWindow">
      <Dialog as="div" class="relative z-20">
        <TransitionChild
          as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all mx-4 my-4 w-full sm:max-w-3xl"
              >
                <div class="overflow-hidden bg-white shadow">
                  <div class="py-4 px-6">
                    <h3 class="text-2xl font-medium leading-6 text-gray-900">
                      Message ID. {{ messageData.id }}
                    </h3>
                  </div>
                  <div class="border-t border-gray-200 px-4 py-5 sm:p-0" />
                </div>
                <div v-for="(data, index) in messageListData" :key="index" class="grid grid-cols-8 px-5 pt-3">
                  <h2
                    class="
                        col-span-3
                        lg:col-span-2
                        text-left
                        m-1
                        text-xl
                        px-1
                        break-words
                      "
                  >
                    {{ data.key }} :
                  </h2>
                  <h2
                    class="
                        col-span-5
                        lg:col-span-6
                        text-left
                        m-1
                        text-xl
                        px-1
                        break-words
                      "
                  >
                    {{ data.value }}
                  </h2>
                </div>

                <div class="sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 px-4 pt-5 pb-4 sm:p-6">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    @click="() => { deleteWindow = true }"
                  >
                    Delete
                  </button>
                  <button
                    ref="cancelButtonRef" type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    @click="messageWindow = false"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: bulletin
</route>

