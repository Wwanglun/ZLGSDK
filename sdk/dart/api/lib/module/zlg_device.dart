import 'package:meta/meta.dart';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGDevice extends ZLGBaseModule {
  static ZLGDevice _instance;

  factory ZLGDevice() {
    if (_instance == null) {
      _instance = ZLGDevice._internal();
    }
    return _instance;
  }

  ZLGDevice._internal();

  Future getDevicesInfo(
      {String devtype,
      Map filter,
      int skip,
      int limit,
      String aggregation,
      bool descend = true}) async {
    Map params = <String, dynamic>{
      'devtype': devtype,
      'filter': filter,
      'skip': skip,
      'limit': limit,
      'aggregation': aggregation,
      'descend': descend
    };
    return fetch(url: '/devices', method: Methods.get, params: params)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future addDevice({@required Map data}) async {
    data = Util.deleteEmptyMapEntity(data);
    print('addDevice data: $data');
    return fetch(url: '/devices', method: Methods.post, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future deleteSingleDevice(
      {@required String deviceType, @required String deviceId}) async {
    return fetch(
        url: '/devices/$deviceId',
        method: Methods.delete,
        params: {'devtype': deviceType}).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{404: ClientErrorCode.ZLG_DEVICE_NOT_EXIST};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future updateDeviceInfo(
      {@required String deviceType,
      @required String deviceId,
      @required Map data}) async {
    data = Util.deleteEmptyMapEntity(data);
    print('updateDeviceInfo data: $data');
    return fetch(
            url: '/devices/$deviceId',
            method: Methods.put,
            params: {'devtype': deviceType},
            data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{404: ClientErrorCode.ZLG_DEVICE_NOT_EXIST};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
