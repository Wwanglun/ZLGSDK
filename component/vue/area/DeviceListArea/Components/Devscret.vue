<template>
  <el-dialog
    title="设备密钥"
    :visible.sync="dialogVisible"
    :before-close="cancel"
    :close-on-click-modal="false"
    width="600px">
    <el-form :model="devsecretForm" ref="devsecretForm" label-width="100px" :rules="rules" class="devsecret-form">
      <el-form-item
        prop="devsecret"
        label="设备密钥：">
        <el-input class="limit-input" v-model="devsecretForm.devsecret" maxlength="36" show-word-limit  auto-complete="off" @keyup.enter.native="submitForm" placeholder="请输入已选设备新的密钥值"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <v-dialog-button @cancel="cancel" @confirm="submitForm"></v-dialog-button>
    </span>
  </el-dialog>
</template>
<script>
import VDialogButton from './Common/DialogButton.vue'
import validate from '../js/data/validate/validate.js'
export default {
  components: {
    VDialogButton
  },
  data () {
    let checkDevsecret = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(this.$t('Device.validate.devsecretEmpty')))
      }
      if (!validate.devsecret(value)) {
        return callback(new Error(this.$t('Device.validate.devsecretContentError')))
      }
      return callback()
    }
    return {
      dialogVisible: false,
      devsecretForm: {
        devsecret: ''
      },
      rules: {
        devsecret: [{ required: true, trigger: 'blur', validator: checkDevsecret }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.devsecretForm.validate((valid) => {
        if (valid) {
          this.$emit('secret', this.devsecretForm.devsecret)
          this.$refs.devsecretForm.resetFields()
        } else {
          return false
        }
      })
    },
    cancel () {
      this.$refs.devsecretForm.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.el-input{
  .iconfont {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
