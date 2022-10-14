<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon, ExclamationCircleIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
const { t } = useI18n()
const member = useMemberStore()
const dropdown = useDropdownStore()
const layout = useLayoutStore()
const createWindow = ref(false)
const custom_id = ref('')
const username = ref('')
const full_name = ref('')
const email = ref('')
const country_calling_number = ref(dropdown.countryCallingCode.data[0])
const mobile = ref('')
const password = ref('')
const confirm_password = ref('')

// const memberForm = reactive({
//   custom_id: '',
//   username: '',
//   full_name: '',
//   email: '',
//   password: '',
//   confirm_password: '',
// })

const validationRaw: { [key: string]: any } = {
  custom_id: {
    status: false,
    text: '',
  },
  username: {
    status: false,
    text: '',
  },
  full_name: {
    status: false,
    text: '',
  },
  email: {
    status: false,
    text: '',
  },
  mobile: {
    status: false,
    text: '',
  },
  password: {
    status: false,
    text: '',
  },
  confirm_password: {
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

watch([custom_id], (newValue, oldValue) => {
  validation.custom_id = {
    status: false,
    text: '',
  }
})
watch([username], (newValue, oldValue) => {
  validation.username = {
    status: false,
    text: '',
  }
})
watch([full_name], (newValue, oldValue) => {
  validation.full_name = {
    status: false,
    text: '',
  }
})
watch([email], (newValue, oldValue) => {
  validation.email = {
    status: false,
    text: '',
  }
})
watch([mobile], (newValue, oldValue) => {
  validation.mobile = {
    status: false,
    text: '',
  }
})
watch([password], (newValue, oldValue) => {
  validation.password = {
    status: false,
    text: '',
  }
})
watch([confirm_password], (newValue, oldValue) => {
  validation.confirm_password = {
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
  full_name.value = ''
  email.value = ''
  mobile.value = ''
  password.value = ''
  country_calling_number.value = dropdown.countryCallingCode.data[0]
  confirm_password.value = ''
}
const create = async () => {
  const clear = {
    status: false,
    text: '',
  }
  validation.username = clear
  validation.email = clear
  validation.password = clear
  const memberData = {
    custom_id: custom_id.value,
    username: username.value,
    full_name: full_name.value,
    email: email.value,
    mobile_country_code: country_calling_number.value.value_alt,
    mobile_country_calling_code: country_calling_number.value.value,
    mobile: mobile.value,
    password: password.value,
    confirm_password: confirm_password.value,
  }
  try {
    await member.createMember(memberData)
    layout.createNotification({
      type: 'success',
      title: 'Successfully created!',
      text: 'Successfully created!',
    })
    closeCreateWindow()
  }
  catch (error: any) {
    if (error.response.data) {
      const err = error.response.data.message
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
        {{ t("user_navigation.user_manage") }}
      </h1>
      <div class="flex justify-between items-center">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          @click="openCreateWindow"
        >
          {{ t("user_navigation.add_user") }}
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
      <div class="flex items-center sm:justify-end mt-4">
        <div class="sm:ml-2 justify-end">
          <SelectMenus :data="peopleDrop" />
        </div>
        <div class="ml-2 justify-end">
          <SelectMenus :data="peopleDrop" />
        </div>
        <div class="ml-2 justify-end">
          <SelectMenus :data="peopleDrop" />
        </div>
      </div>
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
                    Create User
                  </h3>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <div>
                    <InputBox v-model="custom_id" class="px-4 py-2" type="text" title="Custom ID" placeholder="Custom ID" :error="validation.custom_id.status" :error-message="validation.custom_id.text" />
                    <InputBox v-model="username" class="px-4 py-2" type="text" title="Username" placeholder="Username" :error="validation.username.status" :error-message="validation.username.text" />
                    <InputBox v-model="full_name" class="px-4 py-2" type="text" title="Full Name" placeholder="Full Name" :error="validation.full_name.status" :error-message="validation.full_name.text" />
                    <InputBox v-model="email" class="px-4 py-2" type="text" title="Email" placeholder="Email" :error="validation.email.status" :error-message="validation.email.text" />
                    <div class="px-4 py-2">
                      <label for="mobile" class="block text-sm font-medium text-gray-500">Mobile</label>
                      <div class="mt-1 relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 flex items-center">
                          <!-- <SelectMenus name="class" class="" :data="countryCallingNumberDrop" @select="((value: any) => changeCountryCallingNumber(value))" /> -->
                          <select
                            id="country_calling_number" v-model="country_calling_number" name="country_calling_number"
                            autocomplete="countryCallingNumber"
                            class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            <option v-for="option in dropdown.countryCallingCode.data" :key="option.id" :value="option">
                              {{ `${option.value_alt} ${option.value}` }}
                            </option>
                          </select>
                        </div>
                        <input
                          id="mobile" v-model="mobile" type="text" name="mobile"
                          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-[7.5rem] sm:text-sm border-gray-300 rounded-md"
                          :class="{ 'border-red-500 pr-10 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-500': validation.mobile.status }"
                          placeholder="9-1234-5678"
                        >
                      </div>
                      <p v-if="validation.mobile.status" class="flex mt-2 text-sm text-red-600">
                        <ExclamationCircleIcon class="h-5 w-5 mr-1 text-red-500" aria-hidden="true" />{{ validation.mobile.text
                        }}
                      </p>
                      <!-- <label for="mobile" class="block text-sm font-medium text-gray-500">Phone</label>
                      <div class="mt-1 relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 flex items-center">
                          <SelectMenus name="class" class="" :data="countryCallingNumberDrop" @select="((value: any) => changeCountryCallingNumber(value))" />
                          <select
                            id="country_calling_number"
                            v-model="country_calling_number" name="country_calling_number" autocomplete="countryCallingNumber"
                            class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            <option>+886</option>
                            <option>+1</option>
                            <option>+44</option>
                          </select>
                        </div>
                        <input
                          id="phone" v-model="phone" type="text" name="phone"
                          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-20 sm:text-sm border-gray-300 rounded-md"
                          :class="{ 'border-red-500 pr-10 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-500': validation.phone.status }"
                          placeholder="9-1234-5678"
                        >
                      </div>
                      <p v-if="validation.phone.status" class="flex mt-2 text-sm text-red-600">
                        <ExclamationCircleIcon class="h-5 w-5 mr-1 text-red-500" aria-hidden="true" />{{ validation.phone.text }}
                      </p> -->
                    </div>
                    <InputBox v-model="password" class="px-4 py-2" type="password" title="Password" placeholder="Password" :error="validation.password.status" :error-message="validation.password.text" />
                    <InputBox v-model="confirm_password" class="px-4 py-2" type="password" title="Confirm Password" placeholder="Confirm Password" :error="validation.confirm_password.status" :error-message="validation.confirm_password.text" />
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
