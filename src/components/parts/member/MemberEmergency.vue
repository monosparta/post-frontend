<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
const dropdown = useDropdownStore()
const member = useMemberStore()
const layout = useLayoutStore()

const name = ref('')
const country_calling_number = ref(dropdown.countryCallingCode.data[0])
const phone = ref('')

const validation = reactive({
  name: {
    status: false,
    text: '',
  },
  phone: {
    status: false,
    text: '',
  },
})

watch([name], (newValue, oldValue) => {
  validation.name = {
    status: false,
    text: '',
  }
})

watch([phone], (newValue, oldValue) => {
  validation.phone = {
    status: false,
    text: '',
  }
})

const setData = () => {
  if (member.emergency) {
    name.value = member.emergency.name
    phone.value = member.emergency.phone
    dropdown.countryCallingCode.data.every((data) => {
      if (data.value_alt === member.emergency.country_code) {
        country_calling_number.value = data
        return false
      }
      return true
    })
  }
}

onMounted(() => {
  setData()
})

const save = async () => {
  const clear = {
    status: false,
    text: '',
  }
  validation.name = clear
  validation.phone = clear

  const memberData = {
    name: name.value,
    phone: phone.value,
    country_code: country_calling_number.value.value_alt,
    country_calling_code: country_calling_number.value.value,
  }
  try {
    await member.updateMemberEmergency(member.member.id, memberData)
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
      Object.keys(err).forEach((key: String) => {
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
    aria-labelledby="applicant-organization-information"
    class="pb-4 px-4 sm:px-6 lg:pb-8 lg:px-0 lg:row-start-1 lg:col-start-1"
  >
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
          Emergency Contact
        </h2>
      </div>
      <div class="border-t bord er-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
          <div class="col-span-6 sm:col-span-3">
            <div class="col-span-6 sm:col-span-3">
              <InputBox
                id="name" v-model="name" type="text" title="Name"
                placeholder="Name"
                :error="validation.name.status" :error-message="validation.name.text"
              />
            </div>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="telephone" class="block text-sm font-medium text-gray-700">Telephone</label>
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
                id="phone" v-model="phone" type="text" name="phone"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-[7.5rem] sm:text-sm border-gray-300 rounded-md"
                :class="{ 'border-red-500 pr-10 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-500': validation.phone.status }"
                placeholder="9-1234-5678"
              >
            </div>
            <p v-if="validation.phone.status" class="flex mt-2 text-sm text-red-600">
              <ExclamationCircleIcon class="h-5 w-5 mr-1 text-red-500" aria-hidden="true" />{{ validation.phone.text
              }}
            </p>
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

