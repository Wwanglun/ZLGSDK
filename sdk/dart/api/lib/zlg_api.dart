import 'package:flutter/material.dart';
import 'package:zlg_api/module/zlg_account_flow.dart';
import 'package:zlg_api/module/zlg_assistant.dart';
import 'package:zlg_api/module/zlg_custom_data.dart';
import 'package:zlg_api/module/zlg_device.dart';
import 'package:zlg_api/module/zlg_device_command.dart';
import 'package:zlg_api/module/zlg_device_data.dart';
import 'package:zlg_api/module/zlg_device_event.dart';
import 'package:zlg_api/module/zlg_device_group.dart';
import 'package:zlg_api/module/zlg_device_type.dart';
import 'package:zlg_api/module/zlg_project.dart';
import 'package:zlg_api/module/zlg_rule.dart';
import 'package:zlg_api/module/zlg_rule_record.dart';

import 'base/zlg_base_module.dart';
import 'module/zlg_user.dart';

export 'package:dio/dio.dart';

export 'module/zlg_user.dart';
export 'module/zlg_device.dart';
export 'module/zlg_device_data.dart';
export 'module/zlg_device_event.dart';
export 'module/zlg_device_type.dart';
export 'module/zlg_device_group.dart';
export 'module/zlg_project.dart';
export 'module/zlg_rule.dart';
export 'module/zlg_rule_record.dart';
export 'module/zlg_account_flow.dart';
export 'module/zlg_assistant.dart';
export 'module/zlg_device_command.dart';
export 'module/zlg_custom_data.dart';

export 'framework/zlg_http.dart';
export 'framework/zlg_socket.dart';

class ZLGApi extends ZLGBaseModule {
  static ZLGApi _instance;

  factory ZLGApi() {
    if (_instance == null) {
      _instance = ZLGApi._internal();
    }
    return _instance;
  }

  ZLGApi._internal();

  @override
  void setErrorHandler(ValueChanged<int> handler) {
    ZLGUser().setErrorHandler(handler);
    ZLGDevice().setErrorHandler(handler);
    ZLGDeviceData().setErrorHandler(handler);
    ZLGDeviceEvent().setErrorHandler(handler);
    ZLGDeviceType().setErrorHandler(handler);
    ZLGDeviceGroup().setErrorHandler(handler);
    ZLGProject().setErrorHandler(handler);
    ZLGRule().setErrorHandler(handler);
    ZLGRuleRecord().setErrorHandler(handler);
    ZLGAccountFlow().setErrorHandler(handler);
    ZLGAssistant().setErrorHandler(handler);
    ZLGDeviceCommand().setErrorHandler(handler);
    ZLGCustomData().setErrorHandler(handler);
  }
}
