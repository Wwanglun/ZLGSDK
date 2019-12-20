import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 安装包管理。安装包管理员角色由管理员和厂家授予(updateUserInfo)。
 */
class ZLGPackage extends ZLGBaseModule {
  /**
   * 删除安装包
   * @param {Object} [params]
   * @param {string} [params.pkgtype] - 安装包型号
   * @param {double} [params.version] - 安装包版本号,保留两位小数，如1.00, 2.01
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Package}] }
   */
  static deletePackage ({ pkgtype, version } = {}) {
    return this.fetch({
      url: `/package/${pkgtype}`,
      method: 'delete',
      params: { version }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取安装包
   * @param {Object} [params]
   * @param {string} [params.pkgtype] - 安装包型号
   * @param {double} [params.version] - 安装包版本号,保留两位小数，如1.00, 2.01
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Package}] }
   */
  static getPackage ({ pkgtype, version } = {}) {
    return this.fetch({
      url: `/package/${pkgtype}`,
      method: 'get',
      params: { version }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 上传安装包
   * @param {Object} [params]
   * @param {string} [params.pkgtype] - 安装包型号
   * @param {double} [params.version] - 安装包版本号,保留两位小数，如1.00, 2.01
   * @param {string} params.file - 安装包文件
   * @param {string} params.desc - 安装包描述信息，如version、length等，格式仅限json字符串，长度不能超过1024字节
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Package}] }
   */
  static addPackage ({ pkgtype, version, file, desc } = {}) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    return this.fetch({
      url: `/package/${pkgtype}`,
      method: 'post',
      params: { version, desc },
      data: formData
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取全部安装包
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Package}] }
   */
  static getAllPackages () {
    return this.fetch({
      url: `/AllPackages`,
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取最新安装包
   * @param {Object} [params]
   * @param {string} [params.pkgtype] - 安装包型号
   * @return {Promise<Response, Error>} - Response: { name: '', desc: '', uri: '', ctime: '' }
   */
  static getLastPackage ( pkgtype) {
    return this.fetch({
      url: `/LastPackage`,
      method: 'get',
      params: {pkgtype}
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGPackage
