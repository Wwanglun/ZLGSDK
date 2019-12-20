import ZLGBaseModule from '../httpBase/ZLGBaseModule'
import ZLGErrors from '../httpBase/ZLGHttpClientCode'

/**
 * 资金账户
 */
class ZLGFundAccount extends ZLGBaseModule {
  /**
   * 获取资金账户信息
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link FundAccount} }
   */
  static getFundAccountInfo () {
    return this.fetch({
      url: '/fund_account',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 创建资金账户
   * @param {Object} params
   * @param {string} params.info
   * @param {boolean} params.info.auto_pay -
   * @param {string} params.info.password - 账户密码
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link FundAccount} }
   */
  static addFundAccount ({ info }) {
    return this.fetch({
      url: '/fund_account',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_FUND_ACCOUNT_USER_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新资金账户信息
   * @param {Object} params
   * @param {string} [params.code] - 手机/邮箱验证码，更改密码时必填
   * @param {string} params.info - 账户信息
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link FundAccount} }
   */
  static updateFundAccount ({ code, info }) {
    return this.fetch({
      url: '/fund_account',
      method: 'put',
      params: { code },
      data: info
    }).catch(err => {
      let errorMap = {
        400:  ZLGErrors.ZLG_FUND_ACCOUNT_CODE_INVALID
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取修改资金账户密码的验证码
   * @param {Object} params
   * @param {string} params.type - 获取验证码方式 mobile/email
   * @return {Promise<Response, Error>} -
   */
  static getUpdateFundAccountPWDVerifyCode ({ type }) {
    return this.fetch({
      url: '/fund_account/change_password_code',
      method: 'get',
      params: { type }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_FUND_ACCOUNT_SMS_OR_MOBILE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询满足条件的退款信息
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @param {string} [params.aggregation] - 数据聚合功能
   * @param {booleab} [params.descend] - 是否按降序排列
   * @param {booleab} [params.starttime] - 开始时间
   * @param {booleab} [params.endtime] - 结束时间
   * @return {Promise<Response, Error>} -
   */
  static getRefundRecords ({ filter, skip, limit, aggregation, descend, starttime, endtime } = {}) {
    return this.fetch({
      url: '/fund_account/refund',
      method: 'get',
      params: { filter, skip, limit, aggregation, descend, starttime, endtime }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 退款。资金账户余额提现，根据充值方式原路退回
   * @param {Object} params
   * @param {string} params.info - 要更新的账户信息
   * @param {string} params.info.password - 资金账户密码
   * @return {Promise<Response, Error>} -
   */
  static refund ({ info }) {
    return this.fetch({
      url: '/fund_account/refund',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 注销资金账户
   * @param {Object} params
   * @param {string} params.password - 资金账户密码
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {} }
   */
  static deleteFundAccount ({ password }) {
    return this.fetch({
      url: '/delete_fund_account',
      method: 'put',
      data: { password }
    }).catch(err => {
      let errorMap = {
        404: ZLGErrors.ZLG_FUND_ACCOUNT_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGFundAccount
