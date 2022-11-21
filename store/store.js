import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from './cart.js'
import userModule from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    m_cart: cartModule,
    m_user: userModule
  }
})

export default store