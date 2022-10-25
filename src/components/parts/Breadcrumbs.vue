<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/solid'
const route = useRoute()
const breadcrumbList = reactive([{
  href: '',
  name: '',
}])

const getBreadcrumbs = () => {
  let newBreadCrumb = { href: '', name: '' }

  for (let index = 0; index < route.matched.length; index++) {
    if (index === 0) {
      newBreadCrumb = { href: `/${route.meta.activeMenu}`, name: route.meta.activeMenuName as string }
      breadcrumbList.splice(0, 1, newBreadCrumb)
    }
    else {
      if (route.name !== route.meta.activeMenu) {
        newBreadCrumb = { href: route.path, name: route.meta.title as string }
        breadcrumbList.push(newBreadCrumb)
      }
    }
  }
}

onMounted(() => {
  getBreadcrumbs()
})
</script>

<template>
  <nav class="bg-white border-b border-gray-200 flex" aria-label="Breadcrumb">
    <ol role="list" class="max-w-screen-xl w-full px-4 flex space-x-4 sm:px-6 lg:px-8">
      <li class="flex">
        <div class="flex items-center">
          <a href="/dashboard" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li v-for="(item, i) in breadcrumbList" :key="i" class="flex">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-6 h-full text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none"
            fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a
            :href="item.href"
            class="ml-4 text-sm font-medium" :class="[item.href === route.path ? 'text-indigo-900 hover:text-gray-700' : 'text-gray-400 hover:text-gray-500']"
          >{{
            item.name }}</a>
        </div>
      </li>
    </ol>
  </nav>
</template>
