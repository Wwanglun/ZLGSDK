<template>
  <div class="z-device-data-table">
    <z-deviceData-search ref="dataSearch" :searchArea="config.show.searchArea" :isDesc="isDesc" :filter="filter" :selectTitle="selectTitle" @getCount="getCount" @getShowData="getShowData" @getAllTableTitle="getAllTableTitle"></z-deviceData-search>
    <div class="table-history">
      <div class="table-wrap" v-show="noPoint">{{tipText}}</div>
      <!-- <div class="table-wrap" v-loading="loading"></div> -->
      <z-table-ctrl
        v-if="!noPoint"
        ref="tableCtrl"
        moduleName="history"
        :tableColumn="config.show.tableColumn"
        :showTableConfig="config.show.tableConfig[0].flag"
        :total="total"
        :customTitle="true"
        :allTitle="allTitle"
        :tableData="tableData"
        :selectValueInfo="selectValueInfo"
        :isToggle="isToggle"
        :showTime="true"
        @changeSize="changeSize"
        @changePage="changePage"
        @getSort="getSort"
        @getFilter="getFilter"
        @getCustomTitle="getCustomTitle"
      ></z-table-ctrl>
    </div>
  </div>
</template>
<script>
import ZDeviceDataSearch from './components/ZDeviceDataHead/ZDeviceDataSearch.vue'
import {DeviceData} from '../../../../sdk/js/logic/deviceModules/ZWSDeviceDataLogic.js'
import ZTableCtrl from '../../ctrl/ZTableCtrl/ZTableCtrl.vue'
import ZWSBaseLogic from '../../../../sdk/js/logic/ZWSBaseLogic.js'
import {setTableTitle} from './js/ZDeviceDataTitle.js'
export default {
  components: {
    ZDeviceDataSearch,
    ZTableCtrl
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
              {nickname: '下载数据', flag: true, key: 'downloadData'},
              {nickname: '原始数据配置', flag: true, key: 'dataConfig'}
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
      currentPage: 1,
      size: 10,
      total: 0,
      tableData: [],
      allTitle: [],
      isDesc: false,
      filter: {},
      noPoint: true,
      tipText: '请选择设备',
      selectTitle: [],
      default: {},
      selectValueInfo: {},
      isToggle: true
    }
  },
  methods: {
    changeSize (size) {
      this.size = size
      this.$refs.dataSearch.getSize(size)
    },
    changePage (page) {
      this.currentPage = page
      this.$refs.dataSearch.getPage(page)
    },
    getCount (total) {
      this.total = total
    },
    getShowData (data) {
      this.tableData = DeviceData.setTableData(data, this.allTitle).tableData
    },
    getAllTableTitle (val) {
      this.tableData = []
      this.total = 0
      this.filter = {}
      this.selectValueInfo = val.dev
      this.isToggle = !this.config.show.tableConfig[0].flag
      if (!val.devtype || Object.keys(val.devtype.schema.data).length === 0) {
        this.noPoint = true
        this.tipText = '该设备类型无数据点'
      } else {
        this.noPoint = false
        this.tipText = '请选择设备'
        if (this.config.show.tableConfig[0].flag) {
          this.allTitle = DeviceData.setDatapoint(Object.keys(val.devtype.schema.data), val.devtype.schema.data, true)
        } else {
          this.allTitle = setTableTitle(this.config.show.tableColumn)
          this.selectTitle = this.allTitle
        }
      }
    },
    getSort (sort) {
      this.isDesc = sort
      this.$refs.dataSearch.showTableData(sort)
    },
    getFilter (filter) {
      this.filter = filter.filter.$and && filter.filter.$and.length > 0 ? filter.filter : {}
      this.$refs.dataSearch.search(this.filter)
    },
    getCustomTitle (title) {
      this.isToggle = true
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
<style scoped>
.table-history {
  position: relative;
}
.table-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  line-height: 400px;
  color: #606266;
  text-align: center;
  background-color: #fff;
  font-size: 14px;
}
</style>

