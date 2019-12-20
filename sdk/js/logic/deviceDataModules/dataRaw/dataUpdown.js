import ZLGDeviceData from '../../../api/http/httpModules/ZLGDeviceData.js'
export function getSaveDataCount (reqParam) {
  return ZLGDeviceData.getDeviceDatas(reqParam).then(num => {
    return num.count
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
    return ZLGDeviceData.getDeviceDatas(data).then(res => {
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
export function sheet2blob (sheet, sheetName) {
  // sheetName = sheetName || 'sheet1';
  // let workbook = {
  //     SheetNames: [sheetName],
  //     Sheets: {}
  // };
  // workbook.Sheets[sheetName] = sheet;
  let workbook = {
    SheetNames: sheetName,
    Sheets: {}
  }
  sheetName.forEach((item, index) => {
    workbook.Sheets[item] = sheet[index]
    // workbook.Sheets[item] = Object.assign(sheet[index], {'!cols': getColWidth(column)})
  })
  // 生成excel的配置项
  let wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  }
  // eslint-disable-next-line
  let wbout = XLSX.write(workbook, wopts)
  let blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  // 字符串转ArrayBuffer
  function s2ab (s) {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }
  return blob
}
export function openDownloadDialog (url, saveName) {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) // 创建blob地址
  }
  let aLink = document.createElement('a')
  aLink.href = url
  aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  let event
  if (window.MouseEvent) {
    event = new MouseEvent('click')
  } else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}

