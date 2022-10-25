<script setup lang="ts">
import { ArrowNarrowRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/vue/solid'
const props = defineProps({
  type: String,
  id: String,
  title: String,
  content: String,
  userId: String,
  userName: String,
  dateTime: String,
})
// const userId = useUserStore()
const modal = useModalStore()
const post = usePostStore()
const router = useRouter()
// const tokenUserId = userId.userData.id
const tokenUserId = localStorage.getItem('id')
const modalType = ref('')

localStorage.setItem('postTitle', props.title!)

const deletePost = () => {
  modalType.value = 'check'
  modal.createNotification({
    type: 'delete',
    text: `確定刪除「${props.title}」？`,
    postId: '',
  })
}

const confirmPost = async () => {
  modalType.value = 'loading'
  post.clearReturnInfo()
  await post.deletePost(props.id!)

  if (post.returnInfo.status === 200) {
    modalType.value = 'information'
    modal.createNotification({
      type: 'delete',
      text: `已刪除「${props.title}」！`,
      postId: '',
    })
  }
  else {
    modalType.value = 'information'
    modal.createNotification({
      type: 'warning',
      text: `刪除失敗！失敗狀態為：${post.returnInfo.status}`,
      postId: '',
    })
  }
}
</script>

<template>
  <section aria-labelledby="action-title" class=" lg:row-start-1 lg:col-start-1">
    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div class="grid grid-cols-6 gap-4 px-4 py-4 sm:px-6">
          <h2 id="notes-title" class="col-start-1 col-end-5 text-2xl font-semibold font-Inter text-gray-900">
            {{ props.title }}
          </h2>
          <div
            v-if=" props.userId === tokenUserId && router.currentRoute.value.path !== '/posts'"
            class="col-end-7 col-span-2  flex justify-end whitespace-nowrap  text-right text-sm font-medium"
          >
            <button class="flex justify-center  text-gray-400 hover:text-gray-900" @click="deletePost()">
              <TrashIcon class="h-6 w-6 mx-2" aria-hidden="true" /><span class="sr-only">{{ props.id
              }}</span>
            </button>
            <button
              class="flex justify-center  text-gray-400 hover:text-gray-900"
              @click="$router.push(`/write/${props.id}`)"
            >
              <PencilAltIcon class="h-6 w-6 mx-2" aria-hidden="true" /><span class="sr-only">{{ props.id
              }}</span>
            </button>
          </div>
        </div>
        <div class="px-6 pt-2 pb-6">
          <ul role="list" class="flex flex-col gap-2">
            <li>
              <div class="text-base font-normal font-Inter text-gray-400">
                {{ props.userName }} - {{ props.dateTime }}
              </div>
            </li>
            <li>
              <div class="space-x-3 text-xl font-light font-Inter">
                <div v-if="props.type === 'content'">
                  <p class="break-words whitespace-pre-line">
                    {{ props.content }}
                  </p>
                </div>
                <div v-if="props.type === 'frontPage'" class="flex flex-col gap-4">
                  <p class="line-clamp-2">
                    {{ props.content }}
                  </p>
                  <div class="grid grid-cols-5 justify-items-end gap-4">
                    <button
                      class="col-end-6 col-span-1 mx-0 my-0  text-base font-normal text-indigo-700 hover:text-indigo-400"
                      @click="$router.push(`/show/${props.id}`)"
                    >
                      <div
                        class="relative border-b border-indigo-700 hover:text-indigo-400 flex justify-center gap-1 pb-1"
                      >
                        閱讀更多
                        <ArrowNarrowRightIcon class="h-5 w-5 leading-6" aria-hidden="true" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Check
      v-if="modalType === 'check' && modal.notificationStatus === true" :text="modal.notification.text"
      :type="modal.notification.type" @click="modal.closeNotification" @confirm="confirmPost()"
    />
    <LoadingModal v-if="modalType === 'loading'" />
    <Information
      v-if="modalType === 'information' && modal.notificationStatus === true" :text="modal.notification.text"
      :post-id="modal.notification.postId" :type="modal.notification.type" @click="modal.closeNotification"
    />
  </section>
</template>
