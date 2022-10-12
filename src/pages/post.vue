<script setup lang="ts">
import { ChevronDownIcon, TrashIcon } from '@heroicons/vue/solid'
const bulletinSectionHeader = useBulletinSectionHeaderStore()
const tabs = [
  { name: '文章首頁', href: '#', current: true },
  { name: '我的文章', href: '#', current: false },
  { name: '後台列表', href: '#', current: false },
]

bulletinSectionHeader.createNotification({
  type: 'button',
  title:'文章模組',
})

</script>

    <!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- <div class="px-4 sm:px-6 lg:px-8 mt-4 "> -->
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <Tab />
      <BulletinSectionHeader_2  v-if="bulletinSectionHeader.notificationStatus" :title="bulletinSectionHeader.notification.title" :type="bulletinSectionHeader.notification.type"/>
      <Empty />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

