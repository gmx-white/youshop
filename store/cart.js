export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),
  mutations: {
    // 加入购物车
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_count++;
      } else {
        state.cart.unshift(goods);
      }
      this.commit('m_cart/saveToStorage')
    },
    // 持久化存储
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新商品选中状态
    updateGoodState(state, good) {
      const findResult = state.cart.find(x => x.goods_id === good.goods_id)
      if(findResult) {
        findResult.goods_state = good.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新选中商品的数量
    updateGoodCount(state, good) {
      const findResult = state.cart.find(x => x.goods_id === good.goods_id)
      if(findResult) {
        findResult.goods_count = good.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    // 移出购物车
    removeGood(state, id) {
      const findIndex = state.cart.findIndex(x => x.goods_id === id)
      if(findIndex !== -1) {
        state.cart.splice(findIndex, 1)
        this.commit('m_cart/saveToStorage')
      }
    },
    // 全选/反选
    updateAllGoodState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }
  },
  getters: {
    total(state) {
      let c = state.cart.reduce((pre, cur) => pre + cur.goods_count, 0);
      return c;
    },
    checkedCount(state) {
      return state.cart.reduce((pre, cur) => (pre + cur.goods_state * cur.goods_count), 0)
    },
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((pre, cur) => (pre + cur.goods_count * cur.goods_price), 0)
    }
  },
};
