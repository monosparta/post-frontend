<script setup lang="ts">
const user = useUserStore()
const route = useRoute()
const post = usePostStore()
const modal = useModalStore()
const titleInput = ref('')
const contentInput = ref('')
let modalType = ref('')
const postId = route.params.id as string

const checkPostEmpty = async () => {
  if (titleInput.value == '' || contentInput.value == '') {
    modalType.value = 'information'
    modal.createNotification({
      type: 'warning',
      text: '標題或內文欄位不可以空白喔！',
      postId: '',
    })
  } else {
    modalType.value = 'check'
    modal.createNotification({
      type: 'add',
      text: '確定修改該篇文章？',
      postId: '',
    })
  }
}

const setData = async () => {
  await post.getPost(postId)
  titleInput.value = post.info.title
  contentInput.value = post.info.content
}

onMounted(async () => {
  await setData()
  if (post.info.user.user_id !== user.userData.id) {
    user.logout()
  }
})

const confirmPost = async () => {
  modalType.value = 'loading'
  const title = titleInput.value
  const content = contentInput.value

  await post.updatePost(postId, { title, content })
  if (post.returnInfo.status === 200) {
    modalType.value = 'information'
    modal.createNotification({
      type: 'update',
      text: '已修改該篇文章！',
      postId: post.returnInfo.data.post_id,
    })
  } else {
    modalType.value = 'information'
    modal.createNotification({
      type: 'warning',
      text: `修改失敗！失敗狀態為：${post.returnInfo.status}`,
      postId: '',
    })
  }
}
</script>

<template>
  <div class="mt-4 mx-16 mb-4">
    <div class="flex flex-col">
      <BulletinSectionHeaderForPost title="編輯文章" :needButton="false" />
      <main class="auto-cols-min">
        <div class="mt-4 h-10">
          <input id="title" name="title" type="txt" autocomplete="title" placeholder="請輸入文章標題"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            v-model="titleInput" />
        </div>
        <div class="mt-4">
          <textarea rows="4" name="comment" id="comment"
            class="h-[576px] block w-full rounded-md border-gray-300 shadow-sm  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="請輸入文章內容" v-model="contentInput"></textarea>
        </div>
        <WriteButton buttonShow="修改文章" @click="checkPostEmpty()" />
      </main>
      <Check v-if="modalType==='check' && modal.notificationStatus===true" :text="modal.notification.text"
        :type="modal.notification.type" @click="modal.closeNotification" @confirm="confirmPost()" />
      <LoadingModal v-if="modalType === 'loading'" />
      <Information v-if="modalType==='information' && modal.notificationStatus===true" :text="modal.notification.text"
        :postId="modal.notification.postId" :type="modal.notification.type" @click="modal.closeNotification" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: posts
</route>

