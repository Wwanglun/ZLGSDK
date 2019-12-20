import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 触发记录
 */
class ZLGRulesRecords extends ZLGBaseModule {
  /**
   * 删除指定用户的触发记录
   * @param {Object} [params]
   * @param {string} [params.owner] - 规则的拥有者
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link RulesRecords}] }
   */
  static deleteRulesRecords ({ owner } = {}) {
    return this.fetch({
      url: `/records/${owner}`,
      method: 'delete'
    }).catch(err => {
      return this.handleError(errorMap, err)
    })
  }
    /**
   * 查询指定用户的触发记录
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {boolean} [params.descend] - 是按否触发时间降序排列。
   * @param {string} [params.owner] - 规则的拥有者
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link RulesRecords}] }
   */
  static getRulesRecordsList ({ owner, descend, filter, skip, limit } = {}) {
    return this.fetch({
      url: `/records/${owner}`,
      method: 'get',
      params: { filter, skip, limit, descend }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGRulesRecords
