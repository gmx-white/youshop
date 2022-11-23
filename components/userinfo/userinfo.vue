<template>
  <view class="userinfo-container">
    <!-- 头像昵称 -->
    <view class="avatar-name">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <text class="name">{{ userinfo.nickName }}</text>
    </view>
    <!-- 第一个面板列表-->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <!-- panel 的主体区域 -->
        <view class="panel-body">
          <!-- panel 的 item 项 -->
          <view class="panel-item">
            <text>8</text>
            <text>收藏店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 第二个面板列表 -->
    <view class="panel-list">
      <view class="panel">
        <view class="panel-title">我的订单</view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="../../static/my-icons/icon1.png" class="panel-icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon2.png" class="panel-icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon3.png" class="panel-icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon4.png" class="panel-icon"></image>
            <text>全部订单</text>
          </view>

        </view>
      </view>
    </view>
    <!-- 第三个面板列表 -->
    <view class="panel-list">
      <view class="panel">
        <view class="panel-body-another">
          <view class="panel-item-another">
            <view class="address">收货地址</view>
            <uni-icons class="icons" type="right"></uni-icons>
          </view>
          <view class="panel-item-another">
            <view class="address">联系客服</view>
            <uni-icons class="icons" type="right"></uni-icons>
          </view>
          <view class="panel-item-another" @click="exit">
            <view class="address">退出登录</view>
            <uni-icons class="icons" type="right"></uni-icons>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    ...mapState('m_user', ['userinfo'])
  },
  methods: {
    ...mapMutations('m_user', ['updateUserinfo', 'updateToken', 'updateAddress']),
    async exit() {
      const [err, succ] = await uni.showModal({
        title: '提示',
        content: '确认要退出登录吗？'
      }).catch(err => err)
      console.log(succ);
      if( succ && succ.confirm) {
        this.updateUserinfo({})
        this.updateToken('')
        this.updateAddress('')
      }
    }
  },
  onLoad() { },
};
</script>
<style lang="scss" scoped>
.userinfo-container {
  height: 100%;
  background-color: #f4f4f4;

  .avatar-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #c00000;
    height: 400rpx;

    .avatar {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 45px;
      // border: 2px solid white;
      box-shadow: 0 1px 5px black;
    }

    .name {
      color: #fff;
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .panel-list {
    position: relative;
    top: -10px;
    padding: 0 10px;
  }

  .panel {
    background-color: #fff;
    border-radius: 3px;
    margin-bottom: 8px;

    .panel-title {
      padding: 0 10px;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #efefef;
      font-size: 15px;
    }

    .panel-body {
      display: flex;
      justify-content: space-around;

      .panel-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 13px;
        padding: 10px 0;

        .panel-icon {
          width: 35px;
          height: 35px;
        }
      }
    }

    .panel-body-another {
      display: block;
      .panel-item-another {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        padding: 10px;
      }
    }
  }
}
</style>