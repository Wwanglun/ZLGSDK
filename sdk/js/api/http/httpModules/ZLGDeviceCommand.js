import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 设备命令
 */
class ZLGDeviceCommand extends ZLGBaseModule {
  /**
   * 获取设备支持的命令
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @return {Promise<DeviceCommnd[], Error>} - response: [{@link DeviceCommnd}]
   */
  static getDeviceCommands ({ devtype, devid }) {
    return this.fetch({
      url: `/devices/${devid}/commands`,
      method: 'get',
      params: { devtype }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 向指定设备发送命令
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {number} params.timeout - 命令超时时间(ms)
   * @param {number} params.cmdtype - 命令类型
   * @param {number} params.cmd - 命令的名称
   * @param {number} params.args - 命令的参数
   * @return {Promise<Response, Error>} -
   */
  static sendCommandToDevice ({ devtype, devid, timeout, cmdtype, cmd, args }) {
    return this.fetch({
      url: `/devices/${devid}/commands/${cmd}`,
      method: 'put',
      params: { devtype, timeout, cmdtype },
      data: args
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_COMMAND_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 向指定设备发送配置设备状态信息命令
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {number} params.timeout - 命令超时时间(ms)
   * @param {number} params.cmdtype - 命令类型
   * @param {number} params.args - 命令的参数
   * @return {Promise<Response, Error>} -
   */
  static sendStatusCommandToDevice ({ devtype, devid, timeout, cmdtype, args }) {
    return this.fetch({
      url: `/devices/${devid}/commands/set_config`,
      method: 'put',
      params: { devtype, timeout, cmdtype },
      data: args
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_COMMAND_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 发送原始数据到指定设备
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {string} params.info -
   * @param {string} params.info.raw - 原始数据(base64编码字符串)
   * @return {Promise<Response, Error>} -
   */
  static sendRawCommandToDevice ({ devtype, devid, info }) {
    return this.fetch({
      url: `/devices/${devid}/commands/raw`,
      method: 'put',
      data: info,
      params: { devtype }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGDeviceCommand
