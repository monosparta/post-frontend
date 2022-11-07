<script setup lang="ts">
const posts = usePostStore()
// const user = useUserStore()

const userId = localStorage.getItem('id')!

onMounted(async () => {
  posts.clearPosts()
  await posts.getUserPosts(userId)
})
</script>

<template>
  <div class="my-6 mx-16 flex flex-col gap-6">
    <PostTab />
    <BulletinSectionHeaderForPost title="我的文章" :need-button="true" />
    <div v-if="posts.userPostListCheckStatus === -1">
      <PageLoading />
    </div>
    <div v-if="posts.userPostListCheckStatus === 0">
      <Empty />
    </div>
    <div v-if="posts.userPostListCheckStatus === 200" class="flex flex-col gap-6">
      <div v-for="post in posts.userPostList.posts" :key="post.post_id">
        <ShowPost
          :id="post.post_id" :title="post.title" :content="post.content" :user-id="posts.userPostList.user_id"
          :user-name="posts.userPostList.name" :date-time="post.created_at" type="frontPage"
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
  title: 我的文章
</route>
