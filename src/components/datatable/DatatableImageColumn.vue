<script setup lang="ts">
import Vue from 'vue'
import {
  PhotographIcon,
} from '@heroicons/vue/24/solid'

const props = defineProps<{
  img: any
  fallback?: any
}>()
</script>

<template>
  <img v-if="img" class="h-12 w-12 rounded-md" :src="img.signedUrl">
  <component :is="fallback" v-else-if="fallback" aria-hidden="true" />
  <PhotographIcon :is="fallback" v-else class="h-12 w-12 text-white bg-gray-400 rounded-md p-1" aria-hidden="true" />
</template>
