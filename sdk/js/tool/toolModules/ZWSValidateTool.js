import ZLGBaseModule from '../ZWSBaseTool.js'
/**
 * 正则校验类工具
 * 分配后缀命名空间Validator
 */
class ZWSValidateTool extends ZLGBaseModule {
  /**
  * 手机号校验
  * @param {String} value
  */
  static phoneNumberValidator (value) {
    return /^1[3456789]\d{9}$/.test(value)
  }
  /**
   * 致远电子验证码格式校验（致远电子的验证码为6位的数字）
   * @param {String} value
   */
  static verifyCodeValidator (value) {
    return /\d{6}$/.test(value)
  }
  /**
   * 登录用户名格式校验（2-20位，只可以包含字母数字下划线,子用户名需包含@）
   * @param {String} value
   */
  static loginUsernameValidator (value) {
    return /^\w{2,20}(@\w{2,20})?$/.test(value)
  }
  /**
   * 登录用户名格式校验（2-20位，只可以包含字母数字下划线）
   * @param {String} value
   */
  static usernameValidator (value) {
    return /^[a-zA-Z0-9_]{2,20}$/.test(value)
  }
  /**
   * 密码格式校验（8-16位，并且不能有空格）
   * @param {*} value
   */
  static passwordValidator (value) {
    return /^\S{8,16}$/.test(value)
  }
  /**
   * 角色名校验，因为创建权限组的逻辑关系，默认去掉下划线。
   * @param {String} value
   */
  static rolenameValidator (value) {
    return /^\w{2,32}$/.test(value)
  }
}
export default ZWSValidateTool
