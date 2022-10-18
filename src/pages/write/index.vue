<script setup lang="ts">
const user = useUserStore()
const post = usePostStore()
const modal = useModalStore()
const titleInput = ref('')
const contentInput = ref('')
let modalType = ref('')

const checkPostEmpty = async () => {
  if (titleInput.value == '' || contentInput.value == '') {
    console.log('空的！');

    modalType.value = 'information'
    modal.createNotification({
      type: 'warning',
      text: '標題或內文欄位不可以空白喔！',
      postId: '',
    })
  } else {
    console.log('有資料');

    modalType.value = 'check'
    modal.createNotification({
      type: 'add',
      text: '確定新增 該篇文章？',
      postId: '',
    })
  }
}

const confirmPost = async () => {
  modalType.value = 'loading'
  const title = titleInput.value
  const content = contentInput.value
  const user_id = user.userData.id
  await post.createPost({ title, content, user_id })
  console.log(post.infoCheckStatus);

  // TODO:調整判斷 並將localStorage更換掉 Ｖ
  if (post.infoCheckStatus === 201) {
    modalType.value = 'information'
    modal.createNotification({
      type: 'add',
      text: '已發表該篇文章！',
      postId: post.info.id,
    })
  } else {
    modalType.value = 'information'
    modal.createNotification({
      type: 'warning',
      text: `新增失敗！ ${post.infoCheckStatus}`,
      postId: '',
    })
  }
}
</script>

<template>
  <div class="mt-4 mx-16 mb-4">
    <div class="flex flex-col">
      <BulletinSectionHeaderForPost title="新增文章" :needButton="false" />
      <main class="auto-cols-min">
        <div class="mt-4 h-10">
          <input id="title" name="title" type="txt" autocomplete="title" placeholder="Title write here"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            v-model="titleInput" />
        </div>
        <div class="mt-4">
          <textarea rows="4" name="comment" id="comment"
            class="h-[576px] block w-full rounded-md border-gray-300 shadow-sm  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="TXT write here" v-model="contentInput"></textarea>
        </div>
        <WriteButton titleHeader="新增文章" @check="checkPostEmpty()" />
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

