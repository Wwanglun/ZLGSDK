import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 帮助接口
 */
class ZLGAssistant extends ZLGBaseModule {
  /**
   * 获取用户描述信息
   */
  static getUserSchema () {
    return this.fetch({
      url: '/dev/user_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取账单信息
   */
  static getBillSchema () {
    return this.fetch({
      url: '/dev/billing_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取账户信息
   */
  static getFundAccountSchema () {
    return this.fetch({
      url: '/dev/fund_account_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取自定义设备类型信息
   */
  static getDevtypeSchema () {
    return this.fetch({
      url: '/dev/devtype_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取自定义设备类型参数信息
   */
  static getDevtypeDataSchema () {
    return this.fetch({
      url: '/dev/devtype_data_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取设备描述信息
   */
  static getDeviceSchema () {
    return this.fetch({
      url: '/dev/device_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取设备组播描述信息
   */
  static getDeviceMulticastSchema () {
    return this.fetch({
      url: '/dev/device_multicast',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取用户组织描述信息
   */
  static getOrganizationSchema () {
    return this.fetch({
      url: '/dev/orgnization_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取设备分组描述信息
   */
  static getDeviceGroupSchema () {
    return this.fetch({
      url: '/dev/device_group_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取子用户描述信息
   */
  static getSubUserSchema () {
    return this.fetch({
      url: '/dev/subuser_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取子用户中权限描述信息
   */
  static getSubuerAccessSchema () {
    return this.fetch({
      url: '/dev/subuser_access_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取项目描述信息
   */
  static getProjectSchema () {
    return this.fetch({
      url: '/dev/project_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取项目数据描述信息
   */
  static getProjectDataSchema () {
    return this.fetch({
      url: '/dev/project_data_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取Webmqtt描述信息
   */
  static getWebmqttSchema () {
    return this.fetch({
      url: '/dev/webmqtt_schema',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取错误码信息
   */
  static getCodeDesc () {
    return this.fetch({
      url: '/dev/code_desc',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 日志信息配置
   */
  static getLoggerConfig () {
    return this.fetch({
      url: '/dev/logger',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGAssistant
