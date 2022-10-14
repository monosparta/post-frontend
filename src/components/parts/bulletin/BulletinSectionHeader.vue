<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
// const { t } = useI18n()
const layout = useLayoutStore()
const messageStore = useMessageStore()
const createWindow = ref(false)
const username = ref('')
const message = ref('')

const validationRaw: { [key: string]: any } = {
  username: {
    status: false,
    text: '',
  },
  message: {
    status: false,
    text: '',
  },
}

const validation = reactive(validationRaw)

const peopleDrop = [
  {
    id: 1,
    name: 'Wade Cooper',
    title: '',
    value: '',
    value_alt: '',
    value_alt_2: '',
    sequence: 1,
    is_enabled: true,
  },
  {
    id: 2,
    name: 'Arlene Mccoy',
    title: '',
    value: '',
    value_alt: '',
    value_alt_2: '',
    sequence: 1,
    is_enabled: true,
  },
  {
    id: 3,
    name: 'Devon Webb',
    title: '',
    value: '',
    value_alt: '',
    value_alt_2: '',
    sequence: 1,
    is_enabled: true,
  },
]

watch([username], (newValue, oldValue) => {
  validation.username = {
    status: false,
    text: '',
  }
})
watch([message], (newValue, oldValue) => {
  validation.message = {
    status: false,
    text: '',
  }
})

const openCreateWindow = () => {
  createWindow.value = true
}
const closeCreateWindow = () => {
  createWindow.value = false
  username.value = ''
  message.value = ''
}
const create = async () => {
  const clear = {
    status: false,
    text: '',
  }
  validation.username = clear
  validation.message = clear
  try {
    await messageStore.createMessage({ username: username.value, message: message.value })
    layout.createNotification({
      type: 'success',
      title: 'Successfully created!',
      text: 'Successfully created!',
    })
    closeCreateWindow()
  }
  catch (error: any) {
    if (error.response.data) {
      const err = error.response.data.errors
      Object.keys(err).forEach((key: string) => {
        validation[key] = {
          status: true,
          text: err[key][0],
        }
      })
    }
    else {
      layout.createNotification({
        type: 'error',
        title: 'Network error!',
        text: 'Network error!',
      })
    }
  }
}
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="pb-5 border-b border-gray-200">
    <div class="flex justify-between items-center">
      <h1 id="message-heading" class="text-lg font-medium text-gray-900">
        Bulletin Management
      </h1>
      <div class="flex justify-between items-center">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          @click="openCreateWindow"
        >
          New Message
        </button>
        <Menu as="div" class="ml-3 relative inline-block text-left z-10">
          <div>
            <MenuButton
              class="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span class="sr-only">Open options</span>
              <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="divide-y origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#" class="flex justify-between px-4 py-2 text-sm"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
                  >
                    <span>Edit</span>
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#" class="flex justify-between px-4 py-2 text-sm"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
                  >
                    <span>Duplicate</span>
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#" class="flex justify-between px-4 py-2 text-sm"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
                  >
                    <span>Archive</span>
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#" class="flex justify-between px-4 py-2 text-sm"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
                  >
                    <span>Move</span>
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#" class="flex justify-between px-4 py-2 text-sm"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
                  >
                    <span>Share</span>
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#" class="flex justify-between px-4 py-2 text-sm"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
                  >
                    <span>Add to favorites</span>
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#" class="flex justify-between px-4 py-2 text-sm"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
                  >
                    <span>Delete</span>
                  </a>
                </MenuItem>
              </div>
            </menuitems>
          </transition>
        </Menu>
      </div>
    </div>
    <div class="w-full mt-4 md:max-w-md">
      <label for="search" class="sr-only">Search</label>
      <div class="relative text-sky-100 focus-within:text-gray-400">
        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <MagnifyingGlassIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search" type="text" name="search"
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
          placeholder="Search"
        >
      </div>
    </div>
    <div class="sm:flex sm:items-center sm:justify-between ">
      <div class="flex items-center mt-4">
        <div class="">
          <SelectMenus :data="peopleDrop" />
        </div>
      </div>
      <!-- <div class="flex items-center sm:justify-end mt-4">
        <div class="sm:ml-2 justify-end">
          <SelectMenus :data="peopleDrop" />
        </div>
        <div class="ml-2 justify-end">
          <SelectMenus :data="peopleDrop" />
        </div>
        <div class="ml-2 justify-end">
          <SelectMenus :data="peopleDrop" />
        </div>
      </div> -->
    </div>
  </div>
  <TransitionRoot as="template" :show="createWindow">
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
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all mx-4 my-4 w-full sm:max-w-4xl"
            >
              <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                <div class="py-4 px-6">
                  <h3 class="text-2xl font-medium leading-6 text-gray-900">
                    Create Message
                  </h3>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <div>
                    <InputBox v-model="username" class="px-4 py-2" type="text" title="Username" placeholder="Username" :error="validation.username.status" :error-message="validation.username.text" />
                    <InputBox v-model="message" class="px-4 py-2" type="text" title="Message" placeholder="Message" :error="validation.message.status" :error-message="validation.message.text" />
                    <div class="px-4 py-6">
                      <div class="sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="button"
                          class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                          @click="create"
                        >
                          Create
                        </button>
                        <button
                          ref="cancelButtonRef" type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                          @click="closeCreateWindow"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
