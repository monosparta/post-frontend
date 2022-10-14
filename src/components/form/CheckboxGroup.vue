<script setup lang="ts">
import { h, toRef } from 'vue'
import { useField } from 'vee-validate'
import type { BaseSchema } from 'yup'
import isEqual from 'lodash/isEqual'
import CheckboxTree from './CheckboxTree.vue'

interface Option {
  label: string
  value: string | number | Option[]
  checked: boolean
}

const props = defineProps<{
  layout?: string
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  options: Option[]
  initialValue?: any[]
  readonly?: boolean
}>()

const emit = defineEmits<{
  (event: 'change', value: (string | number)[]): void
}>()

const { value, errorMessage, setValue } = useField<(string | number)[]>(
  props.name,
props.rules ?? undefined,
{
  initialValue: props.initialValue ?? [],
},
)

onMounted(() => {
  console.log('=== CheckboxGroup onMounted ===', props.initialValue)
})

function applyInitialChecked(options: Option[]) {
  return options.map((option) => {
    if (Array.isArray(option.value)) {
      option.value = applyInitialChecked(option.value)
      if (option.value.every(o => o.checked))
        option.checked = true
    }
    else {
      option.checked = !!props.initialValue?.find(i => isEqual(i, option.value))
    }
    return option
  })
}

const options = reactive(
  applyInitialChecked(props.options),
)

function collectValues(options: Option[]) {
  const values: (string | number)[] = []
  options.forEach((option) => {
    if (Array.isArray(option.value))
      values.push(...collectValues(option.value))

    else if (option.checked)
      values.push(option.value)
  })
  return values
}

watch(options, (options) => {
  const values = collectValues(options)
  setValue(values)
  emit('change', values)
})
</script>

<template>
  <CheckboxTree :options="options" :readonly="readonly" />
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
