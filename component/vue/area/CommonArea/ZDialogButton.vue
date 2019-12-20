<template>
  <div class="dialog-footer">
    <el-button @click="cancel" plain :disabled="disabled">删除</el-button>
    <div class="right-btn">
      <el-button type="primary" @click="confirm" :disabled="disabled">确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel', true)
    },
    confirm () {
      this.$emit('confirm', true)
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-footer {
  .el-button {
    padding: 10px 18px!important;
  }
}
</style>
