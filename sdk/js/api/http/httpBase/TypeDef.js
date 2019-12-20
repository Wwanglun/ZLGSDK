/**
 * @typedef {Object} User - 用户信息
 * @property {string} userid - 用户ID(24)，系统生成
 * @property {string} username - 用户名(2~64)，不支持中文字符
 * @property {string} nickname - 用户昵称(1~64),支持中文字符
 * @property {(1| 2)} gender - 性别，男(1)，女(2)
 * @property {(0 | 1 | 2 | 3)} event_notify - 事件通知方式：不通知(0)，邮件(1)，短信(2)，邮件+短信(3)
 * @property {(0 | 1)} temperature_unit - 温度单位：摄氏度(0)，华氏度(1)
 * @property {(0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8)} role - 用户角色，普通用户(0), 代理商(1), 设备固件维护人员(2), 厂家(3), 运营商(4), WebApp管理员(5), 子用户(6), 会计师(7), 应用程序安装包管理员(8)
 * @property {string} role_extra - 不同角色(的用户)附带的角色权限信息: 使用;分割不同的信息
 * @property {('default' | 'qq' | 'wechat' | 'github' | 'weibo')} provider - 用户注册的方式。缺省使用用户名密码注册，其它为社交方式登录
 * @property {string} password - 密码
 * @property {string} email - 邮箱，修改邮箱需要发验证码验证新邮箱
 * @property {string} mobile - 手机号码，修改手机号码需要发验证码验证新号码
 * @property {string} desc - 备注(0~1024)
 * @property {string} language - 用户的语言，可根据它来设置客户端应用程序的语言
 * @property {string} orgnization - 用户所属的组织(24)
 * @property {string} country - 国家(2~64)
 * @property {string} province - 省(2~64)
 * @property {string} city - 市(2~64)
 * @property {string} detailaddress - 详细地址(0~256)
 * @property {string} zipcode - 邮政编码(6)
 * @property {string} openid - 社交帐号的openid(0~32)
 * @property {string} avatar - 用户头像地址(0~1024)
 * @property {string} timezone - 时区，格林威治时间和本地时间之间的时差，以分钟为单位
 * @property {DateTime} birthday - 生日
 * @property {DateTime} register_time - 注册时间
 * @property {DateTime} password_changed_time - 密码最后修改时间
 * @property {DateTime} last_login_time - 最后登录时间
 * @property {string} register_ip - 注册IP地址
 * @property {string} last_login_ip - 最后登录IP地址
 * @property {('pending' | 'normal' | 'disable')} status - 状态
 * @property {string} sysname - 系统名称(2~64)
 * @property {string} syslogo - 系统logo图片地址(0~1024)
 * @property {string} sysstyle - 系统风格(2~64)
 * @property {string} apptype - app类型(2~64)
 * @property {string} company - 公司名称(2~64)
 * @property {Object[]} device_types - 设备类类型
 * @property {string} jwt - 登录 token
 * @property {Object} invoice - 发票
 * @property {boolean} invoice.ifneedinvoice - 是否开发票
 * @property {(0 | 1)} invoice.invoicetype - 发票类型，普通发票(0)，增值发票(1)
 * @property {string} invoice.invoicetitle - 发票抬头(2~64)（个人、公司）
 * @property {string} invoice.companyname - 单位名称(2~64)
 * @property {string} invoice.taxpayercode - 纳税人识别码
 * @property {string} invoice.bankname - 开户银行(2~64)
 * @property {string} invoice.bankaccount - 银行账户
 * @property {string} invoice.receiver - 接收人(2~64)
 * @property {string} invoice.telnumber - 手机号
 * @property {string} invoice.receiveaddress - 接收地址
 */

/**
  * @typedef {Object} Subuser - 子用户信息
  * @property {string} userid - 用户ID，系统生成(24)
  * @property {string} username - 用户名,不支持中文字符(2~64)
  * @property {string} nickname - 用户昵称,支持中文字符(2~64)
  * @property {string} password - 密码(8~16)
  * @property {string[]} accessControllerList - 授予子用户的权限的ID数组(内置许可调用获取子用户信息的接口)
  * @property {string} desc - 备注(0~1024)
  * @property {DateTime} register_time - 注册时间
  * @property {DateTime} password_changed_time - 密码修改时间
  * @property {DateTime} last_login_time - 最后登录时间
  * @property {string} register_ip - 注册IP地址
  * @property {string} last_login_ip - 最后登录IP地址
  * @property {'pending' | 'normal' | 'disable'} status - 用户状态
  * @property {string} subemail - 邮箱地址
  * @property {string} submobile - 电话号码
  * @property {string} subcompany - 公司
  * @property {string} subaddress - 地址
  * @property {string} note - 备注
  */

/**
   * @typedef {Object} UserRights - 用户权限
   * @property {string} id - 权限ID(24)
   * @property {string} name - 权限策略名,不支持中文字符(2~64)
   * @property {string} desc - 权限策略描述信息(0~1024)
   * @property {DateTime} createAt - 创建时间
   * @property {DateTime} updateAt - 修改时间
   * @param {Object} params.statement - 权限组信息
   * @param {'Deny' | 'Allow'} params.statement.effect - 授权类型
   * @param {string[]} params.statement.action - 授权的操作列表，action允许的值可以通过接口/authorization_mapping_table获取。列表中前缀不同的操作不可定义在同一个action中，支持通配符，如dev::*形式"
   * @param {string[]} params.statement.resource - 授权要操作的对象列表(授权要操作的对象,一般是资源id，具体值与action相关；资源命名格式：[object-id：relative-id]，支持通配符*)
   * @param {Object} [params.statement.condition] - 鉴权条件
   * @param {Object} [params.statement.condition.selector] - 访问内容的限制，属性视情况不同而不同，支持_$eq和_$ne操作符，作用等同于mongodb的$ne和$eq操作符功能
   * @param {string} [params.statement.condition.ipAddress] - 访问ip的限制
   */

/**
   * @typedef {Object} DeviceType - 设备类型
   * @property {string} devtype - 设备类型(2~64)
   * @property {string} devtypeid - 设备ID(24)
   * @property {string} basetype - 继承的全局设备类型(2~64)
   * @property {string} comment - 设备类型描述(0~1024)
   * @property {string} raw_handler - 自定义解析脚本,默认值为 inherit_from_basetype 表示继承全局类型解析脚本(0~102400)
   * @property {string} data_size - 数据条数
   * @property {string} devices_size - 设备数量
   * @property {string} event_size - 事件数量
   * @property {boolean} node_gw_bydata -
   * @property {0 | 1 | 2 | 3 | 4} online_type -0(by_topic),1(by_tcp),2(by_dev_data),3(always_online),4(always_offline)
   * @property {string} verifyid - js 脚本(0~102400)
   * @property {Object} schema -
   * @property {string} owner - 组织的创建者(2~64)
   * @property {string} lora_deviceprofile_id -
   */

/**
   * @typedef {Object} Device - 设备信息
   * @property {string} devtype - 设备类型
   * @property {string} devname - 设备名称
   * @property {string} devid - 设备ID
   * @property {string} devgroup - 所属设备分组
   * @property {string} desc - 设备描述
   * @property {Object} gps - 设备位置
   * @property {string} owner - 设备拥有者
   * @property {string} devclass -
   * @property {0 | 1} status - 设备状态（0:在线, 1: 离线）
   * @property {string} devprotocol -
   */

/**
   * @typedef {Object} DeviceGroup - 设备分组
   * @property {string} groupid - 设备分组ID
   * @property {string} groupname - 设备分组名称(2~64)
   * @property {string} desc - 设备分组描述
   * @property {number} created_time - 创建时间
   * @property {Object} devices - 设备分组设备
   */

/**
   * @typedef {Object} DeviceCommnd - 设备命令
   * @property {string} name - 设备命令名称
   * @property {string} comment - 设备命令描述
   * @property {string} cmdtype - 是否需要设备回应该命令
   * @property {Object} args - 参数
   * @property {Object} args.sample - sample是参数名，可自定义
   * @property {boolean} args.sample.required - 是否一定要该参数
   * @property {string} args.sample.type - 参数数据类型
   * @property {string} args.sample.comment - 备注
   */

/**
   * @typedef {Object} FundAccount - 资金账户
   * @property {string} username - 资金账户用户名(2~64)
   * @property {string} userid - 资金账户ID
   * @property {string} password - 资金账户密码(8~16)
   * @property {string} status - 资金账户状态
   * @property {number} gift_amount - 赠送金额
   * @property {number} recharge_amount - 充值金额
   * @property {boolean} auto_pay - 自动支付
   * @property {number} current_month_fee - 本月费用
   * @property {number} refresh_fee_time - 费用更新时间
   * @property {number} wrong_password_times - 密码错误次数
   * @property {number} last_wrong_password_time - 最后一次密码错误时间
   */

/**
   * @typedef {Object} Project - 项目信息
   * @property {string} projectid - 项目的ID(24)
   * @property {string} projectname - 项目的名称，可用中文(2-64)
   * @property {string} desc - 项目描述(0~1024)
   * @property {string} owner - 组织的创建者
   * @property {Object} device - 关联设备
   * @property {Object} relation - dev类型
   * @property {number} create_time - 创建时间
   */

/**
   * @typedef {Object} CustomData - 自定义数据
   * @property {string} dataid - 数据的ID(24)
   * @property {string} datatype - 数据的类型(2~64)
   * @property {string} dataname - 数据的名称，可用中文(2-64)
   * @property {string} data - 数据内容(0~102400)
   * @property {number} index - 顺序
   * @property {string} owner - 数据的创建者(0~64)
   * @property {number} create_time - 创建时间
   */

/**
   * @typedef {Object} CustomBigData - 自定义大数据
   * @property {string} customname - 自定义大数据名称
   * @property {string} customtype - 自定义大数据类型
   * @property {string} apptype - 自定义大数据APP类型
   * @property {string} devtype - 自定义大数据DEV类型
   * @property {string} owner - 自定义大数据创建者
   * @property {string} customid - 自定义大数据ID
   */

/**
   * @typedef {Object} Log - 日志
   * @property {string} owner - 拥有者
   * @property {number} time - 操作时间
   * @property {string} ip - IP地址
   * @property {string} operation - 操作
   * @property {string} logid - ID
   */

/**
  * @typedef {number} DateTime 距1970年1月1日的毫秒数 / 1000，如 1561342545
  */

/**
   * @typedef {Object} Response
   * @property {boolean} result - 是否成功
   * @property {string} message - 信息
   * @property {string} jwt - token
   * @property {Object} data - 返回的数据
   */

/**
   * @typedef {Object} Error
   * @property {number} status - HTTP状态码
   * @property {string} errorMsg - 错误信息
   * @property {Object} data - 数据
  */
