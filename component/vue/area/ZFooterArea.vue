<template>
  <div class="z-footer-area">
      <z-footer-ctrl :footerContent="footerContent"></z-footer-ctrl>
  </div>
</template>

<script>
import ZFooterCtrl from '../Ctrl/ZFooterCtrl'
export default {
  name: 'ZFooterArea',
  components: {
    ZFooterCtrl
  },
  data () {
    return {
      footerContent: ['©2019  ZLG立功科技•致远电子  【 粤ICP备06000756号-14 】', ' 联系电话：400-888-4005', '邮箱：support@zlg.cn']
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
