import { MAX_SWIPER_COUNT, SWIPER_ANIMATION_DURATION } from '../constant'
import type { CSSProperties, Ref, ToRefs } from 'vue'
import type { StackSwiperProps } from '../types'

const HorizontalItemBaseStyleProps: CSSProperties = {
  transformOrigin: 'left center',
}
const VerticalItemBaseStyleProps: CSSProperties = {
  transformOrigin: 'center top',
}

const AnimationBaseStyleProps: CSSProperties = {
  transitionProperty: 'transform opacity',
  transitionTimingFunction: 'linear',
}

export const useSwiperItem = (
  props: ToRefs<StackSwiperProps>,
  swiperCount: Ref<number>,
  swiperWidth: Ref<number>,
  swiperHeight: Ref<number>
) => {
  // 通过sort排序设置swiperItem的样式
  const setSwiperItemStyleBySort = (sort: number, animation = false) => {
    // 缩放比例
    const scale = _getScaleRateWithRateBySort(sort)

    // 位置偏移比例
    const { x: translateX, y: translateY } = _getTranslateWithRateBySort(sort)

    const style: CSSProperties = {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1 - props.opacityRate.value * sort,
      zIndex: MAX_SWIPER_COUNT - sort,
    }

    return {
      ..._concatBaseItemStyle([
        _setAnimation(animation ? SWIPER_ANIMATION_DURATION : 0),
        style,
      ]),
    }
  }

  // 根据比例更新swiperItem的样式
  const updateSwiperItemWithRateBySort = (sort: number, rate: number) => {
    // 缩放比例
    const scale = _getScaleRateWithRateBySort(sort, rate)

    // 位置偏移比例
    const { x: translateX, y: translateY } = _getTranslateWithRateBySort(
      sort,
      rate
    )

    const style: CSSProperties = {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1 - props.opacityRate.value * (sort + rate),
      zIndex: MAX_SWIPER_COUNT - sort,
    }

    return {
      ..._concatBaseItemStyle([_setAnimation(), style]),
    }
  }

  // 根据移动的距离更新swiperItem的位置
  const moveSwiperItemPositionByDistance = (
    distance: number,
    zIndex?: number
  ) => {
    // 缩放比例
    const scale = _getScaleRateWithRateBySort(0)

    let translateX = 0
    let translateY = 0
    if (props.slideDirection.value === 'horizontal') {
      translateX = distance
    } else {
      translateY = distance
    }
    const style: CSSProperties = {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1,
      zIndex: zIndex === undefined ? MAX_SWIPER_COUNT : zIndex,
    }

    return {
      ..._concatBaseItemStyle([_setAnimation(), style]),
    }
  }

  // 通过sort计算缩放比例
  const _getScaleRateWithRateBySort = (sort: number, rate = 0): number =>
    1 - props.scaleRate.value * (sort + 1 + rate)

  // 通过sort计算位置偏移比例
  const _getTranslateWithRateBySort = (
    sort: number,
    rate = 0
  ): { x: number; y: number } => {
    const translateCardinality =
      (sort + rate) * (1 + 1 / (swiperCount.value - 1)) * props.scaleRate.value
    let x = swiperWidth.value * translateCardinality
    let y = swiperHeight.value * translateCardinality
    if (props.slideDirection.value === 'vertical') {
      x = 0
    } else {
      y = 0
    }
    return { x, y }
  }

  // 拼接水平、垂直方向上的基础样式
  const _concatBaseItemStyle = (style: CSSProperties[]): CSSProperties => {
    return {
      ...Object.assign(
        props.slideDirection.value === 'horizontal'
          ? HorizontalItemBaseStyleProps
          : VerticalItemBaseStyleProps,
        ...style
      ),
    }
  }

  // 设置动画
  const _setAnimation = (duration = 0): CSSProperties => {
    return Object.assign(AnimationBaseStyleProps, {
      transitionDuration: `${duration}ms`,
    })
  }
  return {
    setSwiperItemStyleBySort,
    updateSwiperItemWithRateBySort,
    moveSwiperItemPositionByDistance,
  }
}
