import {DataRelation} from '../moduleRelation/dataRelationLogic'
export default function worker (self) {
  let dataRelation = new DataRelation()
  self.addEventListener('message', function (e) {
    let allProject = e.data.allProject
    let relations = e.data.relations
    let modifyContent = e.data.modifyContent
    let allDashBoard = e.data.allDashBoard
    let devices = e.data.devices
    let allGroup = e.data.allGroup
    // console.log(e.data)
    switch (e.data.type) {
      case 'deleteRelation':
        dataRelation.operateRelationToProject({allProject, relations, isDel: true, callback: (proList, isReqServe, pLength) => { self.postMessage({proList, isReqServe, pLength}) }})
        break
      case 'editRelation':
        dataRelation.operateRelationToProject({allProject, relations, isDel: false, modifyContent, callback: (proList, isReqServe, pLength) => { self.postMessage({proList, isReqServe, pLength}) }})
        break
      case 'deleteDevInDashBoard':
        dataRelation.operateDeviceToDashBoard({allDashBoard, devices, isDel: true, callback: (dBList, isReqServe, DBLength) => { self.postMessage({dBList, isReqServe, DBLength}) }})
        break
      case 'editDevInDashBoard':
        dataRelation.operateDeviceToDashBoard({allDashBoard, devices, isDel: false, modifyContent, callback: (dBList, isReqServe, DBLength) => { self.postMessage({dBList, isReqServe, DBLength}) }})
        break
      case 'deleteDevInGroup':
        dataRelation.delDeviceToGroupList({allGroup, devices, isDel: true, callback: (groupList, isReqServe, groupLength) => { self.postMessage({groupList, isReqServe, groupLength}) }})
        break
      case 'deleteDevInProject':
        dataRelation.operateDeviceToProject({allProject, devices, isDel: true, callback: (proList, isReqServe, pLength) => { self.postMessage({proList, isReqServe, pLength}) }})
        break
      case 'editDevInProject':
        dataRelation.operateDeviceToProject({allProject, devices, isDel: false, modifyContent, callback: (proList, isReqServe, pLength) => { self.postMessage({proList, isReqServe, pLength}) }})
        break
    }
  })
}