<script setup lang="ts">
const bulletinSectionHeader = useBulletinSectionHeaderStore()
const cookieHave = () => {
  const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
  for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
  // console.log(aKeys);

  return aKeys
}
console.log(cookieHave().length);



bulletinSectionHeader.createNotification({
  type: 'button',
  title: '文章模組',
})

</script>

<template>
  <div class="mt-6 ml-16 mr-16">
    <div class="flex flex-col">
      <PostTab />
      <BulletinSectionHeaderForPost v-if="bulletinSectionHeader.notificationStatus"
        :title="bulletinSectionHeader.notification.title" :type="bulletinSectionHeader.notification.type" />
      <div v-if="cookieHave().length<=2">
        <Empty />
      </div>
      <!-- <div v-else-if="cookieHave().length>2">
        <ShowPost :title="showPost.notification.title" :content="showPost.notification.content"
          :userId="showPost.notification.userId" :dateTime="showPost.notification.dateTime"
          :type1="showPost.notification.type1" :type2="showPost.notification.type2" />
      </div> -->
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

