<script setup lang="ts">
const post = usePostStore()

onMounted(async () => {
  post.clearPost()
  await post.getPosts()
})

</script>

<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <PostTab />
      <BulletinSectionHeaderForPost :title="'文章模組'" :needButton="true" />
      <div v-if="!post.list">
        <Empty />
      </div>
      <div v-else-if="post.list" class="mt-6">
        <div v-for="posts in post.list" :key="posts.id">
          <ShowPost :id="posts.id" :title="posts.title" :content="posts.content" :userId="posts.user.id"
            :userName="posts.user.name" :dateTime="posts.created_at" :type="'frontPage'" />
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

