import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false
// 将Vue实例作为事件总线赋值给$bus
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

//解决移动端300ms的延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
