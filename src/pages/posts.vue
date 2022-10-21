<script setup lang="ts">
const posts = usePostStore()

onMounted(async () => {
  posts.clearPosts()
  await posts.getPosts()
})

</script>

<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <PostTab />
      <BulletinSectionHeaderForPost title="文章首頁" :needButton="true" />
      <div v-if="posts.listCheckStatus===-1">
        <PageLoading />
      </div>
      <div v-else-if="posts.listCheckStatus===0">
        <Empty />
      </div>
      <div v-else-if="posts.listCheckStatus===200" class="mt-6">
        <div v-for="post in posts.list" :key="post.post_id">
          <ShowPost :id="post.post_id" :title="post.title" :content="post.content" :userId="post.user.user_id"
            :userName="post.user.name" :dateTime="post.created_at" type="frontPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: posts
  activeMenuName: '文章首頁'
  title: '文章首頁'
</route>