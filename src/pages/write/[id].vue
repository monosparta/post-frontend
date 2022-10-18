<script setup lang="ts">
import axios from 'axios'
const modal = useModalStore()
const route = useRoute()
const post = usePostStore()
const titleInput = ref('')
const textInput = ref('')
let modalType = ref('')
const postId = route.params.id as string

const check = async () => {
  if (titleInput.value == '' || textInput.value == '') {
    console.log('空的！');

    modalType.value = 'information'
    modal.createNotification({
      type: 'warming',
      text: '標題或內文欄位不可以空白喔！',
      dateTime: '',
    })
  } else {
    console.log('有資料');

    modalType.value = 'check'
    modal.createNotification({
      type: 'update',
      text: '確定修改該篇文章？',
      dateTime: '',
    })
  }
}

const setData = async () => {
  await post.getPost(postId)
  titleInput.value = post.info.title
  textInput.value = post.info.content
}

onMounted(async () => {
  await setData()
})


const updatePost = async (data: {
  title: string
  content: string
  postId: string
}) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API_URL}/api/post`, data,
  )
  console.log(result.data)
  return result.data
}

const confirmPost = async () => {
  modalType.value = 'loading'
  const title = titleInput.value as string;
  const content = textInput.value;
  // const user_id = user.userData.id

  const getResult = await updatePost({ title, content, postId })

  if (getResult) {
    if (getResult.message === 'incorrect format') {
      modalType.value = 'information'
      modal.createNotification({
        type: 'warming',
        text: 'incorrent format',
        dateTime: '',
      })
    } else {
      localStorage.setItem('id', getResult.id)
      localStorage.setItem('title', getResult.title)
      localStorage.setItem('content', getResult.content)
      localStorage.setItem('createdAt', getResult.created_at.substring(0, 19).replace("T", " "))
      localStorage.setItem('userId', getResult.user.id)
      localStorage.setItem('userName', getResult.user.name)
      modalType.value = ''
      modalType.value = 'information'
      modal.createNotification({
        type: 'update',
        text: '修改',
        dateTime: getResult.created_at.substring(0, 19).replace("T", " "),
      })
    }
  }
}
</script>

<template>
  <div class="mt-4 mx-16 mb-4">
    <div class="flex flex-col">
      <BulletinSectionHeaderForPost :title="'編輯文章'" :needButton="false" />
      <main class="auto-cols-min">
        <div class="mt-4 h-10">
          <input id="title" name="title" type="txt" autocomplete="title" placeholder="Title write here..."
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            v-model="titleInput" />
        </div>
        <div class="mt-4">
          <textarea rows="4" name="comment" id="comment"
            class="block w-full rounded-md border-gray-300 shadow-sm  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            style="height:576px" placeholder="Txt write here..." v-model="textInput"></textarea>
        </div>
        <WriteButton :titleHeader="'編輯文章'" @check="check()" />
      </main>
      <Check v-if="modalType==='check' && modal.notificationStatus===true" :text="modal.notification.text"
        :dateTime="modal.notification.dateTime" :type="modal.notification.type" @click="modal.closeNotification"
        @confirm="confirmPost()" />
      <LoadingModal v-if="modalType === 'loading'" />
      <Information v-if="modalType==='information' && modal.notificationStatus===true" :title="modal.notification.text"
        :dateTime="modal.notification.dateTime" :type="modal.notification.type" @click="modal.closeNotification" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: posts
</route>

