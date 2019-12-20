import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 用户自定义的数据(0-100KB)
 */
class ZLGCustomData extends ZLGBaseModule {
  /**
   * 查询符合条件的自定义数据
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @param {string} [params.order] - 排序规则。{"index":1} 1表示升序-1表示降序,可以对全部字段进行排序
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link CustomData}] }
   */
  static getCustomDatas ({ filter, skip, limit, aggregation, order } = {}) {
    return this.fetch({
      url: '/project_datas',
      method: 'get',
      params: { filter, skip, limit, aggregation, order }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加新数据
   * @param {Object} params
   * @param {Object} params.info
   * @param {string} params.info.datatype - 数据类型，便于搜索、分类(2-64Byte)
   * @param {string} params.info.dataname - 数据名称(2-64Byte)
   * @param {string} params.info.desc - 数据描述(0-1024Byte)
   * @param {string} params.info.data - 数据(0-100KB)
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link CustomData} }
   */
  static addCustomData ({ info }) {
    return this.fetch({
      url: '/project_datas',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {
        409: ZLGErrors.ZLG_CUSTOM_DATA_NAME_DUPLICATE
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过数据ID删除指定数据
   * @param {Object} params
   * @param {string} params.dataid - 数据ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '' }
   */
  static deleteCustomDataById ({ dataid }) {
    return this.fetch({
      url: `/project_datas/${dataid}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_CUSTOM_DATA_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过数据ID查询指定自定义数据
   * @param {Object} params
   * @param {string} params.dataid - 数据ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link CustomData} }
   */
  static getCustomDataById ({ dataid }) {
    return this.fetch({
      url: `/project_datas/${dataid}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_CUSTOM_DATA_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新自定义数据
   * @param {Object} params
   * @param {string} params.dataid - 数据ID
   * @param {Object} params.info - 要更新的数据信息
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link CustomData} }
   */
  static updateCustomData ({ dataid, info }) {
    return this.fetch({
      url: `/project_datas/${dataid}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_CUSTOM_DATA_NOT_EXIST,
        409: ZLGErrors.ZLG_CUSTOM_DATA_NAME_DUPLICATE
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 批量删自定义数据
   * @param {Object} params
   * @param {string[]} params.info - 数据ID数组
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: { removedCount: 1 } }
   */
  static deleteMutipleCustomDatas ({ info }) {
    return this.fetch({
      url: '/project_datas/batch/delete',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_CUSTOM_DATA_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新自定义数据的index, 可以用来排序
   * @param {Object} params
   * @param {string} params.dataid - 数据ID
   * @param {number} params.index - 要更新的数据信息
   * @return {Promise<Response, Error>} -
   */
  static updateCustomDataIndex ({ dataid, index }) {
    return this.fetch({
      url: `/project_datas/${dataid}/${index}`,
      method: 'put'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_CUSTOM_DATA_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGCustomData
