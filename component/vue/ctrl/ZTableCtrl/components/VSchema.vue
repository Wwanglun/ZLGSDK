<template>
  <div :class="{'title-config': true, 'out-config': configPositon === 'out'}" v-show="showConfig" :style="{position: configPositon === 'out' ? 'absolute' : 'fixed', left: utilLeft + 'px', top: utilTop + 'px'}" v-focus="this" @click.stop="stopAction">
    <el-checkbox-group v-model="checkList" @change="selectList">
      <el-checkbox v-for="(item, index) in allTitle" :key="index" class="text-overflow" :disabled="item.disabled" :label="item.label"></el-checkbox>
    </el-checkbox-group>
    <div class="config-save">
      <div class="tip-select" v-show="isEchart && showTip">最多只能选择3个数据点</div>
      <el-button type="primary" icon="iconfont iconbaocun1" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import ZLGCustomBigData from '../../../../../sdk/js/api/http/httpModules/ZLGCustomBigData.js'
export default {
  props: {
    allTitle: {
      type: Array,
      default: () => []
    },
    left: {
      type: Number,
      default: 200
    },
    top: {
      type: Number,
      default: 200
    },
    showConfig: {
      type: Boolean,
      default: false
    },
    configPositon: {
      type: String,
      default: 'out'
    },
    isEchart: {
      type: Boolean,
      default: false
    },
    selectValueInfo: {
      type: Object,
      default: () => {}
    },
    moduleName: {
      type: String,
      default: 'history_echart'
    },
    isCustomConfigTitle: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    focus: {
      bind (el, binding) {
        el.onmouseover = function () {
          binding.value.titleConfig = true
        }
        el.onmouseleave = function () {
          binding.value.titleConfig = false
        }
      },
      unbind (el) {
        el.onmouseover = null
        el.onmouseleave = null
      }
    }
  },
  created () {
    // this.init()
  },
  data () {
    return {
      checkList: [],
      utilStorage: [],
      utilTitle: [],
      utilLeft: 30,
      utilTop: 30,
      showTip: false,
      storageConfig: []
    }
  },
  mounted () {
    document.body.onclick = () => {
      if (this.showConfig) {
        this.titleConfig = false
      }
    }
  },
  methods: {
    stopAction () {},
    getInitTableTitle () {
      this.utilTitle = JSON.parse(JSON.stringify(this.allTitle))
      if (this.storageConfig.filter(v => v.prop).length > 0) {
        this.checkList = this.storageConfig.filter(v => v.prop).map(v => v.label)
        this.utilStorage = this.storageConfig
      } else {
        this.utilStorage = this.allTitle
        this.checkList = this.allTitle.map(v => v.label)
      }
      if (this.isEchart) {
        this.utilStorage = this.utilStorage.slice(0, 3)
        this.checkList = this.checkList.slice(0, 3)
      }
      this.$emit('getTableTitle', this.utilStorage)
    },
    selectList (val) {
      this.showTip = val.length > 3
      if (val.length > 3 && this.isEchart) {
        this.checkList = val.slice(0, 3)
        return false
      }
      let checkedItems = []
      this.utilTitle.forEach(item => {
        checkedItems.push(val.includes(item.label) ? item : {})
      })
      this.utilStorage = checkedItems
      this.$emit('getTableTitle', this.utilStorage)
    },
    init () {
      if (!this.selectValueInfo || !this.selectValueInfo.devtype) {
        return false
      }
      let param = {
        customname: 'zwslib_main_web_' + this.moduleName,
        customtype: 'zwslib_main_web_',
        devtype: 'zwslib_main_web_config_' + this.selectValueInfo.devtype
      }
      ZLGCustomBigData.getCustomBigDataBriefInfos({
        filter: param
      }).then(res => {
        if (res.data.length > 0) {
          this.isExistConfig = true
          ZLGCustomBigData.getCustomBigDataDetailInfo(Object.assign({apptype: 'zwslib_main_web'}, param)).then(configR => {
            this.storageConfig = JSON.parse(configR.data.content)
            this.getInitTableTitle()
          })
        } else {
          this.getInitTableTitle()
          this.isExistConfig = false
        }
      })
    },
    save () {
      let params = {
        customname: 'zwslib_main_web_' + this.moduleName,
        customtype: 'zwslib_main_web_',
        apptype: 'zwslib_main_web',
        devtype: 'zwslib_main_web_config_' + this.selectValueInfo.devtype
      }
      let methods = this.isExistConfig ? 'updateCustomBigData' : 'addCustomBigData'
      let reqParams = this.isExistConfig ? Object.assign(params, {info: {content: JSON.stringify(this.utilStorage)}}) : Object.assign(params, {content: JSON.stringify(this.utilStorage)})
      this.titleConfig = false
      ZLGCustomBigData[methods](reqParams).then(res => {
        this.isExistConfig = true
        this.$message({message: '保存成功', type: 'success'})
      })
    }
  },
  computed: {
    titleConfig: {
      get () {
        return this.showConfig
      },
      set (val) {
        this.showTip = false
        this.$emit('getConfigVisible', val)
      }
    }
  },
  watch: {
    selectValueInfo: {
      handler (val) {
        // console.log(val)
        if (this.isCustomConfigTitle) {
          this.init()
        } else if (this.moduleName === 'now') {
          this.getInitTableTitle()
        }
      },
      deep: true
    },
    left () {
      let configWidth = document.querySelector('.title-config').offsetWidth
      let pageWidth = document.documentElement.clientWidth
      if (200 + this.left > pageWidth) {
        this.utilLeft = this.left - configWidth
      } else {
        this.utilLeft = this.left
      }
    },
    top () {
      let pageHeight = document.documentElement.clientHeight
      if (480 + this.top > pageHeight) {
        this.utilTop = this.top - 500
      } else {
        this.utilTop = this.top
      }
    }
  }
}
</script>
<style lang="less" scoped>
.title-config {
  position: fixed;
  max-width: 260px;
  text-align: left;
  z-index: 100;
  padding: 10px 0;
  background-color: #fff;
  border: 1px solid #d4e0eb;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 #D4E0EB;
  .config-save {
    .tip-select {
      color: #F56C6C;
      font-size: 12px;
      margin-bottom: 2px;
    }
    text-align: center;
    padding-top: 10px;
  }
}
.el-checkbox-group {
  height: 400px;
  overflow-y: auto;
  .el-checkbox {
    min-width: 100px;
    max-width: 260px;
    display: block;
    height: 36px;
    line-height: 36px;
    margin-left: 0px;
    padding-left: 30px;
    padding-right: 30px;
    &:hover {
      background-color: #F0F6FD;
    }
  }
}
// .out-config {
//   position: absolute;
//   top: 20px !important;
//   left: 0 !important;
// }
</style>
<style>
.el-checkbox {
  margin-right: 0 !important;
}
</style>

