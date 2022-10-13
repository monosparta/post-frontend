<script setup lang="ts">
import PostTab from '~/components/parts/PostTab.vue';
// import { ChevronDownIcon, TrashIcon } from '@heroicons/vue/solid'
const bulletinSectionHeader = useBulletinSectionHeaderStore()

bulletinSectionHeader.createNotification({
  type: 'button',
  title: '文章模組',
})

</script>

    <!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- <div class="px-4 sm:px-6 lg:px-8 mt-4 "> -->
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <PostTab />
      <BulletinSectionHeaderForPost v-if="bulletinSectionHeader.notificationStatus"
        :title="bulletinSectionHeader.notification.title" :type="bulletinSectionHeader.notification.type" />
      <Empty />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

