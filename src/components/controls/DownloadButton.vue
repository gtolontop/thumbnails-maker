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
import { useConfigStore } from '../../stores/configStore'
import { useThumbnailStore } from '../../stores/thumbnailStore'

const { configStore } = useConfigStore()
const { isTextOnly } = useThumbnailStore()
const isDownloading = ref(false)

async function downloadThumbnail() {
  if (isDownloading.value) return
  
  isDownloading.value = true
  
  try {
    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.width = 1600
    canvas.height = 800
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas not supported')
    
    // Background
    ctx.fillStyle = '#10131C'
    ctx.fillRect(0, 0, 1600, 800)
    
    // Draw glow ellipse
    const gradient = ctx.createRadialGradient(800, -50, 0, 800, -50, 400)
    gradient.addColorStop(0, 'rgba(15, 19, 49, 0.08)')
    gradient.addColorStop(0.25, 'rgba(74, 82, 153, 0.23)')
    gradient.addColorStop(0.5, 'rgba(78, 91, 194, 0.14)')
    gradient.addColorStop(0.75, 'transparent')
    
    ctx.save()
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1600, 200)
    ctx.restore()
    
    // Set up fonts
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    if (isTextOnly.value) {
      // Header
      const headerY = 200
      
      // NOW AVAILABLE ON text
      ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.letterSpacing = '8px'
      const headerText = configStore.rightHeaderText.toUpperCase()
      const headerWidth = ctx.measureText(headerText).width
      ctx.fillText(headerText, 800 - 100, headerY)
      
      // Header link badge
      if (configStore.headerLinkText) {
        const badgeX = 800 + headerWidth/2 - 50
        const badgeWidth = 200
        const badgeHeight = 50
        
        // Draw badge background
        ctx.fillStyle = '#333645'
        ctx.beginPath()
        ctx.roundRect(badgeX, headerY - badgeHeight/2, badgeWidth, badgeHeight, 8)
        ctx.fill()
        
        // Badge text
        ctx.fillStyle = '#9DA3BB'
        ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
        ctx.letterSpacing = '6px'
        ctx.fillText(configStore.headerLinkText.toUpperCase(), badgeX + badgeWidth/2, headerY)
      }
      
      // Main title
      ctx.font = 'bold 140px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
      ctx.fillStyle = '#9EA4BE'
      ctx.letterSpacing = '0px'
      ctx.fillText(configStore.titleText, 800, 400)
      
      // Reflection
      ctx.save()
      ctx.translate(800, 530)
      ctx.scale(1, -1)
      ctx.globalAlpha = 0.3
      
      // Create gradient for reflection
      const reflectGradient = ctx.createLinearGradient(0, -70, 0, 70)
      reflectGradient.addColorStop(0, 'transparent')
      reflectGradient.addColorStop(0.8, '#9EA4BE')
      
      ctx.fillStyle = reflectGradient
      ctx.fillText(configStore.titleText, 0, 0)
      ctx.restore()
      
      // Handle/Logo at bottom
      if (configStore.useHandleLogo && configStore.handleLogo) {
        const img = new Image()
        img.src = configStore.handleLogo
        await new Promise((resolve) => {
          img.onload = resolve
        })
        const logoHeight = configStore.handleLogoSize
        const logoWidth = (img.width / img.height) * logoHeight
        ctx.drawImage(img, 800 - logoWidth/2, 700 - logoHeight/2, logoWidth, logoHeight)
      } else if (configStore.handleText) {
        ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
        ctx.fillStyle = '#a9b1d6'
        ctx.fillText(configStore.handleText, 800, 700)
      }
    }
    
    // Download
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `thumbnail_${Date.now()}.png`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    }, 'image/png', 1.0)
    
  } catch (error) {
    console.error('Download failed:', error)
    alert('Failed to generate thumbnail. Please try again.')
  } finally {
    isDownloading.value = false
  }
}
</script>