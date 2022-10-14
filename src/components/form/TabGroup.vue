<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'
import type { BaseSchema } from 'yup'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'

import FormUserSelect from '@/views/Notification/FormUserSelect.vue'
import FormMultiUserFilter from '@/views/Notification/FormMultiUserFilter.vue'

const props = defineProps<{
  layout?: string
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  tabs: Array<{ label: string; tabPanel: Node ; disabled?: boolean }>
  initialValue?: number
}>()

const { value, errorMessage, setValue } = useField<number>(
  props.name,
  props.rules ?? undefined,
  { initialValue: props.initialValue ?? 0 },
)

onMounted(() => {
  console.log('=== TabGroup onMounted ===', props.tabs)
})
</script>

<template>
  <div role="group" aria-labelledby="label-email">
    <TabGroup
      :selected-index="value"
      @change="setValue($event)"
    >
      <TabList class="flex space-x-8">
        <Tab
          v-for="(tab, idx) in tabs"
          :key="idx"
          v-slot="{ selected }"
          as="template"
          :disabled="('disabled' in tab) ? tab.disabled : false"
        >
          <button
            type="button"
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" :class="[selected ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          >
            {{ tab.label }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(tab, idx) in tabs"
          :key="idx"
          class="p-3"
        >
          <component :is="tab.tabPanel" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
