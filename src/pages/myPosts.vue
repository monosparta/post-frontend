<script setup lang="ts">
const posts = usePostStore()
// const user = useUserStore()

const userId = localStorage.getItem('id')!!

onMounted(async () => {
  posts.clearPosts()
  await posts.getUserPosts(userId)
})


</script>

<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <PostTab />
      <BulletinSectionHeaderForPost title="我的文章" :needButton="true" />
      <div v-if="posts.userPostListCheckStatus===-1">
        <PageLoading />
      </div>
      <div v-if="posts.userPostListCheckStatus===0">
        <Empty />
      </div>
      <div v-else-if="posts.userPostListCheckStatus===200" class="mt-6">
        <div v-for="post in posts.userPostList.posts" :key="post.post_id">
          <ShowPost :id="post.post_id" :title="post.title" :content="post.content" :userId="posts.userPostList.user_id"
            :userName="posts.userPostList.name" :dateTime="post.created_at" type="frontPage" />
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
  title: '我的文章'
</route>