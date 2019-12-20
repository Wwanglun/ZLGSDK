<template>
  <div class="z-footer-ctrl">
    <div class="footer-items" v-for="(item, index) in textList" :key="item" >
      <span class="footer-item-text" v-html="item"></span>
      <i :class="{'footer-item-line': true, 'footer-hidden-line': !showSeparate}" v-if="index !== (textList.length - 1)"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZFooterCtrl',
  props: {
    footerContent: {
      type: Array,
      default: () => ['©2019  ZLG立功科技•致远电子  【 粤ICP备06000756号-14 】', ' 联系电话：400-888-4005', '邮箱：support@zlg.cn']
    },
    showSeparate: {
      type: Boolean,
      default: true
    },
    specialTextList: {
      type: Array,
      default: () => []
    },
    specialStyle: {
      type: String,
      default: 'font-weight: bolder;'
    }
  },
  computed: {
    textList () {
      if (this.specialTextList.length === 0) {
        return this.footerContent
      } else {
        let list = []
        this.footerContent.forEach(item => {
          let singleText = item
          let flag = true
          this.specialTextList.forEach(v => {
            if (flag) {
              let $index = item.indexOf(v)
              if ($index > -1) {
                flag = false
                singleText = item.replace(new RegExp(v , 'g'), '<b style="' + this.specialStyle + '">' + v + '</b>')
              }
            }
          })
          list.push(singleText)
        })
        return list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './commonStyle/ZVar.scss';
.z-footer-ctrl {
  background-color: $--z-color-white;
  border-top: $--z-footer-border-color;
  text-align: center;
  height: $--z-footer-height!important;
  box-sizing: border-box;
  .footer-item-text {
    padding: 0 $--z-footer-text-padding;
  }
}
.footer-item-line.footer-hidden-line {
  border-right: none;
}
@media (min-width: 992px) {
  .footer-items {
    line-height: $--z-footer-height;
    color: $--z-footer-color;
    display: inline-block;
    font-size: $--z-size-text--primary;
    box-sizing: border-box;
  }
  .footer-item-line {
    display: inline-block;
    height: $--z-size-text--third;
    border-right: 1px solid $--z-footer-color;
    width: 0px;
    vertical-align: middle;
  }
}
@media (max-width: 992px) {
  .footer-items {
    line-height: $--z-size-text--primary;
    color: $--z-footer-color;
    display: block;
    font-size: $--z-size-text--primary;
    box-sizing: border-box;
    height: $--z-size-text--primary;
  }
  .footer-item-line {
    display: none;
  }
}
</style>
