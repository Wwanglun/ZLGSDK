<template>
  <div class="module-search module-common">
    <div class="module-head">
      <div class="options clearfix">
        <div class="fl" v-if="searchArea.find(v => v.key === 'selectDevice') && searchArea.find(v => v.key === 'selectDevice').flag">
          <span class="select-label">设备</span>
          <v-select-device class="select-name" @device="getSelectDevice" :multipleFlag="false" :devices="devices"></v-select-device>
        </div>
        <v-select-time v-if="searchArea.find(v => v.key === 'selectTime') && searchArea.find(v => v.key === 'selectTime').flag" class="fl history-time" @getSearchTime="getSearchTime" :storageTime="storageTime" :cleartime="valueSelect"></v-select-time>
        <el-button v-if="searchArea.find(v => v.key === 'selectTime') && searchArea.find(v => v.key === 'selectTime').flag" class="fl" type="primary" size="medium" @click="search" plain>搜索</el-button>
        <div class="choiceitems choiceitem-time fr">
          <el-button v-if="searchArea.find(v => v.key === 'dataConfig') && searchArea.find(v => v.key === 'dataConfig').flag" size="medium" class="fr" style="margin-left: 6px;" type="primary" plain @click="configDialog = true">数据配置解析</el-button>
          <v-upload-data v-if="searchArea.find(v => v.key === 'downloadData') && searchArea.find(v => v.key === 'downloadData').flag" class="upload fr" :noDataPoint="noDataPoint" :isDesc="isDesc" :isSuccess="isSuccessLoad" :selectedDev="selectValueInfo" :selecttime="selecttime" :total="totalCount" :selectDatapoint="selectTitle"></v-upload-data>
          <el-button v-if="searchArea.find(v => v.key === 'deleteData') && searchArea.find(v => v.key === 'deleteData').flag" size="medium" class="fr btns" type="danger" plain @click="deleteData">删除数据</el-button>
          <el-button v-if="searchArea.find(v => v.key === 'clearData') && searchArea.find(v => v.key === 'clearData').flag" size="medium" class="fr btns" type="danger" plain @click="clearData">清空数据</el-button>
          <el-button v-if="searchArea.find(v => v.key === 'stopData') && searchArea.find(v => v.key === 'stopData').flag" size="medium" class="fr" type="primary" style="margin-left: 6px;" plain @click="stopData">{{isStop ? '开始' : '暂停'}}</el-button>
          <el-button v-if="searchArea.find(v => v.key === 'emptyData') && searchArea.find(v => v.key === 'emptyData').flag" size="medium" class="fr" type="danger" plain @click="emptyData">清空</el-button>
        </div>
      </div>
    </div>
    <v-deleteHistoryData ref="deleteHD" @sureDel="sureDel" :isClear="isClear"></v-deleteHistoryData>
    <v-data-config v-if="searchArea.find(v => v.key === 'dataConfig') && searchArea.find(v => v.key === 'dataConfig').flag" :moduleName="moduleName" :selectValueInfo="selectValueInfo" :configDialog="configDialog" @getDataFormat="getDataFormat" @getConfigDialog="getConfigDialog"></v-data-config>
  </div>
</template>
<script>
import VSelectDevice from '../../../CommonArea/ZSelectDevice'
import VSelectTime from '../../../CommonArea/ZSearchTime'
import VUploadData from './ZDeviceDataUpload.vue'
import VDeleteHistoryData from '../../../CommonArea/ZDeleteSure.vue'
import {DeviceData} from '../../../../../../sdk/js/logic/deviceModules/ZWSDeviceDataLogic.js'
import ZWSDeviceLogic from '../../../../../../sdk/js/logic/deviceModules/ZWSDeviceLogic.js'
import ZLGDeviceType from '../../../../../../sdk/js/api/http/httpModules/ZLGDeviceType.js'
import {setDataFormat} from '../../../../../../sdk/js/logic/deviceDataModules/dataRaw/dataParse.js'
import ZLGDeviceData from '../../../../../../sdk/js/api/http/httpModules/ZLGDeviceData.js'
import VDataConfig from './ZDeviceDataConfig.vue'
import {SaveData} from '../../../../../../sdk/js/logic/deviceDataModules/dataRaw/dataUpdown.js'
export default {
  props: {
    originSelectedDev: {
      type: String,
      default: '' // 选中设备的值为 ‘devid,devtype’ 形式
    },
    filter: {
      type: Object,
      default: () => {}
    },
    isDesc: {
      type: Boolean,
      default: false
    },
    selectTitle: {
      type: Array,
      default: () => []
    },
    searchArea: {
      type: Array,
      default: () => []
    },
    isEchart: {
      type: Boolean,
      default: false
    },
    moduleName: {
      type: String,
      default: 'history'
    }
  },
  components: {
    VSelectDevice,
    VUploadData,
    VSelectTime,
    VDeleteHistoryData,
    VDataConfig
  },
  data () {
    return {
      searchButtonDisabled: false,
      selecttime: {},
      targetAllData: [],
      isSuccessLoad: false,
      isBtnAgain: true,
      originDevice: [],
      storageTime: [],
      storageTime_: [],
      valueSelect: '',
      isStorage: false,
      echartData: [],
      isUploadAgain: true,
      selectDatapoint: [],
      isClear: false,
      isAccess: true,
      // new
      devices: {},
      allDevtype: {},
      selectDeviceType: {},
      selectValueInfo: {},
      page: 1,
      size: 10,
      devclass: 0,
      dataFormat: 4,
      configDialog: false,
      currentListData: [],
      noDataPoint: false,
      totalCount: 0,
      param: {},
      isSendData: true,
      isStop: false
    }
  },
  created () {
    // this.storageSearch()
    this.getDeviceBaseInfo()
  },
  methods: {
    getDataFormat (dataFormat) {
      if (this.moduleName === 'history') {
        this.dataFormat = dataFormat
        this.historydata = setDataFormat(this.currentListData, this.dataFormat, this.devclass)
        this.$emit('getShowData', this.historydata)
      } else if (this.moduleName === 'now') {
        this.$emit('getFormat', dataFormat)
      }
    },
    getConfigDialog (visible) {
      this.configDialog = visible
    },
    getDeviceBaseInfo () {
      ZWSDeviceLogic.initDevices().then(res => {
        this.devices = res.obj
      })
      ZLGDeviceType.getDevtypesList().then(res => {
        this.allDevtype = res.data
      })
    },
    storageSearch () {
      if (this.originSelectedDev !== '') {
        this.$set(this.originDevice, 0, this.originSelectedDev)
        const time = (new Date() - 0) / 1000 - 10
        // const end = time - new Date(time).getTimezoneOffset() * 60
        const end = time
        const start = end - 3600
        this.storageTime_ = [start, end]
        this.isStorage = true
      } else if (this.$route.query.devid) {
        let devid = this.$route.query.devid
        let devtype = this.$route.query.devtype
        this.$set(this.originDevice, 0, devid + ',' + devtype)
      } else {
        this.isStorage = true
        let searchTime = localStorage.getItem('cloud_history_time')
        let storageDev = localStorage.getItem('cloud_history_dev')
        if (storageDev && storageDev !== 'undefined') {
          let device = this.allDevice[storageDev.split(',')[1]] && this.allDevice[storageDev.split(',')[1]].find(v => v.devid === storageDev.split(',')[0])
          if (device) {
            this.$set(this.originDevice, 0, storageDev)
          }
        }
        if (searchTime && searchTime !== 'undefined') {
          this.storageTime_ = JSON.parse(searchTime)
        }
      }
    },
    getSelectDevice (device) {
      this.targetAllData = []
      this.isBtnAgain = false
      this.isSuccessLoad = false
      this.selectValueInfo = device.valueInfo[0]
      this.devclass = device.valueInfo[0].devclass
      this.selectDeviceType = this.allDevtype.find(v => v.devtype === this.selectValueInfo.devtype)
      this.noDataPoint = !this.selectDeviceType || Object.keys(this.selectDeviceType.schema.data).length === 0
      this.$emit('getAllTableTitle', {devtype: this.selectDeviceType, dev: this.selectValueInfo})
      this.isStop = false
      if (this.originSelectedDev === '' && this.selectValueInfo) this.$emit('getDev', Object.assign(this.selectValueInfo, {isDevAccess: this.isAccess}))
      if (device.isHand) {
        // this.valueSelect = device.valueSelect
        localStorage.setItem('cloud_history_dev', device.valueSelect)
      }
    },
    getSearchTime (val) {
      let time = {}
      this.targetAllData = []
      this.isBtnAgain = false
      this.isSuccessLoad = false
      time.endtime = val[1] ? val[1] : ''
      time.starttime = val[0] ? val[0] : ''
      this.selecttime = time
      if (this.originSelectedDev === '') localStorage.setItem('cloud_history_time', JSON.stringify(val))
    },
    search (filter) {
      this.echartData = []
      if (!this.selectValueInfo || Object.keys(this.selectValueInfo).length === 0) {
        this.$message.error('请选择设备')
        return
      }
      if (!this.selectDeviceType || Object.values(this.selectDeviceType.schema.data).filter(v => v.type === 'number').length === 0) {
        this.$message.error('该设备没有设备数据点')
        return
      }
      if (!this.selecttime.starttime || this.selecttime.endtime === '') {
        this.$message.error('请选择查询时间')
        return
      }
      if (this.isSuccess) {
        this.$message({ message: '数据已加载成功', type: 'success' })
        return
      }
      this.$emit('getBeforeLoad')
      DeviceData.searchData({
        deviceInfo: this.selectValueInfo,
        startTime: this.selecttime.starttime,
        endTime: this.selecttime.endtime,
        isCount: true,
        filter: filter.$and ? filter : Object.keys(filter).length === 0 ? {} : this.filter
      }).then(count => {
        if (count) {
          this.isSuccessLoad = true
          this.totalCount = count.count
          this.$emit('getCount', this.totalCount)
          let counts = this.totalCount > 1000 ? 1000 : this.totalCount
          if (this.isEchart) {
            this.showEchartData(counts)
          } else {
            this.showTableData()
          }
        } else {
          this.loading_ = false
          this.loading = false
          this.isLoading = false
          this.totalCount = 0
          this.historydata = []
          this.isEmpty = true
          this.isSuccess = true
        }
      }) 
    },
    showEchartData (count) {
      ZLGDeviceData.getDeviceDatas({
        devid: this.selectValueInfo.devid,
        devtype: this.selectValueInfo.devtype,
        starttime: this.selecttime.starttime,
        endtime: this.selecttime.endtime,
        limit: count,
        descend: true
      }).then(res => {
        this.$emit('getShowData', res.data)
      })
    },
    showTableData (sort) {
      DeviceData.searchData({
        deviceInfo: this.selectValueInfo,
        startTime: this.selecttime.starttime,
        endTime: this.selecttime.endtime,
        isNew: false,
        limit: this.size,
        skip: (this.page - 1) * this.size,
        descend: sort !== undefined ? sort : this.isDesc,
        filter: this.filter
      }).then(small => {
        this.currentListData = small.targetAllData
        this.historydata = setDataFormat(this.currentListData, this.dataFormat, this.devclass)
        this.loading_ = false
        this.$emit('getShowData', this.historydata)
      })
    },
    getPage (page) {
      this.loading_ = true
      this.page = page
      DeviceData.searchData({
        deviceInfo: this.selectValueInfo,
        startTime: this.selecttime.starttime,
        endTime: this.selecttime.endtime,
        isNew: false,
        limit: this.size,
        skip: (this.page - 1) * this.size,
        filter: this.filter,
        descend: this.isDesc
      }).then(small => {
        this.loading_ = false
        if (this.totalCount - (this.page - 1) * this.size > this.size) {
          this.currentListData = small.targetAllData
        } else {
          let count = this.totalCount - (this.page - 1) * this.size
          this.currentListData = small.targetAllData.slice(0, count)
        }
        this.historydata = setDataFormat(this.currentListData, this.dataFormat, this.devclass)
        this.$emit('getShowData', this.historydata)
      })
    },
    getSize (size) {
      this.loading_ = true
      this.size = size
      DeviceData.searchData({
        deviceInfo: this.selectValueInfo,
        startTime: this.selecttime.starttime,
        endTime: this.selecttime.endtime,
        isNew: false,
        limit: this.size,
        skip: (this.page - 1) * this.size,
        filter: this.filter,
        descend: this.isDesc
      }).then(small => {
        this.loading_ = false
        if (this.totalCount - (this.page - 1) * this.size > this.size) {
          this.currentListData = small.targetAllData
        } else {
          let count = this.totalCount - (this.page - 1) * this.size
          this.currentListData = small.targetAllData.slice(0, count)
        }
        this.historydata = setDataFormat(this.currentListData, this.dataFormat, this.devclass)
        this.$emit('getShowData', this.historydata)
      })
    },
    init () {
      this.$refs['dataTable'].initData()
      this.isLoading = true
      this.loading_ = true
      this.loading = true
      this.isShowEchart = true
      this.isSendData = true
      this.isEmpty = true
      this.tipText = '拼命加载中'
      this.loadIcon = ''
      this.totalCount = 0
      this.page = 1
      this.size = 10
      this.targetAllData = []
      this.historydata = []
    },
    getShowData (val) {
      this.targetAllData = val
      this.isSuccessLoad = true
      this.isBtnAgain = true
    },
    getEchartData (val) {
      if (this.echartData.length === 0) {
        this.echartData = val
      }
      this.isUploadAgain = val.length === 1000
    },
    getListDataPoint (val) {
      this.selectDatapoint = val
    },
    deleteData () {
      if (!this.isSuccessLoad) {
        this.$message.error('请先查询设备数据')
        return
      }
      if (this.totalCount === 0) {
        this.$message.error('暂无设备数据')
        return
      }
      let req = {
        devid: this.selectValueInfo.devid,
        devtype: this.selectValueInfo.devtype,
        filter: JSON.stringify({time: {$gte: this.selecttime.starttime * 1000, $lte: this.selecttime.endtime * 1000}}),
        aggregation: 'count'
      }
      ZLGDeviceData.getDeviceDatas(req).then(res => {
        if (res.count > 150000) {
          this.$message.error('每次删除数据量不能超过15万条')
          return false
        }
        this.isClear = false
        this.$refs['deleteHD']._data.dialogVisible = true
      })
    },
    clearData () {
      if (this.totalCount.length === 0) {
        this.$message.error('暂无设备数据')
        return
      }
      if (!this.isSuccessLoad) {
        this.$message.error('请先查询设备数据')
        return
      }
      this.isClear = true
      this.$refs['deleteHD']._data.dialogVisible = true
    },
    sureDel (val) {
      let req = {
        devid: this.selectValueInfo.devid,
        devtype: this.selectValueInfo.devtype
      }
      if (val) {
        ZLGDeviceData.clearDeviceDatas(req).then(res => {
          this.initData('成功清空数据')
        })
      } else {
        req.filter = JSON.stringify({time: {$gte: this.selecttime.starttime * 1000, $lte: this.selecttime.endtime * 1000}})
        ZLGDeviceData.deleteDeviceDatas(req).then(_ => {
          this.initData('成功删除数据')
        })
      }
    },
    initData (message) {
      this.$message({message, type: 'success'})
      this.totalCount = 0
      this.targetAllData = []
      this.historydata = []
      this.$emit('getShowData', this.historydata)
      this.$emit('getCount', this.totalCount)
      // if (typeof this.$refs['deviceData'].saveData.toggleDropSaveData === 'function' && this.$refs['deviceData'].isSendData) {
      //   this.$refs['deviceData'].isSendData = false
      //   this.$refs['deviceData'].saveData.toggleDropSaveData(true)
      // }
    },
    stopData () {
      this.isStop = !this.isStop
      this.$emit('stopData', this.isStop)
    },
    emptyData () {
      this.$emit('emptyData')
    }
  }
}
</script>

<style lang="less" scoped>
.module-search {
  display: flex;
  flex-direction: column;
  border: none;
  // margin-right: 1px;
  .module-head {
    text-align: center;
    min-height: 46px;
    line-height: 46px;
    // box-sizing: border-box;
    border-bottom: 1px solid #E8ECF1;
    background-color: #fff;
    .options {
      // padding: 4px 10px 4px 10px;
      padding: 0 14px;
      &>.el-button {
        margin-top: 6px;
        margin-left: 6px;
      }
      .select-label {
        font-size: 14px;
        color: #797b80;
        padding-right: 6px;
      }
      .select-name {
        display: inline-block;
        margin-right: 20px;
      }
      .choiceitems {
        line-height: 44px;
        width: 450px;
        .btns {
          margin-right: 6px;
        }
        .el-button {
          margin-top: 6px;
        }
        .upload {
          margin-top: 1px;
        }
      }
    }
  }
  .module-content {
    position: relative;
    min-height: 340px;
    .tip {
      padding-top: 22px;
      padding-left: 50px;
    }
  }
}
</style>
