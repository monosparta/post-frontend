<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'
const props = defineProps({
  id: String,
  modelValue: String,
  title: String,
  placeholder: String,
  disabled: Boolean,
  error: Boolean,
  errorMessage: String,
  type: String,
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (value: String) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="relative">
    <label :for="id" class="block text-sm font-medium text-gray-500">{{ props.title }}</label>
    <input
      :id="id"
      :disabled="disabled"
      :type="type" :value="props.modelValue" name="props.modelValue" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      :placeholder="props.placeholder"
      :class="{
        'border-red-500 pr-10 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-500': props.error,
        'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500': props.disabled,
      }"
      @input="updateValue(($event.target as HTMLInputElement).value)"
    >
    <p v-if="props.error" class="flex mt-2 text-sm text-red-600">
      <ExclamationCircleIcon class="h-5 w-5 mr-1 text-red-500" aria-hidden="true" />{{ props.errorMessage }}
    </p>
  </div>
</template>

