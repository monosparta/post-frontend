<script setup lang="ts">
import { h, toRef } from 'vue'
import { useField } from 'vee-validate'
import type { BaseSchema } from 'yup'
import PermissionTree from '@/components/Form/PermissionTree.vue'

interface Option {
  label: string
  value: string []
  checked: boolean
  subOptions?: Option []
}

const props = defineProps<{
  layout?: string
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  options: { [model: string]: Option[] }
  initialValue?: string[]
  readonly?: boolean
}>()

const emit = defineEmits<{
  (event: 'change', value: (string | number)[]): void
}>()

const { value: selected, errorMessage, setValue } = useField<(string | number)[]>(
  props.name,
props.rules ?? undefined,
{
  initialValue: props.initialValue ?? [],
},
)

function onChange(checked: boolean, permissions: string[]) {
  console.log('onPolicyChecked', checked, permissions)

  if (checked)
    setValue([...selected.value, ...permissions])
  else
    setValue(selected.value.filter(permission => !permissions.includes(permission)))
}

defineExpose({
  setValue,
})
</script>

<template>
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Permissions
                </th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  View
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Create
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Edit
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Deactivate
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Publish
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <PermissionTree :options="options" :selected="selected" :readonly="readonly" @change="onChange" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
