<template>
  <div class="z-deviceLog-area">
    <z-search-filter @filter="filter" @getDevices="getDevices" v-if="config.show.searchArea[0].flag"></z-search-filter>
    <z-log-table ref="logTable" :allDevice="allDevice" :tableColumn="config.show.tableColumn" :showTableConfig="config.show.tableConfig[0].flag" :searchFilter="searchFilter"></z-log-table>
  </div>
</template>
<script>
import ZLGApi from '../../../../sdk/js/api/http/ZLGApi.js'
import ZSearchFilter from './components/ZSearchFilter.vue'
import ZLogTable from './components/ZLogTable.vue'
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          show: {
            searchArea: [{nickname: '搜索区域', flag: true, key: 'searchArea', width: 150}], 
            tableColumn: [
              {nickname: '日志名称', flag: true, key: 'name', width: ''},
              {nickname: '日志等级', flag: true, key: 'level', width: ''},
              {nickname: '日志信息', flag: true, key: 'info', width: ''},
              {nickname: '设备名称', flag: true, key: 'devname', width: ''},
              {nickname: '设备ID', flag: true, key: 'devid', width: ''},
              {nickname: '日志时间', flag: true, key: 'time', width: ''}
            ],
            tableConfig: [
              {nickname: '数据点配置框', flag: false, key: 'tableColumConfig'}
            ]
          },
          deviceInfo: {
            devid: '10A10000B0D5CCBD9BC6',
            devtype: 'candtu-400'
          }
        }
      }
    }
  },
  components: {
    ZSearchFilter,
    ZLogTable
  },
  data () {
    return {
      searchFilter: {},
      allDevice: {},
      default: {}
    }
  },
  created () {
    this.getExportConfig()
    ZLGApi.init()
    !this.config.show.searchArea[0].flag && this.getSingleDeviceInfo()
  },
  methods: {
    getSingleDeviceInfo () {
      ZLGApi.ZLGDevice.getDeviceInfo(this.config.deviceInfo).then(res => {
        let dev = {}
        dev[res.devtype] = [res]
        this.allDevice = dev
        this.searchFilter = this.config.deviceInfo
        this.$refs.logTable.searchLog(this.config.deviceInfo, true, dev)
      })
    },
    filter (filter) {
      this.searchFilter = filter
      this.$refs.logTable.searchLog(filter)
    },
    getDevices (dev) {
      this.allDevice = dev
    },
    getExportConfig () {
      let $default = {}
      Object.entries(this.config).forEach(item => {
        if (item[0] === 'show') {
          $default[item[0]] = {}
          Object.entries(item[1]).forEach(v => {
            $default[item[0]][v[0]] = []
            v[1].forEach(_v => {
              let single = {}
              Object.assign(single, _v, {flag: true})
              $default[item[0]][v[0]].push(single)
            })
          })
        } else {
          $default[item[0]] = item[1]
        }
      })
      this.default = $default
    }
  },
  computed: {
  },
  watch: {
    config () {
      this.getExportConfig()
    }
  }
}
</script>
<style scoped>
.z-deviceLog-area {
  background-color: #fff;
}
</style>
