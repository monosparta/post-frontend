<script setup lang="ts">
import { useField } from 'vee-validate'
import {
  QuestionMarkCircleIcon,
  SearchCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'
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
}>()

const emit = defineEmits(['change', 'clear'])
const { value, errorMessage, resetField } = useField(
  props.name,
  props.rules ?? undefined, {
    initialValue: props.initialValue ?? '',
  })

function onClickClear() {
  console.log('=== onClickClear ===')
  resetField()
  emit('clear')
}
</script>

<template>
  <div class="relative rounded-md shadow-sm">
    <textarea
      :id="name"
      v-model="value"
      :name="name"
      :type="type ?? 'text'"
      class="focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md" :class="[
        errorMessage ? 'border-red-500' : 'border-gray-300',
      ]"
      :readonly="readonly"
      @change="$emit('change', $event.target.value)"
    />
  </div>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
