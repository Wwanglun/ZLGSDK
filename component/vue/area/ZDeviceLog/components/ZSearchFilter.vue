<template>
  <div class="event-filter clearfix">
    <div class="event-filter-list">
      <label>设备</label>
      <z-select-device ref="selectDev" class="select-name" :clearSelect="true" :placeholder="'请选择设备'" @device="getSelectDevice($event)" :multipleFlag="false" :originDevice="originDevice" :devices="devices"></z-select-device>
    </div>
    <div class="event-filter-list">
      <z-select-time @getSearchTime='getSearchTime'></z-select-time>
    </div>
    <div class="event-filter-list">
      <el-button type="primary" @click="search" plain size="medium">搜索</el-button>
    </div>
  </div>
</template>

<script>
import ZWSDeviceEventLogic from '../../../../../sdk/js/logic/deviceModules/ZWSDeviceEventLogic.js'
import ZWSDeviceLogic from '../../../../../sdk/js/logic/deviceModules/ZWSDeviceLogic.js'
import ZSelectTime from '../../CommonArea/ZSearchTime'
import ZSelectDevice from '../../CommonArea/ZSelectDevice'
export default {
  name: 'EventFilter',
  props: {
    selectDeviceFlag: {
      type: Boolean
    },
    multiple: {
      type: Array
    }
  },
  components: {
    ZSelectDevice,
    ZSelectTime
  },
  created () {
    this.getDeviceList()
    // 触发搜索事件，以便EventLogTable更新Header。
    this.devtype && this.search(true, true)
  },
  data () {
    return {
      originDevice: [],
      flag: false || this.selectDeviceFlag,
      devtype: '',
      device: {},
      startTime: 0,
      endTime: 0,
      logType: 'log',
      devices: {}
    }
  },
  methods: {
    getDeviceList () {
      ZWSDeviceLogic.initDevices().then(res => {
        this.devices = res.obj
        this.$emit('getDevices', this.devices)
        // this.getOriginDevice(this.devices)
      })
    },
    getOriginDevice (newVal) {
      if (!newVal || !Object.keys(newVal).length) {
        return
      }
      this.originDevice = []
      let devid = newVal[Object.keys(newVal)[0]][0].devid
      let devtype = newVal[Object.keys(newVal)[0]][0].devtype
      this.originDevice = [`${devid},${devtype}`]
      this.device = newVal[Object.keys(newVal)[0]][0]
      this.devtype = devtype
    },
    getSelectDevice (device) {
      this.device = device && device.valueInfo[0]
      this.devtype = device && device.valueSelect && device.valueSelect.split(',')[1]
    },
    selectLogsType (val) {
      this.logType = val
    },
    getSearchTime (val) {
      this.startTime = val[0] ? val[0] : ''
      this.endTime = val[1] ? val[1] : ''
    },
    search (init, flag) {
      // this.$message.error('123')
      // console.log('EventFilter search')
      let searchOptions = {
        startDate: this.startTime * 1000,
        endDate: this.endTime * 1000
      }
      let event = null
      let filter = null
      if (this.device && Object.keys(this.device).length) {
        // 如果只选择设备类型，就默认搜索该设备类型下面所有的设备
        let searchDevice = this.device.devid
        event = new ZWSDeviceEventLogic(this.devtype, searchDevice, this.logType)
        filter = event.getSearchFilter(searchOptions)
      } else {
        return
      }
      this.$emit('filter', filter)
    }
  },
  watch: {
    // 'devices': {
    //   handler: function (newVal) {
    //     this.getOriginDevice(newVal)
    //     this.devtype = Object.keys(newVal).length ? Object.keys(newVal)[0] : ''
    //     this.devtype && this.search(true, true)
    //   },
    //   deep: true
    // }
  }
}
</script>
<style lang='less' scoped>
.event-filter {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 14px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 4px;
  .event-filter-list {
    float: left;
    margin-right: 20px;
    margin-top: 10px;
    &:last-child {
      margin-left: -14px;
    }
  }
  .event-filter-process {
    float: right;
    margin-top: 12px;
  }
  label {
    margin-right: 10px;
    color: #6c6e72;
    font-size: 14px;
  }
}
</style>
