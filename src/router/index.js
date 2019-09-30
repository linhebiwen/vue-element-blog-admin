import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

export const leftMenu = [
  {
    path: '/',
    component: () => import('@/pages/home'),
    name: 'home',
    hidden: false,
    mainMenu: false,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard'),
        name: 'dashboard',
        hidden: false,
        meta: {
          title: '仪表盘',
          icon: 'icon-yibiao'
        }
      }
    ]
  },
  {
    path: '/articleManage',
    name: 'articleManage',
    component: () => import('@/pages/home'),
    hidden: false,
    meta: {
      title: '文章管理',
      icon: 'icon-wenzhangguanli'
    },
    mainMenu: true,
    children: [
      {
        path: 'articleList',
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
    path: '/',
    component: () => import('@/pages/home'),
    name: 'home',
    hidden: false,
    mainMenu: false,
    children: [
      {
        path: 'statisticalAnalysis',
        component: () => import('@/pages/dashboard'),
        name: 'statisticalAnalysis',
        hidden: false,
        meta: {
          title: '统计分析',
          icon: 'icon-tongjifenxi'
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/pages/home'),
    name: 'home',
    hidden: false,
    mainMenu: false,
    children: [
      {
        path: 'commentManage',
        component: () => import('@/pages/dashboard'),
        name: 'commentManage',
        hidden: false,
        meta: {
          title: '评论管理',
          icon: 'icon-pinglunguanli'
        }
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: () => import('@/pages/home'),
    hidden: false,
    meta: {
      title: '用户管理',
      icon: 'icon-user'
    },
    mainMenu: true,
    children: [
      {
        path: 'userList',
        component: () => import('@/pages/userManage/userList'),
        name: 'userList',
        hidden: false,
        meta: {
          title: '用户列表'
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/pages/home'),
    name: 'home',
    hidden: false,
    mainMenu: false,
    children: [
      {
        path: 'powerManage',
        component: () => import('@/pages/dashboard'),
        name: 'powerManage',
        hidden: false,
        meta: {
          title: '权限管理',
          icon: 'icon-quanxian'
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/pages/home'),
    name: 'home',
    hidden: false,
    mainMenu: false,
    children: [
      {
        path: 'systemManage',
        component: () => import('@/pages/dashboard'),
        name: 'systemManage',
        hidden: false,
        meta: {
          title: '系统管理',
          icon: 'icon-xitongguanli'
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/pages/home'),
    name: 'home',
    hidden: false,
    mainMenu: false,
    children: [
      {
        path: 'about',
        component: () => import('@/pages/dashboard'),
        name: 'about',
        hidden: false,
        meta: {
          title: '关于',
          icon: 'icon-guanyu'
        }
      }
    ]
  }
]

const routes = [
  ...leftMenu,
  {
    path: '/',
    component: () => import('@/pages/home'),
    name: 'home',
    hidden: true,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    component: () => import('@/pages/login'),
    name: 'login',
    hidden: true,
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    Cookies.remove('token')
    window.localStorage.clear()
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