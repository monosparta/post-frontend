<script setup lang="ts">
import {
  CheckIcon,
  ExclamationIcon,
  QuestionMarkCircleIcon,
  ThumbUpIcon,
  UserIcon,
} from '@heroicons/vue/solid'

const type = 'delete'

const isAccountVerify = ref(true)
const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}

// const attachments = [
//   { name: 'resume_front_end_developer.pdf', href: '#' },
//   { name: 'coverletter_front_end_developer.pdf', href: '#' },
// ]
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Applied to',
    target: 'Front End Developer',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    date: 'Sep 30',
    datetime: '2020-09-30',
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    date: 'Oct 4',
    datetime: '2020-10-04',
  },
]
const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
]

const tabs = [
  { name: '基本資訊', href: '#', current: true },
  { name: '合約方案', href: '#', current: false },
  { name: '門禁管理', href: '#', current: false },
  { name: '會員權益', href: '#', current: false },
  { name: 'Billing', href: '#', current: false },
  { name: 'Team Members', href: '#', current: false },
]
</script>

<!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <main class="py-10">
    <div class="flex items-center justify-start px-8 space-x-5 max-w-7xl">
      <div class="flex items-center space-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img class="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
          </div>
        </div>
        <div class="flex items-end">
          <h1 class="text-2xl font-bold text-gray-900">
            Terry
          </h1>
          <p class="text-sm px-2 font-medium text-gray-500">
            cameron.terry@bednar.com
          </p>
        </div>
      </div>
    </div>
    <!-- Tabs -->
    <div class="lg:hidden mt-8 mx-4 sm:mx-12">
      <label for="selected-tab" class="sr-only">Select a tab</label>
      <select
        id="selected-tab" name="selected-tab"
        class="block w-full text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden lg:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 mx-8">
          <a
            v-for="tab in tabs" :key="tab.name" :href="tab.href"
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" :class="[tab.current ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
          >
            {{ tab.name }}
          </a>
        </nav>
      </div>
    </div>
    <div class="mt-8 w-full grid grid-cols-6 gap-6 sm:px-6">
      <div class="col-span-6 xl:col-span-4">
        <!-- Description list -->
        <form
          aria-labelledby="applicant-information-title"
          class="pb-8 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
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
                    <label for="company" class="block text-sm font-medium text-gray-500">Username</label>
                    <input
                      id="company" type="text" name="company" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Username"
                    >
                  </div>
                </div>
                <div class="sm:col-span-1">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="job" class="block text-sm font-medium text-gray-500">Email</label>
                    <input
                      id="job" type="text" name="job" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Email"
                    >
                  </div>
                </div>
                <div class="sm:col-span-1" />
                <div class="sm:col-span-1">
                  <SwitchGroup as="div" class="flex items-center justify-between">
                    <SwitchLabel as="span">
                      <span class="text-sm font-medium text-gray-900">Account Verify</span>
                    </SwitchLabel>
                    <Switch
                      v-model="isAccountVerify"
                      class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200" :class="[isAccountVerify ? 'bg-indigo-500' : 'bg-gray-200']"
                    >
                      <span
                        aria-hidden="true"
                        class="inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" :class="[isAccountVerify ? 'translate-x-5' : 'translate-x-0']"
                      />
                    </Switch>
                  </SwitchGroup>
                </div>
              </dl>
            </div>
            <div class="p-4 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
              <button
                type="submit"
                class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:ml-6 sm:order-last sm:w-auto"
              >
                Save
              </button>
              <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left" />
            </div>
          </div>
        </form>

        <form
          aria-labelledby="applicant-profile"
          class="pb-8 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
        >
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h2>
            </div>
            <div class="border-t bord er-gray-200 px-4 py-5 sm:px-6">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
                <div class="col-span-6 sm:col-span-6">
                  <label for="country" class="block text-sm font-medium text-gray-500">Class</label>
                  <select
                    id="country" name="country" autocomplete="country-name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>A Class</option>
                    <option>B Class</option>
                    <option>C Class</option>
                    <option>VIP Class</option>
                    <option>Staff</option>
                  </select>
                </div>
                <div class="col-span-6 lg:col-span-3">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="birth" class="block text-sm font-medium text-gray-500">Birth</label>
                    <input
                      id="birth" type="date" name="birth" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                  </div>
                </div>
                <div class="col-span-6 lg:col-span-3">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="country" class="block text-sm font-medium text-gray-700">Gender</label>
                    <fieldset class="mt-4">
                      <legend class="sr-only">
                        Notification method
                      </legend>
                      <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                        <div :key="0" class="flex items-center">
                          <input id="male" name="notification-method" type="radio" :checked="true" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                          <label for="male" class="ml-3 block text-sm font-medium text-gray-700">Male</label>
                        </div>
                        <div :key="1" class="flex items-center">
                          <input id="female" name="notification-method" type="radio" :checked="true" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                          <label for="female" class="ml-3 block text-sm font-medium text-gray-700">Female</label>
                        </div>
                        <div :key="2" class="flex items-center">
                          <input id="refer" name="notification-method" type="radio" :checked="true" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                          <label for="male" class="ml-3 block text-sm font-medium text-gray-700">Prefer not to say</label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="job" class="block text-sm font-medium text-gray-500">First Name</label>
                    <input
                      id="job" type="text" name="job" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="First Name"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="job" class="block text-sm font-medium text-gray-500">Last Name</label>
                    <input
                      id="job" type="text" name="job" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Last Name"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium text-gray-500">Middle Name</label>
                    <input
                      id="first-name" type="text" name="first-name" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Middle Name"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label for="phone-number" class="block text-sm font-medium text-gray-700">Mobile</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 flex items-center">
                      <label for="countryCallingNumber" class="sr-only">CountryCallingNumber</label>
                      <select
                        id="countryCallingNumber" name="countryCallingNumber" autocomplete="countryCallingNumber"
                        class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                      >
                        <option>+886</option>
                        <option>+1</option>
                        <option>+44</option>
                      </select>
                    </div>
                    <input
                      id="phone-number" type="text" name="phone-number"
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-20 sm:text-sm border-gray-300 rounded-md"
                      placeholder="9-123-456"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label for="phone-number" class="block text-sm font-medium text-gray-700">Telephone</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 flex items-center">
                      <label for="countryCallingNumber" class="sr-only">CountryCallingNumber</label>
                      <select
                        id="countryCallingNumber" name="countryCallingNumber" autocomplete="countryCallingNumber"
                        class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                      >
                        <option>+886</option>
                        <option>+1</option>
                        <option>+44</option>
                      </select>
                    </div>
                    <input
                      id="phone-number" type="text" name="phone-number"
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-20 sm:text-sm border-gray-300 rounded-md"
                      placeholder="2-123-456"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="country" class="block text-sm font-medium text-gray-500">Country of Citizenship</label>
                    <select
                      id="country" name="country" autocomplete="country-name"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Taiwan</option>
                      <option>USA</option>
                      <option>Japan</option>
                    </select>
                  </div>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="company" class="block text-sm font-medium text-gray-500">Identity Code</label>
                    <input
                      id="company" type="text" name="company" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Identity Code"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="job" class="block text-sm font-medium text-gray-500">Job Title</label>
                    <input
                      id="job" type="text" name="job" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Job Title"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="job" class="block text-sm font-medium text-gray-500">Stree Address</label>
                    <input
                      id="job" type="text" name="job" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Stree Address"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="address" class="block text-sm font-medium text-gray-500">City</label>
                    <input
                      id="address" type="text" name="address" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="City"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="address" class="block text-sm font-medium text-gray-500">State / Province</label>
                    <input
                      id="address" type="text" name="address" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="State / Province"
                    >
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="address" class="block text-sm font-medium text-gray-500">ZIP / Postal Code</label>
                    <input
                      id="address" type="text" name="address" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="ZIP / Postal Code"
                    >
                  </div>
                </div>
              </dl>
            </div>
            <div class="p-4 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
              <button
                type="submit"
                class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:ml-6 sm:order-last sm:w-auto"
              >
                Save
              </button>
              <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left" />
            </div>
          </div>
        </form>

        <form
          aria-labelledby="applicant-organization-information"
          class="pb-8 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
        >
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
                Organization Information
              </h2>
            </div>
            <div class="border-t bord er-gray-200 px-4 py-5 sm:px-6">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="job" class="block text-sm font-medium text-gray-500">Organizations / Company / Group</label>
                    <input
                      id="job" type="text" name="job" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Organizations / Company / Group"
                    >
                  </div>
                </div>
                <div class="sm:col-span-3">
                  <label for="phone-number" class="block text-sm font-medium text-gray-700">Telephone</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 flex items-center">
                      <label for="countryCallingNumber" class="sr-only">CountryCallingNumber</label>
                      <select
                        id="countryCallingNumber" name="countryCallingNumber" autocomplete="countryCallingNumber"
                        class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                      >
                        <option>+886</option>
                        <option>+1</option>
                        <option>+44</option>
                      </select>
                    </div>
                    <input
                      id="phone-number" type="text" name="phone-number"
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-20 sm:text-sm border-gray-300 rounded-md"
                      placeholder="9-123-456"
                    >
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="company" class="block text-sm font-medium text-gray-500">VAT</label>
                    <input
                      id="company" type="text" name="company" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Identity Code"
                    >
                  </div>
                </div>
                <div class="sm:col-span-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="job" class="block text-sm font-medium text-gray-500">Stree Address</label>
                    <input
                      id="job" type="text" name="job" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Stree Address"
                    >
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="address" class="block text-sm font-medium text-gray-500">City</label>
                    <input
                      id="address" type="text" name="address" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="City"
                    >
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="address" class="block text-sm font-medium text-gray-500">State / Province</label>
                    <input
                      id="address" type="text" name="address" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="State / Province"
                    >
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="address" class="block text-sm font-medium text-gray-500">ZIP / Postal Code</label>
                    <input
                      id="address" type="text" name="address" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="ZIP / Postal Code"
                    >
                  </div>
                </div>
              </dl>
            </div>
            <div class="p-4 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
              <button
                type="submit"
                class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:ml-6 sm:order-last sm:w-auto"
              >
                Save
              </button>
              <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left" />
            </div>
          </div>
        </form>

        <!-- Action -->
        <section aria-labelledby="action-title" class="pb-8 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1">
          <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
            <div class="divide-y divide-gray-200">
              <div class="px-4 py-5 sm:px-6">
                <h2 id="notes-title" class="text-lg font-medium text-gray-900">
                  Actions
                </h2>
              </div>
              <div class="px-4 py-6 sm:px-6">
                <ul role="list" class="space-y-0 divide-y-2">
                  <li>
                    <div class="flex space-x-3 text-xl">
                      Send Email Reset User Password
                    </div>
                    <div class="flex space-x-3 text-sm text-gray-600">
                      User will receive an Email in maximum 60 seconds.
                    </div>
                    <button
                      type="submit"
                      class="w-full my-4 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:order-last sm:w-auto"
                    >
                      Send Reset Password Email
                    </button>
                  </li>
                  <li class="pt-4">
                    <div class="flex space-x-3 text-xl">
                      Change User Password
                    </div>
                    <div class="flex space-x-3 text-sm text-gray-600">
                      Press the button to create new password to user.
                    </div>
                    <button
                      type="submit"
                      class="w-full my-4 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:order-last sm:w-auto"
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="notes-title" class="pb-8 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1">
          <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
            <div class="divide-y divide-gray-200">
              <div class="px-4 py-5 sm:px-6">
                <h2 id="notes-title" class="text-lg font-medium text-gray-900">
                  Notes
                </h2>
              </div>
              <div class="px-4 py-6 sm:px-6">
                <ul role="list" class="space-y-8">
                  <li v-for="comment in comments" :key="comment.id">
                    <div class="flex space-x-3">
                      <div class="flex-shrink-0">
                        <img
                          class="h-10 w-10 rounded-full"
                          :src="`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`"
                          alt=""
                        >
                      </div>
                      <div>
                        <div class="text-sm">
                          <a href="#" class="font-medium text-gray-900">{{ comment.name }}</a>
                        </div>
                        <div class="mt-1 text-sm text-gray-700">
                          <p>{{ comment.body }}</p>
                        </div>
                        <div class="mt-2 text-sm space-x-2">
                          <span class="text-gray-500 font-medium">{{ comment.date }}</span>
                          {{ ' ' }}
                          <span class="text-gray-500 font-medium">&middot;</span>
                          {{ ' ' }}
                          <button type="button" class="text-gray-900 font-medium">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-6 sm:px-6">
              <div class="flex space-x-3">
                <div class="flex-shrink-0">
                  <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="">
                </div>
                <div class="min-w-0 flex-1">
                  <form action="#">
                    <div>
                      <label for="comment" class="sr-only">About</label>
                      <textarea
                        id="comment" name="comment" rows="3"
                        class="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Add a note"
                      />
                    </div>
                    <div class="mt-3 flex items-center justify-between">
                      <a
                        href="#"
                        class="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                      >
                        <QuestionMarkCircleIcon
                          class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span> Some HTML is okay. </span>
                      </a>
                      <button
                        type="submit"
                        class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section aria-labelledby="timeline-title" class="col-span-6 xl:col-span-2">
        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2 id="timeline-title" class="text-lg font-medium text-gray-900">
            Timeline
          </h2>
          <!-- Activity Feed -->
          <div class="mt-6 flow-root">
            <ul role="list" class="-mb-8">
              <li v-for="(item, itemIdx) in timeline" :key="item.id">
                <div class="relative pb-8">
                  <span
                    v-if="itemIdx !== timeline.length - 1"
                    class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"
                  />
                  <div class="relative flex space-x-3">
                    <div>
                      <span
                        class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white" :class="[item.type.bgColorClass]"
                      >
                        <component :is="item.type.icon" class="w-5 h-5 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p class="text-sm text-gray-500">
                          {{ item.content }} <a href="#" class="font-medium text-gray-900">{{ item.target }}</a>
                        </p>
                      </div>
                      <div class="text-right text-sm whitespace-nowrap text-gray-500">
                        <time :datetime="item.datetime">{{ item.date }}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-6 flex flex-col justify-stretch">
            <button
              type="button"
              class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Action
            </button>
          </div>
        </div>
      </section>
    </div>
    <Toast title="Successfully saved!" type="success">
      Successfully saved!
    </Toast>
    <TransitionRoot as="template" :show="type === 'delete'">
      <Dialog as="div" class="relative z-20">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                    <ExclamationIcon class="h-12 w-12 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-4xl font-medium leading-6 text-gray-900">
                      Delete User
                    </DialogTitle>
                    <div class="my-4">
                      <p class="text-sm text-gray-500">
                        Are you sure you want to delete user?<br> All of your data will be permanently removed from our servers forever.<br>This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm">
                    Delete
                  </button>
                  <button ref="cancelButtonRef" type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm">
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </main>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: users
</route>
