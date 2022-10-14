<script setup lang="ts">
import type { Component, Ref } from 'vue'
import { get, has, snakeCase } from 'lodash'
import { useRouter } from 'vue-router'

const props = defineProps<{
  item: any
  action: { action: (item: any) => void; icon: any; name: string; if?: (item: any) => Ref<boolean> ; as?: (item: any) => String | Component }
}>()

const item = toRef(props, 'item')
const ifRef = props.action.if ? props.action.if(item) : ref(true)

const router = useRouter()
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    v-if="ifRef"
    class="inline-block
    items-center
    bg-white
    text-gray-500
    hover:bg-gray-50
    border-y
    border-gray-400
    first:rounded-l-md first:border-l
    last:rounded-r-md border-r"
  >
    <Component
      :is="props.action.as(item)"
      v-if="props.action.as"
    />
    <button
      v-else
      type="button"
      class="p-2 text-sm font-medium"
      @click="action.action(item)"
    >
      <span class="sr-only">{{ action.name }}</span>
      <Component
        :is="action.icon"
        class="h-5 w-5"
        aria-hidden="true"
      />
    </button>
  </div>
</template>
