<script lang="ts" setup>
import { stackSwiperEmits, stackSwiperProps } from './types'
import { useStackSwiper, useStackSwiperCustomStyle } from './composables'

const props = defineProps(stackSwiperProps)
const emits = defineEmits(stackSwiperEmits)

const { containerId } = useStackSwiper(props, emits)
const { ns } = useStackSwiperCustomStyle()
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>
// #endif

<template>
  <view :id="containerId" :class="[ns.b()]">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import './theme-chalk/index.scss';
</style>
