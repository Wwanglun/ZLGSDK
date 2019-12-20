<template>
  <div class="z-log-table">
    <z-table-ctrl
      :allTitle="allTitle"
      :tableData="tableData"
      :customTitle="true"
      :showTableConfig="showTableConfig"
      :allDevice="allDevice"
      :total="total"
      :sizes="[10, 20, 50, 100, 150, 500]"
      @getFilter="getFilter"
      @getStorageConfig="getStorageConfig"
      @changeSize="changeSize"
      @changePage="changePage"
    ></z-table-ctrl>
  </div>
</template>
<script>
import ZTableCtrl from '../../../ctrl/ZTableCtrl/ZTableCtrl.vue'
import ZWSDeviceEventLogic from '../../../../../sdk/js/logic/deviceModules/ZWSDeviceEventLogic.js'
export default {
  components: {
    ZTableCtrl
  },
  props: {
    tableColumn: {
      type: Array,
      default: () => []
    },
    showTableConfig: {
      type: Boolean,
      default: false
    },
    searchFilter: {},
    allDevice: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      allTitle: [],
      tableData: [],
      tableFilter: {},
      size: 10,
      currentPage: 1,
      total: 0
    }
  },
  created () {
    this.getAllTitle()
  },
  methods: {
    getAllTitle () {
      let title = []
      this.tableColumn.forEach(item => {
        if (item.flag) {
          let single = {}
          single.label = item.nickname
          single.prop = item.key
          single.width = item.width
          if (item.key === 'level') {
            single.type = 'number'
            single.isCustom = true
          }
          if (item.key === 'info') {
            single.type = 'string'
            single.isCustom = true
          }
          if (item.key === 'time') {
            single.disabled = true
          }
          title.push(single)
        }
      })
      this.allTitle = title
    },
    getStorageConfig (config) {
      console.log(config)
    },
    getFilter (filter) {
      this.tableFilter = filter.filter.$and && filter.filter.$and.length > 0 ? filter.filter : {}
      this.currentPage = 1
      this.searchLog(this.searchFilter)
    },
    searchLog (searchFilter, isCount = true, devs) {
      let getter = {}
      Object.assign(getter, this.tableFilter, searchFilter)
      let event = new ZWSDeviceEventLogic(getter.devid, getter.devtype, 'log')
      event.getEventsData(JSON.stringify(getter), this.size, this.currentPage, devs || this.allDevice).then(res => {
        this.tableData = res
      })
      isCount && event.getEventsCount(JSON.stringify(getter)).then(count => {
        this.total = count
      })
    },
    changeSize (size) {
      this.size = size
      this.searchLog(this.searchFilter, false)
    },
    changePage (page) {
      this.currentPage = page
      this.searchLog(this.searchFilter, false)
    }
  }
}
</script>

