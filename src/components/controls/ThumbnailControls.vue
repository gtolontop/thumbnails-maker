<template>
  <div class="controls grid grid-cols-4 gap-4 bg-[var(--controls-bg-color)] p-6 rounded-xl w-[1600px] box-border transition-colors duration-300">
    <div class="control-group flex flex-col">
      <label class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-at mr-2"></i>Handle (Text/Logo)
      </label>
      <div class="space-y-2">
        <input
          v-if="!configStore.useHandleLogo"
          id="handle-text"
          type="text"
          :value="configStore.handleText"
          @input="updateHandleText"
          class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
          placeholder="Enter handle text"
        />
        <FileUpload
          v-if="configStore.useHandleLogo"
          id="handle-logo"
          label="Upload logo"
          accept="image/*"
          @fileSelected="updateHandleLogo"
        />
        <label class="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            v-model="configStore.useHandleLogo"
            class="appearance-none relative w-4 h-4 bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded cursor-pointer checked:bg-[var(--button-primary-bg-color)] checked:border-[var(--button-primary-bg-color)] checked:after:content-[''] checked:after:absolute checked:after:top-0.5 checked:after:left-1.5 checked:after:w-[3px] checked:after:h-[7px] checked:after:border-solid checked:after:border-[var(--input-text-color)_0_2px_2px_0] checked:after:rotate-45"
          />
          Use logo instead of text
        </label>
        <div v-if="configStore.useHandleLogo && configStore.handleLogo" class="mt-2 space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs text-[var(--thumbnail-secondary-text-color)]">Logo size: {{ configStore.handleLogoSize }}px</label>
            <button
              @click="removeHandleLogo"
              class="text-red-500 hover:text-red-600 text-xs"
            >
              <i class="fas fa-times mr-1"></i>Remove
            </button>
          </div>
          <input
            type="range"
            min="16"
            max="80"
            v-model.number="configStore.handleLogoSize"
            class="w-full h-2 bg-[var(--input-bg-color)] rounded-lg appearance-none cursor-pointer accent-[var(--button-primary-bg-color)]"
          />
        </div>
      </div>
    </div>

    <div class="control-group flex flex-col">
      <label for="title-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-heading mr-2"></i>Title Text
      </label>
      <input
        id="title-text"
        type="text"
        :value="configStore.titleText"
        @input="updateTitleText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter title text"
      />
    </div>

    <div class="control-group flex flex-col">
      <label for="right-header-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-align-right mr-2"></i>Right Header Text
      </label>
      <input
        id="right-header-text"
        type="text"
        :value="configStore.rightHeaderText"
        @input="updateRightHeaderText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter right header text"
      />
    </div>

    <div class="control-group flex flex-col">
      <label for="footer-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-shoe-prints mr-2"></i>Footer Text
      </label>
      <input
        id="footer-text"
        type="text"
        :value="configStore.footerText"
        @input="updateFooterText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter footer text"
      />
    </div>

    <div class="control-group flex flex-col">
      <label class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-image mr-2"></i>Image
      </label>
      <FileUpload
        id="main-image"
        label="Upload image"
        accept="image/*"
        @fileSelected="updateMainImage"
      />
      <button
        v-if="configStore.imageUrl"
        @click="removeMainImage"
        class="mt-2 text-red-500 hover:text-red-600 text-xs flex items-center"
      >
        <i class="fas fa-times mr-1"></i>Remove image
      </button>
    </div>

    <div class="control-group flex flex-col">
      <label class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-image mr-2"></i>Background Image
      </label>
      <FileUpload
        id="background-image"
        label="Upload background"
        accept="image/*"
        @fileSelected="updateBackgroundImage"
      />
      <button
        v-if="configStore.backgroundImage"
        @click="removeBackgroundImage"
        class="mt-2 text-red-500 hover:text-red-600 text-xs flex items-center"
      >
        <i class="fas fa-times mr-1"></i>Remove background
      </button>
    </div>


    <div class="control-group flex flex-col">
      <label for="header-link-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-link mr-2"></i>Header Link
      </label>
      <input
        id="header-link-text"
        type="text"
        :value="configStore.headerLinkText"
        @input="updateHeaderLinkText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter link text"
      />
    </div>
    <ColorScheme
      :selected-theme="selectedTheme"
      :themes="themes"
      @update:selected-theme="updateSelectedTheme"
      @theme-change="updateTheme"
    />
    <div class="control-group flex flex-col">
      <label for="grid-toggle" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">Show Grid</label>
      <input 
        type="checkbox" 
        id="grid-toggle" 
        :checked="showGrid"
        @change="updateShowGrid"
        class="appearance-none relative w-6 h-6 bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-md cursor-pointer mt-2 inline-block align-middle checked:bg-[var(--button-primary-bg-color)] checked:border-[var(--button-primary-bg-color)] checked:after:content-[''] checked:after:absolute checked:after:top-1 checked:after:left-2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-solid checked:after:border-[var(--input-text-color)_0_3px_3px_0] checked:after:rotate-45"
      >
    </div>
    <div class="control-group flex flex-col">
      <label for="disable-image-toggle" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">Disable Image</label>
      <input 
        type="checkbox" 
        id="disable-image-toggle" 
        :checked="isTextOnly"
        @change="updateIsTextOnly"
        class="appearance-none relative w-6 h-6 bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-md cursor-pointer mt-2 inline-block align-middle checked:bg-[var(--button-primary-bg-color)] checked:border-[var(--button-primary-bg-color)] checked:after:content-[''] checked:after:absolute checked:after:top-1 checked:after:left-2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-solid checked:after:border-[var(--input-text-color)_0_3px_3px_0] checked:after:rotate-45"
      >
    </div>
    <div class="control-group flex flex-col">
      <label class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">Download</label>
      <DownloadButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import DownloadButton from './DownloadButton.vue'
import ColorScheme from './ColorScheme.vue'
import FileUpload from './FileUpload.vue'
import type { Theme } from '../../stores/savedThemes'
import { useConfigStore } from '../../stores/configStore'

interface Props {
  selectedTheme: string
  showGrid: boolean
  isTextOnly: boolean
  themes: Record<string, Theme>
}

interface Emits {
  (e: 'update:selectedTheme', value: string): void
  (e: 'update:showGrid', value: boolean): void
  (e: 'update:isTextOnly', value: boolean): void
  (e: 'themeChange', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const {
  configStore
} = useConfigStore()

function updateHandleText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.handleText = target.value
}

function updateTitleText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.titleText = target.value
}

function updateRightHeaderText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.rightHeaderText = target.value
}

function updateFooterText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.footerText = target.value
}


function updateHeaderLinkText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.headerLinkText = target.value
}


function updateSelectedTheme(themeKey: string) {
  emit('update:selectedTheme', themeKey)
}

function updateTheme(themeKey: string) {
  emit('themeChange', themeKey)
}

function updateShowGrid(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:showGrid', target.checked)
}

function updateIsTextOnly(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:isTextOnly', target.checked)
}

function updateHandleLogo(dataUrl: string) {
  configStore.handleLogo = dataUrl
}

function updateMainImage(dataUrl: string) {
  configStore.imageUrl = dataUrl
}

function updateBackgroundImage(dataUrl: string) {
  configStore.backgroundImage = dataUrl
}

function removeHandleLogo() {
  configStore.handleLogo = ''
  configStore.useHandleLogo = false
}

function removeMainImage() {
  configStore.imageUrl = ''
}

function removeBackgroundImage() {
  configStore.backgroundImage = ''
}
</script>

<style scoped>
.controls select::-webkit-scrollbar {
  width: 8px;
}

.controls select::-webkit-scrollbar-track {
  background: var(--input-bg-color);
  border-radius: 4px;
}

.controls select::-webkit-scrollbar-thumb {
  background: var(--button-primary-bg-color);
  border-radius: 4px;
  transition: background-color 0.2s;
}

.controls select::-webkit-scrollbar-thumb:hover {
  background: var(--button-primary-hover-bg-color);
}

.controls select {
  scrollbar-width: thin;
  scrollbar-color: var(--button-primary-bg-color) var(--input-bg-color);
}

.controls select option {
  background-color: var(--input-bg-color);
  color: var(--input-text-color);
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.controls select option:hover {
  background-color: var(--button-primary-bg-color);
}

.controls select option:checked {
  background-color: var(--button-primary-hover-bg-color);
  font-weight: 600;
}
</style>
