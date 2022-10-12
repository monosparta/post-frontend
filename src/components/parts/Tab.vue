<script setup lang="ts">
const tabs = [
  { name: '文章首頁', href: '#', current: true },
  { name: '我的文章', href: '#', current: false },
  { name: '後台列表', href: '#', current: false },
]
</script>

<template>
    <div class="relative border-b border-gray-200 pb-5 sm:pb-0">
      <div>
        <div class="sm:hidden">
          <label for="current-tab" class="sr-only">Select a tab</label>
          <select id="current-tab" name="current-tab"
            class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
            <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav class="-mb-px flex space-x-8">
            <a v-for="tab in tabs" :key="tab.name" :href="tab.href"
              :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm']"
              :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</a>
          </nav>
        </div>
      </div>
    </div>
</template>
