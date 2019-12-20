/**
 * 页面滚动动画
 * @param {number} currentY 需要移动的dom当前位置离网页顶端的距离
 * @param {number} targetY 需要移动的dom当前位置离要移到的位置的距离
 */
export function scroll (currentY, targetY) {
  const differenceTop = targetY - currentY
  let _currentY = currentY
  setTimeout(function () {
    const dist = Math.ceil(differenceTop / 6)
    _currentY += dist
    window.scrollTo(_currentY, currentY)
    if (differenceTop > 6 || differenceTop < -6) {
      scroll(_currentY, targetY)
    } else {
      window.scrollTo(_currentY, targetY)
    }
  }, 1)
}
/**
 * 函数的防抖操作，主要用户错误提示，搜索延迟
 * @param {Funtion} func 需要执行的函数
 * @param {Number} delay 执行的函数延迟时间
 */
export function debounce (func, delay) {
  var lastTimer
  return function () {
    let _this = this, args = arguments
    if (lastTimer) {
      clearTimeout(lastTimer)
    }
    lastTimer = setTimeout(function () {
      func.apply(_this, args)
    }, delay)
  }
}
/**
 * 时间戳转时间格式：例如：2017-01-01
 * @param {number} timestamp 后端返回的utc时间戳（设备时间）
 */
export function timestampToTime (timestamp) {
  const date = new Date(timestamp * 1000)
  console.log(date)
  const Y = date.getUTCFullYear() + '-'
  const M =
    (date.getUTCMonth() + 1 < 10
      ? '0' + (date.getUTCMonth() + 1)
      : date.getUTCMonth() + 1) + '-'
  const D =
    date.getUTCDate() < 10
      ? '0' + date.getUTCDate() + '  '
      : date.getUTCDate() + '  '
  const H =
    (date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()) +
    ':'
  const Minute =
    (date.getUTCMinutes() < 10
      ? '0' + date.getUTCMinutes()
      : date.getUTCMinutes()) + ':'
  const S =
    date.getUTCSeconds() < 10
      ? '0' + date.getUTCSeconds()
      : date.getUTCSeconds()
  return Y + M + D + H + Minute + S
}

/**
 * 本地时间转utc时间戳，需要注意的是：需要减去 格林威治时间和本地时间之间的时差
 * @param {number} time 为标准格式的时间
 */
export function timeToTimestamp (time) {
  if (time) {
    return (
      (new Date(time).getTime() - new Date(time).getTimezoneOffset() * 60000) /
      1000
    )
  } else {
    return (
      (new Date().getTime() - new Date(time).getTimezoneOffset() * 60000) / 1000
    )
  }
}

/**
 * 时间戳转时间格式：例如：2017-01-01
 * @param {number} timestamp 后端返回的时间戳（服务端时间）
 */
export function timestampToTimeForService (timestamp) {
  let date = 0
  if ((timestamp + '').length == 10) {
    date = new Date(timestamp * 1000)
  } else {
    date = new Date(timestamp)
  }
  const Y = date.getFullYear() + '-'
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  const D =
    date.getDate() < 10
      ? '0' + date.getDate() + '  '
      : date.getDate() + '  '
  const H =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':'
  const Minute =
    (date.getMinutes() < 10
      ? '0' + date.getMinutes()
      : date.getMinutes()) + ':'
  const S =
    date.getSeconds() < 10
      ? '0' + date.getSeconds()
      : date.getSeconds()
  return Y + M + D + H + Minute + S
}

export function formatDate (d1, format) {
  if (d1 instanceof Date) {
    var date = {
      'M+': d1.getMonth() + 1,
      'd+': d1.getDate(),
      'h+': d1.getHours(),
      'm+': d1.getMinutes(),
      's+': d1.getSeconds(),
      'q+': Math.floor((d1.getMonth() + 3) / 3),
      'S+': d1.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (d1.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('00' + date[k]).length - RegExp.$1.length))
      }
    }
    return format
  }
}

/**
 * 运用js中递归的思想，循环深度删除指定对象中的属性
 * @param {Object} obj 要删除指定属性的对象
 * @param {String} keys 删除属性的名称
 * @param {Boolean} flag true为删除属性本身，false为值删除指定属性下的所有属性，使之成为空对象
 * @example 1、removeKeys(obj, 'DO') 这就是只删除obj.DO 下面的所有属性，是obj.DO={}，也就是变成空对象。
 * 2、removeKeys(obj, 'DO', true) 这就是直接删除obj.DO 下面的所有属性，包括obj下面的DO属性也直接删除了。
 * 因为 js原生的delete 函数不会深度删除对象，也就是如果 obj.DO = {Long: 100, Lat: 200}, delete obj.DO 会得出结果为 obj = {Long: 100, Lat: 200}
 */
export function deleteKey (obj, keys, flag = false) {
  if (typeof obj[keys] === 'object' && !flag) {
    for (const d in obj[keys]) {
      deleteKey(obj[keys], d)
    }
  } else if (typeof obj[keys] === 'object' && flag) {
    delete obj[keys]
    for (const k in obj) {
      deleteKey(obj, k, flag)
    }
  } else {
    delete obj[keys]
  }
}

/**
 * 格式化json文本
 */
export const getFormatJsonStrFromString = (jsonStr) => {
  let res = ''
  for (let i = 0, j = 0, k = 0, ii, ele; i < jsonStr.length; i++) {
    ele = jsonStr.charAt(i)
    if (j % 2 === 0 && ele === '}') {
      k--
      for (ii = 0; ii < k; ii++) {
        ele = '    ' + ele
      }
      ele = '\n' + ele
    } else if (j % 2 === 0 && ele === '{') {
      ele += '\n'
      k++
      for (ii = 0; ii < k; ii++) {
        ele += '    '
      }
    } else if (j % 2 === 0 && ele === ',') {
      ele += '\n'
      for (ii = 0; ii < k; ii++) {
        ele += '    '
      }
      for (ii = 0; ii < k; ii++) {}
      // eslint-disable-next-line
    } else if (ele === '\"') {
      j++
    }
    res += ele
  }
  return res
}

/**
 * 设备日志特殊字符需要转义
 */

export const transferenceStr = (str) => {
  if (typeof str !== 'string') {
    return str
  }
  // eslint-disable-next-line
  let regex = new RegExp("[*'.?+$^\\[\\](){}|/%@!#\\\\]", 'gim')
  return str.replace(regex, '\\$&')
}
// module.exports = {
//   scroll,
//   timestampToTime,
//   timeToTimestamp
// }

/**
 *  数组相关工具类
 */
export const ArrayUtils = {
  // 数组去重
  unique (arr) {
    var hash = []
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          ++i
        }
      }
      hash.push(arr[i])
    }
    return hash
  }
}
/**
 * 日期相关工具类
 */
export const DateUtils = {
  /**
   * 获取当前月份第一天
   */
  getCurrentMonthFirst () {
    var date = new Date()
    date.setDate(1)
    var month = parseInt(date.getMonth() + 1)
    var day = date.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    return date.getFullYear() + '-' + month + '-' + day
  },
  /**
   * 获取当前月份最后一天
   */
  getCurrentMonthLast () {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    var day = new Date(year, month, 0)
    var lastdate = year + '-' + month + '-' + day.getDate()
    return lastdate
  },
  /**
   *  获取当下时间
   */
  getNowFormatDate () {
    var date = new Date()
    var seperator1 = '-'
    var seperator2 = ':'
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate =
      date.getFullYear() +
      seperator1 +
      month +
      seperator1 +
      strDate +
      ' ' +
      date.getHours() +
      seperator2 +
      date.getMinutes() +
      seperator2 +
      date.getSeconds()
    return currentdate
  }
}
/**
 * 异步加载地图
 * @param {*} ak
 */
export function loadBMap (ak, isMarker) {
  return new Promise(function (resolve, reject) {
    if (typeof BMap !== 'undefined') {
      if (isMarker) addScript()
      resolve(BMap)
      return true
    }
    window.onBMapCallback = function () {
      if (isMarker) addScript()
      resolve(BMap)
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=onBMapCallback'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
function addScript () {
  let jsSrc = ['https://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js', 'https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js']
  jsSrc.forEach(src => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)
  })
}

/**
* 执行promise队列
* @param {Array<() => Promise>} promiseHandlers
* @param {boolean} avoidError
*/
export function executePromiseQueue (promiseHandlers, avoidError = false) {
  return new Promise((resolve, reject) => {
    const exe = (num) => {
      if (num >= promiseHandlers.length) {
        resolve()
        return
      }
      promiseHandlers[num]().then(res => {
        exe(num + 1)
      }).catch(error => {
        if (avoidError) {
          exe(num + 1)
        } else {
          reject(error)
        }
      })
    }
    exe(0)
  })
}

/**
 * 判断浏览器类型
 */
export function browserType () {
  var userAgent = window.navigator.userAgent
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  for (var v = 0; v < Agents.length; v++) {
    if (userAgent.indexOf(Agents[v]) > 0) {
      return false
    }
  }
  if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox'
  }
    
  if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('QQBrowser') == -1) {
    return 'Chrome'
  }
}