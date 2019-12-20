/* import { timestampToTimeForService } from 'COMMON/util/utils'
import ZlgCloudHelper from 'API/ZlgCloudHelper.js' */
import {timestampToTimeForService} from '../util/utils.js'

/**
 * 把已筛选的设备数组以选择框的value形式展示
 * @param {Array} devices 
 */
export function showSelectedDevice (devices) {
  let selectArray = []
  if (devices) {
    devices.forEach(item => {
      item && selectArray.push(`${item.devid},${item.devtype}`)
    })
  }
  return Array.from(new Set(selectArray))
}

/**
 * 过滤掉表格多选的只会传递当前表格多选值的问题
 * @param {Array} devices 
 */
export function filterAllSelectedDevice (currentPageList, mutipleSelection, allSelectedDevice) {
  let newDevice = []
  let currentPageRemovedDevice = []
  currentPageList.forEach(item => {
    let flag = false
    mutipleSelection.forEach(value => {
      if (value && (item.devtype == value.devtype) && (item.devid == value.devid)) {
        flag = true
      }
    })
    if (!flag) {
      currentPageRemovedDevice.push(item)
    }
  })
  currentPageRemovedDevice.forEach(item => {
    allSelectedDevice.forEach((value, index) => {
      if (item && value && (item.devtype == value.devtype) && (item.devid == value.devid)) {
        allSelectedDevice.splice(index, 1) 
      }
    })
  })
  let temp = allSelectedDevice.concat(mutipleSelection)
  // 去重
  temp.forEach(item => {
    let flag = false
    newDevice.forEach(value => {
      if (item && value && (item.devtype == value.devtype) && (item.devid == value.devid)) {
        flag = true
      }
    })
    if (!flag) {
      newDevice.push(item)
    }
  })
  return newDevice
}

/**
 * 获取项目列表
 * @param {*} getter 
 */
export function getProjectsList (getter) {
  let list = []
  let total = 0
  let projectList = ZlgCloudHelper.getProjectsList({
    filter: getter.filter,
    skip: (getter.currentPage - 1) * getter.size,
    limit: getter.size,
    descend: true
  })
    .then(res => {
      res.data.forEach(item => {
        let singer = {}
        singer.create_time = timestampToTimeForService(item.create_time) // 项目的创建时间
        singer.projectid = item.projectid // 项目id
        singer.projectname = item.projectname // 项目名称
        singer.projectdesc = item.desc // 项目描述
        singer.deviceNum = item.device.length // 项目设备数量
        singer.deviceLogs = 0 // 项目全部设备日志
        singer.deviceEvents = 0 // 项目全部设备设备事件
        singer.databoardNum = 0 // 项目数据看板
        singer.configurationNum = 0 // 项目组态
        singer.reportformNum = 0 // 项目报表
        singer.triggerNum = 0 // 项目触发器
        singer.alarmNum = 0 // 项目已关联设备产生的触发事件
        item.relation &&
          item.relation.forEach(value => {
            singer[value.type.slice(10) + 'Num']++
          })
        let devtypeArray = null
        list.push(singer)
      })
      list = Array.from(new Set(list))
    }).catch(error => {
      console.log(error)
    })
  let projectCount = ZlgCloudHelper.getProjectsList({
    filter: getter.filter,
    aggregation: 'count'}).then(res => {
    total = res.count
  })
  if (getter.count) {
    return Promise.all([projectList, projectCount]).then(() => {
      return {list: list, total: total}
    })
  } else {
    return Promise.all([projectList]).then(() => {
      return {list: list, total: total}
    })
  }
}
/**
 * 获取项目信息
 * @param {*} projectid 
 */
export function getProjectInfo (allProject, projectid) {
  let project = {}
  let info = allProject.filter(v => v.projectid == projectid)[0]
  if (!info) {
    return {}
  }
  project.name = info.projectname
  project.projectdesc = info.desc
  project.device = []
  project.configuration = []
  project.databoard = []
  project.reportform = []
  project.trigger = []
  project.originDevice = JSON.parse(JSON.stringify(info.device))
  info.device.forEach(value => {
    value.devname && project.device.push(`${value.id},${value.type}`)
  })
  info.relation.forEach(value => {
    if (value.type.indexOf('cloud_app') !== -1) {
      project[value.type.slice(10)].push(value.id)
    }
  })
  return project
}

/**
 * 根据dataname，或者相应的项目数据，以数组导出
 * @param {*} projectid 
 */
export function projectDataRelation (projectidArray, allProjectData) {
  let projectData = []
  projectidArray.forEach(value => {
    allProjectData.forEach(item => {
      if (value == item.dataid) {
        item.label = item.dataname
        item.value = item.dataid
        projectData.push(item)
      }
    })
  })
  return projectData
}
/**
 * 根据选择的设备，动态渲染下方的设备列表
 * @param {*} selectedDevice 
 * @param {*} allDevice 
 */
export function getProjectDeviceList (selectedDevice, allDevice) {
  // console.log('getProjectDeviceList 0')
  let deviceListData = []
  selectedDevice.length && selectedDevice.forEach(value => {
    Object.keys(allDevice).forEach(item => {
      allDevice[item].forEach(key => {
        // eslint-disable-next-line
        if (`${key.devid},${key.devtype}` == value) {
          deviceListData.push(key)
        }
      })
    })
  })
  // console.log('getProjectDeviceList deviceListData: ', deviceListData)
  return deviceListData
}
/**
 * 格式化设备数据成接口需要的数据格式
 * @param {*} project 
 * @param {*} options 
 */
export function formateProjectInfo (project, options, deviceListData) {
  let info = {}
  info.projectname = project.name
  info.desc = project.projectdesc
  info.device = []
  info.relation = []
  deviceListData.forEach(item => {
    let singer = {}
    singer.devname = item.devname
    singer.id = item.devid
    singer.type = item.devtype
    singer.status = item.status
    info.device.push(singer)
  })
  Object.keys(project).forEach(associated => {
    if (
      associated === 'databoard' ||
      associated === 'configuration' ||
      associated === 'reportform' ||
      associated === 'trigger'
    ) {
      project[associated].forEach(value => {
        options[associated + 'GroupOptions'].forEach(item => {
          if (item.value === value) {
            let singer = {}
            singer.dataname = item.label
            singer.id = item.value
            singer.datadesc = item.desc
            singer.create_time = timestampToTimeForService(item.create_time)
            singer.type = 'cloud_app_' + associated
            info.relation.push(singer)
          }
        })
      })
    }
  })
  return info
}
/**
 * 删除设备的选项，兼容删除单个和多个设备
 * @param {*} mutipleSelection 
 */
export function deleteProject (mutipleSelection) {
  let deleteArray = []
  mutipleSelection.forEach(v => {
    deleteArray.push(v.projectid)
  })
  return ZlgCloudHelper.batchDeleteProject({
    info: deleteArray
  }).then(res => {
    return res.data.removedCount
  })
}
