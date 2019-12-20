import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 命令组播
 */
class ZLGMulticast extends ZLGBaseModule {
  /**
   * 获取组播列表
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Multicast}] }
   */
  static getMulticastList ({ filter, descend, skip, limit, aggregation } = {}) {
    return this.fetch({
      url: '/multicast',
      method: 'get',
      params: { filter, descend, skip, limit, aggregation }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 创建新组播
   * @param {Object} params
   * @param {string} params.type - 组播类型（LoRaWAN / ZWS）,目前仅支持LoRaWAN
   * @param {Object} params.info - 组播基本信息
   * @param {string} params.info.name - 组播名
   * @param {string} params.info.desc - 描述
   * @param {string} params.info.groupType - 设备类型" 筛选值项[CLASS_B, CLASS_C]
   * @param {string} params.info.mcAddr - 组播地址 8位16进制字符
   * @param {string} params.info.mcAppSKey - 组播秘钥mcAppSKey 32位16进制字符
   * @param {string} params.info.mcNwkSKey - 组播秘钥mcNwkSKey 32位16进制字符
   * @param {string} params.info.pingSlotPeriod - pingSlotPeriod  筛选值项[32,64,128,256,512,1024,2048,4096]
   * @param {string} params.info.dr - Data-rate 筛选值项[0,1,2,3,4,5]
   * @param {int} params.info.fCnt - Frame-counter 0-4294967295
   * @param {int} params.info.frequency - 频点(Hz) 0-2147483647
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link Multicast} }
   */
  static addMulticast ({ type, info }) {
    return this.fetch({
      url: `/multicast`,
      method: 'post',
      params: { type },
      data: info
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_MULTICAST_PARAM_WRONG,
        409: ZLGErrors.ZLG_MULTICAST_ADDR_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除组播
   * @param {Object} params
   * @param {string} params.groupid - 组播ID
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '' }
   */
  static deleteMulticast ({ groupid }) {
    return this.fetch({
      url: `/multicast/${groupid}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_MULTICAST_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询指定组播的信息
   * @param {Object} params
   * @param {string} params.groupid - 组播ID
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link Multicast} }
   */
  static getMulticastInfoByID ({ groupid }) {
    return this.fetch({
      url: `/multicast/${groupid}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_MULTICAST_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新组播信息
   * @param {Object} params
   * @param {string} params.groupid - 组播ID
   * @param {Object} params.info - 组播基本信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link Multicast} }
   */
  static updateMulticast ({ groupid, info }) {
    return this.fetch({
      url: `/multicast/${groupid}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_MULTICAST_PARAM_WRONG,
        404: ZLGErrors.ZLG_MULTICAST_NOT_EXIST,
        409: ZLGErrors.ZLG_MULTICAST_ADDR_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 从指定组播中添加指定设备,只能是设备，不能是网关
   * @param {Object} params
   * @param {string} params.groupid - 组播ID
   * @param {Array} params.devices - 设备基本信息({devid: '', devtype: ''})
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {} }
   */
  static addDevicesInMulticast ({ groupid, devices }) {
    return this.fetch({
      url: `/multicast/${groupid}/add`,
      method: 'post',
      data: devices
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 从指定组播中删除指定设备
   * @param {Object} params
   * @param {string} params.groupid - 组播ID
   * @param {Array} params.devices - 设备基本信息({devid: '', devtype: ''})
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {} }
   */
  static deleteDevicesFromMulticast ({ groupid, devices }) {
    return this.fetch({
      url: `/multicast/${groupid}/remove`,
      method: 'put',
      data: devices
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 发送命令给指定的组播
   * @param {Object} params
   * @param {string} params.groupid - 组播ID
   * @param {string} params.command - 命令名称(支持透传命令pass_through)
   * @param {Object} params.args - 命令参数
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {} }
   */
  static sendCommandToMulticast ({ groupid, command, args }) {
    return this.fetch({
      url: `/multicast/${groupid}/commands/${command}`,
      method: 'put',
      data: args
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_MULTICAST_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGMulticast
