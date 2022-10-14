<script setup lang="ts">
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const route = useRoute()
const modal = useModalStore()
const bulletinSectionHeader = useBulletinSectionHeaderStore()
const titleInput = ref('')
const textInput = ref('')
let modalType = ref('')

// const props = defineProps({
//   titleHeader: {
//     type: String,
//   }
// })

const titleHeader = '新增文章'

const titleHeader2 = route.params.titleHeader;
console.log(titleHeader2)

bulletinSectionHeader.createNotification({
  type: '',
  title: titleHeader,
})

const getCookie = (name: string) => {
  let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

const cookieHave = () => {
  const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
  for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
  // console.log(aKeys);

  return aKeys
}
console.log(cookieHave().length);

const back = async () => {
  router.go(-1)
}

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
      type: 'add',
      text: '確定新增該篇文章？',
      dateTime: '',
    })
  }
}


const createPost = async (data: {
  title: string
  content: string
  user_id: string
}) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API_URL}/api/post`, data,
  )
  console.log(result.data)
  return result.data
}

const toInformationOpen = ref(false)

const confirmPost = async () => {
  // alert('test')
  modalType.value = 'loading'
  // const title = '123';
  // const content = 'textInput.value';
  // let userId = '00000000-0000-0000-0000-000000000000';
  const title = titleInput.value;
  const content = textInput.value;
  let user_id = '';

  if (cookieHave().length >= 0) {
    user_id = getCookie("userId")!!;
  }
  const getresult = await createPost({ title, content, user_id })

  if (getresult) {
    localStorage.setItem('id', getresult.id)
    localStorage.setItem('title', getresult.title)
    localStorage.setItem('content', getresult.content)
    localStorage.setItem('createdAt', getresult.created_at.substring(0, 19).replace("T", " "))
    localStorage.setItem('userId', getresult.user.id)
    localStorage.setItem('userName', getresult.user.name)
    modalType.value = ''
    modalType.value = 'information'
    toInformationOpen.value = true
    modal.createNotification({
      type: 'add',
      text: '發表',
      dateTime: getresult.created_at.substring(0, 19).replace("T", " "),
    })

  }
}
</script>

<template>
  <div class="mt-4 mx-16 mb-4">
    <div class="flex flex-col">
      <BulletinSectionHeaderForPost v-if="bulletinSectionHeader.notificationStatus"
        :title="bulletinSectionHeader.notification.title" :type="bulletinSectionHeader.notification.type" />
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
        <div v-if="titleHeader==='新增文章'" class="relative grid grid-cols-3 gap-4 mt-4">
          <div class="col-start-1 col-end-3">
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="back()">
              捨棄
            </button>
          </div>
          <div class="col-end-4 col-span-1 absolute inset-y-0 right-0">
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="check()">
              新增文章
            </button>
          </div>
        </div>
        <div v-else-if="titleHeader==='編輯文章'" class="relative grid grid-cols-6 gap-4 mt-4">
          <div class="col-start-1 col-end-3">
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="back()">
              放棄修改
            </button>
          </div>
          <div class="col-end-7 col-span-1 absolute inset-y-0 right-0">
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="check()">
              修改文章
            </button>
          </div>
        </div>
      </main>
      <Check v-if="modalType==='check' && modal.notificationStatus===true" :text="modal.notification.text"
        :dateTime="modal.notification.dateTime" :type="modal.notification.type" @click="modal.closeNotification"
        @confirm="confirmPost()" />
      <LoadingModal v-if="modalType === 'loading'" />
      <Information v-if="modalType==='information' && modal.notificationStatus===true" :text="modal.notification.text"
        :dateTime="modal.notification.dateTime" :type="modal.notification.type" @click="modal.closeNotification" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

