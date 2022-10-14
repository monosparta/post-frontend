<script setup lang="ts">
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'
const props = defineProps({
  up: {
    type: Boolean,
    required: false,
    default: false,
  },
  data: {
    type: Array<{ id: number; name: string; title: string; value: string; value_alt: string; value_alt_2: string; sequence: number; is_enabled: boolean }>,
    required: true,
    default() {
      return [{ id: 0, name: '' }]
    },
  },
  default: {
    type: Object,
    required: false,
  },
})
const emit = defineEmits(['select'])
const selected = ref((props.default) ? props.default : props.data[0])
const clickRow = () => {
  emit('select', selected.value)
}
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox v-model="selected" as="div">
    <div class="relative w-full">
      <ListboxButton
        class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
        <span class="block truncate">{{ (selected) ? selected.name : '' }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          :class="{ '-top-2 transform -translate-y-full': props.up }"
        >
          <ListboxOption
            v-for="option in props.data" :key="option.id" v-slot="{ active, selected }" as="template"
            :value="option" @click="clickRow()"
          >
            <li
              class="cursor-default select-none relative py-2 pl-8 pr-4"
              :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900']"
            >
              <span class="block truncate" :class="[selected ? 'font-semibold' : 'font-normal']">
                {{ option.name }}
              </span>

              <span
                v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-1.5"
                :class="[active ? 'text-white' : 'text-indigo-600']"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
