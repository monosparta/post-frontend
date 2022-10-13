<script setup lang="ts">
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { PlusIcon } from '@heroicons/vue/solid'
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()


const write = async () => {
  router.push({ path: '/write' })
}

// const write = async (titleHeader) => {
//   router.push({ 
//     name: 'write', // 即是 /user 
//     params: { 
//       ...route.titleHeader 
//      }
//    })
// }

const props = defineProps({
  type: String,
  title: String,
})

</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- <div class="relative pb-5 sm:pb-0  mt-4"> -->
  <div class=" pb-2 sm:pb-0  mt-4">
    <!-- <div class="md:flex md:items-center md:justify-between"> -->
    <div class="grid grid-cols-3">
      <!-- <h3 class="text-xl font-sedmibold text-gray-800">文章模組</h3> -->
      <h3 class="text-xl font-sedmibold text-gray-800 col-span-2">{{props.title}}</h3>
      <!-- <div v-if="props.type === 'button'" class="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0"> -->
      <div v-if="props.type === 'button'" class="col-end-4 col-span-1 flex flex-row-reverse">
        <button type="button"
          class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="write()">
          <PlusIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          新增文章
        </button>
      </div>
    </div>
  </div>

</template>
