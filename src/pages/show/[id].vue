<script setup lang="ts">
const post = usePostStore()
const route = useRoute()
const postId = route.params.id as string
let pageStats
  = reactive({ type: '', postId: '', title: '', author: '', createDate: '' })

const pageStatsAll
  = reactive([
    { type: 'Previous', postId: '', title: '', author: '', createDate: '' },
    { type: 'Next', postId: '', title: '', author: '', createDate: '' },
  ])

const getPageStats = (data: {
  type: string
  postId: string
  title: string
  author: string
  createDate: string
}, location: number) => {
  pageStats = data
  pageStatsAll.splice(location, 1, pageStats)
}

onMounted(async () => {
  post.clearPosts()
  await post.getPost(postId)
  getPageStats({ type: 'Previous', postId: post.post.previous.post_id, title: post.post.previous.title, author: post.post.data.user.name, createDate: post.post.previous.created_at }, 0)
  getPageStats({ type: 'Next', postId: post.post.next.post_id, title: post.post.next.title, author: post.post.data.user.name, createDate: post.post.next.created_at }, 1)
})
</script>

<template>
  <div class="mt-6 mx-4 md:mx-16 mb-9 flex flex-col gap-9">
    <ShowPost
      :id="post.info.post_id" :title="post.info.title" :content="post.info.content"
      :user-id="post.info.user.user_id" :user-name="post.info.user.name" :date-time="post.info.created_at"
      type="content"
    />
    <div v-if="post.userPostList.posts.length !== 1">
      <dl class="grid grid-cols-1 divide-y divide-gray-400  md:grid-cols-2 md:divide-y-0 md:divide-x">
        <div
          v-for="item in pageStatsAll"
          :key="item.type"
          class="w-full "
          :class="[item.type === 'Previous' ? 'justify-self-start' : 'justify-self-end']"
        >
          <button
            v-if="item.title !== ''"
            class="w-full hover:text-indigo-300"
            @click="$router.push(`/show/${item.postId}`)"
          >
            <PreviousOrNextButton :type="item.type" :post-id="item.postId" :title="item.title" :author="item.author" :create-date="item.createDate" />
          </button>
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

