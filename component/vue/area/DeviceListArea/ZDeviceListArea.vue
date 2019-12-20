<template>
  <div class='device-List' @click="mock()"><!-- multipleSelection"{{multipleSelection}} -->
    <!-- <v-main-header :modulename="modulename" v-if="showFlag"></v-main-header> -->
    <div class="device-List-content">
      <!-- config:{{config}} -->
    <div class='preview' v-if="config.show.preview">
      <v-device-preview :seriesData='seriesData' :stateData='stateData' ref="preview" :id="id"></v-device-preview>
    </div>
    <div class="device-box">
      <div class='select-user mini-header'>
        <p class='title'>设备列表</p>
      </div>
      <div class="device-box-header" style="border:0px solid #f00;">
        <v-device-filter :config=' {show: config.show}'  :devtypesOptions='devtypesOptions' @search="searchDevice" @batchDeleteDevice="batchDeleteDevice" :name="'设备'" ref="search" :showFlag="showFlag" :selectedDevtype="selectedDevtype" @updateSecret="BatchUpdateSecret"></v-device-filter>
      </div>
      <!-- b  --><div class="device-table">
        <v-device-table @toControl = "toControl" @multiple="getMultipleSelection" :filter="filter" ref="deviceTable" @deleteDevice="deleteDevice" @updateSecret="singerUpdateSecret"></v-device-table>
      </div>
    </div>
    <div class="device-positon">
      <!-- b <v-device-list-map ref="deviceMap" :deviceList="mapList" :utilDevInfo='{}'></v-device-list-map> -->
    </div>
    </div>
    <v-del-sure ref="delSure" @sureDel="sureDel"></v-del-sure>
    <ZLoginArea @toControl = "toControl"></ZLoginArea>
  </div>
</template>

<script>
import VDeviceFilter from './Components/DeviceFilter.vue'
import VDeviceTable from './Components/DeviceTable.vue'
import VDevicePreview from './Components/DevicePreview.vue'

import {EventList} from './js/data/device/deviceEvent.js'
import VDelSure from './Components/Common/SurePassword/DelSure.vue'
/* import VDeviceFilter from '@/components/Common/Device/DeviceFilter.vue'
import VDeviceTable from '@/components/Common/Device/DeviceTable.vue'
import VDevicePreview from '@/components/Common/Device/DevicePreview.vue'
import { DeviceList } from '@/assets/js/device/deviceList.js'
import VMainHeader from '@/components/Common/MainHeader'
import ZlgCloudHelper from 'API/ZlgCloudHelper.js'
import { mapState, mapMutations, mapGetters } from 'vuex'
import {EventList} from '@/assets/js/device/deviceEvent.js'
import {UpdateData} from '@/assets/js/data/moduleRelation/upDateData.js'
import work from 'webworkify-webpack'
import VDelSure from '@/components/Common/SurePassword/DelSure.vue'
import VDeviceListMap from '@/components/Device/DeviceList/Common/DeviceListMap'
import { cloneDeep } from 'lodash'
import {formatDevStatus} from 'COMMON/util/device.js' */
/// import { DeviceList } from '../../../../sdk/js/logic/deviceModules/ZWSDeviceLogic.js'
import {UpdateData} from './js/data/moduleRelation/upDateData.js'
import { DeviceList } from './js/data/device/deviceList.js'
import work from 'webworkify-webpack'
import VDeviceListMap from './components/Common/DeviceListMap'
import { cloneDeep } from 'lodash'
// import {mockData, mockData2, getDefaultPermission} from './MockDataForTest.js'

// login

import ZlgCloudHelper from '../../../../sdk/js/api/http/httpModules/ZLGDevice'
import ZLGUser from '../../../../sdk/js/api/http/httpModules/ZLGUser'
import ZLGDeviceType from '../../../../sdk/js/api/http/httpModules/ZLGDeviceType'


import ZLoginArea from '../CommonArea/ZLoginArea.vue'

export default {
  props: {
    config: {
      type: Object,
      default: () => {
       return  {
      show: {
            addDevice: true,
            batchDeleteDevice: true,
            batchUpdateDeviceSecret: true,
            searchArea: [ // 控制整个区域内部的元素展示，如果该区域的所有元素都为false，则隐藏该搜索区域
                {
                    nickname: '添加设备',
                    key: 'addDevice',
                    flag: false
                },
                {
                    nickname: '批量删除设备',
                    key: 'batchDeleteDevice',
                    flag: false
                },
                {
                    nickname: '更新设备密钥',
                    key: 'batchUpdateDeviceSecret',
                    flag: false
                },
                {
                    nickname: '类型筛选',
                    key: 'filterByDevtype',
                    flag: false
                },
                {
                    nickname: '模糊搜索',
                    key: 'vagueSearch',
                    flag: false
                }

            ],
            tableColumn: [
                {
                    nickname: '多选框', // 这是展示的列名
                    flag: false, // 这是一个是否展示该列的默认值，true为显示
                    key: 'multiple' // 这是展示的字段英文名称
                },
                {
                    nickname: '状态',
                    flag: false, 
                    key: 'status'
                },
                {
                    nickname: '名称',
                    flag: false,
                    key: 'devname'
                },
                {
                    nickname: '设备ID',
                    flag: false,
                    key: 'devid'
                },
                {
                    nickname: '设备类型',
                    flag: false,
                    key: 'devtype'
                },
                {
                    nickname: '新固件',
                    flag: false,
                    key: 'newFM'
                },
                {
                    nickname: '设备密钥',
                    flag: false,
                    key: 'devsecret'
                },
                {
                    nickname: '离线时间',
                    flag: false,
                    key: 'offlinetime'
                },
                {
                    nickname: '上线时间',
                    flag: false,
                    key: 'onlinetime'
                }
            ],
            tableColumConfig: {
                nickname: '数据点配置框', // 控制数据点显示和隐藏的配置弹框
                flag: false, // 控制area里面自带的配置弹框是否显示
            },
            opreation: [ // 如果三个都为false，则不显示操作列
                {
                    nickname: '编辑',
                    flag: false,
                    key: 'editInfo'
                },
                {
                    nickname: '单个修改密钥',
                    flag: false,
                    key: 'updateDeviceSecret'
                },
                {
                    nickname: '单个删除设备', //删除需要密码弹框校验
                    flag: false,
                    key: 'deleteDevice'
                }
              ],
              preview: false
            }
          }
        }
      
      },
    projectDevice: {
      type: Object,
      default: () => {}
    },
    echartsId: {
      type: String
    }
  },
  components: {
    /* VMainHeader, */
    VDeviceFilter,
    VDeviceTable,
    VDevicePreview,
    VDelSure,
    VDeviceListMap,
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
      selectedDevtype: '',
      id: this.echartsId || 'device',
      projectDeviceList: null,
      showFlag: true,
      devtypesOptions: [{
    "devtype": "全部"
  }],
      flag: true,
      eventList: new EventList(),
      filter: {},
      viewButtonDisabled: false,
      addButtonDisabled: false,
      editButtonDisabled: false,
      deleteButtonDisabled: false,
      searchButtonDisabled: false,
      subUserShow: true,
      deviceList: new DeviceList(this),
      multipleSelection: [],
      devtypes: [],
      position: [],
      username: JSON.parse(localStorage.getItem('cloudUser')).username,
      modulename: [{ path: '', name: '设备列表' }],
      deviceListData: [],
      stateData: [
        {
          value: 0,
          name: this.$t(`Device.status.onlineNormal`)
        },
        {
          value: 0,
          name: this.$t(`Device.status.onlineAbnormal`)
        },
        {
          value: 0,
          name: this.$t(`Device.status.offline`)
        }
      ],
      seriesData: [],
      updateData: new UpdateData(),
      moduleWorker: null,
      deleteFlag: 0,
      row: {},
      mapList: {},
      isMounted: false,
      allDevice: [],
    }
  },
  mounted () {
    this.refreshMap(this.mapList)
    this.searchDevice({
      devtype: this.selectedDevtype
    })
    this.isMounted = true
    /* mock data */
    // mockData.call(this)
  },
  created () {
    ZLGUser.login({ username:"zlg001", password:"Zlg123456" }).then( 
    ()=> {
      ZLGDeviceType.getDevtypesList()
      debugger
    },
    ()=> {
      
    }

    )
    if (this.$route.query.devtype) {
      localStorage.setItem('selectedDevtype', this.$route.query.devtype)
    }
    if (this.projectDevice) this.projectDeviceList = this.projectDevice
    this.projectDeviceList && this.showProjectDevice(this.projectDeviceList)
    this.moduleWorker = work(require.resolve('./js/data/worker/dataRelation.js'))
    !this.projectDeviceList && this.init()
    !this.projectDeviceList && this.getSelectedDevice('Devtype')
    this.projectDeviceList && this.getSelectedDevice('projectDevtype')
  },
  computed: {
    /* ...mapGetters(['allDevtype', 'allDevice', 'allDeviceGroup', 'allProject', 'deviceCount']),
    ...mapState({
      permissionList: state => state.PermissionListModule.permissionList,
      allDashBoard: state => state.deviceDataModule.allDashboard,
      allProject: state => state.deviceDataModule.allProject
    }), */
    allDeviceAndDevtypeLoaded () {
      return this.allDevtype.length > 0 && Object.keys(this.allDevice).length > 0
    }
  },
  methods: {
    
    toControl (data) {
      this.$emit("toControl", data)
      debugger
      if (data.name === "") {

      } else if (data.name === "setAllDeviceType") {
        this.allDevtype = data.value
      }
      if (data.name === "setSchema") {
        this.schema = data.value
      } else if (data.name === "setAllDeviceType") {
        this.allDevtype = data.value
      }
    },
    mock () {
       
      /* debugger */
      /* mockData2.call(this)
      mockData.call(this) */
    },
    /* ...mapMutations(['SET_ALLDEVICE', 'SET_ALLDEVTYPE', 'SET_ALLDEVICEGROUP', 'SET_ALLPROJECT', 'SET_ALLDASHBOARD', 'SET_DEVICECOUNT']),
     */
    singerUpdateSecret (args) {
      debugger
      //ZlgCloudHelper.updateSingleDeviceSecret({devid: args.device.devid, devtype: args.device.devtype, devsecret: JSON.stringify({devsecret: args.secret})}).then(
        ZlgCloudHelper.updateSingleDeviceSecret({devid: args.device.devid, devtype: args.device.devtype, devsecret: args.secret}).then(
        res => {
        this.$message.success('更新密钥成功')
        let allDevices = JSON.parse(JSON.stringify(this.allDevice))
        Object.keys(this.allDevice).forEach(value => {
          if (value === args.device.devtype) {
            allDevices[value].forEach((key, index) => {
              if (key.devid === args.device.devid && key.devtype == args.device.devtype) {
                args.device.devsecret = args.secret
                allDevices[value].splice(index, 1, args.device)
              }
            })
          }
        })
        this.SET_ALLDEVICE(allDevices)
        this.refreshDeviceList()
      },
      res => {
        this.$message.error(`失败！`)
      }
      )
    },
    BatchUpdateSecret (val) {
      debugger
      if (!this.multipleSelection.length) {
        this.$message.error(`请先选择设备！`)
        return false
      }
      let secretArray = []
      this.multipleSelection.forEach(item => {
        let single = {}
        single.devtype = item.devtype
        single.devid = item.devid
        single.devsecret = val
        secretArray.push(single)
      })
      // return
      ZlgCloudHelper.updateMutipleDeviceSecret({info: secretArray}).then(res => {
        if (res.data.updateCount) {
          this.$message.success(`${res.data.updateCount}个设备的密钥值更新成功！`)
          let allDevices = JSON.parse(JSON.stringify(this.allDevice))
          secretArray.forEach(item => {
            Object.keys(this.allDevice).forEach(value => {
              if (value === item.devtype) {
                allDevices[value].forEach((key, index) => {
                  if (key.devid === item.devid && key.devtype == item.devtype) {
                    allDevices[value][index].devsecret = item.devsecret
                  }
                })
              }
            })
          })
          this.SET_ALLDEVICE(allDevices)
          this.refreshDeviceList()
        } else {
          this.$message.error(`设备的密钥值更新失败！`)
        }
      })
    },
    getSelectedDevice (flag) {
      let devtype = localStorage.getItem('selected' + flag) == 'undefined' ? '' : localStorage.getItem('selected' + flag)
      this.selectedDevtype = '全部'
      this.devtypesOptions.forEach(item => {
        if (item.devtype == devtype) {
          this.selectedDevtype = devtype
        }
      })
    },
    refreshMap (newVal) {
      this.$refs.deviceMap && this.$refs.deviceMap.$refs.deviceMap && this.$refs.deviceMap.$refs.deviceMap.getMarkerPoint(newVal)
    },
    refreshPreview () {
      this.$refs.preview && this.$refs.preview.drawSeriesCircle(this.seriesData)
      this.$refs.preview && this.$refs.preview.drawStateCircle(this.stateData)
    },
    getMultipleSelection (val) {
      debugger
      this.multipleSelection = val
    },
    toEditDevice (devid, devtype, devname, groupname) {
      this.$router.push(
        `/Home/Device/Add?devid=${devid}&devtype=${devtype}&devname=${devname}`
      )
    },
    init () {
      this.mapList = this.allDevice || []
      debugger
      this.devtypesOptions = cloneDeep(this.allDevtype)
      this.devtypesOptions.unshift({devtype: '全部'})
      this.initPosition(this.allDevice)
      this.initAllDevtype(this.allDevtype, this.allDevice)
    },
    initAllDevtype (allDevtype, allDevice) {
      this.seriesData = []
      let _this = this
      allDevtype && allDevtype.forEach(item => {
        let singer = {}
        singer.name = item.devtype
        singer.value = _this.allDevice[item.devtype] ? _this.allDevice[item.devtype].length : 0
        item.devtype != '全部' && _this.seriesData.push(singer)
      })
      !this.projectDeviceList && allDevice && Object.keys(allDevice).forEach(item => {
        this.seriesData.forEach(value => {
          if (value.name == item) {
            value.value = allDevice[item].length
          }
        })
      })
      this.refreshPreview()
    },
    updatedDeviceInfo (multipleSelection) {
      if (this.projectDeviceList) {
        multipleSelection.forEach(value => {
          const removeHandler = (list) => {
            list.forEach((item, index) => {
              if (value.devid == item.devid && value.devtype == item.devtype) {
                list.splice(index, 1)
              }
            })
          }
          if (this.filter.devtype === '全部') {
            Object.values(this.projectDeviceList).forEach(list => {
              removeHandler(list)
            })
          } else {
            removeHandler(this.projectDeviceList[this.filter.devtype])
          }
        })
      }
      // 更新vuex里面的设备数
      this.SET_DEVICECOUNT(this.deviceCount - multipleSelection.length)
      let allDevices = JSON.parse(JSON.stringify(this.allDevice))
      multipleSelection.forEach(item => {
        Object.keys(this.allDevice).forEach(value => {
          if (value === item.devtype) {
            allDevices[value].forEach((key, index) => {
              if (key.devid === item.devid && key.devtype == item.devtype) {
                allDevices[value].splice(index, 1)
              }
            })
          }
        })
      })
      let _this = this
      this.SET_ALLDEVICE(allDevices)
      // 更新项目管理里面的信息
      this.moduleWorker.postMessage({type: 'deleteDevInProject', devices: multipleSelection, allProject: this.allProject})
      this.moduleWorker.addEventListener('message', (e) => {
        this.updateData.updateProjectListDev(e.data, list => {
          list && _this.SET_ALLPROJECT(list)
        })
      })
      // 更新数据看板里面的信息
      this.moduleWorker.postMessage({type: 'deleteDevInDashBoard', devices: multipleSelection, allDashBoard: this.allDashBoard})
      this.moduleWorker.addEventListener('message', (e) => {
        this.updateData.updateDashBoardList(e.data, list => {
          list && _this.SET_ALLDASHBOARD(list.reverse())
        })
      })
      // 重新获取设备列表
      this.refreshDeviceList()
    },
    initPosition (allDevice) {
      this.seriesData = []
      let result = this.deviceList.getDeviceState(allDevice, this.stateData)
      this.stateData = result.stateData
      this.position = result.position
      // this.refreshMap(this.deviceList)
    },
    deleteDevice (row) {
      this.$refs.delSure._data.dialogVisible = true
      this.deleteFlag = 1
      this.row = row
    },
    confirmBatchDeleteDevice (multipleSelection) {
      if (!multipleSelection.length) {
        return false
      }
      const deviceInfos = new Map()
      multipleSelection.forEach(item => {
        let info = deviceInfos.get(item.devtype)
        if (!info) {
          info = {
            info: [],
            devtype: item.devtype
          }
          deviceInfos.set(info.devtype, info)
        }
        info.info.push(item.devid)
      })
      const deleteTasks = []
      deviceInfos.forEach((value, key) => {
        deleteTasks.push(() => {
          return ZlgCloudHelper.deleteMutipleDevices(value) //batchDeleteDevice(value)
        })
      })
      return new Promise((resolve, reject) => {
        const exe = (num, removedCount) => {
          if (num >= deleteTasks.length) {
            resolve(removedCount)
            return
          }
          deleteTasks[num]().then(res => {
            exe(num + 1, res.data.removedCount + removedCount)
          }).catch(error => {
            exe(num + 1, removedCount)
          })
        }
        exe(0, 0)
      }).then(removedCount => {
        this.$refs.delSure._data.dialogVisible = false
        if (removedCount) {
          this.$message.success(`删除成功${removedCount}条！`)
          // vue watch监听器 会最终触发refreshPreview
          this.updatedDeviceInfo(multipleSelection)
          this.refreshDeviceList()
          if (this.projectDeviceList) {
            this.showProjectDevice(this.projectDeviceList)
          }
        }
      })
    },
    batchDeleteDevice () {
      this.$refs.delSure._data.dialogVisible = true
      this.deleteFlag = 2
    },
    confirmDeleteSingerDevice (device) {
      ZlgCloudHelper.deleteSingleDevice({devid: device.devid, devtype: device.devtype}).then(res => {
        this.$message.success('删除成功')
        // vue watch监听器 会最终触发refreshPreview
        this.updatedDeviceInfo([device])
        this.refreshDeviceList()
        if (this.projectDeviceList) {
          this.showProjectDevice(this.projectDeviceList)
        }
      })
    },
    sureDel () {
      if (this.deleteFlag == 1) {
        this.confirmDeleteSingerDevice(this.row)
      } else if (this.deleteFlag == 2) {
        this.confirmBatchDeleteDevice(this.multipleSelection)
      }
    },
    refreshDeviceList () {
      if (this.$refs.deviceTable) {
        this.$refs.deviceTable.currentPage = 1
      }
      if (!this.projectDeviceList) {
        this.filter && this.$refs.deviceTable && this.$refs.deviceTable.getDeviceList(this.filter)
      } else {
        let deviceList = this.projectDeviceList[this.filter.devtype]
        if (this.filter.devtype === '全部') {
          deviceList = []
          for (const key in this.projectDeviceList) {
            if (this.projectDeviceList.hasOwnProperty(key)) {
              const list = this.projectDeviceList[key]
              deviceList.push(...list)
            }
          }
        }
        deviceList = JSON.parse(JSON.stringify(deviceList))
        deviceList = deviceList.map(device => {
          return this.deviceList.getDeviceTableRow(device)
        })
        this.filter && this.$refs.deviceTable.getDeviceList('{}', deviceList, null)
      }
    },
    searchDevice (filter) {
      debugger
      this.mapList = {}
      let _this = this
      if (!filter) {
        return false
      }
      /* if (!this.permissionList.device.listDevices) {
        return false
      } */
      this.filter = filter || {}
      localStorage.setItem('selectedDevtype', filter.devtype)
      this.selectedDevtype = filter.devtype
      if (filter.devtype == '全部') {
        if (this.projectDeviceList) {
          this.refreshDeviceList()
          this.mapList = this.projectDeviceList
        } else {
          this.$refs.deviceTable && this.$refs.deviceTable.getDeviceList(filter, null, this.allDevtype, true)
          this.mapList = this.allDevice
        }
        return false
      }
      debugger
      if (this.allDevice && this.allDevice[filter.devtype]) {
        this.mapList[filter.devtype] = this.allDevice[filter.devtype]
      }
      this.refreshDeviceList()
    },
    initDeviveSurvey (projectDevice) {
      this.stateData[0].value = 0
      this.stateData[1].value = 0
      this.stateData[2].value = 0
      this.seriesData = []
      this.devtypesOptions = [{devtype: '全部'}]
      Object.keys(projectDevice).forEach(item => {
        let singer = {}
        singer.name = item
        singer.value = projectDevice[item].length
        if (1 || this.permissionList.deviceType.getListDevType) {
          this.seriesData.push(singer)
        }
        this.allDevtype.forEach(value => {
          if (value.devtype == item) {
            this.devtypesOptions.push(value)
          }
        })
        if (1 || this.permissionList.device.listDevices) {
          singer.value && projectDevice[item].forEach(v => {
            if (formatDevStatus(v.status, v.fault) == 0) {
              this.stateData[0].value += 1
            } else if (formatDevStatus(v.status, v.fault) == 2) {
              this.stateData[1].value += 1
            } else {
              this.stateData[2].value += 1
            }
          })
        }
      })
    },
    showProjectDevice (newVal) {
      this.deviceList
      this.showFlag = false
      this.devtypesOptions = [{devtype: '全部'}]
      Object.keys(this.projectDeviceList).forEach(item => {
        this.allDevtype.forEach(value => {
          if (value.devtype == item) {
            this.devtypesOptions.push(value)
          }
        })
      })
      this.initAllDevtype(this.devtypesOptions)
      this.initDeviveSurvey(newVal)
      this.mapList = newVal
      this.refreshPreview()
    },
    initMap () {
      this.$refs.deviceMap.initMapMarker()
    }
  },
  watch: {
    'projectDevice': {
      handler: function (newVal) {
        this.projectDeviceList = JSON.parse(JSON.stringify(newVal))
        this.showProjectDevice(this.projectDeviceList)
        this.refreshDeviceList()
      },
      deep: true
    },
    'allDevice': {
      handler: function (newVal) {
        if (!this.projectDeviceList) {
          this.initPosition(newVal)
          this.initAllDevtype(this.allDevtype)
          if (this.projectDeviceList) {
            this.mapList = this.projectDeviceList
          } else {
            if (this.selectedDevtype === '全部') {
              this.mapList = newVal
            } else if (this.allDevice[this.selectedDevtype]) {
              this.mapList = {}
              this.mapList[this.selectedDevtype] = this.allDevice[this.selectedDevtype]
            } 
          }
          this.refreshDeviceList()
        }
      },
      deep: true
    },
    'allDevtype': {
      handler: function (newVal) {
        if (!this.projectDeviceList) {
          this.devtypesOptions = cloneDeep(newVal)
          this.devtypesOptions.unshift({devtype: '全部'})
          this.initAllDevtype(newVal)
          this.refreshDeviceList()
        }
      },
      deep: true
    },
    allDeviceAndDevtypeLoaded: function (val) {
      if (val && !this.isMounted) {
        !this.projectDeviceList && this.getSelectedDevice('Devtype')
        this.searchDevice({
          devtype: this.selectedDevtype
        })
      }
    },
    permissionList () {console.log('---------============--------')
      console.log(this.permissionList)
    }
  },
  beforeDestroy: function () {
    if (this.moduleWorker) { this.moduleWorker.terminate() }
  }
}
</script>

<style lang='less' scoped>
.device-List {
  // min-width: 1380px;
  overflow-x: auto;
  .device-List-content {
    margin: 8px;
  }
  .device-box-header {
    padding: 12px 14px;
    box-sizing: border-box;
    overflow: hidden;
    border-bottom: 1px solid #ebeef5;
    .left {
      text-align: left;
      height: 100%;
    }
    .right {
      float: right;
    }
  }
  .content {
    background-color: transparent;
    padding: 0;
    border: none;
  }
  .device-positon {
    margin-top: 6px;
  }
  .device-box {
    background-color: #fff;
    border: 1px solid #DEE4EF;
    .select-user {
      // border-left: 0;
    }
    .device-box-header {
      box-sizing: border-box;
    }
    .device-table {
      padding: 0 6px 6px 6px;
    }
  }
}
</style>
