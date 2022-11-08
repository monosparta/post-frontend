<script setup lang="ts">
const posts = usePostStore()
// const user = useUserStore()
const userId = localStorage.getItem('id')!

onMounted(async () => {
  posts.clearPosts()
  await posts.getUserPosts(userId)
})
const scrollTop = () => {
  window.scrollTo(0, 0)
}
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
      <div v-for="post in posts.userPostListPages[posts.meta.currentPage - 1]" :key="post.post_id">
        <ShowPost
          :id="post.post_id" :title="post.title" :content="post.content" :user-id="posts.userPostList.user_id"
          :user-name="posts.userPostList.name" :date-time="post.created_at" type="frontPage"
        />
      </div>
    </div>
    <PaginationForPost
      v-if="posts.meta.totalPages > 0"
      :total-pages="posts.meta.totalPages" :total="posts.meta.total" :per-page="posts.meta.perPage"
      :current-page="posts.meta.currentPage" @click-page="(data: number) => { scrollTop(); return posts.meta.currentPage = data }"
      @click-left="() => { scrollTop();return posts.meta.currentPage -= 1 }"
      @click-right="() => { scrollTop();return posts.meta.currentPage += 1 }"
    />
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: posts
  activeMenuName: 文章首頁
  title: 我的文章
</route>
