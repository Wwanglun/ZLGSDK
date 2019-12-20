
import ZLGDeviceType from '../../../../../../sdk/js/api/http/httpModules/ZLGDeviceType'
/* import ZWebSocket from 'API/websocket.js'
import ZlgCloudHelper from "API/ZlgCloudHelper.js" */
/* 
class WebSocketUtitl {
  static _websocket = null
  static _websocketCallBacks = new Map()
  static _peddingTasks = new Set()
  static _openListener = null
  static initWebSocket (token) {
    if ((this._websocket && this.getWebSocketState() === 1) || !token) {
      return
    }
    this.closeWebSocket()
    const url = ZlgCloudHelper.docUrl().replace('https://', '')
    this._websocket = new ZWebSocket('wss://' + url + ':8403', token, res => {
      for (const [key, value] of this._websocketCallBacks.entries()) {
        value(res)
      }
    })
    this._openListener = (ev) => {
      this._peddingTasks.forEach(value => {
        value()
      })
    }
    this._websocket.webSocket.addEventListener('open', this._openListener)
  }
  static registListener (callback) {
    if (typeof callback === 'function') {
      this._websocketCallBacks.set(callback, callback)
    }
  }
  static unregisterListener (callback) {
    if (typeof callback === 'function') {
      this._websocketCallBacks.delete(callback)
    }
  }
  static getWebSocketState () {
    if (this._websocket) {
      return this._websocket.webSocket.readyState
    }
    return WebSocket.CLOSED
  }
  static addDataListener (data) {
    const task = () => {
      this._websocket.send(JSON.stringify({action: 'addListener', data}))
    }
    if (this.getWebSocketState() === WebSocket.OPEN) {
      task()
    } else {
      this._peddingTasks.add(task)
    }
  }
  static removeDataListener (data) {
    const task = () => {
      this._websocket.send(JSON.stringify({action: 'removeListener', data}))
    }
    if (this.getWebSocketState() === WebSocket.OPEN) {
      task()
    } else {
      this._peddingTasks.add(task)
    }
  }
  static closeWebSocket () {
    this._websocketCallBacks.clear()
    this._peddingTasks.clear()
    if (this._websocket) {
      if (this._openListener) {
        this._websocket.webSocket.removeEventListener('open', this._openListener)
      }
      this._openListener = null
      this._websocket.close()
    }
    this._websocket = null
  }
}

const colors = ["#3ce1eb", "#9fe140", "#ff5a7c", "#6e56fb", "#3cdfcb", "#bfe540", "#b55cf9", "#3ccff3", "#7edf46", "#ff7446", "#fd5e9d", "#4e52fd", "#3cdfab", "#e3e940", "#d75ef9", "#3eb7f5", "#5adb44", "#ff8f42", "#ff62c1", "#3c68f9", "#3cdb87", "#f7dd40", "#f966f9", "#409ff9", "#3ed943", "#fba942", "#fd62e5", "#3885f9", "#36d764", "#fdc33a", "#ababab", "#8f58f"]

/**
 * 默认总数超过5000则需要递归请求
 * @param {Number} count 总数
 * @param {Number} filter 接口的过滤条件
 * @param {Array} data 请求回来的数据
 * @param {Function} callback 接口函数
*/
const recursiveCycle = function (callback, count, filter, data) {
  let size = 5000
  let originData = data || []
  let newData = []
  // eslint-disable-next-line
  
  callback = ZLGDeviceType.getDevtypesList || callback
  
  return ZLGDeviceType.getDevtypesList({ filter: filter, skip: originData.length, limit: size }).then(res => {
    newData = originData.concat(res.data)
    if ((count > originData.length) && (res.data.length == size)) {
      return recursiveCycle(callback, count, filter, newData)
    } else {
      return newData
    }
  })
}

/*
* 获取设备是否有权限，如果传入的设备数组中全部有权限才返回true，否则返回fasle
* @param {Object} userInfo 登录时返回的用户信息
* @param {Array} devs 需要判断权限的设备 [{devtype: 'invert', devid: 'invert1'}, {devtype: 'candtu200', devid: 'cd01'}, ...]
* 
*
*/

const getIsAccessDev = (userInfo, devs) => {
  if (userInfo.role === 0) {
    return true
  }
  let devList = []
  let devsObj = {}
  let isAccess = true
 
  let accesses = false
   if (!userInfo) {
     return
    } else if (!userInfo.accessControllerList ) {
      return
    }

  accesses = userInfo.accessControllerList.filter(v => v.name.slice(-3) === 'dev')
  accesses.forEach(acc => {
    let idArr = []
    if (acc.statement.resource[0] == '*' && acc.statement.resource.length === 1) {
      idArr = []
    } else {
      idArr = acc.statement.resource || []
    }
    devList.push(...idArr)
  })
  devList.forEach(item => {
    let devid = item.split('?devtype=')[0]
    let devtype = item.split('?devtype=')[1]
    if (!devsObj[devtype]) {
      devsObj[devtype] = []
    }
    if (!devsObj[devtype].find(v => v.devid === devid)) {
      devsObj[devtype].push(devid)
    }
  })
  devs.forEach(item => {
    let AccessDevlist = devsObj[item.devtype] || []
    if (isAccess && !AccessDevlist.includes(item.devid)) {
      isAccess = false
    }
  })
  return isAccess
}/* */
export { WebSocketUtitl, colors, recursiveCycle, getIsAccessDev }
