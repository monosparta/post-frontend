<script setup lang="ts">

const tokenId = localStorage.getItem("id")!!
const tokenTitle = localStorage.getItem("title")!!
const tokenContent = localStorage.getItem("content")!!
const tokenCreateAt = localStorage.getItem("createdAt")!!
const tokenUserId = localStorage.getItem("userId")!!
const tokenUseName = localStorage.getItem("userName")!!
console.log(tokenId);
console.log(tokenTitle);
console.log(tokenContent);
console.log(tokenCreateAt);
console.log(tokenUserId);
console.log(tokenUseName);



</script>

    <!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <ShowPost :id="tokenId" :title="tokenTitle" :content="tokenContent" :userId="tokenUserId" :userName="tokenUseName"
        :dateTime="tokenCreateAt" :type="'content'" />
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

