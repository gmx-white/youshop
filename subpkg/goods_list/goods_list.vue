<template>
  <view class="goods-container">
    <view class="goods-list">
      <block v-for="(good, i) in goodsList" :key="good.goods_id" @click="gotoDetail(good)">
        <goods :good="good"></goods>
      </block>
    </view>
    <view class="over" v-if="isOver">——已经到底啦——</view>
  </view>
</template>
  
<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0,
      // 上拉节流阀
      isLoading: false,
      // 到底指示
      isOver: false
    }
  },
  onLoad(options) {
    this.queryInfo.query = options.query || ''
    this.queryInfo.cid = options.cid || ''
    // 商品列表
    this.getGoodsList()
  },
  methods: {
    async getGoodsList(callback) {
      this.isLoading = true
      const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryInfo)
      if (res.meta.status !== 200) return uni.$showMsg()
      this.isLoading = false
      callback && callback()
      this.goodsList = [...this.goodsList, ...res.message.goods]
      this.total = res.message.total
    },
    gotoDetail(good) {
      uni.navgateTo({
        url: '/subpkg/goods_list/goods_detail?goods_id=' + good.goods_id
      })
    }
  },
  // 上拉触底
  onReachBottom() {
    if(this.queryInfo.pagenum * this.queryInfo.pagesize >= this.total) return this.isOver = true
    if(this.isLoading) return
    this.queryInfo.pagenum += 1
    this.getGoodsList()
  },
  // 上拉刷新
  onPullDownRefresh() {
    this.queryInfo.pagenum = 1
    this.total = 0
    this.isLoading = false
    this.goodsList = []
    this.getGoodsList(() => uni.stopPullDownRefresh())
  },
  filters: {
    tofixed(num) {
      return Number(num).toFixed(2)
    }
  }
}
</script>
  
<style lang="scss">
.goods-list {
  padding: 3px 5px;

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
}
.over {
  text-align: center;
}
</style>