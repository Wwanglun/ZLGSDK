import ZLGApi from '../../api/http/ZLGApi'
import ZWSBaseLogic from '../ZWSBaseLogic'
import ZWSBaseTool from '../../tool/toolModules/ZWSStringTool.js'
/**
 * 类型管理logic
 *
 */
class ZWSDeviceTypeLogic extends ZWSBaseLogic {
  /**
   * 设备类型列表
   * @param {Object} params
   * @param {string} params.content - 类型名称
   * @param {string} params.pageSize - 界面显示条数
   * @param {string} params.currentPage - 第几页
   * @param {string} params.descend - 排序
   * @param {string} params.filter - filter字段
   */
  static getDeviceTypesTable ({
    content,
    pageSize,
    currentPage,
    descend,
    filter,
    aggregation
  }) {
    return new Promise((resolve, reject) => {
      let contentStr = {
        devtype: {
          $regex: ZWSBaseTool.transferenceStr(content),
          $options: 'i'
        }
      }
      filter = JSON.stringify(Object.assign(JSON.parse(filter), contentStr))
      let limit = pageSize
      let skip = currentPage ? (currentPage - 1) * pageSize : 0
      let deviceTypeCount = 0
      let deviceTypeList = []
      ZLGApi.getDevtypesList({
        limit: limit,
        skip: skip,
        descend: descend,
        filter: filter
      })
        .then(res => {
          if (res.data.length) {
            aggregation &&
              ZLGApi.getDevtypesList({ aggregation: 'count', filter: filter })
                .then(count => {
                  deviceTypeCount = count.data.count
                  deviceTypeList = res.data.filter(
                    v =>
                      (v.created_time = ZWSBaseTool.timestampToLocalDate(
                        v.created_time
                      ))
                  )
                  resolve({
                    deviceList: deviceTypeList,
                    count: deviceTypeCount
                  })
                })
                .catch(err => {
                  reject(err)
                })
          } else {
            resolve({ deviceList: [], count: 0 })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export default ZWSDeviceTypeLogic
