import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global-style.scss'
import VueParticles from 'vue-particles'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueParticles)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
