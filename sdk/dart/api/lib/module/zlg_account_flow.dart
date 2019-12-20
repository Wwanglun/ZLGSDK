import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGAccountFlow extends ZLGBaseModule {
  static ZLGAccountFlow _instance;

  factory ZLGAccountFlow() {
    if (_instance == null) {
      _instance = ZLGAccountFlow._internal();
    }
    return _instance;
  }

  ZLGAccountFlow._internal();

  getDevicesMessages(
      {String devtype,
      String devid,
      Map<String, dynamic> filter,
      int skip,
      int limit,
      String aggregation,
      bool descend = false,
      int starttime,
      int endtime}) {
    Map params = Util.deleteEmptyMapEntity(<String, dynamic>{
      'devtype': devtype,
      'devid': devid,
      'filter': filter,
      'skip': skip,
      'limit': limit,
      'aggregation': aggregation,
      'descend': descend,
      'starttime': starttime,
      'endtime': endtime
    });
    return ZlgHttp.getInstance()
        .fetch(url: '/devices_message', method: Methods.get, params: params)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
