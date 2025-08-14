import { reactive } from 'vue'

export const configStore = reactive({
  handleText: '@rk.dev',
  titleText: 'Input Data',
  rightHeaderText: 'Input Data',
  footerText: 'Input Data',
  imageUrl: ''
})

export function useConfigStore() {
  return {
    configStore
  }
}
