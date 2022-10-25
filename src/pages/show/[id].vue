<script setup lang="ts">
const post = usePostStore()
const route = useRoute()
const postId = route.params.id as string
let pageStats
  = reactive({ type: '', postId: '', title: '', author: '', createDate: '' })

const pageStatsAll
  = reactive([
    { type: '', postId: '', title: '', author: '', createDate: '' },
    { type: '', postId: '', title: '', author: '', createDate: '' },
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

const getList = async () => {
  const userPosts = post.userPostList
  const index = userPosts.posts.findIndex(post => post.post_id === postId)

  if (index === 0) {
    getPageStats({ type: 'Previous', postId: '', title: '', author: '', createDate: '' }, 0)

    if (userPosts.posts.length === 1)
      getPageStats({ type: 'Next', postId: '', title: '', author: '', createDate: '' }, 1)
    else
      getPageStats({ type: 'Next', postId: userPosts.posts[index + 1].post_id, title: userPosts.posts[index + 1].title, author: userPosts.name, createDate: userPosts.posts[index + 1].created_at }, 1)
  }
  else if (index > 0) {
    getPageStats({ type: 'Previous', postId: userPosts.posts[index - 1].post_id, title: userPosts.posts[index - 1].title, author: userPosts.name, createDate: userPosts.posts[index - 1].created_at }, 0)

    if (userPosts.posts.length - 1 === index)
      getPageStats({ type: 'Next', postId: '', title: '', author: '', createDate: '' }, 1)
    else
      getPageStats({ type: 'Next', postId: userPosts.posts[index + 1].post_id, title: userPosts.posts[index + 1].title, author: userPosts.name, createDate: userPosts.posts[index + 1].created_at }, 1)
  }
}

onMounted(async () => {
  post.clearPosts()
  await post.getPost(postId)
  await post.getUserPosts(post.info.user.user_id)
  await getList()
})
</script>

<template>
  <div class="mt-6 mx-16 mb-9 flex flex-col gap-9">
    <ShowPost
      :id="post.info.post_id" :title="post.info.title" :content="post.info.content"
      :user-id="post.info.user.user_id" :user-name="post.info.user.name" :date-time="post.info.created_at"
      type="content"
    />
    <div v-if="post.userPostList.posts.length !== 1">
      <dl class="grid grid-cols-1 divide-y divide-gray-400  md:grid-cols-2 md:divide-y-0 md:divide-x gap-9">
        <div
          v-for="item in pageStatsAll"
          :key="item.type"
          class="w-full hover:text-indigo-300"
          :class="[item.type === 'Previous' ? 'justify-self-start' : 'justify-self-end']"
        >
          <button
            class="w-full "
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

