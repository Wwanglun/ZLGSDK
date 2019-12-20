<template>
    <div class="search-device clearfix">
        <div class="type">
          <label class="label">类型</label>
          <!-- <el-select v-model="devtype" placeholder="请选择设备类型" style="width: 170px;height: 34px;" filterable @change="selectChange" size="medium">
            <el-option v-for="item in devtypesOptions" :key="item.value" :label="item.devtype" :value="item.devtype" :title="item.devtype">
            </el-option>
          </el-select> -->
        </div>
        <div class="type" v-if="1 || showFlag" style="border: 0px solid #0ff;">
          <!-- <v-search :disabled="!permissionList.device.listDevices" :placeholder="defaultTips" @search="searchDevice"></v-search> -->
          <v-search :disabled="false" :placeholder="defaultTips" @search="searchDevice"></v-search> 
        </div>
    </div>
</template>
<script>
import {transferenceStr} from '../js/data/util/utils.js'
import VSearch from './Common/Search.vue'
import {mapState} from 'vuex'
export default {
  name: 'searchDevice',
  props: {
    devtypesOptions: {
      type: Array,
      required: !true,
      default: []
    },
    showFlag: {
      type: Boolean,
      default: true
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
        "project": { "createProject": true, "projectBatchDEL": true, "editProject": true, "getProjectList": true },
         "deviceGroup": { "deleteDeviceGroup": true, "createDeviceGroup": true, "getDeviceGroupList": true, "editDeviceGroup": true, "addDeviceToGroup": true, "deleteDeviceGroupImage": true, "uploadDeviceGroupImage": true, "removeDeviceGroupMember": true },
          "deviceType": { "getListDevType": true, "createDevType": true, "deleteDevType": true, "updateDevTypeInfo": true, "updateDevTypeData": true, "updateDevTypeStatus": true, "updateDevTypeCommands": true, "updateDevTypeWarnings": true, "updateDevTypeLogs": true, "updateDevTypeInitParam": true },
           "data": { "getDeviceData": true, "deleteDeviceData": true, "clearDeviceData": true, "createProjectData": true, "projectDataBatchDEL": true, "updateProjectDataInfo": true, "getProjectListDatas": true, "loginWebmqtt": true }, 
           "device": { "getDeviceInfo": true, "listDevices": true, "UpdateDeviceInfo": true, "sendCommandToDevice": true, "batchUpdateDevicesScrete": true, "updateDeviceSecret": true, "getDeviceSecret": true, "createDevice": true, "deviceBatchDEL": true, "deleteDevice": true, "devicesMessage": true }, "firmware": { "deleteFirmware": true, "listFirmware": true, "notifyFirmware": true, "uploadFirmware": true, "getFirmwareDesc": true }, "deviceEvent": { "listEvents": true }, "user": { "getUserInfo": true, "accessibleMenuModule": true }, "rule": { "listRules": true, "createRule": true, "updateRule": true, "deleteRule": true, "setStatus": true, "listRecords": true, "deleteRecords": true }, "multicast": { "createMulticast": true, "listMulticasts": true, "getMulticast": true, "removeMulticast": true, "MulticastAddDevices": true, "MulticastRemoveDevices": true, "MulticastSendCommand": true, "UpdateMulticast": true }
      }
    }
  },
  components: {
    VSearch
  },
  computed: {
    /* ...mapState({
      permissionList: state => state.PermissionListModule.permissionList
    }) */
  },
  data () {
    return {
      devtype: this.selectedDevtype == '' ? ((this.devtypesOptions && this.devtypesOptions.length) ? this.devtypesOptions[0].devtype : '') : this.selectedDevtype,
      searchValue: '',
      defaultTips: '请输入设备名称或者设备ID'
    }
  },
  methods: {
    searchDevice (val) {
      this.searchValue = val == undefined ? '' : val
      let filter = {}
      filter.devtype = this.devtype
      filter.$or = [
        {devid: {$regex: transferenceStr(this.searchValue), $options: 'i'}},
        {devname: {$regex: transferenceStr(this.searchValue), $options: 'i'}}
      ]
      this.$emit('search', filter)
    },
    selectChange (val) {
      this.devtype = val
      this.searchDevice()
    }
  },
  watch: {
    devtypesOptions (newVal) {
      this.devtype = (this.selectedDevtype == '' ? ((this.devtypesOptions && this.devtypesOptions.length) ? this.devtypesOptions[0].devtype : '') : this.selectedDevtype)
    },
    selectedDevtype (newVal) {
      this.devtype = (this.selectedDevtype == '' ? ((this.devtypesOptions && this.devtypesOptions.length) ? this.devtypesOptions[0].devtype : '') : this.selectedDevtype)
    }
  }
}
</script>
<style lang="less" scoped>
.search-device {
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
    margin-left: 4px;
  }
  .search-box {
    float: left;
    width: 360px;
    margin-left: 20px;
  }
}
</style>
