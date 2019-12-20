import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 日志
 */
class ZLGLog extends ZLGBaseModule {
  /**
   * 查询符合条件的日志
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Log}] }
   */
  static getLogs ({ filter, skip, limit, aggregation } = {}) {
    return this.fetch({
      url: '/logs',
      method: 'get',
      params: { filter, skip, limit, aggregation }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGLog
