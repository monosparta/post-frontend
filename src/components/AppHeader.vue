<script setup lang="ts">
import { Bars3BottomLeftIcon, BellIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
const user = useUserStore()
const router = useRouter()
const { toggleSidebarCollapse } = useSidebar()

const { t } = useI18n()

const userNavigation = [
  { name: t('user_navigation.profile'), href: '/profile' },
  { name: t('user_navigation.settings'), href: '#' },
]
const logout = () => {
  user.logout()
  router.push({ path: '/login' })
}
</script>

<template>
  <div class="sticky top-0 flex-shrink-0 flex h-16 bg-white shadow">
    <button
      type="button"
      class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
      @click="toggleSidebarCollapse()"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
    </button>
    <div class="flex-1 px-4 flex justify-between">
      <div class="flex-1 flex">
        <form class="w-full flex md:ml-0" action="#" method="GET">
          <label for="search-field" class="sr-only">Search</label>
          <div class="relative w-full text-gray-400 focus-within:text-gray-600">
            <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search" type="search" name="search"
            >
          </div>
        </form>
      </div>
      <div class="ml-4 flex items-center md:ml-6">
        <button
          type="button"
          class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Profile dropdown -->
        <Menu as="div" class="ml-3 relative">
          <div>
            <MenuButton
              class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              >
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                <a
                  :href="item.href" class="block px-4 py-2 text-sm text-gray-700"
                  :class="[active ? 'bg-gray-100' : '']"
                >{{
                  item.name
                }}</a>
              </MenuItem>
              <MenuItem :key="t('user_navigation.sign_out')" v-slot="{ active }">
                <a class="block px-4 py-2 text-sm text-gray-700" :class="[active ? 'bg-gray-100' : '']" @click="logout">
                  {{
                    t('user_navigation.sign_out')
                  }}
                </a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
  <Breadcrumbs />
</template>
