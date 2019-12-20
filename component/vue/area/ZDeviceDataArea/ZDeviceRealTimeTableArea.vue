<template>
  <div class="z-device-data-table">
    <z-deviceData-search
      ref="dataSearch"
      :searchArea="config.show.searchArea"
      :isDesc="isDesc"
      :selectTitle="selectTitle"
      moduleName="now"
      @stopData="stopData"
      @emptyData="emptyData"
      @getFormat="getFormat"
      @getAllTableTitle="getAllTableTitle"
    ></z-deviceData-search>
    <div class="table-wrap" v-show="noPoint">{{tipText}}</div>
    <z-table-ctrl
      v-show="!noPoint"
      ref="tableCtrl"
      :tableColumn="config.show.tableColumn"
      :showTableConfig="config.show.tableConfig[0].flag"
      :total="total"
      :customTitle="true"
      :allTitle="allTitle"
      :tableData="tableData"
      :selectValueInfo="selectValueInfo"
      :isToggle="isToggle"
      :showTime="true"
      @getFilter="getFilter"
      @getCustomTitle="getCustomTitle"
    ></z-table-ctrl>
  </div>
</template>
<script>
import ZDeviceDataSearch from './components/ZDeviceDataHead/ZDeviceDataSearch.vue'
import {DeviceData} from '../../../../sdk/js/logic/deviceModules/ZWSDeviceDataLogic.js'
import ZTableCtrl from '../../ctrl/ZTableCtrl/ZTableCtrl.vue'
import ZWSBaseLogic from '../../../../sdk/js/logic/ZWSBaseLogic.js'
import ZLGSocket from '../../../../sdk/js/api/socket/ZLGSocket.js'
import {Base64, formatter, setDataFormat} from '../../../../sdk/js/logic/deviceDataModules/dataRaw/dataParse.js'
import {setTableTitle} from './js/ZDeviceDataTitle.js'
export default {
  components: {
    ZDeviceDataSearch,
    ZTableCtrl
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          show: {
            searchArea: [
              {nickname: '设备选择', flag: true, key: 'selectDevice'},
              {nickname: '清空', flag: true, key: 'emptyData'},
              {nickname: '暂停', flag: true, key: 'stopData'},
              {nickname: '原始数据配置', flag: true, key: 'dataConfig'}
            ],
            tableColumn: [
              {nickname: '温度', flag: true, key: 'temperature', width: 150, type: 'number'},
              {nickname: '今日发电量', flag: true, key: 'today_energy', width: 150, type: 'number'},
              {nickname: '总发电量', flag: true, key: 'total_energy', width: 150, type: 'number'}
            ],
            tableConfig: [
              {nickname: '数据点配置框', flag: false, key: 'tableColumConfig'}
            ]
          }
        }
      }
    }
  },
  created () {
    this.initWebsocket()
    this.default = ZWSBaseLogic.getExportConfig(this.config)
  },
  data () {
    return {
      total: 0,
      tableData: [],
      allTitle: [],
      isDesc: true,
      noPoint: true,
      tipText: '请选择设备',
      selectTitle: [],
      default: {},
      isEmpty: true,
      targetAllData: [],
      isSelectedDev: false,
      percent: 100,
      socket: {},
      selectDevinfo: [],
      devclass: 0,
      dataFormat: 4,
      currentOriginData: [],
      filter: {},
      isStop: false,
      selectValueInfo: {},
      isToggle: true
    }
  },
  methods: {
    initWebsocket () {
      let jwt = JSON.parse(localStorage.getItem('cloudUser')).jwt
      this.socket = new ZLGSocket(jwt)
    },
    parseRealtimeRaw (single) {
      let data = {}
      // eslint-disable-next-line
      let buff = new Buffer(single, 'base64')
      let str = buff.slice(4).toString('utf8')
      let reg = /([a-zA-Z%]+)/.test(str)
      let dataObj = (reg && str.indexOf('{') === -1) || str === '' ? {data: single} : JSON.parse(str)
      let unitArray = Base64.decode(dataObj.data || single)
      if (this.devclass === 2 || this.devclass === 3) {
        data = {
          raw: formatter(unitArray, this.dataFormat),
          loraserver: JSON.stringify(dataObj.loraserver),
          time: parseInt(new Date() - 0)
        }
      } else {
        data = {raw: formatter(unitArray, this.dataFormat), time: parseInt(new Date() - 0)}
      }
      return data
    },
    getWebSocketData (res) {
      if (res.message) {
        this.$message.error(res.message)
      }
      let filterData = DeviceData.filterData(res.data, this.filter)
      if (!filterData) {
        return
      }
      if (res.deviceid === this.selectDevinfo.devid) {
        if (res.topicType === 'raw') {
          let data = this.parseRealtimeRaw(res.data)
          let singleData = DeviceData.setTableData([data], this.allTitle).tableData
          this.tableData.unshift(...singleData)
          this.currentOriginData.unshift({raw: res.data, time: parseInt(new Date() - 0), isRaw: true})
        } else {
          if (!res.data.time) {
            res.data.time = parseInt(new Date() - 0) // 需处理设备时区问题
          }
          if (this.devclass === 2 || this.devclass === 3) {
            res.data.loraserver = JSON.stringify(res.data.loraserver)
          }
          if (res.data.raw) {
            delete res.data.raw
          }
          let singleData = DeviceData.setTableData([res.data], this.allTitle).tableData
          this.tableData.push(...singleData)
          this.currentOriginData.push(res.data)
        }
        if (this.tableData.length > 10) {
          this.tableData.shift()
          this.currentOriginData.shift()
        }
        this.total = this.tableData.length
      }
    },
    getAllTableTitle (val) {
      this.emptyData()
      this.selectDevinfo = [{devtype: val.dev.devtype, devid: val.dev.devid}]
      this.devclass = val.dev.devclass
      this.socket.addListenerSocket('data', this.selectDevinfo)
      this.socket.addListenerSocket('raw', this.selectDevinfo)
      this.socket.onMessage(res => {
        this.getWebSocketData(res.data)
      })
      this.isToggle = !this.config.show.tableConfig[0].flag
      this.isSelectedDev = true
      this.selectValueInfo = val.dev
      if (!val.devtype || Object.keys(val.devtype.schema.data).length === 0) {
        this.noPoint = true
        this.tipText = '该设备类型无数据点'
      } else {
        this.tipText = '请选择设备'
        if (this.config.show.tableConfig[0].flag) {
          this.allTitle = DeviceData.setDatapoint(Object.keys(val.devtype.schema.data), val.devtype.schema.data, true)
        } else {
          this.noPoint = false
          this.allTitle = setTableTitle(this.config.show.tableColumn)
          this.selectTitle = this.allTitle
        }
      }
    },
    getFilter (filter) {
      this.filter = filter
      let util = this.currentOriginData.filter(item => DeviceData.filterData(item, filter))
      this.tableData = DeviceData.setTableData(util, this.allTitle).tableData
      this.total = this.tableData.length
    },
    getCustomTitle (title) {
      this.noPoint = false
      this.isToggle = true
      this.selectTitle = title
    },
    stopData (isStop) {
      this.isStop = isStop
      this.socket[isStop ? 'removeListenerSocket' : 'addListenerSocket']('data', this.selectDevinfo)
      this.socket[isStop ? 'removeListenerSocket' : 'addListenerSocket']('raw', this.selectDevinfo)
    },
    emptyData () {
      this.tableData = []
      this.total = 0
      this.currentOriginData = []
      this.filter = {}
    },
    getFormat (format) {
      this.dataFormat = format
      let dataArr = []
      this.currentOriginData.forEach(v => {
        let singleObj = {}
        if (v.isRaw) {
          singleObj = Object.assign(this.parseRealtimeRaw(v.raw), {time: v.time})
        } else {
          singleObj = v
        }
        let singleData = DeviceData.setTableData([singleObj], this.allTitle).tableData
        dataArr.push(...singleData)
      })
      this.tableData = dataArr
    }
  },
  watch: {
    config () {
      this.default = ZWSBaseLogic.getExportConfig(this.config)
    },
    selectDevinfo (newVal, oldVal) {
      if (oldVal[0] && oldVal[0].devid) {
        this.socket.removeListenerSocket('data', oldVal)
        this.socket.removeListenerSocket('raw', oldVal)
      }
    }
  },
  beforeDestroy () {
    if (!this.isStop) {
      this.socket.removeListenerSocket('data', this.selectDevinfo)
      this.socket.removeListenerSocket('raw', this.selectDevinfo)
    }
  }
}
</script>
<style scoped>
.table-wrap {
  height: 400px;
  line-height: 400px;
  color: #606266;
  text-align: center;
  background-color: #fff;
  font-size: 14px;
}
</style>
