<script setup lang="ts">
import { ref } from 'vue'
import { useField } from 'vee-validate'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

import {
  QuestionMarkCircleIcon,
  SearchCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'
import type { BaseSchema } from 'yup'

const props = defineProps<{
  label: string
  name: string
  as?: Node
  type: string
  rules?: BaseSchema
  options: Array<{ label: string; value: string; hidden?: boolean }>
  initialValue?: any
  clearable?: boolean
  readonly?: boolean
  disabled?: boolean
  value?: any
  class?: string
  direction?: 'top' | 'bottom'
}>()

const emit = defineEmits(['change', 'clear'])
const { value, errorMessage, setValue, resetField } = useField(
  props.name,
  props.rules ?? undefined,
  { initialValue: props.initialValue },
)
const propClass = ref(props.class)

function onClickClear() {
  console.log('=== onClickClear ===')
  resetField()
  emit('clear')
}

watch(value, (newValue) => {
  console.log('=== watch ===', newValue)
  emit('change', newValue)
})

const unSelected = computed(() => {
  return typeof value.value === 'undefined'
})

const selectedOption = computed(() => {
  return props.options.find(option => option.value === value.value)
})

defineExpose({
  value,
  setValue,
  resetField,
})
</script>

<template>
  <Listbox v-model="value" as="div">
    <div class="relative">
      <ListboxButton v-if="as" :as="as" />
      <ListboxButton
        v-else
        :class="[errorMessage ? 'border-red-500' : 'border-gray-300', propClass ?? '']"
        class="
          bg-white
          relative
          w-full
          border border-gray-300
          rounded-md
          shadow-sm
          pl-3
          pr-10
          py-2
          text-left
          cursor-default
          focus:outline-none
          focus:ring-1
          focus:ring-indigo-500
          focus:border-indigo-500
          sm:text-sm
        "
        :disabled="disabled || readonly"
      >
        <span class="block truncate" :class="[unSelected && 'text-gray-400']">{{
          !unSelected
            ? options.find((op) => op.value === value).label
            : "請選擇"
        }}</span>

        <span
          v-if="value && clearable"
          class="absolute inset-y-0 right-8 flex items-center" :class="[
            !value && 'pointer-events-none',
          ]"
        >
          <XCircleIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
            @click="onClickClear"
          />
        </span>
        <span
          v-if="!readonly"
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 bg-white shadow-md max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          :class="[
            !as && 'w-full',
            direction
              ? direction === 'top' ? 'bottom-full mb-1' : 'mt-1'
              : 'mt-1',
          ]"
        >
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            v-slot="{ active, selected }"
            as="template"
            :value="option.value"
          >
            <li
              class="cursor-default select-none relative py-2 pl-3 pr-9" :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
              ]"
            >
              <span
                class="block truncate" :class="[
                  selected ? 'font-semibold' : 'font-normal',
                ]"
              >
                {{ option.label }}
              </span>

              <span
                v-if="selected"
                class="absolute inset-y-0 right-0 flex items-center pr-4" :class="[
                  active ? 'text-white' : 'text-indigo-600',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
