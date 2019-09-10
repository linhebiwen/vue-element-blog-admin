import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

export const leftMenu = [
  {
    path: '/dashboard',
    component: () => import('@/pages/dashboard'),
    name: 'dashboard',
    hidden: false,
    meta: {
      title: '仪表盘',
      icon: 'icon-yibiao'
    }
  },
  {
    path: '/articleManage',
    component: () => import('@/pages/dashboard'),
    name: 'articleManage',
    hidden: false,
    meta: {
      title: '文章管理',
      icon: 'icon-wenzhangguanli'
    },
    children: [
      {
        path: '/articleManage/articleList',
        component: () => import('@/pages/dashboard'),
        name: 'articleList',
        hidden: false,
        meta: {
          title: '文章列表'
        }
      }
    ]
  },
  {
    path: '/statisticalAnalysis',
    component: () => import('@/pages/dashboard'),
    name: 'statisticalAnalysis',
    hidden: false,
    meta: {
      title: '统计分析',
      icon: 'icon-tongjifenxi'
    }
  },
  {
    path: '/commentManage',
    component: () => import('@/pages/dashboard'),
    name: 'commentManage',
    hidden: false,
    meta: {
      title: '评论管理',
      icon: 'icon-pinglunguanli'
    }
  },
  {
    path: '/userManage',
    component: () => import('@/pages/dashboard'),
    name: 'userManage',
    hidden: false,
    meta: {
      title: '用户管理',
      icon: 'icon-user'
    }
  },
  {
    path: '/powerManage',
    component: () => import('@/pages/dashboard'),
    name: 'powerManage',
    hidden: false,
    meta: {
      title: '权限管理',
      icon: 'icon-quanxian'
    }
  },
  {
    path: '/systemManage',
    component: () => import('@/pages/dashboard'),
    name: 'systemManage',
    hidden: false,
    meta: {
      title: '系统管理',
      icon: 'icon-xitongguanli'
    }
  },
  {
    path: '/about',
    component: () => import('@/pages/dashboard'),
    name: 'about',
    hidden: false,
    meta: {
      title: '关于',
      icon: 'icon-guanyu'
    }
  }
]

const routes = [
  {
    path: '/',
    component: () => import('@/pages/home'),
    name: 'home',
    hidden: true,
    children: leftMenu
  },
  {
    path: '/login',
    component: () => import('@/pages/login'),
    name: 'login',
    hidden: true
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    Cookies.remove('token')
    next()
  } else {
    if (Cookies.get('token')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router