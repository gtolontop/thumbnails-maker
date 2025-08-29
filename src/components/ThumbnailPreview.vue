<template>
  <div 
    id="thumbnail"
    ref="thumbnailRef"
    class="w-[1600px] h-[800px] bg-[var(--thumbnail-bg-color)] relative overflow-hidden p-[60px_80px] box-border transition-colors duration-300"
    :style="computedBackgroundStyle"
  >
    <!-- Glow ellipse at the top -->
    <div 
      class="absolute -top-[50px] left-1/2 transform -translate-x-1/2 w-[800px] h-[200px] pointer-events-none z-[1]"
      style="background: radial-gradient(ellipse at center, rgba(207, 250, 254, 0.15) 0%, rgba(207, 250, 254, 0.08) 30%, rgba(207, 250, 254, 0.03) 60%, transparent 100%); filter: blur(40px);"
    ></div>
    <div v-if="!isTextOnly" id="default-layout" class="flex justify-between items-center w-full h-full">
      <div class="left-panel flex flex-col justify-center h-full w-1/2 relative -left-10">
        <div class="handle mb-4">
          <img v-if="configStore.useHandleLogo && configStore.handleLogo" :src="configStore.handleLogo" alt="Handle Logo" :style="`height: ${configStore.handleLogoSize}px`" class="object-contain" />
          <span v-else class="text-[var(--thumbnail-secondary-text-color)] text-2xl">{{ configStore.handleText }}</span>
        </div>
        <div class="title-container relative">
          <h1 class="title text-[130px] font-extrabold leading-[1] m-0 whitespace-nowrap" style="color: #9EA4BE;">{{ configStore.titleText }}</h1>
          <div class="reflect-wrapper absolute left-0 w-full overflow-hidden" style="top: calc(100% - 32px); height: 130px;">
            <h1 class="text-[130px] font-extrabold leading-[1] m-0 whitespace-nowrap transform scale-y-[-1] opacity-30" 
                style="color: #9EA4BE;
                       background: linear-gradient(to bottom, transparent 20%, #9EA4BE 100%); 
                       -webkit-background-clip: text; 
                       -webkit-text-fill-color: transparent;
                       background-clip: text;">
              {{ configStore.titleText }}
            </h1>
          </div>
        </div>
      </div>
      <div class="right-panel flex flex-col items-center justify-start h-full w-1/2 relative -right-10">
        <div class="right-panel-header mb-6 flex items-center justify-center gap-6">
          <span class="text-white text-2xl font-medium tracking-[0.15em] uppercase">{{ configStore.rightHeaderText }}</span>
          <div v-if="configStore.headerLinkText" class="inline-block">
            <div class="px-6 py-2 rounded-lg" style="background-color: #333645;">
              <span class="text-2xl font-semibold tracking-[0.12em] uppercase" style="color: #9DA3BB;">{{ configStore.headerLinkText }}</span>
            </div>
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
    
    <div v-if="isTextOnly" id="text-only-layout" class="w-full h-full flex flex-col justify-center items-center">
      <div class="flex flex-col items-center" :style="configStore.useHandleLogo && configStore.handleLogo ? 'gap: 80px' : 'gap: 48px'">
        <div id="text-only-header" class="flex items-center justify-center gap-3">
          <span class="text-white text-[32px] font-bold tracking-[0.25em] uppercase">{{ configStore.rightHeaderText }}</span>
          <div v-if="configStore.headerLinkText" class="inline-block">
            <div class="px-6 py-1 rounded-lg" style="background-color: #333645;">
              <span class="text-[32px] font-bold tracking-[0.22em] uppercase" style="color: #9DA3BB;">{{ configStore.headerLinkText }}</span>
            </div>
          </div>
        </div>
        
        <div id="text-only-main-content" class="flex items-center justify-center" :style="configStore.useHandleLogo && configStore.handleLogo ? 'margin-bottom: 100px' : ''">
          <div class="relative inline-block">
            <h1 id="text-only-title" class="text-[140px] font-extrabold leading-[1] m-0 whitespace-nowrap" style="color: #9EA4BE;">{{ configStore.titleText }}</h1>
            <div class="absolute left-0 w-full overflow-hidden" style="top: calc(100% - 35px); height: 140px;">
              <h1 class="text-[140px] font-extrabold leading-[1] m-0 whitespace-nowrap transform scale-y-[-1] opacity-30" 
                  style="color: #9EA4BE;
                         background: linear-gradient(to bottom, transparent 20%, #9EA4BE 100%); 
                         -webkit-background-clip: text; 
                         -webkit-text-fill-color: transparent;
                         background-clip: text;">
                {{ configStore.titleText }}
              </h1>
            </div>
          </div>
        </div>
        
        <div v-if="configStore.useHandleLogo && configStore.handleLogo || configStore.handleText" id="text-only-footer">
          <img v-if="configStore.useHandleLogo && configStore.handleLogo" :src="configStore.handleLogo" alt="Handle Logo" :style="`height: ${configStore.handleLogoSize}px`" class="object-contain" />
          <span v-else class="text-2xl text-[var(--thumbnail-secondary-text-color)]">{{ configStore.handleText }}</span>
        </div>
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

