<template>
  <el-menu default-active="5" class="el-menu-vertical" background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b" :collapse="getCollapse" :style="{ width: getSidebar.width }"
    @select="key => $router.push({ path: key })">
    <template v-for="menu in getLeftMenu">
      <template v-if="!menu.hidden">
        <el-submenu v-if="menu.mainMenu" :key="menu.path" :index="menu.path">
          <template slot="title">
            <svg class="iconfont" aria-hidden="true">
              <use :xlink:href="`#${menu.meta.icon}`"></use>
            </svg>
            <span slot="title">{{ menu.meta.title }}</span>
          </template>
          <template v-for="child in menu.children">
            <el-menu-item v-if="!child.hidden" :key="child.path" :index="`${menu.path}/${child.path}`">
              {{ child.meta.title }}
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :key="menu.children[0].path" :index="`${menu.path}${menu.children[0].path}`">
          <svg class="iconfont" aria-hidden="true">
            <use :xlink:href="`#${menu.children[0].meta.icon}`"></use>
          </svg>
          <span slot="title">{{ menu.children[0].meta.title }}</span>
        </el-menu-item>
      </template>
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
