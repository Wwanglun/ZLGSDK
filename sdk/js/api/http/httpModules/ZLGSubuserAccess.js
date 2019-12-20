import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 子用户权限相关
 */
class ZLGSubuserAccess extends ZLGBaseModule {
  /**
   * 给子用户添加指定权限
   * @param {Object} params
   * @param {string} params.username - 子用户名
   * @param {string} params.accessid - 权限组ID
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '', data: {@link Subuser} }
   */
  static addSubuserAccess ({ username, accessid }) {
    return this.fetch({
      url: `/subusers/${username}/${accessid}`,
      method: 'post'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除指定子用户的指定权限组
   * @param {Object} params
   * @param {string} params.username - 子用户名
   * @param {string} params.accessid - 权限组ID
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '', data: {@link Subuser} }
   */
  static deleteSubuserAccess ({ username, accessid }) {
    return this.fetch({
      url: `/subusers/${username}/${accessid}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询满足条件的权限组信息
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: [{@link UserAccess}] }
   */
  static getSubuserAccessGroups ({ filter, skip, limit, aggregation } = {}) {
    return this.fetch({
      url: '/subusers_access',
      method: 'get',
      params: { filter, skip, limit, aggregation }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 创建新的权限组
   * @param {UserAccess} params - 主要属性如下，其他属性请参考{@link UserAccess}
   * @param {string} params.name - 权限策略名,不支持中文字符(2~64)
   * @param {string} [params.desc] - 权限策略描述信息(0~1024)
   * @param {Object} params.statement - 权限组信息
   * @param {'Deny' | 'Allow'} params.statement.effect - 授权类型
   * @param {string[]} params.statement.action - 授权的操作列表，action允许的值可以通过接口/authorization_mapping_table获取。列表中前缀不同的操作不可定义在同一个action中，支持通配符，如dev::*形式"
   * @param {string[]} params.statement.resource - 授权要操作的对象列表(授权要操作的对象,一般是资源id，具体值与action相关；资源命名格式：[object-id：relative-id]，支持通配符*)
   * @param {Object} [params.statement.condition] - 鉴权条件
   * @param {Object} [params.statement.condition.selector] - 访问内容的限制，属性视情况不同而不同，支持_$eq和_$ne操作符，作用等同于mongodb的$ne和$eq操作符功能
   * @param {string} [params.statement.condition.ipAddress] - 访问ip的限制
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link UserAccess} }
   */
  static addSubuserAccessGroup (params) {
    return this.fetch({
      url: '/subusers_access',
      method: 'post',
      data: params
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除指定权限组ID的的权限组
   * @param {Object} params
   * @param {string} params.id - 权限组ID
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '' }
   */
  static deleteSubuserAccessGroupById ({ accessid }) {
    return this.fetch({
      url: `/subusers_access/${accessid}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_USER_ACCESS_GROUP_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过权限组ID查询权限组信息
   * @param {Object} params
   * @param {string} params.id - 权限组ID
   * @return {Promise<UserAccess, Error>} -
   */
  static getSubuserAccessGroupById ({ id }) {
    return this.fetch({
      url: `/subusers_access/${id}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新权限组信息
   * @param {Object} params
   * @param {string} params.id - 权限组ID
   * @param {Object} params.info - 要修改的权限组信息
   * @return {Promise<Response, Error>} - response: { result: true, message: '', jwt: '', data: {@link UserAccess} }
   */
  static updateSubuserAccessGroup ({ id, info }) {
    return this.fetch({
      url: `/subusers_access/${id}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }

  /**
   * 批量删除权限组
   * @param {Object} params
   * @param {string[]} params.accessids - 权限组ID数组
   * @return {Promise<Response, Error>} -  response: { result: true, message: 'OK', data: { removedCount: 1 }}
   */
  static deleteMutipleSubuserAccessGroups ({ accessids }) {
    return this.fetch({
      url: '/subusers_access/batch/delete',
      method: 'post',
      data: accessids
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_USER_ACCESS_GROUP_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGSubuserAccess
