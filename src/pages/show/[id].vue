<script setup lang="ts">
const post = usePostStore()
const route = useRoute()
const postId = route.params.id as string
onMounted(async () => {
  post.clearPosts()
  await post.getPost(postId)
})

</script>

<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <ShowPost :id="post.info.id" :title="post.info.title" :content="post.info.content" :userId="post.info.user.id"
        :userName="post.info.user.name" :dateTime="post.info.created_at" :type="'content'" />
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: app
  activeMenu: posts
</route>

