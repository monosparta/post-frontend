<script setup lang="ts">
import { useField } from 'vee-validate'

import Uppy from '@uppy/core'
import AwsS3Multipart from '@uppy/aws-s3-multipart'
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import { DragDrop, ProgressBar } from '@uppy/vue'
import type { BaseSchema } from 'yup'

const props = defineProps<{
  label: string
  name: string
  as: string
  type: string
  rules?: BaseSchema
  limit?: number
  clearable?: boolean
  initialValue?: any
  disabled?: boolean
}>()

const isDragOver = ref(false)
const isInitialValueLoaded = ref(false)
const previewUrl = ref<string | null>(null)

const { value, errorMessage, resetField, handleChange, setValue, meta }
  = useField(props.name, props.rules ?? undefined)
const isDirty = computed(() => meta.dirty)
const uploadedFile = ref<any[]>([])

onMounted(() => {
  console.log('===== onMounted =====', props)
  if (props.initialValue) {
    uploadedFile.value = props.initialValue
    isInitialValueLoaded.value = true
  }
})

watch(uploadedFile, (value) => {
  console.log('===== uploadedFile =====', value)
})

const onUploadSuccess = elForUploadedFiles => (file, response) => {
  const url = response.uploadURL
  const fileUrl = response.uploadURL.replace(/(.*)amazonaws.com\//, '')
  const fileName = file.name

  const limit = props.limit ?? 1

  console.log('=== file upload decodeURIComponent ===', {
    url,
    fileUrl: decodeURIComponent(fileUrl),
    fileName,
  })

  uploadedFile.value.push({
    url,
    fileUrl: decodeURIComponent(fileUrl),
    fileName,
  })

  if (uploadedFile.value.length > limit)
    uploadedFile.value.shift()

  value.value = uploadedFile.value

  console.log('===== fileUrl =====', fileUrl)
}
const uppy = new Uppy({
  autoProceed: true,
  locale: {
    strings: {
      dropHereOr: '%{browse} or drag and drop',
      // Used as the label for the link that opens the system file selection dialog.
      browse: 'Upload a file ',
    },
  },
}).use(AwsS3Multipart, {
  limit: props.limit ?? 1,
  companionUrl: `${import.meta.env.VITE_APP_API_URL}`,

}).on('upload-success', onUploadSuccess('.uploaded-files ol'))
</script>

<template>
  <div>
    <DragDrop
      v-if="!disabled"
      :uppy="uppy"
    />
    <ProgressBar
      :uppy="uppy"
    />
    <div class="uploaded-files">
      <h5 :class="[errorMessage ? 'text-red-500' : 'text-black']">
        Uploaded files:
      </h5>
      <ol>
        <li v-for="file in uploadedFile" :key="file.url">
          <a :href="file.url" target="_blank">{{ file.fileUrl || file.fileName }}</a>
        </li>
      </ol>
    </div>
  </div>
  <p
    v-if="errorMessage"
    id="email-error"
    class="mt-2 text-sm text-red-600"
  >
    {{ errorMessage }}
  </p>
</template>
