<template>
  <el-container>
    <el-aside :style="{ width: getSidebar.width }">
      <blog-aside></blog-aside>
    </el-aside>
    <el-container>
      <el-header style="height: 50px;">
        <blog-header></blog-header>
      </el-header>
      <el-main>
        <breadcrumb></breadcrumb>
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import blogAside from '@/components/aside'
import blogHeader from '@/components/header'
import breadcrumb from '@/components/breadcrumb'

import { mapGetters } from 'vuex'
import { USER_INFO } from '@/api/constant'

export default {
  components: {
    blogAside,
    blogHeader,
    breadcrumb
  },

  data () {
    return {

    }
  },

  created () {
    this.getUserInfo()
  },

  computed: {
    ...mapGetters(['getSidebar'])
  },

  methods: {
    getUserInfo () {
      let data = {
        uid: window.localStorage.getItem('uid'),
        autoLogin: window.localStorage.getItem('autoLogin')
      }
      window.$post(USER_INFO, data).then(res => {
        if (res && res.code === 0) {
          window.localStorage.setItem('uid', res.data.uid)
          window.localStorage.setItem('nickname', res.data.nickname ? res.data.nickname : res.data.username)
        } else {
          this.$router.push({ path: '/login' })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-container {
  min-height: 100vh;

  .el-header {
    background-color: #f2f6fc;
    color: #333;
    height: 50px;
    line-height: 50px;
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    min-height: 100%;

    .el-menu-vertical {
      height: 100%;
    }
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    height: 100%;
    padding: 0;

    .content-wrapper {
      padding: 20px;
    }
  }
}
</style>
