<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/solid'
import {
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns/fp'
import { useField } from 'vee-validate'
import { isEqual } from 'lodash'
import ScrollSelect from './ScrollSelect.vue'

const props = defineProps<{
  onSelect: (date: Date) => void
  initialDate?: Date
  min?: Date
  max?: Date
}>()

const emit = defineEmits(['isSelecting'])

const selectedDate = ref(props.initialDate ?? props.min)
const isSelecting = ref('day')
watch(isSelecting, (value) => {
  emit('isSelecting', value)
})
const yearOptions = computed(() => {
  const years = []

  if (props.min && props.max) {
    for (let i = getYear(props.min); i <= getYear(props.max); i++)
      years.push(i)
  }
  else if (props.min && !props.max) {
    for (let i = getYear(props.min); i <= getYear(props.min) + 100; i++)
      years.push(i)
  }
  else if (!props.min && props.max) {
    for (let i = getYear(props.max) - 100; i <= getYear(props.max); i++)
      years.push(i)
  }
  else {
    for (let i = getYear(new Date()) - 100; i <= getYear(new Date()) + 100; i++)
      years.push(i)
  }

  return years
})

const todaysDate = ref(new Date())
const year = ref(getYear(selectedDate.value ?? todaysDate.value))
const month = ref(getMonth(selectedDate.value ?? todaysDate.value))
const day = ref(selectedDate.value ? getDate(selectedDate.value) : null)
const startDayOfMonth = computed(() =>
  startOfMonth(new Date(year.value, month.value)),
)
const endDayOfMonth = computed(() =>
  endOfMonth(new Date(year.value, month.value)),
)
const startDayOfFirstWeek = computed(() => startOfWeek(startDayOfMonth.value))
const endDayOfLastWeek = computed(() => endOfWeek(endDayOfMonth.value))
const monthDays = computed(() =>
  eachDayOfInterval({
    start: startDayOfFirstWeek.value,
    end: endDayOfLastWeek.value,
  }),
)

const yearPickerRef = ref<HTMLDivElement>()
watch(yearPickerRef, (pickerRef) => {
  if (pickerRef) {
    const { scrollTop, offsetHeight, scrollHeight, clientHeight } = pickerRef
    console.log('=== pickerRef ===', scrollTop, offsetHeight, scrollHeight, clientHeight)
    if (year.value) {
      const yearOptionCount = yearOptions.value.length
      const index = yearOptions.value.indexOf(year.value)
      const itemHeight = scrollHeight / yearOptionCount
      const top = itemHeight * (index + 1) - clientHeight / 2

      pickerRef.scroll({
        top,
        behavior: 'auto',
      })
    }
  }
})

function nextMonth() {
  month.value = month.value + 1
  if (month.value > 11) {
    month.value = 0
    year.value = year.value + 1
  }
}

function previousMonth() {
  month.value = month.value - 1
  if (month.value < 0) {
    month.value = 11
    year.value = year.value - 1
  }
}

function onSelectMonth(value: number) {
  month.value = value
  isSelecting.value = 'day'
}

function onSelectYear(value: number) {
  year.value = value
  isSelecting.value = 'month'
}

function isToday(day: Date) {
  return isSameDay(day, todaysDate.value)
}

function isSelected(day: Date) {
  return selectedDate.value && isSameDay(day, selectedDate.value)
}

function isInMonth(day: Date) {
  return day.getMonth() === month.value
}

function isDisabled(day: Date) {
  const isAfterMax = props.max ? isAfter(endOfDay(props.max), day) : false
  const isBeforeMin = props.min ? isBefore(startOfDay(props.min), day) : false

  return isAfterMax || isBeforeMin
}

function isDisabledMonth(month: number, year: number) {
  console.log('=== isDisabledMonth ===', month, year)
  const isAfterMax = props.max ? isAfter(endOfMonth(props.max), new Date(year, month)) : false
  const isBeforeMin = props.min ? isBefore(startOfMonth(props.min), new Date(year, month)) : false

  return isAfterMax || isBeforeMin
}

function isSelectedMonth(month: number, year: number) {
  return selectedDate.value && isSameMonth(new Date(year, month), selectedDate.value)
}

function onSelect(day: Date) {
  selectedDate.value = day
  props.onSelect(selectedDate.value)
}
</script>

<template>
  <div
    class="
      text-center
      lg:col-start-8 lg:col-end-13 lg:row-start-1
      xl:col-start-9
    "
  >
    <template v-if="isSelecting === 'day'">
      <div class="flex items-center text-gray-900 mt-8">
        <button
          type="button"
          class="
          -m-1.5
          flex flex-none
          items-center
          justify-center
          p-1.5
          text-gray-400
          hover:text-gray-500
        "
          @click="previousMonth()"
        >
          <span class="sr-only">Previous month</span>
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="flex-auto font-semibold hover:text-gray-500"
          @click="isSelecting = 'month'"
        >
          {{ format('LLLL yyyy', startDayOfMonth) }}
        </button>
        <button
          type="button"
          class="
          -m-1.5
          flex flex-none
          items-center
          justify-center
          p-1.5
          text-gray-400
          hover:text-gray-500
        "
          @click="nextMonth()"
        >
          <span class="sr-only">Next month</span>
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div
        class="
        mt-2
        grid grid-cols-7
        gap-px
        bg-gray-200
        text-sm
        ring-1 ring-gray-200
      "
      >
        <button
          v-for="(day, dayIdx) in monthDays"
          :key="dayIdx"
          type="button"
          class="hover:bg-gray-100 focus:z-10 justify-center px-0.5 py-0.5 flex"
          :class="[
            isInMonth(day) ? 'bg-white' : 'bg-gray-50',
            (isSelected(day) || isToday(day)) && 'font-semibold',
            isSelected(day) && 'text-white',
            !isSelected(day)
              && isInMonth(day)
              && !isToday(day)
              && 'text-gray-900',
            !isSelected(day)
              && !isInMonth(day)
              && !isToday(day)
              && 'text-gray-400',
            isToday(day) && !isSelected(day) && 'text-indigo-600',
          ]"
          :disabled="isDisabled(day)"
          @click="onSelect(day)"
        >
          <time
            :datetime="day.date"
            class="flex h-7 w-7 items-center justify-center rounded-full"
            :class="[
              isSelected(day) && isToday(day) && 'bg-indigo-600',
              isSelected(day) && !isToday(day) && 'bg-gray-900',
              isDisabled(day) && 'text-gray-500',
            ]"
          >{{ day.getDate() }}</time>
        </button>
      </div>
    </template>

    <template v-if="isSelecting === 'month'">
      <div class="flex items-center text-gray-900 mt-8">
        <button
          type="button"
          class="
          -m-1.5
          flex flex-none
          items-center
          justify-center
          p-1.5
          text-gray-400
          hover:text-gray-500
        "
          @click="year -= 1"
        >
          <span class="sr-only">Previous year</span>
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="flex-auto font-semibold hover:text-gray-500"
          @click="isSelecting = 'year'"
        >
          {{ format('yyyy', startDayOfMonth) }}
        </button>
        <button
          type="button"
          class="
          -m-1.5
          flex flex-none
          items-center
          justify-center
          p-1.5
          text-gray-400
          hover:text-gray-500
        "
          @click="year += 1"
        >
          <span class="sr-only">Next year</span>
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div
        class="
        mt-2
        grid grid-cols-3
        gap-px
        bg-gray-200
        text-sm
        ring-1 ring-gray-200
      "
      >
        <button
          v-for="(monthOption, idx) in [...Array(12).keys()]"
          :key="idx"
          type="button"
          class="hover:bg-gray-100 bg-white focus:z-10 justify-center px-0.5 py-0.5 flex"
          :disabled="isDisabledMonth(monthOption, year)"
          :class="[
            isSelectedMonth(monthOption, year) && 'bg-indigo-600',
            isDisabledMonth(monthOption, year) && 'text-gray-500',
          ]"
          @click="onSelectMonth(monthOption)"
        >
          <span
            class="flex h-7 w-7 items-center justify-center rounded-full"
          >{{ format('MMM', new Date(2000, monthOption, 1)) }}</span>
        </button>
      </div>
    </template>

    <template v-if="isSelecting === 'year'">
      <Listbox v-bind="year">
        <div ref="yearPickerRef" class="overflow-auto h-48">
          <ListboxOptions
            :static="true"
          >
            <ListboxOption
              v-for="(option, idx) in yearOptions"
              :key="idx"
              as="template"
              :value="option"
              @click="onSelectYear(option)"
            >
              <li
                class="select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-primary-600"
              >
                <span
                  class="block truncate"
                  :class="[
                    year === option ? 'font-semibold' : 'font-normal',
                  ]"
                >
                  {{ option }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </template>
  </div>
</template>
