import {formatter, tooltipFormatter} from '@/assets/js/data/echart/echartYAxis.js'
/**
 * 设置echart的option
 * @param {*} optionParams
 */
const setEchartOption = (optionParams) => {
  let showParams = optionParams.showParams
  let series = optionParams.series || []
  let dataPoint = optionParams.dataPoint || []
  let seriesObj = optionParams.seriesObj || {}
  let text = optionParams.text || ''
  let dataEmpty = optionParams.dataEmpty
  let utilYAxis = optionParams.yAxis || {}
  let showLabelnormal = optionParams.showLabelnormal || false
  let showParamsdevname = optionParams.showParamsdevname || ''
  let existdataZoom = optionParams.existdataZoom || false
  let existdataZoomRate = optionParams.existdataZoomRate || 0
  let existToolbox = optionParams.existToolbox || false
  let existtooltip = optionParams.existtooltip || false
  let tooltipTitle = optionParams.tooltipTitle || ''
  let xAxisType = optionParams.xAxisType || 'time'
  let xAxisData = optionParams.xAxisData || []
  let existDevEventType = optionParams.existDevEventType || false
  let legend = optionParams.legend || {}
  let showxAxisFormatter = optionParams.showxAxisFormatter || false
  let timeShowFormat = optionParams.timeShowFormat || 0
  let bgc = optionParams.bgc || ''
  let color = optionParams.color || []
  let zoomLock = optionParams.zoomLock || false
  let gridLeft = optionParams.gridLeft || '5%'
  let gridTop = optionParams.gridTop || '25%'
  let seriesEnd = series.length === 0 ? [{
    name: seriesObj.seriesName,
    type: seriesObj.seriesType,
    radius: seriesObj.seriesRadius,
    avoidLabelOverlap: true,
    label: {
      show: showLabelnormal,
      align: 'right'
    },
    hoverOffset: 3,
    barWidth: seriesObj.barWidth || 12,
    data: seriesObj.seriesData || [],
    color: seriesObj.color,
    animation: seriesObj.animation || true
  }] : series
  let options = {
    tooltip: existtooltip ? {
      show: true,
      trigger: seriesObj.seriesType === 'pie' ? 'item' : 'axis',
      axisPointer: {
        type: 'cross',
        lineStyle: {
          color: '#ddd'
        },
        label: {
          shadowBlur: 0
        },
        z: 3
      },
      confine: true,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      padding: [5, 10],
      textStyle: {
        color: '#6f6f6f'
      },
      extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); text-align: left;',
      formatter: function (params) {
        return tooltipFormatter(params, dataPoint, xAxisData, timeShowFormat, existDevEventType, tooltipTitle, dataEmpty)
      }
    } : {show: false},
    legend: showParams ? {
      top: 10,
      left: 40,
      formatter: function (name) {
        if (name.length > 16) {
          return name.slice(0, 16) + '...'
        } else {
          return name
        }
      },
      tooltip: {
        show: true,
        formatter: (param) => {
          return `<div class="echart-toolDiv">${param.name}</div>`
        }
      },
      ...legend
    } : {
      show: false
    },
    color: color,
    grid: {
      top: gridTop,
      left: gridLeft,
      right: seriesObj.xname === '日' ? '10%' : '40px',
      bottom: seriesObj.xname === '日' ? '5%' : '18%',
      containLabel: true
    },
    dataZoom: existdataZoom ? [
      {type: 'inside', start: existdataZoomRate, end: 100, moveOnMouseMove: false},
      {
        type: 'slider',
        show: existdataZoom,
        textStyle: {
          color: '#8392A5'
        },
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        dataBackground: {
          areaStyle: {
            // color: '#EEF0F1'
          },
          lineStyle: {
            opacity: 0.8,
            color: '#CAD0D4'
          }
        },
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        zoomLock: zoomLock,
        right: 80,
        left: 80
      }
    ] : [],
    toolbox: existToolbox ? {
      feature: {
        saveAsImage: {
          title: '下载图片'
          // icon: 'image://' + url,
          // iconStyle: {
          //   textAlign: 'right'
          // }
        }
      },
      itemSize: 14,
      top: 6,
      right: 8,
      iconStyle: {
        textPosition: 'right'
      },
      showTitle: false
    } : {},
    series: seriesEnd,
    backgroundColor: bgc
  }
  let xAxis = {
    type: xAxisType,
    data: xAxisData,
    offset: 8,
    axisTick: {
      alignWithLabel: true
    },
    splitLine: {
      show: false
    },
    nameLocation: seriesObj.xname === '日' ? 'end' : 'center',
    boundaryGap: xAxisType !== 'time',
    axisLabel: {
      formatter: showxAxisFormatter ? null : xAxisFormatter,
      fontSize: 14,
      rotate: seriesObj.xname === '日' ? 45 : 0,
      color: '#97999d'
    },
    name: (seriesObj.xname ? seriesObj.xname.length > 20 ? seriesObj.xname.slice(0, 20) + '...' : seriesObj.xname : '') || (showParamsdevname ? '设备名称:  ' + showParamsdevname : '') || '',
    nameTextStyle: {
      color: '#396282',
      fontWeight: 'bold'
    },
    nameGap: seriesObj.xname === '日' ? 5 : 24,
    axisLine: {
      lineStyle: {
        color: '#1f3e55'
      }
    },
    tooltip: {
      show: true,
      formatter: () => {
        return `<div class="echart-toolDiv">${seriesObj.xname}</div>`
      }
    }
  }
  let yAxis = Object.keys(utilYAxis).length > 0 ? utilYAxis : {
    type: 'value',
    name: seriesObj.yname || '',
    axisLabel: {
      formatter: yAxisFormatter,
      margin: 10,
      fontSize: 14,
      color: '#396282'
    },
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
        color: '#153044'
      }
    },
    axisTick: {show: false},
    axisLine: {
      lineStyle: {
        color: '#1f3e55',
        opacity: seriesObj.xname === '日' ? 1 : 0
      }
    }
  }
  let graphic = {
    type: 'text',
    left: 'center',
    top: showLabelnormal ? '35%' : '23%',
    z: 2,
    style: {
      text,
      textAlign: 'center',
      stroke: '#fff',
      font: '38px "黑体"',
      fill: showLabelnormal ? '#2297F4' : '#fff'
    }
  }
  if (seriesObj.seriesType === 'pie') {
    options.graphic = graphic
  } else {
    options.xAxis = xAxis
    options.yAxis = yAxis
  }
  return options
}
const yAxisFormatter = function (value) {
  return formatter(value)
}
const xAxisFormatter = function (value, index) {
  var date = new Date(value)
  var texts = [(date.getMonth() + 1), date.getDate()]
  return texts.join('-')
}
export {setEchartOption, yAxisFormatter, xAxisFormatter}
