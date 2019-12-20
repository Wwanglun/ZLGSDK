<template>
  <div class="device-details">
    <v-main-header :modulename="modulename"
                   :current-title="devname"></v-main-header>
    <div class="device-details-content">
      <el-tabs v-model="activeName"
               class="device-tabs">
        <el-tab-pane name="deviceInfo">
          <span slot="label"
                style="margin-left:16px">设备概况</span>
          <v-info @devname="getDevname" :deviceInfo='deviceInfo'></v-info>
        </el-tab-pane>
        <el-tab-pane label="状态信息配置"
                     name="deviceConfig">
          <v-config :deviceInfo='deviceInfo'></v-config>
        </el-tab-pane>
        <el-tab-pane label="设备控制"
                     name="deviceCotrol">
          <v-device-control :deviceInfo='deviceInfo'></v-device-control>
        </el-tab-pane>
        <el-tab-pane label="设备日志"
                     name="deviceLog">
          <v-log :deviceInfo='deviceInfo'></v-log>
        </el-tab-pane>
        <el-tab-pane label="实时数据"
                     name="nowData">
          <v-now-data v-if="activeName === 'nowData'"></v-now-data>
        </el-tab-pane>
        <el-tab-pane label="历史数据"
                     name="historyData">
          <v-history-data v-if="activeName === 'historyData'"></v-history-data>
        </el-tab-pane>
        <el-tab-pane label="子设备列表"
                     name="subDevice"
                     v-if="deviceInfo.devclass == 1 || deviceInfo.devclass == 3">
          <v-sub-device :deviceInfo='deviceInfo'></v-sub-device>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { EventList } from '@/assets/js/device/deviceEvent.js'
import ZlgCloudHelper from 'API/ZlgCloudHelper.js'
import VMainHeader from '@/components/Common/MainHeader.vue'
import VConfig from './DeviceDetails/DeviceDetailsConfig.vue'
import VInfo from './DeviceDetails/DeviceDetailsInfo.vue'
import VLog from './DeviceDetails/DeviceDetailsLog.vue'
import VDeviceControl from './DeviceDetails/DeviceDetailsControl.vue'
import VSubDevice from './DeviceDetails/SubDeviceList.vue'
import VHistoryData from './DeviceDetails/DeviceDataHistory.vue'
import VNowData from './DeviceDetails/DeviceDataNow.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
// import { WebSocketUtitl } from '@/assets/js/common/utils.js'
export default {
  name: 'DeviceDetails',
  data () {
    return {
      devname: '',
      modulename: [{ path: '/Home/Device/List', name: '设备列表' }, { path: '', name: '设备详情' }],
      latitude: '',
      longitude: '',
      activeName: 'deviceInfo',
      devid: this.$route.query.devid,
      devtype: this.$route.query.devtype,
      deviceInfo: {},
      info: localStorage.getItem('cloudUser')
    }
  },
  components: {
    VConfig,
    VInfo,
    VMainHeader,
    VLog,
    VDeviceControl,
    VSubDevice,
    /* VHistoryData, */
    VNowData
  },
  computed: {
    ...mapGetters(['height', 'allDevtype', 'allDevice']),
    ...mapState({
      permissionList: state => state.PermissionListModule.permissionList
    })
  },
  created () {
    let devices = {}
    devices[this.deviceType] = [
      {
        'label': this.deviceInfo.devname,
        'value': this.deviceInfo.devid
      }
    ]
    this.permissionList.device.getDeviceInfo && this.getDeviceInfo()
  },
  methods: {
    ...mapMutations(['SET_ALLDEVICE']),
    refreshDevice () {
      Object.keys(this.allDevice).forEach(item => {
        if (item == this.devtype) {
          this.deviceInfo = this.allDevice[item].filter(v => v.devid == this.devid)[0]
        }
      })
      if (this.deviceInfo && this.allDevtype && this.allDevtype.length > 0) {
        this.deviceInfo.basetype = this.allDevtype.find(v => v.devtype === this.$route.query.devtype).basetype
      }
    },
    updatedDeviceInfo (multipleSelection) {
      // 更新vuex里面的设备数
      let allDevices = JSON.parse(JSON.stringify(this.allDevice))
      multipleSelection.forEach(item => {
        Object.keys(this.allDevice).forEach(value => {
          if (value === item.devtype) {
            allDevices[value].forEach((key, index) => {
              if (key.devid === item.devid) {
                Object.assign(key, item)
              }
            })
          }
        })
      })
      this.SET_ALLDEVICE(allDevices)
    },
    getDeviceInfo () {
      ZlgCloudHelper.getDeviceInfor({devid: this.devid, devtype: this.devtype}).then(res => {
        this.updatedDeviceInfo([res])
        this.deviceInfo = res
        if (this.deviceInfo && this.allDevtype && this.allDevtype.length > 0) {
          this.deviceInfo.basetype = this.allDevtype.find(v => v.devtype === this.$route.query.devtype).basetype
        }
      })
    },
    getDevname (val) {
      this.devname = val
    },
    handleClick (tab, event) {
      this.tabName = tab.name
    }
  },
  beforeDestroy () {
    sessionStorage.removeItem('cloud_dev_nowData')
  },
  watch: {
    $route (to, from) {
      if (!this.permissionList.device.getDeviceInfo) {
        this.$message.error('没有查看设备信息的权限')
        let _this = this
        setTimeout(() => {
          _this.$router.push(from.fullPath)
        }, 1000)
      }
    },
    'allDevtype': {
      handler: function (newVal) {
        this.refreshDevice()
      },
      deep: true
    },
    'allDevice': {
      handler: function (newVal) {
        this.refreshDevice()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.device-details {
  width: 100%;
  overflow-x: hidden;
  .device-details-content {
    margin: 8px 8px 0 8px;
    .el-tabs__header {
      padding-left: 8px!important;
    }
  }
}
</style>
