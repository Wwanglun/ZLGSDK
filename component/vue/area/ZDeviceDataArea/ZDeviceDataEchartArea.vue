<template>
  <div class="z-device-data-table">
    <z-deviceData-search ref="dataSearch" :isEchart="isEchart" :searchArea="config.show.searchArea" :isDesc="isDesc" :selectTitle="selectTitle" @getBeforeLoad="loading = true" @getShowData="getShowData" @getAllTableTitle="getAllTableTitle"></z-deviceData-search>
    <z-device-data-echart
      moduleName="history_echart"
      v-loading="loading"
      :noPoint="noPoint"
      :dataPoint="selectTitle"
      :allTitle="allTitle"
      :isEmpty="isEmpty"
      :isSelectedDev="isSelectedDev"
      :targetAllData="targetAllData"
      :showPercent="percent"
      :isHistoryModule="true"
      :isShowEchart="isShowEchart"
      :showConfig="config.show.tableConfig[0].flag"
      :selectValueInfo="selectValueInfo"
      @getCustomTitle="getCustomTitle"
    ></z-device-data-echart>
  </div>
</template>
<script>
import ZDeviceDataSearch from './components/ZDeviceDataHead/ZDeviceDataSearch.vue'
import ZDeviceDataEchart from './components/ZDeviceDataEchart/ZDeviceDataEchart.vue'
import {DeviceData} from '../../../../sdk/js/logic/deviceModules/ZWSDeviceDataLogic.js'
import ZWSBaseLogic from '../../../../sdk/js/logic/ZWSBaseLogic.js'
import {setTableTitle} from './js/ZDeviceDataTitle.js'
export default {
  components: {
    ZDeviceDataSearch,
    ZDeviceDataEchart
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          show: {
            searchArea: [
              {nickname: '设备选择', flag: true, key: 'selectDevice'},
              {nickname: '时间选择框', flag: true, key: 'selectTime'},
              {nickname: '清空数据', flag: true, key: 'clearData'},
              {nickname: '删除数据', flag: true, key: 'deleteData'},
              {nickname: '下载数据', flag: true, key: 'downloadData'}
            ],
            tableColumn: [
              {nickname: '温度', flag: true, key: 'temperature', width: 150, type: 'number'},
              {nickname: '今日发电量', flag: true, key: 'today_energy', width: 150, type: 'number'},
              {nickname: '总发电量', flag: true, key: 'total_energy', width: 150, type: 'number'}
            ],
            tableConfig: [
              {nickname: '数据点配置框', flag: false, key: 'tableColumConfig'}
            ]
          }
        }
      }
    }
  },
  created () {
    this.default = ZWSBaseLogic.getExportConfig(this.config)
  },
  data () {
    return {
      allTitle: [],
      isDesc: true,
      noPoint: true,
      tipText: '请选择设备',
      selectTitle: [],
      default: {},
      isEchart: true,
      isEmpty: true,
      targetAllData: [],
      isSelectedDev: false,
      percent: 100,
      isShowEchart: true,
      loading: false,
      selectValueInfo: {}
    }
  },
  methods: {
    getShowData (data) {
      this.loading = false
      this.isEmpty = data.length === 0
      this.percent = data.length / 1000 * 90
      this.targetAllData = data
    },
    getAllTableTitle (val) {
      this.isSelectedDev = true
      this.isEmpty = true
      this.targetAllData = []
      this.loading = false
      this.selectValueInfo = val.dev
      if (!val.devtype || Object.values(val.devtype.schema.data).filter(v => v.type === 'number').length === 0) {
        this.noPoint = true
        this.isShowEchart = false
        this.tipText = '该设备类型无数据点'
        this.selectTitle = []
      } else {
        this.noPoint = false
        this.tipText = '请选择设备'
        this.isShowEchart = true
        if (this.config.show.tableConfig[0].flag) {
          this.allTitle = DeviceData.setDatapoint(Object.keys(val.devtype.schema.data), val.devtype.schema.data, true).filter(v => v.type === 'number')
          this.selectTitle = this.allTitle.slice(0, 3)
        } else {
          this.allTitle = setTableTitle(this.config.show.tableColumn)
          this.selectTitle = this.allTitle.filter(v => v.type === 'number').slice(0, 3)
        }
      }
    },
    getCustomTitle (title) {
      this.selectTitle = title
    }
  },
  watch: {
    config () {
      this.default = ZWSBaseLogic.getExportConfig(this.config)
    }
  }
}
</script>


