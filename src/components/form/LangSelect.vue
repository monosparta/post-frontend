<script setup lang="ts">
import { ref } from 'vue'
import { useField } from 'vee-validate'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

import { CheckIcon, ChevronUpDownIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid'
import { GlobeAltIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { get, mapValues, set } from 'lodash'

const props = defineProps<{
  current: string
  selected: string[]
  errors?: object
  onlySelected?: boolean
}>()

const emit = defineEmits(['add', 'remove', 'select'])

const mainLanguage = computed(() => {
  return 'en-US'
})

const options = computed(() => {
  return ['en-US']
})

const optionsReady = computed(() => {
  return options.value.length > 0
})

function selectedLang(value: string) {
  return value === props.current
}

const langErrors = computed(() => {
  console.log('langError', options.value)
  const formErrors = props.errors ?? {}
  console.log('formErrors', formErrors)

  const langErrors = Object.entries(formErrors).reduce((acc, [key, value]) => {
    console.log('key', key, value, options.value.findIndex(l => key.includes(l.value)))
    if (options.value.findIndex(l => key.includes(l.value)) >= 0) {
      const lang = key.replace('[lang]', value)
      set(acc, lang, value)
    }
    return acc
  }, {})
  console.log('langErrors', langErrors)

  return Object.keys(langErrors).length > 0 ? langErrors : undefined
})

function langHasErrors(lang: string) {
  return Object.keys(props.errors ?? {}).find(key => key.includes(lang))
}
</script>

<template>
  <Menu
    v-if="mainLanguage && optionsReady"
    as="div"
    class="relative inline-block text-left"
  >
    <div>
      <MenuButton as="template">
        <GlobeAltIcon
          class="h-6 w-6 hover:stroke-gray-400 cursor-pointer" :class="[
            langErrors ? 'stroke-red-500' : 'stroke-gray-500',
          ]"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="
          origin-top-right
          absolute
          z-10
          right-0
          mt-2
          w-72
          rounded-md
          shadow-lg
          overflow-hidden
          bg-white
          ring-1 ring-black ring-opacity-5
          focus:outline-none
          list-none
        "
      >
        <MenuItem
          v-for="option in options.filter((ln) => selected.includes(ln.value))"
          :key="option.value"
          v-slot="{ active, selected }"
          as="template"
          @click="$emit('select', option.value)"
        >
          <li
            class="cursor-default select-none relative p-4 text-sm" :class="[
              active ? 'text-white bg-primary-500' : 'text-gray-900',

            ]"
          >
            <div class="flex flex-col">
              <div class="flex justify-between">
                <p :class="selected ? 'font-semibold' : 'font-normal'">
                  {{ option.label }}
                </p>
                <span class="flex space-x-2">
                  <span
                    v-if="langErrors && option.value in langErrors"
                    :class="active ? 'text-white' : 'text-red-500'"
                  >
                    <ExclamationCircleIcon
                      class="h-5 w-5 cursor-pointer"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    v-if="
                      active && option.value !== mainLanguage && !onlySelected
                    "
                    :class="active ? 'text-white' : 'text-primary-500'"
                  >
                    <XCircleIcon
                      class="h-5 w-5 cursor-pointer"
                      aria-hidden="true"
                      @click="
                        (e) => {
                          e.stopPropagation();
                          $emit('remove', option.value);
                        }
                      "
                    />
                  </span>
                  <span
                    v-if="selectedLang(option.value)"
                    :class="active ? 'text-white' : 'text-primary-500'"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </span>
              </div>
            </div>
          </li>
        </MenuItem>
        <div v-if="!onlySelected" class="border-t-2 border-gray-200">
          <MenuItem
            v-for="option in options.filter(
              (ln) => !selected.includes(ln.value),
            )"
            :key="option.value"
            v-slot="{ active, selected }"
            as="template"
            @click="$emit('add', option.value)"
          >
            <li
              class="cursor-default select-none relative p-4 text-sm" :class="[
                active ? 'text-white bg-primary-500' : 'text-gray-900',
              ]"
            >
              <div class="flex flex-col">
                <div class="flex justify-between">
                  <p class="font-normal">
                    {{ option.label }}
                  </p>
                </div>
              </div>
            </li>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
