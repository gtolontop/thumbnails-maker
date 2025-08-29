<template>
  <div class="file-upload">
    <input
      type="file"
      :id="id"
      :accept="accept"
      @change="handleFileChange"
      class="hidden"
    />
    <label
      :for="id"
      class="cursor-pointer w-full p-2 rounded-md border border-dashed border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope'] text-center hover:bg-opacity-80 transition-all"
    >
      <i class="fas fa-cloud-upload-alt mr-2"></i>
      {{ label || 'Choose file' }}
    </label>
    <div v-if="fileName" class="mt-2 text-xs text-[var(--thumbnail-secondary-text-color)]">
      {{ fileName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  id: string
  label?: string
  accept?: string
}

interface Emits {
  (e: 'fileSelected', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const fileName = ref('')

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    fileName.value = file.name
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const result = e.target?.result as string
      emit('fileSelected', result)
    }
    
    reader.readAsDataURL(file)
  }
}
</script>