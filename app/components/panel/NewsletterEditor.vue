<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

const props = defineProps<{ modelValue: object }>()
const emit = defineEmits<{ 'update:modelValue': [value: object] }>()
const editor = shallowRef<Editor | null>(null)

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editorProps: {
      attributes: { class: 'newsletter-prose' },
    },
    onUpdate: ({ editor: current }) => emit('update:modelValue', current.getJSON()),
  })
})

watch(() => props.modelValue, (value) => {
  if (!editor.value) return
  const current = JSON.stringify(editor.value.getJSON())
  if (current !== JSON.stringify(value)) editor.value.commands.setContent(value)
}, { deep: true })

onBeforeUnmount(() => editor.value?.destroy())

function setLink() {
  if (!editor.value) return
  const previous = editor.value.getAttributes('link').href as string | undefined
  const href = window.prompt('Link URL', previous || 'https://')
  if (href === null) return
  if (!href.trim()) editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
  else editor.value.chain().focus().extendMarkRange('link').setLink({ href: href.trim() }).run()
}

const buttons = computed(() => [
  { label: 'H1', active: editor.value?.isActive('heading', { level: 1 }), run: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run() },
  { label: 'H2', active: editor.value?.isActive('heading', { level: 2 }), run: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run() },
  { label: 'B', active: editor.value?.isActive('bold'), run: () => editor.value?.chain().focus().toggleBold().run() },
  { label: 'I', active: editor.value?.isActive('italic'), run: () => editor.value?.chain().focus().toggleItalic().run() },
  { label: 'U', active: editor.value?.isActive('underline'), run: () => editor.value?.chain().focus().toggleUnderline().run() },
  { label: '• List', active: editor.value?.isActive('bulletList'), run: () => editor.value?.chain().focus().toggleBulletList().run() },
  { label: '1. List', active: editor.value?.isActive('orderedList'), run: () => editor.value?.chain().focus().toggleOrderedList().run() },
  { label: 'Quote', active: editor.value?.isActive('blockquote'), run: () => editor.value?.chain().focus().toggleBlockquote().run() },
])
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-white/10 bg-[#111620]">
    <div v-if="editor" class="flex flex-wrap gap-1 border-b border-white/10 bg-white/[.025] p-2">
      <button
        v-for="button in buttons"
        :key="button.label"
        type="button"
        class="rounded-md px-2.5 py-1.5 text-xs font-semibold text-[#aab6c7] hover:bg-white/10 hover:text-white"
        :class="button.active ? '!bg-[#246fda] !text-white' : ''"
        @click="button.run"
      >{{ button.label }}</button>
      <span class="mx-1 w-px bg-white/10" />
      <button type="button" class="rounded-md px-2.5 py-1.5 text-xs text-[#aab6c7] hover:bg-white/10 hover:text-white" @click="setLink">Link</button>
      <button type="button" class="rounded-md px-2.5 py-1.5 text-xs text-[#aab6c7] hover:bg-white/10 hover:text-white" @click="editor.chain().focus().setTextAlign('left').run()">Left</button>
      <button type="button" class="rounded-md px-2.5 py-1.5 text-xs text-[#aab6c7] hover:bg-white/10 hover:text-white" @click="editor.chain().focus().setTextAlign('center').run()">Center</button>
      <button type="button" class="rounded-md px-2.5 py-1.5 text-xs text-[#aab6c7] hover:bg-white/10 hover:text-white" @click="editor.chain().focus().setHorizontalRule().run()">Rule</button>
      <span class="mx-1 w-px bg-white/10" />
      <button type="button" class="rounded-md px-2.5 py-1.5 text-xs text-[#aab6c7] hover:bg-white/10 hover:text-white" :disabled="!editor.can().undo()" @click="editor.chain().focus().undo().run()">Undo</button>
      <button type="button" class="rounded-md px-2.5 py-1.5 text-xs text-[#aab6c7] hover:bg-white/10 hover:text-white" :disabled="!editor.can().redo()" @click="editor.chain().focus().redo().run()">Redo</button>
    </div>
    <EditorContent :editor="editor || undefined" />
  </div>
</template>

<style>
.newsletter-prose { min-height: 420px; padding: 28px; color: #eef3fa; outline: none; font-size: 16px; line-height: 1.7; }
.newsletter-prose p { margin: 0 0 1rem; }
.newsletter-prose h1 { margin: 1.6rem 0 .75rem; font-size: 2rem; line-height: 1.15; font-weight: 750; }
.newsletter-prose h2 { margin: 1.5rem 0 .7rem; font-size: 1.55rem; line-height: 1.2; font-weight: 720; }
.newsletter-prose h3 { margin: 1.3rem 0 .6rem; font-size: 1.25rem; font-weight: 700; }
.newsletter-prose ul, .newsletter-prose ol { margin: 0 0 1rem; padding-left: 1.5rem; }
.newsletter-prose ul { list-style: disc; }
.newsletter-prose ol { list-style: decimal; }
.newsletter-prose blockquote { margin: 1.4rem 0; border-left: 3px solid #4b9bfa; padding-left: 1rem; color: #b7c4d5; }
.newsletter-prose a { color: #68adff; text-decoration: underline; }
.newsletter-prose hr { margin: 1.7rem 0; border: 0; border-top: 1px solid #343942; }
.newsletter-prose p.is-editor-empty:first-child::before { color: #667489; content: 'Write your newsletter…'; float: left; height: 0; pointer-events: none; }
</style>
