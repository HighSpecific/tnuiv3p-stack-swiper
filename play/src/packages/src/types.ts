import {
  CHANGE_EVENT,
  UPDATE_MODEL_EVENT,
} from '@tuniao/tnui-vue3-uniapp/constants'
import { buildProps, isNumber } from '@tuniao/tnui-vue3-uniapp/utils'

import type { ExtractPropTypes } from 'vue'

export const stackSwiperSlideDirection = ['horizontal', 'vertical'] as const
export type StackSwiperSlideDirection =
  (typeof stackSwiperSlideDirection)[number]

export const stackScaleDirection = ['top', 'bottom', 'left', 'right'] as const
export type StackScaleDirection = (typeof stackScaleDirection)[number]

export const stackSwiperProps = buildProps({
  /**
   * @description 当前显示得轮播索引
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 轮播容器得宽度
   */
  width: {
    type: String,
    default: '100%',
  },
  /**
   * @description 轮播容器得高度
   */
  height: {
    type: String,
    default: '100%',
  },
  /**
   * @description 自动切换
   */
  autoplay: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 自动切换时间间隔，单位ms
   */
  interval: {
    type: Number,
    default: 5000,
  },
  /**
   * @description 滑动切换移动比例, 0 ~ 1
   */
  switchRate: {
    type: Number,
    default: 0.13,
  },
  /**
   * @description item之间的缩放比例, 0 ~ 1
   */
  scaleRate: {
    type: Number,
    default: 0.08,
  },
  /**
   * @description item之间的透明度, 0 ~ 1
   */
  opacityRate: {
    type: Number,
    default: 0.18,
  },
  /**
   * @description 轮播滑动方向
   */
  slideDirection: {
    type: String,
    values: stackSwiperSlideDirection,
    default: 'horizontal',
  },
  /**
   * @description 缩放的方向
   */
  scaleDirection: {
    type: String,
    values: stackScaleDirection,
    default: '',
  },
})

export const stackSwiperEmits = {
  [UPDATE_MODEL_EVENT]: (index: number) => isNumber(index),
  [CHANGE_EVENT]: (index: number) => isNumber(index),
  /**
   * @description 点击事件
   */
  click: (index: number) => isNumber(index),
}

export type StackSwiperProps = ExtractPropTypes<typeof stackSwiperProps>
export type StackSwiperEmits = typeof stackSwiperEmits
