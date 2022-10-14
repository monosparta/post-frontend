<script setup lang="ts">
const bulletinSectionHeader = useBulletinSectionHeaderStore()
const cookieHave = () => {
  const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
  for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
  // console.log(aKeys);

  return aKeys
}
console.log(cookieHave().length);

const fakeData = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum metus id fringilla sodales. Suspendisse vitae nibh cursus, consequat neque sed, rutrum neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat purus a accumsan faucibus. Morbi nec tellus lorem. Quisque ut massa et arcu gravida convallis ut et leo. Proin tincidunt, risus eget pretium elementum, dui elit porta elit, quis varius lacus urna a turpis.',
    created_at: '2022-10-13 10:34:13',
    updated_at: '2022-10-13 10:34:13',
    user: {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'John Doe',
    }
  }, {
    id: '2',
    title: 'Lorem ipsum dolor sit amet.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum metus id fringilla sodales. Suspendisse vitae nibh cursus, consequat neque sed, rutrum neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat purus a accumsan faucibus. Morbi nec tellus lorem. Quisque ut massa et arcu gravida convallis ut et leo. Proin tincidunt, risus eget pretium elementum, dui elit porta elit, quis varius lacus urna a turpis.',
    created_at: '2022-10-13 10:34:13',
    updated_at: '2022-10-13 10:34:13',
    user: {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'John Doe',
    }
  }, {
    id: '3',
    title: 'Lorem ipsum dolor sit amet.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum metus id fringilla sodales. Suspendisse vitae nibh cursus, consequat neque sed, rutrum neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat purus a accumsan faucibus. Morbi nec tellus lorem. Quisque ut massa et arcu gravida convallis ut et leo. Proin tincidunt, risus eget pretium elementum, dui elit porta elit, quis varius lacus urna a turpis.',
    created_at: '2022-10-13 10:34:13',
    updated_at: '2022-10-13 10:34:13',
    user: {
      id: '05c1d5e7-49a1-4b62-9e49-b91ac98c6871',
      name: 'dFzsk4641',
    }
  }, {
    id: '4',
    title: 'Lorem ipsum dolor sit amet.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum metus id fringilla sodales. Suspendisse vitae nibh cursus, consequat neque sed, rutrum neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat purus a accumsan faucibus. Morbi nec tellus lorem. Quisque ut massa et arcu gravida convallis ut et leo. Proin tincidunt, risus eget pretium elementum, dui elit porta elit, quis varius lacus urna a turpis.',
    created_at: '2022-10-13 10:34:13',
    updated_at: '2022-10-13 10:34:13',
    user: {
      id: '05c1d5e7-49a1-4b62-9e49-b91ac98c6871',
      name: 'dFzsk4641',
    }
  }
]


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
      <div v-else-if="cookieHave().length>2" class="mt-6">
        <div v-for="post in fakeData" :key="post.id">
          <ShowPost :title="post.title" :content="post.content" :userId="post.user.id" :userName="post.user.name"
            :dateTime="post.created_at" :type1="'frontPage'" :type2="''" />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: post
</route>

