
<template>
  <div>
      <div @click="initDevtype">
      </div>
  </div>
</template>
<script>
/* 登录并保存设备类型等信息 */
import ZLGAssistant from '../../../../sdk/js/api/http/httpModules/ZLGAssistant'
import ZLGDeviceType from '../../../../sdk/js/api/http/httpModules/ZLGDeviceType'
import ZlgDevice from '../../../../sdk/js/api/http/httpModules/ZLGDevice'
// import {mockData, mockData2, getDefaultPermission} from '../DeviceListArea/MockDataForTest.js'
// import ZLGDeviceType from '../../../../sdk/js/api/http/httpModules/ZLGDeviceType'
import { WebSocketUtitl, recursiveCycle } from '../DeviceListArea/js/data/utils.js'

import { DeviceList } from '../DeviceListArea/js/data/device/deviceList.js'

export default {
  props: {
    config: {
      type: Object
    }
  },
  data () {
    
    return {
      deviceList: new DeviceList(),
      allDeviceType: [],
      watchDevices: []
    }
  },

  mounted () {
      // mockData.call(this)
      
      this.initSchema()
      this.initDevtype()
      this.initDevices()
      this.permissionList.deviceGroup.getDeviceGroupList && this.initAllDeviceGroup()
      this.permissionList.project.getProjectList && this.initAllProjects()
      this.permissionList.data.getProjectListDatas && this.initAllDashBoard()
      this.permissionList.data.getProjectListDatas && this.initAllConfigration()
      this.permissionList.user.getUserInfo && this.getUserInfo()
      this.permissionList.device.listDevices && this.initDevices()
      // console.log('permission', this.permissionList)
    },
  methods: {
      initSchema() {
        let info = ZLGAssistant.getDeviceSchema().then(res => {
          this.$emit("toControl", {name: "setSchema", value: res})
          // this.SET_SCHEMA(res)
        })
      }, 
      initDevtype () {

      // let fn = new ZLGDeviceType.getDevtypesList
      ZLGDeviceType.getDevtypesList().then(
        res => {
        recursiveCycle(ZLGDeviceType.getDevtypesList, res.count).then(
          data => { // 登录时一次存储所有设备
          this.needQueryTypeCount = 0
          data.forEach(item => {
            item.devices.count && this.needQueryTypeCount++
          })
          this.allDeviceType = data
          this.SET_ALLDEVTYPE(data)
          let deviceCount = 0
          data.forEach(item => {
            // 汇总所有的设备数
            deviceCount += item.devices.count
          })
          this.SET_DEVICECOUNT(deviceCount)
        })
      }
      )
    },
    SET_ALLDEVTYPE (data) {
      // this.$
      this.$emit("toControl", {name: "setAllDeviceType", value: data})
    },
    SET_DEVICECOUNT () {

    },
    /*  */
    initAllDeviceGroup () {

    },
    initAllProjects () {

    },
    initAllDashBoard () {
      
    },
    initAllConfigration () {

    },
    getUserInfo () {
      
    },
    initDevices () {
      var queryOptions = {}
      ZlgDevice.getDevicesList(queryOptions).then(
        res => {
          this.devices = this.deviceList.getTypeDevices(res.data)
          this.watchDevices = []
          Object.keys(this.devices).forEach(item => {
            this.devices[item].forEach(value => {
              this.watchDevices.push({ devtype: value.devtype, devid: value.devid })
            })
          })
          this.$emit("toControl", {name: "setAllDevice", value: this.devices})
        },
        res => {
       })
    }
  }
}
</script>

<style lang='less'>
body {
  width: 100%;
  height: 100%;
}
</style>