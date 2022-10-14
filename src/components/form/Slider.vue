<script setup lang="ts">
import { useField } from 'vee-validate'
import {
  QuestionMarkCircleIcon,
  SearchCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'
import type { BaseSchema } from 'yup'
const props = defineProps<{
  name: string
  rules?: BaseSchema
  initialValue?: string
  readonly?: boolean
  min: number
  max: number
}>()

const emit = defineEmits(['change', 'clear'])

console.log('=== props.name ===', props.name)

const { value, errorMessage, resetField } = useField(
  props.name,
  props.rules ?? undefined,
  {
    initialValue: props.initialValue ?? props.min ?? 0,
  },
)
</script>

<template>
  <div class="relative rounded-md shadow-sm">
    <input
      :id="name"
      v-model="value"
      :name="name"
      class="slider"
      type="range"
      :class="[errorMessage ? 'border-red-500' : 'border-gray-300']"
      :readonly="readonly"
      :min="min"
      :max="max"
      @change="$emit('change', $event.target.value)"
    >
  </div>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #1D4ED8;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #1D4ED8;
  cursor: pointer;
}
</style>
