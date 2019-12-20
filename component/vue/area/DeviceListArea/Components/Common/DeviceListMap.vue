<template>
  <div class="device-list-positon">
    <div>
      <div class="map-title mini-header" @click="mapShow = !mapShow">
        <p class='title'>设备地图</p>
        <i :class="['right-icon el-icon-arrow-right', mapShow ? 'rotate-down' : '']" @click="mapShow = !mapShow"></i>
      </div>
      <div class="device-map-box" v-show="mapShow">
        <v-device-map :deviceList="deviceList" :utilDevInfo='{}' ref="deviceMap" style="height: 400px"></v-device-map>
      </div>
    </div>
  </div>
</template>

<script>
import VDeviceMap from './DeviceMap'
export default {
  name: 'DeviceListMap',
  components: {
    VDeviceMap
  },
  props: {
    deviceList: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      mapShow: true
    }
  },
  mounted () {
    this.initMapMarker()
  },
  watch: {
    deviceList: {
      handler: function (newVal) {
        this.initMapMarker()
      },
      deep: true
    } 
  },
  methods: {
    initMapMarker () {
      if (Object.keys(this.deviceList).length > 0) {
        this.$refs.deviceMap.getMarkerPoint(this.deviceList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.device-list-positon {
    width: 100%;
    margin-bottom: 8px;
    box-sizing: border-box;
    .map-title {
      overflow: hidden;
      cursor: pointer;
      .title {
        float: left;
      }
      .right-icon {
        float: right;
        line-height: 30px;
        margin-right: 14px;
        cursor: pointer;
      }
      .rotate-down {
        transform: rotateZ(90deg);
        transition: 0.3s;
      }
    }
    .device-map-box {
      width: 100%;
      padding: 12px 14px;
      box-sizing: border-box;
      background-color: #fff;
      // border: 1px solid #DEE4EF;
      border-top: 0;
    }
  }
</style>
