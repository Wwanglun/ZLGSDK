/**
 * 使用方法举例
 * import validate from validate.js
 * validate.isPhoneNumber('19129321') // false
 * validate.isPhoneNumber('138001380000') // true
 */
export const validate = {
  /**
   * 纯数字及范围校验
   * @param {*} value
   * @param {number} start 最小值
   * @param {number} end 最大值
   */
  numberLimit (value, start = 0, end = 10000, point = 0) {
    if (value === '') {
      return false
    }
    if (point === 0) {
      if (value.toString().indexOf('.') < 0) {
        return /\d$/.test(value) && value >= start && value <= end
      } else {
        return false
      }
    } else {
      if (value.toString().indexOf('.') < 0) {
        return /\d$/.test(value) && value >= start && value <= end
      } else {
        var re = new RegExp(
          '^(?!0+(?:\\.0+)?$)(?:[1-9]\\d*|0)(?:\\.\\d{1,' + point + '})?$',
          'gim'
        )
        return (
          re.test(value) &&
          Math.floor(value) >= start &&
          Math.ceil(value) <= end
        )
      }
    }
  },
  /**
   * 手机号校验
   * @param {*} value
   */
  isPhoneNumber (value) {
    return /^1[3456789]\d{9}$/.test(value)
  },
  /**
   * 致远电子验证码格式校验（致远电子的验证码为6位的数字）
   * @param {*} value
   */
  isVerifyCode (value) {
    return /\d{6}$/.test(value)
  },
  /**
   * 用户名格式校验（2-20位，只可以包含字母数字下划线,子用户名需包含@）
   * @param {*} value
   */
  isUsername (value) {
    return /^[a-zA-Z0-9_]{2,20}$/.test(value)
  },
  /**
   * 角色名校验，因为创建权限组的逻辑关系，默认去掉下划线。
   * @param {*} value
   */
  isRolename (value) {
    return /^[a-zA-Z0-9]{2,32}$/.test(value)
  },
  /**
   * 用户名格式校验（1-32位，只可以包含字母数字下划线,子用户名需包含@）
   * @param {*} value
   */
  isLoginUsername (value) {
    return /^\w{2,20}(@\w{2,20})?$/.test(value)
  },
  /**
   * 密码格式校验（8-16位，并且不能有空格）
   * @param {*} value
   */
  isPassword (value) {
    return /^\S{8,16}$/.test(value)
  },
  /**
   * 个性签名校验
   * @param {*} value
   */
  isDesc (value) {
    return value.length >= 2 && value.length <= 64
  },
  /**
   * 邮箱格式校验码
   * @param {*} value
   */
  isEmail (value) {
    // return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
    // eslint-disable-next-line no-useless-escape
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
  },
  /**
   * 十六进制校验
   * @param {*} value
   */
  isHex (value, length) {
    return /^[A-Fa-f0-9]+$/.test(value)
  },
  /**
   * 设备名格式校验（长度1-64，只包含字母、数字、下划线、中横线）
   * 注：这里设备端中中文占3个字节
   * @param {*} value
   */
  isDevname (value) {
    // eslint-disable-next-line
    return /^[a-zA-Z0-9_\-]{1,31}$/.test(value)
  },
  /**
   * 昵称格式校验（长度1-32位，只包含汉字、字母、数字、下划线）
   * @param {*} value
   */
  isNickname (value) {
    return /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,32}$/.test(value)
  },
  /**
   * ip地址校验
   * @param {*} value
   */
  isIpAddress (value) {
    if (value === '') {
      return false
    } else if (value.length > 63) {
      return false
    } else {
      return /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.(((25|0)[0-5])|((2|0)[0-4]\d)|((1|0)\d\d)|([0-9]\d)|\d)){3}$|^([a-zA-Z0-9]([a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/.test(
        value
      )
    }
  },
  /**
   * 子网掩码
   * @param {*} value
   */
  isNetMask (value) {
    if (value === '') {
      return false
    } else if (value.length > 63) {
      return false
    } else {
      return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/.test(
        value
      )
    }
  },

  /**
   * DNS域名服务器
   * @param {*} value
   */
  isDNS (value) {
    if (value === '') {
      return false
    } else if (value.length > 63) {
      return false
    } else {
      return /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(
        value
      )
    }
  },
  /**
   * 搜索框输入内容，值允许汉字字母数字下划线
   * @param {*} value
   */
  isNormalChar (value) {
    return /^[\w\d_\-\u4e00-\u9fa5]+$/.test(value)
  },
  /**
   * 设备配置页面，网络连接配置，端口校验
   * @param {*} value
   */
  isPort (value) {
    if (
      /^[0-9]*$/.test(value) &&
      parseInt(value) <= 65535 &&
      parseInt(value) > 0
    ) {
      return true
    } else if (value === '') {
      return false
    } else {
      return false
    }
  },
  /**
   * 设备配置页面，经度校验
   * @param {*} value
   */
  longitude (value) {
    if (value === '0' || value === 0) {
      return true
    } else if (
      /^[+-]?\d+(.[0-9]{1,6})?$/.test(value) &&
      Math.ceil(Math.abs(value)) >= 0 &&
      Math.ceil(Math.abs(value)) <= 180
    ) {
      return true
    } else {
      return false
    }
  },
  /**
   * 设备配置页面，纬度校验
   * @param {*} value
   */
  latitude (value) {
    if (value === '0' || value === 0) {
      return true
    } else if (
      /^[+-]?\d+(.[0-9]{1,6})?$/.test(value) &&
      Math.ceil(Math.abs(value)) >= 0 &&
      Math.ceil(Math.abs(value)) <= 90
    ) {
      return true
    } else {
      return false
    }
  },
  /**
   * 输入是否有汉字校验
   * @param {*} value
   */
  isChinese (value) {
    return /[\u4E00-\u9FA5]/g.test(value)
  },
  isHexFor8AndSpace (value) {
    return /^[a-fA-F0-9]{2}( [a-fA-F0-9]{2})?( [a-fA-F0-9]{2})?( [a-fA-F0-9]{2})?( [a-fA-F0-9]{2})?( [a-fA-F0-9]{2})?( [a-fA-F0-9]{2})?( [a-fA-F0-9]{2})?$/.test(value)
  },
  devtypeName (value) {
    return /^[A-Za-z0-9_]{1,}$/.test(value)
  },
  devtypeAttributeName (value) {
    return /^[A-Za-z0-9_]{1,}$/.test(value) && !(/^\d{1,}$/.test(value))
  },
  /**
   * 校验合法输入，大小写、数字、下划线
   */
  normalInput (val) {
    return /^[a-zA-Z0-9_]{2,}$/.test(val)
  },
  /**
   * 校验设备的密钥格式,只能输入小写字母，短横线，数字
   */
  devsecret (val) {
    return /^([a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12})$/.test(val)
  }
}
export default validate
