import { reactive } from 'vue'

export const configStore = reactive({
  handleText: '@rk.dev',
  titleText: 'Input Data',
  rightHeaderText: 'Input Data',
  footerText: 'Input Data',
  imageUrl: '',
  headerText: 'NOW AVAILABLE ON',
  headerLinkText: 'fivelink.lol',
  showHeader: true
})

export function useConfigStore() {
  return {
    configStore
  }
}
