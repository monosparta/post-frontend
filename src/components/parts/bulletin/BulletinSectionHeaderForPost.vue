<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/solid'
import { useRouter } from 'vue-router'
const props = defineProps({
  needButton: Boolean,
  title: String,
})

const router = useRouter()

const write = () => {
  router.push({ path: '/write' })
}
</script>

<template>
  <!-- <div class=" pb-2 sm:pb-0  mt-4"> -->
  <div class="grid grid-cols-3">
    <h3 class="text-xl font-semibold self-center text-gray-800 col-span-2">
      {{ props.title }}
    </h3>
    <div v-if="props.needButton" class="col-end-4 col-span-1 flex flex-row-reverse">
      <button
        type="button"
        class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        @click="write()"
      >
        <PlusIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        新增文章
      </button>
    </div>
  </div>
  <!-- </div> -->
</template>
