<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'
import type { BaseSchema } from 'yup'
const props = defineProps<{
  layout?: string
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  options: Array<{ label: string; value: string }>
  readonly?: boolean
}>()

const { value, errorMessage, setValue } = useField<string>(
  props.name,
  props.rules ?? undefined,
)

const selectedOption = computed(() => {
  return props.options.find(option => option.value === value.value)
})
</script>

<template>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
  <div v-if="readonly" class="mt-4 text-sm">
    <label
      class="font-medium text-gray-700"
    >{{ selectedOption.label }}</label>
  </div>
  <div v-else role="group" aria-labelledby="label-email">
    <div :class="layout ?? 'mt-4 max-w-lg space-y-4'">
      <div
        v-for="(option, index) in options"

        :key="index"
        class="relative flex items-start"
      >
        <div class="flex items-center h-5">
          <input
            :id="`${name}-${option.value}`"
            v-model="value"
            type="radio"
            :name="name"
            :value="option.value"
            class="
              focus:ring-primary-500
              h-4
              w-4
              text-primary-600
              border-gray-300
            "
          >
        </div>
        <div class="ml-3 text-sm">
          <label
            :for="`${name}-${option.value}`"
            class="font-medium text-gray-700"
          >{{ option.label }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
