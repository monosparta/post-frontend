<script setup lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'
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
    default: 5,
  },

  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
})
const emit = defineEmits(['clickLeft', 'clickRight', 'clickPage'])
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

<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <button
        class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        :disabled="first"
        :class="{ 'opacity-30': first }"
        @click="clickLeft"
      >
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />Previous
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <button
        v-for="page in pageList" :key="(page) ? page : 0" class="w-10" :index="page" :class="{
          'inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600': props.currentPage === page,
          'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700': props.currentPage !== page,
        }" @click="clickPage(page)"
      >
        {{ page }}
      </button>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        :disabled="last"
        :class="{ 'opacity-30': last }"
        @click="clickRight"
      >
        Next
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>
