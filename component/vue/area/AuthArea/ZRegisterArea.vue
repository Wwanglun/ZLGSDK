<template>
  <div class="z-register-area">
    <div class="register-title">
        <img src="" alt="" v-if="logo">
        <span>{{title}}</span>
    </div>
    <div class="login-text">
      <span @click="onClickLogin">立即登录</span>
    </div>
    <div class="register-form">
      <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="80px">
      <el-form-item :label="'用户名'" prop="username">
        <el-input v-model.trim="registerForm.username" :placeholder="'请输入用户名'"></el-input>
      </el-form-item>
      <el-form-item :label="'密码'" prop="password">
        <el-input :type="passwordSecrecy ? 'password' : 'text'" v-model.trim="registerForm.password" :placeholder="'请输入密码'">
          <i slot="suffix" class="el-icon-view password-secrecy" @click="passwordSecrecy = !passwordSecrecy"></i>
        </el-input>
      </el-form-item>
      <el-form-item :label="'确认密码'" prop="confirmPsw">
        <el-input :type="confirmPasswordSecrecy ? 'password' : 'text'" v-model.trim="registerForm.confirmPsw" :placeholder="'请输入密码'">
          <i slot="suffix" class="el-icon-view password-secrecy" @click="confirmPasswordSecrecy = !confirmPasswordSecrecy"></i>
        </el-input>
      </el-form-item>
      <el-form-item :label="'手机号码'" prop="mobile">
        <el-input v-model.trim="registerForm.mobile" :placeholder="'请输入手机号码'"></el-input>
      </el-form-item>
      <el-form-item :label="'验证码'" prop="smscode">
        <el-input v-model.trim="registerForm.smscode" :placeholder="'请输入验证码'" style="width: 116px;"></el-input>
        <div class="count-down-btn">
          <div class="count-down-area" v-if="countDown" >
            <z-countDown-ctrl :endTimestamp="endTime" @endCountDown="countDown = false" timeBGC="#fff" :timeColor="areaTheme.auth_form_logo_color" :showTimeLabel="true" style="height: 20px;overflow: hidden"></z-countDown-ctrl>
          </div>
          <el-button v-if="!countDown" @click="onClickSendCode">获取验证码</el-button>
        </div>

      </el-form-item>
      <el-form-item class="submitForm">
        <el-button type="primary" @click="onClickOk('registerForm')">免费注册</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import ZWSValidateTool from '../../../../sdk/js/tool/toolModules/ZWSValidateTool'
import ZLGApi from '../../../../sdk/js/api/http/ZLGApi.js'
import areaTheme from '../commonStyle/areaTheme.scss'
import ZCountDownCtrl from '../../Ctrl/ZCountDownCtrl'
export default {
  name: 'ZRegisterArea',
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
  components: {
    ZCountDownCtrl
  },
  data () {
    let checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入用户名'))
      }
      if (!ZWSValidateTool.usernameValidator(value)) {
        return callback(new Error('请输入数字、字母、下划线'))
      }
      ZLGApi.ZLGUser.isUsernameExist({username: value}).then(res => {
        if (res.isExist) {
          return callback(new Error('该用户名已存在'))
        } else {
          return callback()
        }
      })
    }
    let checkPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      }
      if (!ZWSValidateTool.passwordValidator(value)) {
        return callback(new Error('请输入8~16位的密码'))
      }
      return callback()
    }
    let checkConfirmPsw = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      }
      if (value !== this.registerForm.password) {
        return callback(new Error('两次密码不一致'))
      }
      return callback()
    }
    let checkMobile = (rule, value, callback) => {
      this.mobileValidate = false
      if (value === '') {
        return callback(new Error('请输入手机号码'))
      }
      if (!ZWSValidateTool.phoneNumberValidator(value)) {
        return callback(new Error('手机号码格式错误'))
      }
      ZLGApi.ZLGUser.isMobileExist({mobile: value}).then(res => {
        if (res.isExist) {
          return callback(new Error('手机号码已存在'))
        } else {
          this.mobileValidate = true
          return callback()
        }
      })
    }
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(this.$t('请输入验证码')))
      }
      if (!ZWSValidateTool.verifyCodeValidator(value)) {
        return callback(new Error('验证码格式错误'))
      }
      return callback()
    }
    return {
      mobileValidate: false,
      areaTheme: areaTheme,
      countDown: false,
      endTime: new Date() - 0 + 60000,
      passwordSecrecy: true,
      confirmPasswordSecrecy: true,
      registerForm: {
        confirmPsw: '',
        username: '',
        password: '',
        mobile: '',
        smscode: ''
      },
      rules: {
        username: [
          { required: true, validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: checkPassword, trigger: 'blur' }
        ],
        confirmPsw: [
          { required: true, validator: checkConfirmPsw, trigger: 'blur' }
        ],
        mobile: [{ required: true, validator: checkMobile, trigger: 'blur' }],
        smscode: [{ required: true, validator: checkSmscode, trigger: 'blur' }]
      }
    }
  },
  methods: {
    onClickLogin () {
      this.$emit('toLogin', true)
    },
    onClickOk (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            username: this.registerForm.username,
            password: this.registerForm.password,
            mobile: this.registerForm.mobileValidate,
            code: this.registerForm.smscode
          }
          ZLGApi.ZLGUser.register(params).then(res => {
            this.$message.success('注册成功')
            this.$emit('registered', true)
          })
        } else {
          return false
        }
      })
    },
    onClickSendCode () {
      if (!this.mobileValidate) {
        return false
      }
      ZLGApi.ZLGUser.getRegisterMobileVerifyCode({mobile: this.registerForm.mobile}).then(() => {
        this.$message.success('验证码已发送')
      })
      this.endTime = new Date() - 0 + 60000
      this.countDown = true
    }
  }
}
</script>

<style lang="scss">
@import '../commonStyle/areaTheme.scss';
.z-register-area {
  width: 356px;
  height: 490px;
  background-color: $--auth-form-backgroud-color;
  padding: 0 20px;
  box-sizing: border-box;
  .el-form-item__label {
    color: $--auth-form-primary-color;;
  }
  .register-title {
      height: 42px;
      line-height: 42px;
      padding: 26px 0 16px 0;
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
  .login-text {
    height: 22px;
    line-height: 22px;
    text-align: right;
    padding-bottom: 10px;
    span {
      color: #5ec4ff;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .register-form {
    color: $--auth-form-primary-color;
    .password-secrecy {
      position: absolute;
      color: $--auth-form-logo-color;
      right: 10px;
      font-size: 22px;
      top: 10px;
      cursor: pointer;
    }
    .count-down-btn {
      position: absolute;
      right: 0px;
      width: 114px;
      top: 0;
      .count-down-area {
        background-color:$--auth-form-primary-color;
        text-align: center;
        border-radius: 4px;
        /deep/ .z-countDown-ctrl {
        display: inline;
        padding: 0;
        text-align: center;
        .z-countDown-label {
          display: none;
        }
        .time-label {
          color: $--auth-form-logo-color;
        }
        .z-countDown-time {
          display: inline;
          .time-content {
            display: inline;
            padding: 0;
            color: $--auth-form-logo-color;
          }
        }
        .time-format {
          display: inline;
          &:nth-child(1), &:nth-child(2) {
            display: none;
          }
        }
      }
      }
    }
  }
}
</style>
