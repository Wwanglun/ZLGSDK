import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 上传WebApp版本资源。角色为WebAdmin，才可以上传WebApp。
 */
class ZLGWebApp extends ZLGBaseModule {
  /**
   * 上传WebApp版本资源
   * @param {Object} [params]
   * @param {Boolean} [params.debug] - 是否为测试版本。如果为测试版本，发布到debug目录下，否则发布到缺省目录下
   * @param {string} [params.webpath] - webapp的资源路径，如/can,/can/version
   * @param {string} params.file - wepapp的zip文件
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link WebApp}] }
   */
  static uploadWebAppVersionResources ({ debug, webpath, file } = {}) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    return this.fetch({
      url: '/webapp',
      method: 'post',
      params: { debug, webpath },
      data: formData
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGWebApp
