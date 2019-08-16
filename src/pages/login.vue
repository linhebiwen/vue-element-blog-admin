<template>
  <div class="login-warpper">
    <vue-particles color="#E0FFFF" :particleOpacity="0.7" :particlesNumber="100" shapeType="circle" :particleSize="4"
      linesColor="#47CD88" :linesWidth="1" :lineLinked="false" :lineOpacity="0" :linesDistance="150" :moveSpeed="3"
      :hoverEffect="false" hoverMode="grab" :clickEffect="true" clickMode="remove">
    </vue-particles>
    <div class="login-form">
      <el-form ref="form" :model="form">
        <h3 class="title">用户登录</h3>
        <el-form-item>
          <el-input v-model="form.name" type="text" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-checkbox v-model="remember" class="remember">记住我的登录信息</el-checkbox>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%" @click="login" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      remember: false,
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
    }
  }
}
</script>

<style scoped lang="scss">
.login-warpper {
  position: absolute;
  height: 100%;
  width: 100%;
  background: url("../assets/img/bg.jpg") no-repeat fixed center;
  background-size: 100% 100%;

  #particles-js {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .login-form {
    position: absolute;
    width: 300px;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid #363636;
    border-radius: 5px;
    box-shadow: 0 0 25px #cac6c6;
    background-clip: padding-box;
    left: 80%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 20px;

    .title {
      color: #fff;
      text-align: center;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .remember {
      display: block;
      margin: -12px 0 10px 0;
      color: #fff;
    }
  }
}
</style>
