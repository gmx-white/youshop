
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {request} from './utils/request'
import * as filters from './utils/filters'
import store from './store/store.js'

// 网络请求
request.baseUrl = 'https://api-ugo-web.itheima.net'
request.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...'
  })
}
request.afterRequest = function (res) {
  uni.hideLoading()
}
uni.$http = request
// 注册全局filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 全局消息提示
uni.$showMsg = function (title='数据加载失败', duration=1500, icon='none'){
  uni.showToast({
    title,
    duration,
    icon
  })
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif