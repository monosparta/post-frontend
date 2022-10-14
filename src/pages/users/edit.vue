<script setup lang="ts">
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  ThumbUpIcon,
  UserIcon,
} from '@heroicons/vue/24/solid'

const isAccountVerify = ref(true)
const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}

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
    <!-- Tabs -->
    <div class="lg:hidden mx-4">
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
    <div class="mt-8 max-w-3xl grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
      <div class="lg:col-start-1 lg:col-span-2">
        <!-- Description list -->
        <form
          aria-labelledby="applicant-information-title"
          class="pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
        >
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
                Personal
                Information
              </h2>
            </div>
            <div class="border-t bord er-gray-200 px-4 py-5 sm:px-6">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="numero" class="block text-sm font-medium text-gray-500">ID Number</label>
                    <input
                      id="numero" type="text" name="numero" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="No."
                    >
                  </div>
                </div>
                <div class="sm:col-span-2">
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
                <div class="sm:col-span-1">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium text-gray-500">Name</label>
                    <input
                      id="first-name" type="text" name="first-name" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Name"
                    >
                  </div>
                </div>
                <div class="sm:col-span-1">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="country" class="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                      id="country" name="country" autocomplete="country-name"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div class="sm:col-span-1">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium text-gray-500">Email</label>
                    <input
                      id="first-name" type="text" name="first-name" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="you@example.com"
                    >
                  </div>
                </div>
                <div class="sm:col-span-1">
                  <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone</label>
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
                <div class="sm:col-span-1">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="country" class="block text-sm font-medium text-gray-500">Country</label>
                    <select
                      id="country" name="country" autocomplete="country-name"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div class="sm:col-span-1">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="birth" class="block text-sm font-medium text-gray-500">Birth</label>
                    <input
                      id="birth" type="date" name="birth" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                  </div>
                </div>
                <div class="sm:col-span-1">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="company" class="block text-sm font-medium text-gray-500">Company/Group</label>
                    <input
                      id="company" type="text" name="company" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="company or group"
                    >
                  </div>
                </div>
                <div class="sm:col-span-1">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="job" class="block text-sm font-medium text-gray-500">Job Title</label>
                    <input
                      id="job" type="text" name="job" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Job Title"
                    >
                  </div>
                </div>
                <div class="sm:col-span-1">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="address" class="block text-sm font-medium text-gray-500">Address</label>
                    <input
                      id="address" type="text" name="address" autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="address"
                    >
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <SwitchGroup as="div" class="flex items-center">
                    <Switch
                      v-model="isAccountVerify"
                      class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200" :class="[isAccountVerify ? 'bg-indigo-500' : 'bg-gray-200']"
                    >
                      <span
                        aria-hidden="true"
                        class="inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" :class="[isAccountVerify ? 'translate-x-5' : 'translate-x-0']"
                      />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3">
                      <span class="text-sm font-medium text-gray-900">Account Verify</span>
                    </SwitchLabel>
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

        <!-- Comments -->
        <section aria-labelledby="notes-title">
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

      <section aria-labelledby="timeline-title" class="lg:col-start-3 lg:col-span-1">
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
  </main>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: users
</route>
