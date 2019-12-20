import ZlgCloudHelper from '../../../../../../sdk/js/api/http/httpModules/ZLGAssistant'
import {timestampToTimeForService, transferenceStr} from './util/utils'

/* import ZlgCloudHelper from 'API/ZlgCloudHelper.js'
import {timestampToTimeForService, transferenceStr} from 'COMMON/util/utils' */
import {setLineColor} from './echart/setEchartColor.js'
import {formatter} from './echart/echartYAxis.js'
// require('echarts/lib/component/graphic')
export class DeviceData {
  /**
   * 获取所有的设备(需要网络请求)
  */
  getDeviceList () {
    let devicelist = []
    // let devicelist = [{label: 'test-inverter', value: 'zlg-006', type: 'inverter', devname: 'inverter006', devtype: 'inverter', devid: 'zlg-006', gps: {longitude: 113.270793, latitude: 23.135308}}]
    return ZlgCloudHelper.queryDevice().then(res => {
      res.data.forEach(v => {
        let singerOption = {}
        singerOption.label = v.devname
        singerOption.devname = v.devname
        singerOption.value = v.devid
        singerOption.devid = v.devid
        singerOption.type = v.devtype
        singerOption.devtype = v.devtype
        singerOption.model = v.model || '--'
        singerOption.Serial = v.Serial || '--'
        singerOption.status = v.status === 0 ? 0 : 1
        singerOption.gps = v.gps
        singerOption.newfm = v.newfm
        devicelist.push(singerOption)
      })
      return devicelist
    })
  }
  /**
   * 获取所有的设备
  */
  getDeviceListInVuex (allDevice) {
    // let devicelist = [{label: 'test-inverter', value: 'zlg-006', type: 'inverter', devname: 'inverter006', devtype: 'inverter', devid: 'zlg-006', gps: {longitude: 113.270793, latitude: 23.135308}}]
    let devices = []
    let devicelist = []
    Object.values(allDevice).forEach(dev => {
      devices.push(...dev)
    })
    devices.forEach(v => {
      let singerOption = {}
      singerOption.label = v.devname
      singerOption.devname = v.devname
      singerOption.value = v.devid
      singerOption.fault = v.fault
      singerOption.devid = v.devid
      singerOption.type = v.devtype
      singerOption.devtype = v.devtype
      singerOption.model = v.model || '--'
      singerOption.Serial = v.Serial || '--'
      singerOption.status = v.status === 0 ? 0 : 1
      singerOption.gps = v.gps
      singerOption.newfm = v.newfm
      devicelist.push(singerOption)
    })
    return devicelist
  }
  /**
    * 获取所有的设备类型列表(网络请求)
  */
  getDeviceTypeList () {
    return ZlgCloudHelper.queryDevtype().then(res => {
      let devtypeList = []
      res.data.forEach(v => {
        let singleType = {}
        singleType.basetype = v.basetype
        singleType.comment = v.comment
        singleType.devtype = v.devtype
        singleType.schema = v.schema
        singleType.label = v.comment
        singleType.value = v.devtype
        devtypeList.push(singleType)
      })
      return devtypeList
    })
  }
  /**
  * 获取所有的设备类型列表
  */
  getDeviceTypeListInVuex (alldevice) {
    let devtypeList = []
    Object.keys(alldevice).forEach(v => {
      let singleType = {}
      singleType.label = v
      singleType.value = v
      devtypeList.push(singleType)
    })
    return new Promise(resolve => resolve(devtypeList))
  }
  /**
   * 获取设备信息
   * @param {String} devid 设备id
   * @param {String} devtype 设备类型
  */
  getDeviceInfo (devid, devtype) {
    return ZlgCloudHelper.getDeviceInfor({devid, devtype}).then(res => {
      return {
        isshow: true,
        devData: res
      }
    })
  }
  /**
  * 获取需要更新的设备类型 
  */
  getUpdateDevtpye (allDevice) {
    let storageDevtype = []
    let typeList = Object.keys(allDevice)
    for (let j = 0; j <= typeList.length - 1; j++) {
      for (let i = 0; i <= allDevice[typeList[j]].length - 1; i++) {
        if (allDevice[typeList[j]][i].newfm && allDevice[typeList[j]][i].newfm.isnew === 1) {
          storageDevtype.push(typeList[j])
          break
        }
      }
    }
    return storageDevtype
  }
  /**
  * 设置选择数据点的 数据详细信息, 返回数组
  * @param {Array} paramsPoint 选中的数据点(以数据点key(唯一标识)的形式保存)
  * @param {Object} paramsTargetPoint 所有数据的描述信息
  */
  setDatapoint (paramsPoint, paramsTargetPoint) {
    let paramsArr = []
    paramsPoint.forEach(v => {
      let obj = {}
      let singerArr = Object.entries(paramsTargetPoint).find(item => item[0] === v)
      if (singerArr && (singerArr[1].type === 'number' || singerArr[1].type === 'string')) {
        // 数据点中文名 待服务器添加
        obj.comment = singerArr[1].nickname ? singerArr[1].nickname : ''
        obj.unit = singerArr[1].unit ? singerArr[1].unit : ''
        obj.max = singerArr[1].max ? singerArr[1].max : 0
        obj.min = singerArr[1].min ? singerArr[1].min : 0
        obj.format = singerArr[1].format ? singerArr[1].format : 'float'
        obj.key = singerArr[0]
        obj.type = singerArr[1].type
        paramsArr.push(obj)
      }
    })
    return paramsArr
  }
  /**
  * 根据设备, 获取指定时间段的数据
  */
  searchData (params) {
    let deviceInfo = params.deviceInfo
    let descend = params.descend
    let starttime = params.startTime
    let endtime = params.endTime
    let limit = params.limit
    let skip = params.skip
    let isNew = params.isNew
    let isCount = params.isCount
    let filter = params.filter
    let loading = true
    let reqParam = isNew ? {
      devid: deviceInfo.value || deviceInfo.devid,
      devtype: deviceInfo.type || deviceInfo.devtype,
      limit,
      descend,
      filter
    } : {
      devid: deviceInfo.value || deviceInfo.devid,
      devtype: deviceInfo.type || deviceInfo.devtype,
      skip,
      limit,
      starttime,
      endtime,
      descend,
      filter
    }
    if (isCount) {
      reqParam = {
        devid: deviceInfo.value || deviceInfo.devid,
        devtype: deviceInfo.type || deviceInfo.devtype,
        starttime,
        endtime,
        aggregation: 'count',
        filter
      }
    }
    for (var k in reqParam) {
      if (reqParam[k] === '' || reqParam[k] === undefined || (typeof reqParam[k] === 'object' && Object.keys(reqParam[k]).length === 0)) {
        delete reqParam[k]
      }
    }
    return ZlgCloudHelper.queryDeviceData(reqParam).then(res => {
      loading = false
      let targetAllData = res.data
      return isCount ? res : {targetAllData, loading}
    }).catch(err => {
      return false
    })
  }
  /**
  * 保存不同设备类型选中数据点
  */
  saveDatapoint (isExist, list, moduleName, selectedDev, callback) {
    let methods = isExist ? 'putCustoms' : 'postCustoms'
    let content = JSON.stringify(list)
    let params = {
      customname: 'cloud_web_datapoint',
      customtype: moduleName,
      apptype: 'cloud_web',
      devtype: 'cloud_web_' + selectedDev.devtype
    }
    let reqParams = isExist ? Object.assign(params, {info: {content}}) : Object.assign(params, {content})
    ZlgCloudHelper[methods](reqParams).then(res => callback && callback(res))
  }
  /**
  * 不同设备类型设置保存的选中数据点
  */
  setSavedDatapoint (moduleName, selectDev, dataPoint, hasPremiss) {
    let checkDatapointList = []
    switch (moduleName) {
      case 'newList':
        checkDatapointList = dataPoint.map(item => item.comment ? item.comment + '--' + item.key : item.key)
        break
      case 'newEchart':
        checkDatapointList = dataPoint.filter(v => v.type === 'number').map(item => item.comment ? item.comment + '--' + item.key : item.key).slice(0, 3)
        break
      case 'historyList':
        checkDatapointList = dataPoint.map(item => item.comment ? item.comment + '--' + item.key : item.key)
        break
      case 'historyEchart':
        checkDatapointList = dataPoint.filter(v => v.type === 'number').map(item => item.comment ? item.comment + '--' + item.key : item.key).slice(0, 3)
        break
    }
    if (!hasPremiss) {
      return new Promise(resolve => {
        resolve({list: checkDatapointList, isExist: false})
      })
    } else {
      return ZlgCloudHelper.getCustoms({
        filter: {
          customname: 'cloud_web_datapoint',
          customtype: moduleName,
          devtype: 'cloud_web_' + selectDev.devtype
        }
      }).then(res => {
        if (res.data.length > 0) {
          return ZlgCloudHelper.getCustomsDetail({
            customname: 'cloud_web_datapoint',
            customtype: moduleName,
            apptype: 'cloud_web',
            devtype: 'cloud_web_' + selectDev.devtype
          }).then(DetailRes => {
            checkDatapointList = JSON.parse(DetailRes.data.content)
            return {list: checkDatapointList, isExist: true}
          })
        } else {
          return {list: checkDatapointList, isExist: false}
        }
      })
    }
  }
  /**
  * 获取选中设备的数据点和值
  */
  getSpecialDevData (showdevinfo, devtypeList) {
    let DataPointArr = []
    let showDataPoint = []
    let showDeviceData = false
    let singleDevtype = devtypeList.find(v => v.devtype === showdevinfo.devtype)
    if (singleDevtype) {
      Object.keys(singleDevtype.schema.data).forEach(key => {
        let data = singleDevtype.schema.data[key]
        if (data.type === 'number' || data.type === 'string') {
          let single = {}
          single.key = key
          single.name = data.comment ? data.comment : key
          single.time = '--'
          single.value = data.type === 'number' ? 0 : '--'
          single.unit = data.unit ? data.unit : '-'
          single.type = data.type
          DataPointArr.push(single)
        }
      })
      showDataPoint = DataPointArr
    }
    if (showDataPoint.length === 0) {
      return new Promise(resolve => {
        resolve({showDataPoint, showDeviceData: true})
      })
    } else {
      return ZlgCloudHelper.queryDeviceData({
        devid: showdevinfo.devid,
        devtype: showdevinfo.devtype,
        descend: true,
        limit: 1
      }).then(res_ => {
        showDeviceData = true
        let data = res_.data[0]
        showDataPoint.forEach(v => {
          // 传入的值不是数字 会出现NaN
          if (v.type === 'number') {
            v.value = data ? Number(data && v.key && data[v.key] ? data[v.key] : 0).toFixed(2) : (0).toFixed(2)
          } else {
            v.value = (data && (data[v.key] || data[v.key] == 0)) ? data[v.key] : '--'
          }
          v.time = data && data.time ? timestampToTimeForService(data.time) : '--'
        })
        return {showDataPoint, showDeviceData, res_}
      })
    }
  }
  /**
  * 设置数据点列表展示的头部(表格展示)
  * @param {Array} datapoint 选中的设备数据点
  */
  setTabletitle (datapoint) {
    let tableTitle = []
    datapoint.forEach(v => {
      let single = {}
      single.prop = v.key
      single.label = (v.comment ? v.comment : v.key) + `${v.unit === '' ? '' : '(' + v.unit + ')'}`
      single.type = v.type
      single.format = v.format
      tableTitle.push(single)
    })
    return tableTitle
  }
  /**
   * 设置数据点列表展示的内容(表格展示)
   * @param {Array} allData 服务器返回的设备数据点数据
   * @param {Array} tableTitle 列表头部信息
  */
  setTableData (allData, tableTitle) {
    let tableData = []
    let isEmpty = true
    let isNoAllZero = true
    allData.forEach(v => {
      let single = {}
      // single.date = timestampToTime(v.time)
      single.date = v.time ? timestampToTimeForService(v.time - 0) : '--'
      tableTitle.forEach(item => {
        isEmpty = v[item.prop] === undefined
        single[item.prop] = item.type === 'number'
          ? (v[item.prop] || v[item.prop] == 0) ? item.format === 'float' ? Number(v[item.prop]).toFixed(2) : Math.round(v[item.prop]) : '--'
          : (v[item.prop] || v[item.prop] == 0) ? v[item.prop] : '--'
      })
      tableData.push(single)
    })
    return {tableData, isEmpty}
  }
  /**
  * 获取设备数据点的数据(series) 用图展示
  * @param {Object} reportformcell 报表的每个模块信息
  * @param {Array} targetDevDatapointValue 返回的数据点的数据
  */
  getDataPointSeries (modulecontent, targetDevDatapointValue, reportFormCell, showtype, theme = 'themed', animation = true, isHistory = false, isEmpty = false) {
    let series = []
    modulecontent.forEach((items, indexs) => {
      items.datapoint.forEach((item, index) => {
        let singleSery = {}
        let dataArr = []
        let colorList = []
        targetDevDatapointValue.forEach((vitem, vindex) => {
          if (indexs === vindex) {
            let singerDataArr = []
            vitem.forEach(v => {
              let singleArr = []
              // singleArr.push((parseInt(v.time) + new Date(parseInt(v.time)).getTimezoneOffset() * 60) * 1000)
              singleArr.push((v.time + '').length === 10 ? (parseInt(v.time) * 1000) : parseInt(v.time))
              singleArr.push((isEmpty && item.key === 'time') ? '0.00' : (v[item.key] || v[item.key] == 0) ? item.format === 'float' ? Number(v[item.key]).toFixed(2) : Math.round(v[item.key]) : '0.000')
              singerDataArr.push(singleArr)
              // if (item.max !== 0 && v[item.key] > item.max) {
              //   colorList.push('#df352d')
              // } else {
              colorList.push(setLineColor(theme, index, vindex))
              // }
            })
            dataArr = singerDataArr
          }
        })
        singleSery.name = modulecontent.length > 1 ? (items.label || items.devname) + item.comment ? item.comment : item.key : item.comment ? item.comment : item.key
        singleSery.type = showtype === undefined
          ? reportFormCell.showtype === 'curve' ? 'line' : reportFormCell.showtype
          : showtype === 'curve' ? 'line' : showtype
        singleSery.data = dataArr
        singleSery.colorList = colorList
        singleSery.devid = items.devid ? items.devid : ''
        singleSery.animation = animation
        singleSery.large = !animation
        if (!animation) {
          singleSery.showSymbol = false
          singleSery.sampling = 'average'
          singleSery.showAllSymbol = false
        }
        singleSery.yAxisIndex = isHistory ? 0 : index
        singleSery.index = index + indexs
        // singleSery.lineStyle = {
        //   color: setLineColor(theme, index, indexs)
        // }
        // singleSery.itemStyle = {
        //   opacity: 0.8,
        //   color: params => {
        //     return singleSery.colorList[params.dataIndex]
        //   }
        // }
        if (showtype === 'curve' || (reportFormCell !== null && reportFormCell.showtype === 'curve')) {
          this.curveConfig(singleSery)
        }
        series.push(singleSery)
      })
    })
    return series
  }
  /**
  * 获取x轴展示数据的数据点, 和y轴数据点
  * @param {Object} reportformcell 报表的每个模块信息
  * @param {Array} targetDevDatapointValue 返回的数据点的数据
  * @param {String} xAxisData x轴展示的数据项
  */
  getExistXAxisDataInfo (modulecontent, targetDevDatapointValue, reportFormCell, showtype, theme = 'themed', animation = true, isEmpty = false) {
    let series = []
    let xAxisDataArr = []
    modulecontent[0].datapoint.forEach((items, indexs) => {
      if ((reportFormCell !== null && items.key !== reportFormCell.xAxisData) || (modulecontent[0].xAxisData && items.key !== modulecontent[0].xAxisData)) {
        let singleSeries = {}
        let seriesData = []
        let colorList = []
        targetDevDatapointValue[0].forEach(item => {
          seriesData.push((isEmpty && items.key === 'time') ? '0.00' : (item[items.key] || item[items.key] == 0) ? items.format === 'float' ? Number(item[items.key]).toFixed(2) : Math.round(item[items.key]) : '0.000')
          colorList.push(setLineColor(theme, indexs))
        })
        singleSeries.type = showtype === undefined
          ? reportFormCell.showtype === 'curve' ? 'line' : reportFormCell.showtype
          : showtype === 'curve' ? 'line' : showtype
        singleSeries.name = items.comment || items.key
        singleSeries.colorList = colorList
        singleSeries.data = seriesData
        singleSeries.animation = animation
        singleSeries.large = !animation
        if (!animation) {
          singleSeries.showSymbol = false
          singleSeries.sampling = 'average'
          singleSeries.showAllSymbol = false
        }
        singleSeries.index = indexs
        singleSeries.yAxisIndex = indexs
        if (showtype === 'curve' || (reportFormCell !== null && reportFormCell.showtype === 'curve')) {
          this.curveConfig(singleSeries)
        }
        series.push(singleSeries)
      } else {
        targetDevDatapointValue[0].forEach(item => {
          xAxisDataArr.push(Number((item[items.key] ? item[items.key] : 0)).toFixed(2))
        })
      }
    })
    return {series, xAxisDataArr}
  }
  /**
 * 给series添加属性, 展示类型为曲线
 * @param {Object} singleSery 单个数据项的series
*/
  curveConfig (singleSery) {
    singleSery.smooth = true
    singleSery.smoothMonotone = 'x'
    singleSery.showSymbol = false
    singleSery.connectNulls = true
  }
  /**
 * 根据设备id通过websocket获取设备实时数据
 * @param {Array} checkDataBoard 单个数据看板信息
 * @param {Array} xAxisData 横轴展示的数据点信息
 * @param {Object} res websocket返回的数据
 * @param {Array} series echarts展示的数据和配置项
 * @param {String} theme 主题类型
*/
  getWebSocketData (checkDataBoard, res, series, xAxisData) {
    let utilSeries = JSON.parse(JSON.stringify(series))
    let utilXAxisData = JSON.parse(JSON.stringify(xAxisData))
    checkDataBoard.forEach((items) => {
      if (items.xAxisData === 'ZLGSeverTime' || !items.xAxisData) {
        if (res.deviceId === items.devid) {
          items.datapoint.forEach((item) => {
            let seriesSingerData = []
            let singleSeries = utilSeries.find(v => v.name === (item.comment || item.key) && v.devid === items.devid)
            let singleIndex = utilSeries.findIndex(v => v.name === (item.comment || item.key) && v.devid === items.devid)
            seriesSingerData.push((res.data.time + '').length === 10 ? (parseInt(res.data.time) * 1000) : parseInt(res.data.time))
            seriesSingerData.push((res.data[item.key] || res.data[item.key] == 0) ? item.format === 'float' ? Number(res.data[item.key]).toFixed(2) : Math.round(res.data[item.key]) : '0.000')
            if (singleSeries.data.length > 10) {
              singleSeries.data = singleSeries.data.slice(0, 10)
            }
            singleSeries.data.pop()
            singleSeries.data.unshift(seriesSingerData)
            utilSeries[singleIndex] = singleSeries
          })
        }
      } else {
        if (res.deviceId === items.devid) {
          items.datapoint.forEach((item) => {
            if (item.key === checkDataBoard[0].xAxisData) {
              utilXAxisData.shift()
              utilXAxisData.push(Number(res.data[item.key] ? res.data[item.key] : 0).toFixed(2))
            } else {
              let singleSeries = utilSeries.find(v => v.name === (item.comment || item.key))
              let singleIndex = utilSeries.findIndex(v => v.name === (item.comment || item.key))
              singleSeries.data.shift()
              singleSeries.data.push((res.data[item.key] || res.data[item.key] == 0) ? item.format === 'float' ? Number(res.data[item.key]).toFixed(2) : Math.round(res.data[item.key]) : '0.000')
              utilSeries[singleIndex] = singleSeries
            }
          })
        }
      }
    })
    return {series: utilSeries, xAxisData: utilXAxisData}
  }
  /**
   * 获取实时数据, 没有数据时, echart需展示坐标轴
  */
  getEmptyData (dataSchema) {
    let data = []
    let singleData
    let time = parseInt((new Date() - 0) / 1000)
    for (let i = 0; i < 10; i++) {
      singleData = {}
      dataSchema.forEach(key => {
        singleData[key] = 0
      })
      singleData.time = time - i * 1
      data.unshift(singleData)
    }
    return data
  }
  /**
   * 多y轴, 获取y轴设置
  */
  getYAxisConfig (series, isXAxis) {
    let yAxis = isXAxis ? [{}] : []
    series.forEach((single, index) => {
      if (isXAxis) yAxis.push({})
      let baseConfig = {
        type: 'value',
        axisLabel: {
          formatter: formatter,
          margin: 10,
          fontSize: 14,
          color: '#396282'
        },
        // min: 0,
        position: 'left',
        nameRotate: '90',
        nameLocation: 'center',
        nameGap: 40,
        nameTextStyle: {
          color: '#97999d'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dotted',
            color: '#E8E8E8'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#1f3e55'
          }
        }
      }
      baseConfig.max = this.setMaxValue(Math.max(...single.data.map(v => Number(isXAxis ? v : v[1]))))
      baseConfig.name = single.name.length > 10 ? single.name.slice(0, 10) + '...' : single.name
      baseConfig.offset = index * 56
      baseConfig.axisLine.lineStyle.color = single.colorList[0]
      baseConfig.axisLabel.color = single.colorList[0]
      baseConfig.nameTextStyle.color = single.colorList[0]
      // if (index === 0) {
      //   baseConfig.nameLocation = 'end'
      //   baseConfig.nameRotate = '0'
      //   baseConfig.nameGap = 10
      // }
      isXAxis ? yAxis[single.index] = baseConfig : yAxis.push(baseConfig)
    })
    return yAxis
  }
  /**
   * 设置数据中的最大值
  */
  setMaxValue (num) {
    let max
    let digits = (Math.floor(num) + '').length - 1
    if (num < 1) {
      max = 1
    } else {
      max = Math.ceil(num / Math.pow(10, digits)) * Math.pow(10, digits)
    }
    return max
  }
  /**
  * 设置x轴展示的选项
  * @param {Object} reportformcell 报表的每个模块信息
  */
  setXAxisShowOptions (devDatapoint) {
    let xAxisData = [{value: 'ZLGSeverTime', label: '时间'}]
    devDatapoint.forEach(v => {
      let utilObj = {}
      utilObj.value = v.key
      utilObj.label = '数据点---' + (v.comment || v.key)
      xAxisData.push(utilObj)
    })
    return xAxisData
  }
  /**
  * 获取不同设备类型的数据点内容
  * @param {Array} schema 不同数据类型的不同数据点内容
  * @param {String} type 设备类型
  */
  getDatapointContent (schema) {
    let deviceDataPoint = []
    if (schema.data) {
      Object.keys(schema.data).forEach(item => {
        if (schema.data[item].type === 'number') {
          let singerObj = {}
          singerObj.key = item
          // 数据点中文名 待服务器添加
          singerObj.label = schema.data[item].nickname || item
          singerObj.title = schema.data[item].nickname || item
          deviceDataPoint.push(singerObj)
        }
      })
    } else {
      return []
    }
    return deviceDataPoint
  }
  /**
  * 获取不同设备类型的数据点内容
  * @param {Array} schema 不同数据类型的不同数据点内容
  * @param {String} type 设备类型
  */
  // getDatapointContent_ (type, schema) {
  //   let deviceDataPointArr = []
  //   schema.forEach(v => {
  //     if (v.data && v.type !== 'demo' && v.type === type) {
  //       Object.keys(v.data).forEach(item => {
  //         let singerObj = {}
  //         singerObj.key = v.data[item].comment
  //         singerObj.label = v.data[item].comment
  //         deviceDataPointArr.push(singerObj)
  //       })
  //     }
  //   })
  //   return deviceDataPointArr
  // }
  /**
 * 设置添加看板的信息
 * @param {Array} devNumArr 添加设备的排序数组
 * @param {Array} boardInfo 存储所选设备及数据点
 * @param {Object} allDatapoint 根据不同设备类型存储的设备数据点
*/
  setAddDataBoardInfo (devNumArr, boardInfo, allDatapoint) {
    let singleDataBoard = []
    devNumArr.filter(v => v !== -1).forEach(item => {
      singleDataBoard.push(boardInfo[item])
    })
    singleDataBoard = this.goRepeatDevice(singleDataBoard)
    singleDataBoard.forEach(v => {
      v.datapoint = this.setDatapoint(v.datapoint.map(v => v.key), allDatapoint)
    })
    return singleDataBoard
  }
  /**
  * 去除重复设备的重复数据点
  * @param {Array} allSelectedDevice 选中的所有设备
  */
  goRepeatDevice (allSelectedDevice) {
    let repeatDev = []
    let selectedDev = []
    let noRepeatDevid = []
    let devidArr = allSelectedDevice.map(v => v.devid)
    let repeatDevid = devidArr.filter((v, i) => devidArr.indexOf(v) !== i)
    if (repeatDevid.length === 0) {
      selectedDev = allSelectedDevice
      return selectedDev
    }
    devidArr.forEach(item => {
      if (repeatDevid.indexOf(item) === -1) {
        noRepeatDevid.push(item)
      }
    })
    let goRepeatArr = repeatDevid.filter((v, i) => repeatDevid.indexOf(v) === i)
    // 获取重复的设备
    goRepeatArr.forEach(item => {
      repeatDev.push(allSelectedDevice.filter(v => v.devid === item))
    })
    // 获取非重复的设备
    noRepeatDevid.forEach(item => {
      let norepeatArr = allSelectedDevice.filter(v => v.devid === item)
      selectedDev.push(...norepeatArr)
    })
    // 合并重复设备的数据点
    repeatDev.forEach(v => {
      let datapointArr = []
      let devDatapointObj = v[0]
      v.forEach(items => {
        items.datapoint.forEach(item => {
          if (datapointArr.find(single => single.key === item.key) === undefined) {
            datapointArr.push(item)
          }
        })
      })
      devDatapointObj.datapoint = datapointArr
      selectedDev.push(devDatapointObj)
    })
    return selectedDev
  }
  /**
  * 格式化多个搜索条件
  * @param {*} option 
  */
  formatManySearchKeys (option) {
    let filter = []
    option.forEach(item => {
      let single = {}
      if (item.value && item.value !== '') {
        if (item.type == 'number') {
          let toggleV = item.value.replace(/\s*/g, '')
          if (toggleV.indexOf('!') > -1 && toggleV.indexOf('&&') === -1 && toggleV.indexOf('||') === -1) {
            let inV = toggleV.indexOf('=') > -1 ? toggleV.slice(2) : toggleV.slice(1)
            inV = inV.indexOf('.') > -1 ? inV.split('.')[1].length === 2 ? inV : inV + '0' : inV + '.00'
            single['$or'] = [{}, {}]
            single['$or'][0][item.prop] = {}
            single['$or'][1][item.prop] = {}
            if (inV == 0) {
              single['$or'][0][item.prop] = {$lt: 0}
              single['$or'][1][item.prop] = item.format === 'int' ? {$gte: Number(inV) + 0.5} : {$gte: Number(inV + 5)}
            } else {
              single['$or'][0][item.prop] = inV > 0
                ? item.format === 'int'
                  ? {$lt: Number(inV) - 0.5}
                  : {$lt: (Number(inV + 5) - 0.01).toFixed(3) - 0}
                : item.format === 'int'
                  ? {$gt: Number(inV) + 0.5}
                  : {$gt: (Number(inV + 5) + 0.01).toFixed(3) - 0}
              single['$or'][1][item.prop] = inV > 0
                ? item.format === 'int'
                  ? {$gte: Number(inV) + 0.5}
                  : {$gte: Number(inV + 5)}
                : item.format === 'int'
                  ? {$lte: Number(inV) - 0.5}
                  : {$lte: Number(inV + 5)}
            }
          } else {
            if (toggleV.indexOf('&&') > -1 || toggleV.indexOf('||') > -1) {
              let logicOperator = toggleV.indexOf('&&') > -1 ? '&&' : '||'
              let fArr = toggleV.split(logicOperator)
              single[logicOperator === '||' ? '$or' : '$and'] = []
              fArr.forEach(v => {
                let sg = {}
                sg[item.prop] = {}
                if (v.indexOf('!') === -1) {
                  let value = v.indexOf('=') > -1 ? v.slice(2) : v.slice(1)
                  if (v.indexOf('>') > -1) {
                    value = v.indexOf('.') > -1 ? v.split('.')[1].length === 2 ? value : value + '0' : value + '.00'
                    if (value == 0) {
                      sg[item.prop]['$gte'] = item.format === 'int'
                        ? v.indexOf('=') > -1 ? 0 : 0.5
                        : v.indexOf('=') > -1 ? 0 : Number(value + 5)
                    } else {
                      value > 0
                        ? sg[item.prop]['$gte'] = item.format === 'int'
                          ? v.indexOf('=') > -1 ? (Number(value) - 0.5) : (Number(value) + 0.5)
                          : v.indexOf('=') > -1 ? (Number(value + 5) - 0.01).toFixed(3) - 0 : Number(value + 5)
                        : sg[item.prop]['$gt'] = item.format === 'int'
                          ? v.indexOf('=') > -1 ? (Number(value) - 0.5) : (Number(value) + 0.5)
                          : v.indexOf('=') > -1 ? Number(value + 5) : (Number(value + 5) + 0.01).toFixed(3) - 0
                    }
                  } else if (v.indexOf('<') > -1) {
                    value = v.indexOf('.') > -1 ? v.split('.')[1].length === 2 ? value : value + '0' : value + '.00'
                    if (value == 0) {
                      sg[item.prop]['$lt'] = item.format === 'int'
                        ? v.indexOf('=') > -1 ? 0.5 : 0
                        : v.indexOf('=') > -1 ? Number(value + 5) : 0
                    } else {
                      value > 0
                        ? sg[item.prop]['$lt'] = item.format === 'int'
                          ? v.indexOf('=') > -1 ? (Number(value) + 0.5) : (Number(value) - 0.5)
                          : v.indexOf('=') > -1 ? Number(value + 5) : (Number(value + 5) - 0.01).toFixed(3) - 0
                        : sg[item.prop]['$lte'] = item.format === 'int'
                          ? v.indexOf('=') > -1 ? (Number(value) + 0.5) : (Number(value) - 0.5)
                          : v.indexOf('=') > -1 ? (Number(value + 5) + 0.01).toFixed(3) - 0 : (Number(value + 5))
                    }
                  } else {
                    let inV = v.indexOf('=') > -1 ? v.slice(1) : v
                    inV = inV.indexOf('.') > -1 ? inV.split('.')[1].length === 2 ? inV : inV + '0' : inV + '.00'
                    if (inV == 0) {
                      sg[item.prop] = item.format === 'int'
                        ? {$gte: 0, $lt: Number(inV) + 0.5}
                        : {$gte: 0, $lt: Number(inV + 5)}
                    } else {
                      sg[item.prop] = inV > 0
                        ? item.format === 'int'
                          ? {$gte: Number(inV) - 0.5, $lt: Number(inV) + 0.5}
                          : {$gte: (Number(inV + 5) - 0.01).toFixed(3) - 0, $lt: Number(inV + 5)}
                        : item.format === 'int'
                          ? {$gt: Number(inV) - 0.5, $lte: Number(inV) + 0.5}
                          : {$gt: Number(inV + 5), $lte: (Number(inV + 5) + 0.01).toFixed(3) - 0}
                    }
                  }
                  single[logicOperator === '||' ? '$or' : '$and'].push(sg)
                } else {
                  let inV = v.indexOf('=') > -1 ? v.slice(2) : v.slice(1)
                  inV = inV.indexOf('.') > -1 ? inV.split('.')[1].length === 2 ? inV : inV + '0' : inV + '.00'
                  if (logicOperator === '&&') {
                    let util = {}
                    util['$or'] = [{}, {}]
                    util['$or'][0][item.prop] = {}
                    util['$or'][1][item.prop] = {}
                    if (inV == 0) {
                      util['$or'][0][item.prop] = item.format === 'int'
                        ? {$gte: Number(inV) + 0.5}
                        : {$gte: Number(inV + 5)}
                      util['$or'][1][item.prop] = {$lt: 0}
                    } else {
                      util['$or'][0][item.prop] = inV > 0
                        ? item.format === 'int'
                          ? {$lt: Number(inV) - 0.5}
                          : {$lt: (Number(inV + 5) - 0.01).toFixed(3) - 0}
                        : item.format === 'int'
                          ? {$gt: Number(inV) + 0.5}
                          : {$gt: (Number(inV + 5) + 0.01).toFixed(3) - 0}
                      util['$or'][1][item.prop] = inV > 0
                        ? item.format === 'int' ? {$gte: Number(inV) + 0.5} : {$gte: Number(inV + 5)}
                        : item.format === 'int' ? {$lte: Number(inV) - 0.5} : {$lte: Number(inV + 5)}
                    }
                    single['$and'].push(util)
                  } else {
                    if (inV == 0) {
                      single['$or'].push({
                        [item.prop]: item.format === 'int'
                          ? {$gte: Number(inV) + 0.5}
                          : {$gte: Number(inV + 5)}
                      })
                      single['$or'].push({
                        [item.prop]: {$lt: 0}
                      })
                    } else {
                      single['$or'].push({
                        [item.prop]: inV > 0
                          ? item.format === 'int'
                            ? {$lt: Number(inV) - 0.5}
                            : {$lt: (Number(inV + 5) - 0.01).toFixed(3) - 0}
                          : item.format === 'int'
                            ? {$gt: Number(inV) + 0.5}
                            : {$gt: (Number(inV + 5) + 0.01).toFixed(3) - 0}
                      })
                      single['$or'].push({
                        [item.prop]: inV > 0
                          ? item.format === 'int' ? {$gte: Number(inV) + 0.5} : {$gte: Number(inV + 5)}
                          : item.format === 'int' ? {$lte: Number(inV) - 0.5} : {$lte: Number(inV + 5)}
                      })
                    }
                  }
                }
              })
            } else if (toggleV.indexOf('<') > -1 || toggleV.indexOf('>') > -1) {
              let inV = toggleV.indexOf('=') > -1 ? toggleV.slice(2) : toggleV.slice(1)
              inV = toggleV.indexOf('.') > -1 ? inV.split('.')[1].length === 2 ? inV : inV + '0' : inV + '.00'
              if (inV == 0) {
                single[item.prop] = toggleV.indexOf('=') > -1
                  ? {[toggleV.indexOf('<') > -1 ? '$lt' : '$gte']: item.format === 'int'
                    ? toggleV.indexOf('<') > -1 ? 0.5 : 0
                    : toggleV.indexOf('<') > -1 ? Number(inV + 5) : 0}
                  : {[toggleV.indexOf('<') > -1 ? '$lt' : '$gte']: item.format === 'int'
                    ? toggleV.indexOf('<') > -1 ? 0 : 0.5
                    : toggleV.indexOf('<') > -1 ? 0 : Number(inV + 5)}
              } else {
                single[item.prop] = toggleV.indexOf('=') > -1
                  ? inV > 0
                    ? {[toggleV.indexOf('<') > -1 ? '$lt' : '$gte']: item.format === 'int'
                      ? toggleV.indexOf('<') > -1 ? Number(inV) + 0.5 : Number(inV) - 0.5
                      : toggleV.indexOf('<') > -1 ? Number(inV + 5) : (Number(inV + 5) - 0.01).toFixed(3) - 0}
                    : {[toggleV.indexOf('<') > -1 ? '$lte' : '$gt']: item.format === 'int'
                      ? toggleV.indexOf('<') > -1 ? Number(inV) + 0.5 : Number(inV) - 0.5
                      : toggleV.indexOf('<') > -1 ? (Number(inV + 5) + 0.01).toFixed(3) - 0 : (Number(inV + 5))}
                  : inV > 0
                    ? {[toggleV.indexOf('<') > -1 ? '$lt' : '$gte']: item.format === 'int'
                      ? toggleV.indexOf('<') > -1 ? Number(inV) - 0.5 : Number(inV) + 0.5
                      : toggleV.indexOf('<') > -1 ? (Number(inV + 5) - 0.01).toFixed(3) - 0 : Number(inV + 5)}
                    : {[toggleV.indexOf('<') > -1 ? '$lte' : '$gt']: item.format === 'int'
                      ? toggleV.indexOf('<') > -1 ? Number(inV) - 0.5 : Number(inV) + 0.5
                      : toggleV.indexOf('<') > -1 ? Number(inV + 5) : (Number(inV + 5) + 0.01).toFixed(3) - 0}
              }
            } else {
              let inV = toggleV.indexOf('=') > -1 ? toggleV.slice(1) : toggleV
              inV = inV.indexOf('.') > -1 ? inV.split('.')[1].length === 2 ? inV : inV + '0' : inV + '.00'
              if (inV == 0) {
                single[item.prop] = item.format === 'int'
                  ? {$gte: 0, $lt: Number(inV) + 0.5}
                  : {$gte: 0, $lt: Number(inV + 5)}
              } else {
                single[item.prop] = inV > 0
                  ? item.format === 'int'
                    ? {$gte: Number(inV) - 0.5, $lt: Number(inV) + 0.5}
                    : {$gte: (Number(inV + 5) - 0.01).toFixed(3) - 0, $lt: Number(inV + 5)}
                  : item.format === 'int'
                    ? {$gt: Number(inV) - 0.5, $lte: Number(inV) + 0.5}
                    : {$gt: Number(inV + 5), $lte: (Number(inV + 5) + 0.01).toFixed(3) - 0}
              }
            }
          }
        } else if (item.type === 'string') {
          single[item.prop] = {
            $regex: transferenceStr(item.value), $options: 'i' 
          }
        }
        filter.push(single)
      }
    })
    if (filter.length) {
      return filter
    } else {
      return ''
    }
  }
  /**
  * 过滤条件
  */
  filterData (data, filter) {
    let flag = true
    // let content = {}
    if (filter.filter && filter.filter.$and) {
      try {
        filter.filter.$and.forEach(item => {
          Object.entries(item).forEach(dataKey => {
            if ((dataKey[0] === '$or' || dataKey[0] === '$and') && Array.isArray(dataKey[1])) {
              let orFlag = []
              dataKey[1].forEach(singeCondition => {
                let andFlag = []
                // 单个搜索条件
                Object.keys(singeCondition).forEach(singleLogic => {
                  if (singleLogic === '$or' && Array.isArray(singeCondition[singleLogic])) {
                    // 当 && 和 ！共用时
                    let subOr = []
                    singeCondition[singleLogic].forEach(sLogic => {
                      Object.keys(sLogic).forEach(a => {
                        Object.entries(sLogic[a]).forEach(b => {
                          flag = this.conditionCompare(b[0], data, sLogic, a)
                          subOr.push(flag)
                        })
                      })
                      if (subOr.length === singeCondition[singleLogic].length) {
                        flag = subOr.some(v => v === true)
                      }
                    })
                  } else {
                    Object.keys(singeCondition[singleLogic]).forEach(sL => {
                      flag = this.conditionCompare(sL, data, singeCondition, singleLogic)
                      andFlag.push(flag)
                      if (andFlag.length === Object.keys(singeCondition[singleLogic]).length) {
                        flag = andFlag.every(v => v === true)
                      }
                    })
                  }
                })
                orFlag.push(flag)
                if (orFlag.length === Object.keys(dataKey[1]).length) {
                  if (dataKey[0] === '$or' && orFlag.every(v => v === false)) {
                    flag = false
                    throw new Error()
                  }
                  if (dataKey[0] === '$and' && orFlag.some(v => v === false)) {
                    flag = false
                    throw new Error()
                  }
                  flag = true
                }
              })
            } else {
              Object.keys(dataKey[1]).forEach(singleLogic => {
                switch (singleLogic) {
                  case '$gt':
                    flag = (data[dataKey[0]] ? data[dataKey[0]] : 0) > dataKey[1][singleLogic]
                    break
                  case '$gte':
                    flag = (data[dataKey[0]] ? data[dataKey[0]] : 0) >= dataKey[1][singleLogic]
                    break
                  case '$lt':
                    flag = (data[dataKey[0]] ? data[dataKey[0]] : 0) < dataKey[1][singleLogic]
                    break
                  case '$lte':
                    flag = (data[dataKey[0]] ? data[dataKey[0]] : 0) <= dataKey[1][singleLogic]
                    break
                  case '$eq':
                    flag = (data[dataKey[0]] ? data[dataKey[0]] : 0) === dataKey[1][singleLogic]
                    break
                  case '$ne':
                    flag = (data[dataKey[0]] ? data[dataKey[0]] : 0) !== dataKey[1][singleLogic]
                    break
                  case '$regex':
                    flag = (data[dataKey[0]] ? data[dataKey[0]] : '').indexOf(dataKey[1][singleLogic]) > -1
                }
                if (!flag) {
                  // content = {data: data[dataKey[0]], condition: dataKey[0]}
                  throw new Error()
                }
              })
            }
          })
        })
      } catch (e) {
        // return Object.assign({}, {flag: flag}, content)
        return flag
      }
    }
    return flag
  }
  conditionCompare (sL, data, singeCondition, singleLogic) {
    let flag = true
    switch (sL) {
      case '$gt':
        flag = (data[singleLogic] ? data[singleLogic] : 0) > singeCondition[singleLogic][sL]
        break
      case '$gte':
        flag = (data[singleLogic] ? data[singleLogic] : 0) >= singeCondition[singleLogic][sL]
        break
      case '$lt':
        flag = (data[singleLogic] ? data[singleLogic] : 0) < singeCondition[singleLogic][sL]
        break
      case '$lte':
        flag = (data[singleLogic] ? data[singleLogic] : 0) <= singeCondition[singleLogic][sL]
        break
      case '$eq':
        flag = (data[singleLogic] ? data[singleLogic] : 0) === singeCondition[singleLogic][sL]
        break
      case '$ne':
        flag = (data[singleLogic] ? data[singleLogic] : 0) !== singeCondition[singleLogic][sL]
        break
    }
    return flag
  }
  /**
   * 对输入的数值进行校验(最高位不能为0, 精确到两位小数)
  */
  validateNums (value, format) {
    if (value == '') {
      return ''
    }
    let txt = ''
    value = value.replace(/\s*/g, '')
    let regex1 = /^[\d>=<!|&.-]+$/.test(value)
    if (!regex1) {
      txt = '请输入数值或右侧规定的运算符'
      return txt
    }
    if (value.indexOf('!') > -1 && value.indexOf('&&') === -1 && value.indexOf('||') === -1) {
      txt = this.validateNum(value)
    } else {
      if (value.indexOf('&&') > -1 || value.indexOf('||') > -1) {
        let logicOperat = value.indexOf('&&') > -1 ? '&&' : '||'
        if (value.indexOf(logicOperat) === 0) {
          return '请输入正确的数值格式'
        }
        let nums = value.split(logicOperat)
        nums.forEach(singleN => {
          if (txt === '') txt = this.validateNum(singleN, format)
        })
      } else {
        txt = this.validateNum(value, format)
      }
    }
    return txt
  }
  validateNum (value, format) {
    let inV = value
    let txt = ''
    let regex = /^[><!]?=?-?\d*(\.\d*)?$/.test(value)
    if (!regex) {
      txt = '请输入正确的数值格式'
      return txt
    }
    if (value.indexOf('>') > -1 || value.indexOf('<') > -1) {
      if (value.indexOf('=') > -1) {
        inV = value.slice(2)
      } else {
        inV = value.slice(1)
      }
    }
    if (inV.indexOf('.') > -1) {
      if (format === 'int') {
        txt = '请输入整数'
        return txt
      }
      if (inV.split('.')[1].length > 2 || inV.split('.')[1] === '') {
        txt = '请精确到2位小数'
        return txt
      }
    } else {
      if (inV.indexOf('!') > -1) {
        if (inV.indexOf('=') > -1) {
          inV = inV.slice(2)
        } else {
          inV = inV.slice(1)
        }
      } else {
        if (inV.indexOf('=') > -1) {
          inV = inV.slice(1)
        }
      }
      if (inV === '') {
        txt = '请输入数值'
        return txt
      }
      if (inV.indexOf('0') === 0 && inV.indexOf('00') === 0 && inV !== '0' && inV.indexOf('-') === -1) {
        txt = '整数最高位不能为0'
      }
      // if (inV.indexOf('0') === 1 && inV !== '0' && inV.indexOf('-') === -1) {
      //   txt = '整数最高位不能为0'
      // }
      if (inV.indexOf('0') === 1 && inV.indexOf('00') === 1 && inV !== '0' && inV.indexOf('-') > -1) {
        txt = '整数最高位不能为0'
      }
    }
    return txt
  }
  /**
   * 获取子用户权限列表中的设备类型
  */
  getSubAccessDevType (devtypeList, userInfo) {
    let typeList = []
    let typeAccess = []
    let accesses = userInfo.accessControllerList.filter(v => v.name.slice(-3) === 'dev')
    accesses.forEach(acc => {
      let singleAcc = acc.statement.condition.selector.devtype._$eq || []
      typeAccess.push(...singleAcc)
    })
    let devtypes = typeAccess.filter((v, i) => typeAccess.indexOf(v) === i)
    devtypeList.forEach(type => {
      if (devtypes.find(v => v === type.devtype)) {
        typeList.push(type)
      }
    })
    return typeList
  }
  /**
   * 获取子用户权限列表中的设备
  */
  getSubAccessDevices (devices, userInfo) {
    let devList = {}
    let devCount = 0
    let typeAccess = []
    let accesses = userInfo.accessControllerList.filter(v => v.name.slice(-3) === 'dev')
    accesses.forEach(acc => {
      let singleAcc = acc.statement.resource || []
      typeAccess.push(...singleAcc.map(v => v.split(':')[1]))
    })
    let devlists = typeAccess.filter((v, i) => typeAccess.indexOf(v) === i)
    devices.forEach(value => {
      let flag = devlists.includes(value.devid)
      if (flag) {
        let single = {}
        devCount++
        single = value
        single.label = value.devname
        single.value = value.devid
        if (value.devid && !devList[single.devtype]) {
          devList[single.devtype] = []
          devList[single.devtype].push(single)
        } else if (value.devid && devList[single.devtype]) {
          devList[single.devtype].push(single)
        }
      }
    })
    return {devList, devCount}
  }
  /**
   * 毫秒时间装换
  */
  // timestampToTimeForService (timestamp) {
  //   console.log(timestamp)
  //   if (timestamp) {
  //     timestamp = (timestamp + '').length === 10 ? timestamp * 1000 : timestamp
  //     const date = new Date(timestamp - 0)
  //     const Y = date.getFullYear() + '-'
  //     const M =
  //       (date.getMonth() + 1 < 10
  //         ? '0' + (date.getMonth() + 1)
  //         : date.getMonth() + 1) + '-'
  //     const D =
  //       date.getDate() < 10
  //         ? '0' + date.getDate() + '  '
  //         : date.getDate() + '  '
  //     const H =
  //       (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
  //       ':'
  //     const Minute =
  //       (date.getMinutes() < 10
  //         ? '0' + date.getMinutes()
  //         : date.getMinutes()) + ':'
  //     const S =
  //       date.getSeconds() < 10
  //         ? '0' + date.getSeconds()
  //         : date.getSeconds()
  //     return Y + M + D + H + Minute + S
  //   } else {
  //     return '--'
  //   }
  // }
}
