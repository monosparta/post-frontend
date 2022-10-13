<script setup lang="ts">
const showPost = useShowPostStore()

const cookieTaken = (sKey: string) => {
  const aKeys = document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$/"), "$1")
  return aKeys
}

const tokenTitle = cookieTaken('title')
const tokenContent = cookieTaken('content')
const tokenUserId = cookieTaken('userId')
const tokenDateTime = cookieTaken('dateTime')
console.log(tokenTitle);
console.log(tokenContent);
console.log(tokenUserId);
console.log(tokenDateTime);

const showType2 = ref('')

showPost.createNotification({
  type1: 'content',
  type2: 'personal',
  id: '1',
  title: tokenTitle,
  content: tokenContent,
  userId: tokenUserId,
  userName: 'John Doe',
  dateTime: tokenDateTime,
})


</script>

    <!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <ShowPost :title="showPost.notification.title" :content="showPost.notification.content"
        :userId="showPost.notification.userId" :userName="showPost.notification.userName"
        :dateTime="showPost.notification.dateTime" :type1="showPost.notification.type1"
        :type2="showPost.notification.type2" />
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

