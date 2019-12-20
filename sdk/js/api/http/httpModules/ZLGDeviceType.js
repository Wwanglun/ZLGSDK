import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 设备类型
 */
class ZLGDeviceType extends ZLGBaseModule {
  /**
   * 查询满足条件的设备类型信息
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @param {booleab} [params.descend] - 是否按降序排列
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: [{@link DeviceType}] }
   */
  static getDevtypesList ({ filter, skip, limit, aggregation, descend } = {}) {
    return this.fetch({
      url: '/devtype',
      method: 'get',
      params: { filter, skip, limit, aggregation, descend }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加自定义设备类型
   * @param {DeviceType} params - 主要属性如下，其他属性请参考{@link DeviceType}
   * @param {string} params.devtype - 设备类型(2-64字节，满足a-z0-9)
   * @param {string} params.basetype - 设备模板, 请查询/dev/device_schema
   * @param {string} [params.comment] - 备注
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static addDevtype (params) {
    return this.fetch({
      url: '/devtype',
      method: 'post',
      data: params
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除指定设备类型
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '' }
   */
  static deleteSingleDevtype ({ devtype }) {
    return this.fetch({
      url: `/devtype/${devtype}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询指定设备类型的信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static getDeviceTypeInfoByType ({ devtype }) {
    return this.fetch({
      url: `/devtype/${devtype}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新设备类型信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @param {Object} params.info - 设备类型信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static updateDevtypeInfo ({ devtype, info }) {
    return this.fetch({
      url: `/devtype/${devtype}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 批量删除设备类型
   * @param {Object} params
   * @param {string[]} params.devtypes - 设备类型名称数组
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: { removedCount: 1 } }
   */
  static deleteMutipleDevtype ({ devtypes }) {
    return this.fetch({
      url: '/devtype/batch/delete',
      method: 'post',
      data: devtypes
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 修改设备类型 data(数据)信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @param {Object} params.info - data信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static updateDevtypeDataPoint ({ devtype, info }) {
    return this.fetch({
      url: `/devtype/${devtype}/data`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 修改设备类型 status(状态)信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @param {Object} params.info - status 信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static updateDevtypeStatus ({ devtype, info }) {
    return this.fetch({
      url: `/devtype/${devtype}/status`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 修改设备类型 commands(设备命令)信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @param {Object} params.info - commands信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static updateDevtypeCommands ({ devtype, info }) {
    return this.fetch({
      url: `/devtype/${devtype}/commands`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 修改设备类型 warnings(警告)信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @param {Object} params.info -  warnings 信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static updateDevtypeWarnings ({ devtype, info }) {
    return this.fetch({
      url: `/devtype/${devtype}/warnings`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 修改设备类型 errors(错误)字段信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @param {Object} params.info - errors 信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static updateDevtypeErrors ({ devtype, info }) {
    return this.fetch({
      url: `/devtype/${devtype}/errors`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 修改设备类型 logs(日志)信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @param {Object} params.info - logs 信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static updateDevtypeLogs ({ devtype, info }) {
    return this.fetch({
      url: `/devtype/${devtype}/logs`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新指定自定义设备类型的初始化配置数据
   * @param {Object} params
   * @param {string} params.devtype - 设备类型名称
   * @param {Object} params.info - 设备类型初始化配置信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link DeviceType} }
   */
  static updateDevtypeInitParam ({ devtype, info }) {
    return this.fetch({
      url: `/devtype/${devtype}/initParam`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGDeviceType
