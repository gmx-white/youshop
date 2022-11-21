<template>
  <view class="address-container">
    <!-- 没有收货人 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="btnChooseAddress">请选择收货地址+</button>
    </view>
    <!-- 收货信息 -->
    <view class="address-info" v-else @click="btnChooseAddress">
      <view class="userinfo">
        <view class="user-name">收货人：{{address.userName}}</view>
        <view class="user-tel">
          <view class="user-number">电话号码：{{address.telNumber}}</view>
          <uni-icons type="right" size="16"></uni-icons>
        </view>

      </view>
      <view class="address-detail">收货地址：{{addstr}}</view>

    </view>
    <!-- 底部栏 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
export default {
  props: {

  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    ...mapState('m_user', ['address']),
    ...mapGetters('m_user', ['addstr']),
  },
  methods: {
    ...mapMutations('m_user', ['updateAddress']),
    async btnChooseAddress() {
      const [err, succ] = await uni.chooseAddress().catch(err => err)
      if(!err && succ.errMsg === "chooseAddress:ok") {
        this.updateAddress(succ)
      }
    }
  },
  onLoad() { },
};
</script>
<style lang="scss" scoped>
.address-container {
  padding: 5px;


  .address-choose-box {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .address-info {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .userinfo {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .user-tel {
        display: flex;
        .user-number {
          margin-right: 5px;
        }
      }
    }

    .address-detail {
      white-space: nowrap;
    }
  }

  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }


}
</style>