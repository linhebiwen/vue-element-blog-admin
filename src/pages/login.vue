<template>
  <div class="login-warpper">
    <vue-particles color="#E0FFFF" :particleOpacity="0.7" :particlesNumber="100" shapeType="circle" :particleSize="4"
      linesColor="#47CD88" :linesWidth="1" :lineLinked="false" :lineOpacity="0" :linesDistance="150" :moveSpeed="3"
      :hoverEffect="false" hoverMode="grab" :clickEffect="true" clickMode="remove">
    </vue-particles>
    <div class="login-form">
      <el-form ref="form" :model="form" :rules="rules">
        <h3 class="title">用户登录</h3>
        <el-form-item prop="username">
          <el-input v-model="form.username" type="text" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="form.captcha" type="text" placeholder="验证码"
            style="width: 200px; marginRight: 20px; vertical-align: middle;">
          </el-input>
          <el-button type="text" class="svg-captcha" @click="getCaptcha">
            <span v-html="svgCaptcha"></span>
          </el-button>
        </el-form-item>
        <el-checkbox v-model="autoLogin" class="auto-login">下次自动登录</el-checkbox>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%" @click="login" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { cryptoMd5 } from '@/utils/crypto'
import { CAPTCHA_GETCAPTCHA, USER_LOGIN } from '@/api/constant'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      svgCaptcha: '',
      form: {
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,15}$/, message: '中英文数字均可，15字以内', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      autoLogin: false,
      loading: false
    }
  },

  created () {
    this.getCaptcha()
  },

  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const password = cryptoMd5(this.form.password)
          const data = {
            username: this.form.username,
            password: password,
            captcha: this.form.captcha,
            autoLogin: this.autoLogin
          }
          window.$post(USER_LOGIN, data).then(res => {
            if (res && res.code === 0) {
              this.$message.success(`欢迎${res.data.username}回家`)
              window.sessionStorage.setItem('username', res.data.nickname ? res.data.nickname : res.data.username)
              Cookies.remove('captcha')
              this.$router.push({ path: '/', name: 'home' })
            }
            this.loading = false
            this.getCaptcha()
          })
        } else {
          this.getCaptcha()
          this.$message.error('请正确填写表单')
        }
      })
    },

    getCaptcha () {
      window.$get(CAPTCHA_GETCAPTCHA).then(res => {
        this.svgCaptcha = res.data
      })
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
    height: 320px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid #363636;
    border-radius: 5px;
    box-shadow: 0 0 25px #cac6c6;
    background-clip: padding-box;
    left: 80%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 20px 20px 20px;

    .title {
      color: #fff;
      text-align: center;
      font-size: 14px;
      margin: 0 0 20px 0;
      padding: 0;
    }

    .svg-captcha {
      vertical-align: middle;
      display: inline-block;
      height: 40px;
      width: 80px;
      padding: 0;
    }

    .auto-login {
      display: block;
      margin: -5px 0 10px 0;
      color: #fff;
    }
  }
}
</style>
