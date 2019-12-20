var mockData = function (getters) {
  return
    this.devtypesOptions = [
  {
    "devtype": "全部"
  },
  {
    "devtype": "gw_zigbee_node",
    "basetype": "gw_zigbee_node",
    "enable_secret": false,
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2)，LoraWan网关(3);此处必须为3，即LoraWan网关"
        },
        "desc": {
          "comment": "zigbee节点",
          "maxLength": 1024,
          "type": "string"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {},
      "status": {
        "power": {
          "comment": "节点当前的电量",
          "nickname": "节点当前电量",
          "unit": "%",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {},
      "errors": {},
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "type": "number",
              "format": "int"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.01171875,
    "devices_size": 0.06640625,
    "event_size": 0.01171875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1573109683,
    "comment": "asdasdasdasdasd",
    "devtypeid": "5dc3bfb383b64b4d3dbb52a8",
    "devices": {
      "count": 1
    },
    "uri": "/v1/devices/devtype/gw_zigbee_node"
  },
  {
    "devtype": "gw_zigbee",
    "basetype": "gw_zigbee",
    "enable_secret": false,
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 1,
          "max": 1,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2)，LoraWan网关(3);此处必须为3，即LoraWan网关"
        },
        "desc": {
          "comment": "通用网关",
          "maxLength": 1024,
          "type": "string"
        },
        "node_gw_bydata": {
          "comment": "网关字段",
          "type": "boolean",
          "default": true
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {},
      "status": {
        "mac": {
          "comment": "网关的mac地址",
          "nickname": "mac地址",
          "type": "string"
        },
        "time": {
          "comment": "网关当前的时间",
          "nickname": "当前时间",
          "unit": "ms",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "rxnb": {
          "comment": "网关接受的包数量",
          "nickname": "接受包数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "txnb": {
          "comment": "网关发送的包数量",
          "nickname": "发送包数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "NodeCnt": {
          "comment": "网关挂载的节点数量",
          "nickname": "挂载节点数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "maxNodeCnt": {
          "comment": "网关可挂载的最大节点数量",
          "nickname": "最大挂载节点数量",
          "min": 0,
          "max": 5000,
          "type": "number",
          "format": "float"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "show_frontend": true,
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {},
      "errors": {},
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "type": "number",
              "format": "int"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": true,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.01171875,
    "devices_size": 0.06640625,
    "event_size": 0.01171875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 1,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1573109627,
    "devtypeid": "5dc3bf7b83b64b3d4dbb524d",
    "devices": {
      "count": 1
    },
    "uri": "/v1/devices/devtype/gw_zigbee"
  },
  {
    "devtype": "Test111",
    "basetype": "candtu-200",
    "comment": "",
    "schema": {
      "memo": {
        "desc": {
          "comment": "两路CAN-bus数据记录仪",
          "maxLength": 1024,
          "type": "string"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 31,
          "minLength": 1,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "time": {
          "nickname": "时间",
          "format": "float",
          "type": "number"
        },
        "id": {
          "nickname": "CAN帧ID",
          "format": "float",
          "type": "number"
        },
        "flag": {
          "nickname": "报文标志",
          "format": "float",
          "type": "number"
        },
        "ch": {
          "nickname": "通道",
          "format": "float",
          "type": "number"
        },
        "len": {
          "nickname": "数据长度",
          "format": "float",
          "type": "number"
        },
        "data": {
          "nickname": "数据内容",
          "type": "object"
        }
      },
      "status": {
        "devname": {
          "comment": "设备名, ASCII字符, 最长31个字符",
          "nickname": "设备名",
          "type": "string",
          "minimum": 1,
          "maximum": 31
        },
        "model": {
          "comment": "设备型号",
          "nickname": "设备型号",
          "type": "string",
          "enums": [
            "CANDTU-200UWG",
            "CANDTU-200UWGR",
            "CANDTU-200UWGR-B"
          ]
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "nickname": "GPS信息时间戳"
            }
          }
        },
        "CfgInfo": {
          "comment": "CANDTU配置",
          "type": "object",
          "nickname": "CANDTU配置",
          "properties": {
            "CAN": {
              "type": "object",
              "comment": "CAN配置",
              "nickname": "CAN配置",
              "properties": {
                "CAN0": {
                  "type": "object",
                  "comment": "CAN0配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                },
                "CAN1": {
                  "type": "object",
                  "comment": "CAN1配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                }
              }
            },
            "LIN": {
              "type": "object",
              "comment": "LIN配置",
              "nickname": "LIN配置",
              "properties": {
                "LIN0": {
                  "type": "object",
                  "comment": "LIN配置",
                  "nickname": "LIN配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Baud": {
                      "type": "integer",
                      "comment": "LIN波特率",
                      "minimum": 1000,
                      "maximum": 20000
                    },
                    "DataLen": {
                      "type": "integer",
                      "comment": "LIN数据长度",
                      "minimum": 1,
                      "maximum": 8
                    }
                  }
                }
              }
            },
            "DI": {
              "type": "object",
              "comment": "DI配置",
              "nickname": "DI配置",
              "properties": {
                "DI0": {
                  "type": "object",
                  "comment": "DI配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "DI功能",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Interval": {
                      "type": "integer",
                      "comment": "DI记录间隔(ms)，DI功能为输入时有效",
                      "enum": [
                        1,
                        2,
                        5,
                        10,
                        20,
                        50,
                        100,
                        200,
                        500,
                        1000
                      ]
                    }
                  }
                }
              }
            },
            "DO": {
              "type": "object",
              "comment": "DO配置",
              "nickname": "DO配置",
              "properties": {
                "DO0": {
                  "type": "object",
                  "comment": "DO配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "告警条件，1：记录满，2：总线错误，3：存储状态异常，4：GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Output": {
                      "type": "integer",
                      "comment": "DO告警时输出值",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "DO告警GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "DO告警GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "DO告警GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "DO告警GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "RecCfg": {
              "type": "object",
              "comment": "CANDTU记录配置",
              "nickname": "CANDTU记录配置",
              "properties": {
                "RecFullHdl": {
                  "type": "integer",
                  "comment": "存储空间满处理(0:循环记录/1：停止记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecFSize": {
                  "type": "integer",
                  "comment": "最大记录文件大小(MB)",
                  "minimum": 2,
                  "maximum": 512
                },
                "RecErr": {
                  "type": "integer",
                  "comment": "是否记录CAN错误帧(0:不记录/1：记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecMer": {
                  "type": "integer",
                  "comment": "通道记录数据是否合并(0：不合并/1:合并)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "TrgMode": {
              "type": "object",
              "comment": "CANDTU记录触发模式配置",
              "nickname": "CANDTU记录触发模式配置",
              "properties": {
                "RecMode": {
                  "type": "integer",
                  "comment": "CAN记录模式(0：长时间记录/1:条件记录/2：预触发记录/3：定时记录/4：不记录)",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                },
                "ConRec": {
                  "type": "object",
                  "comment": "条件记录配置对象",
                  "properties": {
                    "StartChn": {
                      "type": "integer",
                      "comment": "开始记录通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartExt": {
                      "type": "integer",
                      "comment": "开始记录帧类型（0：标准帧/1:扩展帧）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartOp": {
                      "type": "integer",
                      "comment": "开始记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StartIdS": {
                      "type": "integer",
                      "comment": "开始记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StartIdL": {
                      "type": "integer",
                      "comment": "开始记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopChn": {
                      "type": "integer",
                      "comment": "停止记录通道号,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopExt": {
                      "type": "integer",
                      "comment": "停止记录帧类型（0：标准帧/1:扩展帧),标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopOp": {
                      "type": "integer",
                      "comment": "停止记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StopIdS": {
                      "type": "integer",
                      "comment": "停止记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopIdL": {
                      "type": "integer",
                      "comment": "停止记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    }
                  }
                },
                "PreTrgRec": {
                  "type": "object",
                  "comment": "预触发记录配置对象",
                  "properties": {
                    "PreVal": {
                      "type": "integer",
                      "comment": "预触发记录帧数",
                      "minimum": 10,
                      "maximum": 100000
                    },
                    "PostVal": {
                      "type": "integer",
                      "comment": "触发后记录时间(ms)",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TrgNum": {
                      "type": "integer",
                      "comment": "触发条件数",
                      "minimum": 1,
                      "maximum": 512
                    },
                    "TrgCon": {
                      "type": "array",
                      "comment": "触发条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                },
                "TimRec": {
                  "type": "object",
                  "comment": "定时记录配置对象",
                  "properties": {
                    "Period": {
                      "type": "object",
                      "comment": "定时时间周期（ms）",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TmNDA": {
                      "type": "object",
                      "comment": "定时时间内无数据记录方式（0：不记录/1：保存最近一次数据/2：保存自定义数据）",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "TmNDAUD": {
                      "type": "string",
                      "comment": "定时时间内无记录保存的自定义数据（16进制保存为字符串）",
                      "minimum": 0,
                      "maximum": 16
                    },
                    "FltNum": {
                      "type": "integer",
                      "comment": "过滤条件数",
                      "minimum": 0,
                      "maximum": 256
                    },
                    "FltCon": {
                      "type": "array",
                      "comment": "过滤条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "Quota": {
              "type": "object",
              "comment": "存储空间分配",
              "nickname": "存储空间分配",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                }
              }
            },
            "GPSRec": {
              "type": "object",
              "comment": "GPS记录配置",
              "nickname": "GPS记录配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "GPS记录使能（1：使能/0：失能）",
                  "enum": [
                    0,
                    1
                  ]
                },
                "Type": {
                  "type": "integer",
                  "comment": "定位系统类型（0：自动选择/1：北斗/2：GPS）",
                  "enum": [
                    0,
                    1,
                    2
                  ]
                },
                "Period": {
                  "type": "integer",
                  "comment": "记录周期（s）",
                  "minimum": 1,
                  "maximum": 1800
                }
              }
            },
            "SMS": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "SMS0": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS1": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS2": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS3": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS4": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS5": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "Net": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "Net0": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net1": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net2": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                }
              }
            },
            "NetFlt": {
              "type": "object",
              "comment": "无线过滤配置",
              "nickname": "无线过滤配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "无线传输加密使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "FltNum": {
                  "type": "integer",
                  "comment": "触发条件数",
                  "minimum": 1,
                  "maximum": 256
                },
                "FltCon": {
                  "type": "array",
                  "comment": "触发条件列表",
                  "minItems": 1,
                  "maxItems": 256,
                  "items": {
                    "type": "object",
                    "properties": {
                      "Chn": {
                        "type": "integer",
                        "comment": "通道号",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Type": {
                        "type": "integer",
                        "comment": "过滤记录类型（0：ID滤波/1：时间段滤波）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Op": {
                        "type": "integer",
                        "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ]
                      },
                      "Ext": {
                        "type": "integer",
                        "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "IdS": {
                        "type": "integer",
                        "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      },
                      "IdL": {
                        "type": "integer",
                        "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      }
                    }
                  }
                }
              }
            },
            "NetGen": {
              "type": "object",
              "comment": "无线通用配置",
              "nickname": "无线通用配置",
              "properties": {
                "Times": {
                  "type": "integer",
                  "comment": "断网续传次数",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                },
                "Proto": {
                  "type": "integer",
                  "comment": "加密协议编号",
                  "enum": [
                    0,
                    1
                  ]
                },
                "SendIdEn": {
                  "type": "integer",
                  "comment": "网络数据携带设备ID和绝对时间戳使能",
                  "enum": [
                    0,
                    1
                  ]
                },
                "NetLogEn": {
                  "type": "integer",
                  "comment": "网络调试日志使能",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "IotEn": {
              "type": "object",
              "comment": "实时数据上传使能",
              "nickname": "实时数据上传使能",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            }
          }
        },
        "SDStat": {
          "comment": "SD卡状态,0-SD卡未插入，1-SD卡插入，2-设备记录中，-1-设备无SD卡",
          "nickname": "SD卡状态",
          "type": "number",
          "format": "int",
          "enum": [
            0,
            1,
            2,
            -1
          ]
        },
        "FwVer": {
          "comment": "固件版本号, 如：V1.00",
          "nickname": "固件版本号",
          "type": "string"
        },
        "HwVer": {
          "comment": "硬件版本号, 如：V1.00",
          "nickname": "硬件版本号",
          "type": "string"
        },
        "Serial": {
          "comment": "产品序列号, 8字符",
          "nickname": "产品序列号",
          "type": "string"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "StartRec": {
          "comment": "启动记录",
          "nickname": "启动记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "StopRec": {
          "comment": "停止记录",
          "nickname": "停止记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "ClrDev": {
          "comment": "清空设备",
          "nickname": "清空设备",
          "cmdtype": true,
          "show_frontend": true
        },
        "GetRecFileInfo": {
          "comment": "获取文件列表信息",
          "nickname": "获取文件列表",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "StartTime": {
              "comment": "起始时间戳",
              "nickname": "起始时间戳",
              "type": "number",
              "format": "int"
            },
            "StopTime": {
              "comment": "结束时间戳",
              "nickname": "结束时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "GetRecFile": {
          "comment": "获取记录文件",
          "nickname": "获取记录文件",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "Name": {
              "comment": "文件名",
              "nickname": "文件名",
              "type": "string"
            },
            "Offset": {
              "comment": "文件偏移",
              "nickname": "文件偏移",
              "type": "number",
              "format": "int"
            },
            "Tag": {
              "comment": "本次传输文件标签",
              "nickname": "文件标签",
              "type": "number",
              "format": "int"
            }
          }
        },
        "CancelGetRec": {
          "comment": "取消传输",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型",
              "nickname": "数据类型",
              "type": "number",
              "format": "int"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "RecFull": {
          "comment": "记录满",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        }
      },
      "errors": {
        "err": {
          "comment": "CAN总线错误",
          "args": {
            "chn": {
              "comment": "CAN错误通道",
              "type": "number",
              "format": "int"
            },
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "err_code": {
              "comment": "错误码",
              "type": "number",
              "format": "int"
            }
          }
        },
        "storge_err": {
          "comment": "存储状态异常",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "gps_err": {
          "comment": "GPS不在指定GPS区域",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "type": {
              "comment": "告警类型：1：短信通知设置的告警，2：DO输出设置的告警",
              "type": "number",
              "format": "int"
            },
            "longitude": {
              "comment": "经度",
              "type": "number",
              "format": "float"
            },
            "latitude": {
              "comment": "纬度",
              "type": "number",
              "format": "float"
            }
          }
        }
      },
      "logs": {
        "log": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1,
          "num": -1
        },
        "options": {
          "unique": true
        }
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "e41c6430-f17e-11e9-af30-27e7af667e5c",
    "owner": "zlg001",
    "created_time": 1571386290,
    "devtypeid": "5da973b29d9a3eca203044ac",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/Test111"
  },
  {
    "devtype": "Testcvb",
    "basetype": "demo",
    "comment": "Jasper87",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "qqqiiii": {
          "type": "number",
          "format": "float",
          "comment": "",
          "nickname": "",
          "unit": ""
        },
        "efgff": {
          "type": "number",
          "format": "float",
          "comment": "",
          "nickname": "dddr",
          "unit": ""
        },
        "qqqq": {
          "type": "number",
          "format": "int",
          "comment": "qwww",
          "max": 0,
          "min": 0,
          "nickname": "ffbn",
          "unit": "qw"
        },
        "temp": {
          "type": "number",
          "format": "float",
          "comment": "温度",
          "nickname": "qqww",
          "unit": ""
        }
      },
      "status": {
        "aaaa": {
          "type": "number",
          "format": "float",
          "comment": "工作温度正常",
          "nickname": "暨大",
          "properties": {
            "qqqq": {
              "type": "string",
              "required": false,
              "comment": "",
              "nickname": ""
            }
          }
        }
      },
      "commands": {
        "nbv": {
          "comment": "",
          "cmdtype": false,
          "show_frontend": false,
          "nickname": "",
          "args": {
            "kkkk": {
              "type": "string",
              "format": null,
              "required": false,
              "comment": "",
              "nickname": "",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "zzzz": {
          "comment": "",
          "cmdtype": false,
          "show_frontend": false,
          "nickname": "",
          "args": {
            "qqqq": {
              "type": "number",
              "format": "float",
              "required": false,
              "comment": "",
              "nickname": "",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "sync_time": {
          "comment": "同步时间",
          "cmdtype": true,
          "show_frontend": false,
          "nickname": "同步时间",
          "args": {
            "time": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": "",
              "nickname": "时间",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "cmdtype": true,
          "show_frontend": false,
          "nickname": "通知设备有新固件",
          "args": {
            "devtype": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "设备类型",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "version": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "固件版本",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "url": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "固件url",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "cmdtype": true,
          "show_frontend": false,
          "nickname": "通知设备更新固件",
          "args": {
            "devtype": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "设备类型",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "version": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "固件版本",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "url": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "固件url",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "cmdtype": true,
          "show_frontend": false,
          "nickname": "上报最新数据",
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "nickname": "透传命令",
          "args": {
            "format": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": "编码格式",
              "nickname": "编码格式",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "raw": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": "数据",
              "nickname": "数据",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "eett": {
          "comment": "工作温度正常",
          "nickname": "雨玨",
          "args": {
            "mmmm": {
              "type": "string",
              "required": false,
              "comment": "",
              "nickname": "三块五"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1571020633,
    "devtypeid": "5da3df59dede2c4901225086",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/Testcvb"
  },
  {
    "devtype": "testsdf-dc",
    "basetype": "gw_zigbee",
    "comment": "string",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 1,
          "max": 1,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2)，LoraWan网关(3);此处必须为3，即LoraWan网关"
        },
        "desc": {
          "comment": "通用网关",
          "maxLength": 1024,
          "type": "string"
        },
        "node_gw_bydata": {
          "comment": "网关字段",
          "type": "boolean",
          "default": true
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {},
      "status": {
        "mac": {
          "comment": "网关的mac地址",
          "nickname": "mac地址",
          "type": "string"
        },
        "time": {
          "comment": "网关当前的时间",
          "nickname": "当前时间",
          "unit": "ms",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "rxnb": {
          "comment": "网关接受的包数量",
          "nickname": "接受包数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "txnb": {
          "comment": "网关发送的包数量",
          "nickname": "发送包数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "NodeCnt": {
          "comment": "网关挂载的节点数量",
          "nickname": "挂载节点数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "maxNodeCnt": {
          "comment": "网关可挂载的最大节点数量",
          "nickname": "最大挂载节点数量",
          "min": 0,
          "max": 5000,
          "type": "number",
          "format": "float"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {},
      "errors": {},
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "type": "number",
              "format": "int"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": true,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 1,
    "enable_secret": false,
    "dtype_secret": "2c8cc510-eccb-11e9-9ead-4391e1cfd39b",
    "owner": "zlg001",
    "created_time": 1570869298,
    "devtypeid": "5da19032dede2cce131e1570",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/testsdf-dc"
  },
  {
    "devtype": "candtu-200",
    "basetype": "candtu-200",
    "enable_secret": false,
    "schema": {
      "memo": {
        "desc": {
          "comment": "两路CAN-bus数据记录仪",
          "maxLength": 1024,
          "type": "string"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 31,
          "minLength": 1,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "time": {
          "nickname": "时间",
          "format": "float",
          "type": "number"
        },
        "id": {
          "nickname": "CAN帧ID",
          "format": "float",
          "type": "number"
        },
        "flag": {
          "nickname": "报文标志",
          "format": "float",
          "type": "number"
        },
        "ch": {
          "nickname": "通道",
          "format": "float",
          "type": "number"
        },
        "len": {
          "nickname": "数据长度",
          "format": "float",
          "type": "number"
        },
        "data": {
          "nickname": "数据内容",
          "type": "object"
        }
      },
      "status": {
        "devname": {
          "comment": "设备名, ASCII字符, 最长31个字符",
          "nickname": "设备名",
          "type": "string",
          "minimum": 1,
          "maximum": 31
        },
        "model": {
          "comment": "设备型号",
          "nickname": "设备型号",
          "type": "string",
          "enums": [
            "CANDTU-200UWG",
            "CANDTU-200UWGR",
            "CANDTU-200UWGR-B"
          ]
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "nickname": "GPS信息时间戳"
            }
          }
        },
        "CfgInfo": {
          "comment": "CANDTU配置",
          "type": "object",
          "nickname": "CANDTU配置",
          "properties": {
            "CAN": {
              "type": "object",
              "comment": "CAN配置",
              "nickname": "CAN配置",
              "properties": {
                "CAN0": {
                  "type": "object",
                  "comment": "CAN0配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                },
                "CAN1": {
                  "type": "object",
                  "comment": "CAN1配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                }
              }
            },
            "LIN": {
              "type": "object",
              "comment": "LIN配置",
              "nickname": "LIN配置",
              "properties": {
                "LIN0": {
                  "type": "object",
                  "comment": "LIN配置",
                  "nickname": "LIN配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Baud": {
                      "type": "integer",
                      "comment": "LIN波特率",
                      "minimum": 1000,
                      "maximum": 20000
                    },
                    "DataLen": {
                      "type": "integer",
                      "comment": "LIN数据长度",
                      "minimum": 1,
                      "maximum": 8
                    }
                  }
                }
              }
            },
            "DI": {
              "type": "object",
              "comment": "DI配置",
              "nickname": "DI配置",
              "properties": {
                "DI0": {
                  "type": "object",
                  "comment": "DI配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "DI功能",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Interval": {
                      "type": "integer",
                      "comment": "DI记录间隔(ms)，DI功能为输入时有效",
                      "enum": [
                        1,
                        2,
                        5,
                        10,
                        20,
                        50,
                        100,
                        200,
                        500,
                        1000
                      ]
                    }
                  }
                }
              }
            },
            "DO": {
              "type": "object",
              "comment": "DO配置",
              "nickname": "DO配置",
              "properties": {
                "DO0": {
                  "type": "object",
                  "comment": "DO配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "告警条件，1：记录满，2：总线错误，3：存储状态异常，4：GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Output": {
                      "type": "integer",
                      "comment": "DO告警时输出值",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "DO告警GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "DO告警GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "DO告警GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "DO告警GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "RecCfg": {
              "type": "object",
              "comment": "CANDTU记录配置",
              "nickname": "CANDTU记录配置",
              "properties": {
                "RecFullHdl": {
                  "type": "integer",
                  "comment": "存储空间满处理(0:循环记录/1：停止记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecFSize": {
                  "type": "integer",
                  "comment": "最大记录文件大小(MB)",
                  "minimum": 2,
                  "maximum": 512
                },
                "RecErr": {
                  "type": "integer",
                  "comment": "是否记录CAN错误帧(0:不记录/1：记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecMer": {
                  "type": "integer",
                  "comment": "通道记录数据是否合并(0：不合并/1:合并)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "TrgMode": {
              "type": "object",
              "comment": "CANDTU记录触发模式配置",
              "nickname": "CANDTU记录触发模式配置",
              "properties": {
                "RecMode": {
                  "type": "integer",
                  "comment": "CAN记录模式(0：长时间记录/1:条件记录/2：预触发记录/3：定时记录/4：不记录)",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                },
                "ConRec": {
                  "type": "object",
                  "comment": "条件记录配置对象",
                  "properties": {
                    "StartChn": {
                      "type": "integer",
                      "comment": "开始记录通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartExt": {
                      "type": "integer",
                      "comment": "开始记录帧类型（0：标准帧/1:扩展帧）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartOp": {
                      "type": "integer",
                      "comment": "开始记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StartIdS": {
                      "type": "integer",
                      "comment": "开始记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StartIdL": {
                      "type": "integer",
                      "comment": "开始记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopChn": {
                      "type": "integer",
                      "comment": "停止记录通道号,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopExt": {
                      "type": "integer",
                      "comment": "停止记录帧类型（0：标准帧/1:扩展帧),标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopOp": {
                      "type": "integer",
                      "comment": "停止记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StopIdS": {
                      "type": "integer",
                      "comment": "停止记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopIdL": {
                      "type": "integer",
                      "comment": "停止记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    }
                  }
                },
                "PreTrgRec": {
                  "type": "object",
                  "comment": "预触发记录配置对象",
                  "properties": {
                    "PreVal": {
                      "type": "integer",
                      "comment": "预触发记录帧数",
                      "minimum": 10,
                      "maximum": 100000
                    },
                    "PostVal": {
                      "type": "integer",
                      "comment": "触发后记录时间(ms)",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TrgNum": {
                      "type": "integer",
                      "comment": "触发条件数",
                      "minimum": 1,
                      "maximum": 512
                    },
                    "TrgCon": {
                      "type": "array",
                      "comment": "触发条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                },
                "TimRec": {
                  "type": "object",
                  "comment": "定时记录配置对象",
                  "properties": {
                    "Period": {
                      "type": "object",
                      "comment": "定时时间周期（ms）",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TmNDA": {
                      "type": "object",
                      "comment": "定时时间内无数据记录方式（0：不记录/1：保存最近一次数据/2：保存自定义数据）",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "TmNDAUD": {
                      "type": "string",
                      "comment": "定时时间内无记录保存的自定义数据（16进制保存为字符串）",
                      "minimum": 0,
                      "maximum": 16
                    },
                    "FltNum": {
                      "type": "integer",
                      "comment": "过滤条件数",
                      "minimum": 0,
                      "maximum": 256
                    },
                    "FltCon": {
                      "type": "array",
                      "comment": "过滤条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "Quota": {
              "type": "object",
              "comment": "存储空间分配",
              "nickname": "存储空间分配",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                }
              }
            },
            "GPSRec": {
              "type": "object",
              "comment": "GPS记录配置",
              "nickname": "GPS记录配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "GPS记录使能（1：使能/0：失能）",
                  "enum": [
                    0,
                    1
                  ]
                },
                "Type": {
                  "type": "integer",
                  "comment": "定位系统类型（0：自动选择/1：北斗/2：GPS）",
                  "enum": [
                    0,
                    1,
                    2
                  ]
                },
                "Period": {
                  "type": "integer",
                  "comment": "记录周期（s）",
                  "minimum": 1,
                  "maximum": 1800
                }
              }
            },
            "SMS": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "SMS0": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS1": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS2": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS3": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS4": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS5": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "Net": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "Net0": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net1": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net2": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                }
              }
            },
            "NetFlt": {
              "type": "object",
              "comment": "无线过滤配置",
              "nickname": "无线过滤配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "无线传输加密使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "FltNum": {
                  "type": "integer",
                  "comment": "触发条件数",
                  "minimum": 1,
                  "maximum": 256
                },
                "FltCon": {
                  "type": "array",
                  "comment": "触发条件列表",
                  "minItems": 1,
                  "maxItems": 256,
                  "items": {
                    "type": "object",
                    "properties": {
                      "Chn": {
                        "type": "integer",
                        "comment": "通道号",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Type": {
                        "type": "integer",
                        "comment": "过滤记录类型（0：ID滤波/1：时间段滤波）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Op": {
                        "type": "integer",
                        "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ]
                      },
                      "Ext": {
                        "type": "integer",
                        "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "IdS": {
                        "type": "integer",
                        "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      },
                      "IdL": {
                        "type": "integer",
                        "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      }
                    }
                  }
                }
              }
            },
            "NetGen": {
              "type": "object",
              "comment": "无线通用配置",
              "nickname": "无线通用配置",
              "properties": {
                "Times": {
                  "type": "integer",
                  "comment": "断网续传次数",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                },
                "Proto": {
                  "type": "integer",
                  "comment": "加密协议编号",
                  "enum": [
                    0,
                    1
                  ]
                },
                "SendIdEn": {
                  "type": "integer",
                  "comment": "网络数据携带设备ID和绝对时间戳使能",
                  "enum": [
                    0,
                    1
                  ]
                },
                "NetLogEn": {
                  "type": "integer",
                  "comment": "网络调试日志使能",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "IotEn": {
              "type": "object",
              "comment": "实时数据上传使能",
              "nickname": "实时数据上传使能",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            }
          }
        },
        "SDStat": {
          "comment": "SD卡状态,0-SD卡未插入，1-SD卡插入，2-设备记录中，-1-设备无SD卡",
          "nickname": "SD卡状态",
          "type": "number",
          "format": "int",
          "enum": [
            0,
            1,
            2,
            -1
          ]
        },
        "FwVer": {
          "comment": "固件版本号, 如：V1.00",
          "nickname": "固件版本号",
          "type": "string"
        },
        "HwVer": {
          "comment": "硬件版本号, 如：V1.00",
          "nickname": "硬件版本号",
          "type": "string"
        },
        "Serial": {
          "comment": "产品序列号, 8字符",
          "nickname": "产品序列号",
          "type": "string"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "StartRec": {
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "启动记录",
          "comment": "启动记录"
        },
        "StopRec": {
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "停止记录",
          "comment": "停止记录"
        },
        "ClrDev": {
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "清空设备",
          "comment": "清空设备"
        },
        "GetRecFileInfo": {
          "args": {
            "RecType": {
              "type": "string",
              "required": false,
              "nickname": "数据类型",
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN"
            },
            "StartTime": {
              "format": "int",
              "type": "number",
              "nickname": "起始时间戳",
              "comment": "起始时间戳"
            },
            "StopTime": {
              "format": "int",
              "type": "number",
              "nickname": "结束时间戳",
              "comment": "结束时间戳"
            }
          },
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "获取文件列表",
          "comment": "获取文件列表信息"
        },
        "GetRecFile": {
          "args": {
            "RecType": {
              "format": "int",
              "type": "number",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ],
              "nickname": "数据类型",
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN"
            },
            "Name": {
              "type": "string",
              "nickname": "文件名",
              "comment": "文件名"
            },
            "Offset": {
              "format": "int",
              "type": "number",
              "nickname": "文件偏移",
              "comment": "文件偏移"
            },
            "Tag": {
              "format": "int",
              "type": "number",
              "nickname": "文件标签",
              "comment": "本次传输文件标签"
            }
          },
          "cmdtype": true,
          "nickname": "获取记录文件",
          "comment": "获取记录文件"
        },
        "CancelGetRec": {
          "args": {
            "RecType": {
              "format": "int",
              "type": "number",
              "nickname": "数据类型",
              "comment": "指定数据类型"
            }
          },
          "cmdtype": true,
          "comment": "取消传输"
        },
        "set_config": {
          "cmdtype": true,
          "nickname": "配置设备参数",
          "comment": "配置设备参数，与具体的设备有关"
        },
        "sync_time": {
          "args": {
            "time": {
              "type": "number",
              "required": true,
              "nickname": "时间"
            }
          },
          "cmdtype": true,
          "nickname": "同步时间",
          "comment": "同步时间"
        },
        "notify_upgrade": {
          "args": {
            "devtype": {
              "type": "string",
              "required": true,
              "nickname": "设备类型"
            },
            "version": {
              "type": "string",
              "required": true,
              "nickname": "固件版本"
            },
            "url": {
              "type": "string",
              "required": true,
              "nickname": "固件url"
            }
          },
          "cmdtype": true,
          "nickname": "通知设备有新固件",
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件"
        },
        "exec_upgrade": {
          "args": {
            "devtype": {
              "type": "string",
              "required": true,
              "nickname": "设备类型"
            },
            "version": {
              "type": "string",
              "required": true,
              "nickname": "固件版本"
            },
            "url": {
              "type": "string",
              "required": true,
              "nickname": "固件url"
            }
          },
          "cmdtype": true,
          "nickname": "通知设备更新固件",
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件"
        },
        "req_report": {
          "cmdtype": true,
          "nickname": "上报最新数据",
          "comment": "要求设备上报最新数据。"
        },
        "pass_through": {
          "args": {
            "format": {
              "type": "string",
              "required": true,
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "nickname": "编码格式",
              "comment": "编码格式"
            },
            "raw": {
              "type": "string",
              "required": true,
              "nickname": "数据",
              "comment": "数据"
            }
          },
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "透传命令",
          "comment": "透传命令"
        }
      },
      "warnings": {
        "RecFull": {
          "comment": "记录满",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        }
      },
      "errors": {
        "err": {
          "comment": "CAN总线错误",
          "args": {
            "chn": {
              "comment": "CAN错误通道",
              "type": "number",
              "format": "int"
            },
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "err_code": {
              "comment": "错误码",
              "type": "number",
              "format": "int"
            }
          }
        },
        "storge_err": {
          "comment": "存储状态异常",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "gps_err": {
          "comment": "GPS不在指定GPS区域",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "type": {
              "comment": "告警类型：1：短信通知设置的告警，2：DO输出设置的告警",
              "type": "number",
              "format": "int"
            },
            "longitude": {
              "comment": "经度",
              "type": "number",
              "format": "float"
            },
            "latitude": {
              "comment": "纬度",
              "type": "number",
              "format": "float"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1,
          "num": -1
        },
        "options": {
          "unique": true
        }
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.01171875,
    "devices_size": 0.08203125,
    "event_size": 0.01171875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1568874135,
    "devtypeid": "5d831e97b137e8d9929fb9cc",
    "devices": {
      "count": 1
    },
    "uri": "/v1/devices/devtype/candtu-200"
  },
  {
    "devtype": "CANDTU200",
    "basetype": "candtu-200",
    "comment": "sssss",
    "schema": {
      "memo": {
        "desc": {
          "comment": "两路CAN-bus数据记录仪",
          "maxLength": 1024,
          "type": "string"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 31,
          "minLength": 1,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "time": {
          "nickname": "时间",
          "format": "float",
          "type": "number"
        },
        "id": {
          "nickname": "CAN帧ID",
          "format": "float",
          "type": "number"
        },
        "flag": {
          "nickname": "报文标志",
          "format": "float",
          "type": "number"
        },
        "ch": {
          "nickname": "通道",
          "format": "float",
          "type": "number"
        },
        "len": {
          "nickname": "数据长度",
          "format": "float",
          "type": "number"
        },
        "data": {
          "nickname": "数据内容",
          "type": "object"
        }
      },
      "status": {
        "devname": {
          "comment": "设备名, ASCII字符, 最长31个字符",
          "nickname": "设备名",
          "type": "string",
          "minimum": 1,
          "maximum": 31
        },
        "model": {
          "comment": "设备型号",
          "nickname": "设备型号",
          "type": "string",
          "enums": [
            "CANDTU-200UWG",
            "CANDTU-200UWGR",
            "CANDTU-200UWGR-B"
          ]
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "nickname": "GPS信息时间戳"
            }
          }
        },
        "CfgInfo": {
          "comment": "CANDTU配置",
          "type": "object",
          "nickname": "CANDTU配置",
          "properties": {
            "CAN": {
              "type": "object",
              "comment": "CAN配置",
              "nickname": "CAN配置",
              "properties": {
                "CAN0": {
                  "type": "object",
                  "comment": "CAN0配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                },
                "CAN1": {
                  "type": "object",
                  "comment": "CAN1配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                }
              }
            },
            "LIN": {
              "type": "object",
              "comment": "LIN配置",
              "nickname": "LIN配置",
              "properties": {
                "LIN0": {
                  "type": "object",
                  "comment": "LIN配置",
                  "nickname": "LIN配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Baud": {
                      "type": "integer",
                      "comment": "LIN波特率",
                      "minimum": 1000,
                      "maximum": 20000
                    },
                    "DataLen": {
                      "type": "integer",
                      "comment": "LIN数据长度",
                      "minimum": 1,
                      "maximum": 8
                    }
                  }
                }
              }
            },
            "DI": {
              "type": "object",
              "comment": "DI配置",
              "nickname": "DI配置",
              "properties": {
                "DI0": {
                  "type": "object",
                  "comment": "DI配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "DI功能",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Interval": {
                      "type": "integer",
                      "comment": "DI记录间隔(ms)，DI功能为输入时有效",
                      "enum": [
                        1,
                        2,
                        5,
                        10,
                        20,
                        50,
                        100,
                        200,
                        500,
                        1000
                      ]
                    }
                  }
                }
              }
            },
            "DO": {
              "type": "object",
              "comment": "DO配置",
              "nickname": "DO配置",
              "properties": {
                "DO0": {
                  "type": "object",
                  "comment": "DO配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "告警条件，1：记录满，2：总线错误，3：存储状态异常，4：GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Output": {
                      "type": "integer",
                      "comment": "DO告警时输出值",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "DO告警GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "DO告警GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "DO告警GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "DO告警GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "RecCfg": {
              "type": "object",
              "comment": "CANDTU记录配置",
              "nickname": "CANDTU记录配置",
              "properties": {
                "RecFullHdl": {
                  "type": "integer",
                  "comment": "存储空间满处理(0:循环记录/1：停止记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecFSize": {
                  "type": "integer",
                  "comment": "最大记录文件大小(MB)",
                  "minimum": 2,
                  "maximum": 512
                },
                "RecErr": {
                  "type": "integer",
                  "comment": "是否记录CAN错误帧(0:不记录/1：记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecMer": {
                  "type": "integer",
                  "comment": "通道记录数据是否合并(0：不合并/1:合并)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "TrgMode": {
              "type": "object",
              "comment": "CANDTU记录触发模式配置",
              "nickname": "CANDTU记录触发模式配置",
              "properties": {
                "RecMode": {
                  "type": "integer",
                  "comment": "CAN记录模式(0：长时间记录/1:条件记录/2：预触发记录/3：定时记录/4：不记录)",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                },
                "ConRec": {
                  "type": "object",
                  "comment": "条件记录配置对象",
                  "properties": {
                    "StartChn": {
                      "type": "integer",
                      "comment": "开始记录通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartExt": {
                      "type": "integer",
                      "comment": "开始记录帧类型（0：标准帧/1:扩展帧）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartOp": {
                      "type": "integer",
                      "comment": "开始记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StartIdS": {
                      "type": "integer",
                      "comment": "开始记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StartIdL": {
                      "type": "integer",
                      "comment": "开始记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopChn": {
                      "type": "integer",
                      "comment": "停止记录通道号,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopExt": {
                      "type": "integer",
                      "comment": "停止记录帧类型（0：标准帧/1:扩展帧),标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopOp": {
                      "type": "integer",
                      "comment": "停止记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StopIdS": {
                      "type": "integer",
                      "comment": "停止记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopIdL": {
                      "type": "integer",
                      "comment": "停止记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    }
                  }
                },
                "PreTrgRec": {
                  "type": "object",
                  "comment": "预触发记录配置对象",
                  "properties": {
                    "PreVal": {
                      "type": "integer",
                      "comment": "预触发记录帧数",
                      "minimum": 10,
                      "maximum": 100000
                    },
                    "PostVal": {
                      "type": "integer",
                      "comment": "触发后记录时间(ms)",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TrgNum": {
                      "type": "integer",
                      "comment": "触发条件数",
                      "minimum": 1,
                      "maximum": 512
                    },
                    "TrgCon": {
                      "type": "array",
                      "comment": "触发条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                },
                "TimRec": {
                  "type": "object",
                  "comment": "定时记录配置对象",
                  "properties": {
                    "Period": {
                      "type": "object",
                      "comment": "定时时间周期（ms）",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TmNDA": {
                      "type": "object",
                      "comment": "定时时间内无数据记录方式（0：不记录/1：保存最近一次数据/2：保存自定义数据）",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "TmNDAUD": {
                      "type": "string",
                      "comment": "定时时间内无记录保存的自定义数据（16进制保存为字符串）",
                      "minimum": 0,
                      "maximum": 16
                    },
                    "FltNum": {
                      "type": "integer",
                      "comment": "过滤条件数",
                      "minimum": 0,
                      "maximum": 256
                    },
                    "FltCon": {
                      "type": "array",
                      "comment": "过滤条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "Quota": {
              "type": "object",
              "comment": "存储空间分配",
              "nickname": "存储空间分配",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                }
              }
            },
            "GPSRec": {
              "type": "object",
              "comment": "GPS记录配置",
              "nickname": "GPS记录配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "GPS记录使能（1：使能/0：失能）",
                  "enum": [
                    0,
                    1
                  ]
                },
                "Type": {
                  "type": "integer",
                  "comment": "定位系统类型（0：自动选择/1：北斗/2：GPS）",
                  "enum": [
                    0,
                    1,
                    2
                  ]
                },
                "Period": {
                  "type": "integer",
                  "comment": "记录周期（s）",
                  "minimum": 1,
                  "maximum": 1800
                }
              }
            },
            "SMS": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "SMS0": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS1": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS2": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS3": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS4": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS5": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "Net": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "Net0": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net1": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net2": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                }
              }
            },
            "NetFlt": {
              "type": "object",
              "comment": "无线过滤配置",
              "nickname": "无线过滤配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "无线传输加密使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "FltNum": {
                  "type": "integer",
                  "comment": "触发条件数",
                  "minimum": 1,
                  "maximum": 256
                },
                "FltCon": {
                  "type": "array",
                  "comment": "触发条件列表",
                  "minItems": 1,
                  "maxItems": 256,
                  "items": {
                    "type": "object",
                    "properties": {
                      "Chn": {
                        "type": "integer",
                        "comment": "通道号",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Type": {
                        "type": "integer",
                        "comment": "过滤记录类型（0：ID滤波/1：时间段滤波）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Op": {
                        "type": "integer",
                        "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ]
                      },
                      "Ext": {
                        "type": "integer",
                        "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "IdS": {
                        "type": "integer",
                        "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      },
                      "IdL": {
                        "type": "integer",
                        "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      }
                    }
                  }
                }
              }
            },
            "NetGen": {
              "type": "object",
              "comment": "无线通用配置",
              "nickname": "无线通用配置",
              "properties": {
                "Times": {
                  "type": "integer",
                  "comment": "断网续传次数",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                },
                "Proto": {
                  "type": "integer",
                  "comment": "加密协议编号",
                  "enum": [
                    0,
                    1
                  ]
                },
                "SendIdEn": {
                  "type": "integer",
                  "comment": "网络数据携带设备ID和绝对时间戳使能",
                  "enum": [
                    0,
                    1
                  ]
                },
                "NetLogEn": {
                  "type": "integer",
                  "comment": "网络调试日志使能",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "IotEn": {
              "type": "object",
              "comment": "实时数据上传使能",
              "nickname": "实时数据上传使能",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            }
          }
        },
        "SDStat": {
          "comment": "SD卡状态,0-SD卡未插入，1-SD卡插入，2-设备记录中，-1-设备无SD卡",
          "nickname": "SD卡状态",
          "type": "number",
          "format": "int",
          "enum": [
            0,
            1,
            2,
            -1
          ]
        },
        "FwVer": {
          "comment": "固件版本号, 如：V1.00",
          "nickname": "固件版本号",
          "type": "string"
        },
        "HwVer": {
          "comment": "硬件版本号, 如：V1.00",
          "nickname": "硬件版本号",
          "type": "string"
        },
        "Serial": {
          "comment": "产品序列号, 8字符",
          "nickname": "产品序列号",
          "type": "string"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "StartRec": {
          "comment": "启动记录",
          "nickname": "启动记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "StopRec": {
          "comment": "停止记录",
          "nickname": "停止记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "ClrDev": {
          "comment": "清空设备",
          "nickname": "清空设备",
          "cmdtype": true,
          "show_frontend": true
        },
        "GetRecFileInfo": {
          "comment": "获取文件列表信息",
          "nickname": "获取文件列表",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "StartTime": {
              "comment": "起始时间戳",
              "nickname": "起始时间戳",
              "type": "number",
              "format": "int"
            },
            "StopTime": {
              "comment": "结束时间戳",
              "nickname": "结束时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "GetRecFile": {
          "comment": "获取记录文件",
          "nickname": "获取记录文件",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "Name": {
              "comment": "文件名",
              "nickname": "文件名",
              "type": "string"
            },
            "Offset": {
              "comment": "文件偏移",
              "nickname": "文件偏移",
              "type": "number",
              "format": "int"
            },
            "Tag": {
              "comment": "本次传输文件标签",
              "nickname": "文件标签",
              "type": "number",
              "format": "int"
            }
          }
        },
        "CancelGetRec": {
          "comment": "取消传输",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型",
              "nickname": "数据类型",
              "type": "number",
              "format": "int"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "RecFull": {
          "comment": "记录满",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        }
      },
      "errors": {
        "err": {
          "comment": "CAN总线错误",
          "args": {
            "chn": {
              "comment": "CAN错误通道",
              "type": "number",
              "format": "int"
            },
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "err_code": {
              "comment": "错误码",
              "type": "number",
              "format": "int"
            }
          }
        },
        "storge_err": {
          "comment": "存储状态异常",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "gps_err": {
          "comment": "GPS不在指定GPS区域",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "type": {
              "comment": "告警类型：1：短信通知设置的告警，2：DO输出设置的告警",
              "type": "number",
              "format": "int"
            },
            "longitude": {
              "comment": "经度",
              "type": "number",
              "format": "float"
            },
            "latitude": {
              "comment": "纬度",
              "type": "number",
              "format": "float"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1,
          "num": -1
        },
        "options": {
          "unique": true
        }
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "891f0000-daa5-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568874011,
    "devtypeid": "5d831e1bb137e885bb9fb619",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/CANDTU200"
  },
  {
    "devtype": "demo",
    "basetype": "demo",
    "enable_secret": false,
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "temp": {
          "comment": "温度",
          "format": "float",
          "type": "number"
        }
      },
      "status": {
        "sw_version": {
          "comment": "software version",
          "format": "float",
          "type": "number"
        },
        "settings": {
          "comment": "settings",
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "age": {
              "description": "Age in years",
              "type": "integer",
              "minimum": 0
            }
          },
          "required": [
            "firstName",
            "lastName"
          ]
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set_report_interval": {
          "comment": "设置上报温度时间间隔",
          "cmdtype": true,
          "args": {
            "value": {
              "type": "number",
              "format": "int",
              "comment": "单位为秒。"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "temperature_normal": {
          "comment": "工作温度正常",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.046875,
    "devices_size": 0.10546875,
    "event_size": 0.046875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1568860339,
    "comment": "sksjdj",
    "devtypeid": "5d82e8b3b137e81bcb9e1fb3",
    "devices": {
      "count": 4
    },
    "uri": "/v1/devices/devtype/demo"
  },
  {
    "devtype": "zlg001linkwan",
    "basetype": "demo",
    "comment": "LinkWan手持网络分析仪",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "pictureId": {
          "format": "name",
          "comment": "图片id",
          "type": "string"
        },
        "pointId": {
          "format": "name",
          "comment": "点id",
          "type": "string"
        },
        "testLevel": {
          "format": "name",
          "comment": "test等级",
          "type": "number"
        },
        "pointName": {
          "format": "name",
          "comment": "名称",
          "type": "string"
        },
        "testSetting": {
          "format": "json",
          "comment": "test设置",
          "type": "object"
        },
        "pointType": {
          "format": "name",
          "comment": "点类型",
          "type": "string"
        },
        "position": {
          "format": "json",
          "comment": "坐标",
          "type": "object"
        },
        "testResult": {
          "format": "json",
          "comment": "test结果",
          "type": "object"
        }
      },
      "status": {
        "deviceType": {
          "comment": "设备类型",
          "type": "string"
        },
        "sendByte": {
          "comment": "发送字节数",
          "type": "number"
        },
        "antennaGain": {
          "comment": "天线增益",
          "type": "number"
        },
        "dr": {
          "comment": "发送速率",
          "type": "number"
        },
        "deveui": {
          "comment": "设备唯一识别码",
          "type": "string"
        },
        "mode": {
          "comment": "入网方式",
          "type": "string"
        },
        "freqtype": {
          "comment": "频段模式",
          "type": "number"
        },
        "appskey": {
          "comment": "ABP模式下的应用密钥",
          "type": "string"
        },
        "nwkskey": {
          "comment": "ABP模式下的网络密钥",
          "type": "string"
        },
        "bandmask": {
          "comment": "使用频段",
          "type": "string"
        },
        "devname": {
          "comment": "设备名",
          "type": "string"
        },
        "appkey": {
          "comment": "应用密钥",
          "type": "string"
        },
        "power": {
          "comment": "发送功率",
          "type": "number"
        },
        "appeui": {
          "comment": "应用唯一识别码",
          "type": "string"
        },
        "addr": {
          "comment": "ABP模式下的设备地址",
          "type": "string"
        },
        "class": {
          "comment": "设备类型",
          "type": "string"
        }
      },
      "commands": {
        "set_report_interval": {
          "comment": "设置上报温度时间间隔",
          "cmdtype": true,
          "args": {
            "value": {
              "type": "number",
              "format": "int",
              "comment": "单位为秒。"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "temperature_normal": {
          "comment": "工作温度正常",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "e895e7a0-da83-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568859568,
    "devtypeid": "5d82e5b0b137e80a369e08d4",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/zlg001linkwan"
  },
  {
    "devtype": "zlg001lorawan",
    "basetype": "demo",
    "comment": "LoRaWan手持网络分析仪",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "pictureId": {
          "format": "name",
          "comment": "图片id",
          "type": "string"
        },
        "pointId": {
          "format": "name",
          "comment": "点id",
          "type": "string"
        },
        "testLevel": {
          "format": "name",
          "comment": "test等级",
          "type": "number"
        },
        "pointName": {
          "format": "name",
          "comment": "名称",
          "type": "string"
        },
        "testSetting": {
          "format": "json",
          "comment": "test设置",
          "type": "object"
        },
        "pointType": {
          "format": "name",
          "comment": "点类型",
          "type": "string"
        },
        "position": {
          "format": "json",
          "comment": "坐标",
          "type": "object"
        },
        "testResult": {
          "format": "json",
          "comment": "test结果",
          "type": "object"
        }
      },
      "status": {
        "deviceType": {
          "comment": "设备类型",
          "type": "string"
        },
        "sendByte": {
          "comment": "发送字节数",
          "type": "number"
        },
        "antennaGain": {
          "comment": "天线增益",
          "type": "number"
        },
        "dr": {
          "comment": "发送速率",
          "type": "number"
        },
        "deveui": {
          "comment": "设备唯一识别码",
          "type": "string"
        },
        "mode": {
          "comment": "入网方式",
          "type": "string"
        },
        "LRCHMASK": {
          "comment": "上行频点",
          "type": "string"
        },
        "appskey": {
          "comment": "ABP模式下的应用密钥",
          "type": "string"
        },
        "nwkskey": {
          "comment": "ABP模式下的网络密钥",
          "type": "string"
        },
        "devname": {
          "comment": "设备名",
          "type": "string"
        },
        "appkey": {
          "comment": "应用密钥",
          "type": "string"
        },
        "band": {
          "comment": "使用频段",
          "type": "string"
        },
        "power": {
          "comment": "发送功率",
          "type": "number"
        },
        "appeui": {
          "comment": "应用唯一识别码",
          "type": "string"
        },
        "addr": {
          "comment": "ABP模式下的设备地址",
          "type": "string"
        },
        "class": {
          "comment": "设备类型",
          "type": "string"
        }
      },
      "commands": {
        "set_report_interval": {
          "comment": "设置上报温度时间间隔",
          "cmdtype": true,
          "args": {
            "value": {
              "type": "number",
              "format": "int",
              "comment": "单位为秒。"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "temperature_normal": {
          "comment": "工作温度正常",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.0234375,
    "devices_size": 0.10546875,
    "event_size": 0.0234375,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "e896f910-da83-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568859568,
    "devtypeid": "5d82e5b0b137e85aeb9e08d5",
    "devices": {
      "count": 2
    },
    "uri": "/v1/devices/devtype/zlg001lorawan"
  },
  {
    "devtype": "zlg001zigbee",
    "basetype": "demo",
    "comment": "ZigBee手持网络分析仪",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "pictureId": {
          "format": "name",
          "comment": "图片id",
          "type": "string"
        },
        "pointId": {
          "format": "name",
          "comment": "点id",
          "type": "string"
        },
        "testLevel": {
          "format": "name",
          "comment": "test等级",
          "type": "number"
        },
        "pointName": {
          "format": "name",
          "comment": "名称",
          "type": "string"
        },
        "testSetting": {
          "format": "json",
          "comment": "test设置",
          "type": "object"
        },
        "pointType": {
          "format": "name",
          "comment": "点类型",
          "type": "string"
        },
        "position": {
          "format": "json",
          "comment": "坐标",
          "type": "object"
        },
        "testResult": {
          "format": "json",
          "comment": "test结果",
          "type": "object"
        }
      },
      "status": {
        "deviceType": {
          "comment": "设备类型",
          "type": "string"
        },
        "panId": {
          "comment": "设备网络号",
          "type": "string"
        },
        "dstIEEE": {
          "comment": "目标MAC地址",
          "type": "string"
        },
        "devType": {
          "comment": "zigbee设备类型",
          "type": "string"
        },
        "addr_type": {
          "comment": "目标地址类型",
          "type": "number"
        },
        "myAddr": {
          "comment": "本地网络地址",
          "type": "string"
        },
        "dstAddr": {
          "comment": "目标网络地址",
          "type": "string"
        },
        "antennaGain": {
          "comment": "天线增益",
          "type": "string"
        },
        "devname": {
          "comment": "设备名",
          "type": "string"
        },
        "powerLevel": {
          "comment": "发送功率",
          "type": "string"
        },
        "chan": {
          "comment": "设备通道号",
          "type": "string"
        },
        "moduleKey": {
          "comment": "设备密钥",
          "type": "string"
        }
      },
      "commands": {
        "set_report_interval": {
          "comment": "设置上报温度时间间隔",
          "cmdtype": true,
          "args": {
            "value": {
              "type": "number",
              "format": "int",
              "comment": "单位为秒。"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "temperature_normal": {
          "comment": "工作温度正常",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.05859375,
    "devices_size": 0.10546875,
    "event_size": 0.03515625,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "e8987fb0-da83-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568859568,
    "devtypeid": "5d82e5b0b137e827dc9e08d6",
    "devices": {
      "count": 3
    },
    "uri": "/v1/devices/devtype/zlg001zigbee"
  },
  {
    "devtype": "sasdasdA",
    "basetype": "candtu-200",
    "comment": "s2222",
    "schema": {
      "memo": {
        "desc": {
          "comment": "两路CAN-bus数据记录仪",
          "maxLength": 1024,
          "type": "string"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 31,
          "minLength": 1,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "time": {
          "nickname": "时间",
          "format": "float",
          "type": "number"
        },
        "id": {
          "nickname": "CAN帧ID",
          "format": "float",
          "type": "number"
        },
        "flag": {
          "nickname": "报文标志",
          "format": "float",
          "type": "number"
        },
        "ch": {
          "nickname": "通道",
          "format": "float",
          "type": "number"
        },
        "len": {
          "nickname": "数据长度",
          "format": "float",
          "type": "number"
        },
        "data": {
          "nickname": "数据内容",
          "type": "object"
        }
      },
      "status": {
        "devname": {
          "comment": "设备名, ASCII字符, 最长31个字符",
          "nickname": "设备名",
          "type": "string",
          "minimum": 1,
          "maximum": 31
        },
        "model": {
          "comment": "设备型号",
          "nickname": "设备型号",
          "type": "string",
          "enums": [
            "CANDTU-200UWG",
            "CANDTU-200UWGR",
            "CANDTU-200UWGR-B"
          ]
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "nickname": "GPS信息时间戳"
            }
          }
        },
        "CfgInfo": {
          "comment": "CANDTU配置",
          "type": "object",
          "nickname": "CANDTU配置",
          "properties": {
            "CAN": {
              "type": "object",
              "comment": "CAN配置",
              "nickname": "CAN配置",
              "properties": {
                "CAN0": {
                  "type": "object",
                  "comment": "CAN0配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                },
                "CAN1": {
                  "type": "object",
                  "comment": "CAN1配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                }
              }
            },
            "LIN": {
              "type": "object",
              "comment": "LIN配置",
              "nickname": "LIN配置",
              "properties": {
                "LIN0": {
                  "type": "object",
                  "comment": "LIN配置",
                  "nickname": "LIN配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Baud": {
                      "type": "integer",
                      "comment": "LIN波特率",
                      "minimum": 1000,
                      "maximum": 20000
                    },
                    "DataLen": {
                      "type": "integer",
                      "comment": "LIN数据长度",
                      "minimum": 1,
                      "maximum": 8
                    }
                  }
                }
              }
            },
            "DI": {
              "type": "object",
              "comment": "DI配置",
              "nickname": "DI配置",
              "properties": {
                "DI0": {
                  "type": "object",
                  "comment": "DI配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "DI功能",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Interval": {
                      "type": "integer",
                      "comment": "DI记录间隔(ms)，DI功能为输入时有效",
                      "enum": [
                        1,
                        2,
                        5,
                        10,
                        20,
                        50,
                        100,
                        200,
                        500,
                        1000
                      ]
                    }
                  }
                }
              }
            },
            "DO": {
              "type": "object",
              "comment": "DO配置",
              "nickname": "DO配置",
              "properties": {
                "DO0": {
                  "type": "object",
                  "comment": "DO配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "告警条件，1：记录满，2：总线错误，3：存储状态异常，4：GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Output": {
                      "type": "integer",
                      "comment": "DO告警时输出值",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "DO告警GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "DO告警GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "DO告警GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "DO告警GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "RecCfg": {
              "type": "object",
              "comment": "CANDTU记录配置",
              "nickname": "CANDTU记录配置",
              "properties": {
                "RecFullHdl": {
                  "type": "integer",
                  "comment": "存储空间满处理(0:循环记录/1：停止记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecFSize": {
                  "type": "integer",
                  "comment": "最大记录文件大小(MB)",
                  "minimum": 2,
                  "maximum": 512
                },
                "RecErr": {
                  "type": "integer",
                  "comment": "是否记录CAN错误帧(0:不记录/1：记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecMer": {
                  "type": "integer",
                  "comment": "通道记录数据是否合并(0：不合并/1:合并)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "TrgMode": {
              "type": "object",
              "comment": "CANDTU记录触发模式配置",
              "nickname": "CANDTU记录触发模式配置",
              "properties": {
                "RecMode": {
                  "type": "integer",
                  "comment": "CAN记录模式(0：长时间记录/1:条件记录/2：预触发记录/3：定时记录/4：不记录)",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                },
                "ConRec": {
                  "type": "object",
                  "comment": "条件记录配置对象",
                  "properties": {
                    "StartChn": {
                      "type": "integer",
                      "comment": "开始记录通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartExt": {
                      "type": "integer",
                      "comment": "开始记录帧类型（0：标准帧/1:扩展帧）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartOp": {
                      "type": "integer",
                      "comment": "开始记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StartIdS": {
                      "type": "integer",
                      "comment": "开始记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StartIdL": {
                      "type": "integer",
                      "comment": "开始记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopChn": {
                      "type": "integer",
                      "comment": "停止记录通道号,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopExt": {
                      "type": "integer",
                      "comment": "停止记录帧类型（0：标准帧/1:扩展帧),标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopOp": {
                      "type": "integer",
                      "comment": "停止记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StopIdS": {
                      "type": "integer",
                      "comment": "停止记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopIdL": {
                      "type": "integer",
                      "comment": "停止记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    }
                  }
                },
                "PreTrgRec": {
                  "type": "object",
                  "comment": "预触发记录配置对象",
                  "properties": {
                    "PreVal": {
                      "type": "integer",
                      "comment": "预触发记录帧数",
                      "minimum": 10,
                      "maximum": 100000
                    },
                    "PostVal": {
                      "type": "integer",
                      "comment": "触发后记录时间(ms)",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TrgNum": {
                      "type": "integer",
                      "comment": "触发条件数",
                      "minimum": 1,
                      "maximum": 512
                    },
                    "TrgCon": {
                      "type": "array",
                      "comment": "触发条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                },
                "TimRec": {
                  "type": "object",
                  "comment": "定时记录配置对象",
                  "properties": {
                    "Period": {
                      "type": "object",
                      "comment": "定时时间周期（ms）",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TmNDA": {
                      "type": "object",
                      "comment": "定时时间内无数据记录方式（0：不记录/1：保存最近一次数据/2：保存自定义数据）",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "TmNDAUD": {
                      "type": "string",
                      "comment": "定时时间内无记录保存的自定义数据（16进制保存为字符串）",
                      "minimum": 0,
                      "maximum": 16
                    },
                    "FltNum": {
                      "type": "integer",
                      "comment": "过滤条件数",
                      "minimum": 0,
                      "maximum": 256
                    },
                    "FltCon": {
                      "type": "array",
                      "comment": "过滤条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "Quota": {
              "type": "object",
              "comment": "存储空间分配",
              "nickname": "存储空间分配",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                }
              }
            },
            "GPSRec": {
              "type": "object",
              "comment": "GPS记录配置",
              "nickname": "GPS记录配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "GPS记录使能（1：使能/0：失能）",
                  "enum": [
                    0,
                    1
                  ]
                },
                "Type": {
                  "type": "integer",
                  "comment": "定位系统类型（0：自动选择/1：北斗/2：GPS）",
                  "enum": [
                    0,
                    1,
                    2
                  ]
                },
                "Period": {
                  "type": "integer",
                  "comment": "记录周期（s）",
                  "minimum": 1,
                  "maximum": 1800
                }
              }
            },
            "SMS": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "SMS0": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS1": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS2": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS3": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS4": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS5": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "Net": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "Net0": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net1": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net2": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                }
              }
            },
            "NetFlt": {
              "type": "object",
              "comment": "无线过滤配置",
              "nickname": "无线过滤配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "无线传输加密使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "FltNum": {
                  "type": "integer",
                  "comment": "触发条件数",
                  "minimum": 1,
                  "maximum": 256
                },
                "FltCon": {
                  "type": "array",
                  "comment": "触发条件列表",
                  "minItems": 1,
                  "maxItems": 256,
                  "items": {
                    "type": "object",
                    "properties": {
                      "Chn": {
                        "type": "integer",
                        "comment": "通道号",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Type": {
                        "type": "integer",
                        "comment": "过滤记录类型（0：ID滤波/1：时间段滤波）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Op": {
                        "type": "integer",
                        "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ]
                      },
                      "Ext": {
                        "type": "integer",
                        "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "IdS": {
                        "type": "integer",
                        "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      },
                      "IdL": {
                        "type": "integer",
                        "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      }
                    }
                  }
                }
              }
            },
            "NetGen": {
              "type": "object",
              "comment": "无线通用配置",
              "nickname": "无线通用配置",
              "properties": {
                "Times": {
                  "type": "integer",
                  "comment": "断网续传次数",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                },
                "Proto": {
                  "type": "integer",
                  "comment": "加密协议编号",
                  "enum": [
                    0,
                    1
                  ]
                },
                "SendIdEn": {
                  "type": "integer",
                  "comment": "网络数据携带设备ID和绝对时间戳使能",
                  "enum": [
                    0,
                    1
                  ]
                },
                "NetLogEn": {
                  "type": "integer",
                  "comment": "网络调试日志使能",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "IotEn": {
              "type": "object",
              "comment": "实时数据上传使能",
              "nickname": "实时数据上传使能",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            }
          }
        },
        "SDStat": {
          "comment": "SD卡状态,0-SD卡未插入，1-SD卡插入，2-设备记录中，-1-设备无SD卡",
          "nickname": "SD卡状态",
          "type": "number",
          "format": "int",
          "enum": [
            0,
            1,
            2,
            -1
          ]
        },
        "FwVer": {
          "comment": "固件版本号, 如：V1.00",
          "nickname": "固件版本号",
          "type": "string"
        },
        "HwVer": {
          "comment": "硬件版本号, 如：V1.00",
          "nickname": "硬件版本号",
          "type": "string"
        },
        "Serial": {
          "comment": "产品序列号, 8字符",
          "nickname": "产品序列号",
          "type": "string"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "StartRec": {
          "comment": "启动记录",
          "nickname": "启动记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "StopRec": {
          "comment": "停止记录",
          "nickname": "停止记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "ClrDev": {
          "comment": "清空设备",
          "nickname": "清空设备",
          "cmdtype": true,
          "show_frontend": true
        },
        "GetRecFileInfo": {
          "comment": "获取文件列表信息",
          "nickname": "获取文件列表",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "StartTime": {
              "comment": "起始时间戳",
              "nickname": "起始时间戳",
              "type": "number",
              "format": "int"
            },
            "StopTime": {
              "comment": "结束时间戳",
              "nickname": "结束时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "GetRecFile": {
          "comment": "获取记录文件",
          "nickname": "获取记录文件",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "Name": {
              "comment": "文件名",
              "nickname": "文件名",
              "type": "string"
            },
            "Offset": {
              "comment": "文件偏移",
              "nickname": "文件偏移",
              "type": "number",
              "format": "int"
            },
            "Tag": {
              "comment": "本次传输文件标签",
              "nickname": "文件标签",
              "type": "number",
              "format": "int"
            }
          }
        },
        "CancelGetRec": {
          "comment": "取消传输",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型",
              "nickname": "数据类型",
              "type": "number",
              "format": "int"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "RecFull": {
          "comment": "记录满",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        }
      },
      "errors": {
        "err": {
          "comment": "CAN总线错误",
          "args": {
            "chn": {
              "comment": "CAN错误通道",
              "type": "number",
              "format": "int"
            },
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "err_code": {
              "comment": "错误码",
              "type": "number",
              "format": "int"
            }
          }
        },
        "storge_err": {
          "comment": "存储状态异常",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "gps_err": {
          "comment": "GPS不在指定GPS区域",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "type": {
              "comment": "告警类型：1：短信通知设置的告警，2：DO输出设置的告警",
              "type": "number",
              "format": "int"
            },
            "longitude": {
              "comment": "经度",
              "type": "number",
              "format": "float"
            },
            "latitude": {
              "comment": "纬度",
              "type": "number",
              "format": "float"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1,
          "num": -1
        },
        "options": {
          "unique": true
        }
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "108bce80-d9fa-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568800365,
    "devtypeid": "5d81fe6db137e83b3a97fd28",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/sasdasdA"
  },
  {
    "devtype": "ClassB_",
    "basetype": "LoRaWAN_CLASSB_OTAA",
    "comment": "",
    "lora_deviceprofile_id": "2d2fac91-00ad-4417-b5f3-064e629a66bf",
    "schema": {
      "memo": {
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 16,
          "maxLength": 16,
          "comment": "lorawan设备id，8字节16进制字符串"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 2,
          "max": 2,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "mqttadapter": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "required": true,
          "comment": "loraserver mqtt转换为何种zlgcloud mqtt：转为STR_TOPIC_REPORT_RAW(0)，转为STR_TOPIC_REPORT_DATA(1);请根据需要设置min=max=0，或min=max=1"
        },
        "appKey": {
          "type": "string",
          "minLength": 32,
          "maxLength": 32,
          "comment": "OTAA使用的appKey,16字节16进制字符串"
        },
        "nwkKey": {
          "type": "string",
          "minLength": 32,
          "maxLength": 32,
          "required": true,
          "comment": "OTAA使用的nwkKey,16字节16进制字符串"
        },
        "appEUI": {
          "type": "string",
          "minLength": 16,
          "maxLength": 16,
          "required": true,
          "comment": "OTAA使用的appEUI,8字节16进制字符串"
        },
        "skipFCntCheck": {
          "type": "boolean",
          "comment": "默认为true"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {
        "deviceProfile": {
          "classBTimeout": 2,
          "classCTimeout": 0,
          "factoryPresetFreqs": [
            0
          ],
          "id": "",
          "macVersion": "1.0.1",
          "maxDutyCycle": 0,
          "maxEIRP": 0,
          "name": "zlg001_ClassB_",
          "networkServerID": "",
          "organizationID": "",
          "pingSlotDR": 5,
          "pingSlotFreq": 0,
          "pingSlotPeriod": 256,
          "regParamsRevision": "A",
          "rfRegion": "CN_470_510",
          "rxDROffset1": 0,
          "rxDataRate2": 0,
          "rxDelay1": 1,
          "rxFreq2": 505300000,
          "supports32BitFCnt": true,
          "supportsClassB": true,
          "supportsClassC": false,
          "supportsJoin": true
        }
      },
      "data": {
        "raw": {
          "comment": "数据",
          "nickname": "数据",
          "type": "string"
        },
        "loraserver": {
          "comment": "数据属性",
          "nickname": "数据属性",
          "type": "string"
        }
      },
      "status": {
        "appKey": {
          "comment": "应用秘钥",
          "nickname": "应用秘钥",
          "minLength": 32,
          "maxLength": 32,
          "readonly": true,
          "type": "string"
        },
        "appEUI": {
          "comment": "应用appEUI",
          "nickname": "应用appEUI",
          "minLength": 16,
          "maxLength": 16,
          "readonly": true,
          "type": "string"
        },
        "power": {
          "comment": "电量",
          "nickname": "电量",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set": {
          "comment": "set prop",
          "nickname": "设置属性",
          "cmdtype": true,
          "args": {
            "name": {
              "format": "name",
              "type": "string",
              "nickname": "设置属性名"
            },
            "value": {
              "type": "string",
              "nickname": "设置属性值"
            }
          }
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "hex",
                "ascii",
                "base64"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            },
            "fPort": {
              "required": true,
              "type": "number",
              "max": 223,
              "min": 1,
              "comment": "端口号",
              "nickname": "端口号"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        }
      },
      "warnings": {
        "power_low": {
          "comment": "电量低",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "power_too_low": {
          "comment": "电量过低",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "type": "number",
              "format": "int"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.046875,
    "devices_size": 0.10546875,
    "event_size": 0.046875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 2,
    "enable_secret": false,
    "dtype_secret": "77909b40-d9e3-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568790659,
    "devtypeid": "5d81d883b137e8f1909709d2",
    "devices": {
      "count": 4
    },
    "uri": "/v1/devices/devtype/ClassB_"
  },
  {
    "devtype": "invert",
    "basetype": "invert",
    "enable_secret": false,
    "schema": {
      "memo": {
        "desc": {
          "comment": "一代机三相机",
          "maxLength": 1024,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "total_energy": {
          "comment": "总发电量",
          "nickname": "总发电量",
          "unit": "kWh",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "today_energy": {
          "comment": "当天发电量",
          "nickname": "当天发电量",
          "unit": "kWh",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "temperature": {
          "comment": "逆变器温度",
          "nickname": "逆变器温度",
          "format": "float",
          "type": "number",
          "unit": "℃",
          "min": 0,
          "max": 150
        },
        "gfci": {
          "comment": "对地漏电流",
          "nickname": "对地漏电流",
          "format": "float",
          "type": "number",
          "unit": "mA",
          "min": 0,
          "max": 150
        },
        "bus_volt": {
          "comment": "BUS电压",
          "nickname": "BUS电压",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 150
        },
        "power": {
          "comment": "输出有功功率",
          "nickname": "输出有功功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 6000
        },
        "q_power": {
          "comment": "逆变器输出无功功率",
          "nickname": "输出无功功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 1000
        },
        "pf": {
          "comment": "逆变器输出功率因数",
          "nickname": "输出功率因数",
          "format": "float",
          "type": "number",
          "unit": "",
          "min": 0,
          "max": 1
        },
        "pv1_volt": {
          "comment": "直流输入电压pv1",
          "nickname": "直流输入电压pv1",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv1_curr": {
          "comment": "直流输入电流pv1",
          "nickname": "直流输入电流pv1",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "pv2_volt": {
          "comment": "直流输入电压pv2",
          "nickname": "直流输入电压pv2",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv2_curr": {
          "comment": "直流输入电流pv2",
          "nickname": "直流输入电流pv2",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "pv3_volt": {
          "comment": "直流输入电压pv3",
          "nickname": "直流输入电压pv3",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv3_curr": {
          "comment": "直流输入电流pv3",
          "nickname": "直流输入电流pv3",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "l1_volt": {
          "comment": "交流输出L1相电压",
          "nickname": "交流输出L1相电压",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "l1_curr": {
          "comment": "交流输出L1相电流",
          "nickname": "交流输出L1相电流",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 220
        },
        "l1_freq": {
          "comment": "交流输出L1相频率",
          "nickname": "交流输出L1相频率",
          "format": "float",
          "type": "number",
          "unit": "Hz",
          "min": 0,
          "max": 400
        },
        "l1_dci": {
          "comment": "交流输出L1相直流分量",
          "nickname": "交流输出L1相直流分量",
          "format": "float",
          "type": "number",
          "unit": "mA",
          "min": 0,
          "max": 1000
        },
        "l1_power": {
          "comment": "交流输出L1相功率",
          "nickname": "交流输出L1相功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 10000
        },
        "l1_pf": {
          "comment": "交流输出L1相功率因数",
          "nickname": "交流输出L1相功率因数",
          "format": "float",
          "type": "number",
          "unit": "",
          "min": 0,
          "max": 1
        }
      },
      "status": {
        "sw_ver1": {
          "comment": "software version1",
          "nickname": "软件版本1",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "sw_ver2": {
          "comment": "software version2",
          "nickname": "软件版本2",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "safety_spec": {
          "comment": "安规",
          "nickname": "安规",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "total_runtime": {
          "comment": "总运行时间",
          "nickname": "总运行时间",
          "unit": "H",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "today_runtime": {
          "comment": "当天运行时间",
          "nickname": "当天运行时间",
          "unit": "H",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set": {
          "comment": "set prop",
          "nickname": "属性设置",
          "cmdtype": true,
          "args": {
            "name": {
              "format": "name",
              "nickname": "属性名",
              "type": "string"
            },
            "value": {
              "nickname": "属性值",
              "type": "string"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.0703125,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1568777278,
    "comment": "ssss",
    "devtypeid": "5d81a43eb137e81cc595615e",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/invert"
  },
  {
    "devtype": "zggw",
    "basetype": "zggw",
    "enable_secret": false,
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 1,
          "max": 1,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2)，LoraWan网关(3);此处必须为3，即LoraWan网关"
        },
        "desc": {
          "comment": "通用网关",
          "maxLength": 1024,
          "type": "string"
        },
        "node_gw_bydata": {
          "comment": "网关字段",
          "type": "boolean",
          "default": true
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {},
      "status": {
        "mac": {
          "comment": "网关的mac地址",
          "type": "string",
          "properties": {}
        },
        "time": {
          "comment": "网关当前的时间",
          "unit": "ms",
          "min": 0,
          "type": "number",
          "format": "float",
          "minLength": 0,
          "properties": {}
        },
        "rxnb": {
          "comment": "网关接受的包数量",
          "min": 0,
          "type": "number",
          "format": "float",
          "minLength": 0,
          "properties": {}
        },
        "txnb": {
          "comment": "网关发送的包数量",
          "min": 0,
          "type": "number",
          "format": "float",
          "minLength": 0,
          "properties": {}
        },
        "NodeCnt": {
          "comment": "网关挂载的节点数量",
          "min": 0,
          "type": "number",
          "format": "float",
          "minLength": 0,
          "properties": {}
        },
        "maxNodeCnt": {
          "comment": "网关可挂载的最大节点数量",
          "min": 0,
          "max": 5000,
          "type": "number",
          "format": "float",
          "maxLength": 5000,
          "minLength": 0,
          "properties": {}
        },
        "clientip": {
          "comment": "client ip",
          "type": "string",
          "maxLength": 32,
          "properties": {}
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "type": "string",
              "required": true,
              "properties": ""
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "required": true,
              "enums": [
                0,
                1
              ],
              "properties": ""
            },
            "devtype": {
              "comment": "设备型号",
              "type": "string",
              "properties": ""
            },
            "version": {
              "comment": "新固件版本",
              "type": "string",
              "properties": ""
            },
            "url": {
              "comment": "新固件地址",
              "type": "string",
              "properties": ""
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "properties": ""
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "properties": ""
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "properties": ""
            }
          }
        },
        "fault": {
          "comment": "fault",
          "type": "number",
          "format": "int",
          "properties": {}
        }
      },
      "commands": {
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "required": true,
              "type": "string"
            },
            "version": {
              "required": true,
              "type": "string"
            },
            "url": {
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "required": true,
              "type": "string"
            },
            "version": {
              "required": true,
              "type": "string"
            },
            "url": {
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据"
            }
          }
        }
      },
      "warnings": {},
      "errors": {},
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "args": {
            "info": {
              "comment": "日志信息",
              "type": "string"
            },
            "level": {
              "comment": "日志等级",
              "type": "number"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": true,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.01171875,
    "devices_size": 0.06640625,
    "event_size": 0.01171875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 1,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1567647223,
    "comment": "asdasdasdasdasdasddsasdasd",
    "devtypeid": "5d7065f7d2de0bf872f23562",
    "devices": {
      "count": 1
    },
    "uri": "/v1/devices/devtype/zggw"
  },
  {
    "devtype": "zlg001_devtype_invert",
    "basetype": "invert",
    "schema": {
      "memo": {
        "desc": {
          "comment": "一代机三相机",
          "maxLength": 1024,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "testD": {
          "nickname": "",
          "comment": "",
          "unit": "",
          "min": 0,
          "max": 0,
          "type": "number",
          "format": "int"
        },
        "raw": {
          "nickname": "",
          "comment": "",
          "unit": "",
          "minLength": 0,
          "maxLength": 0,
          "type": "string"
        },
        "test": {
          "nickname": "test",
          "comment": "tes",
          "unit": "",
          "min": 0,
          "max": 0,
          "type": "number",
          "format": "int"
        },
        "total_energy": {
          "comment": "总发电量",
          "unit": "kWh",
          "min": 0,
          "format": "float",
          "type": "number",
          "nickname": "总电量"
        },
        "today_energy": {
          "comment": "当天发电量",
          "unit": "kWh",
          "min": 0,
          "format": "float",
          "type": "number",
          "nickname": "今日发电量"
        },
        "temperature": {
          "comment": "逆变器温度",
          "format": "float",
          "type": "number",
          "unit": "℃",
          "min": 0,
          "max": 150,
          "nickname": "温度"
        },
        "gfci": {
          "comment": "对地漏电流",
          "format": "float",
          "type": "number",
          "unit": "mA",
          "min": 0,
          "max": 150
        },
        "bus_volt": {
          "comment": "BUS电压",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 150,
          "nickname": "电压"
        },
        "power": {
          "comment": "逆变器输出有功功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 6000,
          "nickname": "功率"
        },
        "q_power": {
          "comment": "逆变器输出无功功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 1000
        },
        "pf": {
          "comment": "逆变器输出功率因数",
          "format": "float",
          "type": "number",
          "unit": "",
          "min": 0,
          "max": 1
        },
        "pv1_volt": {
          "comment": "直流输入电压pv1",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv1_curr": {
          "comment": "直流输入电流pv1",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "pv2_volt": {
          "comment": "直流输入电压pv2",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv2_curr": {
          "comment": "直流输入电流pv2",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "pv3_volt": {
          "comment": "直流输入电压pv3",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv3_curr": {
          "comment": "直流输入电流pv3",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "l1_volt": {
          "comment": "交流输出L1相电压",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "l1_curr": {
          "comment": "交流输出L1相电流",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 220
        },
        "l1_freq": {
          "comment": "交流输出L1相频率",
          "format": "float",
          "type": "number",
          "unit": "Hz",
          "min": 0,
          "max": 400
        },
        "l1_dci": {
          "comment": "交流输出L1相直流分量",
          "format": "float",
          "type": "number",
          "unit": "mA",
          "min": 0,
          "max": 1000
        },
        "l1_power": {
          "comment": "交流输出L1相功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 10000
        },
        "l1_pf": {
          "comment": "交流输出L1相功率因数",
          "format": "float",
          "type": "number",
          "unit": "",
          "min": 0,
          "max": 1
        }
      },
      "status": {
        "sw_ver1": {
          "comment": "software version1",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "sw_ver2": {
          "comment": "software version2",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "safety_spec": {
          "comment": "安规",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "total_runtime": {
          "comment": "总运行时间",
          "unit": "H",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "today_runtime": {
          "comment": "当天运行时间",
          "unit": "H",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "clientip": {
          "comment": "client ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set": {
          "comment": "set prop",
          "cmdtype": true,
          "args": {
            "name": {
              "format": "name",
              "type": "string"
            },
            "value": {
              "type": "string"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "required": true,
              "type": "string"
            },
            "version": {
              "required": true,
              "type": "string"
            },
            "url": {
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "required": true,
              "type": "string"
            },
            "version": {
              "required": true,
              "type": "string"
            },
            "url": {
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 59.55078125,
    "devices_size": 0.10546875,
    "event_size": 0.08203125,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "f4204f80-ceed-11e9-a199-6f1bb8d247fd",
    "owner": "zlg001",
    "created_time": 1567585700,
    "devtypeid": "5d6f75a4d2de0bf92dec0084",
    "devices": {
      "count": 3
    },
    "uri": "/v1/devices/devtype/zlg001_devtype_invert"
  }
] 
    
  this.selectedDevtype = "全部"
}
var mockData2 = function (getters) {
  this.devtypesOptions = [
  {
    "devtype": "全部"
  }
  ]
  this.selectedDevtype = "全部"

  this.allDevice = { "ClassB_": [ { "desc": "", "devgroup": "", "devname": "13432423425345231343242342534523", "devtype": "ClassB_", "nwkKey": "13432423425345231343242342534523", "mqttadapter": 1, "appEUI": "1343242342534523", "devid": "1343242342534523", "gps": { "longitude": 113.270793, "latitude": 23.135308 }, "appKey": "13432423425345231343242342534523", "owner": "zlg001", "devclass": 2, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "devsecret": "ada818d0-de9c-11e9-8b6c-df39ca1c011c", "registertime": 1569310012, "onlinetime": 0, "offlinetime": 1569310012, "newfm": { "isnew": 0 }, "uri": "/v1/devices/1343242342534523?devtype=ClassB_", "resources": [ { "name": "event", "uri": "/v1/devices/1343242342534523/event?devtype=ClassB_" }, { "name": "data", "uri": "/v1/devices/1343242342534523/data?devtype=ClassB_" }, { "name": "commands", "uri": "/v1/devices/1343242342534523/commands?devtype=ClassB_" } ], "label": "13432423425345231343242342534523", "value": "1343242342534523" }, { "desc": "", "devgroup": "", "devname": "123345345353435", "devtype": "ClassB_", "nwkKey": "12334534535343511233453453534351", "mqttadapter": 1, "appEUI": "1233453453534351", "devid": "1233453453534351", "gps": { "longitude": 113.270793, "latitude": 23.135308 }, "appKey": "12334534535343511233453453534351", "owner": "zlg001", "devclass": 2, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "devsecret": "c98805b0-de9c-11e9-8b6c-df39ca1c011c", "registertime": 1569310058, "onlinetime": 0, "offlinetime": 1569310058, "newfm": { "isnew": 0 }, "uri": "/v1/devices/1233453453534351?devtype=ClassB_", "resources": [ { "name": "event", "uri": "/v1/devices/1233453453534351/event?devtype=ClassB_" }, { "name": "data", "uri": "/v1/devices/1233453453534351/data?devtype=ClassB_" }, { "name": "commands", "uri": "/v1/devices/1233453453534351/commands?devtype=ClassB_" } ], "label": "123345345353435", "value": "1233453453534351" }, { "desc": "", "devgroup": "", "devname": "13432423425345223431343242342534523", "devtype": "ClassB_", "nwkKey": "13432423425345223431343242342534", "mqttadapter": 1, "appEUI": "1343242342534522", "devid": "1231231233424422", "gps": { "longitude": 113.270793, "latitude": 23.135308 }, "appKey": "13432423425345223431343242342534", "owner": "zlg001", "devclass": 2, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "devsecret": "bd94a290-de9c-11e9-8b6c-df39ca1c011c", "registertime": 1569310038, "onlinetime": 0, "offlinetime": 1569310038, "newfm": { "isnew": 0 }, "uri": "/v1/devices/1231231233424422?devtype=ClassB_", "resources": [ { "name": "event", "uri": "/v1/devices/1231231233424422/event?devtype=ClassB_" }, { "name": "data", "uri": "/v1/devices/1231231233424422/data?devtype=ClassB_" }, { "name": "commands", "uri": "/v1/devices/1231231233424422/commands?devtype=ClassB_" } ], "label": "13432423425345223431343242342534523", "value": "1231231233424422" }, { "desc": "", "devgroup": "", "devname": "1233345", "devtype": "ClassB_", "nwkKey": "12333451233345121233345123334512", "mqttadapter": 1, "appEUI": "1233345123334512", "devid": "1233345123334512", "gps": { "longitude": 113.270793, "latitude": 23.135308 }, "appKey": "12333451233345121233345123334512", "owner": "zlg001", "devclass": 2, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "devsecret": "63212c00-d9e4-11e9-bc57-8fbfcbdf82ac", "registertime": 1568791055, "onlinetime": 0, "offlinetime": 1568791055, "newfm": { "isnew": 0 }, "uri": "/v1/devices/1233345123334512?devtype=ClassB_", "resources": [ { "name": "event", "uri": "/v1/devices/1233345123334512/event?devtype=ClassB_" }, { "name": "data", "uri": "/v1/devices/1233345123334512/data?devtype=ClassB_" }, { "name": "commands", "uri": "/v1/devices/1233345123334512/commands?devtype=ClassB_" } ], "label": "1233345", "value": "1233345123334512" } ], "gw_zigbee_node": [ { "desc": "", "devgroup": "", "devname": "gw_zg_node_dev001", "devtype": "gw_zigbee_node", "devid": "dev001", "gps": { "longitude": 113.270793, "latitude": 23.135308 }, "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "registertime": 1573109683, "onlinetime": 0, "offlinetime": 1573109683, "newfm": { "isnew": 0 }, "uri": "/v1/devices/dev001?devtype=gw_zigbee_node", "resources": [ { "name": "event", "uri": "/v1/devices/dev001/event?devtype=gw_zigbee_node" }, { "name": "data", "uri": "/v1/devices/dev001/data?devtype=gw_zigbee_node" }, { "name": "commands", "uri": "/v1/devices/dev001/commands?devtype=gw_zigbee_node" } ], "label": "gw_zg_node_dev001", "value": "dev001" } ], "candtu-200": [ { "desc": "asdasd", "devgroup": "", "devname": "CCCC", "devtype": "candtu-200", "devid": "sssss", "gps": { "longitude": 103.803328, "latitude": 37.445477 }, "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "registertime": 1568874135, "onlinetime": 0, "offlinetime": 1568874135, "newfm": { "isnew": 0 }, "uri": "/v1/devices/sssss?devtype=candtu-200", "resources": [ { "name": "event", "uri": "/v1/devices/sssss/event?devtype=candtu-200" }, { "name": "data", "uri": "/v1/devices/sssss/data?devtype=candtu-200" }, { "name": "commands", "uri": "/v1/devices/sssss/commands?devtype=candtu-200" } ], "label": "CCCC", "value": "sssss" } ], "demo": [ { "desc": "1241241241241241241241241241241241241241241241241241241241241241241241241241241241241244444444444444124124124124124124124124124124124124124124124124124124124124124124124124124124124124124444444444444412412412412412412412412412412412412412412412412412412412412412412412412412412412412412444444444444441241241241241241241241241241241241241241241241241241241241241241241241241241241241241244444444444444124124124124124124124124124124124124124124124124124124124124124124124124124124124124124444444444444412412412412412412412412412412412412412412412412412412412412412412412412412412412412412444444444444441241241241241241241241241241241241241241241241241241241241241241241241241241241241241244444444444444124124124124124124124124124124124124124124124124124124124124124124124124124124124124124444444444444412412412412412412412412412412412412412412412412412412412412412412412412412412412412412444444444444441241241241241241241241241241241241241241241241241241241241241241241241241241241241241244444444444444124124124124124124124124", "devgroup": "5d82f253b137e8157d9e6952", "devname": "Demo_App12412412412412412412412412412412412412412412412412412412412412412412412412412412412412444444444444441241241241241241241241241241241241241241241241241241241241241241241241241241241241241244444444444444124124124124124124124124124124124124124124124124", "devtype": "demo", "devid": "12412412412412412412412412412412", "gps": { "longitude": 113.211403, "latitude": 23.179828 }, "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "registertime": 1574913317, "onlinetime": 0, "offlinetime": 1574913317, "agent": "", "newfm": { "isnew": 0 }, "uri": "/v1/devices/12412412412412412412412412412412?devtype=demo", "resources": [ { "name": "event", "uri": "/v1/devices/12412412412412412412412412412412/event?devtype=demo" }, { "name": "data", "uri": "/v1/devices/12412412412412412412412412412412/data?devtype=demo" }, { "name": "commands", "uri": "/v1/devices/12412412412412412412412412412412/commands?devtype=demo" } ], "label": "Demo_App12412412412412412412412412412412412412412412412412412412412412412412412412412412412412444444444444441241241241241241241241241241241241241241241241241241241241241241241241241241241241241244444444444444124124124124124124124124124124124124124124124124", "value": "12412412412412412412412412412412" }, { "desc": "", "devgroup": "", "devname": "46567", "devtype": "demo", "devid": "75675676", "gps": { "longitude": 113.270793, "latitude": 23.135308 }, "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "registertime": 1568860361, "onlinetime": 0, "offlinetime": 1568860361, "newfm": { "isnew": 0 }, "uri": "/v1/devices/75675676?devtype=demo", "resources": [ { "name": "event", "uri": "/v1/devices/75675676/event?devtype=demo" }, { "name": "data", "uri": "/v1/devices/75675676/data?devtype=demo" }, { "name": "commands", "uri": "/v1/devices/75675676/commands?devtype=demo" } ], "label": "46567", "value": "75675676" }, { "desc": "", "devgroup": "", "devname": "234234", "devtype": "demo", "devid": "243234", "gps": { "latitude": 23.135308, "longitude": 113.270793, "GPSTime": 0 }, "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "registertime": 1568860354, "onlinetime": 1568973916, "offlinetime": 1569206913, "time": 1568973916122, "clientip": "", "currentfm": { "version": "" }, "fault": 0, "isodate": 1568973916132, "newfm": { "isnew": 0 }, "settings": { "firstName": "", "lastName": "", "age": 0 }, "sw_version": 0, "uri": "/v1/devices/243234?devtype=demo", "resources": [ { "name": "event", "uri": "/v1/devices/243234/event?devtype=demo" }, { "name": "data", "uri": "/v1/devices/243234/data?devtype=demo" }, { "name": "commands", "uri": "/v1/devices/243234/commands?devtype=demo" } ], "label": "234234", "value": "243234" }, { "desc": "", "devgroup": "", "devname": "768678", "devtype": "demo", "devid": "678678", "gps": { "longitude": 113.270793, "latitude": 23.135308 }, "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "registertime": 1568860364, "onlinetime": 0, "offlinetime": 1568860364, "newfm": { "isnew": 0 }, "uri": "/v1/devices/678678?devtype=demo", "resources": [ { "name": "event", "uri": "/v1/devices/678678/event?devtype=demo" }, { "name": "data", "uri": "/v1/devices/678678/data?devtype=demo" }, { "name": "commands", "uri": "/v1/devices/678678/commands?devtype=demo" } ], "label": "768678", "value": "678678" } ], "zlg001zigbee": [ { "devid": "d52201feff9ffd90", "devtype": "zlg001zigbee", "devname": "ZLGBLE", "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "devsecret": "fe498050-dd9b-11e9-999d-cff1aed42cf0", "registertime": 1569199766, "onlinetime": 0, "offlinetime": 1569199766, "newfm": { "isnew": 0 }, "uri": "/v1/devices/d52201feff9ffd90?devtype=zlg001zigbee", "resources": [ { "name": "event", "uri": "/v1/devices/d52201feff9ffd90/event?devtype=zlg001zigbee" }, { "name": "data", "uri": "/v1/devices/d52201feff9ffd90/data?devtype=zlg001zigbee" }, { "name": "commands", "uri": "/v1/devices/d52201feff9ffd90/commands?devtype=zlg001zigbee" } ], "label": "ZLGBLE", "value": "d52201feff9ffd90" }, { "devid": "14b457fffe347433", "devtype": "zlg001zigbee", "devname": "ZLG网络分析仪", "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "devsecret": "9e353bb0-e038-11e9-8b6c-df39ca1c011c", "registertime": 1569486938, "onlinetime": 0, "offlinetime": 1569486938, "newfm": { "isnew": 0 }, "uri": "/v1/devices/14b457fffe347433?devtype=zlg001zigbee", "resources": [ { "name": "event", "uri": "/v1/devices/14b457fffe347433/event?devtype=zlg001zigbee" }, { "name": "data", "uri": "/v1/devices/14b457fffe347433/data?devtype=zlg001zigbee" }, { "name": "commands", "uri": "/v1/devices/14b457fffe347433/commands?devtype=zlg001zigbee" } ], "label": "ZLG网络分析仪", "value": "14b457fffe347433" }, { "devid": "0a13f1feff5ecfd0", "devtype": "zlg001zigbee", "devname": "ZLG网络分析仪", "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.046875, "update_time": 1575689402 }, "devsecret": "2380c8f0-df6e-11e9-8b6c-df39ca1c011c", "registertime": 1569399974, "onlinetime": 0, "offlinetime": 1569399974, "newfm": { "isnew": 0 }, "uri": "/v1/devices/0a13f1feff5ecfd0?devtype=zlg001zigbee", "resources": [ { "name": "event", "uri": "/v1/devices/0a13f1feff5ecfd0/event?devtype=zlg001zigbee" }, { "name": "data", "uri": "/v1/devices/0a13f1feff5ecfd0/data?devtype=zlg001zigbee" }, { "name": "commands", "uri": "/v1/devices/0a13f1feff5ecfd0/commands?devtype=zlg001zigbee" } ], "label": "ZLG网络分析仪", "value": "0a13f1feff5ecfd0" } ], "zlg001lorawan": [ { "devid": "0000000000000000", "devtype": "zlg001lorawan", "devname": "ZLG网络分析仪", "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "devsecret": "c401c430-0e64-11ea-ad56-0f4fabed86d9", "registertime": 1574563653, "onlinetime": 0, "offlinetime": 1574563653, "newfm": { "isnew": 0 }, "uri": "/v1/devices/0000000000000000?devtype=zlg001lorawan", "resources": [ { "name": "event", "uri": "/v1/devices/0000000000000000/event?devtype=zlg001lorawan" }, { "name": "data", "uri": "/v1/devices/0000000000000000/data?devtype=zlg001lorawan" }, { "name": "commands", "uri": "/v1/devices/0000000000000000/commands?devtype=zlg001lorawan" } ], "label": "ZLG网络分析仪", "value": "0000000000000000" }, { "devid": "9856412544744111", "devtype": "zlg001lorawan", "devname": "ZLG网络分析仪", "owner": "zlg001", "devclass": 0, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "devsecret": "1ad39130-e110-11e9-8b6c-df39ca1c011c", "registertime": 1569579489, "onlinetime": 0, "offlinetime": 1569579489, "newfm": { "isnew": 0 }, "uri": "/v1/devices/9856412544744111?devtype=zlg001lorawan", "resources": [ { "name": "event", "uri": "/v1/devices/9856412544744111/event?devtype=zlg001lorawan" }, { "name": "data", "uri": "/v1/devices/9856412544744111/data?devtype=zlg001lorawan" }, { "name": "commands", "uri": "/v1/devices/9856412544744111/commands?devtype=zlg001lorawan" } ], "label": "ZLG网络分析仪", "value": "9856412544744111" } ], "zggw": [ { "desc": "", "devgroup": "", "devname": "testzggw", "devtype": "zggw", "devid": "112311231123112311231123", "gps": { "longitude": 113.270793, "latitude": 23.135308 }, "owner": "zlg001", "devclass": 1, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "registertime": 1567647224, "onlinetime": 0, "offlinetime": 1567647224, "subdevs": [ { "devid": "invert_id3", "devtype": "zlg001_devtype_invert" }, { "devid": "invert_id2", "devtype": "zlg001_devtype_invert" }, { "devid": "invert_id1", "devtype": "zlg001_devtype_invert" }, { "devtype": "zlg001_devtype_invert", "devid": "invert_id2" } ], "newfm": { "isnew": 0 }, "uri": "/v1/devices/112311231123112311231123?devtype=zggw", "resources": [ { "name": "event", "uri": "/v1/devices/112311231123112311231123/event?devtype=zggw" }, { "name": "data", "uri": "/v1/devices/112311231123112311231123/data?devtype=zggw" }, { "name": "commands", "uri": "/v1/devices/112311231123112311231123/commands?devtype=zggw" } ], "label": "testzggw", "value": "112311231123112311231123" } ], "zlg001_devtype_invert": [ { "devname": "invert_name2", "devtype": "zlg001_devtype_invert", "devid": "invert_id2", "owner": "zlg001", "devclass": 0, "status": 0, "devprotocol": 0, "data_extra": { "data_size": 0.12109375, "update_time": 1575689402 }, "devsecret": "f4358530-ceed-11e9-a199-6f1bb8d247fd", "registertime": 1567585701, "onlinetime": 1575278361, "offlinetime": 1575278360, "agent": "", "devgroup": "5d6f75a5d2de0be138ec0093", "time": 1575278361377, "clientip": "", "currentfm": { "version": "" }, "fault": 0, "gps": { "latitude": 23.124868, "longitude": 113.305007, "GPSTime": 0 }, "isodate": 1575278361384, "newfm": { "isnew": 0 }, "safety_spec": 0, "sw_ver1": 0, "sw_ver2": 0, "today_runtime": 0, "total_runtime": 0, "gateway": { "devtype": "zggw", "devid": "112311231123112311231123" }, "uri": "/v1/devices/invert_id2?devtype=zlg001_devtype_invert", "resources": [ { "name": "event", "uri": "/v1/devices/invert_id2/event?devtype=zlg001_devtype_invert" }, { "name": "data", "uri": "/v1/devices/invert_id2/data?devtype=zlg001_devtype_invert" }, { "name": "commands", "uri": "/v1/devices/invert_id2/commands?devtype=zlg001_devtype_invert" } ], "label": "invert_name2", "value": "invert_id2" }, { "devname": "invert_name3", "devtype": "zlg001_devtype_invert", "devid": "invert_id3", "owner": "zlg001", "devclass": 0, "status": 0, "devprotocol": 0, "data_extra": { "data_size": 0.07421875, "update_time": 1575689402 }, "devsecret": "ssssssss-ssss-ssss-ssss-ssssasdasdas", "registertime": 1567585701, "onlinetime": 1568973915, "offlinetime": 1568972333, "agent": "", "devgroup": "5d6f75a5d2de0b1ed2ec0094", "time": 1568973915959, "clientip": "", "currentfm": { "version": "" }, "fault": 0, "gps": { "latitude": 22.990927, "longitude": 113.071735, "GPSTime": 0 }, "isodate": 1568973915967, "newfm": { "isnew": 0 }, "safety_spec": 0, "sw_ver1": 0, "sw_ver2": 0, "today_runtime": 0, "total_runtime": 0, "gateway": { "devtype": "zggw", "devid": "112311231123112311231123" }, "uri": "/v1/devices/invert_id3?devtype=zlg001_devtype_invert", "resources": [ { "name": "event", "uri": "/v1/devices/invert_id3/event?devtype=zlg001_devtype_invert" }, { "name": "data", "uri": "/v1/devices/invert_id3/data?devtype=zlg001_devtype_invert" }, { "name": "commands", "uri": "/v1/devices/invert_id3/commands?devtype=zlg001_devtype_invert" } ], "label": "invert_name3", "value": "invert_id3" }, { "devname": "invert_name1", "devtype": "zlg001_devtype_invert", "devid": "invert_id1", "owner": "zlg001", "devclass": 0, "status": 0, "devprotocol": 0, "data_extra": { "data_size": 59.4375, "update_time": 1575689402 }, "devsecret": "f42cab90-ceed-11e9-a199-6f1bb8d247fd", "registertime": 1567585701, "onlinetime": 1575009942, "offlinetime": 1575009941, "agent": "", "devgroup": "5d6f75a5d2de0be138ec0093", "time": 1575009942478, "clientip": "", "currentfm": { "version": "" }, "fault": 0, "gps": { "latitude": 23.134373, "longitude": 113.301952, "GPSTime": 0 }, "isodate": 1575009942487, "newfm": { "isnew": 0 }, "safety_spec": 0, "sw_ver1": 0, "sw_ver2": 0, "today_runtime": 0, "total_runtime": 0, "gateway": { "devtype": "zggw", "devid": "112311231123112311231123" }, "uri": "/v1/devices/invert_id1?devtype=zlg001_devtype_invert", "resources": [ { "name": "event", "uri": "/v1/devices/invert_id1/event?devtype=zlg001_devtype_invert" }, { "name": "data", "uri": "/v1/devices/invert_id1/data?devtype=zlg001_devtype_invert" }, { "name": "commands", "uri": "/v1/devices/invert_id1/commands?devtype=zlg001_devtype_invert" } ], "label": "invert_name1", "value": "invert_id1" } ], "gw_zigbee": [ { "devid": "dghhnhh", "devgroup": "5d6f75a5d2de0b1ed2ec0094", "devname": "rfuuh", "gps": { "latitude": 153.525, "longitude": 123.52 }, "devtype": "gw_zigbee", "desc": "xgghhn", "owner": "zlg001", "devclass": 1, "status": 1, "devprotocol": 0, "data_extra": { "data_size": 0.0234375, "update_time": 1575689402 }, "registertime": 1575255247, "onlinetime": 0, "offlinetime": 1575255247, "agent": "", "newfm": { "isnew": 0 }, "uri": "/v1/devices/dghhnhh?devtype=gw_zigbee", "resources": [ { "name": "event", "uri": "/v1/devices/dghhnhh/event?devtype=gw_zigbee" }, { "name": "data", "uri": "/v1/devices/dghhnhh/data?devtype=gw_zigbee" }, { "name": "commands", "uri": "/v1/devices/dghhnhh/commands?devtype=gw_zigbee" } ], "label": "rfuuh", "value": "dghhnhh" } ] }



  this.allDevType = [
  {
    "devtype": "gw_zigbee_node",
    "basetype": "gw_zigbee_node",
    "enable_secret": false,
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2)，LoraWan网关(3);此处必须为3，即LoraWan网关"
        },
        "desc": {
          "comment": "zigbee节点",
          "maxLength": 1024,
          "type": "string"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {},
      "status": {
        "power": {
          "comment": "节点当前的电量",
          "nickname": "节点当前电量",
          "unit": "%",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {},
      "errors": {},
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "type": "number",
              "format": "int"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.01171875,
    "devices_size": 0.06640625,
    "event_size": 0.01171875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1573109683,
    "comment": "asdasdasdasdasd",
    "devtypeid": "5dc3bfb383b64b4d3dbb52a8",
    "devices": {
      "count": 1
    },
    "uri": "/v1/devices/devtype/gw_zigbee_node"
  },
  {
    "devtype": "gw_zigbee",
    "basetype": "gw_zigbee",
    "enable_secret": false,
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 1,
          "max": 1,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2)，LoraWan网关(3);此处必须为3，即LoraWan网关"
        },
        "desc": {
          "comment": "通用网关",
          "maxLength": 1024,
          "type": "string"
        },
        "node_gw_bydata": {
          "comment": "网关字段",
          "type": "boolean",
          "default": true
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {},
      "status": {
        "mac": {
          "comment": "网关的mac地址",
          "nickname": "mac地址",
          "type": "string"
        },
        "time": {
          "comment": "网关当前的时间",
          "nickname": "当前时间",
          "unit": "ms",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "rxnb": {
          "comment": "网关接受的包数量",
          "nickname": "接受包数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "txnb": {
          "comment": "网关发送的包数量",
          "nickname": "发送包数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "NodeCnt": {
          "comment": "网关挂载的节点数量",
          "nickname": "挂载节点数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "maxNodeCnt": {
          "comment": "网关可挂载的最大节点数量",
          "nickname": "最大挂载节点数量",
          "min": 0,
          "max": 5000,
          "type": "number",
          "format": "float"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "show_frontend": true,
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {},
      "errors": {},
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "type": "number",
              "format": "int"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": true,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.01171875,
    "devices_size": 0.06640625,
    "event_size": 0.01171875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 1,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1573109627,
    "devtypeid": "5dc3bf7b83b64b3d4dbb524d",
    "devices": {
      "count": 1
    },
    "uri": "/v1/devices/devtype/gw_zigbee"
  },
  {
    "devtype": "Test111",
    "basetype": "candtu-200",
    "comment": "",
    "schema": {
      "memo": {
        "desc": {
          "comment": "两路CAN-bus数据记录仪",
          "maxLength": 1024,
          "type": "string"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 31,
          "minLength": 1,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "time": {
          "nickname": "时间",
          "format": "float",
          "type": "number"
        },
        "id": {
          "nickname": "CAN帧ID",
          "format": "float",
          "type": "number"
        },
        "flag": {
          "nickname": "报文标志",
          "format": "float",
          "type": "number"
        },
        "ch": {
          "nickname": "通道",
          "format": "float",
          "type": "number"
        },
        "len": {
          "nickname": "数据长度",
          "format": "float",
          "type": "number"
        },
        "data": {
          "nickname": "数据内容",
          "type": "object"
        }
      },
      "status": {
        "devname": {
          "comment": "设备名, ASCII字符, 最长31个字符",
          "nickname": "设备名",
          "type": "string",
          "minimum": 1,
          "maximum": 31
        },
        "model": {
          "comment": "设备型号",
          "nickname": "设备型号",
          "type": "string",
          "enums": [
            "CANDTU-200UWG",
            "CANDTU-200UWGR",
            "CANDTU-200UWGR-B"
          ]
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "nickname": "GPS信息时间戳"
            }
          }
        },
        "CfgInfo": {
          "comment": "CANDTU配置",
          "type": "object",
          "nickname": "CANDTU配置",
          "properties": {
            "CAN": {
              "type": "object",
              "comment": "CAN配置",
              "nickname": "CAN配置",
              "properties": {
                "CAN0": {
                  "type": "object",
                  "comment": "CAN0配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                },
                "CAN1": {
                  "type": "object",
                  "comment": "CAN1配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                }
              }
            },
            "LIN": {
              "type": "object",
              "comment": "LIN配置",
              "nickname": "LIN配置",
              "properties": {
                "LIN0": {
                  "type": "object",
                  "comment": "LIN配置",
                  "nickname": "LIN配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Baud": {
                      "type": "integer",
                      "comment": "LIN波特率",
                      "minimum": 1000,
                      "maximum": 20000
                    },
                    "DataLen": {
                      "type": "integer",
                      "comment": "LIN数据长度",
                      "minimum": 1,
                      "maximum": 8
                    }
                  }
                }
              }
            },
            "DI": {
              "type": "object",
              "comment": "DI配置",
              "nickname": "DI配置",
              "properties": {
                "DI0": {
                  "type": "object",
                  "comment": "DI配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "DI功能",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Interval": {
                      "type": "integer",
                      "comment": "DI记录间隔(ms)，DI功能为输入时有效",
                      "enum": [
                        1,
                        2,
                        5,
                        10,
                        20,
                        50,
                        100,
                        200,
                        500,
                        1000
                      ]
                    }
                  }
                }
              }
            },
            "DO": {
              "type": "object",
              "comment": "DO配置",
              "nickname": "DO配置",
              "properties": {
                "DO0": {
                  "type": "object",
                  "comment": "DO配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "告警条件，1：记录满，2：总线错误，3：存储状态异常，4：GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Output": {
                      "type": "integer",
                      "comment": "DO告警时输出值",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "DO告警GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "DO告警GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "DO告警GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "DO告警GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "RecCfg": {
              "type": "object",
              "comment": "CANDTU记录配置",
              "nickname": "CANDTU记录配置",
              "properties": {
                "RecFullHdl": {
                  "type": "integer",
                  "comment": "存储空间满处理(0:循环记录/1：停止记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecFSize": {
                  "type": "integer",
                  "comment": "最大记录文件大小(MB)",
                  "minimum": 2,
                  "maximum": 512
                },
                "RecErr": {
                  "type": "integer",
                  "comment": "是否记录CAN错误帧(0:不记录/1：记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecMer": {
                  "type": "integer",
                  "comment": "通道记录数据是否合并(0：不合并/1:合并)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "TrgMode": {
              "type": "object",
              "comment": "CANDTU记录触发模式配置",
              "nickname": "CANDTU记录触发模式配置",
              "properties": {
                "RecMode": {
                  "type": "integer",
                  "comment": "CAN记录模式(0：长时间记录/1:条件记录/2：预触发记录/3：定时记录/4：不记录)",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                },
                "ConRec": {
                  "type": "object",
                  "comment": "条件记录配置对象",
                  "properties": {
                    "StartChn": {
                      "type": "integer",
                      "comment": "开始记录通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartExt": {
                      "type": "integer",
                      "comment": "开始记录帧类型（0：标准帧/1:扩展帧）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartOp": {
                      "type": "integer",
                      "comment": "开始记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StartIdS": {
                      "type": "integer",
                      "comment": "开始记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StartIdL": {
                      "type": "integer",
                      "comment": "开始记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopChn": {
                      "type": "integer",
                      "comment": "停止记录通道号,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopExt": {
                      "type": "integer",
                      "comment": "停止记录帧类型（0：标准帧/1:扩展帧),标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopOp": {
                      "type": "integer",
                      "comment": "停止记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StopIdS": {
                      "type": "integer",
                      "comment": "停止记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopIdL": {
                      "type": "integer",
                      "comment": "停止记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    }
                  }
                },
                "PreTrgRec": {
                  "type": "object",
                  "comment": "预触发记录配置对象",
                  "properties": {
                    "PreVal": {
                      "type": "integer",
                      "comment": "预触发记录帧数",
                      "minimum": 10,
                      "maximum": 100000
                    },
                    "PostVal": {
                      "type": "integer",
                      "comment": "触发后记录时间(ms)",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TrgNum": {
                      "type": "integer",
                      "comment": "触发条件数",
                      "minimum": 1,
                      "maximum": 512
                    },
                    "TrgCon": {
                      "type": "array",
                      "comment": "触发条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                },
                "TimRec": {
                  "type": "object",
                  "comment": "定时记录配置对象",
                  "properties": {
                    "Period": {
                      "type": "object",
                      "comment": "定时时间周期（ms）",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TmNDA": {
                      "type": "object",
                      "comment": "定时时间内无数据记录方式（0：不记录/1：保存最近一次数据/2：保存自定义数据）",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "TmNDAUD": {
                      "type": "string",
                      "comment": "定时时间内无记录保存的自定义数据（16进制保存为字符串）",
                      "minimum": 0,
                      "maximum": 16
                    },
                    "FltNum": {
                      "type": "integer",
                      "comment": "过滤条件数",
                      "minimum": 0,
                      "maximum": 256
                    },
                    "FltCon": {
                      "type": "array",
                      "comment": "过滤条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "Quota": {
              "type": "object",
              "comment": "存储空间分配",
              "nickname": "存储空间分配",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                }
              }
            },
            "GPSRec": {
              "type": "object",
              "comment": "GPS记录配置",
              "nickname": "GPS记录配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "GPS记录使能（1：使能/0：失能）",
                  "enum": [
                    0,
                    1
                  ]
                },
                "Type": {
                  "type": "integer",
                  "comment": "定位系统类型（0：自动选择/1：北斗/2：GPS）",
                  "enum": [
                    0,
                    1,
                    2
                  ]
                },
                "Period": {
                  "type": "integer",
                  "comment": "记录周期（s）",
                  "minimum": 1,
                  "maximum": 1800
                }
              }
            },
            "SMS": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "SMS0": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS1": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS2": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS3": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS4": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS5": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "Net": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "Net0": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net1": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net2": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                }
              }
            },
            "NetFlt": {
              "type": "object",
              "comment": "无线过滤配置",
              "nickname": "无线过滤配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "无线传输加密使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "FltNum": {
                  "type": "integer",
                  "comment": "触发条件数",
                  "minimum": 1,
                  "maximum": 256
                },
                "FltCon": {
                  "type": "array",
                  "comment": "触发条件列表",
                  "minItems": 1,
                  "maxItems": 256,
                  "items": {
                    "type": "object",
                    "properties": {
                      "Chn": {
                        "type": "integer",
                        "comment": "通道号",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Type": {
                        "type": "integer",
                        "comment": "过滤记录类型（0：ID滤波/1：时间段滤波）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Op": {
                        "type": "integer",
                        "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ]
                      },
                      "Ext": {
                        "type": "integer",
                        "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "IdS": {
                        "type": "integer",
                        "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      },
                      "IdL": {
                        "type": "integer",
                        "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      }
                    }
                  }
                }
              }
            },
            "NetGen": {
              "type": "object",
              "comment": "无线通用配置",
              "nickname": "无线通用配置",
              "properties": {
                "Times": {
                  "type": "integer",
                  "comment": "断网续传次数",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                },
                "Proto": {
                  "type": "integer",
                  "comment": "加密协议编号",
                  "enum": [
                    0,
                    1
                  ]
                },
                "SendIdEn": {
                  "type": "integer",
                  "comment": "网络数据携带设备ID和绝对时间戳使能",
                  "enum": [
                    0,
                    1
                  ]
                },
                "NetLogEn": {
                  "type": "integer",
                  "comment": "网络调试日志使能",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "IotEn": {
              "type": "object",
              "comment": "实时数据上传使能",
              "nickname": "实时数据上传使能",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            }
          }
        },
        "SDStat": {
          "comment": "SD卡状态,0-SD卡未插入，1-SD卡插入，2-设备记录中，-1-设备无SD卡",
          "nickname": "SD卡状态",
          "type": "number",
          "format": "int",
          "enum": [
            0,
            1,
            2,
            -1
          ]
        },
        "FwVer": {
          "comment": "固件版本号, 如：V1.00",
          "nickname": "固件版本号",
          "type": "string"
        },
        "HwVer": {
          "comment": "硬件版本号, 如：V1.00",
          "nickname": "硬件版本号",
          "type": "string"
        },
        "Serial": {
          "comment": "产品序列号, 8字符",
          "nickname": "产品序列号",
          "type": "string"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "StartRec": {
          "comment": "启动记录",
          "nickname": "启动记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "StopRec": {
          "comment": "停止记录",
          "nickname": "停止记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "ClrDev": {
          "comment": "清空设备",
          "nickname": "清空设备",
          "cmdtype": true,
          "show_frontend": true
        },
        "GetRecFileInfo": {
          "comment": "获取文件列表信息",
          "nickname": "获取文件列表",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "StartTime": {
              "comment": "起始时间戳",
              "nickname": "起始时间戳",
              "type": "number",
              "format": "int"
            },
            "StopTime": {
              "comment": "结束时间戳",
              "nickname": "结束时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "GetRecFile": {
          "comment": "获取记录文件",
          "nickname": "获取记录文件",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "Name": {
              "comment": "文件名",
              "nickname": "文件名",
              "type": "string"
            },
            "Offset": {
              "comment": "文件偏移",
              "nickname": "文件偏移",
              "type": "number",
              "format": "int"
            },
            "Tag": {
              "comment": "本次传输文件标签",
              "nickname": "文件标签",
              "type": "number",
              "format": "int"
            }
          }
        },
        "CancelGetRec": {
          "comment": "取消传输",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型",
              "nickname": "数据类型",
              "type": "number",
              "format": "int"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "RecFull": {
          "comment": "记录满",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        }
      },
      "errors": {
        "err": {
          "comment": "CAN总线错误",
          "args": {
            "chn": {
              "comment": "CAN错误通道",
              "type": "number",
              "format": "int"
            },
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "err_code": {
              "comment": "错误码",
              "type": "number",
              "format": "int"
            }
          }
        },
        "storge_err": {
          "comment": "存储状态异常",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "gps_err": {
          "comment": "GPS不在指定GPS区域",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "type": {
              "comment": "告警类型：1：短信通知设置的告警，2：DO输出设置的告警",
              "type": "number",
              "format": "int"
            },
            "longitude": {
              "comment": "经度",
              "type": "number",
              "format": "float"
            },
            "latitude": {
              "comment": "纬度",
              "type": "number",
              "format": "float"
            }
          }
        }
      },
      "logs": {
        "log": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1,
          "num": -1
        },
        "options": {
          "unique": true
        }
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "e41c6430-f17e-11e9-af30-27e7af667e5c",
    "owner": "zlg001",
    "created_time": 1571386290,
    "devtypeid": "5da973b29d9a3eca203044ac",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/Test111"
  },
  {
    "devtype": "Testcvb",
    "basetype": "demo",
    "comment": "Jasper87",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "qqqiiii": {
          "type": "number",
          "format": "float",
          "comment": "",
          "nickname": "",
          "unit": ""
        },
        "efgff": {
          "type": "number",
          "format": "float",
          "comment": "",
          "nickname": "dddr",
          "unit": ""
        },
        "qqqq": {
          "type": "number",
          "format": "int",
          "comment": "qwww",
          "max": 0,
          "min": 0,
          "nickname": "ffbn",
          "unit": "qw"
        },
        "temp": {
          "type": "number",
          "format": "float",
          "comment": "温度",
          "nickname": "qqww",
          "unit": ""
        }
      },
      "status": {
        "aaaa": {
          "type": "number",
          "format": "float",
          "comment": "工作温度正常",
          "nickname": "暨大",
          "properties": {
            "qqqq": {
              "type": "string",
              "required": false,
              "comment": "",
              "nickname": ""
            }
          }
        }
      },
      "commands": {
        "nbv": {
          "comment": "",
          "cmdtype": false,
          "show_frontend": false,
          "nickname": "",
          "args": {
            "kkkk": {
              "type": "string",
              "format": null,
              "required": false,
              "comment": "",
              "nickname": "",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "zzzz": {
          "comment": "",
          "cmdtype": false,
          "show_frontend": false,
          "nickname": "",
          "args": {
            "qqqq": {
              "type": "number",
              "format": "float",
              "required": false,
              "comment": "",
              "nickname": "",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "sync_time": {
          "comment": "同步时间",
          "cmdtype": true,
          "show_frontend": false,
          "nickname": "同步时间",
          "args": {
            "time": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": "",
              "nickname": "时间",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "cmdtype": true,
          "show_frontend": false,
          "nickname": "通知设备有新固件",
          "args": {
            "devtype": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "设备类型",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "version": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "固件版本",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "url": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "固件url",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "cmdtype": true,
          "show_frontend": false,
          "nickname": "通知设备更新固件",
          "args": {
            "devtype": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "设备类型",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "version": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "固件版本",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "url": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": null,
              "nickname": "固件url",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "cmdtype": true,
          "show_frontend": false,
          "nickname": "上报最新数据",
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "nickname": "透传命令",
          "args": {
            "format": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": "编码格式",
              "nickname": "编码格式",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            },
            "raw": {
              "type": "string",
              "format": null,
              "required": true,
              "comment": "数据",
              "nickname": "数据",
              "enums": null,
              "max": null,
              "min": null,
              "maxLength": null,
              "minLength": null
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "eett": {
          "comment": "工作温度正常",
          "nickname": "雨玨",
          "args": {
            "mmmm": {
              "type": "string",
              "required": false,
              "comment": "",
              "nickname": "三块五"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1571020633,
    "devtypeid": "5da3df59dede2c4901225086",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/Testcvb"
  },
  {
    "devtype": "testsdf-dc",
    "basetype": "gw_zigbee",
    "comment": "string",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 1,
          "max": 1,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2)，LoraWan网关(3);此处必须为3，即LoraWan网关"
        },
        "desc": {
          "comment": "通用网关",
          "maxLength": 1024,
          "type": "string"
        },
        "node_gw_bydata": {
          "comment": "网关字段",
          "type": "boolean",
          "default": true
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {},
      "status": {
        "mac": {
          "comment": "网关的mac地址",
          "nickname": "mac地址",
          "type": "string"
        },
        "time": {
          "comment": "网关当前的时间",
          "nickname": "当前时间",
          "unit": "ms",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "rxnb": {
          "comment": "网关接受的包数量",
          "nickname": "接受包数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "txnb": {
          "comment": "网关发送的包数量",
          "nickname": "发送包数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "NodeCnt": {
          "comment": "网关挂载的节点数量",
          "nickname": "挂载节点数量",
          "min": 0,
          "type": "number",
          "format": "float"
        },
        "maxNodeCnt": {
          "comment": "网关可挂载的最大节点数量",
          "nickname": "最大挂载节点数量",
          "min": 0,
          "max": 5000,
          "type": "number",
          "format": "float"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {},
      "errors": {},
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "type": "number",
              "format": "int"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": true,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 1,
    "enable_secret": false,
    "dtype_secret": "2c8cc510-eccb-11e9-9ead-4391e1cfd39b",
    "owner": "zlg001",
    "created_time": 1570869298,
    "devtypeid": "5da19032dede2cce131e1570",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/testsdf-dc"
  },
  {
    "devtype": "candtu-200",
    "basetype": "candtu-200",
    "enable_secret": false,
    "schema": {
      "memo": {
        "desc": {
          "comment": "两路CAN-bus数据记录仪",
          "maxLength": 1024,
          "type": "string"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 31,
          "minLength": 1,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "time": {
          "nickname": "时间",
          "format": "float",
          "type": "number"
        },
        "id": {
          "nickname": "CAN帧ID",
          "format": "float",
          "type": "number"
        },
        "flag": {
          "nickname": "报文标志",
          "format": "float",
          "type": "number"
        },
        "ch": {
          "nickname": "通道",
          "format": "float",
          "type": "number"
        },
        "len": {
          "nickname": "数据长度",
          "format": "float",
          "type": "number"
        },
        "data": {
          "nickname": "数据内容",
          "type": "object"
        }
      },
      "status": {
        "devname": {
          "comment": "设备名, ASCII字符, 最长31个字符",
          "nickname": "设备名",
          "type": "string",
          "minimum": 1,
          "maximum": 31
        },
        "model": {
          "comment": "设备型号",
          "nickname": "设备型号",
          "type": "string",
          "enums": [
            "CANDTU-200UWG",
            "CANDTU-200UWGR",
            "CANDTU-200UWGR-B"
          ]
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "nickname": "GPS信息时间戳"
            }
          }
        },
        "CfgInfo": {
          "comment": "CANDTU配置",
          "type": "object",
          "nickname": "CANDTU配置",
          "properties": {
            "CAN": {
              "type": "object",
              "comment": "CAN配置",
              "nickname": "CAN配置",
              "properties": {
                "CAN0": {
                  "type": "object",
                  "comment": "CAN0配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                },
                "CAN1": {
                  "type": "object",
                  "comment": "CAN1配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                }
              }
            },
            "LIN": {
              "type": "object",
              "comment": "LIN配置",
              "nickname": "LIN配置",
              "properties": {
                "LIN0": {
                  "type": "object",
                  "comment": "LIN配置",
                  "nickname": "LIN配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Baud": {
                      "type": "integer",
                      "comment": "LIN波特率",
                      "minimum": 1000,
                      "maximum": 20000
                    },
                    "DataLen": {
                      "type": "integer",
                      "comment": "LIN数据长度",
                      "minimum": 1,
                      "maximum": 8
                    }
                  }
                }
              }
            },
            "DI": {
              "type": "object",
              "comment": "DI配置",
              "nickname": "DI配置",
              "properties": {
                "DI0": {
                  "type": "object",
                  "comment": "DI配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "DI功能",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Interval": {
                      "type": "integer",
                      "comment": "DI记录间隔(ms)，DI功能为输入时有效",
                      "enum": [
                        1,
                        2,
                        5,
                        10,
                        20,
                        50,
                        100,
                        200,
                        500,
                        1000
                      ]
                    }
                  }
                }
              }
            },
            "DO": {
              "type": "object",
              "comment": "DO配置",
              "nickname": "DO配置",
              "properties": {
                "DO0": {
                  "type": "object",
                  "comment": "DO配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "告警条件，1：记录满，2：总线错误，3：存储状态异常，4：GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Output": {
                      "type": "integer",
                      "comment": "DO告警时输出值",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "DO告警GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "DO告警GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "DO告警GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "DO告警GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "RecCfg": {
              "type": "object",
              "comment": "CANDTU记录配置",
              "nickname": "CANDTU记录配置",
              "properties": {
                "RecFullHdl": {
                  "type": "integer",
                  "comment": "存储空间满处理(0:循环记录/1：停止记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecFSize": {
                  "type": "integer",
                  "comment": "最大记录文件大小(MB)",
                  "minimum": 2,
                  "maximum": 512
                },
                "RecErr": {
                  "type": "integer",
                  "comment": "是否记录CAN错误帧(0:不记录/1：记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecMer": {
                  "type": "integer",
                  "comment": "通道记录数据是否合并(0：不合并/1:合并)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "TrgMode": {
              "type": "object",
              "comment": "CANDTU记录触发模式配置",
              "nickname": "CANDTU记录触发模式配置",
              "properties": {
                "RecMode": {
                  "type": "integer",
                  "comment": "CAN记录模式(0：长时间记录/1:条件记录/2：预触发记录/3：定时记录/4：不记录)",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                },
                "ConRec": {
                  "type": "object",
                  "comment": "条件记录配置对象",
                  "properties": {
                    "StartChn": {
                      "type": "integer",
                      "comment": "开始记录通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartExt": {
                      "type": "integer",
                      "comment": "开始记录帧类型（0：标准帧/1:扩展帧）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartOp": {
                      "type": "integer",
                      "comment": "开始记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StartIdS": {
                      "type": "integer",
                      "comment": "开始记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StartIdL": {
                      "type": "integer",
                      "comment": "开始记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopChn": {
                      "type": "integer",
                      "comment": "停止记录通道号,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopExt": {
                      "type": "integer",
                      "comment": "停止记录帧类型（0：标准帧/1:扩展帧),标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopOp": {
                      "type": "integer",
                      "comment": "停止记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StopIdS": {
                      "type": "integer",
                      "comment": "停止记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopIdL": {
                      "type": "integer",
                      "comment": "停止记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    }
                  }
                },
                "PreTrgRec": {
                  "type": "object",
                  "comment": "预触发记录配置对象",
                  "properties": {
                    "PreVal": {
                      "type": "integer",
                      "comment": "预触发记录帧数",
                      "minimum": 10,
                      "maximum": 100000
                    },
                    "PostVal": {
                      "type": "integer",
                      "comment": "触发后记录时间(ms)",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TrgNum": {
                      "type": "integer",
                      "comment": "触发条件数",
                      "minimum": 1,
                      "maximum": 512
                    },
                    "TrgCon": {
                      "type": "array",
                      "comment": "触发条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                },
                "TimRec": {
                  "type": "object",
                  "comment": "定时记录配置对象",
                  "properties": {
                    "Period": {
                      "type": "object",
                      "comment": "定时时间周期（ms）",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TmNDA": {
                      "type": "object",
                      "comment": "定时时间内无数据记录方式（0：不记录/1：保存最近一次数据/2：保存自定义数据）",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "TmNDAUD": {
                      "type": "string",
                      "comment": "定时时间内无记录保存的自定义数据（16进制保存为字符串）",
                      "minimum": 0,
                      "maximum": 16
                    },
                    "FltNum": {
                      "type": "integer",
                      "comment": "过滤条件数",
                      "minimum": 0,
                      "maximum": 256
                    },
                    "FltCon": {
                      "type": "array",
                      "comment": "过滤条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "Quota": {
              "type": "object",
              "comment": "存储空间分配",
              "nickname": "存储空间分配",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                }
              }
            },
            "GPSRec": {
              "type": "object",
              "comment": "GPS记录配置",
              "nickname": "GPS记录配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "GPS记录使能（1：使能/0：失能）",
                  "enum": [
                    0,
                    1
                  ]
                },
                "Type": {
                  "type": "integer",
                  "comment": "定位系统类型（0：自动选择/1：北斗/2：GPS）",
                  "enum": [
                    0,
                    1,
                    2
                  ]
                },
                "Period": {
                  "type": "integer",
                  "comment": "记录周期（s）",
                  "minimum": 1,
                  "maximum": 1800
                }
              }
            },
            "SMS": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "SMS0": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS1": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS2": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS3": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS4": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS5": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "Net": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "Net0": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net1": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net2": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                }
              }
            },
            "NetFlt": {
              "type": "object",
              "comment": "无线过滤配置",
              "nickname": "无线过滤配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "无线传输加密使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "FltNum": {
                  "type": "integer",
                  "comment": "触发条件数",
                  "minimum": 1,
                  "maximum": 256
                },
                "FltCon": {
                  "type": "array",
                  "comment": "触发条件列表",
                  "minItems": 1,
                  "maxItems": 256,
                  "items": {
                    "type": "object",
                    "properties": {
                      "Chn": {
                        "type": "integer",
                        "comment": "通道号",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Type": {
                        "type": "integer",
                        "comment": "过滤记录类型（0：ID滤波/1：时间段滤波）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Op": {
                        "type": "integer",
                        "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ]
                      },
                      "Ext": {
                        "type": "integer",
                        "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "IdS": {
                        "type": "integer",
                        "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      },
                      "IdL": {
                        "type": "integer",
                        "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      }
                    }
                  }
                }
              }
            },
            "NetGen": {
              "type": "object",
              "comment": "无线通用配置",
              "nickname": "无线通用配置",
              "properties": {
                "Times": {
                  "type": "integer",
                  "comment": "断网续传次数",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                },
                "Proto": {
                  "type": "integer",
                  "comment": "加密协议编号",
                  "enum": [
                    0,
                    1
                  ]
                },
                "SendIdEn": {
                  "type": "integer",
                  "comment": "网络数据携带设备ID和绝对时间戳使能",
                  "enum": [
                    0,
                    1
                  ]
                },
                "NetLogEn": {
                  "type": "integer",
                  "comment": "网络调试日志使能",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "IotEn": {
              "type": "object",
              "comment": "实时数据上传使能",
              "nickname": "实时数据上传使能",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            }
          }
        },
        "SDStat": {
          "comment": "SD卡状态,0-SD卡未插入，1-SD卡插入，2-设备记录中，-1-设备无SD卡",
          "nickname": "SD卡状态",
          "type": "number",
          "format": "int",
          "enum": [
            0,
            1,
            2,
            -1
          ]
        },
        "FwVer": {
          "comment": "固件版本号, 如：V1.00",
          "nickname": "固件版本号",
          "type": "string"
        },
        "HwVer": {
          "comment": "硬件版本号, 如：V1.00",
          "nickname": "硬件版本号",
          "type": "string"
        },
        "Serial": {
          "comment": "产品序列号, 8字符",
          "nickname": "产品序列号",
          "type": "string"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "StartRec": {
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "启动记录",
          "comment": "启动记录"
        },
        "StopRec": {
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "停止记录",
          "comment": "停止记录"
        },
        "ClrDev": {
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "清空设备",
          "comment": "清空设备"
        },
        "GetRecFileInfo": {
          "args": {
            "RecType": {
              "type": "string",
              "required": false,
              "nickname": "数据类型",
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN"
            },
            "StartTime": {
              "format": "int",
              "type": "number",
              "nickname": "起始时间戳",
              "comment": "起始时间戳"
            },
            "StopTime": {
              "format": "int",
              "type": "number",
              "nickname": "结束时间戳",
              "comment": "结束时间戳"
            }
          },
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "获取文件列表",
          "comment": "获取文件列表信息"
        },
        "GetRecFile": {
          "args": {
            "RecType": {
              "format": "int",
              "type": "number",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ],
              "nickname": "数据类型",
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN"
            },
            "Name": {
              "type": "string",
              "nickname": "文件名",
              "comment": "文件名"
            },
            "Offset": {
              "format": "int",
              "type": "number",
              "nickname": "文件偏移",
              "comment": "文件偏移"
            },
            "Tag": {
              "format": "int",
              "type": "number",
              "nickname": "文件标签",
              "comment": "本次传输文件标签"
            }
          },
          "cmdtype": true,
          "nickname": "获取记录文件",
          "comment": "获取记录文件"
        },
        "CancelGetRec": {
          "args": {
            "RecType": {
              "format": "int",
              "type": "number",
              "nickname": "数据类型",
              "comment": "指定数据类型"
            }
          },
          "cmdtype": true,
          "comment": "取消传输"
        },
        "set_config": {
          "cmdtype": true,
          "nickname": "配置设备参数",
          "comment": "配置设备参数，与具体的设备有关"
        },
        "sync_time": {
          "args": {
            "time": {
              "type": "number",
              "required": true,
              "nickname": "时间"
            }
          },
          "cmdtype": true,
          "nickname": "同步时间",
          "comment": "同步时间"
        },
        "notify_upgrade": {
          "args": {
            "devtype": {
              "type": "string",
              "required": true,
              "nickname": "设备类型"
            },
            "version": {
              "type": "string",
              "required": true,
              "nickname": "固件版本"
            },
            "url": {
              "type": "string",
              "required": true,
              "nickname": "固件url"
            }
          },
          "cmdtype": true,
          "nickname": "通知设备有新固件",
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件"
        },
        "exec_upgrade": {
          "args": {
            "devtype": {
              "type": "string",
              "required": true,
              "nickname": "设备类型"
            },
            "version": {
              "type": "string",
              "required": true,
              "nickname": "固件版本"
            },
            "url": {
              "type": "string",
              "required": true,
              "nickname": "固件url"
            }
          },
          "cmdtype": true,
          "nickname": "通知设备更新固件",
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件"
        },
        "req_report": {
          "cmdtype": true,
          "nickname": "上报最新数据",
          "comment": "要求设备上报最新数据。"
        },
        "pass_through": {
          "args": {
            "format": {
              "type": "string",
              "required": true,
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "nickname": "编码格式",
              "comment": "编码格式"
            },
            "raw": {
              "type": "string",
              "required": true,
              "nickname": "数据",
              "comment": "数据"
            }
          },
          "show_frontend": true,
          "cmdtype": true,
          "nickname": "透传命令",
          "comment": "透传命令"
        }
      },
      "warnings": {
        "RecFull": {
          "comment": "记录满",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        }
      },
      "errors": {
        "err": {
          "comment": "CAN总线错误",
          "args": {
            "chn": {
              "comment": "CAN错误通道",
              "type": "number",
              "format": "int"
            },
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "err_code": {
              "comment": "错误码",
              "type": "number",
              "format": "int"
            }
          }
        },
        "storge_err": {
          "comment": "存储状态异常",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "gps_err": {
          "comment": "GPS不在指定GPS区域",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "type": {
              "comment": "告警类型：1：短信通知设置的告警，2：DO输出设置的告警",
              "type": "number",
              "format": "int"
            },
            "longitude": {
              "comment": "经度",
              "type": "number",
              "format": "float"
            },
            "latitude": {
              "comment": "纬度",
              "type": "number",
              "format": "float"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1,
          "num": -1
        },
        "options": {
          "unique": true
        }
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.01171875,
    "devices_size": 0.08203125,
    "event_size": 0.01171875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1568874135,
    "devtypeid": "5d831e97b137e8d9929fb9cc",
    "devices": {
      "count": 1
    },
    "uri": "/v1/devices/devtype/candtu-200"
  },
  {
    "devtype": "CANDTU200",
    "basetype": "candtu-200",
    "comment": "sssss",
    "schema": {
      "memo": {
        "desc": {
          "comment": "两路CAN-bus数据记录仪",
          "maxLength": 1024,
          "type": "string"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 31,
          "minLength": 1,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "time": {
          "nickname": "时间",
          "format": "float",
          "type": "number"
        },
        "id": {
          "nickname": "CAN帧ID",
          "format": "float",
          "type": "number"
        },
        "flag": {
          "nickname": "报文标志",
          "format": "float",
          "type": "number"
        },
        "ch": {
          "nickname": "通道",
          "format": "float",
          "type": "number"
        },
        "len": {
          "nickname": "数据长度",
          "format": "float",
          "type": "number"
        },
        "data": {
          "nickname": "数据内容",
          "type": "object"
        }
      },
      "status": {
        "devname": {
          "comment": "设备名, ASCII字符, 最长31个字符",
          "nickname": "设备名",
          "type": "string",
          "minimum": 1,
          "maximum": 31
        },
        "model": {
          "comment": "设备型号",
          "nickname": "设备型号",
          "type": "string",
          "enums": [
            "CANDTU-200UWG",
            "CANDTU-200UWGR",
            "CANDTU-200UWGR-B"
          ]
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "nickname": "GPS信息时间戳"
            }
          }
        },
        "CfgInfo": {
          "comment": "CANDTU配置",
          "type": "object",
          "nickname": "CANDTU配置",
          "properties": {
            "CAN": {
              "type": "object",
              "comment": "CAN配置",
              "nickname": "CAN配置",
              "properties": {
                "CAN0": {
                  "type": "object",
                  "comment": "CAN0配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                },
                "CAN1": {
                  "type": "object",
                  "comment": "CAN1配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                }
              }
            },
            "LIN": {
              "type": "object",
              "comment": "LIN配置",
              "nickname": "LIN配置",
              "properties": {
                "LIN0": {
                  "type": "object",
                  "comment": "LIN配置",
                  "nickname": "LIN配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Baud": {
                      "type": "integer",
                      "comment": "LIN波特率",
                      "minimum": 1000,
                      "maximum": 20000
                    },
                    "DataLen": {
                      "type": "integer",
                      "comment": "LIN数据长度",
                      "minimum": 1,
                      "maximum": 8
                    }
                  }
                }
              }
            },
            "DI": {
              "type": "object",
              "comment": "DI配置",
              "nickname": "DI配置",
              "properties": {
                "DI0": {
                  "type": "object",
                  "comment": "DI配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "DI功能",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Interval": {
                      "type": "integer",
                      "comment": "DI记录间隔(ms)，DI功能为输入时有效",
                      "enum": [
                        1,
                        2,
                        5,
                        10,
                        20,
                        50,
                        100,
                        200,
                        500,
                        1000
                      ]
                    }
                  }
                }
              }
            },
            "DO": {
              "type": "object",
              "comment": "DO配置",
              "nickname": "DO配置",
              "properties": {
                "DO0": {
                  "type": "object",
                  "comment": "DO配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "告警条件，1：记录满，2：总线错误，3：存储状态异常，4：GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Output": {
                      "type": "integer",
                      "comment": "DO告警时输出值",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "DO告警GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "DO告警GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "DO告警GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "DO告警GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "RecCfg": {
              "type": "object",
              "comment": "CANDTU记录配置",
              "nickname": "CANDTU记录配置",
              "properties": {
                "RecFullHdl": {
                  "type": "integer",
                  "comment": "存储空间满处理(0:循环记录/1：停止记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecFSize": {
                  "type": "integer",
                  "comment": "最大记录文件大小(MB)",
                  "minimum": 2,
                  "maximum": 512
                },
                "RecErr": {
                  "type": "integer",
                  "comment": "是否记录CAN错误帧(0:不记录/1：记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecMer": {
                  "type": "integer",
                  "comment": "通道记录数据是否合并(0：不合并/1:合并)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "TrgMode": {
              "type": "object",
              "comment": "CANDTU记录触发模式配置",
              "nickname": "CANDTU记录触发模式配置",
              "properties": {
                "RecMode": {
                  "type": "integer",
                  "comment": "CAN记录模式(0：长时间记录/1:条件记录/2：预触发记录/3：定时记录/4：不记录)",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                },
                "ConRec": {
                  "type": "object",
                  "comment": "条件记录配置对象",
                  "properties": {
                    "StartChn": {
                      "type": "integer",
                      "comment": "开始记录通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartExt": {
                      "type": "integer",
                      "comment": "开始记录帧类型（0：标准帧/1:扩展帧）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartOp": {
                      "type": "integer",
                      "comment": "开始记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StartIdS": {
                      "type": "integer",
                      "comment": "开始记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StartIdL": {
                      "type": "integer",
                      "comment": "开始记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopChn": {
                      "type": "integer",
                      "comment": "停止记录通道号,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopExt": {
                      "type": "integer",
                      "comment": "停止记录帧类型（0：标准帧/1:扩展帧),标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopOp": {
                      "type": "integer",
                      "comment": "停止记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StopIdS": {
                      "type": "integer",
                      "comment": "停止记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopIdL": {
                      "type": "integer",
                      "comment": "停止记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    }
                  }
                },
                "PreTrgRec": {
                  "type": "object",
                  "comment": "预触发记录配置对象",
                  "properties": {
                    "PreVal": {
                      "type": "integer",
                      "comment": "预触发记录帧数",
                      "minimum": 10,
                      "maximum": 100000
                    },
                    "PostVal": {
                      "type": "integer",
                      "comment": "触发后记录时间(ms)",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TrgNum": {
                      "type": "integer",
                      "comment": "触发条件数",
                      "minimum": 1,
                      "maximum": 512
                    },
                    "TrgCon": {
                      "type": "array",
                      "comment": "触发条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                },
                "TimRec": {
                  "type": "object",
                  "comment": "定时记录配置对象",
                  "properties": {
                    "Period": {
                      "type": "object",
                      "comment": "定时时间周期（ms）",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TmNDA": {
                      "type": "object",
                      "comment": "定时时间内无数据记录方式（0：不记录/1：保存最近一次数据/2：保存自定义数据）",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "TmNDAUD": {
                      "type": "string",
                      "comment": "定时时间内无记录保存的自定义数据（16进制保存为字符串）",
                      "minimum": 0,
                      "maximum": 16
                    },
                    "FltNum": {
                      "type": "integer",
                      "comment": "过滤条件数",
                      "minimum": 0,
                      "maximum": 256
                    },
                    "FltCon": {
                      "type": "array",
                      "comment": "过滤条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "Quota": {
              "type": "object",
              "comment": "存储空间分配",
              "nickname": "存储空间分配",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                }
              }
            },
            "GPSRec": {
              "type": "object",
              "comment": "GPS记录配置",
              "nickname": "GPS记录配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "GPS记录使能（1：使能/0：失能）",
                  "enum": [
                    0,
                    1
                  ]
                },
                "Type": {
                  "type": "integer",
                  "comment": "定位系统类型（0：自动选择/1：北斗/2：GPS）",
                  "enum": [
                    0,
                    1,
                    2
                  ]
                },
                "Period": {
                  "type": "integer",
                  "comment": "记录周期（s）",
                  "minimum": 1,
                  "maximum": 1800
                }
              }
            },
            "SMS": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "SMS0": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS1": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS2": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS3": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS4": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS5": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "Net": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "Net0": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net1": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net2": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                }
              }
            },
            "NetFlt": {
              "type": "object",
              "comment": "无线过滤配置",
              "nickname": "无线过滤配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "无线传输加密使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "FltNum": {
                  "type": "integer",
                  "comment": "触发条件数",
                  "minimum": 1,
                  "maximum": 256
                },
                "FltCon": {
                  "type": "array",
                  "comment": "触发条件列表",
                  "minItems": 1,
                  "maxItems": 256,
                  "items": {
                    "type": "object",
                    "properties": {
                      "Chn": {
                        "type": "integer",
                        "comment": "通道号",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Type": {
                        "type": "integer",
                        "comment": "过滤记录类型（0：ID滤波/1：时间段滤波）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Op": {
                        "type": "integer",
                        "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ]
                      },
                      "Ext": {
                        "type": "integer",
                        "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "IdS": {
                        "type": "integer",
                        "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      },
                      "IdL": {
                        "type": "integer",
                        "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      }
                    }
                  }
                }
              }
            },
            "NetGen": {
              "type": "object",
              "comment": "无线通用配置",
              "nickname": "无线通用配置",
              "properties": {
                "Times": {
                  "type": "integer",
                  "comment": "断网续传次数",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                },
                "Proto": {
                  "type": "integer",
                  "comment": "加密协议编号",
                  "enum": [
                    0,
                    1
                  ]
                },
                "SendIdEn": {
                  "type": "integer",
                  "comment": "网络数据携带设备ID和绝对时间戳使能",
                  "enum": [
                    0,
                    1
                  ]
                },
                "NetLogEn": {
                  "type": "integer",
                  "comment": "网络调试日志使能",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "IotEn": {
              "type": "object",
              "comment": "实时数据上传使能",
              "nickname": "实时数据上传使能",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            }
          }
        },
        "SDStat": {
          "comment": "SD卡状态,0-SD卡未插入，1-SD卡插入，2-设备记录中，-1-设备无SD卡",
          "nickname": "SD卡状态",
          "type": "number",
          "format": "int",
          "enum": [
            0,
            1,
            2,
            -1
          ]
        },
        "FwVer": {
          "comment": "固件版本号, 如：V1.00",
          "nickname": "固件版本号",
          "type": "string"
        },
        "HwVer": {
          "comment": "硬件版本号, 如：V1.00",
          "nickname": "硬件版本号",
          "type": "string"
        },
        "Serial": {
          "comment": "产品序列号, 8字符",
          "nickname": "产品序列号",
          "type": "string"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "StartRec": {
          "comment": "启动记录",
          "nickname": "启动记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "StopRec": {
          "comment": "停止记录",
          "nickname": "停止记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "ClrDev": {
          "comment": "清空设备",
          "nickname": "清空设备",
          "cmdtype": true,
          "show_frontend": true
        },
        "GetRecFileInfo": {
          "comment": "获取文件列表信息",
          "nickname": "获取文件列表",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "StartTime": {
              "comment": "起始时间戳",
              "nickname": "起始时间戳",
              "type": "number",
              "format": "int"
            },
            "StopTime": {
              "comment": "结束时间戳",
              "nickname": "结束时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "GetRecFile": {
          "comment": "获取记录文件",
          "nickname": "获取记录文件",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "Name": {
              "comment": "文件名",
              "nickname": "文件名",
              "type": "string"
            },
            "Offset": {
              "comment": "文件偏移",
              "nickname": "文件偏移",
              "type": "number",
              "format": "int"
            },
            "Tag": {
              "comment": "本次传输文件标签",
              "nickname": "文件标签",
              "type": "number",
              "format": "int"
            }
          }
        },
        "CancelGetRec": {
          "comment": "取消传输",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型",
              "nickname": "数据类型",
              "type": "number",
              "format": "int"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "RecFull": {
          "comment": "记录满",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        }
      },
      "errors": {
        "err": {
          "comment": "CAN总线错误",
          "args": {
            "chn": {
              "comment": "CAN错误通道",
              "type": "number",
              "format": "int"
            },
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "err_code": {
              "comment": "错误码",
              "type": "number",
              "format": "int"
            }
          }
        },
        "storge_err": {
          "comment": "存储状态异常",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "gps_err": {
          "comment": "GPS不在指定GPS区域",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "type": {
              "comment": "告警类型：1：短信通知设置的告警，2：DO输出设置的告警",
              "type": "number",
              "format": "int"
            },
            "longitude": {
              "comment": "经度",
              "type": "number",
              "format": "float"
            },
            "latitude": {
              "comment": "纬度",
              "type": "number",
              "format": "float"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1,
          "num": -1
        },
        "options": {
          "unique": true
        }
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "891f0000-daa5-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568874011,
    "devtypeid": "5d831e1bb137e885bb9fb619",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/CANDTU200"
  },
  {
    "devtype": "demo",
    "basetype": "demo",
    "enable_secret": false,
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "temp": {
          "comment": "温度",
          "format": "float",
          "type": "number"
        }
      },
      "status": {
        "sw_version": {
          "comment": "software version",
          "format": "float",
          "type": "number"
        },
        "settings": {
          "comment": "settings",
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "age": {
              "description": "Age in years",
              "type": "integer",
              "minimum": 0
            }
          },
          "required": [
            "firstName",
            "lastName"
          ]
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set_report_interval": {
          "comment": "设置上报温度时间间隔",
          "cmdtype": true,
          "args": {
            "value": {
              "type": "number",
              "format": "int",
              "comment": "单位为秒。"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "temperature_normal": {
          "comment": "工作温度正常",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.046875,
    "devices_size": 0.10546875,
    "event_size": 0.046875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1568860339,
    "comment": "sksjdj555",
    "devtypeid": "5d82e8b3b137e81bcb9e1fb3",
    "devices": {
      "count": 4
    },
    "uri": "/v1/devices/devtype/demo"
  },
  {
    "devtype": "zlg001linkwan",
    "basetype": "demo",
    "comment": "LinkWan手持网络分析仪",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "position": {
          "comment": "坐标",
          "format": "json",
          "type": "object"
        },
        "testResult": {
          "comment": "test结果",
          "format": "json",
          "type": "object"
        },
        "pictureId": {
          "comment": "图片id",
          "format": "name",
          "type": "string"
        },
        "pointType": {
          "comment": "点类型",
          "format": "name",
          "type": "string"
        },
        "pointId": {
          "comment": "点id",
          "format": "name",
          "type": "string"
        },
        "testLevel": {
          "comment": "test等级",
          "format": "name",
          "type": "number"
        },
        "pointName": {
          "comment": "名称",
          "format": "name",
          "type": "string"
        },
        "testSetting": {
          "comment": "test设置",
          "format": "json",
          "type": "object"
        }
      },
      "status": {
        "appeui": {
          "type": "string",
          "comment": "应用唯一识别码"
        },
        "appskey": {
          "type": "string",
          "comment": "ABP模式下的应用密钥"
        },
        "sendByte": {
          "type": "number",
          "comment": "发送字节数"
        },
        "antennaGain": {
          "type": "number",
          "comment": "天线增益"
        },
        "deviceType": {
          "type": "string",
          "comment": "设备类型"
        },
        "bandmask": {
          "type": "string",
          "comment": "使用频段"
        },
        "addr": {
          "type": "string",
          "comment": "ABP模式下的设备地址"
        },
        "mode": {
          "type": "string",
          "comment": "入网方式"
        },
        "devname": {
          "type": "string",
          "comment": "设备名"
        },
        "freqtype": {
          "type": "number",
          "comment": "频段模式"
        },
        "power": {
          "type": "number",
          "comment": "发送功率"
        },
        "appkey": {
          "type": "string",
          "comment": "应用密钥"
        },
        "deveui": {
          "type": "string",
          "comment": "设备唯一识别码"
        },
        "dr": {
          "type": "number",
          "comment": "发送速率"
        },
        "class": {
          "type": "string",
          "comment": "设备类型"
        },
        "nwkskey": {
          "type": "string",
          "comment": "ABP模式下的网络密钥"
        }
      },
      "commands": {
        "set_report_interval": {
          "comment": "设置上报温度时间间隔",
          "cmdtype": true,
          "args": {
            "value": {
              "type": "number",
              "format": "int",
              "comment": "单位为秒。"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "temperature_normal": {
          "comment": "工作温度正常",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "e895e7a0-da83-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568859568,
    "devtypeid": "5d82e5b0b137e80a369e08d4",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/zlg001linkwan"
  },
  {
    "devtype": "zlg001lorawan",
    "basetype": "demo",
    "comment": "LoRaWan手持网络分析仪",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "position": {
          "comment": "坐标",
          "format": "json",
          "type": "object"
        },
        "testResult": {
          "comment": "test结果",
          "format": "json",
          "type": "object"
        },
        "pictureId": {
          "comment": "图片id",
          "type": "string"
        },
        "pointType": {
          "comment": "点类型",
          "type": "string"
        },
        "pointId": {
          "comment": "点id",
          "type": "string"
        },
        "testLevel": {
          "comment": "test等级",
          "format": "name",
          "type": "number"
        },
        "pointName": {
          "comment": "名称",
          "type": "string"
        },
        "testSetting": {
          "comment": "test设置",
          "format": "json",
          "type": "object"
        }
      },
      "status": {
        "appeui": {
          "type": "string",
          "comment": "应用唯一识别码"
        },
        "appskey": {
          "type": "string",
          "comment": "ABP模式下的应用密钥"
        },
        "LRCHMASK": {
          "type": "string",
          "comment": "上行频点"
        },
        "sendByte": {
          "type": "number",
          "comment": "发送字节数"
        },
        "antennaGain": {
          "type": "number",
          "comment": "天线增益"
        },
        "deviceType": {
          "type": "string",
          "comment": "设备类型"
        },
        "band": {
          "type": "string",
          "comment": "使用频段"
        },
        "addr": {
          "type": "string",
          "comment": "ABP模式下的设备地址"
        },
        "mode": {
          "type": "string",
          "comment": "入网方式"
        },
        "devname": {
          "type": "string",
          "comment": "设备名"
        },
        "power": {
          "type": "number",
          "comment": "发送功率"
        },
        "dr": {
          "type": "number",
          "comment": "发送速率"
        },
        "appkey": {
          "type": "string",
          "comment": "应用密钥"
        },
        "deveui": {
          "type": "string",
          "comment": "设备唯一识别码"
        },
        "class": {
          "type": "string",
          "comment": "设备类型"
        },
        "nwkskey": {
          "type": "string",
          "comment": "ABP模式下的网络密钥"
        }
      },
      "commands": {
        "set_report_interval": {
          "comment": "设置上报温度时间间隔",
          "cmdtype": true,
          "args": {
            "value": {
              "type": "number",
              "format": "int",
              "comment": "单位为秒。"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "temperature_normal": {
          "comment": "工作温度正常",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.0234375,
    "devices_size": 0.10546875,
    "event_size": 0.0234375,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "e896f910-da83-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568859568,
    "devtypeid": "5d82e5b0b137e85aeb9e08d5",
    "devices": {
      "count": 2
    },
    "uri": "/v1/devices/devtype/zlg001lorawan"
  },
  {
    "devtype": "zlg001zigbee",
    "basetype": "demo",
    "comment": "ZigBee手持网络分析仪",
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "position": {
          "comment": "坐标",
          "format": "json",
          "type": "object"
        },
        "testResult": {
          "comment": "test结果",
          "format": "json",
          "type": "object"
        },
        "pictureId": {
          "comment": "图片id",
          "format": "name",
          "type": "string"
        },
        "pointType": {
          "comment": "点类型",
          "format": "name",
          "type": "string"
        },
        "pointId": {
          "comment": "点id",
          "format": "name",
          "type": "string"
        },
        "testLevel": {
          "comment": "test等级",
          "format": "name",
          "type": "number"
        },
        "pointName": {
          "comment": "名称",
          "format": "name",
          "type": "string"
        },
        "testSetting": {
          "comment": "test设置",
          "format": "json",
          "type": "object"
        }
      },
      "status": {
        "dstIEEE": {
          "type": "string",
          "comment": "目标MAC地址"
        },
        "antennaGain": {
          "type": "string",
          "comment": "天线增益"
        },
        "moduleKey": {
          "type": "string",
          "comment": "设备密钥"
        },
        "dstAddr": {
          "type": "string",
          "comment": "目标网络地址"
        },
        "deviceType": {
          "type": "string",
          "comment": "设备类型"
        },
        "devname": {
          "type": "string",
          "comment": "设备名"
        },
        "myAddr": {
          "type": "string",
          "comment": "本地网络地址"
        },
        "chan": {
          "type": "string",
          "comment": "设备通道号"
        },
        "panId": {
          "type": "string",
          "comment": "设备网络号"
        },
        "devType": {
          "type": "string",
          "comment": "zigbee设备类型"
        },
        "addr_type": {
          "type": "number",
          "comment": "目标地址类型"
        },
        "powerLevel": {
          "type": "string",
          "comment": "发送功率"
        }
      },
      "commands": {
        "set_report_interval": {
          "comment": "设置上报温度时间间隔",
          "cmdtype": true,
          "args": {
            "value": {
              "type": "number",
              "format": "int",
              "comment": "单位为秒。"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "temperature_normal": {
          "comment": "工作温度正常",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.05859375,
    "devices_size": 0.10546875,
    "event_size": 0.03515625,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "e8987fb0-da83-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568859568,
    "devtypeid": "5d82e5b0b137e827dc9e08d6",
    "devices": {
      "count": 3
    },
    "uri": "/v1/devices/devtype/zlg001zigbee"
  },
  {
    "devtype": "sasdasdA",
    "basetype": "candtu-200",
    "comment": "s2222",
    "schema": {
      "memo": {
        "desc": {
          "comment": "两路CAN-bus数据记录仪",
          "maxLength": 1024,
          "type": "string"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 31,
          "minLength": 1,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "time": {
          "nickname": "时间",
          "format": "float",
          "type": "number"
        },
        "id": {
          "nickname": "CAN帧ID",
          "format": "float",
          "type": "number"
        },
        "flag": {
          "nickname": "报文标志",
          "format": "float",
          "type": "number"
        },
        "ch": {
          "nickname": "通道",
          "format": "float",
          "type": "number"
        },
        "len": {
          "nickname": "数据长度",
          "format": "float",
          "type": "number"
        },
        "data": {
          "nickname": "数据内容",
          "type": "object"
        }
      },
      "status": {
        "devname": {
          "comment": "设备名, ASCII字符, 最长31个字符",
          "nickname": "设备名",
          "type": "string",
          "minimum": 1,
          "maximum": 31
        },
        "model": {
          "comment": "设备型号",
          "nickname": "设备型号",
          "type": "string",
          "enums": [
            "CANDTU-200UWG",
            "CANDTU-200UWGR",
            "CANDTU-200UWGR-B"
          ]
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "nickname": "GPS信息时间戳"
            }
          }
        },
        "CfgInfo": {
          "comment": "CANDTU配置",
          "type": "object",
          "nickname": "CANDTU配置",
          "properties": {
            "CAN": {
              "type": "object",
              "comment": "CAN配置",
              "nickname": "CAN配置",
              "properties": {
                "CAN0": {
                  "type": "object",
                  "comment": "CAN0配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                },
                "CAN1": {
                  "type": "object",
                  "comment": "CAN1配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "CAN通道",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "ResEn": {
                      "type": "integer",
                      "comment": "终端电阻使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Mode": {
                      "type": "integer",
                      "comment": "CAN工作模式：正常模式(0)/只听模式(1)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "BpsBrp": {
                      "type": "integer",
                      "comment": "CAN波特率BRP",
                      "minimum": 1,
                      "maximum": 255
                    },
                    "BpsSjw": {
                      "type": "integer",
                      "comment": "CAN波特率Sjw",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "BpsSeg1": {
                      "type": "integer",
                      "comment": "CAN波特率Seg1",
                      "minimum": 3,
                      "maximum": 14
                    },
                    "BpsSeg2": {
                      "type": "integer",
                      "comment": "CAN波特率Seg2",
                      "minimum": 1,
                      "maximum": 7
                    },
                    "BpsSmp": {
                      "type": "integer",
                      "comment": "CAN波特率Smp",
                      "enum": [
                        0
                      ]
                    },
                    "FltFmat": {
                      "type": "integer",
                      "comment": "CAN滤波格式",
                      "enum": [
                        0
                      ]
                    },
                    "Flt": {
                      "type": "array",
                      "comment": "CAN滤波表",
                      "minItems": 8,
                      "maxItems": 8,
                      "items": {
                        "type": "object",
                        "properties": {
                          "Mask": {
                            "type": "integer",
                            "comment": "CAN滤波屏蔽码"
                          },
                          "Acc": {
                            "type": "integer",
                            "comment": "CAN滤波过滤码"
                          }
                        }
                      }
                    },
                    "clock": {
                      "type": "number",
                      "comment": "时钟"
                    }
                  }
                }
              }
            },
            "LIN": {
              "type": "object",
              "comment": "LIN配置",
              "nickname": "LIN配置",
              "properties": {
                "LIN0": {
                  "type": "object",
                  "comment": "LIN配置",
                  "nickname": "LIN配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Baud": {
                      "type": "integer",
                      "comment": "LIN波特率",
                      "minimum": 1000,
                      "maximum": 20000
                    },
                    "DataLen": {
                      "type": "integer",
                      "comment": "LIN数据长度",
                      "minimum": 1,
                      "maximum": 8
                    }
                  }
                }
              }
            },
            "DI": {
              "type": "object",
              "comment": "DI配置",
              "nickname": "DI配置",
              "properties": {
                "DI0": {
                  "type": "object",
                  "comment": "DI配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "DI功能",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Interval": {
                      "type": "integer",
                      "comment": "DI记录间隔(ms)，DI功能为输入时有效",
                      "enum": [
                        1,
                        2,
                        5,
                        10,
                        20,
                        50,
                        100,
                        200,
                        500,
                        1000
                      ]
                    }
                  }
                }
              }
            },
            "DO": {
              "type": "object",
              "comment": "DO配置",
              "nickname": "DO配置",
              "properties": {
                "DO0": {
                  "type": "object",
                  "comment": "DO配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "通道使能(1)/失能(0)",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "告警条件，1：记录满，2：总线错误，3：存储状态异常，4：GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Output": {
                      "type": "integer",
                      "comment": "DO告警时输出值",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "DO告警GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "DO告警GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "DO告警GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "DO告警GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "RecCfg": {
              "type": "object",
              "comment": "CANDTU记录配置",
              "nickname": "CANDTU记录配置",
              "properties": {
                "RecFullHdl": {
                  "type": "integer",
                  "comment": "存储空间满处理(0:循环记录/1：停止记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecFSize": {
                  "type": "integer",
                  "comment": "最大记录文件大小(MB)",
                  "minimum": 2,
                  "maximum": 512
                },
                "RecErr": {
                  "type": "integer",
                  "comment": "是否记录CAN错误帧(0:不记录/1：记录)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "RecMer": {
                  "type": "integer",
                  "comment": "通道记录数据是否合并(0：不合并/1:合并)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "TrgMode": {
              "type": "object",
              "comment": "CANDTU记录触发模式配置",
              "nickname": "CANDTU记录触发模式配置",
              "properties": {
                "RecMode": {
                  "type": "integer",
                  "comment": "CAN记录模式(0：长时间记录/1:条件记录/2：预触发记录/3：定时记录/4：不记录)",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                },
                "ConRec": {
                  "type": "object",
                  "comment": "条件记录配置对象",
                  "properties": {
                    "StartChn": {
                      "type": "integer",
                      "comment": "开始记录通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartExt": {
                      "type": "integer",
                      "comment": "开始记录帧类型（0：标准帧/1:扩展帧）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "StartOp": {
                      "type": "integer",
                      "comment": "开始记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StartIdS": {
                      "type": "integer",
                      "comment": "开始记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StartIdL": {
                      "type": "integer",
                      "comment": "开始记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopChn": {
                      "type": "integer",
                      "comment": "停止记录通道号,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopExt": {
                      "type": "integer",
                      "comment": "停止记录帧类型（0：标准帧/1:扩展帧),标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopOp": {
                      "type": "integer",
                      "comment": "停止记录条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ]
                    },
                    "StopIdS": {
                      "type": "integer",
                      "comment": "停止记录起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    },
                    "StopIdL": {
                      "type": "integer",
                      "comment": "停止记录结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                      "minimum": 0,
                      "maximum": 1073741823
                    }
                  }
                },
                "PreTrgRec": {
                  "type": "object",
                  "comment": "预触发记录配置对象",
                  "properties": {
                    "PreVal": {
                      "type": "integer",
                      "comment": "预触发记录帧数",
                      "minimum": 10,
                      "maximum": 100000
                    },
                    "PostVal": {
                      "type": "integer",
                      "comment": "触发后记录时间(ms)",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TrgNum": {
                      "type": "integer",
                      "comment": "触发条件数",
                      "minimum": 1,
                      "maximum": 512
                    },
                    "TrgCon": {
                      "type": "array",
                      "comment": "触发条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                },
                "TimRec": {
                  "type": "object",
                  "comment": "定时记录配置对象",
                  "properties": {
                    "Period": {
                      "type": "object",
                      "comment": "定时时间周期（ms）",
                      "minimum": 10,
                      "maximum": 86400000
                    },
                    "TmNDA": {
                      "type": "object",
                      "comment": "定时时间内无数据记录方式（0：不记录/1：保存最近一次数据/2：保存自定义数据）",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "TmNDAUD": {
                      "type": "string",
                      "comment": "定时时间内无记录保存的自定义数据（16进制保存为字符串）",
                      "minimum": 0,
                      "maximum": 16
                    },
                    "FltNum": {
                      "type": "integer",
                      "comment": "过滤条件数",
                      "minimum": 0,
                      "maximum": 256
                    },
                    "FltCon": {
                      "type": "array",
                      "comment": "过滤条件列表",
                      "minItems": 1,
                      "maxItems": 512,
                      "items": {
                        "type": "object",
                        "comment": "触发条件对象",
                        "properties": {
                          "Chn": {
                            "type": "integer",
                            "comment": "通道号",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "Type": {
                            "type": "integer",
                            "comment": "触发记录类型（0：ID触发/1:错误帧触发/2：按键触发/3:DI触发）",
                            "enum": [
                              0,
                              1,
                              2,
                              3
                            ]
                          },
                          "Op": {
                            "type": "integer",
                            "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                            ]
                          },
                          "Ext": {
                            "type": "integer",
                            "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                            "enum": [
                              0,
                              1
                            ]
                          },
                          "IdS": {
                            "type": "integer",
                            "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          },
                          "IdL": {
                            "type": "integer",
                            "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                            "minimum": 0,
                            "maximum": 1073741823
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "Quota": {
              "type": "object",
              "comment": "存储空间分配",
              "nickname": "存储空间分配",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS占用空间百分比",
                  "minimum": 0,
                  "maximum": 100
                }
              }
            },
            "GPSRec": {
              "type": "object",
              "comment": "GPS记录配置",
              "nickname": "GPS记录配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "GPS记录使能（1：使能/0：失能）",
                  "enum": [
                    0,
                    1
                  ]
                },
                "Type": {
                  "type": "integer",
                  "comment": "定位系统类型（0：自动选择/1：北斗/2：GPS）",
                  "enum": [
                    0,
                    1,
                    2
                  ]
                },
                "Period": {
                  "type": "integer",
                  "comment": "记录周期（s）",
                  "minimum": 1,
                  "maximum": 1800
                }
              }
            },
            "SMS": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "SMS0": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS1": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS2": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS3": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS4": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                },
                "SMS5": {
                  "type": "object",
                  "comment": "短信告警配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Func": {
                      "type": "integer",
                      "comment": "报警功能类型：1-记录满，2-CAN总线错误，4-SD卡异常，8-GPS区域告警",
                      "enum": [
                        1,
                        2,
                        4,
                        8
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Num": {
                      "type": "string",
                      "comment": "报警手机号码,12字节字符串"
                    },
                    "InOut": {
                      "type": "integer",
                      "comment": "GPS范围设置，0内部，1外部",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "Lat": {
                      "type": "integer",
                      "comment": "GPS纬度"
                    },
                    "Long": {
                      "type": "integer",
                      "comment": "GPS经度"
                    },
                    "Radius": {
                      "type": "integer",
                      "comment": "GPS中心点半径",
                      "minimum": 50,
                      "maximum": 10000
                    }
                  }
                }
              }
            },
            "Net": {
              "type": "object",
              "comment": "短信配置",
              "nickname": "短信配置",
              "properties": {
                "Net0": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net1": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                },
                "Net2": {
                  "type": "object",
                  "comment": "网络连接配置",
                  "properties": {
                    "Chn": {
                      "type": "integer",
                      "comment": "通道号",
                      "enum": [
                        0,
                        1,
                        2
                      ]
                    },
                    "Proto": {
                      "type": "integer",
                      "comment": "协议类型，0-TCP客户端",
                      "enum": [
                        0
                      ]
                    },
                    "Enable": {
                      "type": "integer",
                      "comment": "使能（1：使能/0：失能）",
                      "enum": [
                        0,
                        1
                      ]
                    },
                    "LPort": {
                      "type": "integer",
                      "comment": "本机端口",
                      "minimum": 0,
                      "maximum": 65535
                    },
                    "RAddr": {
                      "type": "string",
                      "comment": "远程IP地址,最长64字节字符串"
                    },
                    "RPort": {
                      "type": "integer",
                      "comment": "远程端口",
                      "minimum": 1,
                      "maximum": 65535
                    }
                  }
                }
              }
            },
            "NetFlt": {
              "type": "object",
              "comment": "无线过滤配置",
              "nickname": "无线过滤配置",
              "properties": {
                "Enable": {
                  "type": "integer",
                  "comment": "无线传输加密使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "FltNum": {
                  "type": "integer",
                  "comment": "触发条件数",
                  "minimum": 1,
                  "maximum": 256
                },
                "FltCon": {
                  "type": "array",
                  "comment": "触发条件列表",
                  "minItems": 1,
                  "maxItems": 256,
                  "items": {
                    "type": "object",
                    "properties": {
                      "Chn": {
                        "type": "integer",
                        "comment": "通道号",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Type": {
                        "type": "integer",
                        "comment": "过滤记录类型（0：ID滤波/1：时间段滤波）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "Op": {
                        "type": "integer",
                        "comment": "触发条件(0:等于/1:不等于/2:小于/3：小于等于/4：大于/5：大于等于/6：在范围内/7：在范围外)",
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ]
                      },
                      "Ext": {
                        "type": "integer",
                        "comment": "是否为扩展帧（0：标准帧/1：扩展帧）",
                        "enum": [
                          0,
                          1
                        ]
                      },
                      "IdS": {
                        "type": "integer",
                        "comment": "触发条件起始帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      },
                      "IdL": {
                        "type": "integer",
                        "comment": "触发条件结束帧ID,标准帧最大为0x7FF,扩展帧最大为0x3FFFFFFF",
                        "minimum": 0,
                        "maximum": 1073741823
                      }
                    }
                  }
                }
              }
            },
            "NetGen": {
              "type": "object",
              "comment": "无线通用配置",
              "nickname": "无线通用配置",
              "properties": {
                "Times": {
                  "type": "integer",
                  "comment": "断网续传次数",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                },
                "Proto": {
                  "type": "integer",
                  "comment": "加密协议编号",
                  "enum": [
                    0,
                    1
                  ]
                },
                "SendIdEn": {
                  "type": "integer",
                  "comment": "网络数据携带设备ID和绝对时间戳使能",
                  "enum": [
                    0,
                    1
                  ]
                },
                "NetLogEn": {
                  "type": "integer",
                  "comment": "网络调试日志使能",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            },
            "IotEn": {
              "type": "object",
              "comment": "实时数据上传使能",
              "nickname": "实时数据上传使能",
              "properties": {
                "CAN0": {
                  "type": "integer",
                  "comment": "CAN0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "CAN1": {
                  "type": "integer",
                  "comment": "CAN1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "GPS": {
                  "type": "integer",
                  "comment": "GPS数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "LIN0": {
                  "type": "integer",
                  "comment": "LIN数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI0": {
                  "type": "integer",
                  "comment": "DI0数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                },
                "DI1": {
                  "type": "integer",
                  "comment": "DI1数据上传使能(1:使能/0：失能)",
                  "enum": [
                    0,
                    1
                  ]
                }
              }
            }
          }
        },
        "SDStat": {
          "comment": "SD卡状态,0-SD卡未插入，1-SD卡插入，2-设备记录中，-1-设备无SD卡",
          "nickname": "SD卡状态",
          "type": "number",
          "format": "int",
          "enum": [
            0,
            1,
            2,
            -1
          ]
        },
        "FwVer": {
          "comment": "固件版本号, 如：V1.00",
          "nickname": "固件版本号",
          "type": "string"
        },
        "HwVer": {
          "comment": "硬件版本号, 如：V1.00",
          "nickname": "硬件版本号",
          "type": "string"
        },
        "Serial": {
          "comment": "产品序列号, 8字符",
          "nickname": "产品序列号",
          "type": "string"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "StartRec": {
          "comment": "启动记录",
          "nickname": "启动记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "StopRec": {
          "comment": "停止记录",
          "nickname": "停止记录",
          "cmdtype": true,
          "show_frontend": true
        },
        "ClrDev": {
          "comment": "清空设备",
          "nickname": "清空设备",
          "cmdtype": true,
          "show_frontend": true
        },
        "GetRecFileInfo": {
          "comment": "获取文件列表信息",
          "nickname": "获取文件列表",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "StartTime": {
              "comment": "起始时间戳",
              "nickname": "起始时间戳",
              "type": "number",
              "format": "int"
            },
            "StopTime": {
              "comment": "结束时间戳",
              "nickname": "结束时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "GetRecFile": {
          "comment": "获取记录文件",
          "nickname": "获取记录文件",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型, 0-CAN0, 1-CAN1, 16-GPS, 32-LIN, 48-DI, 240-合并CAN",
              "nickname": "数据类型",
              "type": "number",
              "format": "int",
              "enum": [
                0,
                1,
                16,
                32,
                48,
                240
              ]
            },
            "Name": {
              "comment": "文件名",
              "nickname": "文件名",
              "type": "string"
            },
            "Offset": {
              "comment": "文件偏移",
              "nickname": "文件偏移",
              "type": "number",
              "format": "int"
            },
            "Tag": {
              "comment": "本次传输文件标签",
              "nickname": "文件标签",
              "type": "number",
              "format": "int"
            }
          }
        },
        "CancelGetRec": {
          "comment": "取消传输",
          "cmdtype": true,
          "args": {
            "RecType": {
              "comment": "指定数据类型",
              "nickname": "数据类型",
              "type": "number",
              "format": "int"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "RecFull": {
          "comment": "记录满",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        }
      },
      "errors": {
        "err": {
          "comment": "CAN总线错误",
          "args": {
            "chn": {
              "comment": "CAN错误通道",
              "type": "number",
              "format": "int"
            },
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "err_code": {
              "comment": "错误码",
              "type": "number",
              "format": "int"
            }
          }
        },
        "storge_err": {
          "comment": "存储状态异常",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "gps_err": {
          "comment": "GPS不在指定GPS区域",
          "args": {
            "time": {
              "comment": "错误发生时间戳",
              "type": "number",
              "format": "int"
            },
            "type": {
              "comment": "告警类型：1：短信通知设置的告警，2：DO输出设置的告警",
              "type": "number",
              "format": "int"
            },
            "longitude": {
              "comment": "经度",
              "type": "number",
              "format": "float"
            },
            "latitude": {
              "comment": "纬度",
              "type": "number",
              "format": "float"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1,
          "num": -1
        },
        "options": {
          "unique": true
        }
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.01171875,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "108bce80-d9fa-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568800365,
    "devtypeid": "5d81fe6db137e83b3a97fd28",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/sasdasdA"
  },
  {
    "devtype": "ClassB_",
    "basetype": "LoRaWAN_CLASSB_OTAA",
    "comment": "",
    "lora_deviceprofile_id": "2d2fac91-00ad-4417-b5f3-064e629a66bf",
    "schema": {
      "memo": {
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 16,
          "maxLength": 16,
          "comment": "lorawan设备id，8字节16进制字符串"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 2,
          "max": 2,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "mqttadapter": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "required": true,
          "comment": "loraserver mqtt转换为何种zlgcloud mqtt：转为STR_TOPIC_REPORT_RAW(0)，转为STR_TOPIC_REPORT_DATA(1);请根据需要设置min=max=0，或min=max=1"
        },
        "appKey": {
          "type": "string",
          "minLength": 32,
          "maxLength": 32,
          "comment": "OTAA使用的appKey,16字节16进制字符串"
        },
        "nwkKey": {
          "type": "string",
          "minLength": 32,
          "maxLength": 32,
          "required": true,
          "comment": "OTAA使用的nwkKey,16字节16进制字符串"
        },
        "appEUI": {
          "type": "string",
          "minLength": 16,
          "maxLength": 16,
          "required": true,
          "comment": "OTAA使用的appEUI,8字节16进制字符串"
        },
        "skipFCntCheck": {
          "type": "boolean",
          "comment": "默认为true"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "desc": {
          "comment": "设备备注",
          "maxLength": 1024,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {
        "deviceProfile": {
          "classBTimeout": 2,
          "classCTimeout": 0,
          "factoryPresetFreqs": [
            0
          ],
          "id": "",
          "macVersion": "1.0.1",
          "maxDutyCycle": 0,
          "maxEIRP": 0,
          "name": "zlg001_ClassB_",
          "networkServerID": "",
          "organizationID": "",
          "pingSlotDR": 5,
          "pingSlotFreq": 0,
          "pingSlotPeriod": 256,
          "regParamsRevision": "A",
          "rfRegion": "CN_470_510",
          "rxDROffset1": 0,
          "rxDataRate2": 0,
          "rxDelay1": 1,
          "rxFreq2": 505300000,
          "supports32BitFCnt": true,
          "supportsClassB": true,
          "supportsClassC": false,
          "supportsJoin": true
        }
      },
      "data": {
        "raw": {
          "comment": "数据",
          "nickname": "数据",
          "type": "string"
        },
        "loraserver": {
          "comment": "数据属性",
          "nickname": "数据属性",
          "type": "string"
        }
      },
      "status": {
        "appKey": {
          "comment": "应用秘钥",
          "nickname": "应用秘钥",
          "minLength": 32,
          "maxLength": 32,
          "readonly": true,
          "type": "string"
        },
        "appEUI": {
          "comment": "应用appEUI",
          "nickname": "应用appEUI",
          "minLength": 16,
          "maxLength": 16,
          "readonly": true,
          "type": "string"
        },
        "power": {
          "comment": "电量",
          "nickname": "电量",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set": {
          "comment": "set prop",
          "nickname": "设置属性",
          "cmdtype": true,
          "args": {
            "name": {
              "format": "name",
              "type": "string",
              "nickname": "设置属性名"
            },
            "value": {
              "type": "string",
              "nickname": "设置属性值"
            }
          }
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "hex",
                "ascii",
                "base64"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            },
            "fPort": {
              "required": true,
              "type": "number",
              "max": 223,
              "min": 1,
              "comment": "端口号",
              "nickname": "端口号"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        }
      },
      "warnings": {
        "power_low": {
          "comment": "电量低",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "power_too_low": {
          "comment": "电量过低",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "type": "number",
              "format": "int"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.046875,
    "devices_size": 0.10546875,
    "event_size": 0.046875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 2,
    "enable_secret": false,
    "dtype_secret": "77909b40-d9e3-11e9-bc57-8fbfcbdf82ac",
    "owner": "zlg001",
    "created_time": 1568790659,
    "devtypeid": "5d81d883b137e8f1909709d2",
    "devices": {
      "count": 4
    },
    "uri": "/v1/devices/devtype/ClassB_"
  },
  {
    "devtype": "invert",
    "basetype": "invert",
    "enable_secret": false,
    "schema": {
      "memo": {
        "desc": {
          "comment": "一代机三相机",
          "maxLength": 1024,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "total_energy": {
          "comment": "总发电量",
          "nickname": "总发电量",
          "unit": "kWh",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "today_energy": {
          "comment": "当天发电量",
          "nickname": "当天发电量",
          "unit": "kWh",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "temperature": {
          "comment": "逆变器温度",
          "nickname": "逆变器温度",
          "format": "float",
          "type": "number",
          "unit": "℃",
          "min": 0,
          "max": 150
        },
        "gfci": {
          "comment": "对地漏电流",
          "nickname": "对地漏电流",
          "format": "float",
          "type": "number",
          "unit": "mA",
          "min": 0,
          "max": 150
        },
        "bus_volt": {
          "comment": "BUS电压",
          "nickname": "BUS电压",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 150
        },
        "power": {
          "comment": "输出有功功率",
          "nickname": "输出有功功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 6000
        },
        "q_power": {
          "comment": "逆变器输出无功功率",
          "nickname": "输出无功功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 1000
        },
        "pf": {
          "comment": "逆变器输出功率因数",
          "nickname": "输出功率因数",
          "format": "float",
          "type": "number",
          "unit": "",
          "min": 0,
          "max": 1
        },
        "pv1_volt": {
          "comment": "直流输入电压pv1",
          "nickname": "直流输入电压pv1",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv1_curr": {
          "comment": "直流输入电流pv1",
          "nickname": "直流输入电流pv1",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "pv2_volt": {
          "comment": "直流输入电压pv2",
          "nickname": "直流输入电压pv2",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv2_curr": {
          "comment": "直流输入电流pv2",
          "nickname": "直流输入电流pv2",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "pv3_volt": {
          "comment": "直流输入电压pv3",
          "nickname": "直流输入电压pv3",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv3_curr": {
          "comment": "直流输入电流pv3",
          "nickname": "直流输入电流pv3",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "l1_volt": {
          "comment": "交流输出L1相电压",
          "nickname": "交流输出L1相电压",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "l1_curr": {
          "comment": "交流输出L1相电流",
          "nickname": "交流输出L1相电流",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 220
        },
        "l1_freq": {
          "comment": "交流输出L1相频率",
          "nickname": "交流输出L1相频率",
          "format": "float",
          "type": "number",
          "unit": "Hz",
          "min": 0,
          "max": 400
        },
        "l1_dci": {
          "comment": "交流输出L1相直流分量",
          "nickname": "交流输出L1相直流分量",
          "format": "float",
          "type": "number",
          "unit": "mA",
          "min": 0,
          "max": 1000
        },
        "l1_power": {
          "comment": "交流输出L1相功率",
          "nickname": "交流输出L1相功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 10000
        },
        "l1_pf": {
          "comment": "交流输出L1相功率因数",
          "nickname": "交流输出L1相功率因数",
          "format": "float",
          "type": "number",
          "unit": "",
          "min": 0,
          "max": 1
        }
      },
      "status": {
        "sw_ver1": {
          "comment": "software version1",
          "nickname": "软件版本1",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "sw_ver2": {
          "comment": "software version2",
          "nickname": "软件版本2",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "safety_spec": {
          "comment": "安规",
          "nickname": "安规",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "total_runtime": {
          "comment": "总运行时间",
          "nickname": "总运行时间",
          "unit": "H",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "today_runtime": {
          "comment": "当天运行时间",
          "nickname": "当天运行时间",
          "unit": "H",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "clientip": {
          "comment": "client ip",
          "nickname": "客户端ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "nickname": "设备当前固件信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "nickname": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "nickname": "待升级固件信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "nickname": "是否存在待升级固件",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "nickname": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "nickname": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "nickname": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "nickname": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "nickname": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "nickname": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "nickname": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "nickname": "是否",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set": {
          "comment": "set prop",
          "nickname": "属性设置",
          "cmdtype": true,
          "args": {
            "name": {
              "format": "name",
              "nickname": "属性名",
              "type": "string"
            },
            "value": {
              "nickname": "属性值",
              "type": "string"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "nickname": "配置设备参数",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "nickname": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "nickname": "时间",
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "nickname": "通知设备有新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "nickname": "通知设备更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "nickname": "设备类型",
              "required": true,
              "type": "string"
            },
            "version": {
              "nickname": "固件版本",
              "required": true,
              "type": "string"
            },
            "url": {
              "nickname": "固件url",
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "nickname": "上报最新数据",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "nickname": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式",
              "nickname": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据",
              "nickname": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "nickname": "日志信息",
          "args": {
            "time": {
              "comment": "日志时间",
              "nickname": "日志时间",
              "type": "nubmer",
              "format": "int"
            },
            "level": {
              "comment": "日志等级:0:日志信息, 1：告警, 2：错误",
              "nickname": "日志等级",
              "format": "int",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "nickname": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0,
    "devices_size": 0.0703125,
    "event_size": 0,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1568777278,
    "comment": "ssss",
    "devtypeid": "5d81a43eb137e81cc595615e",
    "devices": {
      "count": 0
    },
    "uri": "/v1/devices/devtype/invert"
  },
  {
    "devtype": "zggw",
    "basetype": "zggw",
    "enable_secret": false,
    "schema": {
      "memo": {
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 1,
          "max": 1,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2)，LoraWan网关(3);此处必须为3，即LoraWan网关"
        },
        "desc": {
          "comment": "通用网关",
          "maxLength": 1024,
          "type": "string"
        },
        "node_gw_bydata": {
          "comment": "网关字段",
          "type": "boolean",
          "default": true
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {},
      "status": {
        "mac": {
          "comment": "网关的mac地址",
          "type": "string",
          "properties": {}
        },
        "time": {
          "comment": "网关当前的时间",
          "unit": "ms",
          "min": 0,
          "type": "number",
          "format": "float",
          "minLength": 0,
          "properties": {}
        },
        "rxnb": {
          "comment": "网关接受的包数量",
          "min": 0,
          "type": "number",
          "format": "float",
          "minLength": 0,
          "properties": {}
        },
        "txnb": {
          "comment": "网关发送的包数量",
          "min": 0,
          "type": "number",
          "format": "float",
          "minLength": 0,
          "properties": {}
        },
        "NodeCnt": {
          "comment": "网关挂载的节点数量",
          "min": 0,
          "type": "number",
          "format": "float",
          "minLength": 0,
          "properties": {}
        },
        "maxNodeCnt": {
          "comment": "网关可挂载的最大节点数量",
          "min": 0,
          "max": 5000,
          "type": "number",
          "format": "float",
          "maxLength": 5000,
          "minLength": 0,
          "properties": {}
        },
        "clientip": {
          "comment": "client ip",
          "type": "string",
          "maxLength": 32,
          "properties": {}
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "type": "string",
              "required": true,
              "properties": ""
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "required": true,
              "enums": [
                0,
                1
              ],
              "properties": ""
            },
            "devtype": {
              "comment": "设备型号",
              "type": "string",
              "properties": ""
            },
            "version": {
              "comment": "新固件版本",
              "type": "string",
              "properties": ""
            },
            "url": {
              "comment": "新固件地址",
              "type": "string",
              "properties": ""
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度",
              "properties": ""
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度",
              "properties": ""
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int",
              "properties": ""
            }
          }
        },
        "fault": {
          "comment": "fault",
          "type": "number",
          "format": "int",
          "properties": {}
        }
      },
      "commands": {
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "required": true,
              "type": "string"
            },
            "version": {
              "required": true,
              "type": "string"
            },
            "url": {
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "required": true,
              "type": "string"
            },
            "version": {
              "required": true,
              "type": "string"
            },
            "url": {
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据"
            }
          }
        }
      },
      "warnings": {},
      "errors": {},
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "args": {
            "info": {
              "comment": "日志信息",
              "type": "string"
            },
            "level": {
              "comment": "日志等级",
              "type": "number"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": true,
    "online_type": 0,
    "verifyid": "",
    "data_size": 0.01171875,
    "devices_size": 0.06640625,
    "event_size": 0.01171875,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 1,
    "dtype_secret": "",
    "owner": "zlg001",
    "created_time": 1567647223,
    "comment": "asdasdasdasdasdasddsasdasd",
    "devtypeid": "5d7065f7d2de0bf872f23562",
    "devices": {
      "count": 1
    },
    "uri": "/v1/devices/devtype/zggw"
  },
  {
    "devtype": "zlg001_devtype_invert",
    "basetype": "invert",
    "schema": {
      "memo": {
        "desc": {
          "comment": "一代机三相机",
          "maxLength": 1024,
          "type": "string"
        },
        "devclass": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3
          ],
          "min": 0,
          "max": 0,
          "autoGen": true,
          "readonly": true,
          "comment": "设备分类，包括默认设备(0)，通用网关(1)，LoraWan节点(2),LoraWan网关(3);此处必须为2，即LoraWan节点"
        },
        "devid": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备id，2-64位字母、数字、连接号、下划线的组合"
        },
        "devtype": {
          "type": "string",
          "readonly": true,
          "required": true,
          "minLength": 2,
          "maxLength": 32,
          "comment": "设备类型，2-64位字母、数字、连接号、下划线的组合"
        },
        "devsecret": {
          "type": "string",
          "autoGen": true,
          "comment": "设备密钥，32位的uuid，用于设备登录auth服务器"
        },
        "devprotocol": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "autoGen": true,
          "readonly": true,
          "comment": "通信协议(同时对应了解析数据的协议)，包括默认协议(0)，Modbus(1);该字段为空时，为默认协议(即mqtt协议)"
        },
        "devname": {
          "comment": "设备名称",
          "maxLength": 256,
          "type": "string"
        },
        "country": {
          "comment": "设备所在国家",
          "maxLength": 64,
          "type": "string"
        },
        "region": {
          "comment": "设备所在省份",
          "maxLength": 64,
          "type": "string"
        },
        "city": {
          "comment": "设备所在市县",
          "maxLength": 64,
          "type": "string"
        },
        "status": {
          "type": "number",
          "enums": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "userReadonly": true,
          "comment": "设备状态标志：online(0)，offline(1)，fault(2)，standby(3)，warning(4)，error(5)，protocol_error(6)"
        },
        "favorite": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "comment": "收藏：没有收藏(0)，收藏(1)"
        },
        "enable": {
          "type": "number",
          "enums": [
            0,
            1
          ],
          "userReadonly": true,
          "comment": "可用性：禁用(0)，可用(1)"
        },
        "devgroup": {
          "type": "string",
          "maxLength": 24,
          "readonly": true,
          "comment": "设备所在的设备分组的groupid;设备只能属于一个分组"
        },
        "subdevs": {
          "type": "array",
          "comment": "子设备列表(只适用于devclass是网关的设备)",
          "readonly": true,
          "items": [
            {
              "type": "object",
              "properties": {
                "devtype": {
                  "type": "string",
                  "comment": "设备类型"
                },
                "devid": {
                  "type": "string",
                  "comment": "设备ID"
                }
              }
            }
          ]
        },
        "gateway": {
          "type": "object",
          "comment": "子设备对应的网关设备(只适用于子设备)",
          "readonly": true,
          "properties": {
            "devtype": {
              "type": "string",
              "comment": "父设备的devtype"
            },
            "devid": {
              "type": "string",
              "comment": "父设备的devid"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位。",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度。"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度。"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "data_extra": {
          "type": "object",
          "comment": "数据硬盘统计",
          "autoGen": true,
          "userReadonly": true,
          "properties": {
            "date_size": {
              "type": "number",
              "format": "int",
              "comment": "数据、事件硬盘占用空间"
            },
            "update_time": {
              "type": "number",
              "format": "int",
              "comment": "data_size最后更新时间 单位(s)"
            }
          }
        }
      },
      "init_param": {},
      "data": {
        "testD": {
          "nickname": "",
          "comment": "",
          "unit": "",
          "min": 0,
          "max": 0,
          "type": "number",
          "format": "int"
        },
        "raw11": {
          "nickname": "",
          "comment": "",
          "unit": "",
          "minLength": 0,
          "maxLength": 0,
          "type": "string"
        },
        "test": {
          "nickname": "test",
          "comment": "tes",
          "unit": "",
          "min": 0,
          "max": 0,
          "type": "number",
          "format": "int"
        },
        "total_energy": {
          "comment": "总发电量",
          "unit": "kWh",
          "min": 0,
          "format": "float",
          "type": "number",
          "nickname": "总电量"
        },
        "today_energy": {
          "comment": "当天发电量",
          "unit": "kWh",
          "min": 0,
          "format": "float",
          "type": "number",
          "nickname": "今日发电量"
        },
        "temperature": {
          "comment": "逆变器温度",
          "format": "float",
          "type": "number",
          "unit": "℃",
          "min": 0,
          "max": 150,
          "nickname": "温度"
        },
        "gfci": {
          "comment": "对地漏电流",
          "format": "float",
          "type": "number",
          "unit": "mA",
          "min": 0,
          "max": 150
        },
        "bus_volt": {
          "comment": "BUS电压",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 150,
          "nickname": "电压"
        },
        "power": {
          "comment": "逆变器输出有功功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 6000,
          "nickname": "功率"
        },
        "q_power": {
          "comment": "逆变器输出无功功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 1000
        },
        "pf": {
          "comment": "逆变器输出功率因数",
          "format": "float",
          "type": "number",
          "unit": "",
          "min": 0,
          "max": 1
        },
        "pv1_volt": {
          "comment": "直流输入电压pv1",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv1_curr": {
          "comment": "直流输入电流pv1",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "pv2_volt": {
          "comment": "直流输入电压pv2",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv2_curr": {
          "comment": "直流输入电流pv2",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "pv3_volt": {
          "comment": "直流输入电压pv3",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "pv3_curr": {
          "comment": "直流输入电流pv3",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 20
        },
        "l1_volt": {
          "comment": "交流输出L1相电压",
          "format": "float",
          "type": "number",
          "unit": "V",
          "min": 0,
          "max": 300
        },
        "l1_curr": {
          "comment": "交流输出L1相电流",
          "format": "float",
          "type": "number",
          "unit": "A",
          "min": 0,
          "max": 220
        },
        "l1_freq": {
          "comment": "交流输出L1相频率",
          "format": "float",
          "type": "number",
          "unit": "Hz",
          "min": 0,
          "max": 400
        },
        "l1_dci": {
          "comment": "交流输出L1相直流分量",
          "format": "float",
          "type": "number",
          "unit": "mA",
          "min": 0,
          "max": 1000
        },
        "l1_power": {
          "comment": "交流输出L1相功率",
          "format": "float",
          "type": "number",
          "unit": "W",
          "min": 0,
          "max": 10000
        },
        "l1_pf": {
          "comment": "交流输出L1相功率因数",
          "format": "float",
          "type": "number",
          "unit": "",
          "min": 0,
          "max": 1
        }
      },
      "status": {
        "sw_ver1": {
          "comment": "software version1",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "sw_ver2": {
          "comment": "software version2",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "safety_spec": {
          "comment": "安规",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "total_runtime": {
          "comment": "总运行时间",
          "unit": "H",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "today_runtime": {
          "comment": "当天运行时间",
          "unit": "H",
          "min": 0,
          "format": "float",
          "type": "number"
        },
        "clientip": {
          "comment": "client ip",
          "type": "string",
          "maxLength": 32
        },
        "currentfm": {
          "comment": "设备当前固件的信息",
          "type": "object",
          "properties": {
            "version": {
              "comment": "当前固件版本",
              "type": "string",
              "required": true
            }
          }
        },
        "newfm": {
          "comment": "待升级固件的信息",
          "type": "object",
          "properties": {
            "isnew": {
              "comment": "是否存在待升级固件:不存在待升级固件(0),存在待升级固件(1)",
              "type": "number",
              "required": true,
              "enums": [
                0,
                1
              ]
            },
            "devtype": {
              "comment": "设备型号",
              "type": "string"
            },
            "version": {
              "comment": "新固件版本",
              "type": "string"
            },
            "url": {
              "comment": "新固件地址",
              "type": "string"
            }
          }
        },
        "gps": {
          "type": "object",
          "comment": "gps定位",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "float",
              "comment": "经度"
            },
            "longitude": {
              "type": "number",
              "format": "float",
              "comment": "纬度"
            },
            "GPSTime": {
              "comment": "GPS信息时间戳",
              "type": "number",
              "format": "int"
            }
          }
        },
        "fault": {
          "comment": "fault",
          "type": "number",
          "format": "int"
        }
      },
      "commands": {
        "set": {
          "comment": "set prop",
          "cmdtype": true,
          "args": {
            "name": {
              "format": "name",
              "type": "string"
            },
            "value": {
              "type": "string"
            }
          }
        },
        "set_config": {
          "comment": "配置设备参数，与具体的设备有关",
          "cmdtype": true,
          "args": {}
        },
        "sync_time": {
          "comment": "同步时间",
          "cmdtype": true,
          "args": {
            "time": {
              "required": true,
              "type": "number"
            }
          }
        },
        "notify_upgrade": {
          "comment": "通知设备有新固件，设备收到通知后，可提示用户有更新但不执行更新，也可后台自动更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "required": true,
              "type": "string"
            },
            "version": {
              "required": true,
              "type": "string"
            },
            "url": {
              "required": true,
              "type": "string"
            }
          }
        },
        "exec_upgrade": {
          "comment": "通知设备更新固件，设备收到通知后，需立即更新固件",
          "cmdtype": true,
          "args": {
            "devtype": {
              "required": true,
              "type": "string"
            },
            "version": {
              "required": true,
              "type": "string"
            },
            "url": {
              "required": true,
              "type": "string"
            }
          }
        },
        "req_report": {
          "comment": "要求设备上报最新数据。",
          "cmdtype": true,
          "args": {}
        },
        "pass_through": {
          "comment": "透传命令",
          "cmdtype": true,
          "show_frontend": true,
          "args": {
            "format": {
              "required": true,
              "type": "string",
              "enums": [
                "base64",
                "hex",
                "ascii"
              ],
              "comment": "编码格式"
            },
            "raw": {
              "required": true,
              "type": "string",
              "comment": "数据"
            }
          }
        }
      },
      "warnings": {
        "temperature_high": {
          "comment": "工作温度偏高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "errors": {
        "temperature_too_high": {
          "comment": "工作温度过高",
          "args": {
            "value": {
              "format": "float",
              "type": "number"
            }
          }
        }
      },
      "logs": {
        "loginfo": {
          "comment": "日志信息",
          "args": {
            "level": {
              "comment": "日志等级",
              "type": "number"
            },
            "info": {
              "comment": "日志信息",
              "type": "string"
            }
          }
        }
      },
      "data_indexs": {
        "indexs": {
          "time": -1
        },
        "options": {}
      }
    },
    "node_gw_bydata": false,
    "online_type": 0,
    "verifyid": "",
    "data_size": 21.41796875,
    "devices_size": 0.10546875,
    "event_size": 0.08203125,
    "index": 0,
    "raw_handler": "inherit_from_basetype",
    "devprotocol": 0,
    "devclass": 0,
    "enable_secret": false,
    "dtype_secret": "f4204f80-ceed-11e9-a199-6f1bb8d247fd",
    "owner": "zlg001",
    "created_time": 1567585700,
    "devtypeid": "5d6f75a4d2de0bf92dec0084",
    "devices": {
      "count": 3
    },
    "uri": "/v1/devices/devtype/zlg001_devtype_invert"
  }
]
}
var getDefaultPermission = function (getters) {
  var permissionList = {
        "project": { "createProject": true, "projectBatchDEL": true, "editProject": true, "getProjectList": true },
        "deviceGroup": { "deleteDeviceGroup": true, "createDeviceGroup": true, "getDeviceGroupList": true, "editDeviceGroup": true, "addDeviceToGroup": true, "deleteDeviceGroupImage": true, "uploadDeviceGroupImage": true, "removeDeviceGroupMember": true },
        "deviceType": { "getListDevType": true, "createDevType": true, "deleteDevType": true, "updateDevTypeInfo": true, "updateDevTypeData": true, "updateDevTypeStatus": true, "updateDevTypeCommands": true, "updateDevTypeWarnings": true, "updateDevTypeLogs": true, "updateDevTypeInitParam": true },
        "data": { "getDeviceData": true, "deleteDeviceData": true, "clearDeviceData": true, "createProjectData": true, "projectDataBatchDEL": true, "updateProjectDataInfo": true, "getProjectListDatas": true, "loginWebmqtt": true }, 
        "device": { "getDeviceInfo": true, "listDevices": true, "UpdateDeviceInfo": true, "sendCommandToDevice": true, "batchUpdateDevicesScrete": true, "updateDeviceSecret": true, "getDeviceSecret": true, "createDevice": true, "deviceBatchDEL": true, "deleteDevice": true, "devicesMessage": true }, "firmware": { "deleteFirmware": true, "listFirmware": true, "notifyFirmware": true, "uploadFirmware": true, "getFirmwareDesc": true }, "deviceEvent": { "listEvents": true }, "user": { "getUserInfo": true, "accessibleMenuModule": true }, "rule": { "listRules": true, "createRule": true, "updateRule": true, "deleteRule": true, "setStatus": true, "listRecords": true, "deleteRecords": true }, "multicast": { "createMulticast": true, "listMulticasts": true, "getMulticast": true, "removeMulticast": true, "MulticastAddDevices": true, "MulticastRemoveDevices": true, "MulticastSendCommand": true, "UpdateMulticast": true }
  }
  return permissionList
}

export {mockData, mockData2, getDefaultPermission}