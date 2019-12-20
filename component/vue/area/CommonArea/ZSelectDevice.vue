<template>
  <el-select class="select-device select-device-width" v-model="device" :size="size" :placeholder="placeholder" :multiple="multiple" filterable @change="selectDevice" collapse-tags>
    <el-option-group v-for="(group, index) in selectDevices" :key="index" :label="index" :title="index">
      <el-option v-for="item in group" :key="item.devid" :label="item.devname" :value="`${item.devid},${item.devtype}`" :title="item.devname">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import ZWSDeviceLogic from '../../../../sdk/js/logic/deviceModules/ZWSDeviceLogic.js'
export default {
  name: 'selectDevice',
  props: {
    multipleFlag: {
      type: Boolean,
      default: false
    },
    originDevice: {
      type: Array,
      default: () => {
        return []
      }
    },
    size: {
      type: String,
      default: 'medium'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    clearSelect: {
      type: Boolean,
      default: false
    },
    devices: {
      type: Object,
      default: () => {}
    }
  },
  created () {
  },
  data () {
    return {
      multiple: this.multipleFlag ? this.multipleFlag : false,
      device: this.multipleFlag ? [] : '', // 选中设备的值为 ‘devid,devtype’ 形式,
      selectDevices: {}
    }
  },
  methods: {
    selectDevice (val) {
      let device = ZWSDeviceLogic.getSelectedDeviceList(this.multipleFlag ? val : [val], this.devices)
      this.$emit('device', {valueInfo: device, valueSelect: this.device, isHand: true})
    }
  },
  watch: {
    originDevice: {
      handler: function (newVal) {
        if (Object.keys(this.devices).length === 0) return
        let device = ZWSDeviceLogic.getSelectedDeviceList(newVal, this.devices)
        if (this.multipleFlag && typeof newVal == 'object') {
          this.device = newVal
        } else {
          this.device = newVal[0]
        }
        this.$emit('device', {valueInfo: device, valueSelect: this.device})
      },
      deep: true
      // immediate: true
    },
    clearSelect (val) {
      this.device = ''
    },
    'devices': {
      handler: function (devs) {
        this.selectDevices = devs
        // let device = ZWSDeviceLogic.getSelectedDeviceList(this.originDevice, devs)
        // if (this.multipleFlag && typeof this.originDevice == 'object') {
        //   this.device = this.originDevice
        // } else {
        //   this.device = this.originDevice[0]
        // }
        // this.$emit('device', {valueInfo: device, valueSelect: this.device})
        // this.selectDevices = this.devices ? this.devices : devs
      },
      deep: true
    }
    // 'devices': {
    //   handler: function (newVal) {
    //     console.log(newVal)
    //     this.selectDevices = newVal
    //   },
    //   deep: true
    // }
    // selectDevices (val) {
    //   if (Object.keys(val).length > 0) {
    //     this.selectDevices = []
    //   }
    // }
  }
}
</script>

<style>
.select-device-width {
  width: 360px;
}
</style>
