<template>
  <view class="good-item">
    <!-- 左侧图片 -->
    <view class="good-pic">
      <image :src="good.goods_small_logo || defaultPic"></image>
    </view>
    <!-- 右侧信息 -->
    <view class="good-info">
      <view class="good-title">{{ good.goods_name }}</view>
      <view class="good-price">￥{{ good.goods_price | tofixed }}</view>
    </view>
  </view>
</template>
  
<script>
export default {
  props: {
    good: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
    }
  },

  filters: {
    tofixed(num) {
      return Number(num).toFixed(2)
    }
  }
}
</script>
  
<style lang="scss">
.good-item {
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid #f0f0f0;

  .good-pic {
    margin-right: 5px;

    image {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .good-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .good-title {
      font-size: 13px;
    }

    .good-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>