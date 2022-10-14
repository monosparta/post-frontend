<script setup lang="ts">
import { ref } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import {
  CalendarIcon,
  ChevronDownIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/vue/24/outline'
import {
  ChevronLeftIcon,
  FilterIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
} from '@heroicons/vue/24/solid'
const props = defineProps<{
  title: string
  defaultOpen?: boolean
}>()
</script>

<template>
  <div class="bg-white shadow-lg sm:rounded-lg">
    <Disclosure
      v-slot="{ open }"
      as="div"
      :default-open="true"
    >
      <div
        class="py-5 px-4 sm:px-6 lg:px-8"
      >
        <!-- <DisclosureButton
          class="text-left w-full flex justify-between items-start text-gray-400"
        > -->
        <div class="text-left w-full flex justify-between items-start text-gray-400">
          <h1 class="text-2xl leading-6 font-medium text-gray-900">
            {{ props.title }}
          </h1>
          <!-- <span class="ml-6 h-7 flex items-center">
          <ChevronDownIcon
              class="h-6 w-6 transform" :class="[open ? '-rotate-180' : 'rotate-0']"
              aria-hidden="true"
            />
          </span> -->
        <!-- </DisclosureButton> -->
        </div>
      </div>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel
          as="div"
          class="pb-6 px-4 sm:px-6 lg:px-8"
        >
          <slot />
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>
