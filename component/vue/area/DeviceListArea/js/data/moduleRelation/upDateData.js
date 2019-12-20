/* import ZlgCloudHelper from 'API/ZlgCloudHelper.js' */
import ZlgCloudHelper from '../../../../../../../sdk/js/api/http/httpModules/ZLGAssistant'
export class UpdateData {
  /**
   * 更新项目 关联项
   * @param {Object} params 子线程传递的参数{proList: '需要更新的项目列表', isReqserve: '是否需要请求接口', pLeng: '项目数'}
   * @param {Function} callback 返回最新的项目列表
  */
  updateProjectListRelation (params, callback) {
    console.log(params)
    if (params.isReqServe) {
      console.log(1111)
      let needOpreateP = []
      params.proList.forEach(sP => {
        let singleP = ZlgCloudHelper.updateProjectInfo({
          projectid: sP.project.projectid,
          info: {
            projectname: sP.project.projectname,
            projectdesc: sP.project.projectdesc,
            device: sP.project.device,
            relation: sP.relation
          }
        })
        needOpreateP.push(singleP)
      })
      Promise.all(needOpreateP).then(_ => {
        ZlgCloudHelper.getProjectsList({limit: params.pLength}).then(res => {
          callback && callback(res.data)
        })
      })
    } else {
      callback && callback(params.proList)
    }
  }
  /**
   * 删除设备, 更新数据大盘关联的设备
   * @param {Object} params 子线程传递的参数{dBList: '需要更新的数据大盘列表', isReqserve: '是否需要请求接口', DBLength: '大盘数'}
   * @param {Function} callback 返回最新的数据大盘列表
  */
  updateDashBoardList (params, callback) {
    if (params.isReqServe && params.dBList) {
      let exitDelDevDashBoard = []
      params.dBList.forEach(dB => {
        let singleModifyDash = ZlgCloudHelper.putProjectData({
          dataid: dB.singleDB.dataid,
          info: {
            datatype: dB.singleDB.datatype,
            dataname: dB.singleDB.dataname,
            datadesc: dB.singleDB.datadesc,
            data: JSON.stringify(dB.devices)
          }
        })
        exitDelDevDashBoard.push(singleModifyDash)
      })
      Promise.all(exitDelDevDashBoard).then(_ => {
        ZlgCloudHelper.getProjectDatas({filter: {datatype: 'cloud_app_databoard'}, limit: params.DBLength}).then(list => {
          callback && callback(list.data)
        })
      })
    } else {
      callback && callback(params.dBList)
    }
  }
  /**
   * 删除设备, 更新设备分组信息
   * @param {Object} params 子线程传递的参数{dBList: '需要更新的分组列表', isReqserve: '是否需要请求接口', groupLength: '分组数'}
   * @param {Function} callback 返回最新的设备分组信息
  */
  updateGroupList (params, callback) {
    if (params.isReqServe) {
      let existDelDevGroup = []
      params.groupList.forEach(gL => {
        let singleGroup = ZlgCloudHelper.deleteDeviceFromPlant({
          groupid: gL.groupid,
          devid: gL.device.devid,
          devtype: gL.device.devtype
        })
        existDelDevGroup.push(singleGroup)
      })
      Promise.all(existDelDevGroup).then(_ => {
        ZlgCloudHelper.queryPlant({limit: params.groupLength}).then(res => {
          callback && callback(res.data)
        })
      })
    } else {
      callback && callback(params.groupList)
    }
  }
  /**
   * 更新项目 设备
   * @param {Object} params 子线程传递的参数{proList: '需要更新的项目列表', isReqserve: '是否需要请求接口', pLeng: '项目数'}
   * @param {Function} callback 返回最新的项目列表
  */
  updateProjectListDev (params, callback) {
    if (params.isReqServe) {
      let existDevProject = []
      console.log(2222)
      params.proList.forEach(sP => {
        let singleP = ZlgCloudHelper.updateProjectInfo({
          projectid: sP.project.projectid,
          info: {
            projectname: sP.project.projectname,
            projectdesc: sP.project.projectdesc,
            device: sP.devices,
            relation: sP.project.relation
          }
        })
        existDevProject.push(singleP)
      })
      Promise.all(existDevProject).then(_ => {
        ZlgCloudHelper.getProjectsList({limit: params.pLength}).then(res => {
          callback && callback(res.data)
        })
      })
    } else {
      callback && callback(params.proList)
    }
  }
}