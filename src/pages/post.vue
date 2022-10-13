<script setup lang="ts">
import PostTab from '~/components/parts/PostTab.vue';
const bulletinSectionHeader = useBulletinSectionHeaderStore()

bulletinSectionHeader.createNotification({
  type: 'button',
  title: '文章模組',
})

</script>

<template>
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

