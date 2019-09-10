<template>
  <el-breadcrumb separator="/">
    <template v-for="(item, index) in matchedArr">
      <el-breadcrumb-item v-if="index === 0" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else :key="item.path" :to="{path: item.path}">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    matchedArr () {
      let matched = []
      matched = this.$route.matched.filter(item => {
        return item.meta.title
      })
      return matched
    }
  }
}
</script>

<style scoped lang="scss">
.el-breadcrumb {
  background-color: #dcdfe6;
  padding: 8px 20px;
  font-size: 14px;
}
</style>
