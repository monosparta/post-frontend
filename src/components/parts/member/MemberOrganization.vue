<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'
// const emailVerify = ref(false)
// const phoneVerify = ref(false)
const dropdown = useDropdownStore()
const layout = useLayoutStore()
const member = useMemberStore()

const name = ref('')
const email = ref('')
const country_calling_number = ref(dropdown.countryCallingCode.data[0])
const phone = ref('')
const vat = ref('')
const address_line_1 = ref('')
const address_line_2 = ref('')
const city = ref(dropdown.city.data[0])
const region = ref(dropdown.region.data[0])
const refresh = ref(false)

const validationRaw: { [key: string]: any } = {
  name: {
    status: false,
    text: '',
  },
  email: {
    status: false,
    text: '',
  },
  phone: {
    status: false,
    text: '',
  },
}

const validation = reactive(validationRaw)

watch([name], (newValue, oldValue) => {
  validation.name = {
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

watch([phone], (newValue, oldValue) => {
  validation.phone = {
    status: false,
    text: '',
  }
})

const changeCity = (data: {
  id: number
  name: string
  title: string
  value: string
  value_alt: string
  value_alt_2: string
  sequence: number
  is_enabled: boolean
}) => {
  city.value = data
  region.value = dropdown.filterRegion(data.value)[0]
  refresh.value = !refresh.value
}

const changeRegion = (data: {
  id: number
  name: string
  title: string
  value: string
  value_alt: string
  value_alt_2: string
  sequence: number
  is_enabled: boolean
}) => {
  region.value = data
}

const setData = () => {
  if (member.organization) {
    name.value = member.organization.name
    email.value = member.organization.email
    dropdown.countryCallingCode.data.every((data) => {
      if (data.value_alt === member.organization.phone_country_code) {
        country_calling_number.value = data
        return false
      }
      return true
    })
    phone.value = member.organization.phone

    vat.value = member.organization.vat
    address_line_1.value = member.organization.address.address_line_1
    address_line_2.value = member.organization.address.address_line_2
    dropdown.city.data.every((data) => {
      if (data.title === member.organization.address.city) {
        city.value = data
        return false
      }
      return true
    })
    dropdown.region.data.every((data) => {
      if (data.value_alt === member.organization.address.zip_code) {
        region.value = data
        return false
      }
      return true
    })
  }
  refresh.value = !refresh.value
}

onMounted(() => {
  setData()
})

const save = async () => {
  // const clear = {
  //   status: false,
  //   text: '',
  // }
  // validation.username = clear
  // validation.full_name = clear
  // validation.email = clear
  // validation.phone = clear
  const memberData = {
    name: name.value,
    email: email.value,
    phone_country_code: country_calling_number.value.value_alt,
    phone_country_calling_code: country_calling_number.value.value,
    phone: phone.value,
    vat: vat.value,
    address: {
      address_line_1: address_line_1.value,
      address_line_2: address_line_2.value,
      city: city.value.value,
      region: region.value.title,
      zip_code: region.value.value_alt,
    },
  }
  try {
    await member.updateMemberOrganization(member.member.id, memberData)
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
    aria-labelledby="applicant-organization-information"
    class="pb-4 px-4 sm:px-6 lg:pb-8 lg:px-0 lg:row-start-1 lg:col-start-1"
  >
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
          Organization Information
        </h2>
      </div>
      <div class="border-t bord er-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
          <div class="col-span-6 sm:col-span-3">
            <div class="col-span-6 sm:col-span-3">
              <InputBox id="name" v-model="name" type="text" title="Organizations / Company / Group" placeholder="Organizations / Company / Group" :error="validation.name.status" :error-message="validation.name.text" />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <div class="col-span-6 sm:col-span-3">
              <InputBox id="email" v-model="email" type="text" title="Email" placeholder="Email" :error="validation.email.status" :error-message="validation.email.text" />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 flex items-center">
                <label for="countryCallingNumber" class="sr-only">CountryCallingNumber</label>
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
                id="phone" v-model="phone" type="text"
                name="phone"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-[7.5rem] sm:text-sm border-gray-300 rounded-md"
                :class="{ 'border-red-500 pr-10 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-500': validation.phone.status }"
                placeholder="2-123-456"
              >
            </div>
            <p v-if="validation.phone.status" class="flex mt-2 text-sm text-red-600">
              <ExclamationCircleIcon class="h-5 w-5 mr-1 text-red-500" aria-hidden="true" />{{ validation.phone.text
              }}
            </p>
          </div>

          <div class="sm:col-span-3">
            <div class="col-span-6 sm:col-span-3">
              <InputBox id="vat" v-model="vat" type="text" title="VAT" placeholder="VAT" />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label for="city" class="block text-sm font-medium text-gray-500">City / Country</label>
            <SelectMenus :key="(refresh) ? 1 : 0" :default="city" name="city" class="mt-1" :data="dropdown.city.data" @select="((value: any) => changeCity(value))" />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label for="state" class="block text-sm font-medium text-gray-500">District</label>
            <SelectMenus :key="(refresh) ? 1 : 0" :default="region" name="state" class="mt-1" :data="dropdown.filterRegion(city.value)" @select="((value: any) => changeRegion(value))" />
          </div>
          <div class="col-span-6 sm:col-span-6">
            <div class="col-span-6 sm:col-span-3">
              <InputBox
                id="address-1" v-model="address_line_1" type="text" title="Street Address"
                placeholder="Address Line 1"
              />
              <InputBox
                id="address-2" v-model="address_line_2" type="text" placeholder="Address Line 2"
              />
            </div>
          </div>
        </dl>
      </div>
      <div class="p-4 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
        <button
          type="submit"
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

