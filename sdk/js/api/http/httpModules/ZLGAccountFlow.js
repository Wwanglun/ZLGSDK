import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 收费管理
 */
class ZLGAccountFlow extends ZLGBaseModule {
  /**
   * 查询符合条件的消息
   * @param {Object} params
   * @param {string} params.devtype - 设备类型
   * @param {string} params.devid - 设备ID
   * @param {string} params.filter - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} params.skip - 跳过前面N条记录
   * @param {number} params.limit - 最多返回的记录数
   * @param {string} params.aggregation - 数据聚合功能
   * @param {boolean} params.descend - 是否按降序排列
   * @param {number} params.starttime - 开始时间
   * @param {number} params.endtime - 结束时间
   * @return {Promise<Response, Error>} -
   */
  static getDevicesMessages ({ devtype, devid, filter, skip, limit, aggregation, descend, starttime, endtime }) {
    return this.fetch({
      url: '/devices_message',
      method: 'get',
      params: { devtype, devid, filter, skip, limit, aggregation, descend, starttime, endtime }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询符合条件的账单
   * @param {Object} params
   * @param {string} params.filter - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} params.skip - 跳过前面N条记录
   * @param {number} params.limit - 最多返回的记录数
   * @param {string} params.aggregation - 数据聚合功能
   * @param {boolean} params.descend - 是否按降序排列
   * @param {number} params.starttime - 开始时间
   * @param {number} params.endtime - 结束时间
   * @return {Promise<Response, Error>} -
   */
  static getBill ({ filter, skip, limit, aggregation, descend, starttime, endtime }) {
    return this.fetch({
      url: '/bill',
      method: 'get',
      params: { filter, skip, limit, aggregation, descend, starttime, endtime }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 创建支付单
   * @param {Object} params
   * @param {string} params.order_type - 订单类型(bill, recharge)
   * @param {string} params.pay_type - 支付类型(alipay, wechatpay, balance)
   * @param {string} params.trade_type - 交易类型(app, web, page)
   * @param {string} [params.addition] - 支付附加参数
   * @param {Object} params.info - 支付单信息
   * @return {Promise<Response, Error>} -
   */
  static addPayment ({ order_type, pay_type, trade_type, addition, info }) {
    return this.fetch({
      url: '/pay_order',
      method: 'post',
      params: { order_type, pay_type, trade_type, addition },
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询交易账单流水
   * @param {Object} params
   * @param {string} params.type - 支付方式(alipay, wechatpay)
   * @param {string} params.date - 日期，YYYY-MM-DD
   * @return {Promise<Response, Error>} -
   */
  static getTradeFlow ({ type, date }) {
    return this.fetch({
      url: '/tradeflow',
      method: 'get',
      params: { type, date }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询资金账单流水
   * @param {Object} params
   * @param {string} params.type - 支付方式(alipay, wechatpay)
   * @param {string} params.date - 日期，YYYY-MM-DD
   * @return {Promise<Response, Error>} -
   */
  static getFundFlow ({ type, date }) {
    return this.fetch({
      url: '/fundflow',
      method: 'get',
      params: { type, date }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGAccountFlow
