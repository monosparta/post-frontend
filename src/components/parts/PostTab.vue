<script setup lang="ts">
const route = useRoute()
const select = ref('')
const tabs = [
  { name: '文章首頁', label: 'posts', href: '/posts', current: false },
  { name: '我的文章', label: 'myPosts', href: '/myPosts', current: false },
]

const router = useRouter()
const clickItem = (item: { name: string, label: string, href: string, current: boolean }) => {
  router.push({ path: item.href })
}

</script>

// TODO:手機頁面的選單要調整
<template>
  <div class="border-b border-gray-200 pb-5 sm:pb-0">
    <div>
      <div class="sm:hidden">
        <label for="current-tab" class="sr-only">Select a tab</label>
        <select id="current-tab" name="current-tab"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option v-for="tab in tabs" :key="tab.name" :selected="route.name === tab.label">{{
          tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8">
          <a v-for="tab in tabs" :key="tab.name"
            :class="[route.name === tab.label ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm']"
            :aria-current="route.name === tab.label ?'page' : undefined" @click="clickItem(tab)">{{ tab.name }}</a>
        </nav>
      </div>
    </div>
  </div>
</template>
