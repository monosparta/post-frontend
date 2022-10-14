<script setup lang="ts">
import { TrashIcon, PencilAltIcon } from '@heroicons/vue/solid'
import VueMarkdown from 'vue-markdown'

const cookieTaken = (sKey: string) => {
  const aKeys = document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$/"), "$1")
  return aKeys
}

const tokenUserId = cookieTaken('userId')

const props = defineProps({
  type1: String,
  type2: String,
  id: String,
  title: String,
  content: String,
  userId: String,
  userName: String,
  dateTime: String,
})
// const uid = ref('1')
const takeconent = props.content.replace(/\n/g, '<br/>')
console.log(props.type1);
console.log(takeconent);

</script>

<template>
  <section aria-labelledby="action-title" class="pb-6 px-4 sm:px-6 lg:pb-6 lg:px-0 lg:row-start-1 lg:col-start-1">
    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div class="grid grid-cols-6 gap-4 pl-6 pr-4 py-4 sm:px-6">
          <h2 id="notes-title" class="col-start-1 col-end-5 text-2xl font-semibold font-Inter text-gray-900">
            {{props.title}}
          </h2>
          <div v-if="props.type2==='personal' || props.userId===tokenUserId"
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
                {{userName}} - {{props.dateTime}}
              </div>
            </li>
            <li class="pt-2 pb-4">
              <div v-if="props.type1==='content'" class="space-x-3 text-xl font-light font-Inter">
                {{props.content}}
              </div>
              <div v-else-if="props.type1==='frontPage'" class="space-x-3 text-xl font-light font-Inter">
                <p class="line-clamp-2">{{props.content}}</p>
              </div>
              <div v-if="props.type1==='frontPage'" class="grid grid-cols-6 gap-4 mt-6">
                <button class="col-end-7 col-span-1 flex justify-center  text-blue-400 hover:text-blue-800"
                  @click="$router.push(`/show/${id}`)">
                  閱讀更多......
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
