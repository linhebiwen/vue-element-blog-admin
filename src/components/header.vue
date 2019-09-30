<template>
  <div class="header-wrapper">
    <el-button
      type="text"
      icon="el-icon-s-fold"
      style="font-size: 24px; color: #606266"
      :class="{ isCollapse: changeBarDirection }"
      @click="handleLeftMenu"
    >
    </el-button>
    <div class="person-wrapper">
      <span>
        您好,
        <span class="nickname">{{ nickname }}</span>
      </span>
      <el-dropdown trigger="hover" @command="handleCommand">
        <span class="el-dropdown-link">
          <svg class="iconfont" aria-hidden="true">
            <use xlink:href="#icon-touxiang"></use>
          </svg>
        </span>
        <el-dropdown-menu>
          <el-dropdown-item command="check">个人信息</el-dropdown-item>
          <el-dropdown-item command="edit">修改信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { USER_LOGOUT } from '@/api/constant'

export default {
  data () {
    return {
      changeBarDirection: false,
      nickname: window.localStorage.getItem('nickname')
    }
  },

  methods: {
    // 单击左侧导航收缩展开按钮
    handleLeftMenu () {
      this.changeBarDirection = !this.changeBarDirection
      this.$store.dispatch('SET_COLLAPSE')
    },

    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.$confirm('确认退出登录吗', '退出登录', {
            type: 'warning'
          }).then(() => {
            window.$post(USER_LOGOUT).then(res => {
              if (res && res.code === 0) {
                window.localStorage.clear()
                window.sessionStorage.clear()
                this.$router.push({ path: '/login' })
              }
            })
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.person-wrapper {
  float: right;

  .nickname {
    color: #67c23a;
  }

  .el-dropdown-link {
    cursor: pointer;

    .iconfont {
      width: 2em;
      height: 2em;
      vertical-align: middle;
      fill: currentColor;
      overflow: hidden;
      padding: 0 8px;
    }
  }
}

.isCollapse {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  transition: 0.38s;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}
</style>
