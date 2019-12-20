<template>
    <div class="device-info" @click="mock()" v-loading="loading"><!-- deviceInfo:{{deviceInfo}} -->
      <div class="info" v-if="deviceInfo">
        <div class="left"><!-- allDevice:{{allDevice.length}} -->
          <div class="device-info-left-content">
            <div class="mini-header">设备信息</div>
            <div class="info-content" v-if="deviceInfo">
              <div class="info-first">
                <ul class="infoUl" style="margin-left: -30px;">
                  <li class="clearfix"><v-edit-input placeholderDes='请输入新的设备名称' name='设备名称' :value='deviceInfo.devname' @valueChange='changeValue' ref="editNameInput" class="edit-info clearfix"></v-edit-input></li>
                  <li class="clearfix"><span>设备类型：</span><span :title="deviceInfo.devtype">{{deviceInfo.devtype}}</span></li>
                  <li class="clearfix"><span style="float: left">设备ID：</span><span class="text-overflow" style="width: 300px;float: left" :title="deviceInfo.devid">{{deviceInfo.devid}}</span></li>
                  <li class="clearfix"><span>设备状态：</span><span>{{devstatus[this.status]}}</span></li>
                  <li v-if="groupOptions"><v-edit-select placeholderDes='请选择分组' name='所属分组' :value='deviceInfo.groupname' @valueChange='changeGroup' :selectOptions="groupOptions" ref="editSelect" class="edit-info clearfix" style="margin-top: -10px;"></v-edit-select></li>
                </ul>
              </div>
              <div class="info-second">
                <ul class="infoUl" style="margin-top: 10px;">
                  <li class="clearfix"><span>SD卡状态：</span><span>{{SDStatus}}</span></li>
                  <li class="clearfix"><span>硬件版本：</span><span>{{deviceInfo.HwVer || '无' }}</span></li>
                  <li class="clearfix"><span>设备序列号：</span><span>{{deviceInfo.Serial || '无' }}</span></li>
                  <li class="clearfix"><span>当前固件版本：</span><span>{{deviceInfo.currentfm ? (deviceInfo.currentfm.version ? deviceInfo.currentfm.version : '无') : '无' }}</span></li>
                  <li class="clearfix"><v-edit-input placeholderDes='请输入新的设备描述' name='设备描述' :value='deviceInfo.desc' @valueChange='changeDesc' ref="editDescInput" class="edit-info" style="margin-top: -10px;"></v-edit-input></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-content">
            <div class="mini-header">固件升级</div>
            <div class="info-third">
              <ul class="infoUl" v-if="deviceInfo.newfm && deviceInfo.newfm.isnew && permissionList.firmware.getFirmwareDesc && !firmwareUpdate">
                <li><div class="newFw_tips_left">检测到当前有新版固件，新版固件信息如下：</div></li>
                <li><span>新固件版本号：</span><i class="newFw_tips_right">{{deviceInfo.newfm.version}}</i></li>
                <li><div class="newFw_tips_left"><span>新固件版本说明：</span><i class="newFw_tips_right">{{updateContent}}</i></div></li>
                <li class="updateFM"><el-button type="primary" @click="updateFM" :disabled="!permissionList.device.sendCommandToDevice">通知设备升级固件</el-button></li>
              </ul>
              <ul class="infoUl" v-if="permissionList.firmware.getFirmwareDesc && (!deviceInfo.newfm || !deviceInfo.newfm.isnew)">
                <li style="font-size: 14px; color: #3e3a39">暂无新版本固件信息</li>
              </ul>
              <ul class="infoUl" v-if="!permissionList.firmware.getFirmwareDesc">
                <li style="font-size: 14px; color: #3e3a39">您暂无权限获取新固件信息</li>
              </ul>
              <ul class="infoUl" v-if="firmwareUpdate">
                <li><span style="width: 100%;text-align: left">升级命令发送成功! <br>请稍等5~10分钟，设备重启后刷新该页面！</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="data module-common">
        <div class="mini-header">位置信息</div>
        <div class="card-box clearfix" :style="{minHeight: (height - 396) + 'px' }">
          <!-- <v-details-map :deviceInfo="deviceInfo" @gps="updateGPS"></v-details-map> -->
        </div>
      </div>
      <ZLoginArea @toControl = "toControl"></ZLoginArea>
    </div>
</template>

<script>
import VEditInput from '../Components/Common/EditInput/ZEditInput'
import VEditSelect from '../Components/Common/EditSelect/ZEditSelect'
/* import { WebSocketUtitl } from '@/assets/js/common/utils.js'
import {DeviceList} from '@/assets/js/device/deviceList.js'
import validate from 'COMMON/validate/validate.js'
import {SDStatFunc} from 'COMMON/util/device.js'
import ZlgCloudHelper from 'API/ZlgCloudHelper.js'
import VEditInput from '~/EditInput/ZEditInput'
import VEditSelect from '~/EditSelect/ZEditSelect'
import {mapGetters, mapMutations, mapState} from 'vuex'
import {UpdateData} from '@/assets/js/data/moduleRelation/upDateData.js'
import work from 'webworkify-webpack'
import {DeviceData} from '@/assets/js/data/dataDevice.js'
// import VDetailsMap from './DeviceDetailsMap.vue' 
import {Devtype} from '@/assets/js/device/devtype.js'
import {formatDevStatus} from 'COMMON/util/device.js' */

import ZlgCloudHelper from '../../../../../sdk/js/api/http/httpModules/ZLGDevice'
import {UpdateData} from '../js/data/moduleRelation/upDateData.js'
import {DeviceList} from '../js/data/device/deviceList.js'

import work from 'webworkify-webpack'
import {DeviceData} from '../js/data/dataDevice.js'
import {SDStatFunc, formatDevStatus} from '../js/data/util/device.js'
//import {mockData, mockData2, getDefaultPermission} from '../MockDataForTest.js'
import ZLoginArea from '../../CommonArea/ZLoginArea.vue'
export default {
  name: 'DeviceInfo',
  props: {
    config: {
      type: Object,
      default: () => {
       return  {
        show: {
          deviceName: true,
          
          deviceKey: true,
          desc: true,
          devId: true,
          devType: true
        }
       }
      }
    }
  },
  components: {
    VEditInput,
    VEditSelect/* ,
    VDetailsMap */,
    ZLoginArea
  },
  data () {
    return {
      permissionList: {
        "project": { "createProject": true, "projectBatchDEL": true, "editProject": true, "getProjectList": true },
        "deviceGroup": { "deleteDeviceGroup": true, "createDeviceGroup": true, "getDeviceGroupList": true, "editDeviceGroup": true, "addDeviceToGroup": true, "deleteDeviceGroupImage": true, "uploadDeviceGroupImage": true, "removeDeviceGroupMember": true },
        "deviceType": { "getListDevType": true, "createDevType": true, "deleteDevType": true, "updateDevTypeInfo": true, "updateDevTypeData": true, "updateDevTypeStatus": true, "updateDevTypeCommands": true, "updateDevTypeWarnings": true, "updateDevTypeLogs": true, "updateDevTypeInitParam": true },
        "data": { "getDeviceData": true, "deleteDeviceData": true, "clearDeviceData": true, "createProjectData": true, "projectDataBatchDEL": true, "updateProjectDataInfo": true, "getProjectListDatas": true, "loginWebmqtt": true }, 
        "device": { "getDeviceInfo": true, "listDevices": true, "UpdateDeviceInfo": true, "sendCommandToDevice": true, "batchUpdateDevicesScrete": true, "updateDeviceSecret": true, "getDeviceSecret": true, "createDevice": true, "deviceBatchDEL": true, "deleteDevice": true, "devicesMessage": true }, "firmware": { "deleteFirmware": true, "listFirmware": true, "notifyFirmware": true, "uploadFirmware": true, "getFirmwareDesc": true }, "deviceEvent": { "listEvents": true }, "user": { "getUserInfo": true, "accessibleMenuModule": true }, "rule": { "listRules": true, "createRule": true, "updateRule": true, "deleteRule": true, "setStatus": true, "listRecords": true, "deleteRecords": true }, "multicast": { "createMulticast": true, "listMulticasts": true, "getMulticast": true, "removeMulticast": true, "MulticastAddDevices": true, "MulticastRemoveDevices": true, "MulticastSendCommand": true, "UpdateMulticast": true }
      }, // getDefaultPermission(),
      devstatus: [this.$t(`Device.status.onlineNormal`), this.$t(`Device.status.offline2`), this.$t(`Device.status.onlineAbnormal`)],
      deviceData: new DeviceData(),
      deviceList: new DeviceList(),
      groupOptions: [],
      loading: false,
      dataPointTable: [],
      deviceInfo: {tmp:'--'},
      devtype: this.$route.query.devtype,
      devid: this.$route.query.devid,
      SDStat: '',
      SDStatus: '',
      updateContent: '',
      updateData: new UpdateData(),
      moduleWorker: null,
      devnameLength: 0,
      status: 0,
      GPSFlag: true,
      allDevice: [],
      allDevtype: [],
      firmwareUpdate: false,
      height: 500
    }
  },
  computed: {
    /* ...mapGetters(['allDevice', 'height', 'allDeviceGroup', 'allProject', 'allDashboard', 'allDevtype', 'firmwareUpdate']),
    ...mapState({
      permissionList: state => state.PermissionListModule.permissionList
    }) */
  },
  created () {
    this.moduleWorker = work(require.resolve('../js/data/worker/dataRelation.js'))
    this.devtype = this.$route.query.devtype
    this.devid = this.$route.query.devid
    this.init()
  },
  mounted () {
    this.firmwareUpdate = () => {
      return !false
    }
    /* WebSocketUtitl.addDataListener({devices: [{devtype: this.$route.query.devtype, devid: this.$route.query.devid}], event: 'online'})
    WebSocketUtitl.addDataListener({devices: [{devtype: this.$route.query.devtype, devid: this.$route.query.devid}], event: 'offline'})
    WebSocketUtitl.registListener(this.socket) */
  },
  methods: {
    
    toControl (data) {

      if (data.name === "setSchema") {
        this.schema = data.value
      } else if (data.name === "setAllDeviceType") {
        this.allDevtype = data.value
      } else if (data.name === "setAllDevice") {
        this.allDevice = data.value
      }// allDevice
    },
    mock () {
       
      /* debugger */
      /* mockData2.call(this)
      mockData.call(this) */
    },
    handleMessage(data) {
      if (data.name === "DeviceSelected") {
        data = data.value.data
        this.devtype = data.devtype
        this.devid = data.devid
        this.init()
      }
      /* if (res.deviceId == this.$route.query.devid && res.deviceType == this.$route.query.devtype) {
        switch (res.type) {
          case 'online':
            this.status = formatDevStatus(0, this.deviceInfo.fault)
            break
          case 'offline':
            this.status = formatDevStatus(1, this.deviceInfo.fault)
            break
        }
      } */
    },
    /* ...mapMutations(['SET_ALLDEVICE', 'SET_ALLDEVICEGROUP', 'SET_FIRWAREUPDATE']), */
    socket (res) {
      if (res.deviceId == this.$route.query.devid && res.deviceType == this.$route.query.devtype) {
        switch (res.type) {
          case 'online':
            this.status = formatDevStatus(0, this.deviceInfo.fault)
            break
          case 'offline':
            this.status = formatDevStatus(1, this.deviceInfo.fault)
            break
        }
      }
    },
    init () {
      debugger
      this.getDeviceInfo()
      /* this.groupOptions = this.deviceList.getGroupList(this.allDeviceGroup)
      this.groupOptions.unshift({label: '', value: ''})
      this.permissionList.device.getDeviceInfo && this.getDeviceInfo() */
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
    addDeviceToGroup (value) {
      if (value != '') {
        this.loading = true
        ZlgCloudHelper.addDeviceToPlant({groupid: value, info: {devid: this.devid, devtype: this.devtype}}).then(info => {
          this.deviceInfo.groupname = info.data.groupname
          this.deviceInfo.devgroup = info.data.groupid
          this.$refs.editSelect.editStatus = false
          this.updatedDeviceInfo([this.deviceInfo])
          this.loading = false
          this.$message.success('修改设备分组成功！')
        }).catch((err) => {
          this.loading = false
          if (err.response.status) {
            this.$message.error('修改设备分组失败！')
          }
        })
      } else {
        this.deviceInfo.devgroup = ''
        this.updatedDeviceInfo([this.deviceInfo])
      }
    },
    changeGroup (value) {
      if (!this.permissionList.deviceGroup.removeDeviceGroupMember || !this.permissionList.deviceGroup.addDeviceToGroup) {
        this.$message.error(this.$t('Device.validate.DeviceGroup'))
        return false
      }
      if (value == '') {
        this.deviceInfo.groupname = value
      }
      this.loading = true
      let groupNum = this.groupOptions.filter(v => v.value == value).length
      if (!groupNum) {
        value = this.groupOptions.filter(v => v.label == value)[0].value
      }
      if (this.deviceInfo.devgroup) {
        ZlgCloudHelper.deleteDeviceFromPlant({groupid: this.deviceInfo.devgroup, devid: this.devid, devtype: this.devtype}).then(res => {
          this.loading = false
          this.addDeviceToGroup(value)
          this.$refs.editSelect.editStatus = false
        }).catch((err) => {
          this.loading = false
          if (err.response.status == 400) {
            this.$refs.editSelect.editStatus = false
            this.addDeviceToGroup(value)
          }
        })
      } else {
        this.loading = false
        this.$refs.editSelect.editStatus = false
        value && this.addDeviceToGroup(value)
      }
    },
    updateGPS (val) {
      let show_frontend = true
      let schemaInfo = this.allDevtype && this.allDevtype.find(v => v.devtype === this.$route.query.devtype)
      let schema = null
      if (schemaInfo) {
        schema = this.allDevtype.filter(v => v.devtype == this.deviceInfo.devtype)[0].schema
        if (schema.status.gps && schema.status.gps.properties.latitude && schema.status.gps.properties.longitude) {
          show_frontend = schema.memo.gps.show_frontend
        }
      } else {
        show_frontend = true
      }
      this.updateDeviceInfo(val, show_frontend)
    },
    updateDeviceInfo (val, show_frontend) {
      debugger
      let keys = Object.keys(val)[0]
      let schema = this.allDevtype.filter(v => v.devtype == this.deviceInfo.devtype)[0]
      if (show_frontend) {
        if (!this.permissionList.device.UpdateDeviceInfo) {
          this.$message.error(this.$t('Device.validate.updateInfo'))
          return
        }
        ZlgCloudHelper.updateDeviceInfo({devid: this.deviceInfo.devid, devtype: this.deviceInfo.devtype, info: val}).then(res => {
          this.$message.success('设备信息更新成功！')
          this.$refs.editNameInput.editStatus = false
          this.$refs.editDescInput.editStatus = false
          // 这里需要更新vuex里面的设备信息
          this.updatedDeviceInfo([res.data])
        }).catch((err) => {
          if (err.response) {
            this.$message.error('设备信息更新失败！')
          }
        })
      } else {
        if (!this.permissionList.device.sendCommandToDevice) {
          this.$message.error('您没有发送设备命令的权限')
          return
        }
        let cmdtype = schema.schema.commands['set_config'].cmdtype ? 'confirmed' : 'unconfirmed'
        ZlgCloudHelper.sendCommandToDevice({devtype: this.deviceInfo.devtype, devid: this.deviceInfo.devid, cmd: 'set_config', args: JSON.stringify(val), cmdtype: cmdtype}).then(res => {
          this.errorCheck(res.data.result - 0, val)
        }).catch((error) => {
          if (error.response && error.response.status == 400) {
            this.$message.error('设备信息更新失败！')
          }
        })
      }
    },
    errorCheck (result, val) {
      if (!result) {
        this.$message.error('设备信息保存失败！')
        return false
      } else {
        // 这里需要更新vuex里面的设备信息
        Object.assign(this.deviceInfo, val)
        this.updatedDeviceInfo([this.deviceInfo])
        this.$refs.editNameInput.editStatus = false
        this.$refs.editDescInput.editStatus = false
        this.$message.success('设备信息保存成功！')
        return true
      }
    },
    changeValue (val) {
      if (val == '') {
        this.$message.error(this.$t(`Device.validate.devnameEmpty`))
        return
      }
      let schemaInfo = this.allDevtype && this.allDevtype.find(v => v.devtype === this.$route.query.devtype)
      let schema = null
      if (schemaInfo) {
        schema = schemaInfo.schemaInfo
        this.devnameLength = schema && schema.memo && schema.memo.devname && schema.memo.devname.maxLength
      } else {
        this.devnameLength = 32
      }
      if (val.length > this.devnameLength) {
        this.$message.error(`设备名称长度不能超过${this.devnameLength}个字符`)
        return
      }
      if (!this.permissionList.device.UpdateDeviceInfo) {
        this.$message.error(this.$t('Device.validate.updateInfo'))
        return
      }
      let show_frontend = true
      if (schema && schema.status.devname) {
        show_frontend = schema.memo.devname.show_frontend
      }
      this.updateDeviceInfo({devname: val}, show_frontend)
    },
    changeDesc (val) {
      if (val && val.length > 1024) {
        this.$message.error(this.$t(`Device.validate.descError`))
        return false
      }
      if (!this.permissionList.device.UpdateDeviceInfo) {
        this.$message.error(this.$t('Device.validate.updateInfo'))
        return false
      }
      this.updateDeviceInfo({desc: val}, true)
    },
    getDeviceInfo () {
      debugger
      Object.keys(this.allDevice).forEach(item => {
        // this.$message.error('Device.validate.updateInfo---')
        debugger

        if (item == this.devtype) {
          this.deviceInfo = this.allDevice[item].filter(v => v.devid == this.devid)[0]
          this.status = formatDevStatus(this.deviceInfo.status, this.deviceInfo.fault)
          this.SDStatus = SDStatFunc(this.deviceInfo.SDStat)
          this.groupOptions.forEach((item) => {
            if (item.value === this.deviceInfo.devgroup) {
              this.deviceInfo.groupname = item.label
            }
          })
          if (this.deviceInfo.newfm && this.deviceInfo.newfm.isnew && this.permissionList.firmware.getFirmwareDesc) {
            this.gainFirmwareInfo(this.deviceInfo.newfm.version)
          }
        }
      })
    },
    gainFirmwareInfo (version) {
      this.loading = true
      this.permissionList.firmware.getFirmwareDesc && ZlgCloudHelper.firmwareDesc({devtype: this.devtype, version: version, devid: this.devid}).then(res => {
        this.updateContent = res.desc
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    updateFM () {
      this.loading = true
      this.$message.success('升级命令正在发送，请稍候...')
      let args = {}
      args.devtype = this.$route.query.devtype
      args.version = this.deviceInfo.newfm.version
      args.url = this.deviceInfo.newfm.url
      let cmdtype = this.allDevtype.find(v => v.devtype === this.$route.query.devtype).schema.commands['exec_upgrade'].cmdtype ? 'confirmed' : 'unconfirmed'
      ZlgCloudHelper.sendCommandToDevice({
        devid: this.devid,
        devtype: this.devtype,
        cmd: 'exec_upgrade',
        args: args,
        cmdtype: cmdtype
      }).then(res => {
        this.$message.success('升级命令发送成功，请稍等5~10分钟，设备重启后刷新该页面！')
        this.SET_FIRWAREUPDATE(true)
        this.loading = false
      }).catch(() => {
        this.SET_FIRWAREUPDATE(false)
        this.$message.error('升级命令发送失败！')
        this.loading = false
      })
    }
  },
  watch: {
    'allDeviceGroup': {
      handler (newVal) {
        this.init()
      },
      deep: true
    },
    'deviceInfo': {
      handler (newVal) {
        this.$emit('devname', newVal.devname)
      },
      deep: true
    },
    'allDevice': {
      handler: function (newVal) {
        this.permissionList.device.getDeviceInfo && this.getDeviceInfo()
      },
      deep: true
    }
  },
  destroyed () {
    this.loading = false
  }
}
</script>

<style lang="less" scoped>
.device-info {
  box-sizing: border-box;
  .edit-info {
    /deep/ .list {
      line-height: 30px!important;
    }
    /deep/ .listValue {
       line-height: 30px!important;
       white-space: nowrap!important;
    }
    /deep/ .confirmEdit {
      line-height: 30px!important;
    }
    /deep/ .cancel {
      line-height: 30px!important;
    }
    /deep/ .edit{
      height: 30px!important;
    }
  }
  .info {
    width: 100%;
    display: flex;
    margin-bottom: 6px;
    .infoUl{
      padding: 12px 0px 20px 0px;
      color: #000;
      font-size: 14px;
      box-sizing: border-box;
      &:nth-child(1) {
        padding-top: 0px;
      }
      li {
        line-height: 28px;
        width: 100%;
        font-size: 14px;
        .newFw_tips_left {
          width: 100%;
          color: #6c6e72;
          float: left;
        }
        .newFw_tips_right {
          color: #3e3a39;
          width: 100%;
        }
        span {
          line-height: 30px;
          float: left;
          &:nth-child(1) {
            color: #6c6e72;
            width: 140px;
            text-align: right;
          }
          &:nth-child(2) {
            color: #3e3a39;
            font-size: 14px;
            max-width: 230px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .left {
      float: left;
      width: 60%;
      min-width: 860px;
      border: 1px solid #DEE4EF;
      .info-content {
        min-height: 206px;
        width: 100%;
        background-color: #FFF;
        padding: 12px 14px;
        box-sizing: border-box;
        min-width: 830px;
        .info-first {
          min-width: 378px;
          width: 50%;
          height: 100%;
          float: left;
          box-sizing: border-box;
          background-color: #f5f7fa;
        }
        .info-second {
          width: 50%;
          height: 100%;
          float: left;
          box-sizing: border-box;
          background-color: #f5f7fa;
        }
      }
      /deep/ .editLogo {
        margin-top: 8px!important;
      }
    }
    .right {
      flex: 1;
      float: left;
      padding-left: 6px;
      box-sizing: border-box;
      border: 1px solid #DEE4EF;
      .right-content {
        width: 100%;
        height: 238px;
        box-sizing: border-box;
        background-color: #fff;
        overflow: hidden;
        .info-third{
          width: 100%;
          float: left;
          overflow-y: auto;
          color: #3e3a39;
          padding: 6px 14px;
          box-sizing: border-box;
          overflow: auto;
          height: 186px;
          .updateFM {
            margin-top: 10px;
          }
          li {
            &:nth-child(3) {
              display: inline-block;
              width: 100%;
              span {
                &:nth-child(2) {
                  display: inline-block;
                }
              }
            }
          }
        }
      }
    }
  }
  .data {
    margin-bottom: 8px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #DEE4EF;
    .card-box {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
}
</style>
