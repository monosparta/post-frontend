<script setup lang="ts">
const notification = useNotification()

notification.createMessage({
  type: 'success',
  title: 'Test',
  content: 'Hi! Welcome to ThingStage.',
})

notification.createMessage({
  type: 'warning',
  title: 'Attention needed',
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo totam eius aperiam dolorum.',
})

notification.createMessage({
  type: 'error',
  title: 'There were 2 errors with your submission',
  content: 'Your password must be at least 8 characters.',
})
</script>

<template>
  <div aria-live="assertive" class="z-50 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <Toast v-for="message in notification.messages.value.slice().reverse()" :key="message.title" :title="message.title" :type="message.type">
        {{ message.content }}
      </Toast>
    </div>
  </div>
</template>
