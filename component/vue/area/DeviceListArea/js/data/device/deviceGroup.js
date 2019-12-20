import {DeviceList} from '@/assets/js/device/deviceList.js'
import ZlgCloudHelper from 'API/ZlgCloudHelper.js'
let deviceList = new DeviceList()
/**
 * 根据选择的设备类型, 设置设备分类
 * 设备分类，包括默认设备(0)，通用网关(1,当前仅支持zigbee网关)，LoraWan节点(2)，LoraWan网关(3);该字段为空时，为默认设备(即mqtt设备)"
 */
export function setDevClass (devtype) {
  let showLora = devtype.indexOf('LoRaWAN_CLASS') > -1 && devtype.slice(-5) === 'OTAA'
  let showLoraGW = devtype === 'LoRaWAN_GATEWAY'
  let showLoraAbp = devtype.indexOf('LoRaWAN_CLASS') > -1 && devtype.slice(-3) === 'ABP'
  let devclass = 0
  switch (devtype) {
    case 'LoRaWAN_GATEWAY':
      devclass = 3
      break
    case 'lora_otaa_classA':
      devclass = 2
      break
    case 'lora_abp_classC':
      devclass = 2
      break
    case 'lora_abp_classA':
      devclass = 2
      break
    default:
      devclass = 0
  }
  return {showLora, showLoraAbp, devclass, showLoraGW}
}
/**
 * 获取设备分组信息
 * @param {Object} devgroup 分组请求信息
 * @param {Boolean} once 是否获取分组的数量
*/
export function getDeviceGroup (devgroup, once) {
  return ZlgCloudHelper.queryPlant({
    filter: devgroup.filter,
    skip: devgroup.getters.skip,
    limit: devgroup.getters.limit
  }).then(res_ => {
    if (once) {
      return ZlgCloudHelper.queryPlant({ filter: devgroup.filter, aggregation: 'count' }).then(res => {
        return {
          size: res.count,
          devGroupData: res_.data
        }
      })
    } else {
      return {
        devGroupData: res_.data
      }
    }
  })
}
/**
 * 删除设备分组
 * @param {Number} groupid 分组id
 * @param {Function} callback 删除分组成功后执行的函数
*/
export function deleteGroup (groupid, callback) {
  ZlgCloudHelper.deletePlant({ groupid }).then((res) => {
    callback && callback(res)
  })
}
/**
 * 修改或添加分组
 * @param {Number} groupid 设备分组id
 * @param {Object} form 包含分组名和分组描述信息
 * @param {String} way 调用api的方法名
 * @param {Function} callback 修改或添加分组成功执行的函数
*/
export function operateGroup (groupid, form, way, callback) {
  let reqParam = {}
  reqParam = groupid
    ? {
      groupid: groupid,
      info: {
        desc: form.desc,
        groupname: form.groupname
      }
    }
    : {
      desc: form.desc,
      groupname: form.groupname
    }
  ZlgCloudHelper[way](reqParam).then(res => {
    callback && callback(res)
  })
}
