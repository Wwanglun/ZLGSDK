<template>
<div class="wrap-map">
  <div id="allmap"></div>
  <img src="./images/watch/resetMap.png" @click="reset">
</div>
</template>

<script>
/* eslint-disable */
import {DeviceData} from '../../js/data/dataDevice.js'
import bigBlue from './images/map_circle/big/big_blue.gif'
import bigGray from './images/map_circle/big/big_gray.gif'
import bigRed from './images/map_circle/big/big_red.gif'
import smallBlue from './images/map_circle/small/small_blue.gif'
import smallGray from './images/map_circle/small/small_gray.gif'
import smallRed from './images/map_circle/small/small_red.gif'
import devError from './images/device/device-abnormal.png'
import devOn from './images/device/device-normal.png'
import devOff from './images/device/device-offline.png'
import markersImg from './images/watch/markers30.png'
import {loadBMap} from '../../js/data/util/utils.js'
import {formatDevStatus} from '../../js/data/util/device.js'
export default {
  props: {
    utilDevInfo: {
      type: Object,
      default: {} // 选中的设备
    },
    styleJson: {
      type: Array,
      default: () => {} // 自定义地图样式
    },
    deviceList: {
      type: Object,
      default: () => [] // 需要展示的设备列表
    }
  },
  data () {
    return {
      deviceData: new DeviceData(),
      map: {},
      location: {},
      devinfo: {},
      markerClusterer: {},
      mapAddress: '',
      listenFlag: true,
      flagMarker: {},
      singleEventData: {},
      markerPoint: {},
      markers: [],
      pointsView: []
    }
  },
  mounted () {
    this.getMarkerPoint(this.deviceList)
  },
  methods: {
    getMarkerPoint (deviceList) {
      loadBMap('0Ylw7nN3CGLp27qSVL25imNx8ShWtpa9', true).then(_ => {
        this.map = new BMap.Map('allmap', {enableMapClick: false})
        this.map.centerAndZoom(new BMap.Point(105, 34), 5)
        this.map.setMapStyle({styleJson: this.styleJson, style: this.styleJson ? 'dark' : 'normal'})
        let opts = {offset: new BMap.Size(20, 10), type: BMAP_NAVIGATION_CONTROL_SMALL, anchor: BMAP_ANCHOR_TOP_LEFT}
        this.map.addControl(new BMap.NavigationControl(opts))
        this.map.enableScrollWheelZoom(true)
        this.map.addEventListener("movestart", () => {
          this.singleEventData = {}
          this.markerPoint = {}
        })
        this.map.addEventListener('zoomend', () => {
          if (Object.keys(this.flagMarker).length > 0) {
            this.setPoint(this.map, deviceList)
          }
        })
        this.map.addEventListener('moveend', () => {
          if (Object.keys(this.flagMarker).length > 0) {
            this.setPoint(this.map, deviceList)
          }
        })
        this.map.addEventListener('click', () => {
          if (Object.keys(this.flagMarker).length > 0) {
            this.setPoint(this.map, deviceList)
          }
        })
        this.location = new BMap.Geocoder()
        setTimeout(_ => {
          this.setPoint(this.map, deviceList)
        }, 500)
      })
    },
    setPoint (map, deviceList) {
      this.markers = []
      this.pointsView = []
      Object.keys(deviceList).forEach((item, i) => {
        deviceList[item].forEach(v => {
          let point
          if (v.gps && v.gps.longitude && v.gps.latitude) {
            point = new BMap.Point(v.gps.longitude - 0, v.gps.latitude - 0)
            this.pointsView.push(point)
          }
          let flag = this.devinfo.devid === v.devid && this.devinfo.devtype === v.devtype
          if (flag) {
            if (v.gps && v.gps.longitude && v.gps.latitude) {
              this.location.getLocation(point, res => {
                if (res) {
                  this.mapAddress = res.address
                  // 获取当前设备的地理位置
                  this.$emit('getSelectDevAddress', this.mapAddress)
                }
              })
            } else {
              this.$emit('getSelectDevAddress', '')
            }
          }
          if (point) {
            let marker = new BMap.Marker(point, {icon: new BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
                scale: 10,
                strokeWeight: 1,
                strokeColor: formatDevStatus(v.status, v.fault) === 0 ? "#65c13c" : formatDevStatus(v.status, v.fault) === 1 ? "#acadad" : "#f56c6c",
                fillColor: formatDevStatus(v.status, v.fault) === 0 ? "#65c13c" : formatDevStatus(v.status, v.fault) === 1 ? "#acadad" : "#f56c6c",
                fillOpacity: 0.99
            })})
            // map.addOverlay(marker)
            if (flag) {
              this.flagMarker = marker
            }
              marker.customData = {devname: v.devname, devtype: v.devtype, devid: v.devid, status: formatDevStatus(v.status, v.fault)}
              let content = `<p class="test-overflow-hidden" style='margin:0;height: 45px; line-height: 45px;padding-left: 10px; font-size:14px;' title="${v.devname}"><span style="display: inline-block; width: 70px;">设备名称 : </span>${v.devname}</p>`;
              marker.addEventListener("mouseover", (e) => {
                e.domEvent.path[0].className = formatDevStatus(v.status, v.fault) === 0 ? "BMap_Marker BMap_noprint watch-devon" : formatDevStatus(v.status, v.fault) === 1 ? "BMap_Marker BMap_noprint watch-devoff" : "BMap_Marker BMap_noprint watch-deverror"
                var p = e.target;
                var point = new BMap.Point(p.point.lng, p.point.lat)
                var infoWindow = new BMap.InfoWindow(content, {
                  width : 90,
                  height: 60,
                  enableMessage: true,
                  offset: new BMap.Size(-15, 20)
                })
                let windowFlag = e.currentTarget.customData.devid === this.singleEventData.devid && e.currentTarget.customData.devtype === this.singleEventData.devtype
                if (!windowFlag) {
                  map.openInfoWindow(infoWindow, point); //开启信息窗口
                  this.singleEventData = e.currentTarget.customData
                }
                infoWindow.addEventListener("close", () => {
                  this.singleEventData = {}
                  map.clearOverlaysInParking();
                })
              })
              marker.addEventListener('mouseout', (e) => {
                // map.closeInfoWindow();
                if (!flag) {
                  e.domEvent.path[0].className = "BMap_Marker BMap_noprint"
                }
              })
              marker.addEventListener("click", () => this.attribute(v, map, marker))
              this.markers.push(marker)
            }
        })
      })
        if (this.markerClusterer.clearMarkers) {
          this.map.clearOverlays()
          this.markerClusterer.clearMarkers()
        }
        // map.setViewport(this.pointsView)
        this.markerClusterer = new BMapLib.MarkerClusterer(map, {markers: this.markers, maxZoom: 19, styles: [
          {url: markersImg, size: new BMap.Size(30, 30), textColor: '#fff'}
        ], isAverangeCenter: true})
        let that = this
        this.markerClusterer._clusters.forEach(v => {
          that.addFn(v, map)
        })
    },
    attribute (v, map, marker) {
      map.closeInfoWindow()
      this.devinfo = v
      this.map.centerAndZoom(new BMap.Point(this.devinfo.gps.longitude, this.devinfo.gps.latitude), 18)
      // 传递点击选中地图上的设备信息
      this.$emit('getDeviceInfo', {info: v, trigger: 'map'})
    },
    addFn (marker, map) {
      marker._clusterMarker.addEventListener("mouseover", (event) => {
        var point = new BMap.Point(marker._markers[0].point.lng, marker._markers[0].point.lat);
        let content = `<div style='margin:0;line-height: 30px;padding: 0px 10px; font-size:14px;'>`
        marker._markers.forEach((v, i) => {
          let src = v.customData.status === 0 ? devOn : v.customData.status === 1 ? devOff : devError
          content += `<p style="height: 30px; line-height: 30px; padding-left: 24px; position: relative" class="test-overflow-hidden" title="${v.customData.devname}"><img class="device-status" style="display: inline-block;" src=${src} alt=""> 设备名称: ${v.customData.devname}</p>`
        })
        var infoWindow = new BMap.InfoWindow(content, {
          width : 120,
          enableMessage: true,
          offset: new BMap.Size(-15, 20)
        });  // 创建信息窗口对象 
        infoWindow.addEventListener("close", () => {
          this.markerPoint = {}
          map.clearOverlaysInParking();
        })
        event.currentTarget.ba.className = 'watch-animation'
        let positionCommon = this.markerPoint.lat === event.currentTarget._position.lat && this.markerPoint.lng === event.currentTarget._position.lng
        if (!positionCommon) {
          map.openInfoWindow(infoWindow, point); //开启信息窗口
          this.markerPoint = JSON.parse(JSON.stringify(event.currentTarget._position))
        }
      });
      marker._clusterMarker.addEventListener("mouseout", (event) => {
        event.currentTarget.ba.className = ''
        // this.markerPoint = {}
      })
    },
    reset () {
      this.map.setViewport(this.pointsView)
      this.$emit('resetMap')
    }
  },
  watch: {
    utilDevInfo (val) {
      if (val.devid) {
        this.devinfo = val
      }
    },
    devinfo (val) {
      if (Object.keys(this.deviceList).length > 0) {
        if (this.devinfo.gps && this.devinfo.gps.longitude && this.devinfo.gps.latitude) {
          this.map.centerAndZoom(new BMap.Point(this.devinfo.gps.longitude, this.devinfo.gps.latitude), 18)
        } else {
          this.map.setViewport(this.pointsView)
        }
        this.setPoint(this.map, this.deviceList)
      }
    },
    'markerClusterer._clusters' (newVal, oldVal) {
      this.map.closeInfoWindow()
      this.markerClusterer._clusters.forEach(v => {
        this.addFn(v, this.map)
      })
    },
    flagMarker (val) {
      if (val.ba) {
        val.ba.className = formatDevStatus(this.devinfo.status, this.devinfo.fault) === 0 ? "BMap_Marker BMap_noprint watch-devon" : formatDevStatus(this.devinfo.status, this.devinfo.fault) === 1 ? "BMap_Marker BMap_noprint watch-devoff" : "BMap_Marker BMap_noprint watch-deverror"
      }
    },
    'map': {
      handler (newV, oldV) {
        if (Object.keys(oldV).length > 0) {
          oldV.clearOverlays()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
#allmap, .wrap-map {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // border: 1px solid RGB(13,40,84);
  position: relative;
}
img {
  position: absolute;
  top: 10px;
  left: 70px;
  z-index: 2;
  cursor: pointer;
}
</style>
