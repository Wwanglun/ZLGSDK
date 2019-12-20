<template>
  <div class="z-device-data-echart">
    <z-deviceData-search
      ref="dataSearch"
      :searchArea="config.show.searchArea"
      :isDesc="isDesc"
      :selectTitle="selectTitle"
      moduleName="now"
      @stopData="stopData"
      @emptyData="emptyData"
      @getAllTableTitle="getAllTableTitle"
    ></z-deviceData-search>
    <z-device-data-echart
      moduleName="realtime_echart"
      :noPoint="noPoint"
      :dataPoint="selectTitle"
      :allTitle="allTitle"
      :isEmpty="isEmpty"
      :isSelectedDev="isSelectedDev"
      :targetAllData="targetAllData"
      :showPercent="percent"
      :isHistoryModule="false"
      :isShowEchart="isShowEchart"
      :showConfig="config.show.tableConfig[0].flag"
      :selectValueInfo="selectValueInfo"
      @getCustomTitle="getCustomTitle"
    ></z-device-data-echart>
  </div>
</template>
<script>
import ZDeviceDataSearch from './components/ZDeviceDataHead/ZDeviceDataSearch.vue'
import {DeviceData} from '../../../../sdk/js/logic/deviceModules/ZWSDeviceDataLogic.js'
import ZWSBaseLogic from '../../../../sdk/js/logic/ZWSBaseLogic.js'
import ZLGSocket from '../../../../sdk/js/api/socket/ZLGSocket.js'
import ZDeviceDataEchart from './components/ZDeviceDataEchart/ZDeviceDataEchart.vue'
import {Base64, formatter, setDataFormat} from '../../../../sdk/js/logic/deviceDataModules/dataRaw/dataParse.js'
import {setTableTitle} from './js/ZDeviceDataTitle.js'
export default {
  components: {
    ZDeviceDataSearch,
    ZDeviceDataEchart
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
              {nickname: '暂停', flag: true, key: 'stopData'}
            ],
            tableColumn: [
              {nickname: '温度', flag: true, key: 'temperature', width: 150, type: 'number', format: 'float'},
              {nickname: '今日发电量', flag: true, key: 'today_energy', width: 150, type: 'number', format: 'float'},
              {nickname: '总发电量', flag: true, key: 'total_energy', width: 150, type: 'number', format: 'float'}
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
      allTitle: [],
      isDesc: true,
      noPoint: true,
      tipText: '请选择设备',
      selectTitle: [],
      default: {},
      isEmpty: true,
      targetAllData: [],
      isSelectedDev: false,
      percent: 0,
      socket: {},
      selectDevinfo: [],
      devclass: 0,
      dataFormat: 4,
      isStop: false,
      isShowEchart: true,
      selectValueInfo: {}
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
      if (res.deviceid === this.selectDevinfo.devid) {
        if (res.topicType === 'raw') {
          let data = this.parseRealtimeRaw(res.data)
          this.targetAllData.unshift(data)
        } else {
          this.isEmpty = false
          if (!res.data.time) {
            res.data.time = parseInt(new Date() - 0) // 需处理设备时区问题
          }
          if (this.devclass === 2 || this.devclass === 3) {
            res.data.loraserver = JSON.stringify(res.data.loraserver)
          }
          if (res.data.raw) {
            delete res.data.raw
          }
          this.targetAllData.push(res.data)
        }
        if (this.targetAllData.length > 10) {
          this.targetAllData.shift()
        }
      }
    },
    getAllTableTitle (val) {
      this.emptyData()
      this.selectValueInfo = {devtype: val.dev.devtype, devid: val.dev.devid}
      this.selectDevinfo = [{devtype: val.dev.devtype, devid: val.dev.devid}]
      this.devclass = val.dev.devclass
      this.socket.addListenerSocket('data', this.selectDevinfo)
      this.socket.addListenerSocket('raw', this.selectDevinfo)
      this.socket.onMessage(res => {
        this.getWebSocketData(res.data)
      })
      this.isSelectedDev = true
      if (!val.devtype || Object.values(val.devtype.schema.data).filter(v => v.type === 'number').length === 0) {
        this.noPoint = true
        this.tipText = '该设备类型无数据点'
        this.isShowEchart = false
        this.selectTitle = []
      } else {
        this.noPoint = false
        this.tipText = '请选择设备'
        this.isShowEchart = true
        if (this.config.show.tableConfig[0].flag) {
          this.allTitle = DeviceData.setDatapoint(Object.keys(val.devtype.schema.data), val.devtype.schema.data, true).filter(v => v.type === 'number')
          this.selectTitle = this.allTitle.slice(0, 3)
        } else {
          this.allTitle = setTableTitle(this.config.show.tableColumn)
          this.selectTitle = this.allTitle.filter(v => v.type === 'number').slice(0, 3)
        }
      }
    },
    getCustomTitle (title) {
      this.selectTitle = title
    },
    stopData (isStop) {
      this.isStop = isStop
      this.socket[isStop ? 'removeListenerSocket' : 'addListenerSocket']('data', this.selectDevinfo)
      this.socket[isStop ? 'removeListenerSocket' : 'addListenerSocket']('raw', this.selectDevinfo)
    },
    emptyData () {
      this.targetAllData = []
      this.isEmpty = true
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
