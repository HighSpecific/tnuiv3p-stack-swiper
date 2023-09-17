import {
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import { DEFAULT_SWITCH_DISTANCE } from '../constant'
import { stackSwiperContextKey } from '../tokens'

import type { CSSProperties } from 'vue'

export const useStackSwiperItem = () => {
  const instance = getCurrentInstance()
  const { uid } = instance!

  const stackSwiperContext = inject(stackSwiperContextKey)

  const swiperItemStyle = ref<CSSProperties>({})

  const initStackSwiperItem = () => {
    stackSwiperContext?.addItem({
      uid,
      style: swiperItemStyle,
    })
  }

  // item点击事件
  const itemClickHandle = () => {
    stackSwiperContext?.itemClickHandle()
  }

  // 触摸事件处理
  let startTouchFlag = false
  let touchStartX = 0
  let touchStartY = 0
  // 通过滑动的时间来判断是否是点击事件
  let touchStartTime = 0
  const startTouchHandle = (e: TouchEvent) => {
    const touch = e.changedTouches?.[0]
    if (!touch) return
    touchStartX = touch.clientX
    touchStartY = touch.clientY
    touchStartTime = Date.now()
    startTouchFlag = true
  }
  const moveTouchHandle = (e: TouchEvent) => {
    const touch = e.changedTouches?.[0]
    if (!startTouchFlag || !touch) return
    const { clientX, clientY } = touch
    if (stackSwiperContext?.slideDirection === 'horizontal') {
      // 水平滑动只判断X轴
      const distanceX = clientX - touchStartX
      stackSwiperContext?.itemTouchHandle(distanceX, 0)
    } else if (stackSwiperContext?.slideDirection === 'vertical') {
      // 垂直滑动只判断Y轴
      const distanceY = clientY - touchStartY
      stackSwiperContext?.itemTouchHandle(0, distanceY)
    }
  }
  const endTouchHandle = (e: TouchEvent) => {
    const touch = e.changedTouches?.[0]
    if (!startTouchFlag || !touch) return
    const { clientX, clientY } = touch
    const nowTime = Date.now()
    // 判断是否为点击事件/切换item事件
    if (nowTime - touchStartTime < 300) {
      // 结算滑动距离
      let touchDistance = 0
      if (stackSwiperContext?.slideDirection === 'horizontal') {
        touchDistance = clientX - touchStartX
      } else if (stackSwiperContext?.slideDirection === 'vertical') {
        touchDistance = clientY - touchStartY
      }
      if (Math.abs(touchDistance) < 5) {
        // 点击事件
        itemClickHandle()
      } else {
        if (
          -touchDistance >
          (stackSwiperContext?.sliderSwitchDistance || DEFAULT_SWITCH_DISTANCE)
        ) {
          // 切换下一个元素
          stackSwiperContext?.switchSwiperItem('next')
        } else if (
          touchDistance >
          (stackSwiperContext?.sliderSwitchDistance || DEFAULT_SWITCH_DISTANCE)
        ) {
          // 切换上一个元素
          stackSwiperContext?.switchSwiperItem('prev')
        } else {
          // 重置当前item的位置
          stackSwiperContext?.switchSwiperItem('reset')
        }
      }
    } else {
      // 重置当前item的位置
      stackSwiperContext?.switchSwiperItem('reset')
    }

    touchStartX = 0
    touchStartY = 0
    startTouchFlag = false
  }

  onMounted(() => {
    nextTick(() => {
      initStackSwiperItem()
    })
  })

  onUnmounted(() => {
    stackSwiperContext?.removeItem(uid)
  })

  return {
    swiperItemStyle,
    itemClickHandle,
    startTouchHandle,
    moveTouchHandle,
    endTouchHandle,
  }
}
