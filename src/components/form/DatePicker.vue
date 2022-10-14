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
  getMonth,
  getYear,
  startOfMonth,
  startOfWeek,
} from 'date-fns/fp'
import { useField } from 'vee-validate'
import { isEqual } from 'lodash'
import type { BaseSchema } from 'yup'

const props = defineProps<{
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
}>()

const {
  value: selectedDate,
  errorMessage,
  setValue,
  resetField,
} = useField<Date>(props.name, props.rules ?? undefined)

interface DateCell {
  year: number
  month: number
  day: number
}

const todaysDate = ref(new Date())
const year = ref(getYear(selectedDate.value ?? todaysDate.value))
const month = ref(getMonth(selectedDate.value ?? todaysDate.value))
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
const daySet = computed(() =>
  monthDays.value.map((day) => {
    return {
      year: day.getFullYear(),
      month: day.getMonth(),
      day: day.getDate(),
    }
  }),
)

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

function isToday(day: DateCell) {
  return isEqual(day, {
    year: todaysDate.value.getFullYear(),
    month: todaysDate.value.getMonth(),
    day: todaysDate.value.getDate(),
  })
}

function isSelected(day: DateCell) {
  return (
    selectedDate.value
    && isEqual(day, {
      year: selectedDate.value.getFullYear(),
      month: selectedDate.value.getMonth(),
      day: selectedDate.value.getDate(),
    })
  )
}

function isInMonth(day: DateCell) {
  return day.month === month.value
}

function onSelect(day: DateCell) {
  selectedDate.value = new Date(day.year, day.month, day.day)
}
</script>

<template>
  <Popover class="relative">
    <PopoverButton key="" class="w-full" :disabled="disabled">
      <input
        type="text"
        class="focus:ring-primary-500 focus:border-primary-500 blockpr-10 sm:text-sm w-full border-gray-300 rounded-md" :class="[
          errorMessage ? 'border-red-500' : 'border-gray-300',
        ]"
        :readonly="disabled || readonly"
        :value="selectedDate ? format('Y/MM/dd', selectedDate) : ''"
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
          min-w-[300px]
        "
      >
        <div
          class="
            overflow-hidden
            rounded-lg
            bg-white
            shadow-lg
            ring-1 ring-black ring-opacity-5
          "
        >
          <div
            class="
              mt-10
              text-center
              lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9
              xl:col-start-9
            "
          >
            <div class="flex items-center text-gray-900">
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
              <div class="flex-auto font-semibold">
                {{ format("MMMM , yyyy", startDayOfMonth) }}
              </div>
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
                rounded-b-lg
                bg-gray-200
                text-sm
                shadow
                ring-1 ring-gray-200
              "
            >
              <button
                v-for="(day, dayIdx) in daySet"
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
                ]" @click="onSelect(day)"
              >
                <time
                  :datetime="day.date"
                  class="flex h-7 w-7 items-center justify-center rounded-full" :class="[
                    isSelected(day) && isToday(day) && 'bg-indigo-600',
                    isSelected(day) && !isToday(day) && 'bg-gray-900',
                  ]"
                >{{ day.day }}</time>
              </button>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
