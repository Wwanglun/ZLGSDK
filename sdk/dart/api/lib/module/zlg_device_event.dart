import 'dart:convert';

import 'package:meta/meta.dart';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGDeviceEvent extends ZLGBaseModule {
  static ZLGDeviceEvent _instance;

  factory ZLGDeviceEvent() {
    if (_instance == null) {
      _instance = ZLGDeviceEvent._internal();
    }
    return _instance;
  }

  ZLGDeviceEvent._internal();

  Future getDeviceEvents(
      {@required String deviceType,
      @required String deviceId,
      Map<String, dynamic> filter,
      int skip,
      int limit,
      String aggregation,
      bool descend = false}) async {
    Map params = Util.deleteEmptyMapEntity(<String, dynamic>{
      'devtype': deviceType,
      'devid': deviceId,
      'filter': filter == null ? null : json.encode(filter),
      'skip': skip,
      'limit': limit,
      'aggregation': aggregation,
      'descend': descend
    });
    return fetch(
            url: '/devices/$deviceId/event',
            method: Methods.get,
            params: params)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
