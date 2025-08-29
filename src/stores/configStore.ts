import { reactive } from 'vue'

export const configStore = reactive({
  handleText: '@rk.dev',
  titleText: 'Input Data',
  rightHeaderText: 'NOW AVAILABLE ON',
  footerText: 'Input Data',
  imageUrl: '',
  headerLinkText: 'fivelink.lol',
  showHeader: true,
  handleLogo: '',
  useHandleLogo: false,
  backgroundImage: '',
  handleLogoSize: 32
})

export function useConfigStore() {
  return {
    configStore
  }
}
