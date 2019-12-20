<template>
  <div class="device-table" style="border: 0px solid #000;">
    <div class="table-box"><!--  -->
      <el-table ref="multipleTable" :data="deviceListData" tooltip-effect="dark" :style="{'max-height': height + 'px', width: '100%'}" @selection-change="selectChange" :height="tableHeight">
        <el-table-column fixed type="index" :index="indexMethod" width="60" header-align="center" align="center" label="序号">
        </el-table-column>
        <el-table-column fixed type="selection" width="45" header-align="center" align="center" v-if="showRow.selection">
        </el-table-column><!--  -->
        <el-table-column fixed label="状态" width="50" header-align="center" align="center" v-if="1 || showRow.status">
          <template slot-scope="scope">
            <i :class="devStatus[scope.row.status]" style="margin-top: 6px;"></i>
          </template>
        </el-table-column>
        <el-table-column prop="" label="名称" width="" header-align="center" align="center" v-if="showRow.devname">
          <template slot-scope="scope">
            <div :title="scope.row.devname" class="text-overflow">{{scope.row.devname}}</div>
          </template>
        </el-table-column>
        <el-table-column width="" prop="" label="设备ID" header-align="center" align="center">
          <template slot-scope="scope">
            <div :title="scope.row.devid" class="text-overflow">{{scope.row.devid}}</div>
          </template>
        </el-table-column><!--  --><!--  -->
        <el-table-column prop="" width="" label="设备类型" header-align="center" align="center">
           <template slot-scope="scope">
            <div :title="scope.row.devtype" class="text-overflow">{{scope.row.devtype}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="newFM" width="80" label="新固件" header-align="center" align="center" v-if="showRow.newFM">
        </el-table-column>
        <el-table-column prop="" width="" label="设备密钥" header-align="center" align="center" v-if="showRow.secret">
          <template slot-scope="scope">
            <el-tooltip effect="light" placement="top" v-if="scope.row.devsecret != '--'">
              <div slot="content">{{scope.row.devsecret}}</div>
              <div style="position: relative"><div class="text-overflow" style="width: 86%;" :id="`${scope.row.devtype}${scope.row.devid}`">{{scope.row.devsecret}}</div><i class="copy" @click="copy(scope.row)">复制</i></div>
            </el-tooltip>
            <div class="text-overflow" v-if="scope.row.devsecret == '--'">{{scope.row.devsecret}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="offlinetime" label="离线时间" width="200" header-align="center" align="center" v-if="showRow.offlinetime">
        </el-table-column>
        <el-table-column prop="onlinetime" label="上线时间" width="200" header-align="center" align="center" v-if="showRow.onlinetime">
        </el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="140" show-overflow-tooltip align="center" v-if="showRow.operation">
          <template slot-scope="scope">
            <el-row class="operation-row">
              <el-button icon="el-icon-view edit" size="mini" type="primary" @click="toDeviceSetting(scope.row)" :disabled="!permissionList.device.getDeviceInfo"></el-button>
              <el-button icon="icon-device_secret iconfont" size="mini" type="primary" style="margin-left: 0px;" @click="updateSecret(scope.row)" :disabled="!permissionList.device.updateDeviceSecret" class="btn-notlast secret"></el-button>
              <el-button size="mini" type="danger" style="margin-left: 0px;"  icon="el-icon-delete delete" @click="deleteDevice(scope.row)" :disabled="!permissionList.device.deleteDevice" class="btn-notlast"></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list-pageination" v-if="pagination">
      <slot></slot>
      <el-pagination @size-change="changeSize" @current-change="changePage" :current-page="currentPage" :page-sizes="[10, 20, 50, 100, 200, 500]" :page-size="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <textarea id="input" style="width: 0;height: 0"></textarea>
    <v-devscret ref="devscret" @secret="getSecret"></v-devscret>
  </div>
</template>
<script>
import VDevscret from './Devscret.vue'
import {getIsAccessDev} from '../js/data/utils.js'
/* iimport {mapState, mapGetters, mapMutations} from 'vuex'
import ZlgCloudHelper from 'API/ZlgCloudHelper.js'
mport { DeviceList } from '@/assets/js/device/deviceList.js'
import {filterAllSelectedDevice} from '@/assets/js/project/project.js' */
import ZlgCloudHelper from '../../../../../sdk/js/api/http/httpModules/ZLGDevice'
import ZLGAssistant from '../../../../../sdk/js/api/http/httpModules/ZLGAssistant'
import { DeviceList } from  '../js/data/device/deviceList.js'// '../../../../../sdk/js/logic/deviceModules/ZWSDeviceLogic.js'
import {filterAllSelectedDevice} from '../js/data/project/project.js'

import {getUserInfo} from '../js/index.js'
export default {
  name: 'deviceTable',
  props: {
    filter: {
      type: Object,
      required: !true,
       default: () => {
         return {}
       }
    },
    height: {
      type: Number,
      default: 1000
    },
    showRowList: {
      type: Object
    },
    multiple: {
      type: String
    }
  },
  components: {
    VDevscret
  },
  computed: {
    /* ...mapState({
      permissionList: state => state.PermissionListModule.permissionList,
      userInfo: state => state.PermissionListModule.userInfo
    }),
    ...mapGetters(['allDevice', 'deviceUpdate']), */
    tableHeight () {
      let height = this.deviceListData.length * 40 + 42
      height = this.deviceListData.length === 0 ? 120 : height
      return height < this.height ? height : this.height
    }
  },
  data () {
    return {
      row: {},
      devStatus: ['device-normal', 'device-offline', 'device-abnormal'],
      pagination: true,
      loading: false,
      showRow: {status: true, devname: true, newFM: true, onlinetime: true, offlinetime: true, operation: true, selection: true, secret: true},
      deviceListData: [],
      multipleSelection: [],
      pageSizes: 10,
      currentPage: 1,
      deviceList: new DeviceList(),
      total: 0,
      currentPageList: [],
      allSelectedDevice: this.multiple ? JSON.parse(this.multiple) : '',
      getter: {},
      responseTableSelect: true,
      permissionList : {
        "project": { "createProject": true, "projectBatchDEL": true, "editProject": true, "getProjectList": true },
        "deviceGroup": { "deleteDeviceGroup": true, "createDeviceGroup": true, "getDeviceGroupList": true, "editDeviceGroup": true, "addDeviceToGroup": true, "deleteDeviceGroupImage": true, "uploadDeviceGroupImage": true, "removeDeviceGroupMember": true },
        "deviceType": { "getListDevType": true, "createDevType": true, "deleteDevType": true, "updateDevTypeInfo": true, "updateDevTypeData": true, "updateDevTypeStatus": true, "updateDevTypeCommands": true, "updateDevTypeWarnings": true, "updateDevTypeLogs": true, "updateDevTypeInitParam": true },
        "data": { "getDeviceData": true, "deleteDeviceData": true, "clearDeviceData": true, "createProjectData": true, "projectDataBatchDEL": true, "updateProjectDataInfo": true, "getProjectListDatas": true, "loginWebmqtt": true }, 
        "device": { "getDeviceInfo": true, "listDevices": true, "UpdateDeviceInfo": true, "sendCommandToDevice": true, "batchUpdateDevicesScrete": true, "updateDeviceSecret": true, "getDeviceSecret": true, "createDevice": true, "deviceBatchDEL": true, "deleteDevice": true, "devicesMessage": true }, "firmware": { "deleteFirmware": true, "listFirmware": true, "notifyFirmware": true, "uploadFirmware": true, "getFirmwareDesc": true }, "deviceEvent": { "listEvents": true }, "user": { "getUserInfo": true, "accessibleMenuModule": true }, "rule": { "listRules": true, "createRule": true, "updateRule": true, "deleteRule": true, "setStatus": true, "listRecords": true, "deleteRecords": true }, "multicast": { "createMulticast": true, "listMulticasts": true, "getMulticast": true, "removeMulticast": true, "MulticastAddDevices": true, "MulticastRemoveDevices": true, "MulticastSendCommand": true, "UpdateMulticast": true }
      }
    }
  },
  created () {
    if (this.multiple) {
      sessionStorage.setItem('multiple', this.multiple)
    }
  },
  mounted () {
    debugger
    this.userInfo = getUserInfo({})
  },
  methods: {
    /* ...mapMutations(['SET_ALLDEVICE']), */
    getSecret (secret) {
      this.$emit('updateSecret', {device: this.row, secret: secret})
      this.$refs.devscret.dialogVisible = false
    },
    updateSecret (row) {
      if (getIsAccessDev(this.userInfo, [{devtype: row.devtype, devid: row.devid}]) && this.permissionList.device.updateDeviceSecret) {
        this.$refs.devscret.dialogVisible = true
        this.row = row
      } else {
        this.$message.error(`类型：${row.devtype},设备ID：${row.devid}没有权限`)
      }
    },
    copy (row) {
      var text = document.getElementById(`${row.devtype}${row.devid}`).innerText
      var input = document.getElementById("input")
      input.value = text
      input.select()
      document.execCommand("copy")
    },
    mutipleSelect (rows) {
      let _this = this
      this.responseTableSelect = false
      setTimeout(() => {
        if (rows) {
          rows.forEach(row => {
            let single = (this.deviceListData.filter(i => (i.devtype == row.devtype) && (i.devid == row.devid)))[0]
            _this.$refs.multipleTable.toggleRowSelection(single)
          })
        }
        _this.responseTableSelect = true
      }, 1)
    },
    selectAll (isSelectAll = true) {
      setTimeout(() => {
        this.deviceListData.forEach(deviceData => {
          this.$refs.multipleTable.toggleRowSelection(deviceData, isSelectAll)
        })
      }, 50)
    },
    getDeviceList (getter, deviceListData, allDevtype = null, flag) {
      debugger
      // 这个getter一定要拷贝，否则会影响DeviceList传入的filter对象。
      if (getter) {
        getter = {...getter}
      }
      if (getter) {
        this.getter = {...getter}
      } else {
        getter = {...this.getter}
      }
      let _this = this
      this.deviceListData = []
      this.pagination = true
      this.pageSizes = this.pageSizes ? this.pageSizes : 10
      // 渲染传入进来的设备，主要兼容子设备列表，没有分页
      if (deviceListData) {
        this.pagination = false
        setTimeout(() => {
          this.deviceListData = deviceListData
          this.total = deviceListData.length
        }, 1)
        return false
      }
      this.loading = true
      if (flag) {
        this.currentPage = 1
      }
      let queryOptions = {
        filter: getter || JSON.stringify(this.filter),
        skip: (this.currentPage - 1) * this.pageSizes,
        limit: this.pageSizes
      }
      if (getter.devtype === '全部') {
        delete getter.devtype
      }
      queryOptions.devtype = getter.devtype
      /* if (!this.permissionList.device.listDevices) {
        return false
      } */
      ZlgCloudHelper.getDevicesList(queryOptions).then(
        res => {
          debugger
        if (queryOptions.devtype) {
          this.currentPageList = res.data
        } else {
          let searchStr = getter['$or'] && getter['$or'][0]['devid']['$regex'].toLowerCase()
          if (searchStr) {
            res.data = res.data.filter(device => {
              return device.devid.toLowerCase().indexOf(searchStr) >= 0 || device.devname.toLowerCase().indexOf(searchStr) >= 0
            })
          }
          let { skip, limit } = queryOptions
          this.currentPageList = res.data.slice(skip, skip + limit)
          this.total = res.data.length
        }
        this.loading = false
        this.deviceListData = []
        if (this.currentPageList.length) {
          this.currentPageList.forEach(item => {
            _this.deviceListData.push(_this.deviceList.getDeviceTableRow(item))
          })
        }
        this.multiple && this.mutipleSelect(this.allSelectedDevice)
      }).then(count => {
        if (!queryOptions.devtype) {
          this.loading = false
          return
        }
        queryOptions.aggregation = 'count'
        ZlgCloudHelper.getDevicesList(queryOptions).then(res => {
          this.total = res.count
          this.loading = false
        // eslint-disable-next-line
        }).catch(() => this.loading = false)
      // eslint-disable-next-line
      }).catch(() => this.loading = false)
    },
    selectChange (val) {
      if (this.responseTableSelect) {
        this.multipleSelection = val
      }
    },
    indexMethod (index) {
      return (this.currentPage - 1) * this.pageSizes + 1 + index
    },
    changeSize (val) {
      this.pageSizes = val
      this.currentPage = 1
      this.getter && this.getDeviceList()
    },
    changePage (val) {
      this.currentPage = val
      this.getter && this.getDeviceList()
    },
    toDeviceSetting (row) {
      if (getIsAccessDev(this.userInfo, [{devtype: row.devtype, devid: row.devid}]) && this.permissionList.device.getDeviceInfo) {
        /* this.$router.push(
          `/Home/Device/List/Details?devid=${row.devid}&devtype=${row.devtype}`
        ) */
        
        // this.$emit("DeviceSelected", {data: row})
        this.$emit("toControl", {name: "DeviceSelected", value: {data: row}})
      } else {
        this.$message.error(`类型：${row.devtype},设备ID：${row.devid}没有权限`)
      }
    },
    deleteDevice (row) {
      if (getIsAccessDev(this.userInfo, [{devtype: row.devtype, devid: row.devid}]) && this.permissionList.device.deleteDevice) {
        this.$emit('deleteDevice', row)
      } else {
        this.$message.error(`类型：${row.devtype},设备ID：${row.devid}没有权限`)
      }
    }
  },
  watch: {
    multipleSelection (newVal) {
      if (this.multiple) {
        let newArray = []
        this.allSelectedDevice = filterAllSelectedDevice(this.deviceListData, newVal, sessionStorage.getItem('multiple') ? JSON.parse(sessionStorage.getItem('multiple')) : [])
        this.$emit('multiple', this.allSelectedDevice)
      } else {
        this.$emit('multiple', newVal)
      }
    },
    'deviceUpdate': {
      handler: function (newVal) {
        this.deviceListData.forEach((value, index) => {
          if (value.devid == newVal.deviceId && value.devtype == newVal.deviceType) {
            if (newVal.type == 'online') {
              value.status = 0
            } else if (newVal.type == 'offline') {
              value.status = 1
            }
            this.deviceListData.splice(index, 1, this.deviceList.getDeviceTableRow(value))
          }
        })
      },
      deep: true
    },
    'multiple': {
      handler: function (newVal) {
        sessionStorage.setItem("multiple", newVal)
        this.mutipleSelect(JSON.parse(newVal))
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.device-table {
  border-bottom: 0px!important;
  .table-box {
    margin-top: 12px;
  }
  .iconfont {
    font-size: 12px!important;
    color: #fff;
  }
  .copy {
    color: #2196f3;
    position: absolute;
    right: -10px;
    top: 0;
    cursor: pointer;
  }
  .list-pageination {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
