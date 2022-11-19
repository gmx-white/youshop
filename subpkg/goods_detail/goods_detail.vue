<template>
  <view>
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay duration="1500" circular>
      <swiper-item v-for="(item, i) in goods_info.pics" :key="item.pics_id">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!--商品详情 -->
    <view class="goods-info">
      <view class="goods-price" v-if="goods_info.goods_price">￥{{ goods_info.goods_price | tofixed }}</view>
      <view class="goods-info-body">
        <!-- 标题 -->
        <view class="goods-name multi-line" v-if="goods_info.goods_name">
          {{ goods_info.goods_name }}
        </view>
        <!-- 收藏 -->
        <view class="goods-favi">
          <uni-icons type="heart"></uni-icons>
          <view>收藏</view>
        </view>
      </view>
      <!-- 运费 -->
      <view class="goods-freight">快递：免运费</view>
      <!-- 商品详情信息 -->
      <rich-text :nodes="goods_info.goods_introduce">
      </rich-text>

    </view>
    <!-- 商品导航 -->
    <view class="goods_nav">
      <uni-goods-nav fill :buttonGroup="buttonGroup" :options="options" @click="optionClick" @buttonClick="buttonClick">
      </uni-goods-nav>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
      goods_info: {},
      // 商品导航
      options: [{
        icon: 'shop',
        text: '店铺',
        infoBackgroundColor: '#007aff',
        infoColor: "#f5f5f5"
      }, {
        icon: 'cart',
        text: '购物车',
        info: 0
      }],
      buttonGroup: [{
        text: '加入购物车',
        backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
        color: '#fff'
      },
      {
        text: '立即购买',
        backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
        color: '#fff'
      }
      ],
    };
  },
  watch: {
    total: {
      handler(newVal) {
        const findResult = this.options.find(x => x.text === '购物车')
        if (findResult) {
          findResult.info = newVal
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('m_cart', ['cart']),
    ...mapGetters('m_cart', ['total'])
  },
  methods: {
    ...mapMutations('m_cart', ['addToCart']),
    async getGoodsInfo(goods_id) {
      const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
      if (res.meta.status !== 200) return uni.$showMsg()
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;" ').replace(/webp/g, 'jpg')
      this.goods_info = res.message
    },
    preview(index) {
      uni.previewImage({
        current: index,
        urls: this.goods_info.pics.map(x => x.pics_big)
      })
    },
    // 商品导航点击
    optionClick(e) {
      if (e.content.text === '购物车') {
        uni.switchTab({
          url: '/pages/cart/cart'
        })
      }
    },
    buttonClick(e) {
      console.log(e);
      if (e.content.text === '加入购物车') {
        const goods = {
          goods_id: this.goods_info.goods_id,
          goods_name: this.goods_info.name,
          goods_price: this.goods_info.goods_price,
          goods_count: 1,
          goods_small_logo: this.goods_info.goods_small_logo,
          goods_state: true
        }
        this.addToCart(goods)
      }
    },

  },
  onLoad(options) {
    const goods_id = options.goods_id
    this.getGoodsInfo(goods_id)
  },
};
</script>
<style lang="scss" scoped>
swiper {
  height: 650rpx;

  imgae {
    width: 100%;
    height: auto;
  }
}

.goods-info {
  padding: 10px 5px;

  .goods-price {
    color: #c00000;
    font-size: 16px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      padding-right: 10px;

    }

    .goods-favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }

  }

  .goods-freight {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}

.goods_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>