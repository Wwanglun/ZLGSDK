class ClientErrorCode {
  // 用户
  static const ZLG_REGISTER_PARAM_WRONG = 20000;
  static const ZLG_REGISTER_USER_EXIST = 20001;
  static const ZLG_GET_USER_INFO_BY_NAME_PARAM_WRONG = 20002;
  static const ZLG_USER_NOT_EXIST = 20003;
  static const ZLG_MODIFY_USER_PARAM_WRONG = 20004;
  static const ZLG_CHANGE_AVATAR_PARAM_WRONG = 20005;
  static const ZLG_CHANGE_SYS_LOGO_PARAM_WRONG = 20006;
  // 认证
  static const ZLG_SMSCODE_PARAM_WRONG = 20007;
  static const ZLG_FREQUENT_OPERATION = 20008;
  static const ZLG_GET_EMAIL_CODE_PARAM_WRONG = 20009;
  static const ZLG_GET_MOBILE_CODE_PARAM_WRONG = 20010;
  static const ZLG_LOGIN_PARAM_WRONG = 20011;
  static const ZLG_LOGIN_SERVER_REFUSE = 20012;
  static const ZLG_LOGIN_NO_USER = 20013;
  static const ZLG_USER_EXIST_PARAM_WRONG = 20014;
  static const ZLG_EMAIL_EXIST_PARAM_WRONG = 20015;
  static const ZLG_MOBILE_EXIST_PARAM_WRONG = 20016;
  static const ZLG_GET_RECOVER_PWD_CODE_PARAM_WRONG = 20017;
  static const ZLG_FORBIDDEN = 20018;
  static const ZLG_GET_RECOVER_PWD_CODE_NOT_EXIST = 20019;
  static const ZLG_RESET_PWD_PARAM_WRONG = 20020;
  static const ZLG_RESET_PWD_NOT_EXIST = 20021;
  static const ZLG_CHANGE_PWD_PARAM_WRONG = 20022;
  static const ZLG_APP_LOGIN_PARAM_WRONGL = 20023;
  static const ZLG_WEB_LOGIN_PARAM_WRONG = 20024;
  // 子用户管理
  static const ZLG_SUBUSER_NOT_EXIST = 20025;
  // 权限管理
  static const ZLG_USER_ACCESS_GROUP_NOT_EXIST = 20026;
  // 分组管理
  static const ZLG_DEVICE_GROUP_NOT_EXIST = 20027;
  // 子设备
  static const ZLG_DEVINFO_PARAM_WRONG = 20028;
  static const ZLG_DEV_NOT_EXIST = 20029;
  // 设备
  static const ZLG_DEVICE_NOT_EXIST = 20030;
  // 设备类型
  static const ZLG_DEVICE_TYPE_NOT_EXIST = 20031;
  // 设备命令
  static const ZLG_COMMAND_NOT_EXIST = 20032;
  // 组播
  static const ZLG_MULTICAST_PARAM_WRONG = 20033;
  static const ZLG_MULTICAST_ADDR_EXIST = 20034;
  static const ZLG_MULTICAST_NOT_EXIST = 20035;
  // 固件管理
  static const ZLG_FIRMWARE_NOT_EXIST = 20036;
  // 资金管理
  static const ZLG_FUND_ACCOUNT_USER_NOT_EXIST = 20037;
  static const ZLG_FUND_ACCOUNT_CODE_INVALID = 20038;
  static const ZLG_FUND_ACCOUNT_SMS_OR_MOBILE_NOT_EXIST = 20039;
  static const ZLG_FUND_ACCOUNT_NOT_EXIST = 20040;
  // 大数据（配置）
  static const ZLG_CUSTOM_BIG_DATA_PARAM_DUPLICATE = 20041;
  static const ZLG_CUSTOM_BIG_DATA_NOT_EXIST = 20042;
  // 项目管理
  static const ZLG_DUPLICATE_PROJECT_NAME = 20043;
  static const ZLG_PROJECT_NOT_EXIST = 20044;
  // 自定义数据（项目数据）
  static const ZLG_CUSTOM_DATA_NAME_DUPLICATE = 20045;
  static const ZLG_CUSTOM_DATA_NOT_EXIST = 20046;
  // 规则引擎配置
  static const ZLG_RULES_CONFIG_PARAM_WRONG = 20047;

  // 通用错误
  static const ZLG_NOT_LOGIN= 20048;
  static const ZLG_UNKNOW= 20049;
  static const ZLG_PARAM_WRONG= 20050;
  static const ZLG_REQUEST_TIMEOUT= 20051;
  static const ZLG_SERVER_NO_RESPONSE= 20052;
  static const ZLG_SERVER_ERROR= 20053;
  static const ZLG_NO_NETWORK = 20054;

  static const ZLG_SEND_COMMAND_NO_RSP = 20055;
}
