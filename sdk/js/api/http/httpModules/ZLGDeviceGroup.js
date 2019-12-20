import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 设备分组
 */
class ZLGDeviceGroup extends ZLGBaseModule {
  /**
   * 查询满足条件的设备分组信息
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @param {booleab} [params.descend] - 是否按降序排列
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link DeviceGroup}] }
   */
  static getDeviceGroups ({ filter, skip, limit, aggregation, descend } = {}) {
    return this.fetch({
      url: '/device_groups',
      method: 'get',
      params: { filter, skip, limit, aggregation, descend }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加设备分组
   * @param {Object} params
   * @param {Object} params.info - 设备分组信息
   * @param {string} params.info.groupname - 设备分组名称
   * @param {string} params.info.desc - 设备分组描述
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link DeviceGroup} }
   */
  static addDeviceGroup ({ info }) {
    return this.fetch({
      url: '/device_groups',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除设备分组
   * @param {Object} params
   * @param {string} params.groupid - 设备分组ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '' }
   */
  static deleteDeviceGroup ({ groupid }) {
    return this.fetch({
      url: `/device_groups/${groupid}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_GROUP_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过设备分组ID查询设备分组信息
   * @param {Object} params
   * @param {string} params.groupid - 设备分组ID
   * @return {Promise<DeviceGroup, Error>} - Response: @link DeviceGroup
   */
  static getDeviceGroupById ({ groupid }) {
    return this.fetch({
      url: `/device_groups/${groupid}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_GROUP_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加设备到设备分组
   * @param {Object} params
   * @param {string} params.groupid - 设备分组ID
   * @param {Object} params.info - 设备信息
   * @param {string} params.info[].devtype - 设备类型
   * @param {string} params.info[].devid - 设备ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link DeviceGroup} }
   */
  static addDeviceToDeviceGroup ({ groupid, info }) {
    return this.fetch({
      url: `/device_groups/${groupid}`,
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_GROUP_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新设备分组信息
   * @param {Object} params
   * @param {string} params.groupid - 设备分组ID
   * @param {Object} params.info - 设备分组信息
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link DeviceGroup} }
   */
  static updateDeviceGroup ({ groupid, info }) {
    return this.fetch({
      url: `/device_groups/${groupid}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_GROUP_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除设备分组图片
   * @param {Object} params
   * @param {string} params.groupid - 设备分组ID
   * @param {Object} params.index - 图片顺序
   * @return {Promise<Response, Error>} -
   */
  static deleteDeviceGroupImage ({ groupid, index }) {
    return this.fetch({
      url: `/device_groups/${groupid}/images`,
      method: 'delete',
      params: { index }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 上传设备分组图片，上传图片后需调用 updateDeviceGroup 将图片地址加上去
   * @param {Object} params
   * @param {string} params.groupid - 设备分组ID
   * @param {Object} params.index - 图片顺序
   * @param {Object} params.file - 图片文件
   * @return {Promise<Response, Error>} -
   */
  static uploadDeviceGroupImage ({ groupid, file, index }) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    return this.fetch({
      url: `/device_groups/${groupid}/images`,
      method: 'post',
      data: formData,
      params: { index }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 从设备分组删除指定设备
   * @param {Object} params
   * @param {string} params.groupid - 设备分组ID
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link DeviceGroup} }
   */
  static deleteDeviceFromDeviceGroup ({ groupid, devtype, devid }) {
    return this.fetch({
      url: `/device_groups/${groupid}/${devid}`,
      method: 'delete',
      params: { devtype }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_DEVICE_GROUP_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGDeviceGroup
