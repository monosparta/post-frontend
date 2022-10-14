<script setup lang="ts">
</script>

<template>
  <main class="flex-1">
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mt-8">
          <div
            class="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
          >
            <label
              for="name"
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
            >Name</label>
            <input
              id="name" type="text" name="name"
              class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Jane Smith"
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: dashboard
</route>
