<script setup lang="ts">
import { useField } from 'vee-validate'
import { EditorContent, Extension, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import HardBreak from '@tiptap/extension-hard-break'
import UndoIcon from 'vue-material-design-icons/Undo.vue'
import RedoIcon from 'vue-material-design-icons/Redo.vue'
import TableIcon from 'vue-material-design-icons/Table.vue'
import QuoteCloseIcon from 'vue-material-design-icons/FormatQuoteClose.vue'
import UnderlineIcon from 'vue-material-design-icons/FormatUnderline.vue'
import StrikethroughIcon from 'vue-material-design-icons/FormatStrikethrough.vue'
import ItalicIcon from 'vue-material-design-icons/FormatItalic.vue'
import BoldIcon from 'vue-material-design-icons/FormatBold.vue'
import ListBulletedIcon from 'vue-material-design-icons/FormatListBulleted.vue'
import ListNumberedIcon from 'vue-material-design-icons/FormatListNumbered.vue'
import Header1Icon from 'vue-material-design-icons/FormatHeader1.vue'
import Header2Icon from 'vue-material-design-icons/FormatHeader2.vue'
import Header3Icon from 'vue-material-design-icons/FormatHeader3.vue'
import ParagraphIcon from 'vue-material-design-icons/FormatParagraph.vue'
import DividerIcon from 'vue-material-design-icons/WindowMinimize.vue'
import LinkIcon from 'vue-material-design-icons/Link.vue'
import LinkOffIcon from 'vue-material-design-icons/LinkOff.vue'
import type { BaseSchema } from 'yup'

const props = defineProps<{
  label: string
  name: string
  initialValue?: string
  rules?: BaseSchema
}>()

const { value, errorMessage, resetField, setValue } = useField(
  props.name,
  props.rules ?? undefined,
  {
    initialValue: props.initialValue ?? '',
  },
)

const iconColor = '#64748B'
const editor = useEditor({
  content: value.value,
  onUpdate: ({ editor }) => {
    const html = editor.getHTML()
    // send the content to an API here
    console.log('=== html ===', html)
    setValue(html)
  },
  editorProps: {
    attributes: {
      class:
        'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none p-4 m-0 !max-w-none min-h-[450px]',
    },
  },
  extensions: [
    StarterKit,
    Underline,
    // HardBreak.extend({
    //   addKeyboardShortcuts() {
    //     return {
    //       Enter: () => this.editor.commands.setHardBreak(),
    //     };
    //   },
    // }),
    Link.configure({
      openOnClick: false,
    }),
  ],
})

function setLink() {
  console.log('setLink')
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null)
    return

  // empty
  if (url === '') {
    editor.value
      .chain()
      .focus()
      .unsetAllMarks()
      .extendMarkRange('link')
      .unsetLink()
      .run()

    return
  }

  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run()
}

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<template>
  <div
    v-if="editor"
    class="rounded-md border-2 overflow-hidden" :class="[
      errorMessage ? 'border-red-500' : 'border-gray-300',
    ]"
  >
    <div class="bg-gray-50 flex space-x-2 p-2">
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('bold'),
        }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <BoldIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('italic'),
        }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <ItalicIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('strike'),
        }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <StrikethroughIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('paragraph'),
        }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <ParagraphIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('heading', { level: 1 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <Header1Icon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('heading', { level: 2 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <Header2Icon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('heading', { level: 3 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <Header3Icon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('bulletList'),
        }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <ListBulletedIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('orderedList'),
        }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <ListNumberedIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('blockquote'),
        }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <QuoteCloseIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <DividerIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300"
        @click="editor.chain().focus().undo().run()"
      >
        <UndoIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300"
        @click="editor.chain().focus().redo().run()"
      >
        <RedoIcon :fill-color="iconColor" />
      </button>
      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('underline'),
        }"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <UnderlineIcon :fill-color="iconColor" />
      </button>

      <button
        type="button"
        class="rounded hover:bg-gray-300" :class="{
          'bg-gray-200': editor.isActive('link'),
        }"
        @click="setLink"
      >
        <LinkIcon :fill-color="iconColor" />
      </button>
      <button
        v-if="editor.isActive('link')"
        type="button"
        class="rounded hover:bg-gray-300"
        @click="editor.chain().focus().unsetLink().run()"
      >
        <LinkOffIcon :fill-color="iconColor" />
      </button>
    </div>
    <editor-content :editor="editor" />
  </div>
  <p v-if="errorMessage" id="email-error" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
