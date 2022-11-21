<template>
  <view class="good-item">
    <!-- 左侧图片 -->
    <view class="good-pic">
      <radio :checked="good.goods_state" color="#c00000" v-if="showRadio" @click="radioChangeHandler"></radio>
      <image :src="good.goods_small_logo || defaultPic"></image>
    </view>
    <!-- 右侧信息 -->
    <view class="good-info">
      <view class="good-title">{{ good.goods_name }}</view>
      <view class="good-info-box">
        <view class="good-price">￥{{ good.goods_price | tofixed }}</view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" :value="num" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>

    </view>
  </view>
</template>
  
<script>
export default {
  props: {
    good: {
      type: Object,
      default: []
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      num: this.good.goods_count
    }
  },
  methods: {
    radioChangeHandler() {
      this.$emit('radio-change', {
        goods_id: this.good.goods_id,
        goods_state: !this.good.goods_state
      })
    },
    numChangeHandler(num) {
      this.$emit('num-change', {
        goods_id: this.good.goods_id,
        goods_count: +num
      })
    }
  }
}
</script>
  
<style lang="scss">
.good-item {
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 5px;

  .good-pic {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
    .good-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .good-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>