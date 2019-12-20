export class DataRelation {
  /**
   * 删除或修改设备, 对应关联此设备的项目内容删除或修改
   * @param {Array} allProject 所有的项目
   * @param {Array} devices 删除或修改的设备
   * @param {Boolean} isDel 是否删除
   * @param {Object} modifyContent 修改设备的名称{devname: '--'}
  */
  operateDeviceToProject ({allProject, devices, isDel, modifyContent, callback}) {
    let existDevProject = []
    allProject.forEach(v => {
      let utilDevs = []
      let flag = false
      if (v.device.length > 0) {
        v.device.forEach(vs => {
          let sameDev = devices.map(singleD => singleD.devid).includes(vs.id) && devices.map(singleD => singleD.devtype).includes(vs.type)
          if (isDel) {
            sameDev ? flag = true : utilDevs.push(vs)
          } else {
            if (sameDev) {
              flag = true
            }
            utilDevs.push(sameDev ? Object.assign({}, vs, modifyContent) : vs)
          }
        })
      }
      if (flag) {
        let singleP = {}
        singleP.project = v
        singleP.devices = utilDevs
        existDevProject.push(singleP)
      }
    })
    if (existDevProject.length !== 0) {
      callback && callback(existDevProject, true, allProject.length)
    } else {
      callback && callback(allProject, false)
    }
  }
  /**
   * 删除设备, 对应关联此设备的分组内容删除
   * @param {Array} allGroup 所有的分组
   * @param {Array} devices 删除或修改的设备
   * @param {Boolean} isDel 是否删除
   * @param {Function} callback 返回删除设备后的分组信息
  */
  delDeviceToGroupList ({allGroup, devices, callback}) {
    let existDelDevGroup = []
    allGroup.forEach(v => {
      v.devices.forEach(vs => {
        let sameDev = devices.map(singleD => singleD.devid).includes(vs.devid) && devices.map(singleD => singleD.devtype).includes(vs.devtype)
        if (sameDev) {
          let singleGroup = {}
          singleGroup.groupid = v.groupid
          singleGroup.device = vs
          existDelDevGroup.push(singleGroup)
        }
      })
    })
    if (existDelDevGroup.length !== 0) {
      callback && callback(existDelDevGroup, true, allGroup.length)
    } else {
      callback && callback(allGroup, false)
    }
  }
  /**
   * 删除或修改设备, 对应关联此设备的数据大盘内容删除或修改
   * @param {Array} allDashBoard 所有的数据大盘
   * @param {Array} devices 删除或修改的设备
   * @param {Boolean} isDel 是否删除的设备
   * @param {Object} modifyContent 修改设备的名称{devname: '--'}
   * @param {Function} callback 返回删除设备后的数据大盘信息
  */
  operateDeviceToDashBoard ({allDashBoard, devices, isDel, modifyContent, callback}) {
    let exitDelDevDashBoard = []
    allDashBoard.forEach(singleDash => {
      let DashData = JSON.parse(singleDash.data)
      let utilDevs = []
      let flag = false
      DashData.forEach(singleDev => {
        let sameDev = devices.map(singleD => singleD.devid).includes(singleDev.devid) && devices.map(singleD => singleD.devtype).includes(singleDev.devtype)
        if (isDel) {
          sameDev ? flag = true : utilDevs.push(singleDev)
        } else {
          if (sameDev) {
            flag = true
          }
          utilDevs.push(sameDev ? Object.assign({}, singleDev, modifyContent) : singleDev)
        }
      })
      if (flag) {
        let singleModifyDash = {}
        singleModifyDash.singleDB = singleDash
        singleModifyDash.devices = utilDevs
        exitDelDevDashBoard.push(singleModifyDash)
      }
    })
    if (exitDelDevDashBoard.length !== 0) {
      callback && callback(exitDelDevDashBoard, true, allDashBoard.length)
    } else {
      callback && callback(allDashBoard, false)
    }
  }
  /**
   * 删除或修改项目关联项, 对应关联此关联项的项目内容删除或修改
   * @param {Array} allProject 所有的项目
   * @param {Array} relations 项目关联项
   * @param {Boolean} isDel 是否删除
   * @param {Object} modifyContent 修改关联项的内容
   * @param {Function} callback 返回更新后的项目信息
  */
  operateRelationToProject ({allProject, relations, isDel, modifyContent, callback}) {
    let existRelaPro = []
    allProject.forEach(sP => {
      let flag = false
      let utilR = []
      sP.relation && sP.relation.forEach(sR => {
        let sameRelation = relations.map(id => id.dataid).includes(sR.id)
        if (isDel) {
          sameRelation ? flag = true : utilR.push(sR)
        } else {
          if (sameRelation) {
            flag = true
          }
          utilR.push(sameRelation ? Object.assign({}, sR, modifyContent) : sR)
        }
      })
      if (flag) {
        let singleP = {}
        singleP.project = sP
        singleP.relation = utilR
        existRelaPro.push(singleP)
      }
    })
    if (existRelaPro.length !== 0) {
      callback && callback(existRelaPro, true, allProject.length)
    } else {
      callback && callback(allProject, false)
    }
  }
}