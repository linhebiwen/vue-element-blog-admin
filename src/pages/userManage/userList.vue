<template>
  <div class="user-wrapper">
    <el-row>
      <el-col :span="20">
        <userSearch @search="condition => getUserList(condition)" @resetPage="page = 1"></userSearch>
      </el-col>
      <el-col :span="4" style="text-align: right">
        <el-button type="primary" size="small" @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="userList"
      border
      style="width: 100%"
      :header-cell-style="{ background: '#D4D4D4', color: '#333' }"
      :row-style="{ background: 'white', color: '#606266' }"
      v-loading="loading"
    >
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="birthday" label="生日" align="center" width="170" :formatter="formatTime"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" :formatter="formatSex"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" :formatter="formatStatus"></el-table-column>
      <el-table-column prop="loginTime" label="最近登录时间" align="center" width="170" :formatter="formatTime">
      </el-table-column>
      <el-table-column prop="logoutTime" label="最近退出时间" align="center" width="170" :formatter="formatTime">
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <div v-if="scope.row.status === 0" style="display: inline-block">
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">注销</el-button>
          </div>
          <div v-if="scope.row.status === 1" style="display: inline-block">
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">恢复</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="page"
      :total="total"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <userMangeDialog :visible="userMangeDialogVisible" @close="userMangeDialogVisible = false"></userMangeDialog>
  </div>
</template>

<script>
import userSearch from './userSearch'
import userMangeDialog from './userManageDialog'

export default {
  components: {
    userSearch,
    userMangeDialog
  },

  data () {
    return {
      loading: false,  // 是否在加载中
      userList: [],    // 用户列表
      page: 1,         // 当前页码
      pageSize: 10,     // 每页数量
      total: 0,        // 总数
      condition: {},    // 查询条件
      userMangeDialogVisible: false // 是否显示用户添加修改dialog
    }
  },

  methods: {
    // 获取用户列表
    getUserList (condition) {
      this.condition = condition
      this.condition.page = this.page
      this.condition.pageSize = this.pageSize
      window.$post('/user/search', this.condition).then(res => {
        if (res && res.code === 0) {
          this.userList = res.data.userList
          this.total = res.data.total
        }
      })
    },

    // 格式化时间
    formatTime (row, column, cellValue) {
      if (cellValue) {
        let time = new Date(cellValue)
        let year = time.getFullYear()
        let month = (Array(2).join('0') + (time.getMonth() + 1)).slice(-2)
        let day = (Array(2).join('0') + time.getDate()).slice(-2)
        let hour = (Array(2).join('0') + time.getHours()).slice(-2)
        let minute = (Array(2).join('0') + time.getMinutes()).slice(-2)
        let second = (Array(2).join('0') + time.getSeconds()).slice(-2)
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
      } else {
        return ''
      }
    },

    // 格式化状态
    formatStatus (row, column, cellValue) {
      if (cellValue === 0) {
        return '正常'
      } else if (cellValue === 1) {
        return '已注销'
      } else {
        return ''
      }
    },

    // 格式化性别
    formatSex (row, column, cellValue) {
      if (cellValue === 0) {
        return '保密'
      } else if (cellValue === 1) {
        return '男'
      } else if (cellValue === 2) {
        return '女'
      } else {
        return ''
      }
    },

    // 查看用户详情
    handleCheck () {

    },

    // 修改用户信息
    handleEdit () {
      this.userMangeDialogVisible = true
    },

    // 添加用户
    addUser () {
      this.userMangeDialogVisible = true
    },

    handleCurrentChange (page) {
      this.page = page
      this.getUserList(this.condition)
    },

    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.getUserList(this.condition)
    }
  }
}
</script>

<style scoped lang="scss">
.user-top-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
