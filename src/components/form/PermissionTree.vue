<script setup lang="ts">
import { h, toRef } from 'vue'
import { useField } from 'vee-validate'
import type { BaseSchema } from 'yup'

interface Option {
  label: string
  value: string[]
  subOptions?: Option []
  type: string
}

const props = defineProps<{
  options: Option[]
  readonly?: boolean
  selected?: string[]
  viewLayer?: number
}>()

// const checked = ref(props.selected && props.options.value.every((permission: string) => props.selected.includes(permission)))

const emit = defineEmits(['change'])

function onChange(e: Event, option: Option) {
  const target = e.target as HTMLInputElement

  if (target.checked) {
    emit('change',
      target.checked,
      option.value,
    )
  }
  else {
    function collectPermissions(option: Option) {
      let permissions = option.value

      if (option.subOptions) {
        option.subOptions.forEach((subOption) => {
          permissions = [...permissions, ...collectPermissions(subOption)]
        })
      }

      return permissions
    }

    emit('change',
      target.checked,
      collectPermissions(option)
        .filter((permission, index, self) => self.indexOf(permission) === index),
    )
  }
}

function onSubColumnChange(e: Event, option: Option, subOption: Option) {
  const target = e.target as HTMLInputElement

  if (target.checked) {
    emit('change',
      target.checked, [
        ...option.value,
        ...subOption.value,
      ],
    )
  }
  else {
    emit('change',
      target.checked, subOption.value,
    )
  }
}

function onSubOptionChanged(checked: boolean, permissions: string[], subPermissions: string[]) {
  console.log('onChange sub', checked, permissions)
  if (checked) {
    emit('change',
      checked,
      [...permissions, ...subPermissions],
    )
  }
  else {
    emit('change',
      checked,
      subPermissions,
    )
  }
}
</script>

<template>
  <template
    v-for="(option, index) in options"
    :key="index"
  >
    <template v-if="option.type === 'view'">
      <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          <div :class="`ml-${(viewLayer ?? 0) * 4}`">
            <label class="font-medium text-gray-700 ml-4">{{
              option.label
            }}</label>
          </div>
        </td>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          <input
            :id="index"
            v-model="option.checked"
            type="checkbox"
            class="
                focus:ring-primary-500
                h-4
                w-4
                text-primary-600
                border-gray-300
                rounded
              "
            :readonly="readonly"
            :disabled="readonly"
            :checked="selected && option.value.every(permission => selected.includes(permission))"
            @change="(e) => { onChange(e, option) }"
          >
        </td>
        <template v-if="option.subOptions">
          <template v-for="type in ['create', 'update', 'deactivate', 'publish']" :key="type">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              <template v-if="option.subOptions.find(o => o.type === type)">
                <input
                  :id="index"
                  v-model="option.subOptions.find(o => o.type === type).checked"
                  type="checkbox"
                  class="
                    focus:ring-primary-500
                    h-4
                    w-4
                    text-primary-600
                    border-gray-300
                    rounded
                  "
                  :readonly="readonly"
                  :disabled="readonly || !(selected && option.value.every(permission => selected.includes(permission)))"
                  :checked="selected && option.subOptions.find(o => o.type === type).value.every(permission => selected.includes(permission))"

                  @change="(e) => { onSubColumnChange(e, option, option.subOptions.find(o => o.type === type)) }"
                >
              </template>
            </td>
          </template>
        </template>
      </tr>
    </template>
    <template v-if="option.subOptions">
      <PermissionTree
        :options="option.subOptions" :readonly="readonly" :selected="selected" :view-layer="(viewLayer ?? 0) + 1"
        @change="(checked, subPermissions) => onSubOptionChanged(checked, option.value, subPermissions)"
      />
    </template>
  </template>
</template>
