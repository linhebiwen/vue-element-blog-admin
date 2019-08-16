import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/pages/login'),
    name: '首页',
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/pages/login'),
    name: '登录',
    hidden: true
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === 'login') {
//     window.sessionStorage.clear()
//   }
//   let token = window.sessionStorage.getItem('token')
//   if (!token && to.path !== 'login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

export default router