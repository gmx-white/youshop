<template>
  <view class="cart-container" v-if="cart.length > 0">
    <my-address></my-address>
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表 -->
    <view class="goods-list">
      <uni-swipe-action>
        <block class="goods-items" v-for="(good, i) in cart" :key="good.goods_id">
          <uni-swipe-action-item :right-options="swipeOptions" @click="swipeHandler(good.goods_id)">
            <goods :good="good" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler"
              @num-change="numChangeHandler"></goods>
          </uni-swipe-action-item>

        </block>
      </uni-swipe-action>

    </view>
    <!-- 结算 -->
    <my-settle></my-settle>
  </view>
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-pic"></image>
    <text class="empty-text">购物车是空的哦~</text>
  </view>
</template>

<script>
import badgeMix from '../../mixins/tabbar-badge'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [badgeMix],
  props: {},
  data() {
    return {
      swipeOptions: [{
        text: "删除",
        style: {
          backgroundColor: "#c00000"
        }
      }]
    };
  },
  watch: {},
  computed: {
    ...mapState('m_cart', ['cart'])
  },
  methods: {
    ...mapMutations('m_cart', ['updateGoodState', 'updateGoodCount', 'removeGood']),
    radioChangeHandler(e) {
      this.updateGoodState(e)
    },
    numChangeHandler(e) {
      this.updateGoodCount(e)
    },
    swipeHandler(id) {
      this.removeGood(id)
    }
  },
  onLoad() {
    // console.log(this.cart);
  },
};
</script>
<style lang="scss" scoped>
.cart-container {
  padding-bottom: 50px;
}
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;

  .cart-title-text {
    margin-left: 10px;
  }
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-pic {
    width: 90px;
    height: 90px;
  }

  .empty-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>