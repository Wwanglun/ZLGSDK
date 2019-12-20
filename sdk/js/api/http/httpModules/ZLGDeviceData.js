import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 设备数据
 */
class ZLGDeviceData extends ZLGBaseModule {
  /**
   * 删除设备数据
   * @param {*} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: { removedCount: 1 } }
   */
  static deleteDeviceDatas ({ devtype, devid, filter }) {
    return this.fetch({
      url: `/devices/${devid}/data`,
      method: 'delete',
      params: { devtype, filter }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }

  /**
   * 查询满足条件的设备数据
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @param {booleab} [params.descend] - 是否按降序排列
   * @param {number} [params.starttime] - 开始时间
   * @param {number} [params.endtime] - 结束时间
   * @param {number} [params.timezoneOffset] - 与0时区的分钟数差值（例：北京时间为-480）
   * @return {Promise<Response, Error>} -  Response: { result: true, message: '', jwt: '', data: [{}] }
   */
  static getDeviceDatas ({ devtype, devid, filter, skip, limit, aggregation,
    descend, starttime, endtime, timezoneOffset }) {
    return this.fetch({
      url: `/devices/${devid}/data`,
      method: 'get',
      params: { devtype, filter, skip, limit, aggregation, descend, starttime, endtime, timezoneOffset }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }

  /**
   * 通过 http 方式上传设备数据
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {Object} params.info - 要上传的数据
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {} }
   */
  static addDeviceDataByHttp ({ devtype, devid, info }) {
    return this.fetch({
      url: `/devices/${devid}/data`,
      method: 'post',
      data: info,
      params: { devtype }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过 mqtt 方式上传设备数据
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {Object} params.info - 要上传的数据
   * @return {Promise<Response, Error>} -
   */
  static addDeviceDataByMqtt (params) {
  }

  /**
   * 修改设备数据
   * @param {*} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {Object} params.info - 要修改的数据
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: { updateCount: 1 } }
   */
  static updateDeviceDatas ({ devtype, devid, filter, info }) {
    return this.fetch({
      url: `/devices/${devid}/data`,
      method: 'put',
      data: info,
      params: { devtype, filter }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }

  /**
   * 清除设备数据(清除该设备所有设备数据，不包含设备事件信息)
   * @param {*} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '' }
   */
  static clearDeviceDatas ({ devtype, devid }) {
    return this.fetch({
      url: `/devices/${devid}/data/clear`,
      method: 'delete',
      params: { devtype }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGDeviceData
