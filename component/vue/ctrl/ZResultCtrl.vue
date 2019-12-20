<template>
  <div class="z-result-ctrl">
    <div class="result-content">
      <div :class="{
        'content-symbol': true,
        'symbol-success': resultType === 'success',
        'symbol-warning': resultType === 'warning',
        'symbol-info': resultType === 'info',
        'symbol-error': resultType === 'error',
        'symbol-403': resultType === '403',
        'symbol-404': resultType === '404',
        'symbol-500': resultType === '500',
      }">{{resultType}}</div>
      <div class="content-info-result">{{title}}</div>
      <div class="content-info">{{subTitle}}</div>
      <div class="content-action">
        <el-button :type="typeBtn" @click="confirm">{{sureText}}</el-button>
        <el-button v-show="showCancelBtn" type="primary" plain @click="cancel">{{cancelText}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    resultType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '***'
    },
    subTitle: {
      type: String,
      default: '******'
    },
    showCancelBtn: {
      type: Boolean,
      default: false
    },
    sureText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  computed: {
    typeBtn () {
      let $type = ''
      switch (this.resultType) {
        case 'success':
          $type = 'success'
          break
        case 'info':
          $type = 'info'
          break
        case 'warning':
          $type = 'warning'
          break
        case 'error':
          $type = 'danger'
          break
        default:
          $type = ''
      }
      console.log($type)
      return $type
    }
  },
  methods: {
    confirm (type) {
      this.$emit('Confirm')
    },
    cancel (type) {
      this.$emit('Cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './commonStyle/ZVar.scss';
.z-result-ctrl {
  padding: 48px 32px;
  text-align: center;
  .result-content {
    .content-symbol {
      margin-bottom: 24px;
      font-size: $--z-result-symbol-size;
      &.symbol-success {
        color: $--z-color-success;
      }
      &.symbol-warning {
        color: $--z-color-warning;
      }
      &.symbol-info {
        color: $--z-color-info;
      }
      &.symbol-error {
        color: $--z-color-danger;
      }
      &.symbol-403 {
        color: $--z-result-symbol-color-403;
      }
      &.symbol-404 {
        color: $--z-result-symbol-color-404;
      }
      &.symbol-500 {
        color: $--z-result-symbol-color-500;
      }
    }
    .content-info {
      color: $--z-color-text-third;
      font-size: 14px;
      line-height: 20px;
    }
    .content-info-result {
      color: $--z-color-text-primary;
      font-size: 24px;
      line-height: 40px;
    }
    .content-action {
      margin-top: 30px;
    }
  }
}
</style>
