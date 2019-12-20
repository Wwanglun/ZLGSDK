import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'


/**
 * 子设备管理
 */
class ZLGSubDevice extends ZLGBaseModule {
  /**
   * 添加子子设备到网关
   * @param {Object} [params]
   * @param {string} [params.devtype] - 设备类型
   * @param {string} [params.devid] - 设备ID
   * @param {Array} [params.subdevs] - 子设备  [{devtype: '', devid: ''}]
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Log}] }
   */
  static addSubDevice ({devtype, devid, subdevs}) {
    return this.fetch({
      url: `/gateway/${devid}/subdevs`,
      method: 'post',
      params: { devtype },
      data: subdevs
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_DEVINFO_PARAM_WRONG,
        404: ZLGErrors.ZLG_WG_DEV_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 从网关移除子设备
   * @param {Object} [params]
   * @param {string} [params.devtype] - 设备类型
   * @param {string} [params.devid] - 设备ID
   * @param {Array} [params.subdevs] - 子设备  [{devtype: '', devid: ''}]
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link Log}] }
   */
  static deleteSubDevice ({devtype, devid, subdevs}) {
    return this.fetch({
      url: `/gateway/${devid}/subdevs`,
      method: 'put',
      params: { devtype },
      data: subdevs
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_DEVINFO_PARAM_WRONG,
        404: ZLGErrors.ZLG_WG_DEV_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGSubDevice
