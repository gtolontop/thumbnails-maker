import { reactive } from 'vue'

export const configStore = reactive({
  handleText: '',
  titleText: 'Input Data',
  rightHeaderText: 'NOW AVAILABLE ON',
  footerText: 'Input Data',
  imageUrl: '',
  headerLinkText: 'fivelink.lol',
  handleLogo: '',
  useHandleLogo: true,
  backgroundImage: '',
  handleLogoSize: 32
})

export function useConfigStore() {
  return {
    configStore
  }
}
