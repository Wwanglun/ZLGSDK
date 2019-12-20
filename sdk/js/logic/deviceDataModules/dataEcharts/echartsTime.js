
let date = new Date()
let Y = date.getFullYear()
let M = date.getMonth()
let D = date.getDate()
let minMonth = [4, 6, 9, 11]
/**
 * 获取当天的时刻
 * @param current Number 当前小时
*/
const getHoursTime = (current) => {
  let hoursArr = []
  let initTime = new Date(Y, M, D) - 0
  hoursArr.push(initTime)
  for (let i = 1; i <= 24; i++) {
    if (current && i >= current + 1) {
      break
    }
    let times = new Date(Y, M, D) - 0
    times += i * 60 * 60 * 1000
    hoursArr.push(times)
  }
  return hoursArr.map(v => v / 1000)
}
/**
 * 获取每月
 * @param current Number 当前月
*/
const getMonthsTime = (current) => {
  let monthsArr = []
  let initTime = new Date(Y, 0) - 0
  monthsArr.push(initTime)
  for (let i = 1; i <= 12; i++) {
    if (current && i >= current + 1) {
      break
    }
    if (i === 2) {
      if ((Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0) {
        initTime += 60 * 60 * 24 * 29 * 1000
      } else {
        initTime += 60 * 60 * 24 * 28 * 1000
      }
    } else if (minMonth.indexOf(i) === -1) {
      initTime += 60 * 60 * 24 * 31 * 1000
    } else {
      initTime += 60 * 60 * 24 * 30 * 1000
    }
    monthsArr.push(initTime)
  }
  return monthsArr.map(v => v / 1000)
}
/**
 * 获取每年
 * @param startYear Number 开始年份
 * @param endYear Number 结束年份
*/
const getYearsTime = (startYear, endYear) => {
  let yearsArr = []
  for (let i = startYear; i <= endYear; i++) {
    let initTime = new Date(i, 0) - 0
    yearsArr.push(initTime)
  }
  return yearsArr.map(v => v / 1000)
}

// const getHalfYearsTime = () => {
//   let halfYearsArr = []
//   let initTime = new Date(Y, M) - 0
//   halfYearsArr.push(initTime)
//   for (let i = M; i >= M - 4; i--) {
//     if (i === 2) {
//       if ((Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0) {
//         initTime -= 60 * 60 * 24 * 29 * 1000
//       } else {
//         initTime -= 60 * 60 * 24 * 28 * 1000
//       }
//     } else if (minMonth.indexOf(i) === -1) {
//       initTime -= 60 * 60 * 24 * 31 * 1000
//     } else {
//       initTime -= 60 * 60 * 24 * 30 * 1000
//     }
//     halfYearsArr.unshift(initTime)
//   }
//   return halfYearsArr.map(v => v / 1000)
// }
/**
 * 获取180天的时间
*/
const thirtydayTime = () => {
  let thirtydayArr = []
  let initTime = new Date(Y, M, D) - 0
  thirtydayArr.push(initTime)
  for (let i = D; i > D - 180; i--) {
    initTime -= 60 * 60 * 24 * 1000
    thirtydayArr.unshift(initTime)
  }
  return thirtydayArr.map(v => v / 1000)
}
/**
 * 时间转换成 **年**月**日
*/
const timeTodays = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let Y = date.getFullYear() + '-'
  let M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  let D =
    date.getDate() < 10
      ? '0' + date.getDate() + ''
      : date.getDate() + ''
  return Y + M + D
}
/**
 * 时间转换成 **年**月
*/
const timesToMonths = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let Y = date.getFullYear() + '-'
  let M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1)
  return Y + M
}
/**
 * 时间转换成 **年
*/
const timesToYears = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let Y = date.getFullYear() + '年'
  return Y
}

/**
 * 把设备注册时间转换成 x年x月x日
 * @param {Array} timestamp 服务器返回的设备注册时间
*/
// const timestampToDay = (timestamp) => {
//   let date = new Date(timestamp * 1000)
//   let Y = date.getFullYear()
//   let M = date.getMonth()
//   let D = date.getDate()
//   return new Date(Y, M, D) - 0
// }

/**
 * 把选择的日期转换成天数
 * @param {Array} selectTime 选中的日期
*/
// const selectTimeToDays = (selectTime) => {
//   let date = new Date(selectTime[0] * 1000)
//   let selectDays = []
//   let distanceDays = Math.ceil((selectTime[1] - selectTime[0]) / 60 / 60 / 24)
//   let years = date.getFullYear()
//   let months = date.getMonth()
//   let day = date.getDate()
//   let initTime = new Date(years, months, day) - 0
//   selectDays.push(initTime)
//   for (let i = 0; i < distanceDays; i++) {
//     initTime += 60 * 60 * 24 * 1000
//     selectDays.push(initTime)
//   }
//   return selectDays
// }

/**
 * 传进的时间转成需要的时间, 如果小于1天, 按分钟返回; 当天, 按12个小时返回, 大于1天, 按天返回; 大于1个月, 按月返回
 * @param {Array} selectTime 传入的时间
*/
const selectTimeToTargetTime = (selectTime, moreMin = false) => {
  let date = new Date(selectTime[0] * 1000)
  let selectDays = []
  let distanceDays = Math.floor((selectTime[1] - selectTime[0]) / 60 / 60 / 24)
  let minutesDistance = Math.ceil((selectTime[1] - selectTime[0]) / 60)
  let years = date.getFullYear()
  let months = date.getMonth()
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let initTime
  if (moreMin && distanceDays === 0) {
    // 设备消息使用
    if (minutesDistance / 60 > 1) {
      initTime = new Date(years, months, day, hours) - 0
      let startHours = new Date(selectTime[0] * 1000).getHours()
      let endHours = new Date(selectTime[1] * 1000).getDate() > new Date(selectTime[0] * 1000).getDate()
        ? new Date(selectTime[1] * 1000).getHours() + 24
        : new Date(selectTime[1] * 1000).getHours()
      selectDays.push(initTime)
      for (let i = startHours; i <= endHours; i++) {
        initTime += 60 * 60 * 1000
        selectDays.push(initTime)
      }
    } else {
      // let utilMinute = 0
      // if (minutes > 45) {
      //   utilMinute = 45
      // } else if (minutes > 30) {
      //   utilMinute = 30
      // } else if (minutes > 15) {
      //   utilMinute = 15
      // } else {
      //   utilMinute = 0
      // }
      initTime = new Date(years, months, day, hours, minutes) - 0
      selectDays.push(initTime)
      for (let i = 0; i <= Math.ceil(minutesDistance / 15); i++) {
        initTime += 60 * 1000 * 15
        selectDays.push(initTime)
      }
    }
  } else if (distanceDays === 0 && Math.floor((selectTime[1] - selectTime[0]) / 60 / 60) < 6) {
    initTime = new Date(years, months, day, hours, minutes) - 0
    selectDays.push(initTime)
    for (let i = 0; i < minutesDistance; i++) {
      initTime += 60 * 1000
      selectDays.push(initTime)
    }
  } else if ((distanceDays === 0 && Math.floor((selectTime[1] - selectTime[0]) / 60 / 60) >= 6) || distanceDays === 1) {
    initTime = new Date(years, months, day, hours) - 0
    let startHours = new Date(selectTime[0] * 1000).getHours()
    let endHours = new Date(selectTime[1] * 1000).getDate() > new Date(selectTime[0] * 1000).getDate()
      ? new Date(selectTime[1] * 1000).getHours() + 24
      : new Date(selectTime[1] * 1000).getHours()
    selectDays.push(initTime)
    for (let i = startHours + 1; i <= endHours; i++) {
      initTime += 60 * 60 * 1000
      selectDays.push(initTime)
    }
  } else if (distanceDays > 1 && distanceDays < 30) {
    let daysDistance = Math.ceil((selectTime[1] - selectTime[0]) / 60 / 60 / 24)
    initTime = new Date(years, months, day) - 0
    selectDays.push(initTime)
    for (let i = 0; i <= daysDistance; i++) {
      initTime += 60 * 60 * 24 * 1000
      selectDays.push(initTime)
    }
  } else if (distanceDays === 30 || distanceDays === 31) {
    initTime = new Date(years, months) - 0
    selectDays.push(initTime)
    for (let i = 1; i < distanceDays; i++) {
      initTime += 60 * 60 * 24 * 1000
      selectDays.push(initTime)
    }
  } else if (distanceDays > 31 && distanceDays <= 366) {
    initTime = new Date(years, months) - 0
    let startMs = new Date(years, months).getMonth() + 1
    let endMs = new Date(selectTime[1] * 1000).getFullYear() > new Date(selectTime[0] * 1000).getFullYear()
      ? new Date(selectTime[1] * 1000).getMonth() + 1 + 12
      : new Date(selectTime[1] * 1000).getMonth() + 1
    selectDays.push(initTime)
    if (endMs <= 12) {
      for (let i = startMs; i < endMs; i++) {
        if (i === 2) {
          if ((years % 4 === 0 && years % 100 !== 0) || years % 400 === 0) {
            initTime += 60 * 60 * 24 * 29 * 1000
          } else {
            initTime += 60 * 60 * 24 * 28 * 1000
          }
        } else if (minMonth.indexOf(i) === -1) {
          initTime += 60 * 60 * 24 * 31 * 1000
        } else {
          initTime += 60 * 60 * 24 * 30 * 1000
        }
        selectDays.push(initTime)
      }
    } else {
      for (let i = startMs; i <= 12; i++) {
        if (i === 2) {
          let years = new Date(selectTime[0] * 1000).getFullYear()
          if ((years % 4 === 0 && years % 100 !== 0) || years % 400 === 0) {
            initTime += 60 * 60 * 24 * 29 * 1000
          } else {
            initTime += 60 * 60 * 24 * 28 * 1000
          }
        } else if (minMonth.indexOf(i) === -1) {
          initTime += 60 * 60 * 24 * 31 * 1000
        } else {
          initTime += 60 * 60 * 24 * 30 * 1000
        }
        selectDays.push(initTime)
      }
      for (let i = 1; i < endMs - 12; i++) {
        if (i === 2) {
          let years = new Date(selectTime[1] * 1000).getFullYear()
          if ((years % 4 === 0 && years % 100 !== 0) || years % 400 === 0) {
            initTime += 60 * 60 * 24 * 29 * 1000
          } else {
            initTime += 60 * 60 * 24 * 28 * 1000
          }
        } else if (minMonth.indexOf(i) === -1) {
          initTime += 60 * 60 * 24 * 31 * 1000
        } else {
          initTime += 60 * 60 * 24 * 30 * 1000
        }
        selectDays.push(initTime)
      }
    }
  } else {
    initTime = new Date(years, 0) - 0
    let startY = new Date(years, 0).getFullYear()
    let endY = new Date(selectTime[1] * 1000).getFullYear()
    selectDays.push(initTime)
    for (let i = startY + 1; i <= endY; i++) {
      if ((i % 4 === 0 && i % 100 !== 0) || i % 400 === 0) {
        initTime += 60 * 60 * 24 * 366 * 1000
      } else {
        initTime += 60 * 60 * 24 * 365 * 1000
      }
      selectDays.push(initTime)
    }
  }
  return selectDays
}

/**
 * 把设备注册时间转换成 指定的时间格式
 * @param {Array} timestamp 服务器返回的设备注册时间
 * @param {Array} selectTime 用户选择的时间
*/
const timestampToSpecifiedTime = (timestamp, selectTime) => {
  let distanceDays = Math.floor((selectTime[1] - selectTime[0]) / 60 / 60 / 24)
  let date = new Date(timestamp * 1000)
  let devY = date.getFullYear()
  let devM = date.getMonth()
  let devD = date.getDate()
  let devH = date.getHours()
  let devMi = date.getMinutes()
  if (distanceDays === 0 && Math.floor((selectTime[1] - selectTime[0]) / 60 / 60) < 6) {
    return new Date(devY, devM, devD, devH, devMi) - 0
  } else if (distanceDays === 0 && Math.floor((selectTime[1] - selectTime[0]) / 60 / 60) >= 6) {
    return new Date(devY, devM, devD, devH) - 0
  } else if (distanceDays === 1) {
    return new Date(devY, devM, devD, devH) - 0
  } else if (distanceDays > 1 && distanceDays < 30) {
    return new Date(devY, devM, devD) - 0
  } else if (distanceDays === 30 || distanceDays === 31) {
    return new Date(devY, devM, devD) - 0
  } else if (distanceDays > 31 && distanceDays <= 366) {
    return new Date(devY, devM) - 0
  } else {
    return new Date(devY, 0) - 0
  }
}
/**
 * 根据选择时间的间隔格式化时间样式
 * @param {Array} selectTime 用户选择的时间
 * @param {Array} timestamp 用户选择的时间[0]/[1]
*/
const logtimeToformatTime = (selectTime, timestamp) => {
  let distanceDays = Math.floor((selectTime[1] - selectTime[0]) / 60 / 60 / 24)
  const date = new Date(timestamp * 1000)
  const Y = date.getFullYear()
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1)
  const D =
    date.getDate() < 10
      ? '0' + date.getDate()
      : date.getDate()
  const H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
  const Minute =
    date.getMinutes() < 10
      ? '0' + date.getMinutes()
      : date.getMinutes()
  if (distanceDays === 0) {
    return Y + '/' + M + '/' + D + ' ' + H + ':' + Minute
  } else if (distanceDays === 1) {
    return Y + '-' + M + '-' + D + ' ' + H + '时'
  } else if (distanceDays > 1 && distanceDays < 30) {
    return Y + '/' + M + '/' + D
  } else if (distanceDays === 30 || distanceDays === 31) {
    return Y + '/' + M + '/' + D + ' '
  } else if (distanceDays > 31 && distanceDays <= 366) {
    return Y + '/' + M
  } else {
    return Y + ''
  }
}

/**
 * 根据设备类型或设备id 表格展示消息数
 * @param {Array} selectTime 用户选择的时间
 * @param {Array} timestamp 用户选择的时间[0]/[1]
*/

export {
  getHoursTime,
  getMonthsTime,
  getYearsTime,
  // getHalfYearsTime,
  thirtydayTime,
  // timestampToDay,
  // selectTimeToDays,
  selectTimeToTargetTime,
  timestampToSpecifiedTime,
  logtimeToformatTime,
  timeTodays,
  timesToMonths,
  timesToYears
}
