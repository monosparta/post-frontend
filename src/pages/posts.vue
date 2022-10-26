<script setup lang="ts">
const posts = usePostStore()

onMounted(async () => {
  posts.clearPosts()
  await posts.getPosts()
})
</script>

<template>
  <div class="my-6 mx-16 flex flex-col gap-6">
    <PostTab />
    <BulletinSectionHeaderForPost title="文章首頁" :need-button="true" />
    <div v-if="posts.listCheckStatus === -1">
      <PageLoading />
    </div>
    <div v-else-if="posts.listCheckStatus === 0">
      <Empty />
    </div>
    <div v-else-if="posts.listCheckStatus === 200" class="flex flex-col gap-6">
      <div v-for="post in posts.list" :key="post.post_id">
        <ShowPost
          :id="post.post_id" :title="post.title" :content="post.content" :user-id="post.user.user_id"
          :user-name="post.user.name" :date-time="post.created_at" type="frontPage"
        />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: posts
  activeMenuName: 文章首頁
  title: 文章首頁
</route>
