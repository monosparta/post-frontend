<script setup lang="ts">
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
import { useField } from 'vee-validate'
import { isEqual } from 'lodash'
import type { BaseSchema } from 'yup'
import Calendar from './Calendar.vue'
import TimeSelect from './TimeSelect.vue'

const props = defineProps<{
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  clearable?: boolean
  min?: Date
  max?: Date
  disabled?: boolean
}>()

const {
  value: selectedDate,
  errorMessage,
  setValue,
  resetField,
} = useField<Date>(props.name, props.rules ?? undefined)

const isSelecting = ref('day')

function onSelectDate(day: Date) {
  if (!selectedDate.value) {
    setValue(day)
  }
  else {
    const newDate = new Date(selectedDate.value)
    newDate.setDate(day.getDate())
    newDate.setMonth(day.getMonth())
    newDate.setFullYear(day.getFullYear())
    setValue(newDate)
  }
}
const hourPickerRef = ref<HTMLDivElement>()
function onHourScroll(e) {
  const { scrollTop, offsetHeight, scrollHeight, clientHeight } = e.target

  const itemHeight = scrollHeight / (24 + 4)

  const hour = Math.floor(
    (scrollTop - 2 * itemHeight + clientHeight / 2) / itemHeight,
  )

  if (!selectedDate.value)
    setValue(new Date())

  const newDate = new Date(selectedDate.value)
  newDate.setHours(hour >= 23 ? 23 : hour)
  setValue(newDate)
}

function onHourClick(hour: number) {
  const { scrollTop, offsetHeight, scrollHeight, clientHeight }
    = hourPickerRef.value
  const itemHeight = scrollHeight / (24 + 4)

  const top = itemHeight * (hour + 1) + 2 * itemHeight - clientHeight / 2

  hourPickerRef.value.scroll({
    top,
    behavior: 'smooth',
  })
}

const minutePickerRef = ref<HTMLDivElement>()
function onMinuateScroll(e) {
  const { scrollTop, offsetHeight, scrollHeight, clientHeight } = e.target

  const itemHeight = scrollHeight / (60 + 4)

  const minuate = Math.floor(
    (scrollTop - 2 * itemHeight + clientHeight / 2) / itemHeight,
  )

  if (!selectedDate.value)
    setValue(new Date())

  const newDate = new Date(selectedDate.value)
  newDate.setMinutes(minuate >= 60 ? 59 : minuate)
  setValue(newDate)
}

function onMinuateClick(minuate: number) {
  const { scrollTop, offsetHeight, scrollHeight, clientHeight }
    = minutePickerRef.value
  const itemHeight = scrollHeight / (60 + 4)

  const top = itemHeight * (minuate + 1) + 2 * itemHeight - clientHeight / 2

  minutePickerRef.value.scroll({
    top,
    behavior: 'smooth',
  })
}

watch(minutePickerRef, (pickerRef) => {
  if (pickerRef) {
    const { scrollTop, offsetHeight, scrollHeight, clientHeight } = pickerRef
    if (selectedDate.value) {
      const itemHeight = scrollHeight / (60 + 4)
      const minuate = selectedDate.value.getMinutes()
      const top
        = itemHeight * (minuate + 1) + 2 * itemHeight - clientHeight / 2

      pickerRef.scroll({
        top,
        behavior: 'auto',
      })
    }
  }
})

watch(hourPickerRef, (pickerRef) => {
  if (pickerRef) {
    const { scrollTop, offsetHeight, scrollHeight, clientHeight } = pickerRef
    if (selectedDate.value) {
      const itemHeight = scrollHeight / (24 + 4)
      const hour = selectedDate.value.getHours()
      const top = itemHeight * (hour + 1) + 2 * itemHeight - clientHeight / 2

      pickerRef.scroll({
        top,
        behavior: 'auto',
      })
    }
  }
})

function onHourSelect(hour: number) {
  const newDate = selectedDate.value
    ? new Date(selectedDate.value)
    : new Date()
  newDate.setHours(hour)
  setValue(newDate)
}

function onMinuteSelect(minuate: number) {
  const newDate = selectedDate.value
    ? new Date(selectedDate.value)
    : new Date()
  newDate.setMinutes(minuate)
  newDate.setSeconds(0)
  setValue(newDate)
}
</script>

<template>
  <!-- <div class="relative rounded-md shadow-sm"> -->
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton key="" class="w-full" :disabled="disabled">
      <input
        type="text"
        class="focus:ring-primary-500 focus:border-primary-500 blockpr-10 sm:text-sm w-full border-gray-300 rounded-md" :class="[
          errorMessage ? 'border-red-500' : 'border-gray-300',
        ]"
        :readonly="disabled"
        :value="selectedDate ? format('yyyy-MM-dd HH:mm', selectedDate) : ''"
      >
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="
          absolute
          left-1/2
          z-10
          mt-3
          max-w-sm
          -translate-x-1/2
          transform
          px-4
          sm:px-0
          lg:max-w-3xl
          min-w-[480px]
        "
      >
        <div
          class="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <Calendar
            :on-select="onSelectDate"
            :initial-date="selectedDate"
            :min="min"
            :max="max"
            @is-selecting="isSelecting = $event"
          />
          <div v-if="isSelecting === 'day'" class="p-4 mt-2">
            <label class="inline-block text-sm font-medium text-gray-700 mr-2">Time</label>
            <TimeSelect
              :selected-hour="selectedDate?.getHours()"
              :selected-minute="selectedDate?.getMinutes()"
              @hour-select="onHourSelect"
              @minute-select="onMinuteSelect"
            />
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-none {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
