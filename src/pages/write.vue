<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const modal = useModalStore()
const bulletinSectionHeader = useBulletinSectionHeaderStore()
let title_input = ref('')
let text_input = ref('')


// const props = defineProps({
//   titleHeader: {
//     type: String,
//   }
// })

const titleHeader ='新增文章'

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
  modal.createNotification({
    type: 'add',
    text: '確定新增該篇文章？',
    title: title_input.value,
    text_input: text_input.value,
    user_id: '',
  })

  document.cookie = `title=${title_input.value};`;
  document.cookie = `text_input=${text_input.value}`;
  
    const token = document.cookie.replace(
      // hexToken cookie名稱
      /(?:(?:^|.*;\s*)user_id\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    console.log(token);
  
  // alert(token);
}

</script>

    <!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- <div class="px-4 sm:px-6 lg:px-8 mt-4 "> -->
  <div class="mt-6 ml-16 mr-16">
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
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style="height:576px" placeholder="Txt write here..." v-model="text_input"></textarea>
        </div>
      </main>

    </div>
  </div>
  <div class=" ml-16 mr-16 md-6">
    <div class="flex flex-col">
      <div class="relative pb-5 sm:pb-0  ">
        <div v-if="titleHeader==='新增文章'">
          <div class="mt-4 flex md:absolute md:left-0 md:mt-4">
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="back()">
              捨棄
            </button>
          </div>
          <div class="mt-4  flex md:absolute md:right-0 md:mt-4">
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="check()">
              新增文章
            </button>
          </div>
        </div>
        <div v-else-if="titleHeader==='編輯文章'">
          <div class="mt-4 flex md:absolute md:left-0 md:mt-4">
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="back()">
              放棄修改
            </button>
          </div>
          <div class="mt-4  flex md:absolute md:right-0 md:mt-4">
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="check()">
              修改文章
            </button>
          </div>
        </div>
      </div>
    </div>

    <Check v-if="modal.notificationStatus" :text="modal.notification.text" :title="modal.notification.title"
      :text_input="modal.notification.text_input" :type="modal.notification.type" @click="modal.closeNotification" />

  </div>


</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

