export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_count++;
      } else {
        state.cart.unshift(goods);
      }
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateGoodState(state, good) {
      const findResult = state.cart.find(x => x.goods_id === good.goods_id)
      if(findResult) {
        findResult.goods_state = good.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    updateGoodCount(state, good) {
      const findResult = state.cart.find(x => x.goods_id === good.goods_id)
      if(findResult) {
        findResult.goods_count = good.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    removeGood(state, id) {
      const findIndex = state.cart.findIndex(x => x.goods_id === id)
      if(findIndex !== -1) {
        state.cart.splice(findIndex, 1)
        this.commit('m_cart/saveToStorage')
      }
    }
  },
  getters: {
    total(state) {
      let c = state.cart.reduce((pre, cur) => pre + cur.goods_count, 0);
      return c;
    },
  },
};
