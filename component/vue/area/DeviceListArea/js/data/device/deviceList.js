// import ZlgCloudHelper from 'API/ZlgCloudHelper.js'
import { timestampToTimeForService } from '../util/utils.js'
import {formatDevStatus} from '../util/device.js'
export class DeviceList {
  /**
   * 输出分组下拉选择框的数据
   * @param {Object} data 所有的以设备分组列表数据
   */
  getGroupList (data) {
    const deviceGroupOptions = []
    data.forEach(item => {
      const group = {}
      group.label = item.groupname
      group.value = item.groupid
      deviceGroupOptions.push(group)
    })
    return deviceGroupOptions
  }
  /**
   * 输出设备列表渲染的单条数据
   * @param {Object} value 单条设备信息数据
   */
  getDeviceTableRow (value) {
    if (value) {
      let single = {}
      single.status = formatDevStatus(value.status, value.fault)
      single.devid = value.devid
      single.devname = value.devname
      single.devtype = value.devtype
      single.Serial = value.Serial ? value.Serial : '--'
      single.offlinetime = typeof value.offlinetime == 'number' ? timestampToTimeForService(value.offlinetime) : (value.offlinetime ? value.offlinetime : '--')
      single.onlinetime = (typeof value.onlinetime == 'number' && value.onlinetime) ? timestampToTimeForService(value.onlinetime) : (value.onlinetime ? value.onlinetime : '--')
      single.newFM = value.newfm && value.newfm.isnew ? '有' : '无'
      single.longitude = value.gps && value.gps.longitude
      single.latitude = value.gps && value.gps.latitude
      single.devsecret = value.devsecret ? value.devsecret : '--'
      return single
    }
  }
  /**
   * 所有设备
   * @param {Object} allDevice 
   */
  getDeviceState (allDevice, stateData) {
    stateData.forEach(item => {
      item.value = 0
    })
    let position = []
    Object.keys(allDevice).forEach(item => {
      allDevice[item].forEach(i => {
        if (i.gps) {
          let single = {}
          // single.status = 0
          single.latitude = i.gps.latitude
          single.longitude = i.gps.longitude 
          position.push(single)
        }
        if (formatDevStatus(i.status, i.fault) == 0) {
          stateData[0].value += 1
        } else if (formatDevStatus(i.status, i.fault) == 2) {
          stateData[1].value += 1
        } else {
          stateData[2].value += 1
        }
      })
    })
    return {stateData: stateData, position: position}
  }
  /**
   * 把传入的设备以设备类型分类输出，输出的结果为Object类型
   */
  getTypeDevices (devices) {
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
   * 根据接口请求返回的设备数组数据整理成 {设备类型: [设备id]}的格式
   * @param {*} devices 所有的设备 传入数据格式：[{id: 'test', type: 'candtu}]
   */
  classificationBydevice (devices, allDevice) {
    let devtypeObject = {}
    devices && devices.forEach(item => {
      Object.keys(allDevice).forEach(value => {
        allDevice[value].forEach(v => {
          if (v.devtype == item.type && v.devid == item.id) {
            let single = JSON.parse(JSON.stringify(v))
            single.value = v.devid
            single.label = v.devname
            if (!devtypeObject[item.type]) {
              devtypeObject[item.type] = []
              devtypeObject[item.type].push(single)
            } else {
              devtypeObject[item.type].push(single)
            }
          }
        })
      })
    })
    return devtypeObject
  }
  /**
   * 模板字段，添加设备过滤掉不必要的字段信息
   * @param {*} basetype 基础设备类型模板
   * @param {*} formData 添加设备信息的表单
   * @param {*} schema 设备不同的设备类型包含的字段
   */
  addDeviceInitInfo (basetype, formData, schema) {
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
  filterDevid (devtype, schema, allDevtype) {
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
