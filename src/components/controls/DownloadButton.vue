<template>
  <div class="flex gap-2">
    <button
      @click="openInNewWindow"
      class="flex-1 p-3 rounded-md bg-[var(--button-primary-bg-color)] hover:bg-[var(--button-primary-hover-bg-color)] text-[var(--input-text-color)] font-['Manrope'] font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
    >
      <i class="fas fa-external-link-alt"></i>
      Open in New Tab
    </button>
    <button
      @click="copyAsImage"
      class="flex-1 p-3 rounded-md bg-[var(--button-primary-bg-color)] hover:bg-[var(--button-primary-hover-bg-color)] text-[var(--input-text-color)] font-['Manrope'] font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
    >
      <i class="fas fa-copy"></i>
      {{ copied ? 'Copied!' : 'Copy HTML' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)

function openInNewWindow() {
  const thumbnail = document.getElementById('thumbnail')
  if (!thumbnail) return
  
  // Clone the thumbnail element
  const clone = thumbnail.cloneNode(true) as HTMLElement
  
  // Get all computed styles
  const allStyles = Array.from(document.styleSheets)
    .map(sheet => {
      try {
        return Array.from(sheet.cssRules || [])
          .map(rule => rule.cssText)
          .join('\n')
      } catch (e) {
        return ''
      }
    })
    .join('\n')
  
  // Create a new window with the thumbnail
  const newWindow = window.open('', '_blank')
  if (!newWindow) return
  
  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Thumbnail Preview</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background: #10131C;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        }
        
        /* Ensure correct font weights */
        .font-extrabold {
          font-weight: 800 !important;
        }
        .font-bold {
          font-weight: 700 !important;
        }
        .font-semibold {
          font-weight: 600 !important;
        }
        .font-medium {
          font-weight: 500 !important;
        }
        
        /* Title specific styles */
        #text-only-title,
        .title {
          font-weight: 800 !important;
        }
        
        ${allStyles}
        :root {
          --thumbnail-bg-color: #10131C;
          --thumbnail-grid-color: rgba(255, 255, 255, 0.05);
          --thumbnail-main-text-color: #ffffff;
          --thumbnail-secondary-text-color: #a9b1d6;
        }
      </style>
    </head>
    <body>
      ${clone.outerHTML}
    </body>
    </html>
  `)
  newWindow.document.close()
}

async function copyAsImage() {
  const thumbnail = document.getElementById('thumbnail')
  if (!thumbnail) return
  
  try {
    // Get the HTML with inline styles
    const clone = thumbnail.cloneNode(true) as HTMLElement
    
    // Copy to clipboard
    await navigator.clipboard.writeText(clone.outerHTML)
    
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
    alert('Failed to copy HTML')
  }
}
</script>