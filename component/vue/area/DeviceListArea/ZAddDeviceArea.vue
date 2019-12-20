
<template>
  <div class="device-add"><!-- deviceList:{{deviceList}} --- userInfo:{{userInfo}} -->
    <!-- <v-main-header :modulename="modulename"></v-main-header> -->
    <div class="wrap content_wrap" :style="{'min-height': (height - 112) + 'px'}">
      <el-form ref="addForm" :model="addForm" label-width="106px" :rules="rules">
        <el-form-item label="设备类型" prop="devtype" label-width="106px">
          <el-select v-model.trim="addForm.devtype" placeholder="请选择" filterable @change="selectDevType">
            <el-option v-for="(item, index) in devtypes" :key="index" :label="item.devtype" :value="item.devtype" :title="item.devtype" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="devname" label-width="106px">
          <el-input v-model.trim="addForm.devname" placeholder="请输入设备名称" show-word-limit :maxlength="devnameLength.maxLength" class="limit-input"></el-input>
        </el-form-item>
         <el-form-item  v-for="(item, index) in addMemo" :key="index" :label="item.keyName === 'mqttadapter' ? '数据类型' : item.keyName === 'devid' && basetype.indexOf('LoRaWAN_CLASS') > -1 ? 'devEUI' : item.keyName === 'devid' ? '设备ID' : item.keyName === 'nwkKey' ? 'appKey' : item.keyName === 'nwkSEncKey' ? 'nwkSKey' : item.keyName" :prop="item.keyName" label-width="106px">
          <el-input v-show="item.keyName !== 'mqttadapter'" v-model.trim="addForm[item.keyName]" :placeholder="'请输入' + (item.keyName === 'devid' && basetype.indexOf('LoRaWAN_CLASS') > -1 ? 'devEUI' : item.keyName === 'devid' ? '设备ID' : item.keyName === 'nwkKey' ? 'appKey' : item.keyName === 'nwkSEncKey' ? 'nwkSKey' : item.keyName)" show-word-limit :maxlength="item.maxLength" :minlength="item.minLength" class="limit-input"></el-input>
          <el-select v-show="item.keyName === 'mqttadapter'" v-model.trim="addForm[item.keyName]" placeholder="请选择转换数据类型">
            <el-option v-for="(item, index) in mqttSelect" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 暂时不要 <el-form-item label="设备分组" prop="devgroup" label-width="106px">
          <el-select v-model.trim="addForm.devgroup" clearable placeholder="请选择">
            <el-option v-for="(item, index) in allDeviceGroup" :key="index" :label="item.groupname" :value="item.groupid" :title="item.groupname">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item v-show="config.show.desc" label="设备描述" prop="desc" label-width="106px">
          <el-input type="textarea" v-model.trim="addForm.desc" placeholder="请输入设备描述" maxlength="1024" show-word-limit class="limit-textarea"></el-input>
        </el-form-item>
        <el-form-item v-show="config.show.gps" label="设备地图" label-width="106px">
          <!--  -->
          <!-- <v-map @selectLocation='selectLocation' height="360" radius='0' searchFlag=true show='DoMap' class="add-device-map" ref="deviceMap" :locationNow="true" :longitude="addForm.gps.longitude" :latitude="addForm.gps.latitude"></v-map> -->
          <div class="block">
            <span>经度</span>
            <el-input placeholder="设备所在经度" size="mini" v-model.trim="addForm.gps.longitude" maxlength="10"></el-input>
            <span>纬度</span>
            <el-input placeholder="设备所在纬度" size="mini" v-model.trim="addForm.gps.latitude" maxlength="10"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <v-pager-button @save="onSubmit" @reset="reset" :disabled="0"></v-pager-button><!--  -->
          <!-- <v-pager-button @save="onSubmit" @reset="reset" :disabled="!permissionList.device.createDevice"></v-pager-button> -->
        </el-form-item>
      </el-form>
    </div>
    
    <ZLoginArea @toControl = "toControl"></ZLoginArea>
  </div>
</template>

<script>
import ZWSDeviceLogic from '../../../../sdk/js/logic/deviceModules/ZWSDeviceLogic.js'
import ZLGAssistant from '../../../../sdk/js/api/http/httpModules/ZLGAssistant'
import VPagerButton from '../../ctrl/ZPagerButton.vue'
/* import { WebSocketUtitl } from '@/assets/js/common/utils.js'
import VPagerButton from '@/components/Common/ComfirmButton/PagerButton.vue'
import VMainHeader from '@/components/Common/MainHeader'
import validate from 'COMMON/validate/validate.js'
import VMap from '~/Map/ZMap'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { setDevClass } from '@/assets/js/device/deviceGroup'
import ZlgCloudHelper from 'API/ZlgCloudHelper.js'
import {DeviceList} from '@/assets/js/device/deviceList.js' */

import ZlgCloudHelper from '../../../../sdk/js/api/http/httpModules/ZLGDevice'
import validate from './js/data/validate/validate.js'
import { DeviceList } from  './js/data/device/deviceList.js'// import {DeviceList} from '@/assets/js/device/deviceList.js'

import {getUserInfo} from './js/index.js'
import ZLoginArea from '../CommonArea/ZLoginArea.vue'

var state = {}

export default {
  name: 'ZDeviceAdd',
  props: {
    config: {
      type: Object,
      default:  () => {
       return {
      
      // },
        show: {
          desc: !false,
          
          gps: !false,
          form: [
              {
                  nickname: '设备描述',
                  flag: false,
                  key: 'desc'
              },
              {
                  nickname: '设备位置',
                  flag: false,
                  key: 'gps'
              }
          ]
        }
      }
    }
    }
  },
  components: {
    /* VMainHeader,
    VMap, */
    VPagerButton,
    ZLoginArea
  },
  computed: {
    /* ...mapGetters(['allDevice', 'height', 'schema', 'deviceCount', 'allDevtype', '']),
    ...mapState({
      userInfo: state => state.PermissionListModule.userInfo,
      permissionList: state => state.PermissionListModule.permissionList,
      allDevtype: state => state.deviceDataModule.allDevtype,
      allDeviceGroup: state => state.deviceDataModule.allDeviceGroup
    }) */
  },
  created () {
    
    // this.initSchema()
    // this.getDevtypes()
  },
  mounted () {
    debugger
    this.userInfo = getUserInfo({})
  },
  data () {
    let checkdevname = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(this.$t('Device.validate.devnameEmpty')))
      }
      return callback()
    }
    let checkdevid = (rule, value, callback) => {
      if (value === '') {
        if (this.showLora) {
          return callback(new Error(this.$t('Device.validate.DevEUI')))
        } else {
          return callback(new Error(this.$t('Device.validate.devidEmpty')))
        }
      }
      debugger
      let devidRules = this.deviceList.filterDevid(this.devtype, this.schema, this.allDevtype)
      let validateResult = (value.length >= devidRules.minLength && value.length <= devidRules.maxLength)
      if (this.showLora && (!validate.isHex(value) || !validateResult)) {
        return callback(new Error(`请输入长度为${(devidRules.minLength == devidRules.maxLength) ? devidRules.minLength : (devidRules.minLength + '~' + devidRules.maxLength)}位的16进制字符`))
      }
      if (!validateResult) {
        return callback(new Error(`请输入长度为${(devidRules.minLength == devidRules.maxLength) ? devidRules.minLength : (devidRules.minLength + '~' + devidRules.maxLength)}位的字符`))
      }
      if (!this.showLora && !validate.normalInput(this.addForm.devid)) {
        return callback(new Error(this.$t('Device.validate.devidError')))
      }
      return callback()
    }
    let checkABP = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入' + this.addForm.devtype + '使用的字符串'))
      }
      let validateResult = validate.isHex(value) && value.length === 32
      if (!validateResult) {
        // return callback(new Error(this.$t('Device.validate.hexadecimalError')))
        return callback(new Error(this.$t('Device.validate.32hexadecimalError')))
      }
      return callback()
    }
    let checkOTAA = (rule, value, callback) => {
      if (value === '') {
        if (this.showLora_abp) {
          return callback(new Error('请输入' + this.addForm.devtype + '使用的字符串'))
        } else {
          return callback(new Error('请输入' + this.addForm.devtype + '使用的字符串'))
        }
      }
      let validateResult = validate.isHex(value) && value.length === 32
      if (!validateResult) {
        return callback(new Error(this.$t('Device.validate.32hexadecimalError')))
      }
      return callback()
    }
    let checkAddr = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入' + this.addForm.devtype + '使用的字符串'))
      }
      let validateResult = /^[a-f0-9A-F]{8}$/.test(value)
      if (!validateResult) {
        return callback(new Error(this.$t('Device.validate.8hexadecimalError')))
      }
      return callback()
    }
    return {
      deviceList: new DeviceList(this),// new ZWSDeviceLogic(),
      modulename: [{ path: '', name: '添加设备' }],
      devtypes: [],
      addMemo: [],
      devnameLength: {
        maxmum: 0
      },
      addForm: {
        desc: '',
        devgroup: '',
        devname: '',
        devtype: '',
        devAddr: '',
        appSKey: '',
        nwkKey: '',
        nwkSEncKey: '',
        devclass: '',
        mqttadapter: 1,
        devid: '',
        gps: {
          longitude: '',
          latitude: ''
        }
      },
      totalProtocol: [
        {label: 'mqtt协议', value: 0},
        {label: 'Modbus', value: 1}
      ],
      mqttSelect: [
        {label: '二进制', value: 0},
        {label: '字符串', value: 1}
      ],
      dialogVisible: false,
      rules: {
        devname: [{ required: true, validator: checkdevname, trigger: 'blur' }],
        devtype: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        devid: [{ required: true, trigger: 'change', validator: checkdevid }],
        devAddr: [{ required: true, validator: checkAddr, trigger: 'change' }],
        appSKey: [{ required: true, validator: checkOTAA, trigger: 'change' }],
        nwkKey: [{ required: true, validator: checkOTAA, trigger: 'change' }],
        nwkSEncKey: [{ required: true, validator: checkABP, trigger: 'change' }],
        mqttadapter: [{ required: true, message: '请选择转换协议', trigger: 'change' }],
        desc: [{ max: 1024, message: this.$t(`Device.validate.descError`), trigger: 'blur' }]
      },
      targetDevid: '',
      targetDevType: '',
      showLora: false,
      showLora_abp: false,
      showLoraGW: false,
      basetype: '',
      state: {},
      schema: [],
      allDevtype: [],
      permissionList: [],
      height: 500
    }
  },
  methods: {
    toControl (data) {
      this.$emit("toControl", data)
      if (data.name === "setSchema") {
        this.schema = data.value
      } else if (data.name === "setAllDeviceType") {
        this.allDevtype = data.value
      }
    },
    SET_SCHEMA (data) {
      this.schema = data
      this.state.schema = data
    },
    /* ...mapMutations(['SET_ALLDEVICE', 'SET_DEVICECOUNT', 'SET_ALLDEVTYPE', 'SET_DEVICEUPADE']), */
    
    initSchema () {
      let info = ZLGAssistant.getDeviceSchema().then(res => {
        this.SET_SCHEMA(res)
      })
      /* ZlgCloudHelper.deviceSchema().then(res => {
        this.SET_SCHEMA(res)
      }) */
    },
    getDevtypes () {
      // return
      this.devtypes = []
      this.schema.forEach((item) => {
        let single = {}
        single.devtype = item.type
        single.basetype = item.type
        this.devtypes.push(single)
      })
      this.allDevtype.forEach(item => {
        let single = {}
        single.devtype = item.devtype
        single.basetype = item.basetype
        if (!this.devtypes.filter(v => v.devtype == item.devtype).length) {
          this.devtypes.push(single)
        }
      })
      this.selectDevType(this.devtypes[0].devtype)
    },
    reset () {
      this.$refs.addForm && this.$refs.addForm.resetFields()
    },
    onSubmit (formName) {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          const {longitude, latitude} = this.addForm.gps
          if (longitude !== '' || latitude !== '') {
            if (!validate.latitude(latitude != '' ? Number(latitude).toFixed(6) : latitude) || !validate.longitude(longitude != '' ? Number(longitude).toFixed(6) : longitude)) {
              this.$message.error(`您的位置信息中${!validate.latitude(latitude) ? '纬度' : '经度'}输入有误！`)
              return
            }
          }
          this.addForm.devtype = this.devtype
          let info = this.deviceList.addDeviceInitInfo(this.basetype, this.addForm, this.schema)
          ZlgCloudHelper.addDevice({info: info}).then(res => {
            debugger
            let allDevtype = JSON.parse(JSON.stringify(this.allDevtype))
            localStorage.setItem('selectedDevtype', res.data.devtype)
            // 更新vuex里面的设备信息

            /* if (this.userInfo.role != 6) {
              this.SET_DEVICECOUNT(this.deviceCount + 1)
              let allDevice = JSON.parse(JSON.stringify(this.allDevice))
              let flag = false
              Object.keys(allDevice).forEach(item => {
                if (this.addForm.devtype === item) {
                  flag = true
                  allDevice[item].push(res.data)
                }
              })
              if (!flag) {
                allDevice[this.addForm.devtype] = []
                allDevice[this.addForm.devtype].push(res.data)  
              }
              // 更新vuex里面的设备类型信息
              if (!allDevtype.some(value => {
                return value.devtype === this.addForm.devtype
              }) && this.userInfo.role != 6) {
                allDevtype.push({devtype: this.addForm.devtype, basetype: this.basetype, schema: this.schema.filter(v => v.type == this.basetype)[0], comment: ''})
              }
              this.SET_ALLDEVICE(allDevice)
              this.SET_ALLDEVTYPE(allDevtype)
              WebSocketUtitl.addDataListener({devices: [{devid: this.addForm.devid, devtype: this.addForm.devtype}], event: 'online'})
              WebSocketUtitl.addDataListener({devices: [{devid: this.addForm.devid, devtype: this.addForm.devtype}], event: 'offline'})
              WebSocketUtitl.addDataListener({devices: [{devid: this.addForm.devid, devtype: this.addForm.devtype}], event: 'status'})
              WebSocketUtitl.registListener(this.socket)
            } */
            this.$confirm('添加设备成功！', '提示', {
              confirmButtonText: '继续添加',
              cancelButtonText: '返回设备列表',
              type: 'success'
            }).then(() => {
              this.continueAdd('addForm')
            }).catch(() => {
              this.$emit("toControl", {name: "toDevlist", value: ""})
              // this.$router.push('/Home/Device/List')
            })
          }).catch((err) => {
            console.log(err)
            debugger
            if (err && err.response && err.response.status == 409) {
              let baseType = this.devtypes.find(v => v.devtype === this.devtype).basetype
              let isLoreType = baseType.indexOf('LoRa') > -1
              if (isLoreType) {
                this.$message.error('LoRa设备类型为全局设备类型。全局环境下此设备已存在，请修改设备ID后重试！')
              } else {
                this.$message.error('该设备已存在，请修改设备ID后重试！')
              }
            } else if (err && err.errorCode == 8001) {// .response && err.response.data.code == 8001) {
              //
              this.$message.error(`添加设备失败，${this.userInfo.role == 6 ? '该用户已达到最大设备数' : '该用户下的最多添加' + this.userInfo.dev_extra.dev_capacity + '个设备'}`)
            }
          })
        } else {
          return false
        }
      })
    },
    socket (res) {
      if (res.type == 'online' || res.type == 'offline' || res.type == 'status') {
        let allDevices = JSON.parse(JSON.stringify(this.allDevice))
        Object.keys(allDevices).forEach(item => {
          allDevices[item].forEach(value => {
            if (value.devid == res.deviceId && value.devtype == res.deviceType) {
              if (res.type == 'online') {
                value.status = 0
              } else if (res.type == 'offline') {
                value.status = 1
              } else if (res.type == 'status') {
                Object.assign(value, res.data)
              }
            }
          })
        })
        this.SET_DEVICEUPADE(res)
        this.SET_ALLDEVICE(allDevices) 
      }
    },
    continueAdd (formName) {
      this.$refs[formName].resetFields()
      this.showLora = false
      this.showLora_abp = false
    },
    selectDevType (value) {
      this.devtype = value
      this.reset()
      this.addForm.devtype = this.devtype
      this.basetype = this.devtypes.filter(v => v.devtype == value)[0].basetype
      let memo = this.schema.find(v => v.type === this.basetype).memo
      let memoArr = []
      Object.entries(memo).forEach(item => {
        if (item[1].required && item[0] !== 'devtype') {
          let single = {}
          single.keyName = item[0]
          Object.assign(single, item[1])
          memoArr.push(single)
        }
      })
      this.addMemo = memoArr
      this.devnameLength = this.schema.filter(v => v.type == this.basetype)[0].memo.devname
      this.devidLength = this.schema.filter(v => v.type == this.basetype)[0].memo.devid
      this.showLora = this.basetype.indexOf('LoRaWAN_CLASS') > -1
      this.$nextTick(_ => {
        this.$refs.addForm.clearValidate()
      })
    },
    selectLocation (val) {
      this.addForm.gps.latitude = Number(val.lat).toFixed(6) - 0
      this.addForm.gps.longitude = Number(val.lng).toFixed(6) - 0
    }
  },
  watch: {
    'schema': {
      handler: function (newVal) {
        this.getDevtypes()
      },
      deep: true
    },
    'allDevtype': {
      handler: function (newVal) {
        this.getDevtypes()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.device-add {
  .wrap {
    /deep/ .add-device-map {
      p {
        display: none!important;
      }
      .r-result {
        padding-left: 0!important;
      }
      input {
        margin-left: 0!important;
        width: 300px!important;
      }
    }
    form {
      width: 60%;
      background-color: #fff;
      .el-radio {
        margin: 10px 20px;
      }
      .el-input {
        width: 300px;
      }
      .el-select {
        width: 300px;
      }
      .el-textarea {
        width: 300px;
      }
      span {
        padding-left: 16px;
        color: #c3c4cc;
      }
      i {
        color: #409eff;
        font-size: 20px;
        cursor: pointer;
        padding-left: 10px;
      }
      .block {
        margin-top: 6px;
        span {
          font-size: 14px;
          margin-left: 10px;
          margin-right: 5px;
        }
        .el-input {
          width: 160px;
        }
      }
    }
  }
}
</style>
