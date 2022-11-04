<script setup lang="ts">
const route = useRoute()

const tabs = [
  { name: '文章首頁', label: 'posts', href: '/posts', current: false },
  { name: '我的文章', label: 'myPosts', href: '/myPosts', current: false },
]
const firstSelect = tabs.find(tab => tab.label === route.name)!
const selected = ref(firstSelect.name)

const router = useRouter()
const clickItem = (item: { name: string; label: string; href: string; current: boolean }) => {
  router.push({ path: item.href })
}

const onChange = (selected: string) => {
  const found = tabs.find(element => element.name === selected)!
  router.push({ path: found.href })
}
</script>

<template>
  <div class="border-b border-gray-200 pb-5 sm:pb-0">
    <div>
      <div class="sm:hidden">
        <label for="current-tab" class="sr-only">Select a tab</label>
        <select
          id="current-tab" v-model="selected"
          name="current-tab"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" @change="onChange(selected)"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="route.name === tab.label">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs" :key="tab.name"
            class="whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm" :class="[route.name === tab.label ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
            :aria-current="route.name === tab.label ? 'page' : undefined" @click="clickItem(tab)"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
