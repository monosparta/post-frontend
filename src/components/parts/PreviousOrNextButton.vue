<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/outline'
const props = defineProps({
  type: String,
  postId: String,
  title: String,
  author: String,
  createDate: String,
})
</script>

<template>
  <div class="flex flex-col gap-4" :class="[props.type === 'Previous' ? 'pr-9 items-start' : 'pl-9 items-end']">
    <dt class="text-lg font-normal text-gray-900 flex gap-4">
      <ArrowLeftIcon v-if="props.type === 'Previous' && props.title !== ''" class="h-6 w-6" />
      <p v-if="props.title !== ''">
        {{ props.type }}
      </p>
      <ArrowRightIcon v-if="props.type === 'Next' && props.title !== ''" class="h-6 w-6" />
    </dt>
    <dd
      class="flex flex-col items-baseline text-left gap-2 w-fit max-w-full"
      :class="[props.type === 'Previous' ? ' pl-10' : 'pr-10']"
    >
      <div class="text-2xl font-semibold text-gray-600 w-fit max-w-full truncate">
        {{ props.title }}
      </div>
      <div v-if="props.title !== ''" class="md:text-base sm:text-sm font-light text-gray-500">
        {{ props.author }} ・ {{ props.createDate }}
      </div>
    </dd>
  </div>
</template>
