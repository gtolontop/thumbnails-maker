<template>
  <button
    @click="downloadThumbnail"
    :disabled="isDownloading"
    class="w-full p-3 rounded-md bg-[var(--button-primary-bg-color)] hover:bg-[var(--button-primary-hover-bg-color)] text-[var(--input-text-color)] font-['Manrope'] font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    <i class="fas fa-download"></i>
    {{ isDownloading ? 'Downloading...' : 'Download Thumbnail' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import domtoimage from 'dom-to-image-more'

const isDownloading = ref(false)

async function downloadThumbnail() {
  if (isDownloading.value) return
  
  isDownloading.value = true
  
  try {
    const thumbnail = document.getElementById('thumbnail') as HTMLElement
    if (!thumbnail) {
      throw new Error('Thumbnail element not found')
    }
    
    // Hide controls during capture
    const controls = document.querySelector('.controls') as HTMLElement
    if (controls) {
      controls.style.display = 'none'
    }
    
    // Wait a bit for any transitions
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Create high quality image
    const dataUrl = await domtoimage.toPng(thumbnail, {
      width: 1600,
      height: 800,
      quality: 1.0,
      bgcolor: '#10131C',
      style: {
        // Force some styles that might not be captured
        'font-rendering': 'optimizeLegibility',
        '-webkit-font-smoothing': 'antialiased'
      },
      filter: (node: Element) => {
        // Don't include control elements if any
        return !node.classList?.contains('controls')
      }
    })
    
    // Download the image
    const link = document.createElement('a')
    link.download = `thumbnail_${Date.now()}.png`
    link.href = dataUrl
    link.click()
    
    // Restore controls
    if (controls) {
      controls.style.display = 'grid'
    }
    
  } catch (error) {
    console.error('Download failed:', error)
    alert('Failed to download thumbnail. Please try again.')
    
    // Restore controls even on error
    const controls = document.querySelector('.controls') as HTMLElement
    if (controls) {
      controls.style.display = 'grid'
    }
  } finally {
    isDownloading.value = false
  }
}
</script>