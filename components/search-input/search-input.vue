<template>
  <view class="search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
    <view class="search-content" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    bgcolor: {
      type: String,
      default: '#c00000'
    },
    radius: {
      type: Number,
      default: 18
    },
  },
  data() {
    return {
      wh: 0
    }
  },
  onLoad() {

  },
  methods: {
    searchBoxHandler() {
      this.$emit('click')
    }
  },
}
</script>

<style lang="scss">
.search-container {
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;

  .search-content {
    height: 36px;
    background-color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 999;

    .placeholder {
      font-size: 15px;
      margin-left: 10px;
    }
  }
}
</style>