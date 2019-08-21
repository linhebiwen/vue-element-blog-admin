import Vue from 'vue'
import App from './App'

// 加载插件
import '@/plugins/axios'
import '@/plugins/element-ui'
import '@/plugins/vue-particles'
import '@/plugins/echarts'

// 加载全局样式
import '@/assets/css/global-style.scss'

// 加载路由
import router from '@/router'

// 加载Vuex
import store from '@/store'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')