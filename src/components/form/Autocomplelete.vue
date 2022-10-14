<script setup lang="ts">
import { useField } from 'vee-validate'
import { get } from 'lodash'
import {
  QuestionMarkCircleIcon,
  SearchCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from '@headlessui/vue'
import type { BaseSchema } from 'yup'
const props = defineProps<{
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  clearable?: boolean
  initialValue?: string
  readonly?: boolean
  fetchSuggestions: (value: string) => Promise<string[]>
}>()
const emit = defineEmits(['change', 'clear'])
const selected = ref<{ label: string; value: string }>({
  label: '',
  value: '',
})
const { value, errorMessage, resetField, setValue } = useField(
  props.name,
  props.rules ?? undefined,
  {
    initialValue: props.initialValue ?? undefined,
  },
)

onMounted(async () => {
  console.log('=== Autocomplelete ===', props.initialValue)
})

function onClickClear() {
  console.log('=== onClickClear ===')
  resetField()
  emit('clear')
}

const suggestions = ref<string[]>([])

async function onChange(event) {
  console.log('=== onChange ===', event.target.value)
  suggestions.value = await props.fetchSuggestions(event.target.value)
}
</script>

<template>
  <div class="relative rounded-md shadow-sm">
    <Combobox v-model="value">
      <div class="relative mt-1">
        <div>
          <ComboboxInput
            class="
              w-full
              border-none
              py-2
              pl-3
              pr-10
              text-sm
              leading-5
              text-gray-900
              focus:ring-0
            "
            :display-value="(item) => get(item, 'label', '')"
            @change="onChange"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="
              absolute
              mt-1
              max-h-60
              w-full
              overflow-auto
              rounded-md
              bg-white
              py-1
              text-base
              shadow-lg
              ring-1 ring-black ring-opacity-5
              focus:outline-none
              sm:text-sm
            "
          >
            <div
              v-if="suggestions.length === 0 && query !== ''"
              class="
                relative
                cursor-default
                select-none
                py-2
                px-4
                text-gray-700
              "
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="suggestion in suggestions"
              :key="suggestion.id"
              v-slot="{ selected, active }"
              as="template"
              :value="suggestion"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ suggestion.label }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center" :class="[
        !value && 'pointer-events-none',
      ]"
    >
      <XCircleIcon
        v-if="value && clearable"
        class="h-5 w-5 text-gray-400 hover:text-gray-600"
        aria-hidden="true"
        @click="onClickClear"
      />
    </div>
  </div>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
