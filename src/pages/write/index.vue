<script setup lang="ts">
// const user = useUserStore()
const post = usePostStore()

const modal = useModalStore()
const titleInput = ref('')
const contentInput = ref('')
const modalType = ref('')
const userId = localStorage.getItem('id')!
const checkPostEmpty = () => {
  if (titleInput.value === '' || contentInput.value === '') {
    modalType.value = 'information'
    modal.createNotification({
      type: 'warning',
      text: '標題或內文欄位不可以空白喔！',
      postId: '',
    })
  }
  else {
    modalType.value = 'check'
    modal.createNotification({
      type: 'add',
      text: '確定新增文章？',
      postId: '',
    })
  }
}

const confirmPost = async () => {
  modalType.value = 'loading'
  const title = titleInput.value
  const content = contentInput.value
  await post.createPost({ title, content, user_id: userId })

  if (post.returnInfo.status === 201) {
    modalType.value = 'information'
    modal.createNotification({
      type: 'add',
      text: '已發表文章！',
      postId: post.returnInfo.data.post_id,
    })
  }
  else {
    modalType.value = 'information'
    modal.createNotification({
      type: 'warning',
      text: `新增失敗！失敗狀態為：${post.returnInfo.status}`,
      postId: '',
    })
  }
}
</script>

<template>
  <div class="mt-4 mx-16 mb-4">
    <div class="flex flex-col gap-4">
      <BulletinSectionHeaderForPost title="新增文章" :need-button="false" />
      <main class="auto-cols-min flex flex-col gap-4">
        <input
          id="title" v-model="titleInput" name="title" type="txt" autocomplete="title"
          placeholder="請輸入文章標題" maxlength="100"
          class="h-10 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-lg font-light font-Inter"
        >
        <div class="relative h-[576px] w-full">
          <div class="absolute bottom-0 right-0 pr-3 pb-1 text-gray-300 text-lg font-light font-Inter">
            <span :class="[contentInput.length > 9500 ? 'text-red-300' : 'text-gray-300']">{{ contentInput.length }}</span>/10000
          </div>
          <textarea
            id="context" v-model="contentInput"
            name="context"
            class="block w-full h-full rounded-md border border-gray-300 shadow-sm  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-lg font-light font-Inter" placeholder="請輸入文章內容"
            maxlength="10000"
          />
        </div>
        <div class="text-sm font-Inter font-normal text-gray-400">
          提醒：標題字數限制100字元，文章字數限制為1萬字元。
        </div>
        <WriteButton button-show="新增文章" @click="checkPostEmpty()" />
      </main>
      <Check
        v-if="modalType === 'check' && modal.notificationStatus === true" :text="modal.notification.text"
        :type="modal.notification.type" @click="modal.closeNotification" @confirm="confirmPost()"
      />
      <LoadingModal v-if="modalType === 'loading'" />
      <Information
        v-if="modalType === 'information' && modal.notificationStatus === true" :text="modal.notification.text"
        :post-id="modal.notification.postId" :type="modal.notification.type" @click="modal.closeNotification"
      />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: posts
  activeMenuName: 文章首頁
  title: 新增文章
</route>

