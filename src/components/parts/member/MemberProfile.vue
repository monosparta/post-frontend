<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
// const isAccountVerify = ref(false)
const dropdown = useDropdownStore()
const layout = useLayoutStore()
const member = useMemberStore()

const categories = ref(dropdown.categories.data[0])
const birth_date = ref('')
const gender = ref('refer')
const first_name = ref('')
const last_name = ref('')
const middle_name = ref('')
const job_title = ref('')
const country_calling_number = ref(dropdown.countryCallingCode.data[0])
const telephone = ref('')
const nationality = ref(dropdown.countryCode.data[0])
const identity_code = ref('')
const address = ref('')
const city = ref(dropdown.city.data[0])
const region = ref(dropdown.region.data[0])
const refresh = ref(false)

const validation = reactive({
  first_name: {
    status: false,
    text: '',
  },
  last_name: {
    status: false,
    text: '',
  },
  gender: {
    status: false,
    text: '',
  },
  telephone: {
    status: false,
    text: '',
  },
  identity_code: {
    status: false,
    text: '',
  },
  job_title: {
    status: false,
    text: '',
  },
})

watch([first_name], (newValue, oldValue) => {
  validation.first_name = {
    status: false,
    text: '',
  }
})

watch([last_name], (newValue, oldValue) => {
  validation.last_name = {
    status: false,
    text: '',
  }
})

watch([gender], (newValue, oldValue) => {
  validation.gender = {
    status: false,
    text: '',
  }
})

watch([telephone], (newValue, oldValue) => {
  validation.telephone = {
    status: false,
    text: '',
  }
})

watch([identity_code], (newValue, oldValue) => {
  validation.identity_code = {
    status: false,
    text: '',
  }
})

watch([job_title], (newValue, oldValue) => {
  validation.job_title = {
    status: false,
    text: '',
  }
})

const changeCategories = (data: { id: number; name: string }) => {
  categories.value = data
}

const changeNationality = (data: {
  id: number
  title: string
  value: string
  value_alt: string
  value_alt_2: string
  sequence: number
  is_enabled: boolean
}) => {
  nationality.value = data
}

const changeCity = (data: {
  id: number
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
  if (member.profile) {
    dropdown.categories.data.every((data) => {
      if (data.id === member.profile.categories.id) {
        categories.value = data
        return false
      }
      return true
    })
    const date = new Date(member.profile.birth_date)
    birth_date.value = date.toISOString().slice(0, 10)
    gender.value = member.profile.gender
    first_name.value = member.profile.first_name
    last_name.value = member.profile.last_name
    middle_name.value = member.profile.middle_name
    job_title.value = member.profile.job_title
    dropdown.countryCallingCode.data.every((data) => {
      if (data.value_alt === member.profile.country_code) {
        country_calling_number.value = data
        return false
      }
      return true
    })
    telephone.value = member.profile.telephone
    dropdown.countryCode.data.every((data) => {
      if (data.title === member.profile.nationality) {
        nationality.value = data
        return false
      }
      return true
    })
    identity_code.value = member.profile.identity_code
    address.value = member.profile.address.address
    dropdown.city.data.every((data) => {
      if (data.title === member.profile.address.city) {
        city.value = data
        return false
      }
      return true
    })
    dropdown.region.data.every((data) => {
      if (data.value_alt === member.profile.address.zip_code) {
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
    categories: categories.value,
    birth_date: birth_date.value,
    gender: gender.value,
    first_name: first_name.value,
    last_name: last_name.value,
    middle_name: middle_name.value,
    job_title: job_title.value,
    country_code: country_calling_number.value.value_alt,
    country_calling_code: country_calling_number.value.value,
    telephone: telephone.value,
    nationality: nationality.value.title,
    identity_code: identity_code.value,
    address: {
      address: address.value,
      city: city.value.value,
      region: region.value.title,
      zip_code: region.value.value_alt,
    },
  }
  try {
    await member.updateMemberProfile(member.member.id, memberData)
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
  <div aria-labelledby="applicant-profile" class="pb-4 px-4 sm:px-6 lg:pb-8 lg:px-0 lg:row-start-1 lg:col-start-1">
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
          Profile
        </h2>
      </div>
      <div class="border-t bord er-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
          <div class="col-span-6 sm:col-span-6">
            <label for="class" class="block text-sm font-medium text-gray-500">Class</label>
            <SelectMenus
              :key="refresh" :default="categories"
              name="class" class="mt-1" :data="dropdown.categories.data"
              @select="((value: any) => changeCategories(value))"
            />
            <!-- <select
              id="country" name="country" autocomplete="country-name"
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>A Class</option>
              <option>B Class</option>
              <option>C Class</option>
              <option>VIP Class</option>
              <option>Staff</option>
            </select> -->
          </div>
          <div class="col-span-6 lg:col-span-3">
            <div class="col-span-6 sm:col-span-3">
              <label for="birth" class="block text-sm font-medium text-gray-500">Birth</label>
              <input
                id="birth" v-model="birth_date" type="date" name="birth" autocomplete="given-name"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              >
            </div>
          </div>
          <div class="col-span-6 lg:col-span-3">
            <div class="col-span-6 sm:col-span-3">
              <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
              <fieldset class="mt-4">
                <legend class="sr-only">
                  Gender
                </legend>
                <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  <div :key="0" class="flex items-center">
                    <input
                      id="male" v-model="gender" value="male" name="notification-method" type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    >
                    <label for="male" class="ml-3 block text-sm font-medium text-gray-700">Male</label>
                  </div>
                  <div :key="1" class="flex items-center">
                    <input
                      id="female" v-model="gender" value="female" name="notification-method" type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    >
                    <label for="female" class="ml-3 block text-sm font-medium text-gray-700">Female</label>
                  </div>
                  <div :key="2" class="flex items-center">
                    <input
                      id="refer" v-model="gender" value="refer" name="notification-method" type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    >
                    <label for="refer" class="ml-3 block text-sm font-medium text-gray-700">Prefer not to say</label>
                  </div>
                </div>
              </fieldset>
            </div>
            <p v-if="validation.gender.status" class="flex mt-2 text-sm text-red-600">
              <ExclamationCircleIcon class="h-5 w-5 mr-1 text-red-500" aria-hidden="true" />{{ validation.gender.text
              }}
            </p>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <div class="col-span-6 sm:col-span-3">
              <InputBox id="firstName" v-model="first_name" type="text" title="First Name" placeholder="First Name" :error="validation.first_name.status" :error-message="validation.first_name.text" />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <div class="col-span-6 sm:col-span-3">
              <InputBox id="lastName" v-model="last_name" type="text" title="Last Name" placeholder="Last Name" :error="validation.last_name.status" :error-message="validation.last_name.text" />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <div class="col-span-6 sm:col-span-3">
              <InputBox
                id="middleName" v-model="middle_name" type="text" title="Middle Name"
                placeholder="Middle Name"
              />
            </div>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <InputBox id="jobTitle" v-model="job_title" type="text" title="Job Title" placeholder="Job Title" :error="validation.job_title.status" :error-message="validation.job_title.text" />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="telephone" class="block text-sm font-medium text-gray-700">Telephone</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 flex items-center">
                <!-- <SelectMenus :key="refresh" name="class" class="" :data="countryCallingNumberDrop" @select="((value: any) => changeCountryCallingNumber(value))" /> -->
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
                id="telephone" v-model="telephone" type="text" name="telephone"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-[7.5rem] sm:text-sm border-gray-300 rounded-md"
                :class="{ 'border-red-500 pr-10 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-500': validation.telephone.status }"
                placeholder="9-1234-5678"
              >
            </div>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label for="nationality" class="block text-sm font-medium text-gray-500">Country of
              Citizenship</label>
            <SelectMenus
              :key="refresh" :default="nationality"
              name="nationality" class="mt-1" :data="dropdown.countryCode.data"
              @select="((value: any) => changeNationality(value))"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <div class="col-span-6 sm:col-span-3">
              <InputBox
                id="identityCode" v-model="identity_code" type="text" title="Identity Code"
                placeholder="Identity Code" :error="validation.identity_code.status" :error-message="validation.identity_code.text"
              />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label for="city" class="block text-sm font-medium text-gray-500">City / Country</label>
            <SelectMenus :key="refresh" :default="city" name="city" class="mt-1" :data="dropdown.city.data" @select="((value: any) => changeCity(value))" />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label for="state" class="block text-sm font-medium text-gray-500">District</label>
            <SelectMenus :key="refresh" :default="region" name="state" class="mt-1" :data="dropdown.filterRegion(city.value)" @select="((value: any) => changeRegion(value))" />
          </div>
          <div class="col-span-6 sm:col-span-6">
            <div class="col-span-6 sm:col-span-3">
              <InputBox
                id="street" v-model="address" type="text" title="Street Address"
                placeholder="Street Address"
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

