import type { CSSProperties, InjectionKey, Ref } from 'vue'
import type { StackSwiperProps } from '../types'

export type SwitchSwiperItemEvent = 'next' | 'prev' | 'reset'

export type StackSwiperItemContext = {
  uid: number
  style: Ref<CSSProperties>
}

export type StackSwiperContext = Pick<StackSwiperProps, 'slideDirection'> & {
  sliderSwitchDistance: number
  containerWidth: number
  containerHeight: number
  items: StackSwiperItemContext[]
  activeUid: number
  addItem: (item: StackSwiperItemContext) => void
  removeItem: (uid: number) => void
  switchSwiperItem: (event: SwitchSwiperItemEvent) => void
  itemClickHandle: () => void
  itemTouchHandle: (distanceX: number, distanceY: number) => void
  pauseAutoplay: () => void
  startAutoplay: () => void
}

export const stackSwiperContextKey: InjectionKey<StackSwiperContext> = Symbol(
  'stackSwiperContextKey'
)
