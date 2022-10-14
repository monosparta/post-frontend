<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
    default: 1,
  },

  total: {
    type: Number,
    required: true,
    default: 1,
  },

  perPage: {
    type: Number,
    required: true,
    default: 10,
  },

  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },

  from: {
    type: Number,
    required: false,
    default: 1,
  },

  to: {
    type: Number,
    required: false,
    default: 1,
  },

})
const emit = defineEmits(['clickLeft', 'clickRight', 'clickPage', 'changePaginate'])
const perPageList = [
  {
    id: 1,
    name: '10',
    title: '10',
    value: '10',
    value_alt: '10',
    value_alt_2: '10',
    sequence: 1,
    is_enabled: true,
  },
  {
    id: 2,
    name: '25',
    title: '25',
    value: '25',
    value_alt: '25',
    value_alt_2: '25',
    sequence: 2,
    is_enabled: true,
  },
  {
    id: 3,
    name: '100',
    title: '100',
    value: '100',
    value_alt: '100',
    value_alt_2: '100',
    sequence: 3,
    is_enabled: true,
  },
]
const clickLeft = () => {
  emit('clickLeft')
}
const clickRight = () => {
  emit('clickRight')
}
const clickPage = (page: any) => {
  if (page === '...')
    return
  emit('clickPage', page)
}
const changePaginate = (paginate: any) => {
  emit('changePaginate', { id: parseInt(paginate.name), name: parseInt(paginate.name) })
}
const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, i) => start + i)
}
const first = computed(() => (props.currentPage === 1))
const last = computed(() => (props.currentPage === props.totalPages))
const pageList = computed(() => {
  const startPage = 1
  const endPage = props.totalPages

  if (props.totalPages <= 7)
    return range(startPage, endPage)

  const minPageCount = 5

  const defaultStartPageBoundary = minPageCount - startPage
  const defaultEndPageBoundary = (props.totalPages !== 8) ? endPage - minPageCount : endPage - minPageCount + 1

  const startPages
    = props.currentPage <= defaultStartPageBoundary
      ? range(startPage, minPageCount)
      : [startPage]
  const endPages
    = props.currentPage > defaultEndPageBoundary
      ? range(endPage - minPageCount + 1, endPage)
      : [endPage]

  const currentInMiddle
    = props.currentPage > defaultStartPageBoundary
      && defaultEndPageBoundary >= props.currentPage
      && props.currentPage !== props.totalPages
      ? props.currentPage
      : 0

  const siblingStart
    = currentInMiddle > defaultStartPageBoundary ? currentInMiddle - 1 : null
  const siblingEnd
    = currentInMiddle >= defaultStartPageBoundary + 1
      && defaultEndPageBoundary + 1 > currentInMiddle
      ? currentInMiddle + 1
      : 0
  return [
    ...startPages,
    currentInMiddle - startPage > 2 ? '...' : '',
    siblingStart,
    currentInMiddle,
    siblingEnd,
    props.totalPages - currentInMiddle > 2 ? '...' : '',
    ...endPages,
  ].filter(page => page)
})
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        href="#"
        :disabled="first"
        :class="{ 'opacity-30': first }"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click="clickLeft"
      >
        Previous
      </button>
      <button
        href="#"
        :disabled="last"
        :class="{ 'opacity-30': last }"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click="clickRight"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div class="flex items-center">
        <p class="text-sm text-gray-700 pr-4">
          Rows Per Page
        </p>
        <div class="flex items-center justify-start">
          <div class="">
            <SelectMenus :up="true" :data="perPageList" class="w-20" @select="((value: any) => changePaginate(value))" />
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex items-center pr-4">
          <p class="text-sm text-gray-700">
            Showing
            {{ ' ' }}
            <span class="font-medium">{{ props.from }}</span>
            {{ ' ' }}
            to
            {{ ' ' }}
            <span class="font-medium">{{ props.to }}</span>
            {{ ' ' }}
            of
            {{ ' ' }}
            <span class="font-medium">{{ props.total }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              :disabled="first"
              :class="{ 'opacity-30': first }"
              @click="clickLeft"
            >
              <span class="sr-only">Previous</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
            <!-- <a
              href="#" aria-current="page" :index="1"
              :class="{
                'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium': props.currentPage === 1,
                'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium': props.currentPage !== 1,
              }"
            >
              1 </a>

            <a
              v-if="props.totalPages > 1"
              href="#" :index="props.totalPages"
              :class="{
                'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium': props.currentPage === props.totalPages,
                'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium': props.currentPage !== props.totalPages,
              }"
            >
              {{ props.totalPages }} </a> -->
            <button
              v-for="page in pageList" :key="(page) ? page : 0" class="w-10" :index="page" :class="{
                'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative items-center px-auto py-2 border text-sm font-medium': props.currentPage === page,
                'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative items-center px-auto py-2 border text-sm font-medium': props.currentPage !== page,
              }" @click="clickPage(page)"
            >
              {{ page }}
            </button>
            <button
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              :disabled="last"
              :class="{ 'opacity-30': last }"
              @click="clickRight"
            >
              <span class="sr-only">Next</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
