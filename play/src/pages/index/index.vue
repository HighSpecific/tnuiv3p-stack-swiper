<script setup lang="ts">
import TnStackSwiper from '../../packages/src/index.vue'
import TnStackSwiperItem from '../../packages/src/item.vue'
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

    <view class="swiper vertical">
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
    background-color: #e7e7e7;

    &.vertical {
      height: 800rpx;
    }

    & + .swiper {
      margin-top: 30rpx;
    }

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
      /* opacity: 0.5; */
    }
  }
}
</style>
