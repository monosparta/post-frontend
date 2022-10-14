<script setup lang="ts">
import { useField } from 'vee-validate'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/solid'
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getMonth,
  getYear,
  startOfMonth,
  startOfWeek,
} from 'date-fns/fp'
import { isEqual } from 'lodash'
import * as Yup from 'yup'

const props = defineProps<{
  selectedHour?: number
  selectedMinute?: number
}>()

const emit = defineEmits(['hourSelect', 'minuteSelect'])

const { value: hour, errorMessage: hourError } = useField(
  'hour',
  Yup.number().min(0).max(23).required(),
  {
    initialValue: props.selectedHour ?? 0,
  },
)

const { value: minute, errorMessage: minuteError } = useField(
  'minute',
  Yup.number().min(0).max(59).required(),
  {
    initialValue: props.selectedMinute ?? 0,
  },
)
watch(
  [hour, minute],
  ([hour, minute]) => {
    console.log('TimeSelect hour', hour)
    emit('hourSelect', hour)
    emit('minuteSelect', minute)
  },
  { deep: true },
)
</script>

<template>
  <div class="inline-block relative">
    <div class="w-full">
      <input
        v-model="hour"
        type="text"
        class="border-gray-300  inline  sm:text-sm w-full border-gray-300 text-right  rounded-l-md w-10 border-r-0"
        :class="{
          'border-red-600  placeholder-red-300':
            hourError || minuteError,
          'text-red-600': hourError,
        }"
      >
      <input
        type="text"
        class="border-gray-300  inline  sm:text-sm w-full border-gray-300 w-2 px-0 text-center border-y-1 border-x-0"
        :class="{
          'border-red-600 placeholder-red-300':
            hourError || minuteError,
        }"
        value=":"
      >
      <input
        v-model="minute"
        type="text"
        class="border-gray-300  inline  sm:text-sm w-full border-gray-300 text-left  rounded-r-md w-10 border-l-0"
        :class="{
          'border-red-600  placeholder-red-300':
            hourError || minuteError,
          'text-red-600': minuteError,
        }"
      >
    </div>
  </div>
</template>

<style scoped>
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance:textfield;
}
</style>
