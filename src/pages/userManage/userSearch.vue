<template>
  <el-form ref="form" :model="form" inline>
    <el-form-item prop="keyword">
      <el-input v-model="form.keyword" placeholder="输入昵称、用户名查询" @keyup.enter.native="onSearch" size="small">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="onSearch">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        keyword: ''   // 查询关键字
      }
    }
  },

  created () {
    this.onSearch()
  },

  methods: {
    onSearch () {
      this.$emit('resetPage')
      this.$emit('search', this.form)
    }
  }
}
</script>

<style scoped lang="scss">
.el-form {
  text-align: left;
  margin-bottom: 10px;

  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
