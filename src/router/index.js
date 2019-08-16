import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = {}

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === 'login') {
    window.sessionStorage.clear()
  }
  let token = window.sessionStorage.getItem('token')
  if (!token && to.path !== 'login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router