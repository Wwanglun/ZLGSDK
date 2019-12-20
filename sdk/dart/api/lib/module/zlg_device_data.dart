import 'package:meta/meta.dart';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGDeviceData extends ZLGBaseModule {
  static ZLGDeviceData _instance;

  factory ZLGDeviceData() {
    if (_instance == null) {
      _instance = ZLGDeviceData._internal();
    }
    return _instance;
  }

  ZLGDeviceData._internal();

  Future getDeviceData(
      {@required String deviceType,
      @required String deviceId,
      Map filter,
      int skip,
      int limit,
      String aggregation,
      bool descend = false,
      int startTime,
      int endTime,
      int timezoneOffset}) async {
    Map params = Util.deleteEmptyMapEntity(<String, dynamic>{
      'devtype': deviceType,
      'filter': filter,
      'skip': skip,
      'limit': limit,
      'aggregation': aggregation,
      'descend': descend,
      'starttime': startTime,
      'endtime': endTime,
      'timezoneOffset': timezoneOffset
    });
    return ZlgHttp.getInstance()
        .fetch(
            url: '/devices/$deviceId/data', method: Methods.get, params: params)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{404: ClientErrorCode.ZLG_DEVICE_NOT_EXIST};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
