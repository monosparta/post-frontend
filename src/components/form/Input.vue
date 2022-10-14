<script setup lang="ts">
import { useField } from 'vee-validate'
import {
  ClipboardIcon,
  QuestionMarkCircleIcon,
  SearchCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'
import type { BaseSchema } from 'yup'
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  name: string
  as: string
  type: string
  rules?: BaseSchema
  clearable?: boolean
  initialValue?: string
  readonly?: boolean
  min?: number
  max?: number
  right?: string
  canCopy?: boolean
}>()

const emit = defineEmits(['change', 'clear'])

const conditionalProps = computed(() => {
  const propsToReturn = {
  }

  if (props.type === 'number') {
    propsToReturn.min = props.min
    propsToReturn.max = props.max
  }

  return propsToReturn
})

const { value, errorMessage, resetField } = useField(
  props.name,
  props.rules ?? undefined,
  {
    initialValue: props.initialValue ?? '',
  },
)
const { text, copy, copied, isSupported } = useClipboard({ source: value })

function onClickClear() {
  console.log('=== onClickClear ===')
  resetField()
  emit('clear')
}
</script>

<template>
  <div class="relative rounded-md shadow-sm flex">
    <div class="relative flex flex-grow items-stretch focus-within:z-10">
      <input
        :id="name"
        v-model="value"
        :name="name"
        :type="type ?? 'text'"
        class="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        :class="[errorMessage ? 'border-red-500' : 'border-gray-300', !(canCopy && isSupported) && 'rounded-r-md']"
        :readonly="readonly"
        v-bind="conditionalProps"
        @change="$emit('change', $event.target.value)"
      >
    </div>
    <button v-if="canCopy && isSupported" type="button" class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="copy()">
      <ClipboardIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
    </button>
  </div>
  <div
    class="absolute inset-y-0 right-0 pr-3 flex items-center"
    :class="[
      !value && 'pointer-events-none',
    ]"
  >
    <div v-if="right" class="pointer-events-none  flex items-center pr-3">
      <span id="price-currency" class="text-gray-500 sm:text-sm">{{ right }}</span>
    </div>
    <XCircleIcon
      v-if="value && clearable"
      class="h-5 w-5 text-gray-400 hover:text-gray-600"
      aria-hidden="true"
      @click="onClickClear"
    />
  </div>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
