import ZLGDevice from '../../api/http/httpModules/ZLGDevice.js'
import ZWSBaseLogic from '../ZWSBaseLogic'
import ZWSBaseTool from '../../tool/toolModules/ZWSStringTool.js'
/**
 * 设备管理logic
 */
class ZWSDeviceLogic extends ZWSBaseLogic {
  static getDevicesTable ({
    content,
    pageSize,
    currentPage,
    descend,
    filter,
    aggregation,
    devtype
  }) {
    let contentStr = {
      $or: [
        {
          devid: {
            $regex: ZWSBaseTool.symbolEscapeString(content),
            $options: 'i'
          }
        },
        {
          devname: {
            $regex: ZWSBaseTool.symbolEscapeString(content),
            $options: 'i'
          }
        }
      ]
    }
    filter = JSON.stringify(Object.assign(JSON.parse(filter), contentStr))
    let limit = pageSize || 0
    let skip = currentPage ? (currentPage - 1) * pageSize : 0
    let deviceList = []
    let deviceCount = 0
    return new Promise((resolve, reject) => {
      ZLGDevice.getDevicesList({
        limit: limit,
        skip: skip,
        descend: descend,
        filter: filter,
        devtype: devtype
      })
        .then(res => {
          deviceList = res.data
          aggregation &&
            ZLGDevice.getDevicesList({
              aggregation: 'count',
              filter: filter,
              devtype: devtype
            })
              .then(count => {
                deviceCount = count.data.count
                deviceList.forEach(item => {
                  item.created_time = ZWSBaseTool.timestampToLocalDate(
                    item.created_time
                  )
                  item.state = this.getDeviceStatus(item.status, item.fault) // 输出设备的状态
                })
                let result = {
                  deviceList: deviceList.slice(skip, limit + 1),
                  deviceCount: deviceCount
                }
                if (!devtype) {
                  result.deviceList = deviceList.slice(skip, limit + 1)
                }
                resolve(result)
              })
              .catch(err => {
                reject(err)
              })
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   * 筛选设备的在线正常、在线异常、离线、总数
   */
  static summaryDevicesStatus (deviceList) {
    let result = {
      deviceCount: deviceList.length,
      onlineNormal: 0,
      onlineAbnormal: 0,
      offline: 0
    }
    deviceList.forEach(item => {
      let status = this.formatDevStatus(item.status, item.fault)
      if (status == 'offline') {
        result.offline += 1
      } else if (status == 'onlineNormal') {
        result.onlineNormal += 1
      } else if (status == 'onlineAbnormal') {
        result.onlineAbnormal += 1
      }
    })
    return result
  }
  /**
   * 根据status和fault字段，动态定义设备的在线正常、在线异常、离线状态
   * @param {Number} status
   * @param {Number, undefined} fault
   */
  static getDeviceStatus (status, fault) {
    const offline = 'offline' // 离线
    const onlineNormal = 'onlineNormal' // 在线正常
    const onlineAbnormal = 'onlineAbnormal' // 在线异常
    if (typeof status === 'number') {
      if (status === 0) {
        if (!Number(fault)) {
          return onlineNormal
        } else if (fault && fault == 1) {
          return onlineAbnormal
        }
      } else {
        return offline
      }
    } else {
      return offline
    }
  }
  /**
   * 设备多选使用， 根据选择设备的设备id、设备类型和所有的设备返回选中设备的所有信息
   * @param {Number} status
   * @param {Number, undefined} fault
   */
  static getSelectedDeviceList (selectedDevice, allDevice) {
    let deviceListData = []
    selectedDevice.length && selectedDevice.forEach(value => {
      Object.keys(allDevice).forEach(item => {
        allDevice[item].forEach(key => {
          // eslint-disable-next-line
          if (`${key.devid},${key.devtype}` == value) {
            deviceListData.push(key)
          }
        })
      })
    })
    return deviceListData
  }
  /**
   * 把传入的设备以设备类型分类输出，输出的结果为Object类型
   */
  static getTypeDevices (devices) {
    const result = {}
    console.log(devices)
    devices.forEach(value => {
      let single = {}
      single = value
      single.status = value.status
      single.label = value.devname
      single.value = value.devid
      if (value.devid && !result[single.devtype]) {
        result[single.devtype] = []
        result[single.devtype].push(single)
      } else if (value.devid && result[single.devtype]) {
        result[single.devtype].push(single)
      }
    })
    return result
  }
  /* 获取所有设备 */
  static initDevices () {
    return ZLGDevice.getDevicesList().then(res => {
      let devices = this.getTypeDevices(res.data)
      let deviceList = []
      Object.keys(devices).forEach(item => {
        devices[item].forEach(value => {
          deviceList.push({ devtype: value.devtype, devid: value.devid })
        })
      })
      return {list: deviceList, obj: devices}
    })
  }
  /**
   * 把传入的设备以设备类型分类输出，输出的结果为Object类型
   */
  static getTypeDevices (devices) {
    const result = {}
    devices.forEach(value => {
      let single = {}
      single = value
      single.status = value.status
      single.label = value.devname
      single.value = value.devid
      if (value.devid && !result[single.devtype]) {
        result[single.devtype] = []
        result[single.devtype].push(single)
      } else if (value.devid && result[single.devtype]) {
        result[single.devtype].push(single)
      }
    })
    return result
  }
  /**
   * 模板字段，添加设备过滤掉不必要的字段信息
   * @param {*} basetype 基础设备类型模板
   * @param {*} formData 添加设备信息的表单
   * @param {*} schema 设备不同的设备类型包含的字段
   */
  static addDeviceInitInfo (basetype, formData, schema) {
    let info = {}
    schema.forEach(item => {
      if (item.type == basetype) {
        Object.keys(formData).forEach(value => {
          Object.keys(item.memo).forEach(key => {
            if (key === value && !item.memo[key].autoGen) {
              info[value] = formData[value]
            }
          })
        })
      }
    })
    return info
  }
  /**
  * 根据添加设备选择的设备类型，动态校验设备ID的长度
  * @param {String} devtype 
  * @param {Object} schema 
  * @param {Array} allDevtype 
  */
  static filterDevid (devtype, schema, allDevtype) {
    let newData = {}
    let devtypeInfo = {}
    let devtypeArray = allDevtype.filter(v => v.devtype == devtype)
    if (devtypeArray.length) {
      devtypeInfo = devtypeArray[0]
      newData = devtypeInfo.schema.memo.devid
    } else {
      devtypeInfo = schema.filter(v => v.type == devtype)[0]
      newData = devtypeInfo.memo.devid
    }
    return newData
  }
}
export default ZWSDeviceLogic
