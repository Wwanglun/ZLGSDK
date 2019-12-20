import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 设备事件
 */
class ZLGDeviceEvent extends ZLGBaseModule {
  /**
   * 删除单个设备事件
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @return {Promise<Response, Error>} -
   */
  static deleteSingleDeviceEvent ({ devtype, devid, filter }) {
    return this.fetch({
      url: `/devices/${devid}/event`,
      method: 'delete',
      params: { devtype, filter }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_DEVINFO_PARAM_WRONG,
        400: ZLGErrors.ZLG_DEVICE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询满足条件的设备事件
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {string} params.filter - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} params.skip - 跳过前面N条记录
   * @param {number} params.limit - 最多返回的记录数
   * @param {string} params.aggregation - 数据聚合功能
   * @param {booleab} params.descend - 是否按降序排列
   * @return {Promise<Response, Error>} -
   */
  static getDeviceEvents ({ devtype, devid, filter, skip, limit, aggregation, descend }) {
    return this.fetch({
      url: `/devices/${devid}/event`,
      method: 'get',
      params: { devtype, filter, skip, limit, aggregation, descend }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过 http 方式添加一条设备事件
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {Object} params.event - 设备事件
   * @return {Promise<Response, Error>} -
   */
  static addDeviceEventByHttp ({ devtype, devid, event }) {
    return this.fetch({
      url: `/devices/${devid}/event`,
      method: 'post',
      data: event,
      params: { devtype }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过 mqtt 方式添加一条设备事件
   * @param {Object} params
   * @param {Object} params.event - 设备事件
   * @return {Promise<Response, Error>} -
   */
  static addDeviceEventByMqtt (params) {
  }

  /**
   * 批量更新设备事件
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.filter - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {Object} params.event - 要修改的数据
   * @return {Promise<Response, Error>} -
   */
  static updateMutipleDeviceEvents ({ devtype, devid, filter, event }) {
    return this.fetch({
      url: `/devices/${devid}/event`,
      method: 'put',
      params: { devtype, filter },
      data: event
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新eventid指定的设备事件
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.eventid - 事件ID
   * @param {Object} params.event - 要修改的数据
   * @return {Promise<Response, Error>} -
   */
  static updateDeviceEventById ({ devtype, devid, eventid, event }) {
    return this.fetch({
      url: `/devices/${devid}/event/${eventid}`,
      method: 'put',
      params: { devtype },
      data: event
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_EVENT_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除多个设备事件
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string[]} [params.info] - 删除设备事件eventid
   * @return {Promise<Response, Error>} -
   */
  static deleteMutipleDeviceEvent ({ devtype, devid, info }) {
    return this.fetch({
      url: `/devices/${devid}/event/batch/delete`,
      method: 'post',
      params: { devtype },
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGDeviceEvent
