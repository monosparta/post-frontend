<script setup lang="ts">
const post = usePostStore()
const userId = useUserStore()
let BulletinSectionHeaderTitle = ref('')

//我的文章顯示
BulletinSectionHeaderTitle.value = '我的文章';

onMounted(async () => {
  post.clearPosts()
  await post.getUserPosts(userId.userData.id)
})

</script>

<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <PostTab :title="BulletinSectionHeaderTitle" />
      <BulletinSectionHeaderForPost :title="BulletinSectionHeaderTitle" :needButton="true" />
      <div v-if="!post.list">
        <Empty />
      </div>
      <div v-else-if="post.list" class="mt-6">
        <div v-for="posts in post.list" :key="posts.id">
          <ShowPost :id="posts.id" :title="posts.title" :content="posts.content" :userId="posts.user.id"
            :userName="posts.user.name" :dateTime="posts.created_at" type="frontPage" />
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