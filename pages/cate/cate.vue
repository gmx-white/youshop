<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滚动条 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{ height: wh + 'px' }">
        <block v-for="(item, i) in cateList" :key="item.cat_id">
          <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="changeActive(i)">
            {{ item.cat_name }}
          </view>
        </block>

      </scroll-view>

      <!-- 右侧滚动条 -->
      <scroll-view scroll-y :style="{ height: wh + 'px' }" :scroll-top="scrollTop" class="right-scroll-view">
        <view class="right-scroll-view-item" v-for="(item, i) in cateLevel2" :key="item.cat_id">
          <!-- 二级分类标题 -->
          <view class="right-item-title">
            {{ item.cat_name }}
          </view>
          <!-- 三级分类 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(lv3, i3) in item.children" :key="lv3.cat_id" @click="gotoGoodsList(lv3)">
              <image :src="lv3.cat_icon.replace('dev', 'web')"></image>
              <text>{{ lv3.cat_name }}</text>
            </view>
          </view>
        </view>

      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      wh: 0,
      cateList: [],
      active: 0,
      cateLevel2: [],
      scrollTop: 0
    }
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync()
    this.wh = sysInfo.windowHeight
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await uni.$http.get('/api/public/v1/categories')
      if (res.meta.status !== 200) return uni.$showMsg()
      // console.log(res.message, "---cate");
      this.cateList = res.message
      this.cateLevel2 = res.message[0].children
    },
    changeActive(index) {
      this.active = index
      this.cateLevel2 = this.cateList[index].children
      this.scrollTop = this.scrollTop ? 0: 1
    },
    // 跳转三级商品列表
    gotoGoodsList(lv3) {
      uni.navigatorTo({
        url: '/subpkg/goods_list/goods_list?cid=' + lv3.cat_id
      })
    }
  },
}
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  justify-content: space-between;
}

.left-scroll-view {
  flex: 3;

  .left-scroll-view-item {
    line-height: 60px;
    background-color: #f7f7f7;
    text-align: center;
    font-size: 12px;

    &.active {
      background-color: #fff;
      position: relative;

      &::before {
        content: ' ';
        display: block;
        width: 3px;
        height: 30px;
        background-color: #c00000;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

.right-scroll-view {
  flex: 7;

  .right-scroll-view-item {

    // height: 50rpx;
    .right-item-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }

    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;

      .cate-lv3-item {
        width: 33.3%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        image {
          width: 60px;
          height: 60px;
        }

        text {
          font-size: 12px;
        }
      }
    }
  }
}
</style>