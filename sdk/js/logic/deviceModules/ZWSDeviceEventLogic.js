
import ZLGDeviceEvent from '../../api/http/httpModules/ZLGDeviceEvent.js'
import ZWSDateTool from '../../tool/toolModules/ZWSDateTool.js'
import ZWSDeviceLogic from './ZWSDeviceLogic.js'
export class ZWSDeviceEventLogic {
  constructor (devtype, devid, eventtype) {
    this.devtype = devtype
    this.devid = devid
    this.eventtype = eventtype
    this.eventsData = []
  }
  /**
   * 获取设备事件（错误、日志）的搜索filter
   * @param {Object} searchOption 搜索的条件
   * @param {Array} devid 设备id
   */
  getSearchFilter (searchOption) {
    let filter = {
      devtype: this.devtype
    }
    if (this.eventtype) {
      filter.eventtype = this.eventtype
    }
    if (searchOption.startDate) {
      filter.time = {}
      filter.time.$gt = searchOption.startDate
    }
    if (searchOption.endDate) {
      if (!filter.time) {
        filter.time = {}
      }
      filter.time.$lt = searchOption.endDate
    }
    if (this.devid.length) {
      filter.devid = this.devid
    }
    return filter
  }
  /**
   * 获取设备日志、设备告警、设备错误数据列表
   * @param {String} getter 筛选条件
   * @param {Number} size 展示数量
   * @param {Number} currentPage 当前页数
   */
  getEventsData (getters, size, currentPage, allDevice) {
    let eventsData = []
    return ZLGDeviceEvent.getDeviceEvents({ devid: JSON.parse(getters).devid, devtype: JSON.parse(getters).devtype, filter: getters, descend: true, limit: size, skip: (currentPage - 1) * size }).then(res => {
      res && res.data.forEach(value => {
        let single = JSON.parse(JSON.stringify(value))
        single.time = ZWSDateTool.timestampToLocalDate((value.time + '').length === 10 ? value.time : parseInt(value.time / 1000))
        let names = ZWSDeviceLogic.getSelectedDeviceList([`${value.devid},${value.devtype}`], allDevice)
        if (names.length > 0) {
          single.devname = names[0].devname
        }
        eventsData.push(single)
      })
      return eventsData
    })
  }
  /**
   * 获取单个设备日志、设备告警、设备错误数据列表数量
   * @param {String} getter 筛选条件
   */
  getEventsCount (getters) {
    return ZLGDeviceEvent.getDeviceEvents({ devtype: JSON.parse(getters).devtype, filter: getters, aggregation: 'count', devid: JSON.parse(getters).devid }).then(res => {
      return res.count
    })
  }
  /**
   * 获取设备日志动态渲染内容表头
   * @param {*} devtype 系统所包含的所有的设备，以设备类型划分
   */
  getLogInfoKeys (allDevtype, devtype) {
    let logInfoKeys = []
    allDevtype.forEach(item => {
      if (devtype == item.devtype) {
        Object.keys(item.schema.logs).forEach(value => {
          if (item.schema.logs[value].args && !item.schema.logs[value].args.length) {
            Object.keys(item.schema.logs[value].args).forEach(keys => {
              logInfoKeys.push({prop: keys, value: '', label: item.schema.logs[value].args[keys].nickname || item.schema.logs[value].args[keys].comment, type: item.schema.logs[value].args[keys].type, error: ''})
            })
          }
        })
      }
    })
    return logInfoKeys
  }
}
export default ZWSDeviceEventLogic
