<script setup lang="ts">
import { useField } from 'vee-validate'
import type { BaseSchema } from 'yup'
const props = defineProps<{
  name: string
  rules?: BaseSchema
  initialValue?: any
}>()

useField(props.name, props.rules ?? undefined, {
  initialValue: props.initialValue,
})
</script>

<template>
  <div class="hidden" />
</template>
