<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'
// const emailVerify = ref(false)
// const phoneVerify = ref(false)
const dropdown = useDropdownStore()
const member = useMemberStore()
const layout = useLayoutStore()

const custom_id = ref('')
const username = ref('')
const email = ref('')
const full_name = ref('')
const country_calling_number = ref(dropdown.countryCallingCode.data[0])
const mobile = ref('')

const validationRaw: { [key: string]: any } = {
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
}

const validation = reactive(validationRaw)

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

const setData = () => {
  custom_id.value = member.info.custom_id
  username.value = member.info.username
  email.value = member.info.email
  full_name.value = member.info.full_name
  mobile.value = member.info.mobile
  dropdown.countryCallingCode.data.every((data) => {
    if (data.value_alt === member.info.country_code) {
      country_calling_number.value = data
      return false
    }
    return true
  })
}

onMounted(() => {
  setData()
})

const save = async () => {
  const clear = {
    status: false,
    text: '',
  }
  validation.username = clear
  validation.full_name = clear
  validation.email = clear
  validation.mobile = clear
  const memberData = {
    username: username.value,
    full_name: full_name.value,
    email: email.value,
    mobile: mobile.value,
    mobile_country_code: country_calling_number.value.value_alt,
    mobile_country_calling_code: country_calling_number.value.value,
  }
  try {
    await member.updateMemberInfo(member.member.id, memberData)
    layout.createNotification({
      type: 'success',
      title: 'Successfully saved!',
      text: 'Successfully saved!',
    })
    setData()
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
  <div
    aria-labelledby="applicant-information-title"
    class="pb-4 px-4 sm:px-6 lg:pb-8 lg:px-0 lg:row-start-1 lg:col-start-1"
  >
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
          User Info
        </h2>
      </div>
      <div class="border-t bord er-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <div class="col-span-6 sm:col-span-3">
              <InputBox
                id="custom_id" v-model="custom_id" :disabled="true" type="text" title="Custom ID"
                placeholder="Custom ID"
              />
            </div>
          </div>
          <div class="sm:col-span-1">
            <div class="col-span-6 sm:col-span-3">
              <InputBox
                id="username" v-model="username" type="text" title="Username" placeholder="Username"
                :error="validation.username.status" :error-message="validation.username.text"
              />
            </div>
          </div>
          <div class="sm:col-span-1">
            <div class="col-span-6 sm:col-span-3">
              <div class="col-span-6 sm:col-span-3">
                <div class="flex justify-between">
                  <label for="email" class="block text-sm font-medium text-gray-500">Email</label>
                  <span
                    :class="{
                      'inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 select-none': !member.info.email_verify,
                      'inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 select-none': member.info.email_verify,
                    }"
                  >{{ (member.info.email_verify) ? 'Verified' : 'Unverified' }}</span>
                </div>
                <input
                  id="email" v-model="email" type="text" name="email" autocomplete="email"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  :class="{ 'border-red-500 pr-10 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-500': validation.email.status }"
                  placeholder="Email"
                >
              </div>
              <p v-if="validation.email.status" class="flex mt-2 text-sm text-red-600">
                <ExclamationCircleIcon class="h-5 w-5 mr-1 text-red-500" aria-hidden="true" />{{ validation.email.text
                }}
              </p>
            </div>
          </div>
          <div class="sm:col-span-1">
            <div class="col-span-6 sm:col-span-3">
              <InputBox
                id="full_name" v-model="full_name" type="text" title="Full Name" placeholder="Full Name"
                :error="validation.full_name.status" :error-message="validation.full_name.text"
              />
            </div>
          </div>
          <div class="sm:col-span-1">
            <div class="col-span-6 sm:col-span-3">
              <div class="flex justify-between">
                <label for="mobile" class="block text-sm font-medium text-gray-500">Mobile</label>
                <span
                  :class="{
                    'inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 select-none': !member.info.phone_verify,
                    'inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 select-none': member.info.phone_verify,
                  }"
                >{{ (member.info.phone_verify) ? 'Verified' : 'Unverified' }}</span>
              </div>
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
            </div>
          </div>
        </dl>
      </div>
      <div class="p-4 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
        <button
          class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:ml-6 sm:order-last sm:w-auto"
          @click="save"
        >
          Save
        </button>
        <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left" />
      </div>
    </div>
  </div>
</template>

