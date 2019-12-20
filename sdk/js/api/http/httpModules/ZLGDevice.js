import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 设备信息
 */
class ZLGDevices extends ZLGBaseModule {
  /**
   * 查询满足条件的设备信息
   * @param {Object} [params]
   * @param {string} [params.devtype] - 设备类型
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @param {booleab} [params.descend] - 是否按降序排列
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Device}] }
   */
  static getDevicesList ({ devtype, filter, skip, limit, aggregation, descend } = {}) {
    return this.fetch({
      url: '/devices',
      method: 'get',
      params: { devtype, filter, skip, limit, aggregation, descend }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }

  /**
   * 添加新设备
   * @param {Object} params
   * @param {Object} params.info - 设备信息
   * @param {Object} params.info.devtype - 设备类型
   * @param {Object} params.info.devid - 设备ID
   * @param {Object} params.info.devname - 设备名称
   * @param {Object} [params.info.devgroup] - 设备分组
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link Device} }
   */
  static addDevice ({ info }) {
    return this.fetch({
      url: '/devices',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }

  /**
   * 通过设备类型和设备ID删除设备
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '' }
   */
  static deleteSingleDevice ({ devtype, devid }) {
    return this.fetch({
      url: `/devices/${devid}`,
      method: 'delete',
      params: { devtype }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }

  /**
   * 通过设备类型和设备ID查询设备信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @return {Promise<Response, Error>} - Response: @link Device
   */
  static getDeviceInfo ({ devtype, devid }) {
    return this.fetch({
      url: `/devices/${devid}`,
      method: 'get',
      params: { devtype }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }

  /**
   * 更新设备信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {Object} params.info - 要更新的设备信息
   * @return {Promise<Response, Error> - Response: { result: true, message: '', jwt: '', data: {@link Device} }
   */
  static updateDeviceInfo ({ devtype, devid, info }) {
    return this.fetch({
      url: `/devices/${devid}`,
      method: 'put',
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
   * 批量删除设备
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string[]} params.info - 设备ID数组
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: { removedCount: 1 } }
   */
  static deleteMutipleDevices ({ devtype, info }) {
    return this.fetch({
      url: '/devices/batch/delete',
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
   * 根据设备类型和设备ID查询设备密钥
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: { devsecret: '' } }
   */
  static getDeviceSecret ({ devtype, devid }) {
    return this.fetch({
      url: `/devices/${devid}/secret`,
      method: 'get',
      params: { devtype }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }

  /**
   * 根据设备类型和设备ID修改设备密钥
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {string} params.devsecret - 新的设备密钥值
   * @return {Promise<Response, Error>} -
   */
  static updateSingleDeviceSecret ({ devtype, devid, devsecret }) {
    return this.fetch({
      url: `/devices/${devid}/secret`,
      method: 'put',
      params: { devtype },
      data: { devsecret }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 批量更新设备的密钥值
   * @param {Object} params
   * @param {Object[]} params.info
   * @param {string} params.info[].devtype - 设备类型
   * @param {string} params.info[].devid - 设备ID
   * @param {string} params.info[].devsecret - 新的设备密钥值
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: { updateCount: 1 } }
   */
  static updateMutipleDeviceSecret ({ info }) {
    return this.fetch({
      url: '/multi_devices/secrets',
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGDevices
