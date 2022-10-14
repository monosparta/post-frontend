<script setup lang="ts">
import { useField } from 'vee-validate'
import {
  QuestionMarkCircleIcon,
  SearchCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'
import type { BaseSchema } from 'yup'
const props = defineProps<{
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  clearable?: boolean
  initialValue?: any
  readonly?: boolean
  multiple?: boolean
  limit?: number
}>()

const isDragOver = ref(false)
const isInitialValueLoaded = ref(false)
const previews = ref<string[]>([])

const { value, errorMessage, resetField, handleChange, setValue, meta }
  = useField(props.name, props.rules ?? undefined)
const isDirty = computed(() => meta.dirty)

onMounted(() => {
  console.log('===== onMounted =====', props)
  if (props.initialValue)
    isInitialValueLoaded.value = true
})

function onDragOver(e) {
  isDragOver.value = true
}

function onDragLeave(e) {
  isDragOver.value = false
}

function onDrop(e) {
  console.log('=== onDrop ===', e.dataTransfer.files)
  const files = Array.from(e.dataTransfer.files as FileList)

  if (props.multiple) {
    const newFiles = files
    const newPreviews = newFiles.map(file => URL.createObjectURL(file))
    previews.value = [...previews.value, ...newPreviews]
    setValue(value ? [...value, ...newFiles] : newFiles)
  }
  else {
    const file = files[0]
    previews.value = [URL.createObjectURL(file)]
    setValue(file)
  }
}

function onSelectFile(e) {
  console.log('=== onSelectFile ===', e.target.files)

  const files = Array.from(e.target.files as FileList)
  if (props.multiple) {
    previews.value = files.map(f => URL.createObjectURL(f))
    setValue(files)
  }
  else {
    const file = files[0]
    previews.value = [URL.createObjectURL(file)]
    setValue(file)
  }
}

const shouldShowError = computed(() => {
  return ((!props.initialValue) || (props.initialValue && isDirty.value)) && errorMessage.value
})
</script>

<template>
  <div id="preview" class="flex justify-center">
    <img v-for="(preview, index) in previews" :key="index" :src="preview" class="h-32 w-auto">
  </div>
  <div v-if="!readonly" class="sm:items-start sm:pt-5">
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div
        class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        :class="[
          isDragOver && 'border-primary-600',
          shouldShowError && 'border-red-600',
        ]"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
      >
        <div class="space-y-1 text-center">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="flex text-sm text-gray-600">
            <label
              for="file-upload"
              class="
                relative
                cursor-pointer
                bg-white
                rounded-md
                font-medium
                text-indigo-600
                hover:text-indigo-500
                focus-within:outline-none
                focus-within:ring-2
                focus-within:ring-offset-2
                focus-within:ring-indigo-500
              "
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                accept="image/png, image/jpeg, image/jpg"
                name="file-upload"
                type="file"
                class="sr-only"
                :multiple="multiple"
                @change="onSelectFile"
              >
            </label>
            <p class="pl-1">
              or drag and drop
            </p>
          </div>
          <p class="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  </div>
  <p
    v-if="shouldShowError"
    id="email-error"
    class="mt-2 text-sm text-red-600"
  >
    {{ errorMessage }}
  </p>
</template>
