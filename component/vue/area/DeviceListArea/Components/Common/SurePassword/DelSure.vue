<template>
  <el-dialog :title="isClear ? '清空确认' : '删除确认'"
             :visible.sync="dialogVisible"
             :before-close="cancel"
             :close-on-click-modal="false"
             :append-to-body="true"
             width="420px">
    <div v-loading="loading">
      <el-form :model="passwordForm"
               :rules="rules"
               ref="passwordForm"
               :hide-required-asterisk="true"
               @submit.native.prevent>
        <el-form-item label="账户密码"
                      prop="password"
                      label-width="100px">
          <el-input :type="visible ? 'text' : 'password'"
                    v-model.trim="passwordForm.password"
                    placeholder="请输入当前账户密码"
                    auto-complete="off"
                    @keyup.enter.native="submitForm">
            <i :class="['icon', 'iconfont', visible ? 'icon-invisible-eye' : 'icon-visible-eye']"
               slot="suffix"
               @click="visible = !visible"></i>
          </el-input>
          <!-- <template slot="append">.com</template> -->
        </el-form-item>
      </el-form>
      <slot name="hint"></slot>
      <span slot="footer"
            class="dialog-footer">
        <v-dialog-button @cancel="cancel"
                         @confirm="submitForm"></v-dialog-button>
      </span>
    </div>
  </el-dialog>
</template>
<script>
// 
import VDialogButton from '../DialogButton.vue'
import { surePassword } from '../../../js/data/history/HistoryData.js'
export default {
  components: {
    VDialogButton
  },
  props: {
    isClear: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
    return {
      visible: false,
      loading: false,
      dialogVisible: false,
      passwordForm: {
        username: userInfo.role === 6 ? userInfo.username + '@' + userInfo.owner : userInfo.username,
        password: ''
      },
      rules: {
        password: [{ required: true, message: '请输入当前账户密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm () {
      this.loading = true
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          surePassword(this.passwordForm, () => {
            this.loading = false
            this.$emit('sureDel', this.isClear)
            this.cancel()
          }, () => {
            this.loading = false
            this.$message({
              message: '密码错误',
              customClass: 'login-tip',
              type: 'error',
              duration: 3200
            })
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    cancel () {
      this.$refs.passwordForm.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.el-input {
  width: 217px !important;
  .iconfont {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
