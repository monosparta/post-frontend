<script setup lang="ts">
import {
  AnnotationIcon,
  ChipIcon,
  HomeIcon,
  UsersIcon,
  XIcon,
  NewspaperIcon,
} from '@heroicons/vue/outline'
import AppHeader from '../components/AppHeader.vue'

import { useSidebar } from '../hooks/useSidebar'

const navigation = [
  { name: 'Dashboard', label: 'dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  { name: 'Users', label: 'users', href: '/users', icon: UsersIcon, current: false },
  { name: 'Bulletin', label: 'bulletin', href: '/bulletin', icon: AnnotationIcon, current: false },
  { name: 'Devices', label: 'devices', href: '/devices', icon: ChipIcon, current: false },
  { name: 'Post', label: 'posts', href: '/posts', icon: NewspaperIcon, current: false },
]

const layout = useLayoutStore()
const activeMenu = useRouter().currentRoute.value.meta.activeMenu
const { isSidebarCollapsed, toggleSidebarCollapse } = useSidebar()
const router = useRouter()

const clickItem = (item: any) => {
  toggleSidebarCollapse()
  router.push({ path: item.href })
}
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="!isSidebarCollapsed">
      <Dialog as="div" class="relative z-40 md:hidden" @close="toggleSidebarCollapse()">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button"
                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="toggleSidebarCollapse()">
                    <span class="sr-only">Close sidebar</span>
                    <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex-shrink-0 flex items-center px-4">
                <img class="h-8 w-auto" src="../assets/vue.svg" alt="Workflow">
              </div>
              <div class="mt-5 flex-1 h-0 overflow-y-auto">
                <nav class="px-2 space-y-1">
                  <a v-for="item in navigation" :key="item.name" href="#"
                    class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    :class="[activeMenu === item.label ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
                    @click="clickItem(item)">
                    <component :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6"
                      :class="[activeMenu === item.label ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500']"
                      aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <img class="h-8 w-auto" src="../assets/vue.svg" alt="Workflow">
        </div>
        <div class="mt-5 flex-grow flex flex-col">
          <nav class="flex-1 px-2 pb-4 space-y-1">
            <button v-for="item in navigation" :key="item.name"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
              :class="[activeMenu === item.label ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
              @click="clickItem(item)">
              <component :is="item.icon" class="mr-3 flex-shrink-0 h-6 w-6"
                :class="[activeMenu === item.label ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500']"
                aria-hidden="true" />
              {{ item.name }}
            </button>
          </nav>
        </div>
      </div>
    </div>

    <div class="md:pl-64 flex flex-col flex-1">
      <AppHeader />
      <router-view />
      <Toast v-if="layout.notificationStatus" :text="layout.notification.text" :title="layout.notification.title"
        :type="layout.notification.type" @click="layout.closeNotification" />
    </div>
  </div>
</template>
