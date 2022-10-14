<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'
import type { BaseSchema } from 'yup'

const props = defineProps<{
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  disabled?: boolean
}>()

const { value, errorMessage } = useField(
  props.name,
  props.rules ?? undefined,
)

const getValue = () => value.value

defineExpose({
  getValue,
})
</script>

<template>
  <Switch
    v-model="value"
    class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" :class="[
      value ? 'bg-primary-600' : 'bg-gray-200',
    ]"
    :disabled="disabled"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" :class="[
        value ? 'translate-x-5' : 'translate-x-0',
      ]"
    />
  </Switch>
</template>
