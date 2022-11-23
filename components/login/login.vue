<template>
  <view class="login-container">
    <!-- 登录图标 -->
    <uni-icons type="contact-filled" color="gray" size="100"></uni-icons>
    <!-- 登录按钮 -->
    <button class="login-btn" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <!-- 登录说明 -->
    <text class="login-tips">登录后尽享更多权益</text>
  </view>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    ...mapState('m_user', ['redirectInfo'])
  },
  methods: {
    ...mapMutations('m_user', ['updateUserinfo', 'updateToken', 'updateRedirectInfo']),
    
    getUserInfo(e) {
      // console.log(e.detail.userInfo)
      if (e.detail && e.detail.errMsg === "getUserInfo:ok") {
        // 存放用户信息vuex
        this.updateUserinfo(e.detail.userInfo)
      }
      // 获取登录成功后的token
      this.getToken(e.detail)
    },
    async getToken(info) {
      const [err, succ] = await uni.login().catch(err => err)
      if (err || succ.errMsg !== 'login:ok') return uni.$showMsg("登录失败")
      // console.log(succ);
      const params = {
        code: succ.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature
      }
      // const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', params)
      // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
      this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
      uni.$showMsg('登录成功')
      this.navigateBack()
    },
    navigateBack() {
      if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
        uni.switchTab({
          url: this.redirectInfo.from,
          complete: () => {
            this.updateRedirectInfo(null)
          }
        })
      }
    }
  },
  onLoad() { },
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: #fff;
    border-radius: 100%;
    transform: translateY(50%);
  }

  .login-btn {
    width: 90%;
    border-radius: 100px;
    background: #c00000;
    color: #fff;
    margin: 15px 0;
  }

  .login-tips {
    font-size: 12px;
    color: gray;
  }
}
</style>