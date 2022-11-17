<template>
  <view>
    <!-- 轮播图 -->
    <swiper autoplay indicator-dots>
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-container">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor-list" v-for="floor in floorList" :key="floor.floor_title.name">
      <image :src="floor.floor_title.image_src" class="floor-title"></image>
      <!-- 楼层图片区域 -->
      <view class="floor-img-box">
        <!-- 左侧大图片的盒子 -->
        <navigator class="left-img-box" :url="floor.product_list[0].url">
          <image :src="floor.product_list[0].image_src" :style="{ width: floor.product_list[0].image_width + 'rpx' }"
            mode="widthFix"></image>
        </navigator>
        <!-- 右侧 4 个小图片的盒子 -->
        <view class="right-img-box">
          <navigator class="right-img-item" v-for="(item, i2) in floor.product_list" :key="i2" v-if="i2 !== 0"
          :url="item.url"
          >
            <image :src="item.image_src" mode="widthFix" :style="{ width: item.image_width + 'rpx' }"></image>
          </navigator>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图列表
      swiperList: [],
      // 分类导航列表
      navList: [],
      // 楼层数据
      floorList: []
    }
  },
  onLoad() {
    this.getSwiperList()
    this.getNavList()
    this.getfloorList()
  },
  methods: {
    // 请求轮播图列表
    async getSwiperList() {
      try {
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // console.log(res.message)
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = res.message
      } catch (error) {
        uni.$showMsg(
          title = "请求出错",
          duration = 1500,
          icon = 'error'
        )
      }

    },
    // 请求分类导航列表
    async getNavList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
      if (res.meta.status !== 200) {
        uni.$showMsg()
      }
      this.navList = res.message
    },
    navClickHandler(item) {
      if (item.name === '分类') {
        uni.switchTab({
          url: '/pages/cate/cate'
        })
      }
    },
    // 请求楼层列表数据
    async getfloorList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
      if (res.meta.status !== 200) {
        return uni.$showMsg()
      }
      res.message.forEach(floor => {
        floor.product_list.forEach(prod => {
          prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
        })
      })
      this.floorList = res.message
      console.log(this.floorList);

    },
    floorClickHandler(item) {

    }
  }
}
</script>

<style lang="scss">
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: auto;
  }
}

.nav-container {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-item,
  image {
    width: 129rpx;
    height: 140rpx;
  }
}

.floor-list {
  margin-top: 30rpx;

  .floor-title {
    height: 60rpx;
    width: 100%;

  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }

}
</style>

