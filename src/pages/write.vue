<script setup lang="ts">
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const route = useRoute()
const modal = useModalStore()
const bulletinSectionHeader = useBulletinSectionHeaderStore()
const title_input = ref('')
const text_input = ref('')
let modal_type = ref('')

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

const back = async () => {
  router.push({ path: '/post' })
}

const check = async () => {
  if (title_input.value == '' || text_input.value == '') {
    console.log('空的！');

    modal_type.value = 'information'
    modal.createNotification({
      type: 'warming',
      text: '標題或內文欄位不可以空白喔！',
      dateTime: '',
    })
  } else {
    console.log('有資料');

    modal_type.value = 'check'
    modal.createNotification({
      type: 'add',
      text: '確定新增該篇文章？',
      dateTime: '',
    })
    document.cookie = `title=${title_input.value};`;
    document.cookie = `text_input=${text_input.value}`;
    const title = title_input.value;
    const content = text_input.value;
    const user_id = getCookie("user_id");
    createPost(
      {
        title,
        content,
        user_id
      }
    )
  }
}
const createPost = async (data: {
        'title': string
        'content': string
        'user_id':string
    }) => {
        const result = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/api/post`, data,
        )
        console.log(result.data)
    }
function getCookie(name:string) {
      let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      if (arr != null) return unescape(arr[2]);
      return null;
    }

</script>

    <!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- <div class="px-4 sm:px-6 lg:px-8 mt-4 "> -->
  <div class="mt-4 mx-16 mb-4">
    <div class="flex flex-col">
      <BulletinSectionHeader_2 v-if="bulletinSectionHeader.notificationStatus"
        :title="bulletinSectionHeader.notification.title" :type="bulletinSectionHeader.notification.type" />
      <main class="auto-cols-min">
        <div class="mt-4 h-10">
          <input id="title" name="title" type="txt" autocomplete="title" placeholder="Title write here..."
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            v-model="title_input" />
        </div>
        <div class="mt-4">
          <textarea rows="4" name="comment" id="comment"
            class="block w-full rounded-md border-gray-300 shadow-sm  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            style="height:576px" placeholder="Txt write here..." v-model="text_input"></textarea>
        </div>
        <div v-if="titleHeader==='新增文章'" class="relative grid grid-cols-3 gap-4 mt-4">
          <!-- <div class="mt-4 flex md:absolute md:left-0 md:mt-4"> -->
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

      <Check v-if="modal_type==='check' && modal.notificationStatus===true" :text="modal.notification.text"
        :dateTime="modal.notification.dateTime" :type="modal.notification.type" @click="modal.closeNotification" />
      <Information v-if="modal_type==='information' && modal.notificationStatus===true" :text="modal.notification.text"
        :dateTime="modal.notification.dateTime" :type="modal.notification.type" @click="modal.closeNotification" />
    </div>
  </div>



</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

