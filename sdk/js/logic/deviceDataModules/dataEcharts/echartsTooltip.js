import ZWSDateTool from '../../../tool/toolModules/ZWSDateTool.js'
import { timeTodays, timesToMonths, timesToYears } from './echartsTime.js'
let formatter = function (value) {
  let val = 0
  let unit = ''
  if (value < 1000) {
    val = value - 0
  } else if (value < 1000 * 1000) {
    val = value / 1000
    unit = 'K'
  } else if (value < 1000 * 1000 * 1000) {
    val = value / 1000 / 1000
    unit = 'M'
  } else {
    val = value / 1000 / 1000 / 1000
    unit = 'G'
  }
  if (val !== 0 && val < 10 && !Number.isInteger(val)) {
    val = val.toFixed(1)
  } else {
    val = val.toFixed(0)
  }
  return `${val}${unit}`
}

const tooltipFormatter = (params, dataPoint, xAxisData, timeShowFormat, existDevEventType, tooltipTitle, dataEmpty) => {
  let str = ``
  if (params instanceof Array) {
    params.forEach((v, i) => {
      if (dataPoint.length > 0 && xAxisData.length === 0) {
        let unit = dataPoint.map(v => v.unit)
        let onlyOne = unit.length === params.length
        if (timeShowFormat === 0) str = `<div class="myChartTip echart-toolDiv">时间: <span class="time">${ZWSDateTool.timestampToLocalDate(parseInt(params[0].data[0] / 1000))}</span></div>`
        if (timeShowFormat === 1) str = `<div class="myChartTip echart-toolDiv">时间: <span class="time">${timeTodays(parseInt(params[0].data[0] / 1000))}</span></div>`
        if (timeShowFormat === 2) str = `<div class="myChartTip echart-toolDiv">时间: <span class="time">${timesToMonths(parseInt(params[0].data[0] / 1000))}</span></div>`
        if (timeShowFormat === 3) str = `<div class="myChartTip echart-toolDiv">时间: <span class="time">${timesToYears(parseInt(params[0].data[0] / 1000))}</span></div>`
        params.forEach((v, i) => {
          str += `<div class="myChartTip echart-toolDiv">${v.seriesName}: <span class="title">${dataEmpty ? '暂无数据' : v.data[1] === '0.000' ? '暂无数据' : v.data[1]}</span> ${dataEmpty || !onlyOne ? '' : (unit[i] === '' || !unit[i]) ? '' : '(' + unit[i] + ')'}</div>`
        })
      } else if (existDevEventType) {
        if (existDevEventType === '消息' && xAxisData.length > 0) {
          str = `<div class="myChartTip"><span class="time">${v.name}</span></div>`
          str += `<div class="myChartTip">${existDevEventType}数: <span class="title">${v.data}</span> 条</div>`
        } else if (xAxisData.length === 0) {
          if (timeShowFormat === 0) str = `<div class="myChartTip">时间: <span class="time">${ZWSDateTool.timestampToLocalDate(parseInt(params[0].data[0] / 1000))}</span></div>`
          if (timeShowFormat === 1) str = `<div class="myChartTip">时间: <span class="time">${timeTodays(parseInt(params[0].data[0] / 1000))}</span></div>`
          if (timeShowFormat === 2) str = `<div class="myChartTip">时间: <span class="time">${timesToMonths(parseInt(params[0].data[0] / 1000))}</span></div>`
          if (timeShowFormat === 3) str = `<div class="myChartTip">时间: <span class="time">${timesToYears(parseInt(params[0].data[0] / 1000))}</span></div>`
          params.forEach((v, i) => {
            str += `<div class="myChartTip">${i + 1}. ${v.seriesName + existDevEventType}: <span class="title">${v.data[1]}</span>条</div>`
          })
        } else {
          str = `<div class="myChartTip">时间: <span class="time">${timeTodays(v.data[0] / 1000)}</span></div>`
          str += `<div class="myChartTip">${existDevEventType}数: <span class="title">${v.data[1]}</span> 条</div>`
        }
      } else if (tooltipTitle === '看板数量' || tooltipTitle === '组态数量') {
        if (xAxisData.length > 0) {
          str = `<div class="myChartTip">时间: <span class="time">${v.name}</span></div>`
          str += `<div class="myChartTip">${tooltipTitle}: <span class="title">${v.data}</span> 个</div>`
        } else {
          str = `<div class="myChartTip">时间: <span class="time">${timeTodays(v.data[0] / 1000)}</span></div>`
          str += `<div class="myChartTip">${tooltipTitle}: <span class="title">${v.data[1]}</span> 个</div>`
        }
      } else if (xAxisData.length > 0) {
        // let unit = dataPoint.map(v => v.unit)
        if (dataPoint.length > 0) {
          let unit = dataPoint.find(item => (item.comment || item.key) === v.seriesName).unit
          str += `<div class="myChartTip echart-toolDiv">${i + 1}.${v.seriesName}: <span class="title">${dataEmpty ? '暂无数据' : v.data}</span> ${dataEmpty ? '' : unit === '' ? '' : '(' + unit + ')'}</div>`
        } else if (tooltipTitle !== '') {
          str = `<div class="myChartTip">${tooltipTitle.slice(0, 2)}: <span class="time">${v.name}</span></div>`
          str += `<div class="myChartTip">设备数: <span class="title">${v.data}</span> 个</div>`
        } else {
          str = `<div class="myChartTip">时间: <span class="time">${v.name}</span></div>`
          str += `<div class="myChartTip">设备数: <span class="title">${v.data}</span> 个</div>`
        }
      } else {
        str = `<div class="myChartTip">时间: <span class="time">${timeTodays(v.data[0] / 1000)}</span></div>`
        str += `<div class="myChartTip">设备数: <span class="title">${v.data[1]}</span> 个</div>`
      }
    })
  } else {
    str = `<div class="myChartTip">${params.data.name}: <span class="title">${params.data.value} 个</span></div>`
  }
  return str
}

export { formatter, tooltipFormatter }
