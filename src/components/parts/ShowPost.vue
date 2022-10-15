<script setup lang="ts">
import { TrashIcon, PencilAltIcon, ArrowNarrowRightIcon } from '@heroicons/vue/solid'

const cookieTaken = (sKey: string) => {
  const aKeys = document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$/"), "$1")
  return aKeys
}

const tokenUserId = cookieTaken('userId')

const props = defineProps({
  type: String,
  id: String,
  title: String,
  content: String,
  userId: String,
  userName: String,
  dateTime: String,
})

</script>

<template>
  <section aria-labelledby="action-title" class="pb-6 px-4 sm:px-6 lg:pb-6 lg:px-0 lg:row-start-1 lg:col-start-1">
    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div class="grid grid-cols-6 gap-4 px-4 py-4 sm:px-6">
          <h2 id="notes-title" class="col-start-1 col-end-5 text-2xl font-semibold font-Inter text-gray-900">
            {{props.title}}
          </h2>
          <div v-if=" props.userId===tokenUserId"
            class="col-end-7 col-span-2 relative flex justify-end whitespace-nowrap  text-right text-sm font-medium">
            <button class="flex justify-center  text-gray-400 hover:text-gray-900" @click="">
              <TrashIcon class="h-6 w-6 mx-2" aria-hidden="true" /><span class="sr-only">{{ props.id
              }}</span>
            </button>
            <button class="flex justify-center  text-gray-400 hover:text-gray-900"
              @click="$router.push(`/write/${props.id}`)">
              <PencilAltIcon class="h-6 w-6 mx-2" aria-hidden="true" /><span class="sr-only">{{ props.id
              }}</span>
            </button>
          </div>
        </div>
        <div class="px-4 py-2 sm:px-6">
          <ul role="list">
            <li>
              <div class="text-base font-normal font-Inter text-gray-400">
                {{props.userName}} - {{props.dateTime}}
              </div>
            </li>
            <li class="pt-2 pb-4">
              <div v-if="props.type==='content'" class="space-x-3 text-xl font-light font-Inter whitespace-pre-line">
                {{props.content}}
              </div>
              <div v-else-if="props.type==='frontPage'" class="space-x-3 text-xl font-light font-Inter">
                <p class="line-clamp-2">{{props.content}}</p>
              </div>
              <div v-if="props.type==='frontPage'" class="grid grid-cols-5 justify-items-end grep-4">
                <button
                  class="col-end-6 col-span-1 mx-0 my-0  text-base font-normal text-indigo-700 hover:text-indigo-400"
                  @click="$router.push(`/show/${props.id}`)">
                  <div
                    class="relative border-b border-indigo-700 hover:text-indigo-400 flex justify-center pb-5 sm:pb-0">
                    閱讀更多
                    <ArrowNarrowRightIcon class="ml-2 h-5 w-5 pt-1 leading-6" aria-hidden="true" />
                  </div>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
