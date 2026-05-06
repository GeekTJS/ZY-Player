import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'modern-normalize'
import Register from './components/register'
import './lib/element/index'
import TVAdapter from './lib/tv/tvAdapter'
import MobileAdapter from './lib/tv/mobileAdapter'

// 注册全局组件
Register.registerComponents()

Vue.config.productionTip = false

// 初始化电视端和移动端适配
Vue.prototype.$tvAdapter = TVAdapter
Vue.prototype.$mobileAdapter = MobileAdapter

// #ifdef APP-PLUS
// uni-app 环境下使用 uni 对象
Vue.prototype.$uni = uni
// #endif

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
