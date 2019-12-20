import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 用户自定义的大数据(0-2MB)
 */
class ZLGCustomBigData extends ZLGBaseModule {
  /**
   * 查询符合条件的自定义大数据的简略信息，不包括数据部分
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link CustomBigData}] }
   */
  static getCustomBigDataBriefInfos ({ filter, skip, limit, aggregation } = {}) {
    return this.fetch({
      url: '/customs',
      method: 'get',
      params: { filter, skip, limit, aggregation }
    }).catch(err => {
      let errorMap = {
        409: ZLGErrors.ZLG_CUSTOM_BIG_DATA_PARAM_DUPLICATE
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加新数据
   * @param {Object} params
   * @param {Object} params.info
   * @param {string} params.info.customname - 数据名称(2-64Byte)
   * @param {string} params.info.customtype - 数据类型(2-64Byte)
   * @param {string} params.info.apptype - APP类型(2-64Byte)
   * @param {string} params.info.devtype - 设备类型(2-64Byte)
   * @param {string} params.info.content - 自定义的数据(2MB)
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link CustomBigData} }
   */
  static addCustomBigData ( info ) {
    return this.fetch({
      url: '/customs',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {
        409: ZLGErrors.ZLG_CUSTOM_BIG_DATA_PARAM_DUPLICATE
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除指定数据
   * @param {Object} params
   * @param {string} params.customname - 数据名称(2-64Byte)
   * @param {string} params.customtype - 数据类型(2-64Byte)
   * @param {string} params.apptype - APP类型(2-64Byte)
   * @param {string} params.devtype - 设备类型(2-64Byte)
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '' }
   */
  static deleteCustomBigData ({ customname, customtype, apptype, devtype }) {
    return this.fetch({
      url: '/customs/detail',
      method: 'delete',
      params: { customname, customtype, apptype, devtype }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_CUSTOM_BIG_DATA_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询数据的详细信息
   * @param {Object} params
   * @param {string} params.customname - 数据名称(2-64Byte)
   * @param {string} params.customtype - 数据类型(2-64Byte)
   * @param {string} params.apptype - APP类型(2-64Byte)
   * @param {string} params.devtype - 设备类型(2-64Byte)
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link CustomBigData} }
   */
  static getCustomBigDataDetailInfo ({ customname, customtype, apptype, devtype }) {
    return this.fetch({
      url: '/customs/detail',
      method: 'get',
      params: { customname, customtype, apptype, devtype }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_CUSTOM_BIG_DATA_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新指定数据
   * @param {Object} params
   * @param {string} params.customname - 数据名称(2-64Byte)
   * @param {string} params.customtype - 数据类型(2-64Byte)
   * @param {string} params.apptype - APP类型(2-64Byte)
   * @param {string} params.devtype - 设备类型(2-64Byte)
   * @param {Object} params.info - 要更新的配置信息
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link CustomBigData} }
   */
  static updateCustomBigData ({ customname, customtype, apptype, devtype, info }) {
    return this.fetch({
      url: '/customs/detail',
      method: 'put',
      params: { customname, customtype, apptype, devtype },
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_CUSTOM_BIG_DATA_NOT_EXIST,
        409: ZLGErrors.ZLG_CUSTOM_BIG_DATA_PARAM_DUPLICATE
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGCustomBigData
