<script setup lang="ts">
const post = usePostStore()
const bulletinSectionHeader = useBulletinSectionHeaderStore()

onMounted(async () => {
  await post.getPosts()
})

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
      <div v-if="!post.list">
        <Empty />
      </div>
      <div v-else-if="post.list" class="mt-6">
        <div v-for="posts in post.list" :key="posts.id">
          <ShowPost :id="posts.id" :title="posts.title" :content="posts.content" :userId="posts.user.id"
            :userName="posts.user.name" :dateTime="posts.created_at" :type1="'frontPage'" :type2="''" />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

