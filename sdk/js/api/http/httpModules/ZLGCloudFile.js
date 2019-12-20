import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 保存文件到服务器
 */
class ZLGCloudFile extends ZLGBaseModule {
  /**
   * 获取用户所有文件信息
   * @return {Promise<Response, Error>} -
   */
  static getCloudFileInfos () {
    return this.fetch({
      url: '/customs/commonfile',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 上传文件到服务器
   * @param {Object} params
   * @param {string} params.file - 要上传的文件
   * @return {Promise<Response, Error>} -
   */
  static uploadCloudFile ({ file }) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    return this.fetch({
      url: '/customs/commonfile',
      method: 'post',
      data: formData
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除保存的服务器的文件
   * @param {Object} params
   * @param {boolean} params.fileuri - 是否填写完整的文件路径
   * @param {string} params.commonfilename - 文件名或者完整的文件路径
   * @return {Promise<Response, Error>} -
   */
  static deleteCloudFile ({ fileuri = false, commonfilename } = {}) {
    return this.fetch({
      url: `/customs/commonfile/${commonfilename}`,
      method: 'get',
      params: { fileuri }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGCloudFile
