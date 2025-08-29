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
import html2canvas from 'html2canvas'

const isDownloading = ref(false)

async function downloadThumbnail() {
  if (isDownloading.value) return
  
  isDownloading.value = true
  
  try {
    console.log('Starting download...')
    
    const controls = document.querySelector('.controls') as HTMLElement
    if (controls) {
      controls.style.display = 'none'
    }
    
    const thumbnail = document.getElementById('thumbnail') as HTMLElement
    if (!thumbnail) {
      throw new Error('Thumbnail element not found')
    }
    console.log('Thumbnail element found:', thumbnail)
    
    console.log('html2canvas loaded:', html2canvas)
    
    // Force computed styles to be applied
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const canvas = await html2canvas(thumbnail, {
      allowTaint: true,
      useCORS: true,
      scale: 2, // Higher quality
      backgroundColor: getComputedStyle(thumbnail).backgroundColor || '#000',
      logging: true,
      removeContainer: false,
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        const clonedThumbnail = clonedDoc.getElementById('thumbnail')
        if (clonedThumbnail) {
          // Force all styles to be computed
          const allElements = clonedThumbnail.querySelectorAll('*')
          allElements.forEach((el: Element) => {
            const htmlEl = el as HTMLElement
            const computedStyle = window.getComputedStyle(el)
            
            // Apply critical styles inline
            htmlEl.style.color = computedStyle.color
            htmlEl.style.fontSize = computedStyle.fontSize
            htmlEl.style.fontWeight = computedStyle.fontWeight
            htmlEl.style.letterSpacing = computedStyle.letterSpacing
            htmlEl.style.textTransform = computedStyle.textTransform
            htmlEl.style.opacity = computedStyle.opacity
            
            // Handle background gradients
            if (computedStyle.backgroundImage && computedStyle.backgroundImage !== 'none') {
              htmlEl.style.backgroundImage = computedStyle.backgroundImage
              htmlEl.style.webkitBackgroundClip = computedStyle.webkitBackgroundClip || ''
              htmlEl.style.webkitTextFillColor = computedStyle.webkitTextFillColor || ''
            }
          })
        }
      }
    })
    
    const link = document.createElement('a')
    link.download = 'thumbnail.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    
    if (controls) {
      controls.style.display = 'grid'
    }
  } catch (error) {
    console.error('Download failed:', error)
    const controls = document.querySelector('.controls') as HTMLElement
    if (controls) {
      controls.style.display = 'grid'
    }
  } finally {
    isDownloading.value = false
  }
}
</script>
