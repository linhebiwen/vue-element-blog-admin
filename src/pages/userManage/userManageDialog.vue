<template>
  <el-dialog :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogVisible" center
    @close="handleClose" width="500px">
    <el-form ref="userForm" :model="userForm" :rules="formRules" label-width="120px">
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入用户名" style="width: 290px"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="phone">
        <el-input v-model="userForm.phone" prop="请输入手机号" style="width: 290px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="userForm.email" style="width: 290px"></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="role">
        <el-select v-model="userForm.role" placeholder="请选择角色" style="width: 290px">
          <el-option v-for="role in roleList" :key="role.value" :label="role.label" :value="role.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data () {
    return {
      dialogTitle: '添加用户',
      dialogVisible: false,
      userForm: {
        username: '',
        phone: '',
        email: '',
        role: ''
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: ['blur', 'change'] }
        ]
      },
      roleList: [
        { label: '超级管理员', value: 1 },
        { label: '管理员', value: 2 },
        { label: '普通用户', value: 3 }
      ]
    }
  },

  watch: {
    visible (value) {
      this.dialogVisible = value
    }
  },

  methods: {
    handleClose () {
      this.dialogVisible = false
      this.$emit('close')
    },

    handleConfirm () {
      // TODO: 待联调处理
    }
  }
}
</script>

<style scoped lang="scss">
</style>
