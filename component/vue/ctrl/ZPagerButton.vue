<template>
  <div class="page-button">
    <el-button @click="reset" plain :disabled="disabled">{{$t(`public.pagerButton.reset`)}}</el-button>
    <div class="right-btn">
      <el-button type="primary" @click="save" :disabled="disabled">{{$t(`public.pagerButton.save`)}}</el-button>
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
    reset () {
      this.$emit('reset', true)
    },
    save () {
      this.$emit('save', true)
    }
  }
}
</script>

<style lang="less" scoped>
.page-button {
  .el-button {
    padding: 10px 18px!important;
  }
}
</style>
