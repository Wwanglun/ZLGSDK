import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 固件管理
 */
class ZLGFirmware extends ZLGBaseModule {
  /**
   * 列出指定设备类型的所有固件信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @return {Promise<Response, Error>} -
   */
  static getFirmwaresInfo ({ devtype }) {
    return this.fetch({
      url: `/firmware/${devtype}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除指定固件
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.version - 固件的版本号。保留两位小数，如1.00, 2.01
   * @return {Promise<Response, Error>} -
   */
  static deleteFirmware ({ devtype, version }) {
    return this.fetch({
      url: `/firmware/${devtype}/${version}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 上传固件
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.version - 固件的版本号。保留两位小数，如1.00, 2.01
   * @param {string} params.file - 固件文件
   * @param {string} params.desc - 描述固件更新内容, 长度不能超过1024字节
   * @return {Promise<Response, Error>} -
   */
  static addFirmware ({ devtype, version, file, desc }) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    return this.fetch({
      url: `/firmware/${devtype}/${version}`,
      method: 'post',
      data: formData,
      params: { desc }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通知设备有新的固件
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.version - 固件的版本号。保留两位小数，如1.00, 2.01
   * @param {string} [params.devid] - 设备ID
   * @return {Promise<Response, Error>} -
   */
  static notifyDeviceToUpdateFirmware ({ devtype, version, devid }) {
    return this.fetch({
      url: `/firmware/${devtype}/${version}/notify`,
      method: 'get',
      params: { devid }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_FIRMWARE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询指定设备类型某个版本的固件信息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.version - 固件的版本号。保留两位小数，如1.00, 2.01
   * @return {Promise<Response, Error>} -
   */
  static getFirmwareInfoByVersion ({ devtype, version }) {
    return this.fetch({
      url: `/firmware/${devtype}/${version}/desc`,
      method: 'get'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_TYPE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGFirmware
