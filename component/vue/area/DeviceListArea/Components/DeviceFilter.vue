<template>
    <div class="device-filter clearfix"><!-- config:{{config}} -->
      <div class="fl" style="border: 0px solid #f0f;">
          <el-button v-show="config.show && config.show.addDevice" type="primary" @click="addDevice" :disabled="!permissionList.device.createDevice" class="el-icon-plus" v-if="showFlag">&nbsp;&nbsp;添加{{name}}</el-button>
          <el-button v-show="config.show && config.show.batchDeleteDevice" type="danger" @click="batchDeleteDevice" plain :disabled="!permissionList.device.deviceBatchDEL" style="margin-left: 6px;" class="secondBtn">批量删除</el-button>
          <el-button v-show="config.show && config.show.batchUpdateDeviceSecret" type="primary" plain @click="showSecretInput" style="margin-left: 6px;" :disabled="!permissionList.device.batchUpdateDevicesScrete">更新设备密钥</el-button>
      </div>
      <div class="fr" style="border:0px solid #00f;">
        <v-search-device :devtypesOptions="devtypesOptions" @search="searchDevice" :showFlag="showFlag" :selected-devtype="selectedDevtype"></v-search-device>
      </div>
      <v-devscret ref="devscret" @secret="updateSecret"></v-devscret>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import VSearchDevice from './SearchDevice.vue'
import VDevscret from './Devscret.vue'
export default {
  name: 'deviceFilter',
  props: {
    config: {
      type: Object,
      required: !true,
      default:  () => {
       return  {
      
        show: {
          addDevice: true,
          batchDeleteDevice: true,
          batchUpdateDeviceSecret: true
        }
      } 
      } 
    }, //addDevice
    devtypesOptions: {
      type: Array,
      required: !true,
      default:  () => {
       return []
      }
    },
    name: {
      type: String,
      required: !true,
      default: ""
    },
    showFlag: {
      type: Boolean,
      default: true,
    },
    selectedDevtype: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // permissionList: ''
      permissionList : {
        "project": { "createProject": true, "projectBatchDEL": true, "editProject": true, "getProjectList": true }, "deviceGroup": { "deleteDeviceGroup": true, "createDeviceGroup": true, "getDeviceGroupList": true, "editDeviceGroup": true, "addDeviceToGroup": true, "deleteDeviceGroupImage": true, "uploadDeviceGroupImage": true, "removeDeviceGroupMember": true }, "deviceType": { "getListDevType": true, "createDevType": true, "deleteDevType": true, "updateDevTypeInfo": true, "updateDevTypeData": true, "updateDevTypeStatus": true, "updateDevTypeCommands": true, "updateDevTypeWarnings": true, "updateDevTypeLogs": true, "updateDevTypeInitParam": true }, "data": { "getDeviceData": true, "deleteDeviceData": true, "clearDeviceData": true, "createProjectData": true, "projectDataBatchDEL": true, "updateProjectDataInfo": true, "getProjectListDatas": true, "loginWebmqtt": true }, "device": { "getDeviceInfo": true, "listDevices": true, "UpdateDeviceInfo": true, "sendCommandToDevice": true, "batchUpdateDevicesScrete": true, "updateDeviceSecret": true, "getDeviceSecret": true, "createDevice": true, "deviceBatchDEL": true, "deleteDevice": true, "devicesMessage": true }, "firmware": { "deleteFirmware": true, "listFirmware": true, "notifyFirmware": true, "uploadFirmware": true, "getFirmwareDesc": true }, "deviceEvent": { "listEvents": true }, "user": { "getUserInfo": true, "accessibleMenuModule": true }, "rule": { "listRules": true, "createRule": true, "updateRule": true, "deleteRule": true, "setStatus": true, "listRecords": true, "deleteRecords": true }, "multicast": { "createMulticast": true, "listMulticasts": true, "getMulticast": true, "removeMulticast": true, "MulticastAddDevices": true, "MulticastRemoveDevices": true, "MulticastSendCommand": true, "UpdateMulticast": true }
      }
    }
  },
  components: {
    VSearchDevice,
    VDevscret
  },
  computed: {
    /* ...mapState({
      permissionList: state => state.PermissionListModule.permissionList
    }) */
  },
  mounted () {
    this.devtype && this.searchDevice()
  },
  methods: {
    updateSecret (val) {
      this.$emit('updateSecret', val)
      this.$refs.devscret.dialogVisible = false
    },
    showSecretInput () {
      this.$refs.devscret.dialogVisible = true
    },
    searchDevice (filter) {
      this.$emit('search', filter)
    },
    addDevice () {
      // this.$emit('toControl', filter)
      this.$emit("toControl", {name: "toAddDevice", value: {data: {}}})
      /* this.$router.push('/Home/Device/Add') */
    },
    batchDeleteDevice () {
      this.$emit('batchDeleteDevice', 'ok')
    }
  }
}
</script>
<style lang="less" scoped>
.device-filter {
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .label {
    font-size: 14px;
    color: #6c6e72;
    margin-right: 4px;
  }
  .group {
    float: left;
  }
  .type {
    float: left;
    margin-left: 10px;
  }
  .search-box {
    float: left;
    width: 360px;
    margin-left: 20px;
  }
}
</style>
