<template>
    <div class="z-login-area">
      <div class="login-title">
        <img src="" alt="" v-if="logo">
        <span>{{title}}</span>
      </div>
      <div class="login-form">
        <div class="login-form-username">
          <el-input auto-complete="new-password"
                placeholder="请输入用户名"
                v-model.trim="loginForm.username"
                id="username_test"
                @blur="checkUsername"></el-input>
          <span class="username-logo el-icon-user"></span>
        </div>
        <div class="login-form-password">
          <el-input auto-complete="new-password"
                  :type="passwordSecrecy ? 'password' : 'text'"
                  placeholder="请输入密码"
                  v-model.trim="loginForm.password"
                  id="password"
                  @keyup.enter.native="onClickLogin"
                  @blur="checkPassword">
                  <i slot="suffix" class="password-secrecy el-icon-view" @click="passwordSecrecy = !passwordSecrecy"></i></el-input>
          <span class="password-logo el-icon-lock"></span>
        </div>
    </div>
    <div class="password-options">
      <div class="remember-password">
        <el-checkbox v-model="remember"
                     class="loginText">记住密码</el-checkbox>
      </div>
      <div class="forget-password">
        <span @click="onClickForgetPassword">忘记密码？</span>
      </div>
    </div>
    <div class="login-btn">
      <el-button
                   @click="onClickLogin"
                   type="primary">登录</el-button>
    </div>
    <div class="login-footer">
      <span class="user-register" @click="onClickRegister">用户注册</span>
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="sys-help" @click="onClickSystem">系统帮助</span>
    </div>
    </div>
</template>
<script>
import { Message } from 'element-ui'
import ZWSValidateTool from '../../../../sdk/js/tool/toolModules/ZWSValidateTool'
import ZLGApi from '../../../../sdk/js/api/http/ZLGApi.js'
export default {
  name: 'ZLoginArea',
  props: {
    logo: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '物联网云平台'
    }
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      remember: false,
      passwordSecrecy: true,
      timer: null
    }
  },
  created () {
    (localStorage.getItem('zws-userinfo')) && (this.loginForm = JSON.parse(localStorage.getItem('zws-userinfo'))) && (this.remember = true)
  },
  methods: {
    checkUsername () {
      if (this.timer) {
        return false
      }
      if (this.loginForm.username === '') {
        return false
      }
      if (!ZWSValidateTool.loginUsernameValidator(this.loginForm.username)) {
        Message.error('用户名格式错误')
        this.addTimer()
        return false
      } else {
        return true
      }
    },
    checkPassword () {
      if (this.timer) {
        return false
      }
      if (this.loginForm.password === '') {
        return false
      }
      if (!ZWSValidateTool.passwordValidator(this.loginForm.password)) {
        Message.error('密码格式错误')
        this.addTimer()
        return false
      } else {
        return true
      }
    },
    onClickForgetPassword () {
      this.$emit('toForgetPassword', true)
    },
    addTimer () {
      this.timer = setTimeout(() => {
        this.timer = null
      }, 2000)
    },
    onClickLogin () {
      if (!this.checkUsername() || !this.checkUsername()) {
        return false
      }
      if (this.remember) {
        localStorage.setItem('zws-userinfo', JSON.stringify(this.loginForm))
      }
      ZLGApi.ZLGUser.login(this.loginForm).then(res => {
        Message.success('登录成功')
        this.$emit('logined', this.loginForm)
      })
    },
    onClickRegister () {
      this.$emit('toRegister', true)
    },
    onClickSystem () {
      this.$emit('toSystem', true)
    }
  }
}
</script>
<style lang="scss">
@import '../commonStyle/areaTheme.scss';
.z-login-area{
    padding: 0 20px;
    background-color: $--auth-form-backgroud-color;
    width: 340px;
    height: 350px;
    box-sizing: border-box;
    display: inline-block;
    .el-input {
      .el-input__inner {
        padding-left: 36px;
        padding-right: 36px;
      }
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: $--auth-form-primary-color;;
    }
    .login-title {
      height: 42px;
      line-height: 42px;
      padding: 26px 0;
      font-size: 24px;
      text-align: center;
      span {
        color: $--auth-form-primary-color;;
      }
      img {
        display: inline-block;
        width: 42px;
        height: 42px;
        margin-right: 5px;
      }
    }
    .login-form {
      .login-form-username {
        position: relative;
        .username-logo {
          position: absolute;
          color: $--auth-form-logo-color;
          left: 10px;
          font-size: 22px;
          top: 10px;
        }
      }
      .login-form-password {
        margin-top: 14px;
        position: relative;
        .password-logo {
          position: absolute;
          color: $--auth-form-logo-color;
          left: 10px;
          font-size: 22px;
          top: 10px;
        }
        .password-secrecy {
          position: absolute;
          color: $--auth-form-logo-color;
          right: 10px;
          font-size: 22px;
          top: 10px;
          cursor: pointer;
        }
      }
    }
    .password-options {
      height: 20px;
      margin-top: 14px;
      .remember-password {
        float: left;
        .el-checkbox {
          color: $--auth-form-primary-color;
        }
      }
      .forget-password {
        float: right;
        font-size: 14px;
        color: $--auth-form-primary-color;
        cursor: pointer;
      }
    }
    .login-btn {
      margin-top: 10px;
      .el-button {
        width: 300px;
      }
    }
    .login-footer {
      font-size: 14px;
      color: $--auth-form-primary-color;
      margin-top: 18px;
      float: right;
      .user-register {
        cursor: pointer;
      }
      .sys-help {
        color: $--auth-form-second-color;
        cursor: pointer;
      }
    }

}
</style>
