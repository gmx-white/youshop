<template>
  <view class="search-content">
    <uni-search-bar @input="input" :focus="true" :radius="100"></uni-search-bar>
     <!-- 搜索联想 -->
     <view class="search-res" v-if="recomList.length > 0">
      <view class="search-item" v-for="item in recomList" :key="item.goods_id" @click="gotoDetails(item.goods_id)">
      <view class="search-name">{{item.goods_name}}</view>
      <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 历史搜索 -->
    <view class="search-history" v-else>
      <!-- 标题 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="16" @click="clearSearcgHistoty"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="item in historyList" :key="item" @click="gotoGoodsList(item)">
        </uni-tag>
      </view>
    </view>
   
  </view>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      kw: '',
      recomList: [],
      historyList: [],
    }
  },
  onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
  },
  methods: {
    input(val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.kw = val
        this.getRecomList()
      }, 500)
    },
    async getRecomList() {
      if (this.kw === '') {
        this.recomList = []
        return
      }
      const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
      if (res.meta.status !== 200) return uni.$showMsg()
      this.recomList = res.message
      this.saveSearchHistory()
    },
    saveSearchHistory() {
      this.historyList.unshift(this.kw)
      const set = new Set(this.historyList)
      this.historyList = Array.from(set)
      uni.setStorageSync('kw', JSON.stringify(this.historyList))
    },
    clearSearcgHistoty() {
      this.historyList = []
      uni.setStorageSync('kw', [])
    },
    gotoDetails(id) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?goods_id=' + id
      })
    },
    gotoGoodsList(item) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?query=' + item
      })
    }
  }
}
</script>

<style lang="scss">
.uni-searchbar {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  position: relative;
  padding: 16rpx;
  background-color: #c00000;
}

.search-content {
  position: sticky;
  top: 0;
  z-index: 999;
}
.search-res {
  padding: 0 5px;
  .search-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }

}
.history-title {
  padding: 13px 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  border-bottom: 1px solid #efefef;
}
</style>