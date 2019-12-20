import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 组织管理
 */
class ZLGOrganization extends ZLGBaseModule {
  /**
   * 返回组织列表。代理商查询可以自己创建的组织，其他用户可以查询所有代理商创建的组织。
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link OrganizationList}] }
   */
  static getOrganizationList ({ filter, skip, limit, aggregation } = {}) {
    return this.fetch({
      url: '/orgnizations',
      method: 'get',
      params: { filter, skip, limit, aggregation }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 创建新组织。只有代理商才可以创建和修改组织
   * @param {Object} [params]
   * @param {string} [params.orgnizationname] - 组织名称
   * @param {string} [params.desc] - 组织描述
   * @param {string} [params.address] - 组织地址
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link OrganizationList}] }
   */
  static AddOrganization ({ orgnizationname, desc, address } = {}) {
    return this.fetch({
      url: '/orgnizations',
      method: 'post',
      params: { orgnizationname, desc, address }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除指定的组织
   * @param {Object} [params]
   * @param {string} [params.orgnizationid] - 组织ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link OrganizationList}] }
   */
  static deleteOrganization ({ orgnizationid } = {}) {
    return this.fetch({
      url: `/orgnizations/${orgnizationid}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取指定的组织信息
   * @param {Object} [params]
   * @param {string} [params.orgnizationid] - 组织ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link OrganizationList}] }
   */
  static getOrganizationInfo ({ orgnizationid } = {}) {
    return this.fetch({
      url: `/orgnizations/${orgnizationid}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新指定的组织信息
   * @param {Object} [params]
   * @param {string} [params.orgnizationid] - 组织ID
   * @param {Object} [params.info] - 组织信息
   * @param {string} [params.info.desc] - 组织信息--描述
   * @param {string} [params.info.address] - 组织信息--地址
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link OrganizationList}] }
   */
  static updateOrganizationInfo ({ orgnizationid, info } = {}) {
    return this.fetch({
      url: `/orgnizations/${orgnizationid}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询组织下面的设备分组
   * @param {Object} [params]
   * @param {string} [params.orgnizationid] - 组织ID
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link OrganizationList}] }
   */
  static getOrganizationGroupList ({ orgnizationid, filter, skip, limit, aggregation } = {}) {
    return this.fetch({
      url: `/orgnizations/${orgnizationid}/device_groups`,
      method: 'get',
      params: { filter, skip, limit, aggregation }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询组织下面的成员
   * @param {Object} [params]
   * @param {string} [params.orgnizationid] - 组织ID
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link OrganizationList}] }
   */
  static getOrganizationMembers ({ orgnizationid, filter, skip, limit, aggregation } = {}) {
    return this.fetch({
      url: `/orgnizations/${orgnizationid}/members`,
      method: 'get',
      params: { filter, skip, limit, aggregation }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加用户到组织
   * @param {Object} [params]
   * @param {string} [params.orgnizationid] - 组织ID
   * @param {Object} [params.info] - 组织信息
   * @param {string} [params.info.desc] - 组织信息--描述
   * @param {string} [params.info.address] - 组织信息--地址
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link OrganizationList}] }
   */
  static AddMemberInOrganization ({ orgnizationid, info } = {}) {
    return this.fetch({
      url: `/orgnizations/${orgnizationid}/members`,
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 从组织中用户移出用户
   * @param {Object} [params]
   * @param {string} [params.orgnizationid] - 组织ID
   * @param {string} [params.username] - 用户名
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link OrganizationList}] }
   */
  static deleteMemberInOrganization ({ orgnizationid, username } = {}) {
    return this.fetch({
      url: `/orgnizations/${orgnizationid}/members/${username}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGOrganization
