import 'package:meta/meta.dart';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGDeviceGroup extends ZLGBaseModule {
  static ZLGDeviceGroup _instance;

  factory ZLGDeviceGroup() {
    if (_instance == null) {
      _instance = ZLGDeviceGroup._internal();
    }
    return _instance;
  }

  ZLGDeviceGroup._internal();

  Future getDeviceGroups(
      {Map filter,
      int skip,
      int limit,
      String aggregation,
      bool descend = false}) async {
    Map params = Util.deleteEmptyMapEntity(<String, dynamic>{
      'filter': filter,
      'skip': skip,
      'limit': limit,
      'aggregation': aggregation,
      'descend': descend
    });
    return fetch(url: '/device_groups', method: Methods.get, params: params)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future addDeviceGroup({@required Map info}) async {
    Map data = Util.deleteEmptyMapEntity(info);
    print('addDeviceGroup params: ' + data.toString());
    return fetch(url: '/device_groups', method: Methods.post, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future deleteDeviceGroup({@required String groupId}) async {
    return fetch(url: '/device_groups/$groupId', method: Methods.delete)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_DEVICE_GROUP_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future addDeviceToDeviceGroup(
      {String groupId, String deviceType, String deviceId}) {
    var data = {'devtype': deviceType, 'devid': deviceId};
    return fetch(
            url: '/device_groups/$groupId', method: Methods.post, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_DEVICE_GROUP_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future deleteDeviceFromDeviceGroup(
      {String groupId, String deviceType, String deviceId}) {
    return fetch(
        url: '/device_groups/$groupId/$deviceId',
        method: Methods.delete,
        params: {'devtype': deviceType}).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_DEVICE_GROUP_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
