<template>
  <div class="list-data-config">
    <el-dialog title="数据显示设置" :visible.sync="dialogVisible" width="440px" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="数据格式：">
          <el-select v-model="dataformat">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in options" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ZLGCustomBigData from '../../../../../../sdk/js/api/http/httpModules/ZLGCustomBigData.js'
export default {
  props: {
    configDialog: {
      type: Boolean,
      default: false
    },
    selectValueInfo: {
      type: Object,
      default: () => {}
    },
    moduleName: {
      type: String,
      default: 'history'
    }
  },
  data () {
    return {
      dataformat: 4,
      options: [
        {label: '十六进制', value: 0},
        {label: '十进制', value: 1},
        {label: '二进制', value: 2},
        {label: 'ASCII字符串', value: 3},
        {label: 'base64字符串', value: 4}
      ],
      isExist: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (!this.selectValueInfo || !this.selectValueInfo.devtype) {
        return false
      }
      let param = {
        customname: 'zwslib_main_web_' + this.moduleName,
        customtype: 'zwslib_main_web_',
        devtype: 'zwslib_main_web_format_' + this.selectValueInfo.devtype
      }
      ZLGCustomBigData.getCustomBigDataBriefInfos({
        filter: param
      }).then(res => {
        if (res.data.length > 0) {
          this.isExist = true
          ZLGCustomBigData.getCustomBigDataDetailInfo(Object.assign({apptype: 'zwslib_main_web'}, param)).then(configR => {
            this.dataformat = configR.data.content - 0
            this.$emit('getDataFormat', this.dataformat)
          })
        } else {
          this.isExist = false
        }
      })
    },
    cancel () {
      this.dialogVisible = false
    },
    save () {
      let params = {
        customname: 'zwslib_main_web_' + this.moduleName,
        customtype: 'zwslib_main_web_',
        apptype: 'zwslib_main_web',
        devtype: 'zwslib_main_web_format_' + this.selectValueInfo.devtype
      }
      let methods = this.isExist ? 'updateCustomBigData' : 'addCustomBigData'
      let reqParams = this.isExist ? Object.assign(params, {info: {content: this.dataformat}}) : Object.assign(params, {content: this.dataformat})
      ZLGCustomBigData[methods](reqParams).then(res => {
        this.isExist = true
        this.$message({message: '保存成功', type: 'success'})
        this.$emit('getDataFormat', this.dataformat)
        this.dialogVisible = false
      })
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.configDialog
      },
      set (val) {
        this.$emit('getConfigDialog', val)
      }
    }
  },
  watch: {
    selectValueInfo (val) {
      this.init()
    }
  }
}
</script>
<style lang="less" scoped>
.el-select {
  width: 300px;
}
</style>
