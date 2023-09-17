import { useNamespace } from '@tuniao/tnui-vue3-uniapp/hooks/use-namespace'

export const useStackSwiperCustomStyle = () => {
  const ns = useNamespace('stack-swiper')
  const itemNs = useNamespace('stack-swiper-item')

  return {
    ns,
    itemNs,
  }
}
