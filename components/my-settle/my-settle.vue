<template>
  <view class="settle-container">
    <!-- 全选 -->

    <label class="settle-radio" @click="selectAndCancelAll(!isFullChecked)">
      <radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="settle-amount">
      合计：<text class="amount-money">￥{{checkedGoodsAmount | tofixed}}</text>
    </view>
    <!-- 结算 -->
    <view class="settle-btn">结算({{checkedCount}})</view>
  </view>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
    isFullChecked() {
      return this.total === this.checkedCount
    }
  },
  methods: {
    ...mapMutations('m_cart', ['updateAllGoodState']),
    selectAndCancelAll(newState) {
      this.updateAllGoodState(newState)
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