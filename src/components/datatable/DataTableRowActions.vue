<script setup lang="ts">
import type { Component, Ref } from 'vue'
import { get, has, snakeCase } from 'lodash'
import { useRouter } from 'vue-router'
import DataTableRowActionsButton from './DataTableRowActionsButton.vue'

const props = defineProps<{
  item: any
  actions: { action: (item: any) => void; icon: any; name: string; if?: (item: any) => Ref<boolean> ; as?: (item: any) => String | Component }[]

}>()

const router = useRouter()
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="relative z-10">
    <template v-for="(action, index) in actions" :key="index">
      <DataTableRowActionsButton :item="item" :action="action" />
    </template>
  </div>
</template>
