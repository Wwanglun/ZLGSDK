import ZLGAccountFlow from './httpModules/ZLGAccountFlow'
import ZLGAssistant from './httpModules/ZLGAssistant'
import ZLGCloudFile from './httpModules/ZLGCloudFile'
import ZLGCustomBigData from './httpModules/ZLGCustomBigData'
import ZLGCustomData from './httpModules/ZLGCustomData'
import ZLGDevice from './httpModules/ZLGDevice'
import ZLGDeviceCommand from './httpModules/ZLGDeviceCommand'
import ZLGDeviceData from './httpModules/ZLGDeviceData'
import ZLGDeviceEvent from './httpModules/ZLGDeviceEvent'
import ZLGDeviceGroup from './httpModules/ZLGDeviceGroup'
import ZLGDeviceType from './httpModules/ZLGDeviceType'
import ZLGFirmware from './httpModules/ZLGFirmware'
import ZLGFundAccount from './httpModules/ZLGFundAccount'
import ZLGLog from './httpModules/ZLGLog'
import ZLGMulticast from './httpModules/ZLGMulticast'
import ZLGOrganization from './httpModules/ZLGOrganization'
import ZLGPackage from './httpModules/ZLGPackage'
import ZLGProject from './httpModules/ZLGProject'
import ZLGRulesConfig from './httpModules/ZLGRulesConfig'
import ZLGRulesRecords from './httpModules/ZLGRulesRecords'
import ZLGSubDevice from './httpModules/ZLGSubDevice'
import ZLGSubuser from './httpModules/ZLGSubuser'
import ZLGSubuserAccess from './httpModules/ZLGSubuserAccess'
import ZLGUser from './httpModules/ZLGUser'
import ZLGWebApp from './httpModules/ZLGWebApp'

import ZLGHttp from './httpBase/ZLGHttp'

let ZLGApi = {
  init: function (baseURL, timeout, header) {
    ZLGHttp.getInstance(baseURL, timeout, header)
  },
  setErrorHandler: function (handler) {
    ZLGAccountFlow.setErrorHandler(handler)
    ZLGAssistant.setErrorHandler(handler)
    ZLGCloudFile.setErrorHandler(handler)
    ZLGCustomBigData.setErrorHandler(handler)
    ZLGCustomData.setErrorHandler(handler)
    ZLGDevice.setErrorHandler(handler)
    ZLGDeviceCommand.setErrorHandler(handler)
    ZLGDeviceData.setErrorHandler(handler)
    ZLGDeviceEvent.setErrorHandler(handler)
    ZLGDeviceGroup.setErrorHandler(handler)
    ZLGDeviceType.setErrorHandler(handler)
    ZLGFirmware.setErrorHandler(handler)
    ZLGFundAccount.setErrorHandler(handler)
    ZLGLog.setErrorHandler(handler)
    ZLGMulticast.setErrorHandler(handler)
    ZLGOrganization.setErrorHandler(handler)
    ZLGPackage.setErrorHandler(handler)
    ZLGProject.setErrorHandler(handler)
    ZLGRulesConfig.setErrorHandler(handler)
    ZLGRulesRecords.setErrorHandler(handler)
    ZLGSubDevice.setErrorHandler(handler)
    ZLGSubuser.setErrorHandler(handler)
    ZLGSubuserAccess.setErrorHandler(handler)
    ZLGUser.setErrorHandler(handler)
    ZLGWebApp.setErrorHandler(handler)
  },
  ZLGAccountFlow,
  ZLGAssistant,
  ZLGCloudFile,
  ZLGCustomBigData,
  ZLGCustomData,
  ZLGDevice,
  ZLGDeviceCommand,
  ZLGDeviceData,
  ZLGDeviceEvent,
  ZLGDeviceGroup,
  ZLGDeviceType,
  ZLGFirmware,
  ZLGFundAccount,
  ZLGLog,
  ZLGMulticast,
  ZLGOrganization,
  ZLGPackage,
  ZLGProject,
  ZLGRulesConfig,
  ZLGRulesRecords,
  ZLGSubDevice,
  ZLGSubuser,
  ZLGSubuserAccess,
  ZLGUser,
  ZLGWebApp
}

export default ZLGApi
