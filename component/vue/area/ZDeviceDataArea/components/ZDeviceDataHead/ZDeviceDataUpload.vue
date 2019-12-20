<template>
<div>
  <el-button type="primary" @click="exportData" size="medium">下载数据</el-button>
  <dialog-updata ref="updata" @stopSave="stopSave"></dialog-updata>
  <dialog-format @getFormatVisible="getFormatVisible" :formatVisible="formatVisible" @getFormat="getFormat"></dialog-format>
</div>
</template>

<script>
import DialogUpdata from './ZDeviceUploadProcess.vue'
import DialogFormat from './ZDeviceDataFormat.vue'
import {SaveData, getSaveDataCount, sheet2blob, openDownloadDialog} from '../../../../../../sdk/js/logic/deviceDataModules/dataRaw/dataUpdown.js'
import work from 'webworkify-webpack'
export default {
  components: {
    DialogUpdata,
    DialogFormat
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    selectedDev: {
      type: Object,
      default: () => {}
    },
    selecttime: {
      type: Object,
      default: () => {}
    },
    isSuccess: {
      type: Boolean,
      default: false
    },
    noDataPoint: {
      type: Boolean,
      default: false
    },
    selectDatapoint: {
      type: Array,
      default: () => []
    },
    isDesc: {
      type: Boolean,
      default: false
    },
    dataFormat: {
      type: Number,
      default: 0
    },
    devclass: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      saveData: {},
      updataWorker: null,
      param: {},
      selectDeviceType: {},
      formatVisible: false,
      isLoaded: false,
      fileFormat: '',
      storageData: []
    }
  },
  methods: {
    getFormatVisible (val) {
      this.formatVisible = val
    },
    getFormat (val) {
      this.fileFormat = val
      let reqParam = {}
      reqParam.devid = this.selectedDev.devid
      reqParam.devtype = this.selectedDev.devtype
      reqParam.starttime = this.selecttime.starttime
      reqParam.endtime = this.selecttime.endtime
      reqParam.descend = this.isDesc
      getSaveDataCount(Object.assign({aggregation: 'count'}, reqParam)).then(res => {
        if (res <= 600000) {
          this.$refs['updata']._data.dialogVisible = true
          this.param.num = res
          this.param.maxSize = 5000
          this.param.tipsCallBack = this.tipsCallBack
          this.param.dataCallBack = this.dataCallBack
          this.saveData = new SaveData()
          this.saveData.getAllSaveData(this.param, Object.assign({limit: this.param.maxSize}, reqParam))
        } else {
          this.$message.error('一次最多只能保存60万条数据, 请缩短查询时间！')
        }
      })
    },
    exportData () {
      if (!this.selectedDev.devid) {
        this.$message.error('请选择设备')
        return
      }
      if (!this.selecttime.starttime || !this.selecttime.endtime) {
        this.$message.error('请选择时间段')
        return
      }
      if (this.total === 0) {
        this.$message.error('当前历史数据条数为0，请先查询数据！')
        return
      }
      if (this.noDataPoint) {
        this.$message.error('该设备没有数据点')
      } else {
        this.formatVisible = true
      }
    },
    tipsCallBack (info) {
      this.$refs['updata'].resultAndProcessTip(info, this.saveData, this.param)
      if (info.type == 'success') {
        this.dataCallBack(this.saveData.saveData, this.fileFormat)
      } else if (info.type == 'broken') {
        var msg = '当前的网络不稳定，请检测网络! 是否保存已获取的数据?'
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs['updata'].sureSave(true)
          this.dataCallBack(this.saveData.saveData, this.fileFormat)
        }).catch(() => {
          this.$refs['updata'].sureSave(false)
        })
      }
    },
    dataCallBack (data, format) {
      this.updataWorker = work(require.resolve('../../../../../../sdk/js/logic/deviceDataModules/dataRaw/dataExport.js'))
      this.updataWorker.addEventListener('message', e => {
        let sheets = []
        e.data.data.forEach(v => {
        // eslint-disable-next-line
          sheets.push(XLSX.utils.aoa_to_sheet(v.data))
        })
        let name = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
        openDownloadDialog(sheet2blob(sheets, [name], format), name + '.' + (format === 'excel' ? 'xls' : format))
        this.$message({message: '下载成功', type: 'success', customClass: 'login-tip'})
        this.$refs['updata'].init()
        this.isLoaded = false
      })
      this.updataWorker.postMessage({saveData: data, schema: this.selectDatapoint, dataFormat: this.dataFormat, devclass: this.devclass})
    },
    stopSave () {
      this.saveData.toggleDropSaveData(true)
      this.saveData = {}
      if (this.updataWorker) this.updataWorker.terminate()
      this.$message({message: '已取消下载'})
      this.$refs['updata'].init()
    },
    filterData (data, dpList) {
      let utilData = []
      data.forEach(item => {
        let single = {}
        Object.keys(item).forEach(key => {
          if (dpList.find(v => v.key === key)) {
            single[key] = item[key]
            single.time = item.time
          }
        })
        utilData.push(single)
      })
      return utilData
    }
  },
  beforeDestroy () {
    if (typeof this.saveData.toggleDropSaveData === 'function') {
      this.saveData.toggleDropSaveData(true)
    }
  },
  watch: {
    isSuccess () {
      this.isLoaded = false
      this.storageData = []
    }
  }
}
</script>

<style lang="less" scoped>
</style>
