<template>
  <div class="wrap" id="dataWrap">
    <div class="tip-text" v-show="isShowTip">{{tipContent}}</div>
    <div id="historyData" :style="{height: isShowEchart ? '300px' : ' 0'}"></div>
    <div class="more-tip" v-show="showTipTitle">{{this.isEmpty ? '暂无数据' : '展示最近1000条'}}</div>
    <i class="config-echart-title el-icon-caret-bottom" v-show="showConfig && !noPoint" @click.stop="showConfigTitle = true"></i>
    <v-schema :isEchart="true" :moduleName="moduleName" :isCustomConfigTitle="showConfig" :selectValueInfo="selectValueInfo" :allTitle="allTitle" :showConfig="showConfigTitle" @getConfigVisible="getConfigVisible" @getTableTitle="getTableTitle"></v-schema>
  </div>
</template>
<script>
import {setEchartOption} from '../../../../../../sdk/js/logic/deviceDataModules/dataEcharts/echartsOptions.js'
import {DeviceData} from '../../../../../../sdk/js/logic/deviceModules/ZWSDeviceDataLogic.js'
import VSchema from '../../../../../../component/vue/ctrl/ZTableCtrl/components/VSchema.vue'
let echarts = require('echarts')
export default {
  props: {
    dataPoint: {
      type: Array,
      default: () => []
    },
    targetAllData: {
      type: Array,
      default: () => []
    },
    isHistoryModule: {
      type: Boolean,
      default: true
    },
    isShowEchart: {
      type: Boolean,
      default: true
    },
    isEmpty: {
      type: Boolean,
      default: false
    },
    noPoint: {
      type: Boolean,
      default: true
    },
    showPercent: {
      type: Number,
      default: 0
    },
    isSelectedDev: {
      type: Boolean,
      default: false
    },
    showConfig: {
      type: Boolean,
      default: true
    },
    allTitle: {
      type: Array,
      default: () => []
    },
    moduleName: {
      type: String,
      default: ''
    },
    selectValueInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VSchema
  },
  data () {
    return {
      deviceData: new DeviceData(),
      myChart: {},
      series: [],
      allData: [],
      utilDatapoint: [],
      currentIndex: 0,
      yAxis: {},
      reduceHeight: 1000,
      isHistory: false,
      isShowTip: true,
      selectLegend: {},
      clearEchart: false,
      showConfigTitle: false,
      isExistConfig: false
    }
  },
  created () {
    this.adapatorCanvas()
  },
  methods: {
    getConfigVisible (visible) {
      this.showConfigTitle = visible
    },
    getTableTitle (title) {
      this.$emit('getCustomTitle', title.filter(v => v.type === 'number'))
    },
    initChart (index) {
      if (Object.keys(this.myChart).length === 0) {
        this.myChart = echarts.init(document.getElementById('historyData'))
      }
      if (this.isHistoryModule || this.clearEchart) this.myChart.clear()
      this.myChart.setOption(setEchartOption({
        showParams: this.utilDatapoint,
        series: this.isHistory ? this.series[index] : this.series,
        dataEmpty: this.isEmpty,
        dataPoint: this.utilDatapoint,
        seriesObj: this.isHistory ? {
          seriesType: 'bar',
          yname: this.utilDatapoint.length > 0 ? this.utilDatapoint[index].comment + ' ' + '(' + this.utilDatapoint[index].unit + ')' : ''
        } : {},
        existdataZoom: true,
        existToolbox: true,
        existtooltip: true,
        showxAxisFormatter: true,
        existdataZoomRate: this.showPercent,
        timeShowFormat: JSON.parse(sessionStorage.getItem('historytimeShowFormat')),
        yAxis: this.yAxis,
        legend: this.isHistory ? {
          show: false
        } : {
          show: true,
          left: 50,
          selected: this.selectLegend
        },
        // color: this.series[index] && this.series[index].lineStyle ? this.series[index].lineStyle.color : ['22A2FD'],
        color: ['#2196f3', '#3ed943', '#fd5e9d'],
        gridLeft: 20 + this.yAxis.length * 30
      }), true)
    },
    getYData () {
      this.series = DeviceData.getDataPointSeries([{datapoint: this.utilDatapoint}], [this.allData], null, 'curve', 'themed', true, this.isHistory, this.isEmpty)
      this.yAxis = this.isHistory ? {} : DeviceData.getYAxisConfig(this.series, false)
    },
    showChart () {
      this.isShowTip = false
      this.getYData()
      if (this.series.length > 0) this.initChart(this.currentIndex)
    },
    adapatorCanvas (clear = false) {
      let this_ = this
      let fn = () => {
        if (Object.keys(this_.myChart).length > 0) {
          this_.myChart.resize()
        }
      }
      if (clear) {
        window.removeEventListener('resize', fn)
      } else {
        window.addEventListener('resize', fn)
      }
    },
    adaptLeft (t = 1500) {
      setTimeout(() => {
        if (Object.keys(this.myChart).length > 0) this.myChart.resize()
      }, t)
    },
    setLegend (datapoint) {
      let legendObj = {}
      datapoint.forEach(v => {
        legendObj[v.comment ? v.comment : v.key] = true
      })
      this.selectLegend = legendObj
    }
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById('historyData'))
    this.myChart.on('legendselectchanged', param => {
      this.selectLegend = param.selected
    })
  },
  beforeDestroy () {
    this.adapatorCanvas(true)
    if (Object.keys(this.myChart).length > 0) {
      this.myChart.clear()
      echarts.dispose(this.myChart)
      this.myChart = {}
    }
  },
  computed: {
    showTipTitle () {
      return (this.isEmpty === true || this.targetAllData.length === 1000) && !this.noPoint
    },
    tipContent () {
      return this.isHistoryModule
        ? this.isSelectedDev ? this.isShowEchart && this.utilDatapoint.length === 0 && !this.noPoint ? '请选择设备数据点' : '该设备无数据点' : '选择设备, 图表展示历史曲线'
        : this.isSelectedDev ? this.isShowEchart && this.utilDatapoint.length === 0 && !this.noPoint ? '请选择设备数据点' : '该设备无数据点' : '选择设备, 图表展示实时曲线'
    },
    showUploadImg () {
      return this.isShowEchart && !this.noPoint && this.isSelectedDev
    }
  },
  watch: {
    dataPoint (val) {
      this.setLegend(val)
      if (val.length > 0) {
        this.utilDatapoint = val
        this.isShowTip = false
        if (this.allData.length > 0) {
          this.showChart()
        } else {
          if (Object.keys(this.myChart).length > 0 && !this.isEmpty) {
            this.myChart.clear()
          }
        }
      } else {
        this.isShowTip = true
        if (Object.keys(this.myChart).length > 0) {
          this.myChart.clear()
        }
        this.utilDatapoint = []
      }
    },
    targetAllData (val) {
      if (val.length > 0 && this.isShowEchart) {
        this.allData = val
        if (this.dataPoint.length > 0) {
          this.showChart()
        }
      }
      if (val.length === 0 && this.isEmpty && this.isShowEchart) {
        this.allData = DeviceData.getEmptyData(this.dataPoint)
        if (this.dataPoint.length > 0) {
          this.showChart()
        }
      }
    }
    // isShowEchart (val) {
    //   if (!val) {
    //     if (Object.keys(this.myChart).length > 0) {
    //       this.myChart.clear()
    //     }
    //     this.utilDatapoint = []
    //   } else {
    //     this.utilDatapoint = this.dataPoint
    //     if (this.targetAllData.length > 0 && this.dataPoint.length > 0) {
    //       this.showChart()
    //     }
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  .config-echart-title {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100;
    cursor: pointer;
  }
  .uploadImg {
    position: absolute;
    top: 18px;
    right: 56px;
    color: #797b80;
    font-size: 12px;
  }
}
.tip-text {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 99;
  width: 100%;
  height: 400px;
  line-height: 400px;
  color: #606266;
  text-align: center;
  background-color: #fff;
  font-size: 14px;
}
#historyData {
  width: 100%;
}
.tip-data {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.more-tip {
  position: absolute;
  top: 16%;
  right: 30px;
  z-index: 8;
  font-size: 12px;
  color: #97999d;
}
</style>
