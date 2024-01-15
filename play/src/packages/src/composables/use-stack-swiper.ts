import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import {
  CHANGE_EVENT,
  UPDATE_MODEL_EVENT,
} from '@tuniao/tnui-vue3-uniapp/constants'
import {
  useOrderedChildren,
  useSelectorQuery,
} from '@tuniao/tnui-vue3-uniapp/hooks'
import { debugWarn, generateId } from '@tuniao/tnui-vue3-uniapp/utils'
import { MAX_SWIPER_COUNT } from '../constant'
import { stackSwiperContextKey } from '../tokens'
import { useSwiperItem } from './use-swiper-item'

import type { CSSProperties, SetupContext } from 'vue'
import type { StackSwiperEmits, StackSwiperProps } from '../types'
import type { StackSwiperItemContext, SwitchSwiperItemEvent } from '../tokens'

export const useStackSwiper = (
  props: StackSwiperProps,
  emits: SetupContext<StackSwiperEmits>['emit']
) => {
  const instance = getCurrentInstance()
  const { getSelectorNodeInfo } = useSelectorQuery(instance)
  const {
    children: items,
    addChild,
    removeChild: removeItem,
  } = useOrderedChildren<StackSwiperItemContext>()

  const swiperItemCount = computed<number>(() => items.value.length || 0)
  const containerHeight = ref(0)
  const containerWidth = ref(0)
  const sliderSwitchDistance = computed<number>(() => {
    if (props.slideDirection === 'horizontal') {
      return containerWidth.value * props.switchRate
    } else if (props.slideDirection === 'vertical') {
      return containerHeight.value * props.switchRate
    }
    return 0
  })
  const {
    setSwiperItemStyleBySort,
    updateSwiperItemWithRateBySort,
    moveSwiperItemPositionByDistance,
  } = useSwiperItem(
    toRefs(props),
    swiperItemCount,
    containerWidth,
    containerHeight
  )

  // 自动轮播定时器
  let autoPlayIntervalTimer: ReturnType<typeof setInterval> | null = null

  // 当前激活的索引值
  const currentIndex = ref(0)
  const activeUid = ref(-1)
  watch(
    () => props.modelValue,
    (val) => {
      currentIndex.value = val || 0
      if (val !== undefined) {
        setTimeout(() => {
          _updateSwiperItemStyle()
        }, 50)
      }
    }
  )
  const nextSwiperIndex = computed<number>(() => {
    return (currentIndex.value + 1) % swiperItemCount.value
  })
  const prevSwiperIndex = computed<number>(() => {
    return (
      (currentIndex.value - 1 + swiperItemCount.value) % swiperItemCount.value
    )
  })

  // 添加swiperItem到items容器中
  const addItem = (item: StackSwiperItemContext) => {
    if (props.modelValue !== undefined && activeUid.value === -1) {
      if (props.modelValue === items.value.length) {
        nextTick(() => {
          updateActivehUid(item.uid)
        })
      }
    }
    addChild(item)
  }

  // 更新当前激活的Uid
  const updateActivehUid = (uid: number, changeEmit = false) => {
    activeUid.value = uid
    const index = items.value.findIndex((item) => item.uid === uid)

    emits(UPDATE_MODEL_EVENT, index)
    if (props.modelValue === undefined || props.modelValue === 0) {
      currentIndex.value = index
    }
    if (changeEmit) {
      emits(CHANGE_EVENT, uid)
    }
  }

  // 激活对应的item
  const switchSwiperItem = (event: SwitchSwiperItemEvent) => {
    if (event === 'reset') {
      _updateSwiperItemStyle()
      return
    }
    const uid =
      event === 'next'
        ? items.value[nextSwiperIndex.value].uid
        : items.value[prevSwiperIndex.value].uid
    updateActivehUid(uid, true)
    // 更新对应item的样式
    nextTick(() => {
      setTimeout(() => {
        _updateSwiperItemStyle()
      }, 50)
    })
  }

  // 处理item点击事件
  const itemClickHandle = () => {
    emits('click', currentIndex.value)
  }

  // item触摸事件
  const itemTouchHandle = (distanceX: number, distanceY: number) => {
    if (props.slideDirection === 'horizontal') {
      if (
        Math.abs(distanceX) >
        containerWidth.value * (1 - (props.scaleRate || 0))
      )
        return
      // 判断是向左滑动还是向右滑动
      const sliderLeft = distanceX < 0
      // 计算滑动的比例
      const sliderRate =
        distanceX / (containerWidth.value - sliderSwitchDistance.value)
      if (sliderLeft) {
        // 向左滑动
        // 更新所有item的样式
        for (let i = 0; i < swiperItemCount.value; i++) {
          let style: CSSProperties = {}
          if (currentIndex.value === i) {
            style = moveSwiperItemPositionByDistance(distanceX)
          } else {
            const sort = _getItemSortByIndex(i)
            style = updateSwiperItemWithRateBySort(sort, sliderRate)
          }
          items.value[i].style.value = style
        }
      } else {
        // 向右滑动
        // 更新所有item的样式
        for (let i = 0; i < swiperItemCount.value; i++) {
          let style: CSSProperties = {}
          if (i === prevSwiperIndex.value) {
            style = moveSwiperItemPositionByDistance(
              -(containerWidth.value * (1 - props.scaleRate) - distanceX),
              MAX_SWIPER_COUNT + 1
            )
          } else {
            const sort = _getItemSortByIndex(i)
            style = updateSwiperItemWithRateBySort(sort, sliderRate)
          }
          items.value[i].style.value = style
        }
      }
    } else if (props.slideDirection === 'vertical') {
      if (
        Math.abs(distanceY) >
        containerHeight.value * (1 - (props.scaleRate || 0))
      )
        return
      // 判断是向上滑动还是向下滑动
      const sliderTop = distanceY < 0
      // 计算滑动的比例
      const sliderRate =
        distanceY / (containerHeight.value - sliderSwitchDistance.value)
      if (sliderTop) {
        // 向上滑动
        // 更新所有item的样式
        for (let i = 0; i < swiperItemCount.value; i++) {
          let style: CSSProperties = {}
          if (currentIndex.value === i) {
            style = moveSwiperItemPositionByDistance(distanceY)
          } else {
            const sort = _getItemSortByIndex(i)
            style = updateSwiperItemWithRateBySort(sort, sliderRate)
          }
          items.value[i].style.value = style
        }
      } else {
        // 向下滑动
        // 更新所有item的样式
        for (let i = 0; i < swiperItemCount.value; i++) {
          let style: CSSProperties = {}
          if (i === prevSwiperIndex.value) {
            style = moveSwiperItemPositionByDistance(
              -(containerHeight.value * (1 - props.scaleRate) - distanceY),
              MAX_SWIPER_COUNT + 1
            )
          } else {
            const sort = _getItemSortByIndex(i)
            style = updateSwiperItemWithRateBySort(sort, sliderRate)
          }
          items.value[i].style.value = style
        }
      }
    }
  }

  // 暂停自动轮播
  const pauseAutoplay = () => {
    if (!autoPlayIntervalTimer || !props.autoplay) return
    clearInterval(autoPlayIntervalTimer)
    autoPlayIntervalTimer = null
  }

  // 开始自动轮播
  const startAutoplay = () => {
    if (!!autoPlayIntervalTimer || !props.autoplay) return
    autoPlayIntervalTimer = setInterval(() => {
      switchSwiperItem('next')
    }, props.interval)
  }

  // 更新所有item的样式
  const _updateSwiperItemStyle = (init = false) => {
    for (let i = 0; i < swiperItemCount.value; i++) {
      const sort = _getItemSortByIndex(i)
      items.value[i].style.value = setSwiperItemStyleBySort(sort, !init)
    }
  }

  // 通过索引获取对应item的排序
  const _getItemSortByIndex = (index: number): number => {
    const sort =
      index >= currentIndex.value
        ? index - currentIndex.value
        : swiperItemCount.value - currentIndex.value + index
    return sort
  }

  // 容器id
  const containerId = `tssc-${generateId()}`
  // 获取容器的节点信息
  let initCount = 0
  const getStackSwiperContainer = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(`#${containerId}`)
      containerHeight.value = rectInfo.height || 0
      containerWidth.value = rectInfo.width || 0
      nextTick(() => {
        _updateSwiperItemStyle(true)

        startAutoplay()
      })
    } catch (err) {
      if (initCount > 10) {
        debugWarn('[TnStackSwiper]', `获取容器节点信息失败: ${err}`)
        initCount = 0
        return
      }
      setTimeout(() => {
        getStackSwiperContainer()
        initCount++
      }, 150)
    }
  }

  provide(
    stackSwiperContextKey,
    reactive({
      ...props,
      sliderSwitchDistance,
      containerWidth,
      containerHeight,
      items,
      activeUid,
      addItem,
      removeItem,
      switchSwiperItem,
      itemClickHandle,
      itemTouchHandle,
      pauseAutoplay,
      startAutoplay,
    })
  )

  onMounted(() => {
    nextTick(() => {
      getStackSwiperContainer()
    })
  })

  onUnmounted(() => {
    if (autoPlayIntervalTimer) {
      clearInterval(autoPlayIntervalTimer)
      autoPlayIntervalTimer = null
    }
  })

  return {
    containerId,
  }
}
