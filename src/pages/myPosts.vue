<script setup lang="ts">
const posts = usePostStore()
const userId = useUserStore()
let BulletinSectionHeaderTitle = ref('')

//我的文章顯示
BulletinSectionHeaderTitle.value = '我的文章';

onMounted(async () => {
  posts.clearPosts()
  await posts.getUserPosts(userId.userData.id)
})

</script>

<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <PostTab :title="BulletinSectionHeaderTitle" />
      <BulletinSectionHeaderForPost :title="BulletinSectionHeaderTitle" :needButton="true" />
      <div v-if="posts.userPostList.posts.length===0">
        <Empty />
      </div>
      <div v-else-if="posts.list" class="mt-6">
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
</route>