<script setup lang="ts">
const posts = usePostStore()
let bulletinSectionHeaderTitle = ref('')

// 初始顯示與文章首頁顯示
bulletinSectionHeaderTitle.value = '文章首頁'
onMounted(async () => {
  posts.clearPosts()
  await posts.getPosts()
})

</script>

<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <PostTab :title="bulletinSectionHeaderTitle" />
      <BulletinSectionHeaderForPost :title="bulletinSectionHeaderTitle" :needButton="true" />
      <div v-if="!posts.list">
        <Empty />
      </div>
      <div v-else class="mt-6">
        <div v-for="post in list" :key="post.id">
          <ShowPost :id="post.id" :title="post.title" :content="post.content" :userId="post.user.id"
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
</route>