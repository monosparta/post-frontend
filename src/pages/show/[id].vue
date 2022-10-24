<script setup lang="ts">
const post = usePostStore()
const route = useRoute()
const postId = route.params.id as string
onMounted(async () => {
  post.clearPosts()
  await post.getPost(postId)
})
const stats = [
  // { type: 'Previous', title: 'Lorem ipsum dolor sit amet.', author: 'HaHa', createDate: '2022-12-12 12:12:12' },
  { type: 'Previous', title: '', author: '', createDate: '' },
  { type: 'Next', title: 'Lorem ipsum dolor sit amet.', author: 'HaHa', createDate: '2022-12-12 12:12:12' },
]
</script>

<template>
  <div class="mt-6 mx-16 mb-9">
    <div class="flex flex-col">
      <ShowPost
        :id="post.info.post_id" :title="post.info.title" :content="post.info.content"
        :user-id="post.info.user.user_id" :user-name="post.info.user.name" :date-time="post.info.created_at"
        type="content"
      />
    </div>
    <div>
      <dl class="mt-5 grid grid-cols-1 divide-y divide-gray-400 rounded-lg  md:grid-cols-2 md:divide-y-0 md:divide-x">
        <div v-for="item in stats" :key="item.type">
          <PreviousOrNextButton :type="item.type" :title="item.title" :author="item.author" :create-date="item.createDate" />
        </div>
      </dl>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: posts
  activeMenuName: 文章首頁
  title: 文章內容
</route>

