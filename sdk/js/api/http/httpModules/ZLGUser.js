import ZLGErrors from '../httpBase/ZLGHttpClientCode'
import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 用户登录、注册、修改信息
 */
class ZLGUser extends ZLGBaseModule {
  /**
   * 查询满足条件的用户的用户信息，厂家和管理员可以查询所有用户，其它用户只能查询到自己
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数。limit小余等于0或者没有指定时使用缺省值(目前为100)，最大返回记录数为10000
   * @param {string} [params.aggregation] - 数据聚合功能
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '', data: [{@link User}] }
   */
  static getUsersInfo ({ filter, skip, limit, aggregation } = {}) {
    return this.fetch({
      url: '/users',
      method: 'get',
      params: { filter, skip, limit, aggregation }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 注册新账号
   * @param {User} params - 主要属性如下，其他属性请参考{@link User}
   * @param {string} params.username - 用户名
   * @param {string} params.password - 密码
   * @param {string} params.mobile - 电话号码
   * @param {string} params.smscode - 手机收到的验证码
   * @param {boolean} [params.isagent] - 是否为代理商
   * @param {string} [params.email] - 邮箱
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '', data: {@link User} }
   */
  static register (params) {
    return this.fetch({
      url: '/users',
      method: 'post',
      data: params
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_REGISTER_PARAM_WRONG,
        402: ZLGErrors.ZLG_REGISTER_USER_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 通过用户名获取用户信息
   * @param {Object} params
   * @param {string} params.username - 用户名
   * @return {Promise<User, Error>} -
   */
  static getUserInfoByName ({ username }) {
    return this.fetch({
      url: `/users/${username}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_GET_USER_INFO_BY_NAME_PARAM_WRONG,
        404: ZLGErrors.ZLG_USER_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新用户信息
   * @param {Object} params
   * @param {string} params.username - 用户名
   * @param {string} [params.code] - 验证码，在修改邮箱或手机号码时需要提供
   * @param {Object} params.info - 要更新的用户信息
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '', data: {@link User} }
   */
  static updateUserInfo ({ username, code, info }) {
    return this.fetch({
      url: `/users/${username}`,
      method: 'put',
      data: info,
      params: { code }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_MODIFY_USER_PARAM_WRONG
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新用户头像
   * @param {Object} params
   * @param {string} params.username - 用户名
   * @param {string} params.file - WEB 提供通过 input 获得的 file
   * @param {string} params.url - APP 提供文件的 url
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static updateUserAvatar ({ username, file }) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    return this.fetch({
      url: `/users/${username}/avatar`,
      method: 'post',
      data: formData
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_CHANGE_AVATAR_PARAM_WRONG
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新系统图标
   * @param {Object} params
   * @param {string} params.username - 用户名
   * @param {string} params.file - WEB 提供通过 input 获得的 file
   * @param {string} params.url - APP 提供文件的 url
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static updateSystemLogo ({ username, file }) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    return this.fetch({
      url: `/users/${username}/syslogo`,
      method: 'post',
      data: formData
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_CHANGE_SYS_LOGO_PARAM_WRONG
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 注册时通过电话号码获取验证码
   * @param {Object} params
   * @param {string} params.mobile - 电话号码
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static getRegisterMobileVerifyCode ({ mobile }) {
    return this.fetch({
      url: '/auth/smscode',
      method: 'get',
      params: { mobile }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_SMSCODE_PARAM_WRONG,
        403: ZLGErrors.ZLG_FREQUENT_OPERATION
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 注册时通过邮箱获取验证码
   * @param {Object} params
   * @param {string} params.email - 邮箱
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static getRegisterEmailVerifyCode ({ email }) {
    return this.fetch({
      url: '/auth/emailcode',
      method: 'get',
      params: { email }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_GET_EMAIL_CODE_PARAM_WRONG,
        403: ZLGErrors.ZLG_FREQUENT_OPERATION
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取修改邮箱所需的验证码
   * @param {Object} params
   * @param {string} params.email - 新的邮箱
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static getModifyEmailVerifyCode ({ email }) {
    return this.fetch({
      url: '/auth/change_email_verify_code',
      method: 'get',
      params: { email }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_GET_EMAIL_CODE_PARAM_WRONG
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取修改手机号所需的验证码
   * @param {Object} params
   * @param {string} params.mobile - 新的手机号
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static getModifyMobileVerifyCode ({ mobile }) {
    return this.fetch({
      url: '/auth/change_mobile_verify_code',
      method: 'get',
      params: { mobile }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_GET_MOBILE_CODE_PARAM_WRONG
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 登录
   * @param {Object} params - 用户登录信息
   * @param {string} params.username - 用户名
   * @param {string} params.password - 密码
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '', data: {@link User} }
   */
  static login ({ username, password }) {
    return this.fetch({
      url: '/auth/login',
      method: 'post',
      data: { username, password }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_LOGIN_PARAM_WRONG,
        401: ZLGErrors.ZLG_LOGIN_SERVER_REFUSE,
        403: ZLGErrors.ZLG_FREQUENT_OPERATION,
        404: ZLGErrors.ZLG_LOGIN_NO_USER
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 退出登录
   * @return {Promise<Response, Error>} - 登出信息 response: { result: true, message: 'OK', jwt: '' }
   */
  static logout () {
    return this.fetch({
      url: '/auth/logout',
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 判断该用户名是否已注册
   * @param {Object} params
   * @param {string} params.username 用户名
   * @return {Promise<ZLGUser~existInfo, Error>} - response: { isExist: true }
   */
  static isUsernameExist ({ username }) {
    return this.fetch({
      url: '/auth/user_exist',
      method: 'get',
      params: { username }
    }).then(res => {
      if (res.result) {
        return { isExist: true }
      } else {
        return { isExist: false }
      }
    }).catch(error => {
      if (error.status === 404) {
        return { isExist: false }
      } else {
        let errorMap = {
          400: ZLGErrors.ZLG_USER_EXIST_PARAM_WRONG
        }
        return this.handleError(errorMap, error)
      }
    })
  }
  /**
   * 判断该邮箱名是否已注册
   * @param {Object} params
   * @param {string} params.email - 邮箱
   * @return {Promise<ZLGUser~existInfo, Error>} - response: { isExist: true }
   */
  static isEmailExist ({ email }) {
    return this.fetch({
      url: '/auth/email_exist',
      method: 'get',
      params: { email }
    }).then(res => {
      if (res.result) {
        return { isExist: true }
      } else {
        return { isExist: false }
      }
    }).catch(error => {
      if (error.status === 404) {
        return { isExist: false }
      } else {
        let errorMap = {
          400: ZLGErrors.ZLG_EMAIL_EXIST_PARAM_WRONG
        }
        return this.handleError(errorMap, error)
      }
    })
  }
  /**
   * 判断该手机号是否已注册
   * @param {Object} params
   * @param {string} params.mobile - 电话号码
   * @return {Promise<ZLGUser~existInfo, Error>} - response: { isExist: true }
   */
  static isMobileExist ({ mobile }) {
    return this.fetch({
      url: '/auth/mobile_exist',
      method: 'get',
      params: { mobile }
    }).then(res => {
      if (res.result) {
        return { isExist: true }
      } else {
        return { isExist: false }
      }
    }).catch(error => {
      if (error.status === 404) {
        return { isExist: false }
      } else {
        let errorMap = {
          400: ZLGErrors.ZLG_MOBILE_EXIST_PARAM_WRONG
        }
        return this.handleError(errorMap, error)
      }
    })
  }
  /**
   * 如果忘记密码，可用邮箱或手机号获取验证码，以重置密码
   * @param {Object} params
   * @param {string} params.username - 用户名
   * @param {string} params.type - 重置密码时选择的验证方式，可选'email' or 'mobile'
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static getResetPasswordVerifyCode ({ username, type }) {
    return this.fetch({
      url: '/auth/recover_password',
      method: 'get',
      params: { username, type }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_GET_RECOVER_PWD_CODE_PARAM_WRONG,
        403: ZLGErrors.ZLG_FORBIDDEN,
        404: ZLGErrors.ZLG_GET_RECOVER_PWD_CODE_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 忘记密码时，通过邮箱或手机号重置密码
   * @param {Object} params
   * @param {string} params.code - 调用 getResetPasswordVerifyCode 后，手机或邮箱收到的验证码
   * @param {string} params.username - 用户名
   * @param {string} params.password - 新密码
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static resetPassword ({ code, username, password }) {
    return this.fetch({
      url: '/auth/reset_password',
      method: 'post',
      data: { code, username, password }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_RESET_PWD_PARAM_WRONG,
        404: ZLGErrors.ZLG_RESET_PWD_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
  
  /**
   * 用户登录后可通过输入现有密码修改密码
   * @param {Object} params
   * @param {string} params.oldpassword - 当前密码
   * @param {string} params.password - 新密码
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static changePassword ({ oldpassword, password }) {
    return this.fetch({
      url: '/auth/change_password',
      method: 'post',
      data: { oldpassword, password }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_CHANGE_PWD_PARAM_WRONG
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 在APP上用第三方账号登录
   * @param {Object} params
   * @param {string} params.provider - 第三方登录服务提供商
   * @param {string} params.access_token - 第三方返回的 access_token
   * @param {string} [params.openid] - 第三方返回的 openid 或 uid
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '', data: {@link User} }
   */
  static loginByThirdPartyOnApp ({ provider, accessToken, openid }) {
    return this.fetch({
      url: `/auth/oauth/${provider}`,
      method: 'get',
      params: { access_token: accessToken, openid }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_APP_LOGIN_PARAM_WRONG,
        404: ZLGErrors.ZLG_LOGIN_NO_USER
      }
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 在WEB上用第三方账号登录
   * @param {Object} params
   * @param {string} params.provider - 第三方登录服务提供商
   * @param {string} params.redirect - 登录成功后跳转地址
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '', data: {@link User} }
   */
  static loginByThirdPartyOnWeb ({ provider, redirect }) {
    return this.fetch({
      url: `/connect/${provider}`,
      method: 'get',
      params: { redirect }
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_WEB_LOGIN_PARAM_WRONG,
        404: ZLGErrors.ZLG_LOGIN_NO_USER
      }
      return this.handleError(errorMap, err)
    })
  }
 




  /**
   * 删除用户，用户可以删除自己，用户删除自己后自动退出
   * @param {*} params
   * @param {string} params.username - 用户名
   * @return {Promise<Response, Error>} - response: { result: true, message: 'OK', jwt: '' }
   */
  static deleteUser ({ username }) {
    return this.fetch({
      url: `/users/${username}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {
        400: ZLGErrors.ZLG_DELETE_USER_PARAM_WRONG,
        404: ZLGErrors.ZLG_USER_NOT_EXIST
      }
      return this.handleError(errorMap, err)
    })
  }
}

/**
 * @typedef {Object} ZLGUser~existInfo
 * @property {boolean} isExist - 是否存在
 */

export default ZLGUser
