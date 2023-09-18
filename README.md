# 图鸟 UI vue3 uniapp Plugins - 堆叠轮播

![TuniaoUI vue3 uniapp](https://resource.tuniaokj.com/images/vue3/market/vue3-banner-min.jpg 'TuniaoUI vue3 uniapp')

[Tuniao UI vue3官方仓库](https://github.com/tuniaoTech/tuniaoui-rc-vue3-uniapp)

该组件一般用户暂时多张堆叠在一起的轮播场景

## 组件安装

```bash
npm i tnuiv3p-tn-stack-swiper
```

## 组件位置

```bash
tnuiv3p-tn-stack-swiper/index.vue
tnuiv3p-tn-stack-swiper/item.vue
```

## 平台差异说明

| App(vue) | H5  | 微信小程序 | 支付宝小程序 |  ...   |
| :------: | :-: | :--------: | :----------: | :----: |
|    √     |  √  |     √      |      √       | 适配中 |

## 基础使用

- 通过`v-model` \ `model-value`来绑定当前选中item的索引值，如果没有设置则默认为0
- 在`TnStackSwiper`组件内部使用`TnStackSwiperItem`组件来包裹每一个item

```vue
<script setup lang="ts">
import TnStackSwiper from 'tnuiv3p-tn-stack-swiper/index.vue'
import TnStackSwiperItem from 'tnuiv3p-tn-stack-swiper/item.vue'
</script>

<template>
  <view class="content">
    <view class="swiper">
      <TnStackSwiper>
        <TnStackSwiperItem>
          <view class="swiper-item tn-bluepurple_bg">1</view>
        </TnStackSwiperItem>
        <TnStackSwiperItem>
          <view class="swiper-item tn-aquablue_bg">2</view>
        </TnStackSwiperItem>
        <TnStackSwiperItem>
          <view class="swiper-item tn-blue_bg">3</view>
        </TnStackSwiperItem>
        <TnStackSwiperItem>
          <view class="swiper-item tn-cyan_bg">4</view>
        </TnStackSwiperItem>
      </TnStackSwiper>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  padding: 30rpx;

  .swiper {
    position: relative;
    width: 100%;
    height: 400rpx;

    .swiper-item {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50rpx;
      color: #fff;
    }
  }
}
</style>
```

## 修改轮播宽高

默认轮播的宽高为父容器的宽高，如果需要修改轮播的宽高，可以通过`width` \ `height`来设置

```vue
<template>
  <TnStackSwiper width="80vw" height="400">
    <TnStackSwiperItem>
      <view class="swiper-item tn-bluepurple_bg">1</view>
    </TnStackSwiperItem>
    <TnStackSwiperItem>
      <view class="swiper-item tn-aquablue_bg">2</view>
    </TnStackSwiperItem>
    <TnStackSwiperItem>
      <view class="swiper-item tn-blue_bg">3</view>
    </TnStackSwiperItem>
    <TnStackSwiperItem>
      <view class="swiper-item tn-cyan_bg">4</view>
    </TnStackSwiperItem>
  </TnStackSwiper>
</template>
```

## 修改堆叠轮播的切换方向

默认堆叠轮播的切换方向为`horizontal`，如果需要修改堆叠轮播的切换方向，可以通过`slider-direction`来设置

```vue
<template>
  <TnStackSwiper slide-direction="vertical">
    <TnStackSwiperItem>
      <view class="swiper-item tn-bluepurple_bg">1</view>
    </TnStackSwiperItem>
    <TnStackSwiperItem>
      <view class="swiper-item tn-aquablue_bg">2</view>
    </TnStackSwiperItem>
    <TnStackSwiperItem>
      <view class="swiper-item tn-blue_bg">3</view>
    </TnStackSwiperItem>
    <TnStackSwiperItem>
      <view class="swiper-item tn-cyan_bg">4</view>
    </TnStackSwiperItem>
  </TnStackSwiper>
</template>
```

## API

### TnStackSwiperProps

| 属性名                  | 说明                                    | 类型    | 默认值       | 可选值     |
| ----------------------- | --------------------------------------- | ------- | ------------ | ---------- |
| `v-model`/`model-value` | 当前轮播对应激活的`item`的`index`索引值 | Number  | 0            | -          |
| width                   | 容器的宽度，默认单位`rpx`               | String  | 100%         | -          |
| height                  | 容器的高度，默认单位`rpx`               | String  | 100%         | -          |
| autoplay                | 是否自动切换轮播                        | Boolean | `false`      | `true`     |
| interval                | 轮播切换时间                            | Number  | 5000         | -          |
| switch-rate             | 滑动切换移动比例, 0 ~ 1                 | Number  | 0.13         | -          |
| scale-rate              | item之间的缩放比例, 0 ~ 1               | Number  | 0.08         | -          |
| opacity-rate            | item之间的透明度, 0 ~ 1                 | Number  | 0.18         | -          |
| slide-direction         | 轮播滑动方向                            | String  | `horizontal` | `vertical` |

### TnStackSwiperEmits

| 事件名 | 说明           | 类型                      |
| ------ | -------------- | ------------------------- |
| change | 轮播切换时触发 | `(index: number) => void` |
| click  | 轮播点击事件   | `(index: number) => void` |
