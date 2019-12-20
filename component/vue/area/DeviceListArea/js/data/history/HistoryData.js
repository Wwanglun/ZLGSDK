/* import ZlgCloudHelper from 'API/ZlgCloudHelper.js' */

import ZlgCloudHelper from '../../../../../../../sdk/js/api/http/httpModules/ZLGAssistant'
import ZlgApi from '../../../../../../../sdk/js/api/http/ZLGApi'
export function getDataCount (reqParam, callback) {
  ZlgCloudHelper.queryDeviceData(reqParam).then(res => {
    callback && callback(res)
  })
}
export function deleteData (reqParam, callback) {
  ZlgCloudHelper.deleteDeviceData(reqParam).then(res => {
    callback && callback(res)
  })
}
export function surePassword (reqParam, callback, errBack) {

  ZlgApi.ZLGUser.login(reqParam).then(res => {
    callback && callback(res)
  }).catch(err => {
    errBack && errBack(err)
  })
}
export function getSaveDataCount (reqParam) {
  return ZlgCloudHelper.queryDeviceData(reqParam).then(num => {
    return num.count
  })
}
export function clearDevData (reqParam, callback) {
  ZlgCloudHelper.clearDeviceData(reqParam).then(res => {
    callback && callback(res)
  })
}
export class SaveData {
  constructor (callback) {
    this.saveDataPercent = 0
    this.dropFlag = false // 为true时，中断获取历史数据的执行
    this.errFlag = 0 // 重试次数
    this.flagIndex = 0 // 数据请求已完成的次数
    this.saveData = [] // 要保存的数据
    this.maxLength = 0 // 请求次数
    this.callback = callback // 循环请求数据, 返回网络情况, 数据
  }
  init () {
    this.errFlag = 0
    this.flagIndex = 0
    this.saveData = []
  }
  toggleDropSaveData (value) {
    this.dropFlag = value
    if (value) { this.init() }
  }
  getAllSaveData (param, data) {
    if (param.num > 600000) {
      param.tipsCallBack({type: 'error'})
      return false
    }
    this.maxLength = Math.ceil(param.num / param.maxSize)
    data.skip = this.flagIndex * param.maxSize
    return ZlgCloudHelper.queryDeviceData(data).then(res => {
      if (!this.dropFlag) {
        this.flagIndex++
        var frozen = this.saveData.concat(res.data)
        this.saveData = Object.freeze(frozen)
        this.saveDataPercent = parseFloat(((this.flagIndex / this.maxLength) * 100).toFixed(2))
        param.tipsCallBack({type: 'progress'})
        if (this.flagIndex >= this.maxLength) {
          param.tipsCallBack({type: 'success'})
          this.toggleDropSaveData(true)
          return true
        }
      }
      (this.flagIndex < this.maxLength) && (this.errFlag < 3) && !this.dropFlag && this.getAllSaveData(param, data)
    }).catch(() => {
      if (!this.dropFlag) {
        this.errFlag++
        this.flagNum = (this.flagIndex + 1) <= this.maxLength ? (this.flagIndex + 1) : this.flagIndex
        param.tipsCallBack({type: 'disconnect'})
        if (this.errFlag <= 2) {
          if (this.maxLength) {
            (this.flagIndex < this.maxLength) && (this.errFlag < 3) && !this.dropFlag && this.getAllSaveData(param, data)
          } else {
            param.tipsCallBack({type: 'fail'})
          }
        }
        if (this.errFlag >= 3) {
          if (!this.saveData.length) {
            param.tipsCallBack({type: 'fail'})
            this.toggleDropSaveData(true)
          } else {
            param.tipsCallBack({type: 'broken'})
          }
          return true
        }
      }
    })
  }
}