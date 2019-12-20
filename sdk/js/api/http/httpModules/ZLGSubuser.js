import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 子用户管理
 */
class ZLGSubuser extends ZLGBaseModule {
  /**
   * 查询满足条件的子用户信息
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数。limit小余等于0或者没有指定时使用缺省值(目前为100)，最大返回记录数为10000
   * @param {string} [params.aggregation] - 数据聚合功能
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: [{@link Subuser}] }
   */
  static getSubusersInfo ({ filter, skip, limit, aggregation } = {}) {
    return this.fetch({
      url: '/subusers',
      method: 'get',
      params: { filter, skip, limit, aggregation }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加子用户
   * @param {Subuser} params - 主要属性如下，其他属性请参考{@link Subuser}
   * @param {string} params.username - 子用户名
   * @param {string} params.password - 子用户密码
   * @param {Array} params.accessControllerList - 分配给子用户的权限分组ID
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link Subuser} }
   */
  static addSubuser (params) {
    if (!params.accessControllerList) {
      params.accessControllerList = []
    }
    return this.fetch({
      url: '/subusers',
      method: 'post',
      data: params
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过子用户名删除子用户
   * @param {Object} params
   * @param {string} params.username - 子用户名
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static deleteSubuserByName ({ username }) {
    return this.fetch({
      url: `/subusers/${username}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_SUBUSER_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过子用户名查询子用户信息
   * @param {Object} params
   * @param {string} params.username - 子用户名
   * @return {Promise<Subuser, Error>} - response: {@link Subuser}
   */
  static getSubuserInfoByName ({ username }) {
    return this.fetch({
      url: `/subusers/${username}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_SUBUSER_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新子用户信息
   * @param {Object} params
   * @param {string} params.username - 子用户名
   * @param {Object} params.info 要更新的子用户信息
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '', data: {@link Subuser} }
   */
  static updateSubuserInfo ({ username, info }) {
    return this.fetch({
      url: `/subusers/${username}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 批量删除子用户，该功能有问题，暂不可用
   * @param {Object} params
   * @param {string[]} params.usernames - 需要删除的子用户用户名列表
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static deleteMutipleSubusers ({ usernames }) {
    return this.fetch({
      url: '/subusers/batch/delete',
      method: 'post',
      data: usernames
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_SUBUSER_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGSubuser
