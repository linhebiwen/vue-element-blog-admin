<template>
  <el-menu default-active="5" class="el-menu-vertical" background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b" :collapse="getCollapse" :style="{ width: getSidebar.width }"
    @select="key => $router.push({ path: key })">
    <template v-for="menu in getLeftMenu">
      <el-submenu v-if="menu.children && menu.children.length > 0" :key="menu.path" :index="menu.path">
        <template slot="title">
          <svg class="iconfont" aria-hidden="true">
            <use :xlink:href="`#${menu.meta.icon}`"></use>
          </svg>
          <span slot="title">{{ menu.meta.title }}</span>
        </template>
        <el-menu-item v-for="child in menu.children" :key="child.path" :index="child.path">
          {{ child.meta.title }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :key="menu.path" :index="menu.path">
        <svg class="iconfont" aria-hidden="true">
          <use :xlink:href="`#${menu.meta.icon}`"></use>
        </svg>
        <span slot="title">{{ menu.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false
    }
  },

  computed: {
    ...mapGetters(['getLeftMenu', 'getCollapse', 'getSidebar'])
  }
}
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;

  .el-menu-item {
    text-align: left;
  }

  .el-submenu {
    text-align: left;
  }
}
</style>
