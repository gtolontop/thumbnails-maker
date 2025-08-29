<template>
  <div 
    id="thumbnail"
    ref="thumbnailRef"
    class="w-[1600px] h-[800px] bg-[var(--thumbnail-bg-color)] relative overflow-hidden p-[60px_80px] box-border transition-colors duration-300"
    :style="computedBackgroundStyle"
  >
    <div v-if="!isTextOnly" id="default-layout" class="flex justify-between items-center w-full h-full">
      <div class="left-panel flex flex-col justify-center h-full w-1/2 relative -left-10">
        <div class="handle mb-4">
          <img v-if="configStore.useHandleLogo && configStore.handleLogo" :src="configStore.handleLogo" alt="Handle Logo" :style="`height: ${configStore.handleLogoSize}px`" class="object-contain" />
          <span v-else class="text-[var(--thumbnail-secondary-text-color)] text-2xl">{{ configStore.handleText }}</span>
        </div>
        <div class="title-container">
          <h1 class="title text-[60px] font-extrabold leading-[1] m-0 text-[var(--thumbnail-main-text-color)]">{{ configStore.titleText }}</h1>
          <h1 class="reflection text-[60px] font-extrabold leading-[1] m-0 text-[var(--thumbnail-main-text-color)] scale-y-[-1] opacity-30" style="margin-top: -1em;">{{ configStore.titleText }}</h1>
        </div>
      </div>
      <div class="right-panel flex flex-col items-center justify-start h-full w-1/2 relative -right-10">
        <div class="right-panel-header flex items-center gap-3 mb-6 justify-center">
          <span class="text-[var(--thumbnail-secondary-text-color)] text-xl font-bold tracking-[2px]">{{ configStore.rightHeaderText }}</span>
          <div v-if="configStore.showHeader && configStore.headerLinkText" class="px-5 py-2 border border-gray-500 rounded-lg bg-transparent">
            <span class="text-gray-200 text-lg font-medium">{{ configStore.headerLinkText }}</span>
          </div>
        </div>
        <div class="ui-card w-[95%] flex-grow bg-transparent border-none rounded-2xl flex justify-center items-center box-border overflow-hidden">
          <img 
            v-if="configStore.imageUrl && !isTextOnly" 
            :src="configStore.imageUrl" 
            alt="Image Preview" 
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    
    <div v-if="isTextOnly" id="text-only-layout" class="w-full h-full relative">
      <div id="text-only-main-content" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-full text-center">
        <div id="text-only-header" class="flex items-center gap-3 mb-4 justify-center">
          <span class="text-[28px] font-bold tracking-[2px] text-[var(--thumbnail-secondary-text-color)]">{{ configStore.rightHeaderText }}</span>
          <div v-if="configStore.showHeader && configStore.headerLinkText" class="px-5 py-2 border border-gray-500 rounded-lg bg-transparent">
            <span class="text-gray-200 text-lg font-medium">{{ configStore.headerLinkText }}</span>
          </div>
        </div>
        <div>
          <h1 id="text-only-title" class="text-[73px] font-extrabold leading-[1] m-0 text-[var(--thumbnail-main-text-color)]">{{ configStore.titleText }}</h1>
          <h1 id="text-only-reflection" class="text-[73px] font-extrabold leading-[1] m-0 text-[var(--thumbnail-main-text-color)] scale-y-[-1] opacity-30" style="margin-top: -1em;">{{ configStore.titleText }}</h1>
        </div>
      </div>
      <div id="text-only-footer" class="absolute bottom-[30px] left-1/2 transform -translate-x-1/2">
        <img v-if="configStore.useHandleLogo && configStore.handleLogo" :src="configStore.handleLogo" alt="Handle Logo" :style="`height: ${configStore.handleLogoSize}px`" class="object-contain" />
        <span v-else class="text-2xl text-[var(--thumbnail-secondary-text-color)]">{{ configStore.handleText }}</span>
      </div>
    </div>
    
    <div v-if="!isTextOnly" class="footer-text absolute bottom-[15px] left-[75%] transform -translate-x-1/2 text-[var(--thumbnail-secondary-text-color)] text-lg font-bold tracking-[4px]">{{ configStore.footerText }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConfigStore } from '../stores/configStore'

interface Props {
  isTextOnly: boolean
  backgroundStyle: any
}

const props = defineProps<Props>()

const {
  configStore
} = useConfigStore()

const thumbnailRef = ref<HTMLElement>()

const computedBackgroundStyle = computed(() => {
  const baseStyle = props.backgroundStyle || {}
  if (configStore.backgroundImage) {
    return {
      ...baseStyle,
      backgroundImage: `url(${configStore.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }
  return baseStyle
})
</script>
