import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 项目管理
 */
class ZLGProject extends ZLGBaseModule {
  /**
   * 查询符合条件项目信息
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @param {boolean} [params.descend] - 是否按降序排列
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Project}] }
   */
  static getProjectsInfo ({ filter, skip, limit, aggregation, descend } = {}) {
    return this.fetch({
      url: '/projects',
      method: 'get',
      params: { filter, skip, limit, aggregation, descend }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加新项目
   * @param {Object} params
   * @param {Object} params.info - 配置信息
   * @example
   * {
   * "projectname": "string",
   * "desc": "string",
   * "device": [
   *  {
   *    "type": "string",
   *    "id": "string"
   *   }
   * ],
   * "relation": [
   *  {
   *    "type": "string",
   *    "id": "string"
   * }
   * ]
   * }
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link Project} }
   */
  static addProject ({ info }) {
    return this.fetch({
      url: '/projects',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {
        409: ZLGErrors.ZLG_DUPLICATE_PROJECT_NAME
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过项目ID删除项目
   * @param {Object} params
   * @param {string} params.projectid - 项目ID
   * @return {Promise<Response, Error>} -
   */
  static deleteProjectById ({ projectid }) {
    return this.fetch({
      url: `/projects/${projectid}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_PROJECT_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过项目ID获取项目信息
   * @param {Object} params
   * @param {string} params.projectid - 项目ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link Project} }
   */
  static getProjectInfoById ({ projectid }) {
    return this.fetch({
      url: `/projects/${projectid}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_PROJECT_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新项目信息
   * @param {Object} params
   * @param {string} params.projectid - 项目ID
   * @param {Object} params.info - 要更新的项目信息
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link Project} }
   */
  static updateProjectInfo ({ projectid, info }) {
    return this.fetch({
      url: `/projects/${projectid}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_PROJECT_NOT_EXIST,
        409: ZLGErrors.ZLG_DUPLICATE_PROJECT_NAME
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 批量删除项目
   * @param {Object} params
   * @param {string[]} params.info - 项目ID数组
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: { removedCount: 1 } }
   */
  static deleteMutipleProjects ({ info }) {
    return this.fetch({
      url: '/projects/batch/delete',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_PROJECT_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新项目中指定字段的信息
   * @param {Object} params
   * @param {string} params.projectid - 项目ID
   * @param {string} params.field - 项目字段(device, relation)
   * @param {string} params.action - 项目操作(add, delete)
   * @param {Object} params.info - 要更新的项目信息
   * @return {Promise<Response, Error>} -
   */
  static updateProjectFieldInfo ({ projectid, field, action, info }) {
    return this.fetch({
      url: `/projects/${projectid}/${field}/${action}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_PROJECT_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGProject
