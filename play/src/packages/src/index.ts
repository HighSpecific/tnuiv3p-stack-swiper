import { withInstall, withNoopInstall } from '@tuniao/tnui-vue3-uniapp/utils'
import stackSwiper from './index.vue'
import stackSwiperItem from './item.vue'

export const StackSwiper = withInstall(stackSwiper, {
  stackSwiperItem,
})
export const StackSwiperItem = withNoopInstall(stackSwiperItem)
export default StackSwiper

export * from './types'
export type {
  TnStackSwiperInstance,
  TnStackSwiperItemInstance,
} from './instance'
