<script setup lang="ts">
const showPost = useShowPostStore()

const tokenId = localStorage.getItem("id")
const tokenTitle = localStorage.getItem("title")
const tokenContent = localStorage.getItem("content")
const tokenCreateAt = localStorage.getItem("createdAt")
const tokenUserId = localStorage.getItem("userId")
const tokenUseName = localStorage.getItem("userName")
console.log(tokenId);
console.log(tokenTitle);
console.log(tokenContent);
console.log(tokenCreateAt);
console.log(tokenUserId);
console.log(tokenUseName);
showPost.createNotification({
  type: 'content',
  id: tokenId!!,
  title: tokenTitle!!,
  content: tokenContent!!,
  userId: tokenUserId!!,
  userName: tokenUseName!!,
  dateTime: tokenCreateAt!!,
})


</script>

    <!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <ShowPost :id="showPost.notification.id" :title="showPost.notification.title"
        :content="showPost.notification.content" :userId="showPost.notification.userId"
        :userName="showPost.notification.userName" :dateTime="showPost.notification.dateTime"
        :type1="showPost.notification.type" />
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

