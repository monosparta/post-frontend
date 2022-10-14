<script setup lang="ts">
import { toRef,h } from 'vue'
import { useField } from 'vee-validate'
import type { BaseSchema } from 'yup' 

interface Option {
  label: string
  value: string | number | Option[]
}

const props = defineProps<{ 
  options: Option[] 
  readonly? : boolean
}>()
 

function updateNodeChildrenChecked(option: Option, checked: boolean) {
  if (Array.isArray(option.value)) {
    option.value.forEach((option) => {
      option.checked = checked
      updateNodeChildrenChecked(option, checked)
    })
  }else{
    option.checked = checked
  }
}

function onTreeNodeChange(e: Event , option: {
  label: string
  value: Option[]
  checked: boolean
}) {
  const target = (<HTMLInputElement>e.target)
  console.log('onTreeNodeChange', target.checked,option)
  updateNodeChildrenChecked(option, target.checked)  
}

function calTreeNodeChecked(option: {
  label: string
  value: Option[]
  checked: boolean
}) {

  if(option.label==='admin'){
    console.log('calTreeNodeChecked',option.value)
  }

  const checked = option.value.every((o) => {
      return o.checked
    })  
  option.checked = checked
  return checked
}


function calTreeNodeIndeterminate(option: {
  label: string
  value: Option[]
  checked: boolean
}) { 

  const checked = option.value.filter((o) => {
      return o.checked
    })

    
  if(option.label==='admin'){
    console.log('calTreeNodeIndeterminate',checked,checked.length > 0 && checked.length < option.value.length)
  }
 
  return checked.length > 0 && checked.length < option.value.length
}
 
</script>

<template> 
  <div role="group" aria-labelledby="label-email">
    <div :class="'space-y-4 max-w-lg'">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="relative items-start"
      >
        <template v-if=" Array.isArray(option.value)">
          <div class="flex items-center">
            <input
              :id="`${name}-${index}`"
              v-model="option.checked"
              type="checkbox"
              :name="name"
              class="
                focus:ring-primary-500
                h-4
                w-4
                text-primary-600
                border-gray-300
                rounded
              "
              :checked="calTreeNodeChecked(option)"
              :indeterminate="calTreeNodeIndeterminate(option)"
              @change="(e) => {onTreeNodeChange(e,option)}"
              :readonly="readonly"
              :disabled="readonly"
            >
            <label :for="`${name}-${index}`" class="font-medium text-gray-700 ml-4">{{
              option.label
            }}</label>
          </div>
          <div :class="'ml-8 mt-4'">
            <CheckboxTree :options="option.value" :readonly="readonly" /> 
          </div>
        </template>
        <template v-else>
          <div class="flex items-center">
            <input
              :id="`${name}-${index}`"
              v-model="options[index].checked"
              type="checkbox"
              :name="name"
              class="
              focus:ring-primary-500
              h-4
              w-4
              text-primary-600
              border-gray-300
              rounded
            "
              :indeterminate="false"
              :readonly="readonly"
              :disabled="readonly"
            >
            <label :for="`${name}-${index}`" class="font-medium text-gray-700 ml-4">{{
              option.label
            }}</label>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
