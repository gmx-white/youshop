import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from './cart.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    m_cart: cartModule
  }
})

export default store