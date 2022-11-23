<template>
  <view class="settle-container">
    <!-- 全选 -->

    <label class="settle-radio" @click="selectAndCancelAll(!isFullChecked)">
      <radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="settle-amount">
      合计：<text class="amount-money">￥{{ checkedGoodsAmount | tofixed }}</text>
    </view>
    <!-- 结算 -->
    <view class="settle-btn" @click="settlement">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
const DELAY_SECONDS = 3
export default {
  props: {},
  data() {
    return {
      seconds: DELAY_SECONDS,
      timer: null
    };
  },
  watch: {},
  computed: {
    ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
    ...mapState('m_user', ['token', 'redirectInfo']),
    ...mapState('m_cart', ['cart']),
    ...mapGetters('m_user', ['addstr']),
    isFullChecked() {
      return this.total === this.checkedCount
    }
  },
  methods: {
    ...mapMutations('m_cart', ['updateAllGoodState']),
    ...mapMutations('m_user', ['updateRedirectInfo']),
    selectAndCancelAll(newState) {
      this.updateAllGoodState(newState)
    },
    settlement() {
      // 1、勾选，2、收货地址，3、登录
      if (!this.checkedCount) return uni.$showMsg("请选择商品")
      if (!this.addstr) return uni.$showMsg("请选择收货地址")
      if (!this.token) return this.delayNavigate()

      this.payOrder()
    },
    showTips(seconds) {
      uni.showToast({
        icon: 'none',
        title: '请登录后再结算' + seconds + ' 秒后自动跳转至登录页面',
        mask: true,
        duration: 1500
      })
    },
    delayNavigate() {
      this.seconds = DELAY_SECONDS
      this.showTips(this.seconds)
      this.timer = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) {
          clearInterval(this.timer)
          uni.switchTab({
            url: "/pages/my/my",
            success: () => {
              this.updateRedirectInfo({
                openType: 'switchTab',
                from: '/pages/cart/cart'
              })
            }
          })
          return
        }
        this.showTips(this.seconds)
      }, 1000)
    },
    async payOrder() {
      // 1. 创建订单
      // 1.1 组织订单的信息对象
      const orderInfo = {
        // 开发期间，注释掉真实的订单价格，
        // order_price: this.checkedGoodsAmount,
        // 写死订单总价为 1 分钱
        order_price: 0.01,
        consignee_addr: this.addstr,
        goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
      }
      // 1.2 发起请求创建订单
      const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
      // console.log(res);
      if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
      // 1.3 得到服务器响应的“订单编号”
      const orderNumber = res.message.order_number

      // 2. 订单预支付
      // 2.1 发起请求获取订单的支付信息
      const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
      // 2.2 预付订单生成失败
      if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
      // 2.3 得到订单支付相关的必要参数
      const payInfo = res2.message.pay

      // 3. 发起微信支付
      // 3.1 调用 uni.requestPayment() 发起微信支付
      const [err, succ] = await uni.requestPayment(payInfo)
      // 3.2 未完成支付
      if (err) return uni.$showMsg('订单未支付！')
      // 3.3 完成了支付，进一步查询支付的结果
      const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
      // 3.4 检测到订单未支付
      if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
      // 3.5 检测到订单支付完成
      uni.showToast({
        title: '支付完成！',
        icon: 'success'
      })
    }
  },
  onLoad() { },
};
</script>
<style lang="scss" scoped>
.settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #efefef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .settle-radio {
    display: flex;
    align-items: center;
  }

  .settle-amount {
    .amount-money {
      color: #c00000;
    }
  }

  .settle-btn {
    background-color: #c00000;
    height: 50px;
    min-width: 100px;
    color: #fff;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;

  }
}
</style>